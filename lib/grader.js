// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const MAX_CODE = 30000;
const MAX_OUTPUT = 64 * 1024;
const COMPILE_TIMEOUT = 40000;
const RUN_TIMEOUT = 5000;

// Best-effort static denylists per language.
const DENY_RUST = [
  [/\binclude(_str|_bytes)?\s*!/, 'include!/include_str! macros are not allowed'],
  [/\b(env|option_env)\s*!/, 'env! macros are not allowed'],
  [/\bstd\s*::[^;]*\b(fs|net|process|env|os|ffi|thread)\b/, 'That part of std is not available in lessons'],
  [/\buse\s+std\s*::\s*\{[^}]*\b(fs|net|process|env|os|ffi|thread)\b/, 'That part of std is not available in lessons'],
  [/\b(core|alloc|libc)\s*::/, 'core/alloc/libc paths are not allowed'],
  [/\bextern\b/, '`extern` is not allowed'],
  [/\basm\s*!|\bglobal_asm\s*!/, 'inline assembly is not allowed'],
  [/\bunsafe\b/, '`unsafe` is not allowed in lessons'],
  [/#!?\[\s*(link|no_mangle|export_name|proc_macro|path)/, 'That attribute is not allowed'],
  [/\bmod\s+\w+\s*;/, 'External modules are not allowed'],
];

const DENY_C = [
  [/\bsystem\s*\(/, 'system() is not allowed'],
  [/\bfork\s*\(/, 'fork() is not allowed'],
  [/\bexec(l|lp|le|v|vp|vpe)?\s*\(/, 'exec functions are not allowed'],
  [/\bkill\s*\(/, 'kill() is not allowed'],
  [/\b#include\s*<sys\//, 'sys/ headers are not allowed'],
];

const DENY_JS = [
  [/\brequire\s*\(\s*['"]child_process['"]\s*\)/, 'child_process is not allowed'],
  [/\brequire\s*\(\s*['"]fs['"]\s*\)/, 'fs is not allowed'],
  [/\bprocess\.exit\b/, 'process.exit is not allowed'],
];

const DENY_PY = [
  [/\b(import\s+os|from\s+os\s+import)/, 'os module is not allowed'],
  [/\b(subprocess|shutil)\b/, 'subprocess/shutil modules are not allowed'],
  [/\b(eval|exec)\s*\(/, 'eval/exec are not allowed'],
];

const DENY_SH = [
  [/\brm\s+(-[rfRF]+\s+)?\//, 'Absolute directory removal is not allowed'],
  [/\bmkfs\b/, 'mkfs is not allowed'],
  [/\bdd\b/, 'dd is not allowed'],
  [/\b:\(\)\{ :\|: & \};:/, 'Fork bombs are not allowed'],
];

function getLanguage(lesson) {
  if (lesson.language) return lesson.language.toLowerCase();
  if (lesson.course && lesson.course.language) {
    const l = lesson.course.language.toLowerCase();
    if (l.includes('c') && !l.includes('rust')) return 'c';
    if (l.includes('web') || l.includes('javascript') || l.includes('html')) return 'javascript';
    if (l.includes('linux') || l.includes('bash')) return 'bash';
    if (l.includes('cyber') || l.includes('python')) return 'python';
  }
  return 'rust';
}

function runProc(cmd, args, { cwd, stdin = '', timeoutMs }) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      cwd,
      detached: true,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: {
        PATH: process.env.PATH,
        HOME: process.env.HOME,
        RUSTUP_HOME: process.env.RUSTUP_HOME,
        CARGO_HOME: process.env.CARGO_HOME,
        LANG: 'C.UTF-8',
      },
    });
    let stdout = '', stderr = '', timedOut = false, truncated = false, done = false;
    const kill = () => { try { process.kill(-child.pid, 'SIGKILL'); } catch (_) { /* gone */ } };
    const timer = setTimeout(() => { timedOut = true; kill(); }, timeoutMs);
    const add = (which) => (d) => {
      if (stdout.length + stderr.length > MAX_OUTPUT) { truncated = true; kill(); return; }
      if (which === 'o') stdout += d; else stderr += d;
    };
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', add('o'));
    child.stderr.on('data', add('e'));
    child.stdin.on('error', () => {});
    child.stdin.end(stdin);
    const finish = (code, signal) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      kill();
      resolve({ code, signal, stdout, stderr, timedOut, truncated });
    };
    child.on('close', finish);
    child.on('error', (e) => { stderr += String(e); finish(-1, null); });
  });
}

// Concurrency limiter so bursts cannot swamp the host.
let active = 0;
const queue = [];
const MAX_ACTIVE = Math.max(2, Math.min(4, os.cpus().length));
const MAX_QUEUE = 30;
function withSlot(fn) {
  return new Promise((resolve, reject) => {
    const go = () => {
      active++;
      fn().then(resolve, reject).finally(() => {
        active--;
        const n = queue.shift();
        if (n) n();
      });
    };
    if (active < MAX_ACTIVE) go();
    else if (queue.length >= MAX_QUEUE) reject(Object.assign(new Error('Server busy, try again shortly'), { busy: true }));
    else queue.push(go);
  });
}

function normalize(s) {
  return String(s).replace(/\r/g, '').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').replace(/\s+$/, '');
}

function cleanErr(s, dir) {
  return s.split(dir).join('.').replace(/\x1b\[[0-9;]*m/g, '').slice(0, 6000);
}

async function prepareEnvironment(lesson, source) {
  if (typeof source !== 'string' || !source.trim()) return { ok: false, error: 'Your code is empty.' };
  if (source.length > MAX_CODE) return { ok: false, error: 'Code is too long.' };

  const lang = getLanguage(lesson);
  let denylist = DENY_RUST;
  if (lang === 'c') denylist = DENY_C;
  else if (lang === 'javascript' || lang === 'web') denylist = DENY_JS;
  else if (lang === 'python' || lang === 'cybersecurity') denylist = DENY_PY;
  else if (lang === 'bash' || lang === 'linux') denylist = DENY_SH;

  for (const [re, msg] of denylist) {
    if (re.test(source)) return { ok: false, error: `Not allowed: ${msg}` };
  }

  const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'l4f-'));

  // If lesson provides initial sandbox files (e.g. for Linux or Cybersecurity challenges)
  if (lesson.setupFiles && typeof lesson.setupFiles === 'object') {
    for (const [filename, fileContent] of Object.entries(lesson.setupFiles)) {
      const filePath = path.join(dir, filename);
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      await fs.promises.writeFile(filePath, fileContent);
    }
  }

  if (lang === 'rust') {
    await fs.promises.writeFile(path.join(dir, 'main.rs'), source);
    const r = await runProc('sh', ['-c', 'ulimit -t 30; exec rustc --edition 2021 -C opt-level=0 -C debuginfo=0 -A warnings --color never -o main main.rs'], { cwd: dir, timeoutMs: COMPILE_TIMEOUT });
    if (r.code !== 0) {
      const msg = r.timedOut ? 'Compilation timed out.' : cleanErr(r.stderr || r.stdout || 'Compilation failed.', dir);
      await fs.promises.rm(dir, { recursive: true, force: true });
      return { ok: false, error: msg };
    }
    return { ok: true, dir, lang, execCmd: './main' };
  }

  if (lang === 'c') {
    await fs.promises.writeFile(path.join(dir, 'main.c'), source);
    const r = await runProc('sh', ['-c', 'ulimit -t 15; exec gcc -std=c11 -O0 -Wall -Wextra -Wno-unused-variable -Wno-unused-parameter -o main main.c -lm'], { cwd: dir, timeoutMs: 15000 });
    if (r.code !== 0) {
      const msg = r.timedOut ? 'C compilation timed out.' : cleanErr(r.stderr || r.stdout || 'Compilation failed.', dir);
      await fs.promises.rm(dir, { recursive: true, force: true });
      return { ok: false, error: msg };
    }
    return { ok: true, dir, lang, execCmd: './main' };
  }

  if (lang === 'javascript' || lang === 'web') {
    const cleanSource = source.replace(/\\`/g, '`').replace(/\\\${/g, '${');
    await fs.promises.writeFile(path.join(dir, 'main.js'), cleanSource);
    const r = await runProc('node', ['--check', 'main.js'], { cwd: dir, timeoutMs: 5000 });
    if (r.code !== 0) {
      const msg = cleanErr(r.stderr || 'Syntax error.', dir);
      await fs.promises.rm(dir, { recursive: true, force: true });
      return { ok: false, error: msg };
    }
    return { ok: true, dir, lang, execCmd: 'node main.js' };
  }

  if (lang === 'bash' || lang === 'linux') {
    await fs.promises.writeFile(path.join(dir, 'script.sh'), source);
    const r = await runProc('bash', ['-n', 'script.sh'], { cwd: dir, timeoutMs: 5000 });
    if (r.code !== 0) {
      const msg = cleanErr(r.stderr || 'Bash syntax error.', dir);
      await fs.promises.rm(dir, { recursive: true, force: true });
      return { ok: false, error: msg };
    }
    return { ok: true, dir, lang, execCmd: 'bash script.sh' };
  }

  if (lang === 'python' || lang === 'cybersecurity') {
    await fs.promises.writeFile(path.join(dir, 'main.py'), source);
    const r = await runProc('python3', ['-m', 'py_compile', 'main.py'], { cwd: dir, timeoutMs: 5000 });
    if (r.code !== 0) {
      const msg = cleanErr(r.stderr || 'Python syntax error.', dir);
      await fs.promises.rm(dir, { recursive: true, force: true });
      return { ok: false, error: msg };
    }
    return { ok: true, dir, lang, execCmd: 'python3 -u main.py' };
  }

  await fs.promises.rm(dir, { recursive: true, force: true });
  return { ok: false, error: `Unsupported language: ${lang}` };
}

async function executeInDir(env, stdin) {
  const r = await runProc('sh', ['-c', `ulimit -v 1000000; ulimit -f 1024; ulimit -t 5; exec ${env.execCmd}`], { cwd: env.dir, stdin, timeoutMs: RUN_TIMEOUT });
  let stdout = r.stdout;
  if (env.dir) {
    stdout = stdout.split(env.dir).join('/home/student/workspace');
    try {
      const real = fs.realpathSync(env.dir);
      if (real !== env.dir) stdout = stdout.split(real).join('/home/student/workspace');
    } catch (_) {}
  }
  let stderr = cleanErr(r.stderr, env.dir);
  if (r.timedOut) stderr += '\n(Time limit exceeded - is there an infinite loop?)';
  if (r.truncated) stderr += '\n(Output limit exceeded)';
  return { stdout, stderr, exitCode: r.code, timedOut: r.timedOut };
}

const build = (lesson, code) => (lesson.harness ? `${code}\n\n${lesson.harness}\n` : code);

/** Run student's code once with arbitrary stdin */
function run(lesson, code, stdin = '') {
  return withSlot(async () => {
    const env = await prepareEnvironment(lesson, build(lesson, code));
    if (!env.ok) return { compiled: false, error: env.error };
    try {
      return { compiled: true, ...(await executeInDir(env, String(stdin).slice(0, 4000))) };
    } finally {
      fs.promises.rm(env.dir, { recursive: true, force: true }).catch(() => {});
    }
  });
}

/** Grade a submission against all lesson tests */
function grade(lesson, code) {
  return withSlot(async () => {
    if (typeof code === 'string') {
      for (const rule of lesson.require || []) {
        if (!new RegExp(rule.re, 's').test(code)) {
          return { passed: false, compiled: true, checkFailed: rule.msg, results: [] };
        }
      }
      if (lesson.harness && (/\bfn\s+main\s*\(/.test(code) && getLanguage(lesson) === 'rust')) {
        return { passed: false, compiled: false, error: 'Do not define `main` in this lesson - the autograder provides it.' };
      }
    }
    const env = await prepareEnvironment(lesson, build(lesson, code));
    if (!env.ok) return { passed: false, compiled: false, error: env.error };
    try {
      const results = [];
      for (const [i, t] of lesson.tests.entries()) {
        const r = await executeInDir(env, t.stdin || '');
        const got = normalize(r.stdout), expected = normalize(t.expected);
        results.push({
          name: t.name || `Test ${i + 1}`,
          pass: r.exitCode === 0 && got === expected,
          input: t.stdin || '',
          expected,
          got,
          stderr: r.stderr,
        });
      }
      return { passed: results.every((x) => x.pass), compiled: true, results };
    } finally {
      fs.promises.rm(env.dir, { recursive: true, force: true }).catch(() => {});
    }
  });
}

module.exports = { grade, run };
