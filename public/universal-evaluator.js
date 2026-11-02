// Learn4Free - Universal Authentic Autograder
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

/** Normalize multiline text for strict output comparison */
function normalizeOutput(s) {
  if (s === undefined || s === null) return '';
  return String(s)
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map(line => line.replace(/\s+$/, ''))
    .join('\n')
    .replace(/^\n+/, '')
    .replace(/\n+$/, '');
}

/** Check if code is empty */
function isCodeEmpty(code) {
  return !code || !code.trim();
}

/** Clean code for structural similarity checks */
function cleanForComparison(str) {
  if (!str) return '';
  return str
    .replace(/\/\/[^\n]*/g, '')
    .replace(/#[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Check if student code is identical to starter code */
function isStarterUnchanged(code, starter) {
  const cleanCode = cleanForComparison(code);
  const cleanStarter = cleanForComparison(starter);
  return cleanCode === cleanStarter;
}

/** Check for unfinished macros */
function hasPlaceholderMacros(code) {
  if (!code) return false;
  return /\btodo!\s*\(\s*\)/.test(code) || /\bunimplemented!\s*\(\s*\)/.test(code);
}

/** Check lesson.require regex rules */
function verifyRequirements(code, rules = []) {
  for (const rule of rules) {
    if (!new RegExp(rule.re, 's').test(code)) {
      return { ok: false, error: rule.msg };
    }
  }
  return { ok: true };
}

// ==========================================
// Virtual Bash Shell Simulator
// ==========================================
function createVirtualFS(setupFiles = {}) {
  const files = {};
  const directories = new Set(['', '.']);
  const permissions = {};
  for (const [filepath, content] of Object.entries(setupFiles)) {
    const cleanPath = filepath.replace(/^\.\//, '').replace(/^\/+/, '');
    files[cleanPath] = content;
    permissions[cleanPath] = '644';
    const parts = cleanPath.split('/');
    let cur = '';
    for (let i = 0; i < parts.length - 1; i++) {
      cur = cur ? cur + '/' + parts[i] : parts[i];
      directories.add(cur);
    }
  }
  return { files, directories, permissions };
}

function simulateBash(codeStr, lessonObj, simOptions = {}) {
  const includePrompts = !!simOptions.includePrompts;
  const vfs = createVirtualFS(lessonObj.setupFiles || {});
  let simCwd = '';
  const simEnv = {
    USER: 'student',
    HOME: '/home/student',
    PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
  };
  let positionalArgs = [];
  const sessionLog = [];
  const rawStdout = [];

  function promptStr() {
    const displayDir = simCwd ? `~/workspace/${simCwd}` : '~/workspace';
    return `student@learn4free:${displayDir}$ `;
  }

  function resolvePath(target) {
    if (!target) return simCwd;
    target = target.replace(/^["']|["']$/g, '');
    if (target.startsWith('/home/student/workspace/')) {
      target = target.slice('/home/student/workspace/'.length);
    } else if (target.startsWith('/home/student/workspace')) {
      target = target.slice('/home/student/workspace'.length);
      if (target.startsWith('/')) target = target.slice(1);
    } else if (target.startsWith('/workspace/')) {
      target = target.slice('/workspace/'.length);
    } else if (target === '~' || target === '~/') {
      return '';
    } else if (target.startsWith('~/workspace/')) {
      target = target.slice('~/workspace/'.length);
    }
    const base = target.startsWith('/') ? [] : (simCwd ? simCwd.split('/') : []);
    const parts = target.split('/').filter(p => p && p !== '.');
    const stack = [...base];
    for (const p of parts) {
      if (p === '..') {
        if (stack.length > 0) stack.pop();
      } else {
        stack.push(p);
      }
    }
    return stack.join('/');
  }

  function getListing(dirPath, showAll = false) {
    const targetDir = resolvePath(dirPath);
    const entries = new Set();
    const prefix = targetDir ? targetDir + '/' : '';
    if (showAll) {
      entries.add('.');
      entries.add('..');
    }
    for (const d of vfs.directories) {
      if (d && d !== targetDir) {
        if (!targetDir && !d.includes('/')) {
          entries.add(d);
        } else if (targetDir && d.startsWith(prefix)) {
          const rest = d.slice(prefix.length);
          if (rest && !rest.includes('/')) entries.add(rest);
        }
      }
    }
    for (const f of Object.keys(vfs.files)) {
      if (!targetDir && !f.includes('/')) {
        if (showAll || !f.startsWith('.')) entries.add(f);
      } else if (targetDir && f.startsWith(prefix)) {
        const rest = f.slice(prefix.length);
        if (rest && !rest.includes('/')) {
          if (showAll || !rest.startsWith('.')) entries.add(rest);
        }
      }
    }
    return Array.from(entries).sort((a, b) => {
      if (showAll) {
        if (a === '.') return -1;
        if (b === '.') return 1;
        if (a === '..') return -1;
        if (b === '..') return 1;
      }
      return a.localeCompare(b);
    });
  }

  function expandVariables(str) {
    str = str.replace(/\$\(([^)]+)\)/g, (_, subcmd) => {
      const subRes = executeSingleCommand(subcmd.trim(), '');
      return (subRes.stdout || '').trim();
    });
    str = str.replace(/\$#/g, String(positionalArgs.length));
    str = str.replace(/\$([0-9]+)/g, (_, num) => {
      const idx = parseInt(num, 10) - 1;
      return positionalArgs[idx] || '';
    });
    str = str.replace(/\$\{?([A-Za-z_][A-Za-z0-9_]*)\}?/g, (_, varName) => {
      return simEnv[varName] !== undefined ? simEnv[varName] : '';
    });
    return str;
  }

  function executeSingleCommand(cmdStr, pipeStdin = '') {
    cmdStr = expandVariables(cmdStr.trim());
    if (!cmdStr) return { stdout: '', stderr: '', exitCode: 0 };

    const tokens = [];
    let curToken = '';
    let inDouble = false;
    let inSingle = false;
    for (let j = 0; j < cmdStr.length; j++) {
      const ch = cmdStr[j];
      if (ch === '"' && !inSingle) {
        inDouble = !inDouble;
      } else if (ch === "'" && !inDouble) {
        inSingle = !inSingle;
      } else if (/\s/.test(ch) && !inDouble && !inSingle) {
        if (curToken.length > 0) {
          tokens.push(curToken);
          curToken = '';
        }
      } else {
        curToken += ch;
      }
    }
    if (curToken.length > 0) tokens.push(curToken);
    if (tokens.length === 0) return { stdout: '', stderr: '', exitCode: 0 };

    const cmd = tokens[0];
    const args = tokens.slice(1);

    if (cmd === 'echo') {
      let text = args.join(' ');
      if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
        text = text.slice(1, -1);
      }
      return { stdout: text + '\n', stderr: '', exitCode: 0 };
    }

    if (cmd === 'pwd') {
      const display = simCwd ? `/home/student/workspace/${simCwd}` : '/home/student/workspace';
      return { stdout: display + '\n', stderr: '', exitCode: 0 };
    }

    if (cmd === 'cd') {
      const dest = args[0] || '~';
      if (dest === '~' || dest === '~/') {
        simCwd = '';
        return { stdout: '', stderr: '', exitCode: 0 };
      }
      const target = resolvePath(dest);
      if (target === '' || vfs.directories.has(target)) {
        simCwd = target;
        return { stdout: '', stderr: '', exitCode: 0 };
      }
      return { stdout: '', stderr: `cd: ${dest}: No such directory\n`, exitCode: 1 };
    }

    if (cmd === 'mkdir') {
      let pFlag = false;
      const targets = [];
      for (const a of args) {
        if (a === '-p') pFlag = true;
        else targets.push(a);
      }
      for (const t of targets) {
        const full = resolvePath(t);
        const parts = full.split('/');
        let cur = '';
        for (const part of parts) {
          cur = cur ? cur + '/' + part : part;
          vfs.directories.add(cur);
        }
      }
      return { stdout: '', stderr: '', exitCode: 0 };
    }

    if (cmd === 'touch') {
      for (const a of args) {
        const full = resolvePath(a);
        if (vfs.files[full] === undefined) {
          vfs.files[full] = '';
          vfs.permissions[full] = '644';
        }
      }
      return { stdout: '', stderr: '', exitCode: 0 };
    }

    if (cmd === 'ls') {
      let showAll = false;
      let targetPath = '';
      for (const a of args) {
        if (a === '-a') showAll = true;
        else if (a === '-la' || a === '-al') showAll = true;
        else if (!a.startsWith('-')) targetPath = a;
      }
      const entries = getListing(targetPath, showAll);
      return { stdout: entries.join('  ') + (entries.length ? '\n' : ''), stderr: '', exitCode: 0 };
    }

    if (cmd === 'cat') {
      if (args.length === 0) {
        return { stdout: pipeStdin, stderr: '', exitCode: 0 };
      }
      let out = '';
      for (const a of args) {
        const full = resolvePath(a);
        if (vfs.files[full] !== undefined) {
          out += vfs.files[full];
          if (!out.endsWith('\n')) out += '\n';
        } else {
          return { stdout: '', stderr: `cat: ${a}: No such file or directory\n`, exitCode: 1 };
        }
      }
      return { stdout: out, stderr: '', exitCode: 0 };
    }

    if (cmd === 'head') {
      let num = 10;
      let file = '';
      for (let i = 0; i < args.length; i++) {
        if (args[i] === '-n' && args[i + 1]) {
          num = parseInt(args[i + 1], 10) || 10;
          i++;
        } else if (args[i].startsWith('-n')) {
          num = parseInt(args[i].slice(2), 10) || 10;
        } else {
          file = args[i];
        }
      }
      const content = file ? (vfs.files[resolvePath(file)] || '') : pipeStdin;
      const lines = content.replace(/\r\n/g, '\n').split('\n').filter(Boolean);
      const out = lines.slice(0, num).join('\n') + (lines.length ? '\n' : '');
      return { stdout: out, stderr: '', exitCode: 0 };
    }

    if (cmd === 'tail') {
      let num = 10;
      let file = '';
      for (let i = 0; i < args.length; i++) {
        if (args[i] === '-n' && args[i + 1]) {
          num = parseInt(args[i + 1], 10) || 10;
          i++;
        } else if (args[i].startsWith('-n')) {
          num = parseInt(args[i].slice(2), 10) || 10;
        } else {
          file = args[i];
        }
      }
      const content = file ? (vfs.files[resolvePath(file)] || '') : pipeStdin;
      const lines = content.replace(/\r\n/g, '\n').split('\n').filter(Boolean);
      const out = lines.slice(-num).join('\n') + (lines.length ? '\n' : '');
      return { stdout: out, stderr: '', exitCode: 0 };
    }

    if (cmd === 'cp') {
      if (args.length < 2) return { stdout: '', stderr: 'cp: missing destination\n', exitCode: 1 };
      const src = resolvePath(args[0]);
      let dest = resolvePath(args[1]);
      if (vfs.directories.has(dest)) {
        dest = dest ? dest + '/' + args[0].split('/').pop() : args[0].split('/').pop();
      }
      if (vfs.files[src] !== undefined) {
        vfs.files[dest] = vfs.files[src];
        vfs.permissions[dest] = vfs.permissions[src] || '644';
        return { stdout: '', stderr: '', exitCode: 0 };
      }
      return { stdout: '', stderr: `cp: cannot stat '${args[0]}': No such file\n`, exitCode: 1 };
    }

    if (cmd === 'mv') {
      if (args.length < 2) return { stdout: '', stderr: 'mv: missing destination\n', exitCode: 1 };
      const src = resolvePath(args[0]);
      let dest = resolvePath(args[1]);
      if (vfs.directories.has(dest)) {
        dest = dest ? dest + '/' + args[0].split('/').pop() : args[0].split('/').pop();
      }
      if (vfs.files[src] !== undefined) {
        vfs.files[dest] = vfs.files[src];
        vfs.permissions[dest] = vfs.permissions[src] || '644';
        delete vfs.files[src];
        return { stdout: '', stderr: '', exitCode: 0 };
      }
      return { stdout: '', stderr: `mv: cannot stat '${args[0]}': No such file\n`, exitCode: 1 };
    }

    if (cmd === 'rm') {
      for (const a of args) {
        if (a.startsWith('-')) continue;
        const full = resolvePath(a);
        delete vfs.files[full];
      }
      return { stdout: '', stderr: '', exitCode: 0 };
    }

    if (cmd === 'grep') {
      let pattern = '';
      let file = '';
      let ignoreCase = false;
      for (const a of args) {
        if (a === '-i') ignoreCase = true;
        else if (!pattern) pattern = a.replace(/^["']|["']$/g, '');
        else file = a;
      }
      const content = file ? (vfs.files[resolvePath(file)] || '') : pipeStdin;
      const re = new RegExp(pattern, ignoreCase ? 'i' : '');
      const lines = content.replace(/\r\n/g, '\n').split('\n');
      const matches = lines.filter(l => re.test(l));
      return { stdout: matches.join('\n') + (matches.length ? '\n' : ''), stderr: '', exitCode: matches.length > 0 ? 0 : 1 };
    }

    if (cmd === 'sort') {
      const file = args.find(a => !a.startsWith('-'));
      const content = file ? (vfs.files[resolvePath(file)] || '') : pipeStdin;
      const lines = content.replace(/\r\n/g, '\n').split('\n').filter(Boolean);
      lines.sort();
      return { stdout: lines.join('\n') + (lines.length ? '\n' : ''), stderr: '', exitCode: 0 };
    }

    if (cmd === 'uniq') {
      const file = args.find(a => !a.startsWith('-'));
      const content = file ? (vfs.files[resolvePath(file)] || '') : pipeStdin;
      const lines = content.replace(/\r\n/g, '\n').split('\n').filter(Boolean);
      const unique = [];
      for (let i = 0; i < lines.length; i++) {
        if (i === 0 || lines[i] !== lines[i - 1]) unique.push(lines[i]);
      }
      return { stdout: unique.join('\n') + (unique.length ? '\n' : ''), stderr: '', exitCode: 0 };
    }

    if (cmd === 'chmod') {
      const mode = args[0];
      const target = resolvePath(args[1]);
      if (vfs.files[target] !== undefined) {
        vfs.permissions[target] = mode;
        return { stdout: '', stderr: '', exitCode: 0 };
      }
      return { stdout: '', stderr: `chmod: cannot access '${args[1]}': No such file\n`, exitCode: 1 };
    }

    if (cmd === 'export') {
      const assignment = args[0] || '';
      const [k, v] = assignment.split('=');
      if (k && v !== undefined) {
        simEnv[k] = v.replace(/^["']|["']$/g, '');
      }
      return { stdout: '', stderr: '', exitCode: 0 };
    }

    return { stdout: `Executed: ${cmd}\n`, stderr: '', exitCode: 0 };
  }

  function executePipeline(line) {
    if (line.includes('>')) {
      const isAppend = line.includes('>>');
      const parts = line.split(isAppend ? '>>' : '>');
      const commandPart = parts[0].trim();
      const filePart = parts[1].trim().replace(/^["']|["']$/g, '');
      const res = executePipeline(commandPart);
      const fullPath = resolvePath(filePart);
      if (isAppend && vfs.files[fullPath] !== undefined) {
        vfs.files[fullPath] += res.stdout;
      } else {
        vfs.files[fullPath] = res.stdout;
        vfs.permissions[fullPath] = '644';
      }
      return { stdout: '', stderr: res.stderr, exitCode: res.exitCode };
    }

    const segments = line.split('|').map(s => s.trim()).filter(Boolean);
    let curStdin = '';
    let lastRes = { stdout: '', stderr: '', exitCode: 0 };
    for (const seg of segments) {
      lastRes = executeSingleCommand(seg, curStdin);
      curStdin = lastRes.stdout;
    }
    return lastRes;
  }

  const rawLines = codeStr.replace(/\r\n/g, '\n').split('\n');
  let i = 0;
  while (i < rawLines.length) {
    const rawLine = rawLines[i].trim();
    i++;
    if (!rawLine || rawLine.startsWith('#')) continue;

    if (rawLine.startsWith('if ') || rawLine.startsWith('if[')) {
      let blockLines = [rawLine];
      while (i < rawLines.length) {
        const next = rawLines[i].trim();
        i++;
        blockLines.push(next);
        if (next === 'fi') break;
      }
      const condLine = rawLine.replace(/^if\s+/, '').replace(/;\s*then$/, '').trim();
      let condPassed = false;
      const eqMatch = condLine.match(/\[\s*"?([^"'\s]+)"?\s*=\s*"?([^"'\s]+)"?\s*\]/);
      if (eqMatch) {
        const left = expandVariables(eqMatch[1]);
        const right = expandVariables(eqMatch[2]);
        condPassed = left === right;
      }
      const gtMatch = condLine.match(/\[\s*([0-9$A-Za-z_]+)\s*-gt\s*([0-9$A-Za-z_]+)\s*\]/);
      if (gtMatch) {
        const lNum = parseInt(expandVariables(gtMatch[1]), 10);
        const rNum = parseInt(expandVariables(gtMatch[2]), 10);
        condPassed = lNum > rNum;
      }
      let inThen = true;
      for (const bl of blockLines.slice(1, -1)) {
        if (bl === 'else') {
          inThen = false;
          continue;
        }
        if ((condPassed && inThen) || (!condPassed && !inThen)) {
          if (includePrompts) sessionLog.push(promptStr() + bl);
          const res = executePipeline(bl);
          if (res.stdout) {
            sessionLog.push(res.stdout.replace(/\n$/, ''));
            rawStdout.push(res.stdout);
          }
        }
      }
      continue;
    }

    if (includePrompts) sessionLog.push(promptStr() + rawLine);
    const res = executePipeline(rawLine);
    if (res.stdout) {
      sessionLog.push(res.stdout.replace(/\n$/, ''));
      rawStdout.push(res.stdout);
    }
    if (res.stderr) sessionLog.push(res.stderr.replace(/\n$/, ''));
  }

  return {
    rawStdout: rawStdout.join(''),
    sessionLog: sessionLog.join('\n'),
    vfs
  };
}

// ==========================================
// JavaScript / Web Evaluator
// ==========================================
function evaluateClientJS(codeStr, stdin = '') {
  const logs = [];
  const origLog = console.log;
  try {
    console.log = (...args) => {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    };
    const cleanCode = codeStr.replace(/\\`/g, '`').replace(/\\\${/g, '${');
    const runner = new Function('stdin', cleanCode);
    runner(stdin || '');
    return { ok: true, stdout: logs.join('\n'), stderr: '' };
  } catch (err) {
    return { ok: false, stdout: logs.join('\n'), stderr: err.message || String(err), error: err.message || String(err) };
  } finally {
    console.log = origLog;
  }
}

// ==========================================
// Rust Evaluator
// ==========================================
function transpileRust(codeStr, lesson, stdin = '') {
  let code = codeStr.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');

  // Format macro printing
  code = code.replace(/println!\s*\(\s*("[^"]*")\s*(?:,\s*([\s\S]*?))?\s*\);/g, (m, fmt, args) => {
    return args ? `__rust_print(${fmt}, true, ${args});` : `__rust_print(${fmt}, true);`;
  });
  code = code.replace(/print!\s*\(\s*("[^"]*")\s*(?:,\s*([\s\S]*?))?\s*\);/g, (m, fmt, args) => {
    return args ? `__rust_print(${fmt}, false, ${args});` : `__rust_print(${fmt}, false);`;
  });

  // fn signatures
  code = code.replace(/\bfn\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)\s*(?:->\s*[^\{]+)?\s*\{/g, (m, fnName, params) => {
    const cp = params.split(',').map(p => p.split(':')[0].trim()).filter(Boolean).join(', ');
    return `function ${fnName}(${cp}) {`;
  });

  // let / const to var
  code = code.replace(/\blet\s+(?:mut\s+)?([A-Za-z0-9_]+)\s*(?::\s*[^=;]+)?\s*=/g, 'var $1 =');
  code = code.replace(/\blet\s+(?:mut\s+)?([A-Za-z0-9_]+)\s*(?::\s*[^=;]+)?\s*;/g, 'var $1;');
  code = code.replace(/\bconst\s+([A-Za-z0-9_]+)\s*(?::\s*[^=;]+)?\s*=/g, 'var $1 =');

  // for loops
  code = code.replace(/\bfor\s+([A-Za-z0-9_]+)\s+in\s+([0-9A-Za-z_]+)\.\.([0-9A-Za-z_]+)\s*\{/g, 'for (var $1 = $2; $1 < $3; $1++) {');
  code = code.replace(/\bfor\s+([A-Za-z0-9_]+)\s+in\s+([0-9A-Za-z_]+)\.\.=([0-9A-Za-z_]+)\s*\{/g, 'for (var $1 = $2; $1 <= $3; $1++) {');
  code = code.replace(/\bloop\s*\{/g, 'while(true) {');

  // Conditionals
  code = code.replace(/\bif\s+([^{]+)\s*\{/g, (m, cond) => {
    const c = cond.trim();
    return c.startsWith('(') && c.endsWith(')') ? `if ${c} {` : `if (${c}) {`;
  });
  code = code.replace(/\bwhile\s+([^{]+)\s*\{/g, (m, cond) => {
    const c = cond.trim();
    return c.startsWith('(') && c.endsWith(')') ? `while ${c} {` : `while (${c}) {`;
  });

  // String / std helpers
  code = code.replace(/String::from\(([^)]+)\)/g, '$1');
  code = code.replace(/\.to_string\(\)/g, '');
  code = code.replace(/\s+as\s+[a-z0-9_]+/g, '');
  code = code.replace(/vec!\[([\s\S]*?)\]/g, '[$1]');
  code = code.replace(/Vec::new\(\)/g, '[]');
  code = code.replace(/\.len\(\)/g, '.length');
  code = code.replace(/\.is_empty\(\)/g, '.length === 0');
  code = code.replace(/\.clone\(\)/g, '');

  return code;
}

function evaluateClientRust(codeStr, lesson, stdin = '') {
  const code = transpileRust(codeStr, lesson, stdin);
  const logs = [];
  function __rust_print(fmt, newline, ...args) {
    let s = fmt;
    for (const a of args) {
      if (s.includes('{:.2}')) s = s.replace('{:.2}', Number(a).toFixed(2));
      else if (s.includes('{:.1}')) s = s.replace('{:.1}', Number(a).toFixed(1));
      else if (s.includes('{:03}')) s = s.replace('{:03}', String(a).padStart(3, '0'));
      else if (s.includes('{:?}')) s = s.replace('{:?}', typeof a === 'object' ? JSON.stringify(a) : String(a));
      else if (s.includes('{}')) s = s.replace('{}', typeof a === 'object' ? JSON.stringify(a) : String(a));
    }
    logs.push(s + (newline ? '\n' : ''));
  }

  try {
    const fn = new Function('__rust_print', 'stdin', code + '\nif (typeof main === "function") main();');
    fn(__rust_print, stdin);
    return { ok: true, stdout: logs.join(''), stderr: '' };
  } catch (err) {
    return { ok: false, stdout: logs.join(''), stderr: err.message || String(err), error: err.message || String(err) };
  }
}

// ==========================================
// C Evaluator
// ==========================================
function evaluateClientC(codeVal, lesson, stdin = '') {
  let code = codeVal.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
  code = code.replace(/#include[^\n]*/g, '');
  code = code.replace(/printf\s*\(\s*("[^"]*")\s*(?:,\s*([\s\S]*?))?\s*\);/g, (m, fmt, args) => {
    return args ? `__c_printf(${fmt}, ${args});` : `__c_printf(${fmt});`;
  });
  code = code.replace(/\bint\s+main\s*\([^)]*\)\s*\{/g, 'function main() {');
  code = code.replace(/\b(?:int|float|double|char\*|char|long|short|unsigned|size_t)\s+([A-Za-z0-9_]+)\s*=/g, 'var $1 =');
  code = code.replace(/\b(?:int|float|double|char\*|char|long|short|unsigned|size_t)\s+([A-Za-z0-9_]+)\s*;/g, 'var $1;');
  code = code.replace(/return\s+0\s*;/g, '');

  const logs = [];
  function __c_printf(fmt, ...args) {
    let s = fmt.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/%%/g, '%');
    for (const a of args) {
      if (s.includes('%.2f')) s = s.replace('%.2f', Number(a).toFixed(2));
      else if (s.includes('%.1f')) s = s.replace('%.1f', Number(a).toFixed(1));
      else if (s.includes('%f')) s = s.replace('%f', String(a));
      else if (s.includes('%d') || s.includes('%i')) s = s.replace(/%[di]/, String(a));
      else if (s.includes('%s')) s = s.replace('%s', String(a));
      else if (s.includes('%c')) s = s.replace('%c', String(a));
    }
    logs.push(s);
  }

  try {
    const fn = new Function('__c_printf', 'stdin', code + '\nif (typeof main === "function") main();');
    fn(__c_printf, stdin);
    return { ok: true, stdout: logs.join(''), stderr: '' };
  } catch (err) {
    return { ok: false, stdout: logs.join(''), stderr: err.message || String(err), error: err.message || String(err) };
  }
}

// ==========================================
// Python Evaluator
// ==========================================
function evaluateClientPython(codeVal, lesson, stdin = '') {
  let code = codeVal.replace(/#[^\n]*/g, '');
  const logs = [];
  function __py_print(...args) {
    logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n');
  }
  let js = code.replace(/\bprint\s*\(([\s\S]*?)\)/g, '__py_print($1);');
  js = js.replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false').replace(/\bNone\b/g, 'null');
  try {
    const runner = new Function('__py_print', 'stdin', js);
    runner(__py_print, stdin);
    return { ok: true, stdout: logs.join(''), stderr: '' };
  } catch (err) {
    return { ok: false, stdout: logs.join(''), stderr: err.message || String(err), error: err.message || String(err) };
  }
}

// ==========================================
// Master Unified Evaluation Engine
// ==========================================
function evaluateSubmission(course, lesson, codeVal, options = {}) {
  const lang = lesson.language || (course.language ? course.language.toLowerCase() : 'rust');
  const path = options.path || '/api/grade';
  const isRun = path === '/api/run';

  // 1. Guard against empty code
  if (isCodeEmpty(codeVal)) {
    if (isRun) return { compiled: false, error: 'Your code is empty. Write code in the editor before running.', stdout: '', stderr: 'Code is empty.' };
    return {
      passed: false,
      compiled: false,
      checkFailed: 'Your code is empty. Write a solution before submitting.',
      results: (lesson.tests || []).map((t, i) => ({
        name: t.name || `Test ${i + 1}`,
        pass: false,
        input: t.stdin || '',
        expected: t.expected,
        got: '(Code is empty)',
        stderr: 'Write code in the editor before submitting.'
      }))
    };
  }

  // 2. Guard against unchanged starter code
  if (isStarterUnchanged(codeVal, lesson.starter)) {
    if (isRun) {
      return {
        compiled: true,
        stdout: '(Starter code unchanged - write your code to see output)',
        stderr: '',
        exitCode: 0
      };
    }
    return {
      passed: false,
      compiled: true,
      checkFailed: 'Starter code is unchanged. Complete the task in the editor before submitting.',
      results: (lesson.tests || []).map((t, i) => ({
        name: t.name || `Test ${i + 1}`,
        pass: false,
        input: t.stdin || '',
        expected: t.expected,
        got: '(Starter code unchanged - no solution submitted)',
        stderr: "You haven't written a solution yet."
      }))
    };
  }

  // 3. Guard against unfinished placeholder macros (todo!() or unimplemented!())
  if (hasPlaceholderMacros(codeVal)) {
    if (isRun) {
      return { compiled: false, error: 'Encountered unfinished placeholder todo!() in code. Implement the function logic.', stdout: '', stderr: 'todo!() not implemented' };
    }
    return {
      passed: false,
      compiled: true,
      checkFailed: 'Incomplete solution: todo!() must be replaced with your implementation.',
      results: (lesson.tests || []).map((t, i) => ({
        name: t.name || `Test ${i + 1}`,
        pass: false,
        input: t.stdin || '',
        expected: t.expected,
        got: '(todo!() encountered)',
        stderr: 'Replace todo!() with working code.'
      }))
    };
  }

  // 4. Guard against missing requirements in lesson.require
  const reqCheck = verifyRequirements(codeVal, lesson.require || []);
  if (!reqCheck.ok) {
    if (isRun) {
      return { compiled: false, error: reqCheck.error, stdout: '', stderr: reqCheck.error };
    }
    return {
      passed: false,
      compiled: true,
      checkFailed: reqCheck.error,
      results: (lesson.tests || []).map((t, i) => ({
        name: t.name || `Test ${i + 1}`,
        pass: false,
        input: t.stdin || '',
        expected: t.expected,
        got: `(Check failed: ${reqCheck.error})`,
        stderr: reqCheck.error
      }))
    };
  }

  // Helper to run evaluator for a given stdin
  function runOne(stdinStr) {
    if (lang === 'bash' || lang === 'linux') {
      const sim = simulateBash(codeVal, lesson, { includePrompts: isRun });
      return {
        ok: true,
        stdout: isRun ? sim.sessionLog : sim.rawStdout,
        stderr: ''
      };
    }
    if (lang === 'javascript' || lang === 'web') {
      return evaluateClientJS(codeVal, stdinStr);
    }
    if (lang === 'rust') {
      return evaluateClientRust(codeVal, lesson, stdinStr);
    }
    if (lang === 'c') {
      return evaluateClientC(codeVal, lesson, stdinStr);
    }
    if (lang === 'python' || lang === 'cybersecurity') {
      return evaluateClientPython(codeVal, lesson, stdinStr);
    }
    return { ok: false, stdout: '', stderr: `Unsupported language: ${lang}` };
  }

  // Run Code mode
  if (isRun) {
    const res = runOne(options.stdin || '');
    if (!res.ok && res.error) {
      return { compiled: false, error: res.error, stdout: '', stderr: res.stderr || res.error };
    }
    return {
      compiled: true,
      stdout: res.stdout || '(Program executed without producing output)',
      stderr: res.stderr || '',
      exitCode: 0
    };
  }

  // Grade Code mode - STRICT OUTPUT COMPARISON ONLY
  const tests = lesson.tests || [];
  const results = [];
  for (const [i, t] of tests.entries()) {
    const res = runOne(t.stdin || '');
    const got = normalizeOutput(res.stdout);
    const expected = normalizeOutput(t.expected);
    const pass = res.ok && got === expected;

    results.push({
      name: t.name || `Test ${i + 1}`,
      pass,
      input: t.stdin || '',
      expected,
      got: got || (res.error ? `Error: ${res.error}` : '(No output produced)'),
      stderr: pass ? '' : (res.stderr || (res.error ? String(res.error) : 'Output does not match expected output.'))
    });
  }

  const passed = results.length > 0 && results.every(r => r.pass);
  return {
    passed,
    compiled: true,
    results
  };
}

const UniversalGrader = {
  normalizeOutput,
  isCodeEmpty,
  isStarterUnchanged,
  hasPlaceholderMacros,
  verifyRequirements,
  simulateBash,
  evaluateClientJS,
  evaluateClientRust,
  evaluateClientC,
  evaluateClientPython,
  evaluateSubmission
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UniversalGrader;
}
if (typeof window !== 'undefined') {
  window.UniversalGrader = UniversalGrader;
}
