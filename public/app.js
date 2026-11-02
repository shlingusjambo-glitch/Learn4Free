// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const app = document.getElementById('app');
let courses = [];
let docsData = (typeof RUST_DOCS !== 'undefined') ? RUST_DOCS : [];

// ---------- Lucide Icons (Self-Contained SVG Engine) ----------
const ICONS = {
  'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  'flask-conical': '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
  'library': '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
  'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  'book-marked': '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 2v14l3-2.5 3 2.5V2"/>',
  'lightbulb': '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  'file-code': '<path d="M10 12.5 8 15l2 2.5"/><path d="m14 12.5 2 2.5-2 2.5"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>',
  'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  'play': '<polygon points="6 3 20 12 6 21 6 3"/>',
  'check-circle-2': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  'check': '<polyline points="20 6 9 17 4 12"/>',
  'x-circle': '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'terminal': '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
  'trophy': '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  'upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  'code': '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  'copy': '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
};

function lucide(name, size = 16, cls = '') {
  const content = ICONS[name] || '';
  return `<svg class="lucide lucide-${name} ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${content}</svg>`;
}

// ---------- Progress State (Browser Local Storage) ----------
const store = {
  get(k, d) { try { const v = localStorage.getItem('l4f.' + k); return v === null ? d : JSON.parse(v); } catch (_) { return d; } },
  set(k, v) { try { localStorage.setItem('l4f.' + k, JSON.stringify(v)); } catch (_) { /* private mode */ } },
};
const doneSet = (cid) => store.get('done.' + cid, {});
const markDone = (cid, lid) => { const d = doneSet(cid); d[lid] = true; store.set('done.' + cid, d); };

// Export & Import Progress
window.exportProgress = function() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('l4f.')) data[k] = localStorage.getItem(k);
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'learn4free-progress.json';
  a.click();
};

window.importProgress = function(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      let count = 0;
      for (const [k, v] of Object.entries(data)) {
        if (k.startsWith('l4f.')) {
          localStorage.setItem(k, v);
          count++;
        }
      }
      alert(`Progress imported successfully (${count} entries restored)!`);
      location.reload();
    } catch (_) {
      alert('Could not import progress: invalid JSON file.');
    }
  };
  reader.readAsText(file);
};

// ---------- Helpers ----------
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; };

function inline(s) {
  if (!s) return '';
  return esc(s)
    .replace(/\^([^^\n]+)\^/g, '<code>$1</code>')
    .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
}

function renderMarkup(src) {
  const out = [];
  const parts = src.split(/^~~~\s*$/m);
  parts.forEach((part, i) => {
    if (i % 2 === 1) {
      const code = part.replace(/^\n|\n$/g, '');
      out.push(`
        <div class="code-wrap-relative">
          <button class="btn-copy-code" onclick="copySnippet(this, ${esc(JSON.stringify(code))})" title="Copy code">
            ${lucide('copy', 12)} <span>Copy</span>
          </button>
          <pre><code>${highlight(code)}</code></pre>
        </div>`);
      return;
    }
    let list = false, para = [];
    const flush = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
    const closeList = () => { if (list) { out.push('</ul>'); list = false; } };
    for (const line of part.split('\n')) {
      if (/^## /.test(line)) { flush(); closeList(); out.push(`<h2>${inline(line.slice(3))}</h2>`); }
      else if (/^!\[(.*?)\]\((.*?)\)/.test(line)) {
        flush(); closeList();
        const m = line.match(/^!\[(.*?)\]\((.*?)\)/);
        out.push(`<figure class="lesson-figure"><img src="${esc(m[2])}" alt="${esc(m[1])}" class="lesson-figure-img" /><figcaption class="lesson-figure-cap">${esc(m[1])}</figcaption></figure>`);
      }
      else if (/^- /.test(line)) { flush(); if (!list) { out.push('<ul>'); list = true; } out.push(`<li>${inline(line.slice(2))}</li>`); }
      else if (!line.trim()) { flush(); closeList(); }
      else { closeList(); para.push(line); }
    }
    flush(); closeList();
  });
  return out.join('\n');
}

// Global copy helper
window.copySnippet = function(btn, text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = `${lucide('check', 12)} <span>Copied!</span>`;
      btn.classList.add('copied');
      setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 1600);
    }).catch(() => {});
  }
};

// ---------- Syntax highlighting (Rust, C, Web/JS, Python & Bash) ----------
const KW = new Set('as break const continue crate dyn else enum extern false fn for if impl in let loop match mod move mut pub ref return self Self static struct super trait true type unsafe use where while int void char float double long short unsigned signed switch case default sizeof typedef NULL auto register volatile goto echo export chmod grep cat head tail sort uniq wc pwd ls cd mkdir touch cp mv rm then fi elif function var class new this typeof of null undefined async await try catch'.split(' '));
const TOKEN = /(\/\/[^\n]*|#[ \t][^\n]*|#$)|("(?:\\[\s\S]|[^"\\])*"?)|('(?:\\.|[^'\\\n])'|'[A-Za-z_]\w*)|(\b\d[\d_]*(?:\.\d+)?[A-Za-z]\w*|\b\d[\d_]*(?:\.\d+)?)|(#[A-Za-z_]\w*|\b[A-Za-z_]\w*!)|(\b[A-Za-z_]\w*)/g;
function highlight(code) {
  let out = '', last = 0, m;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(code))) {
    out += esc(code.slice(last, m.index));
    const t = esc(m[0]);
    if (m[1]) out += `<span class="tk-com">${t}</span>`;
    else if (m[2]) out += `<span class="tk-str">${t}</span>`;
    else if (m[3]) out += `<span class="${m[3].length > 2 && m[3][0] === "'" && /^'[A-Za-z_]\w*$/.test(m[3]) ? 'tk-lt' : 'tk-str'}">${t}</span>`;
    else if (m[4]) out += `<span class="tk-num">${t}</span>`;
    else if (m[5]) out += `<span class="tk-mac">${t}</span>`;
    else if (KW.has(m[6])) out += `<span class="tk-kw">${t}</span>`;
    else if (/^[A-Z]/.test(m[6]) || /^(i|u)(8|16|32|64|128|size)$|^f(32|64)$|^(bool|char|str|int|float|double|void|size_t)$/.test(m[6])) out += `<span class="tk-ty">${t}</span>`;
    else out += t;
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}

// ---------- Actionable Beginner Error Diagnostics ----------
function friendlyDiagnostic(rawError) {
  if (!rawError || typeof rawError !== 'string') return null;
  const checks = [
    {
      re: /mismatched types/i,
      title: 'Type Mismatch',
      tip: 'Rust expected one type of data, but found another. Rust never converts types automatically. Use `as` for numbers (e.g. `n as f64`), or check your function return type.'
    },
    {
      re: /expected `;`|expected one of .*;,/i,
      title: 'Missing Semicolon (;)',
      tip: 'In Rust, statements usually end with a semicolon `;` (like a period in a sentence). Look at the indicated line or the line right above it.'
    },
    {
      re: /cannot find (value|function|type)/i,
      title: 'Name Not Found',
      tip: 'Rust does not recognize this name. Check for typos, make sure variables are created with `let` before you use them, or ensure the function is defined.'
    },
    {
      re: /cannot borrow .* as mutable|cannot assign to immutable/i,
      title: 'Cannot Modify Immutable Variable',
      tip: 'Rust variables are read-only (immutable) by default. To allow changes, add `mut` when declaring it: `let mut variable_name = ...`.'
    },
    {
      re: /borrow of moved value|value used here after move/i,
      title: 'Ownership Moved',
      tip: 'In Rust, non-primitive values have a single owner. When passed or assigned, ownership moves. Use `&` to borrow it instead, or `.clone()` to create a duplicate.'
    },
    {
      re: /cannot borrow .* as mutable more than once/i,
      title: 'Multiple Mutable Borrows',
      tip: 'Rust only allows one mutable reference (`&mut`) to a value at any given time to keep data safe.'
    },
    {
      re: /cannot borrow .* as mutable because it is also borrowed as immutable/i,
      title: 'Borrow Conflict',
      tip: 'You cannot borrow a value mutably (`&mut`) while an immutable reference (`&`) to it is still being used.'
    },
    {
      re: /this function takes \d+ (parameter|argument).* but \d+.* supplied/i,
      title: 'Wrong Number of Arguments',
      tip: 'The function was called with a different number of arguments than it was defined to accept.'
    },
    {
      re: /index out of bounds/i,
      title: 'Index Out of Bounds',
      tip: 'You tried to access an item past the end of the array or slice. Remember index positions start at 0 and go up to length - 1.'
    },
    {
      re: /mismatched closing delimiter|unclosed delimiter/i,
      title: 'Mismatched Brackets or Braces',
      tip: 'Check that every `(`, `[`, and `{` has a matching `)`, `]`, and `}` in the correct order.'
    },
    {
      re: /infinite loop|time limit exceeded/i,
      title: 'Time Limit Exceeded (Infinite Loop)',
      tip: 'Your code took too long to run. Check your `loop` or `while` statements to ensure their conditions eventually finish or break!'
    }
  ];
  for (const c of checks) {
    if (c.re.test(rawError)) return c;
  }
  return null;
}

// ---------- Course Glossary Aggregator ----------
function getAllTerms(target) {
  const map = new Map();
  const list = Array.isArray(target) ? target : [target];
  for (const course of list) {
    if (!course || !course.units) continue;
    for (const u of course.units) {
      for (const l of u.lessons) {
        for (const t of (l.terms || [])) {
          const key = t.term.toLowerCase();
          if (!map.has(key)) {
            map.set(key, {
              term: t.term,
              def: t.def,
              lessonId: l.id,
              lessonNumber: l.number,
              lessonTitle: l.title,
              unitTitle: u.title,
              courseId: course.id,
              courseTitle: course.title,
            });
          }
        }
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => a.term.localeCompare(b.term));
}

// ---------- Router ----------
async function boot() {
  if (typeof LEARN4FREE_COURSES !== 'undefined' && Array.isArray(LEARN4FREE_COURSES) && LEARN4FREE_COURSES.length) {
    courses = LEARN4FREE_COURSES;
  } else {
    try {
      const res = await fetch('/api/courses');
      if (res.ok) courses = await res.json();
    } catch (_) {}
  }
  if (!docsData || !docsData.length) {
    try {
      const res = await fetch('/api/docs');
      if (res.ok) docsData = await res.json();
    } catch (_) {}
  }

  if (!courses || !courses.length) {
    app.innerHTML = '<div class="page"><div class="clean-wrap"><h1>Could not connect to the Learn4Free curriculum catalog.</h1></div></div>';
    return;
  }
  window.addEventListener('hashchange', route);
  route();
}

function route() {
  const [, cid, lid] = location.hash.split('/');
  document.title = 'Learn4Free - Free Coding Education';

  // Highlight active topnav link
  const navCourses = document.getElementById('nav-courses');
  const navDocs = document.getElementById('nav-docs');
  const navAbout = document.getElementById('nav-about');

  if (navCourses) navCourses.classList.toggle('active', !cid || (cid && cid !== 'docs' && cid !== 'about'));
  if (navDocs) navDocs.classList.toggle('active', cid === 'docs');
  if (navAbout) navAbout.classList.toggle('active', cid === 'about');

  if (!cid) return home();
  if (cid === 'about') return about();
  if (cid === 'docs') return docsPage();

  const course = courses.find((c) => c.id === cid);
  if (!course) return home();
  if (!lid) return coursePage(course);

  const flat = course.units.flatMap((u) => u.lessons.map((l) => ({ ...l, unit: u })));
  const idx = flat.findIndex((l) => l.id === lid);
  if (idx < 0) return coursePage(course);
  workspace(course, flat, idx);
}

const count = (c) => c.units.reduce((n, u) => n + u.lessons.length, 0);
const firstTodo = (c) => {
  const d = doneSet(c.id);
  for (const u of c.units) for (const l of u.lessons) if (!d[l.id]) return l.id;
  return c.units[0].lessons[0].id;
};

// ---------- Clean, Intuitive Homepage ----------
function home() {
  let activeCourse = null;
  let activeCourseDone = 0;
  let activeCourseTotal = 0;
  let activeNextLesson = null;

  for (const c of courses) {
    const d = doneSet(c.id);
    const completed = Object.keys(d).length;
    if (completed > 0 || !activeCourse) {
      activeCourse = c;
      activeCourseDone = completed;
      activeCourseTotal = count(c);
      const nextId = firstTodo(c);
      const flat = c.units.flatMap((u) => u.lessons.map((l) => ({ ...l, unit: u })));
      activeNextLesson = flat.find((l) => l.id === nextId) || flat[0];
    }
  }

  const activePercent = activeCourseTotal > 0 ? Math.round((activeCourseDone / activeCourseTotal) * 100) : 0;

  app.innerHTML = `
  <div class="page">
    <div class="clean-wrap">
      <!-- HERO -->
      <section class="hero-block">
        <span class="badge-pill">Free &amp; Open Source</span>
        <h1 class="hero-headline">Learn to code with clarity.<br>No paywalls. No accounts.</h1>
        <p class="hero-sub">
          A client-side interactive programming platform. We define every term before using it, test your work with real CodeHS-style test cases, and keep all your progress privately in your browser.
        </p>
      </section>

      <!-- ACTIVE RESUME CARD (Shows if student has started learning) -->
      ${activeCourse && activeCourseDone > 0 ? `
      <section class="resume-banner-card">
        <div class="resume-progress-top">
          <div class="resume-percent-badge">${activePercent}% Complete</div>
          <div class="resume-track">
            <div class="resume-track-fill" style="width: ${activePercent}%;"></div>
          </div>
        </div>
        <div class="resume-card-body">
          <div class="resume-info">
            <span class="resume-label">CURRENT TRACK</span>
            <h2 class="resume-title">${esc(activeCourse.title)}</h2>
            <div class="resume-lesson-meta">
              Next up: <strong>${esc(activeNextLesson.number)}: ${esc(activeNextLesson.title)}</strong> (${esc(activeNextLesson.unit.title)})
            </div>
            <div class="resume-stats-row">
              <span><strong>${activeCourseDone}</strong> of <strong>${activeCourseTotal}</strong> lessons completed</span>
            </div>
          </div>
          <div class="resume-actions">
            <a class="btn-primary-action" href="#/${activeCourse.id}/${activeNextLesson.id}">
              <span>Resume Lesson ${esc(activeNextLesson.number)}</span>
              ${lucide('arrow-right', 14)}
            </a>
            <a class="btn-secondary-action" href="#/${activeCourse.id}">View Curriculum</a>
          </div>
        </div>
      </section>` : ''}

      <!-- AVAILABLE COURSES & TRACKS -->
      <section class="section-block">
        <div class="section-header-row">
          <div>
            <h2 class="section-title">Course Catalog</h2>
            <p class="section-desc">Interactive curriculum tracks with live compilation, hidden test cases, and zero paywalls.</p>
          </div>
          <div class="catalog-badge">${courses.length} ${courses.length === 1 ? 'Language Available' : 'Languages Available'}</div>
        </div>

        <div class="courses-catalog-grid">
          ${courses.map((c) => {
            const d = doneSet(c.id);
            const doneCnt = Object.keys(d).length;
            const total = count(c);
            const pct = total > 0 ? Math.round((doneCnt / total) * 100) : 0;
            const nextLid = firstTodo(c);

            return `
            <div class="course-card-clean">
              <div class="course-card-top-strip">
                <span class="course-lang-tag">${esc(c.language || 'Programming')}</span>
                <span class="course-level-tag">Beginner Friendly</span>
              </div>

              <div class="course-card-content">
                <h3 class="course-title-text">${esc(c.title)}</h3>
                <p class="course-desc-text">${esc(c.description)}</p>

                <div class="course-metrics-row">
                  <span class="metric-item"><strong>${c.units.length}</strong> Units</span>
                  <span class="metric-divider">&middot;</span>
                  <span class="metric-item"><strong>${total}</strong> Lessons</span>
                  <span class="metric-divider">&middot;</span>
                  <span class="metric-item">Autograded</span>
                </div>

                <!-- Progress Bar -->
                <div class="course-bar-track">
                  <div class="course-bar-fill" style="width: ${pct}%;"></div>
                </div>
                <div class="course-progress-meta">
                  <span>${doneCnt} of ${total} lessons complete</span>
                  <span><strong>${pct}%</strong></span>
                </div>

                <!-- Action Buttons -->
                <div class="course-buttons-row">
                  <a class="btn-primary-action" href="#/${c.id}/${nextLid}">
                    <span>${doneCnt > 0 ? 'Continue Track' : 'Start Track'}</span>
                    ${lucide('arrow-right', 14)}
                  </a>
                  <a class="btn-secondary-action" href="#/${c.id}">Curriculum</a>
                  <a class="btn-secondary-action" href="#/docs">Docs</a>
                </div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </section>

      <!-- PORTABLE DATA: EXPORT & IMPORT PROGRESS -->
      <section class="section-block">
        <div class="card export-card">
          <div class="export-card-text">
            <h3>Take your progress anywhere without an account</h3>
            <p>Your work is saved locally in this browser. If you switch devices or use a school-managed computer, you can download a portable JSON backup and restore it anytime with one click.</p>
          </div>
          <div class="export-card-btns">
            <button class="btn-secondary-action" onclick="exportProgress()">
              ${lucide('download', 14)} <span>Export Progress JSON</span>
            </button>
            <label class="btn-secondary-action import-label">
              ${lucide('upload', 14)} <span>Import Progress JSON</span>
              <input type="file" accept=".json" onchange="importProgress(this)" style="display:none;" />
            </label>
          </div>
        </div>
      </section>

      <!-- CORE PRINCIPLES -->
      <section class="section-block">
        <h2 class="section-title">Built for learners who want depth without roadblocks</h2>
        <div class="principles-grid">
          <div class="principle-card">
            <div class="principle-icon-wrap">${lucide('book-open', 26)}</div>
            <h3>Expects Zero Terms</h3>
            <p>We never throw jargon at you without an immediate, clear definition. Every lesson includes a vocabulary reference with plain English explanations and analogies.</p>
          </div>

          <div class="principle-card">
            <div class="principle-icon-wrap">${lucide('flask-conical', 26)}</div>
            <h3>CodeHS-Style Test Cases</h3>
            <p>Review expected output vs your output for multiple test cases. Get actionable diagnostic guidance that translates compiler errors into friendly fixes.</p>
          </div>

          <div class="principle-card">
            <div class="principle-icon-wrap">${lucide('library', 26)}</div>
            <h3>Searchable Docs &amp; Glossary</h3>
            <p>Every language feature, keyword, and concept is documented with runnable examples. Filter by "What I've Learned" to see your personal cheatsheet grow.</p>
          </div>

          <div class="principle-card">
            <div class="principle-icon-wrap">${lucide('shield-check', 26)}</div>
            <h3>100% Free &amp; Open Source</h3>
            <p>Licensed under GPL-2.0. No 7-day trials, no credit card forms, and no gated solutions. Anyone can contribute lessons or new language tracks via GitHub.</p>
          </div>
        </div>
      </section>
    </div>

    <!-- HONEST, CLEAN FOOTER -->
    <footer class="clean-footer">
      <div class="clean-footer-wrap">
        <div class="footer-left-info">
          <div class="footer-brand"><strong>Learn4Free</strong></div>
          <p>Free, open source programming education for students, self-taught developers, and educators.</p>
          <div class="footer-subtext">Released under the GNU General Public License v2.0.</div>
        </div>
        <div class="footer-links-group">
          <h4>Navigation</h4>
          <a href="#/">Courses Catalog</a>
          <a href="#/docs">Documentation</a>
          <a href="#/about">About &amp; Contributing</a>
        </div>
        <div class="footer-links-group">
          <h4>Features</h4>
          <a href="#/docs">Searchable Cheatsheet</a>
          <a href="#/docs">Course Glossary</a>
          <a href="javascript:exportProgress()">Export Backup</a>
        </div>
      </div>
    </footer>
  </div>`;
}

// ---------- About Page ----------
function about() {
  app.innerHTML = `
  <div class="page">
    <div class="clean-wrap">
      <div class="card about-container">
        <span class="badge-pill">Open Education</span>
        <h1 class="about-title">About Learn4Free</h1>
        <p class="about-intro">
          Learn4Free is a free and open source programming education platform. It was created to remove the paywalls, subscriptions, and account requirements that keep people from learning to code.
        </p>

        <div class="about-section">
          <h3>Why Learn4Free is different</h3>
          <ul class="about-list">
            <li><strong>No accounts or tracking:</strong> Your progress and code drafts are preserved locally in your browser storage. You never need an email, password, or credit card.</li>
            <li><strong>Beginner-first explanations:</strong> We assume no prior knowledge. Every single technical term is defined explicitly with concrete analogies.</li>
            <li><strong>Multi-tiered autograder:</strong> Submissions are compiled against hidden-style test cases, showing expected output versus your output just like CodeHS.</li>
            <li><strong>Unlocked Docs &amp; Cheatsheets:</strong> As you complete lessons, you unlock a searchable reference guide with runnable code examples.</li>
          </ul>
        </div>

        <div class="about-section">
          <h3>Extensible Architecture for More Languages</h3>
          <p>Learn4Free is structured so that adding a new programming language track or skill path is as simple as defining a new module under <code>courses/&lt;language&gt;/</code>. Courses define their lessons, vocabulary, and test cases in clean JavaScript/JSON files.</p>
          <div style="margin-top: 16px;">
            <a class="btn-primary-action" href="#/">
              <span>Explore Available Courses</span>
              ${lucide('arrow-right', 14)}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// ---------- Course Curriculum Page (#/:courseId) ----------
function coursePage(course) {
  document.title = course.title + ' - Learn4Free';
  const d = doneSet(course.id), total = count(course), n = Object.keys(d).length;
  const pct = total > 0 ? Math.round((n / total) * 100) : 0;
  const nextLid = firstTodo(course);

  app.innerHTML = `
  <div class="page">
    <div class="clean-wrap">
      <div class="curriculum-overview-card">
        <div class="curriculum-top-row">
          <span class="course-lang-tag">${esc(course.language || 'Programming')}</span>
          <span class="course-level-tag">${total} Lessons</span>
        </div>
        <h1 class="curriculum-title">${esc(course.title)}</h1>
        <p class="curriculum-desc">${esc(course.description)}</p>

        <!-- Progress Bar -->
        <div class="curriculum-bar-track">
          <div class="curriculum-bar-fill" style="width: ${pct}%;"></div>
        </div>

        <div class="curriculum-meta-bar">
          <span class="curriculum-progress-text"><strong>${n} of ${total}</strong> lessons completed (${pct}%)</span>
          <div class="curriculum-actions">
            <a class="btn-primary-action" href="#/${course.id}/${nextLid}">
              <span>${n > 0 ? 'Resume Track' : 'Start Track'}</span>
              ${lucide('arrow-right', 14)}
            </a>
            <a class="btn-secondary-action" href="#/docs">Browse Docs</a>
          </div>
        </div>
      </div>

      <div class="units-list-container" id="units-container"></div>
    </div>
  </div>`;

  const unitsContainer = document.getElementById('units-container');
  course.units.forEach((u, ui) => {
    const dn = u.lessons.filter((l) => d[l.id]).length;
    unitsContainer.append(el(`
      <div class="unit-group-card">
        <div class="unit-group-head">
          <h3 class="unit-group-title">Unit ${ui + 1}: ${esc(u.title)}</h3>
          <span class="unit-group-count">${dn} / ${u.lessons.length} complete</span>
        </div>
        <div class="lessons-table">
          ${u.lessons.map((l) => `
            <a class="lesson-row-item ${l.isUnitTest ? 'unit-test-row' : ''}" href="#/${course.id}/${l.id}">
              <span class="lesson-status-circle ${d[l.id] ? 'completed' : ''}">${d[l.id] ? lucide('check', 13) : l.number}</span>
              <span class="lesson-row-title">
                ${esc(l.title)}
                ${l.isUnitTest ? `<span class="badge-unit-test-mini">${lucide('shield-check', 11)} <span>Unit Test</span></span>` : ''}
              </span>
              <span class="lesson-row-tests">${l.tests.length} ${l.tests.length === 1 ? 'test case' : 'test cases'}</span>
            </a>
          `).join('')}
        </div>
      </div>`));
  });
}

// ---------- Documentation Page (#/docs) ----------
function docsPage() {
  document.title = 'Documentation & Code Reference - Learn4Free';
  const allTerms = getAllTerms(courses);
  let totalDone = 0;
  for (const c of courses) {
    totalDone += Object.keys(doneSet(c.id)).length;
  }

  const categories = ['All', 'Printing & Output', 'Variables & Types', 'Control Flow', 'Functions', 'Ownership & Memory', 'Structs & Enums', 'Collections', 'Error Handling & Traits', 'Glossary'];

  app.innerHTML = `
  <div class="page">
    <div class="clean-wrap">
      <div class="docs-hero-header">
        <span class="badge-pill">Quick Reference</span>
        <h1>Documentation &amp; Cheatsheets</h1>
        <p>Scrollable code reference with runnable examples, syntax, and what it all does. Every term is defined with zero assumed prior knowledge.</p>
        <div class="docs-meta-stats">
          <span><strong>${docsData.length}</strong> Code Reference Cards</span>
          <span>&middot;</span>
          <span><strong>${allTerms.length}</strong> Technical Terms Defined</span>
          <span>&middot;</span>
          <span><strong>${totalDone}</strong> Lessons Completed</span>
        </div>
      </div>

      <div class="docs-search-card">
        <div class="docs-search-input-wrap">
          <span class="docs-search-glass">${lucide('search', 16)}</span>
          <input type="text" id="docs-search" class="docs-search-box" placeholder="Search commands, syntax, keywords, concepts (e.g. println, loop, mut, vector)..." autocomplete="off" />
          <button id="docs-search-clear" class="btn-clear-search" style="display:none;" title="Clear search">
            ${lucide('x', 16)}
          </button>
        </div>

        <div class="docs-options-row">
          <label class="radio-option"><input type="radio" name="docs-scope" value="all" checked /> <span>Show All Reference</span></label>
          <label class="radio-option"><input type="radio" name="docs-scope" value="learned" /> <span>Show What I've Learned (${doneCount} unlocked)</span></label>
        </div>

        <div class="docs-category-bar" id="docs-cats">
          ${categories.map((c, i) => `<button class="cat-tab-btn ${i === 0 ? 'active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}
        </div>
      </div>

      <div id="docs-results-summary" class="docs-results-counter"></div>
      <div id="docs-cards" class="docs-entries-grid"></div>
      <div id="docs-glossary" class="glossary-container" style="display:none;"></div>
    </div>
  </div>`;

  const searchInput = document.getElementById('docs-search');
  const clearBtn = document.getElementById('docs-search-clear');
  const resultsMeta = document.getElementById('docs-results-summary');
  const cardsContainer = document.getElementById('docs-cards');
  const glossaryContainer = document.getElementById('docs-glossary');
  const catButtons = document.querySelectorAll('.cat-tab-btn');
  const scopeInputs = document.querySelectorAll('input[name="docs-scope"]');

  let activeCat = 'All';
  let activeScope = 'all';

  function renderDocs() {
    const query = searchInput.value.trim().toLowerCase();
    clearBtn.style.display = query ? 'block' : 'none';

    if (activeCat === 'Glossary') {
      cardsContainer.style.display = 'none';
      glossaryContainer.style.display = 'block';
      renderGlossary(query);
      return;
    }

    cardsContainer.style.display = 'grid';
    glossaryContainer.style.display = 'none';

    let filtered = docsData.filter((d) => {
      if (activeCat !== 'All' && d.category !== activeCat) return false;
      if (activeScope === 'learned') {
        if (!done[d.lessonId]) return false;
      }
      if (!query) return true;
      const haystack = `${d.title} ${d.syntax} ${d.summary} ${d.explanation} ${(d.terms || []).join(' ')} ${d.category}`.toLowerCase();
      return haystack.includes(query);
    });

    if (activeScope === 'learned' && filtered.length === 0 && !query && doneCount === 0) {
      resultsMeta.innerHTML = `<div class="empty-docs-notice">You haven't completed any lessons yet! As you complete lessons in the course, your personal cheatsheet will unlock and show up here. Switch to <strong>"Show All Reference"</strong> above to see all code.</div>`;
      cardsContainer.innerHTML = '';
      return;
    }

    resultsMeta.innerHTML = `Showing <strong>${filtered.length}</strong> ${filtered.length === 1 ? 'card' : 'cards'}${activeCat !== 'All' ? ` in <em>${esc(activeCat)}</em>` : ''}${activeScope === 'learned' ? ' (What I\'ve Learned)' : ''}`;

    if (filtered.length === 0) {
      cardsContainer.innerHTML = `<div class="card empty-state-card"><h3>No matching documentation found</h3><p>Try searching for a different keyword or select "All" categories.</p></div>`;
      return;
    }

    cardsContainer.innerHTML = filtered.map((item) => {
      const isLearned = done[item.lessonId];
      return `
      <div class="doc-entry-card ${isLearned ? 'card-learned' : ''}">
        <div class="doc-card-top-bar">
          <div>
            <span class="doc-badge-pill">${esc(item.badge)}</span>
            <span class="doc-category-name">${esc(item.category)}</span>
            <h2 class="doc-entry-title">${esc(item.title)}</h2>
          </div>
          <span class="doc-status-tag ${isLearned ? 'learned' : 'upcoming'}">
            ${isLearned ? `${lucide('check', 12)} <span>Learned in ${esc(item.lessonNumber)}</span>` : `<span>${esc(item.lessonNumber)} (Upcoming)</span>`}
          </span>
        </div>

        <p class="doc-entry-summary">${esc(item.summary)}</p>
        <p class="doc-entry-explanation">${inline(item.explanation)}</p>

        <div class="doc-field-label">Syntax</div>
        <div class="code-wrap-relative">
          <button class="btn-copy-code" onclick="copySnippet(this, ${esc(JSON.stringify(item.syntax))})" title="Copy syntax">
            ${lucide('copy', 12)} <span>Copy</span>
          </button>
          <pre><code>${highlight(item.syntax)}</code></pre>
        </div>

        <div class="doc-field-label">Working Example</div>
        <div class="code-wrap-relative">
          <button class="btn-copy-code" onclick="copySnippet(this, ${esc(JSON.stringify(item.example))})" title="Copy example">
            ${lucide('copy', 12)} <span>Copy</span>
          </button>
          <pre><code>${highlight(item.example)}</code></pre>
        </div>

        <div class="doc-field-label">Expected Output</div>
        <pre class="doc-output-box">${esc(item.output)}</pre>

        ${item.terms && item.terms.length ? `
        <div class="doc-terms-flex">
          <span class="doc-field-label" style="margin:0;">Key Terms:</span>
          ${item.terms.map(t => `<span class="term-token">${esc(t)}</span>`).join('')}
        </div>` : ''}
      </div>`;
    }).join('');
  }

  function renderGlossary(query) {
    let list = allTerms;
    if (query) {
      list = list.filter(t => t.term.toLowerCase().includes(query) || t.def.toLowerCase().includes(query));
    }
    resultsMeta.innerHTML = `Glossary: Showing <strong>${list.length}</strong> technical terms defined across the curriculum.`;

    if (list.length === 0) {
      glossaryContainer.innerHTML = `<div class="card empty-state-card"><h3>No terms found</h3><p>Try searching for a different term name or concept.</p></div>`;
      return;
    }

    glossaryContainer.innerHTML = `
      <div class="glossary-items-grid">
        ${list.map(t => `
          <div class="card glossary-term-box">
            <div class="glossary-header-row">
              <strong class="glossary-term-code"><code>${esc(t.term)}</code></strong>
              <a class="glossary-jump-link" href="#/${t.courseId}/${t.lessonId}">Lesson ${t.lessonNumber}</a>
            </div>
            <div class="glossary-term-def">${inline(t.def)}</div>
          </div>
        `).join('')}
      </div>`;
  }

  searchInput.addEventListener('input', renderDocs);
  clearBtn.onclick = () => { searchInput.value = ''; searchInput.focus(); renderDocs(); };

  catButtons.forEach((b) => {
    b.onclick = () => {
      catButtons.forEach(btn => btn.classList.remove('active'));
      b.classList.add('active');
      activeCat = b.dataset.cat;
      renderDocs();
    };
  });

  scopeInputs.forEach((r) => {
    r.onchange = () => {
      activeScope = r.value;
      renderDocs();
    };
  });

  renderDocs();
}

// ---------- Lesson Workspace (CodeHS-style autograder) ----------
function workspace(course, flat, idx) {
  const lesson = flat[idx], prev = flat[idx - 1], next = flat[idx + 1];
  const draftKey = `code.${course.id}.${lesson.id}`;
  document.title = `${lesson.number} ${lesson.title} - Learn4Free`;
  const done = doneSet(course.id);
  const unitLessons = lesson.unit.lessons;
  const isWebCourse = course.id === 'web' || (lesson.language && (lesson.language === 'javascript' || lesson.language === 'html' || lesson.language === 'css')) || (lesson.fileName && (lesson.fileName.endsWith('.html') || lesson.fileName.endsWith('.js')));
  const isLinuxCourse = course.id === 'linux' || (lesson.language && (lesson.language === 'bash' || lesson.language === 'sh'));

  app.innerHTML = `
  <div class="workspace" id="workspace">
    <!-- LEFT PANE: Instructions & Embedded Docs -->
    <section class="pane left-pane" id="pane-left">
      <div class="left-tabs">
        <button id="lt-inst" class="on" title="View lesson instructions and vocabulary">
          ${lucide('file-text', 14)} <span>Instructions</span>
        </button>
        <button id="lt-docs" title="View documentation and code reference">
          ${lucide('book-marked', 14)} <span>Docs &amp; Cheatsheet</span>
        </button>
      </div>

      <!-- Instructions Tab Content -->
      <div class="left-tab-content on" id="lp-inst">
        <div class="status-bar ${done[lesson.id] ? 'status-completed' : 'status-todo'}">
          <span class="status-indicator"></span>
          <span class="status-text">${done[lesson.id] ? `${lucide('check', 13)} <span>Status: Completed</span>` : '<span>Status: In Progress</span>'}</span>
        </div>

        <div class="lesson-body">
          <div class="lesson-header-title">
            <div class="lesson-tag-row">
              <span class="unit-tag">Unit ${esc(lesson.number.split('.')[0])}: ${esc(lesson.unit.title)}</span>
              ${lesson.isUnitTest ? `<span class="badge-unit-test">${lucide('shield-check', 13)} <span>Unit Test</span></span>` : ''}
            </div>
            <h1>${esc(lesson.number)}: ${esc(lesson.title)}</h1>
          </div>

          <!-- Visual Concept Diagram / Illustration -->
          ${lesson.image ? `
          <figure class="lesson-figure">
            <img src="${esc(lesson.image.url || lesson.image)}" alt="${esc(lesson.image.caption || lesson.title)}" class="lesson-figure-img" />
            ${lesson.image.caption ? `<figcaption class="lesson-figure-cap">${esc(lesson.image.caption)}</figcaption>` : ''}
          </figure>` : ''}

          <!-- Vocabulary Card: Defined with ZERO assumed knowledge -->
          ${lesson.terms && lesson.terms.length ? `
          <div class="vocab-card">
            <div class="vocab-head">
              ${lucide('book-open', 16)}
              <strong>Vocabulary &amp; Key Terms</strong>
            </div>
            <p class="vocab-intro">Defined in plain English expecting zero prior knowledge:</p>
            <div class="vocab-list">
              ${lesson.terms.map(t => `
                <div class="vocab-item">
                  <div class="vocab-term"><code>${esc(t.term)}</code></div>
                  <div class="vocab-def">${inline(t.def)}</div>
                </div>
              `).join('')}
            </div>
          </div>` : ''}

          <!-- Main Lesson Content -->
          <div class="lesson-markup">${renderMarkup(lesson.content)}</div>

          <!-- Progressive Hint Dropdown -->
          ${lesson.hint ? `
          <details class="hint-details" id="hint-acc">
            <summary>${lucide('lightbulb', 15)} <span>Need a hint? (Click to reveal)</span></summary>
            <div class="hint-body">
              <strong>Hint:</strong> ${inline(lesson.hint)}
            </div>
          </details>` : ''}

          <div class="docs-footer-note">
            <span>Need syntax or code reference?</span>
            <button class="link-btn" id="open-docs-btn">
              <span>Open Docs Tab</span>
              ${lucide('arrow-right', 12)}
            </button>
          </div>
        </div>
      </div>

      <!-- Embedded Docs Tab Content -->
      <div class="left-tab-content" id="lp-docs">
        <div class="embedded-docs-wrap">
          <div class="ed-docs-head">
            <input type="text" id="ed-docs-search" class="docs-search-box" placeholder="Search commands, syntax, keywords..." autocomplete="off" />
            <div class="ed-docs-filter-row">
              <button class="ed-filter-btn active" id="ed-filter-all">All Docs</button>
              <button class="ed-filter-btn" id="ed-filter-learned">What I've Learned</button>
            </div>
          </div>
          <div id="ed-docs-list" class="ed-docs-list"></div>
        </div>
      </div>
    </section>

    <!-- Draggable Divider 1 -->
    <div class="gutter-h" id="gutter-1" title="Drag to resize columns"></div>

    <!-- MIDDLE PANE: Code Editor or Simulated Linux Terminal -->
    <section class="pane editor-pane ${isLinuxCourse ? 'is-terminal' : ''}" id="pane-mid">
      ${isLinuxCourse ? `
        <div class="ed-head term-head">
          <div class="term-window-controls">
            <span class="term-dot close"></span>
            <span class="term-dot min"></span>
            <span class="term-dot max"></span>
          </div>
          <div class="term-title">
            ${lucide('terminal', 13)}
            <span>student@learn4free: ~/workspace (bash)</span>
          </div>
          <div class="ed-actions">
            <button id="reset" class="btn-ghost" title="Restore original starter shell commands">
              ${lucide('rotate-ccw', 12)} <span>Reset</span>
            </button>
            <button id="run" class="btn-ghost btn-term-run" title="Execute terminal commands in simulated Linux sandbox (Ctrl+Enter)">
              ${lucide('play', 12)} <span>Execute Commands</span> <kbd>Ctrl+Enter</kbd>
            </button>
            <button id="submit" class="btn-primary" title="Submit and grade terminal tasks (Ctrl+Shift+Enter)">
              ${lucide('check-circle-2', 14)} <span>Submit &amp; Continue</span> <kbd>Ctrl+Shift+Enter</kbd>
            </button>
          </div>
        </div>
        <div class="term-env-bar">
          <span class="term-env-badge">${lucide('terminal', 12)} bash 5.2</span>
          <span class="term-env-user">student@learn4free</span>
          <span class="term-env-sep">:</span>
          <span class="term-env-cwd">~/workspace$</span>
          <span class="term-env-hint">Interactive Shell Simulator</span>
        </div>
      ` : `
        <div class="ed-head">
          <div class="ed-file-tab">
            <span class="file-icon">${lucide('file-code', 15)}</span>
            <span class="file-name">${esc(lesson.fileName || (course.id === 'c' ? 'main.c' : course.id === 'cybersecurity' ? 'security.py' : course.id === 'web' ? 'index.html' : 'main.rs'))}</span>
          </div>
          <div class="ed-actions">
            <button id="reset" class="btn-ghost" title="Restore original starter code">
              ${lucide('rotate-ccw', 12)} <span>Reset</span>
            </button>
            <button id="run" class="btn-ghost" title="Run code without grading (Shortcut: Ctrl+Enter)">
              ${lucide('play', 12)} <span>Run</span> <kbd>Ctrl+Enter</kbd>
            </button>
            <button id="submit" class="btn-primary" title="Submit and grade test cases (Shortcut: Ctrl+Shift+Enter)">
              ${lucide('check-circle-2', 14)} <span>Submit &amp; Continue</span> <kbd>Ctrl+Shift+Enter</kbd>
            </button>
          </div>
        </div>
      `}
      <div class="editor ${isLinuxCourse ? 'is-terminal' : ''}">
        <pre class="gutter" id="gutter"></pre>
        <div class="code-area">
          <pre class="hl" id="hl" aria-hidden="true"></pre>
          <textarea id="code" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off" aria-label="${isLinuxCourse ? 'Terminal command prompt' : 'Code editor'}" placeholder="${isLinuxCourse ? '# Enter bash shell commands here (e.g. ls, pwd, cd, mkdir, cat...)' : ''}"></textarea>
        </div>
      </div>
    </section>

    <!-- Draggable Divider 2 -->
    <div class="gutter-h" id="gutter-2" title="Drag to resize columns"></div>

    <!-- RIGHT PANE: Output, Test Cases & Live Browser Preview -->
    <section class="pane right-pane" id="pane-right">
      <div class="right-tabs">
        ${isWebCourse ? `
          <button id="t-preview" class="on" title="View real-time graphical website preview">
            ${lucide('layout', 14)} <span>Live Preview</span>
          </button>
          <button id="t-test" title="View expected output and pass/fail evaluation">
            ${lucide('flask-conical', 14)} <span>Test Cases (${lesson.tests.length})</span>
          </button>
          <button id="t-run" title="View standard output and console logs">
            ${lucide('terminal', 14)} <span>Console (Run)</span>
          </button>
        ` : `
          <button id="t-run" class="on" title="View standard output and interactive console">
            ${lucide('terminal', 14)} <span>${isLinuxCourse ? 'Terminal Session (bash)' : 'Console (Run)'}</span>
          </button>
          <button id="t-test" title="View expected output and pass/fail evaluation">
            ${lucide('flask-conical', 14)} <span>Test Cases (${lesson.tests.length})</span>
          </button>
        `}
      </div>

      ${isWebCourse ? `
        <!-- Live Website Preview Tab -->
        <div class="tab on web-preview-tab" id="p-preview">
          <div class="browser-mockup">
            <div class="browser-mockup-bar">
              <div class="browser-dots">
                <span class="b-dot close"></span>
                <span class="b-dot min"></span>
                <span class="b-dot max"></span>
              </div>
              <div class="browser-address-bar">
                <span class="browser-ssl-icon">${lucide('lock', 12)}</span>
                <span class="browser-url">https://groovebase.local/index.html</span>
                <button id="preview-refresh-btn" class="browser-reload-btn" title="Reload preview">
                  ${lucide('rotate-cw', 12)}
                </button>
              </div>
              <div class="browser-badge">
                <span class="live-dot"></span>
                <span>Live View</span>
              </div>
            </div>
            <div class="browser-viewport">
              <iframe id="web-preview-frame" sandbox="allow-scripts allow-modals" title="Real-time Website Output"></iframe>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Run / Console Tab -->
      <div class="tab ${isWebCourse ? '' : 'on'}" id="p-run">
        ${lesson.usesInput ? `
          <label for="stdin" class="doc-field-label">Program Input (stdin)</label>
          <textarea id="stdin" class="stdin-box" placeholder="Type standard input here, then click Run"></textarea>` : ''}
        <div class="console-label-row">
          <span class="doc-field-label">${isLinuxCourse ? 'Terminal Output' : 'Terminal Output'}</span>
          <span class="kbd-shortcut-label">Ctrl+Enter</span>
        </div>
        <pre class="out ${isLinuxCourse ? 'is-terminal' : ''}" id="out">${isLinuxCourse ? `Learn4Free Virtual Linux Terminal (x86_64-pc-linux-gnu)\nInteractive Bash Shell v5.2 - Sandboxed Filesystem\n\nstudent@learn4free:~/workspace$ ` : `Press "Run" (Ctrl+Enter) to compile and test your code.${lesson.hasHarness ? '\nNote: The autograder provides main() for this exercise and calls your function.' : ''}`}</pre>
        <div id="run-diagnostic-box"></div>
      </div>

      <!-- CodeHS-style Test Cases Tab -->
      <div class="tab" id="p-test">
        <div id="test-summary-banner" class="test-summary-initial">
          <div class="summary-title">Test Cases Evaluation</div>
          <div class="summary-desc">Click <strong>&ldquo;Submit &amp; Continue&rdquo;</strong> to grade your code against all ${lesson.tests.length} test ${lesson.tests.length === 1 ? 'case' : 'cases'}.</div>
        </div>
        <div id="results" class="results-list"></div>
      </div>
    </section>
  </div>

  <!-- Bottom Navigation Bar -->
  <div class="lessonbar">
    ${prev ? `<a class="nav" href="#/${course.id}/${prev.id}">${lucide('arrow-left', 14)} <span>Prev</span></a>` : `<span class="nav disabled">${lucide('arrow-left', 14)} <span>Prev</span></span>`}
    <select class="unit-sel" id="unitsel" aria-label="Jump to lesson">
      ${course.units.map((u, ui) => `
        <optgroup label="Unit ${ui + 1}: ${esc(u.title)}">
          ${u.lessons.map((l) => `<option value="${l.id}" ${l.id === lesson.id ? 'selected' : ''}>${l.number} ${esc(l.title)}</option>`).join('')}
        </optgroup>`).join('')}
    </select>
    <div class="pills">
      ${unitLessons.map((l) => `
        <a class="pill ${l.id === lesson.id ? 'cur' : done[l.id] ? 'done' : 'todo'}" title="${esc(l.title)}" href="#/${course.id}/${l.id}">
          ${done[l.id] ? lucide('check', 12) : l.number}
        </a>`).join('')}
    </div>
    ${next ? `<a class="nav" href="#/${course.id}/${next.id}"><span>Next</span> ${lucide('arrow-right', 14)}</a>` : `<a class="nav" href="#/${course.id}"><span>Finished</span> ${lucide('arrow-right', 14)}</a>`}
  </div>`;

  const $ = (id) => document.getElementById(id);
  const code = $('code'), hl = $('hl'), gutter = $('gutter'), out = $('out'), results = $('results');
  const summaryBanner = $('test-summary-banner');
  const runDiagnosticBox = $('run-diagnostic-box');

  code.value = store.get(draftKey, lesson.starter);

  const refresh = () => {
    hl.innerHTML = highlight(code.value) + '\n';
    const lines = code.value.split('\n').length;
    gutter.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
    hl.scrollTop = code.scrollTop; hl.scrollLeft = code.scrollLeft; gutter.scrollTop = code.scrollTop;
  };
  code.addEventListener('input', () => { store.set(draftKey, code.value); refresh(); });
  code.addEventListener('scroll', () => { hl.scrollTop = code.scrollTop; hl.scrollLeft = code.scrollLeft; gutter.scrollTop = code.scrollTop; });

  // Code editor shortcuts
  code.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Enter') {
      e.preventDefault(); submitGrading(); return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault(); runCode(); return;
    }
    const { selectionStart: s, selectionEnd: en, value: v } = code;
    const set = (text, start, end) => {
      code.value = text; code.selectionStart = start; code.selectionEnd = end;
      code.dispatchEvent(new Event('input'));
    };
    if (e.key === 'Tab') {
      e.preventDefault();
      if (s === en) set(v.slice(0, s) + '    ' + v.slice(en), s + 4, s + 4);
      else {
        const ls = v.lastIndexOf('\n', s - 1) + 1, block = v.slice(ls, en).split('\n');
        const nb = e.shiftKey ? block.map((l) => l.replace(/^ {1,4}/, '')) : block.map((l) => '    ' + l);
        set(v.slice(0, ls) + nb.join('\n') + v.slice(en), ls, ls + nb.join('\n').length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const ls = v.lastIndexOf('\n', s - 1) + 1, line = v.slice(ls, s);
      let ind = line.match(/^ */)[0];
      const opens = /[{(\[]\s*$/.test(line), closes = /^[})\]]/.test(v.slice(en));
      if (opens) ind += '    ';
      const ins = '\n' + ind + (opens && closes ? '\n' + ind.slice(4) : '');
      set(v.slice(0, s) + ins + v.slice(en), s + 1 + ind.length, s + 1 + ind.length);
    }
  });
  refresh();

  $('reset').onclick = () => {
    if (confirm('Restore starter code? Your modifications will be replaced with the original template.')) {
      code.value = lesson.starter; store.set(draftKey, code.value); refresh();
    }
  };

  $('unitsel').onchange = (e) => { location.hash = `#/${course.id}/${e.target.value}`; };

  // Left Pane Tabs (Instructions vs Docs)
  const leftTab = (name) => {
    $('lt-inst').classList.toggle('on', name === 'inst');
    $('lt-docs').classList.toggle('on', name === 'docs');
    $('lp-inst').classList.toggle('on', name === 'inst');
    $('lp-docs').classList.toggle('on', name === 'docs');
    if (name === 'docs') renderEmbeddedDocs();
  };
  $('lt-inst').onclick = () => leftTab('inst');
  $('lt-docs').onclick = () => leftTab('docs');
  if ($('open-docs-btn')) $('open-docs-btn').onclick = () => leftTab('docs');

  // Right Pane Tabs (Preview vs Run vs Test)
  const rightTab = (name) => {
    const tabs = isWebCourse ? ['preview', 'run', 'test'] : ['run', 'test'];
    for (const t of tabs) {
      if ($('t-' + t)) $('t-' + t).classList.toggle('on', t === name);
      if ($('p-' + t)) $('p-' + t).classList.toggle('on', t === name);
    }
  };
  if ($('t-preview')) $('t-preview').onclick = () => rightTab('preview');
  $('t-run').onclick = () => rightTab('run');
  $('t-test').onclick = () => rightTab('test');

  // Real-time Live Web Preview Renderer
  function extractHTMLForPreview(codeStr, stdoutStr) {
    if (stdoutStr && /<[a-z][\s\S]*>/i.test(stdoutStr)) {
      return stdoutStr;
    }
    const clean = (codeStr || '').trim();
    if (/^<!DOCTYPE/i.test(clean) || /^<html/i.test(clean) || /^<div|^<h[1-6]|^<p|^<header|^<main|^<section|^<style/i.test(clean)) {
      return clean;
    }
    const templateMatch = clean.match(/`([\s\S]*?)`/);
    if (templateMatch && /<[a-z][\s\S]*>/i.test(templateMatch[1])) {
      return templateMatch[1];
    }
    try {
      const res = evaluateClientJS(clean, '');
      if (res.stdout && /<[a-z][\s\S]*>/i.test(res.stdout)) {
        return res.stdout;
      }
    } catch (_) {}
    if (/\{[\s\S]*:[^;]+;\s*\}/.test(clean) && !/<[a-z]/i.test(clean)) {
      return `<style>${clean}</style><div style="font-family: -apple-system, sans-serif; padding: 20px;"><h3>CSS Styles Applied</h3><p>Your styles are active in the live preview.</p><button style="padding: 8px 16px; border-radius: 4px; cursor: pointer;">Sample Button</button></div>`;
    }
    if (clean) {
      return `<div style="font-family: monospace; white-space: pre-wrap; padding: 14px; color: #475569;">${esc(clean)}</div>`;
    }
    return '<div style="color: #94a3b8; font-style: italic; padding: 24px; font-family: -apple-system, sans-serif;">Start typing HTML or CSS to preview your site live...</div>';
  }

  function updateWebPreview(stdoutStr) {
    if (!isWebCourse) return;
    const frame = $('web-preview-frame');
    if (!frame) return;
    const content = extractHTMLForPreview(code.value, stdoutStr);
    let fullDoc = content;
    if (!/<!DOCTYPE\s+html/i.test(content) && !/<html[\s\S]*>/i.test(content)) {
      fullDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background-color: #ffffff;
      line-height: 1.6;
    }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
    }
    frame.srcdoc = fullDoc;
  }

  let previewDebounce;
  code.addEventListener('input', () => {
    if (isWebCourse) {
      clearTimeout(previewDebounce);
      previewDebounce = setTimeout(() => updateWebPreview(), 150);
    }
  });
  if ($('preview-refresh-btn')) {
    $('preview-refresh-btn').onclick = () => updateWebPreview();
  }
  if (isWebCourse) {
    updateWebPreview();
  }

  // Initial render of CodeHS Test Cases
  function renderInitialTestCases() {
    results.innerHTML = lesson.tests.map((t, i) => `
      <div class="test-case-card pending">
        <div class="test-case-header">
          <div class="test-case-title">
            <span class="test-dot-pending"></span>
            <strong>${esc(t.name || `Test Case ${i + 1}`)}</strong>
          </div>
          <span class="badge-status status-pending">NOT RUN YET</span>
        </div>
        <div class="test-case-body">
          ${t.input ? `
            <div class="test-field-label">INPUT (STDIN)</div>
            <pre class="test-pre test-in">${esc(t.input)}</pre>` : ''}
          <div class="test-field-label">EXPECTED OUTPUT</div>
          <pre class="test-pre test-exp">${esc(t.expected === '' ? '(empty)' : t.expected)}</pre>
          <div class="test-field-label">YOUR OUTPUT</div>
          <pre class="test-pre test-got pending-text">(Click "Submit &amp; Continue" to test your code)</pre>
        </div>
      </div>
    `).join('');
  }
  renderInitialTestCases();

  // Embedded Docs Handler
  let edScope = 'all';
  function renderEmbeddedDocs() {
    const list = $('ed-docs-list');
    const search = ($('ed-docs-search').value || '').trim().toLowerCase();
    const filtered = docsData.filter((d) => {
      if (edScope === 'learned' && !done[d.lessonId]) return false;
      if (!search) return true;
      const haystack = `${d.title} ${d.syntax} ${d.summary} ${d.explanation} ${(d.terms || []).join(' ')}`.toLowerCase();
      return haystack.includes(search);
    });

    if (edScope === 'learned' && filtered.length === 0 && !search) {
      list.innerHTML = `<div style="padding:16px; font-size:13px; color:var(--muted); text-align:center;">No unlocked docs yet. Complete lessons to build your reference, or click "All Docs" above.</div>`;
      return;
    }

    list.innerHTML = filtered.map((d) => `
      <div class="card" style="padding:12px; margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <strong style="color:var(--navy); font-size:13px;">${esc(d.title)}</strong>
          <span class="badge-pill" style="font-size:10px; margin:0;">${esc(d.badge)}</span>
        </div>
        <div style="font-size:12px; color:var(--muted); margin-bottom:8px;">${inline(d.summary)}</div>
        <div class="code-wrap-relative">
          <button class="btn-copy-code" onclick="copySnippet(this, ${esc(JSON.stringify(d.syntax))})" title="Copy">
            ${lucide('copy', 12)} <span>Copy</span>
          </button>
          <pre style="margin:0; font-size:12px; padding:8px 10px;"><code>${highlight(d.syntax)}</code></pre>
        </div>
      </div>
    `).join('');
  }

  $('ed-docs-search').oninput = renderEmbeddedDocs;
  $('ed-filter-all').onclick = () => {
    edScope = 'all';
    $('ed-filter-all').classList.add('active');
    $('ed-filter-learned').classList.remove('active');
    renderEmbeddedDocs();
  };
  $('ed-filter-learned').onclick = () => {
    edScope = 'learned';
    $('ed-filter-learned').classList.add('active');
    $('ed-filter-all').classList.remove('active');
    renderEmbeddedDocs();
  };

  // Draggable Splitters
  const setupSplitters = () => {
    const g1 = $('gutter-1'), g2 = $('gutter-2');
    const pLeft = $('pane-left'), pMid = $('pane-mid'), pRight = $('pane-right');
    const ws = $('workspace');

    function makeDraggable(gutter, onDrag) {
      gutter.addEventListener('mousedown', (e) => {
        e.preventDefault();
        gutter.classList.add('dragging');
        const onMove = (ev) => onDrag(ev);
        const onUp = () => {
          gutter.classList.remove('dragging');
          window.removeEventListener('mousemove', onMove);
          window.removeEventListener('mouseup', onUp);
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
      });
    }

    makeDraggable(g1, (e) => {
      const rect = ws.getBoundingClientRect();
      const newWidth = Math.max(200, Math.min(e.clientX - rect.left, rect.width - 450));
      pLeft.style.width = newWidth + 'px';
      pLeft.style.flex = 'none';
    });

    makeDraggable(g2, (e) => {
      const rect = ws.getBoundingClientRect();
      const newWidth = Math.max(220, Math.min(rect.right - e.clientX, rect.width - 450));
      pRight.style.width = newWidth + 'px';
      pRight.style.flex = 'none';
    });
  };
  setupSplitters();

  const busy = (b) => { $('run').disabled = b; $('submit').disabled = b; };

  function evaluateClientJS(codeStr, stdin) {
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

      let stdinInput = pipeStdin;
      const inRedirIdx = tokens.indexOf('<');
      if (inRedirIdx !== -1) {
        const targetFile = resolvePath(tokens[inRedirIdx + 1]);
        if (vfs.files[targetFile] !== undefined) {
          stdinInput = vfs.files[targetFile];
        }
        tokens.splice(inRedirIdx, 2);
      }

      const cmd = tokens[0];
      const args = tokens.slice(1);

      if (cmd === 'cd') {
        const target = args[0] || '~';
        const resolved = resolvePath(target);
        if (resolved === '' || vfs.directories.has(resolved)) {
          simCwd = resolved;
          return { stdout: '', stderr: '', exitCode: 0 };
        }
        return { stdout: '', stderr: `bash: cd: ${target}: No such file or directory\n`, exitCode: 1 };
      }

      if (cmd === 'pwd') {
        const fullPath = simCwd ? `/home/student/workspace/${simCwd}` : '/home/student/workspace';
        return { stdout: fullPath + '\n', stderr: '', exitCode: 0 };
      }

      if (cmd === 'ls') {
        let showAll = false;
        let longFormat = false;
        let targetDir = '';
        for (const a of args) {
          if (a === '-a') showAll = true;
          else if (a === '-l') longFormat = true;
          else if (a === '-la' || a === '-al') { showAll = true; longFormat = true; }
          else if (!a.startsWith('-')) targetDir = a;
        }
        if (longFormat && targetDir) {
          const fullTarget = resolvePath(targetDir);
          if (vfs.files[fullTarget] !== undefined) {
            const mode = vfs.permissions[fullTarget] || '644';
            let modeStr = '-rw-r--r--';
            if (mode === '600') modeStr = '-rw-------';
            if (mode === '755') modeStr = '-rwxr-xr-x';
            if (mode === '444') modeStr = '-r--r--r--';
            return { stdout: `${modeStr} 1 student student 1024 Jan 1 00:00 ${targetDir}\n`, stderr: '', exitCode: 0 };
          }
        }
        const entries = getListing(targetDir, showAll);
        return { stdout: entries.join('\n') + (entries.length ? '\n' : ''), stderr: '', exitCode: 0 };
      }

      if (cmd === 'mkdir') {
        for (const a of args) {
          if (a === '-p') continue;
          const resolved = resolvePath(a);
          const parts = resolved.split('/');
          let cur = '';
          for (const p of parts) {
            cur = cur ? cur + '/' + p : p;
            vfs.directories.add(cur);
          }
        }
        return { stdout: '', stderr: '', exitCode: 0 };
      }

      if (cmd === 'touch') {
        for (const a of args) {
          if (a.startsWith('-')) continue;
          const resolved = resolvePath(a);
          if (vfs.files[resolved] === undefined) {
            vfs.files[resolved] = '';
            vfs.permissions[resolved] = '644';
            const parts = resolved.split('/');
            let cur = '';
            for (let i = 0; i < parts.length - 1; i++) {
              cur = cur ? cur + '/' + parts[i] : parts[i];
              vfs.directories.add(cur);
            }
          }
        }
        return { stdout: '', stderr: '', exitCode: 0 };
      }

      if (cmd === 'cat') {
        if (args.length === 0) return { stdout: stdinInput, stderr: '', exitCode: 0 };
        let outText = '';
        for (const a of args) {
          const resolved = resolvePath(a);
          if (vfs.files[resolved] !== undefined) {
            outText += vfs.files[resolved];
          } else {
            return { stdout: outText, stderr: `cat: ${a}: No such file or directory\n`, exitCode: 1 };
          }
        }
        return { stdout: outText, stderr: '', exitCode: 0 };
      }

      if (cmd === 'head') {
        let linesCount = 10;
        let file = '';
        for (let j = 0; j < args.length; j++) {
          if (args[j] === '-n' && args[j + 1]) {
            linesCount = parseInt(args[j + 1], 10);
            j++;
          } else if (!args[j].startsWith('-')) {
            file = args[j];
          }
        }
        let content = stdinInput;
        if (file) {
          const resolved = resolvePath(file);
          content = vfs.files[resolved] || '';
        }
        const splitLines = content.split('\n');
        if (splitLines[splitLines.length - 1] === '') splitLines.pop();
        return { stdout: splitLines.slice(0, linesCount).join('\n') + '\n', stderr: '', exitCode: 0 };
      }

      if (cmd === 'tail') {
        let linesCount = 10;
        let file = '';
        for (let j = 0; j < args.length; j++) {
          if (args[j] === '-n' && args[j + 1]) {
            linesCount = parseInt(args[j + 1], 10);
            j++;
          } else if (!args[j].startsWith('-')) {
            file = args[j];
          }
        }
        let content = stdinInput;
        if (file) {
          const resolved = resolvePath(file);
          content = vfs.files[resolved] || '';
        }
        const splitLines = content.split('\n');
        if (splitLines[splitLines.length - 1] === '') splitLines.pop();
        return { stdout: splitLines.slice(-linesCount).join('\n') + '\n', stderr: '', exitCode: 0 };
      }

      if (cmd === 'grep') {
        let caseInsensitive = false;
        let countOnly = false;
        let invert = false;
        let pattern = '';
        let file = '';
        for (let j = 0; j < args.length; j++) {
          if (args[j] === '-i') caseInsensitive = true;
          else if (args[j] === '-c') countOnly = true;
          else if (args[j] === '-v') invert = true;
          else if (args[j] === '-ci' || args[j] === '-ic') { countOnly = true; caseInsensitive = true; }
          else if (!pattern) pattern = args[j];
          else if (!file) file = args[j];
        }
        let content = stdinInput;
        if (file) {
          const resolved = resolvePath(file);
          content = vfs.files[resolved] || '';
        }
        const splitLines = content.split('\n');
        if (splitLines[splitLines.length - 1] === '') splitLines.pop();
        const matched = splitLines.filter(line => {
          let l = line, p = pattern;
          if (caseInsensitive) { l = l.toLowerCase(); p = p.toLowerCase(); }
          const has = l.includes(p);
          return invert ? !has : has;
        });
        if (countOnly) return { stdout: matched.length + '\n', stderr: '', exitCode: 0 };
        return { stdout: matched.join('\n') + (matched.length ? '\n' : ''), stderr: '', exitCode: 0 };
      }

      if (cmd === 'cp') {
        const src = resolvePath(args[0]);
        const dst = resolvePath(args[1]);
        if (vfs.files[src] !== undefined) {
          vfs.files[dst] = vfs.files[src];
          vfs.permissions[dst] = vfs.permissions[src] || '644';
          return { stdout: '', stderr: '', exitCode: 0 };
        }
        return { stdout: '', stderr: `cp: cannot stat '${args[0]}': No such file or directory\n`, exitCode: 1 };
      }

      if (cmd === 'mv') {
        const src = resolvePath(args[0]);
        let dst = resolvePath(args[1]);
        if (vfs.directories.has(dst)) {
          const base = src.split('/').pop();
          dst = dst ? dst + '/' + base : base;
        }
        if (vfs.files[src] !== undefined) {
          vfs.files[dst] = vfs.files[src];
          vfs.permissions[dst] = vfs.permissions[src] || '644';
          delete vfs.files[src];
          return { stdout: '', stderr: '', exitCode: 0 };
        }
        return { stdout: '', stderr: `mv: cannot stat '${args[0]}': No such file or directory\n`, exitCode: 1 };
      }

      if (cmd === 'rm') {
        for (const a of args) {
          delete vfs.files[resolvePath(a)];
        }
        return { stdout: '', stderr: '', exitCode: 0 };
      }

      if (cmd === 'chmod') {
        const mode = args[0];
        const target = resolvePath(args[1]);
        if (vfs.files[target] !== undefined) {
          vfs.permissions[target] = mode === '+x' ? '755' : mode;
        }
        return { stdout: '', stderr: '', exitCode: 0 };
      }

      if (cmd === 'echo') {
        return { stdout: args.join(' ') + '\n', stderr: '', exitCode: 0 };
      }

      if (cmd === 'export') {
        for (const a of args) {
          const eqIdx = a.indexOf('=');
          if (eqIdx !== -1) {
            const k = a.slice(0, eqIdx);
            const v = a.slice(eqIdx + 1).replace(/^["']|["']$/g, '');
            simEnv[k] = v;
          }
        }
        return { stdout: '', stderr: '', exitCode: 0 };
      }

      if (cmd === 'set') {
        if (args[0] === '--') positionalArgs = args.slice(1);
        return { stdout: '', stderr: '', exitCode: 0 };
      }

      if (cmd === 'sort') {
        let reverse = false, numeric = false, file = '';
        for (const a of args) {
          if (a === '-r') reverse = true;
          else if (a === '-n') numeric = true;
          else if (a === '-nr' || a === '-rn') { reverse = true; numeric = true; }
          else if (!a.startsWith('-')) file = a;
        }
        let content = stdinInput;
        if (file) content = vfs.files[resolvePath(file)] || '';
        const splitLines = content.split('\n');
        if (splitLines[splitLines.length - 1] === '') splitLines.pop();
        splitLines.sort((a, b) => {
          if (numeric) {
            const numA = parseFloat(a.trim().split(/\s+/)[0]) || 0;
            const numB = parseFloat(b.trim().split(/\s+/)[0]) || 0;
            if (numA !== numB) return reverse ? numB - numA : numA - numB;
          }
          const cmp = a.localeCompare(b);
          return reverse ? -cmp : cmp;
        });
        return { stdout: splitLines.join('\n') + (splitLines.length ? '\n' : ''), stderr: '', exitCode: 0 };
      }

      if (cmd === 'uniq') {
        let countMode = false;
        for (const a of args) if (a === '-c') countMode = true;
        const splitLines = stdinInput.split('\n');
        if (splitLines[splitLines.length - 1] === '') splitLines.pop();
        const out = [];
        let curLine = null, count = 0;
        for (const l of splitLines) {
          if (l === curLine) {
            count++;
          } else {
            if (curLine !== null) {
              out.push(countMode ? `${String(count).padStart(7, ' ')} ${curLine}` : curLine);
            }
            curLine = l;
            count = 1;
          }
        }
        if (curLine !== null) {
          out.push(countMode ? `${String(count).padStart(7, ' ')} ${curLine}` : curLine);
        }
        return { stdout: out.join('\n') + (out.length ? '\n' : ''), stderr: '', exitCode: 0 };
      }

      if (cmd === 'wc') {
        let file = '';
        for (const a of args) if (!a.startsWith('-')) file = a;
        let content = stdinInput;
        if (file) content = vfs.files[resolvePath(file)] || '';
        const splitLines = content.split('\n');
        if (splitLines[splitLines.length - 1] === '') splitLines.pop();
        return { stdout: splitLines.length + '\n', stderr: '', exitCode: 0 };
      }

      if (cmd === 'awk') {
        const splitLines = stdinInput.split('\n');
        if (splitLines[splitLines.length - 1] === '') splitLines.pop();
        const out = splitLines.map(l => l.trim().split(/\s+/)[0]);
        return { stdout: out.join('\n') + (out.length ? '\n' : ''), stderr: '', exitCode: 0 };
      }

      if (cmd.startsWith('./')) {
        const scriptFile = resolvePath(cmd.slice(2));
        if (vfs.files[scriptFile] !== undefined) {
          const perm = vfs.permissions[scriptFile] || '644';
          if (perm === '755' || perm === '+x') {
            if (scriptFile.includes('launch_rocket')) {
              return { stdout: 'Rocket launched into orbit!\n', stderr: '', exitCode: 0 };
            }
            if (scriptFile.includes('run_vault')) {
              const envStr = simEnv['VAULT_ENV'] || 'dev';
              const portStr = simEnv['VAULT_PORT'] || '8080';
              return { stdout: `${envStr} ready on port ${portStr}\n`, stderr: '', exitCode: 0 };
            }
            return { stdout: 'Script executed successfully.\n', stderr: '', exitCode: 0 };
          }
          return { stdout: '', stderr: `bash: ${cmd}: Permission denied\n`, exitCode: 126 };
        }
        return { stdout: '', stderr: `bash: ${cmd}: No such file or directory\n`, exitCode: 127 };
      }

      return { stdout: '', stderr: `bash: ${cmd}: command not found\n`, exitCode: 127 };
    }

    function splitByCharOutsideQuotes(str, char) {
      const parts = [];
      let cur = '', inD = false, inS = false;
      for (let j = 0; j < str.length; j++) {
        const ch = str[j];
        if (ch === '"' && !inS) inD = !inD;
        else if (ch === "'" && !inD) inS = !inS;
        else if (ch === char && !inD && !inS) {
          parts.push(cur);
          cur = '';
          continue;
        }
        cur += ch;
      }
      parts.push(cur);
      return parts;
    }

    function executePipeline(pipeLineStr) {
      let redirectMode = null, redirectTarget = null, execStr = pipeLineStr;
      const redirParts = splitByCharOutsideQuotes(pipeLineStr, '>');
      if (redirParts.length === 3 && pipeLineStr.includes('>>')) {
        execStr = redirParts[0].trim();
        redirectTarget = resolvePath(redirParts[2].trim());
        redirectMode = 'append';
      } else if (redirParts.length === 2) {
        execStr = redirParts[0].trim();
        redirectTarget = resolvePath(redirParts[1].trim());
        redirectMode = 'overwrite';
      }

      const parts = splitByCharOutsideQuotes(execStr, '|').map(s => s.trim());
      let currentInput = '', lastStdout = '', lastStderr = '', lastExit = 0;
      for (const part of parts) {
        const res = executeSingleCommand(part, currentInput);
        lastStdout = res.stdout;
        lastStderr = res.stderr;
        lastExit = res.exitCode;
        currentInput = res.stdout;
        if (res.exitCode !== 0) break;
      }

      if (redirectMode && redirectTarget) {
        if (redirectMode === 'overwrite') {
          vfs.files[redirectTarget] = lastStdout;
        } else if (redirectMode === 'append') {
          vfs.files[redirectTarget] = (vfs.files[redirectTarget] || '') + lastStdout;
        }
        if (vfs.permissions[redirectTarget] === undefined) vfs.permissions[redirectTarget] = '644';
        lastStdout = '';
      }
      return { stdout: lastStdout, stderr: lastStderr, exitCode: lastExit };
    }

    const lines = codeStr.split('\n');
    let lineIdx = 0;
    while (lineIdx < lines.length) {
      const rawLine = lines[lineIdx];
      const trimmed = rawLine.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        lineIdx++;
        continue;
      }

      if (trimmed.startsWith('if ')) {
        let condLine = trimmed;
        const thenLines = [];
        const elseLines = [];
        let inThen = false, inElse = false;
        while (lineIdx < lines.length) {
          const l = lines[lineIdx].trim();
          if (l.startsWith('if ') && !inThen) {
            condLine = l;
            if (l.includes('; then') || l.endsWith('then')) inThen = true;
          } else if (l === 'then') {
            inThen = true;
          } else if (l === 'else') {
            inThen = false;
            inElse = true;
          } else if (l === 'fi') {
            break;
          } else {
            if (inElse) elseLines.push(lines[lineIdx]);
            else if (inThen) thenLines.push(lines[lineIdx]);
          }
          lineIdx++;
        }
        lineIdx++;

        let condPassed = true;
        const andParts = condLine.slice(3).replace(/\s*;?\s*then$/, '').split('&&');
        for (let part of andParts) {
          part = part.trim();
          const negFileMatch = part.match(/\[\s*!\s*-f\s+["']?([^"']+)["']?\s*\]/);
          const fileMatch = part.match(/\[\s*-f\s+["']?([^"']+)["']?\s*\]/);
          if (negFileMatch) {
            if (vfs.files[resolvePath(negFileMatch[1])] !== undefined) condPassed = false;
          } else if (fileMatch) {
            if (vfs.files[resolvePath(fileMatch[1])] === undefined) condPassed = false;
          }
        }

        if (includePrompts) sessionLog.push(promptStr() + rawLine.trim());
        const execBlock = condPassed ? thenLines : elseLines;
        for (const bl of execBlock) {
          const btrimmed = bl.trim();
          if (!btrimmed || btrimmed.startsWith('#')) continue;
          if (includePrompts) sessionLog.push(promptStr() + btrimmed);
          const res = executePipeline(btrimmed);
          if (res.stdout) {
            if (includePrompts) sessionLog.push(res.stdout.replace(/\n$/, ''));
            rawStdout.push(res.stdout);
          }
          if (res.stderr) {
            if (includePrompts) sessionLog.push(res.stderr.replace(/\n$/, ''));
            rawStdout.push(res.stderr);
          }
        }
        continue;
      }

      if (includePrompts) sessionLog.push(promptStr() + trimmed);
      const res = executePipeline(trimmed);
      if (res.stdout) {
        if (includePrompts) sessionLog.push(res.stdout.replace(/\n$/, ''));
        rawStdout.push(res.stdout);
      }
      if (res.stderr) {
        if (includePrompts) sessionLog.push(res.stderr.replace(/\n$/, ''));
        rawStdout.push(res.stderr);
      }
      lineIdx++;
    }

    if (includePrompts) sessionLog.push(promptStr());
    return {
      rawStdout: rawStdout.join('').replace(/\r/g, ''),
      sessionOutput: sessionLog.join('\n')
    };
  }

  function clientSideEvaluate(path, course, lesson, codeVal, options) {
    if (window.UniversalGrader && typeof window.UniversalGrader.evaluateSubmission === 'function') {
      return window.UniversalGrader.evaluateSubmission(course, lesson, codeVal, {
        path,
        stdin: (options && options.stdin) || ''
      });
    }
    return {
      passed: false,
      compiled: false,
      error: 'Autograder engine initializing...',
      results: (lesson.tests || []).map((t, i) => ({
        name: t.name || `Test ${i + 1}`,
        pass: false,
        input: t.stdin || '',
        expected: t.expected,
        got: '(Engine loading)',
        stderr: 'Please try again in a moment.'
      }))
    };
  }

  async function post(path, body) {
    try {
      const r = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course: course.id, lesson: lesson.id, code: code.value, ...body })
      });
      if (r.ok) {
        return await r.json();
      }
    } catch (_) {}
    return clientSideEvaluate(path, course, lesson, code.value, body);
  }

  // Run Code
  async function runCode() {
    rightTab('run'); busy(true);
    out.textContent = isLinuxCourse ? 'Executing shell commands in simulated environment...' : 'Compiling and running...';
    runDiagnosticBox.innerHTML = '';
    try {
      const j = await post('/api/run', { stdin: $('stdin') ? $('stdin').value : '' });
      if (!j.compiled) {
        out.innerHTML = '';
        out.append(Object.assign(document.createElement('span'), { className: 'e', textContent: j.error }));
        const diag = friendlyDiagnostic(j.error);
        if (diag) {
          runDiagnosticBox.innerHTML = `
            <div class="diag-card">
              <div class="diag-head">${lucide('lightbulb', 15)} ${esc(diag.title)}</div>
              <div class="diag-tip">${inline(diag.tip)}</div>
            </div>`;
        }
      } else {
        out.textContent = j.stdout || '';
        if (j.stderr) {
          out.append(Object.assign(document.createElement('span'), { className: 'e', textContent: (j.stdout ? '\n' : '') + j.stderr }));
        }
        if (!j.stdout && !j.stderr) out.textContent = isLinuxCourse ? 'student@learn4free:~/workspace$ ' : '(Program completed with no output)';
        if (isWebCourse) {
          updateWebPreview(j.stdout);
        }
      }
    } catch (e) {
      out.textContent = e.message;
    }
    busy(false);
  }
  $('run').onclick = runCode;

  // Submit and Grade
  async function submitGrading() {
    rightTab('test'); busy(true);
    summaryBanner.className = 'test-summary-grading';
    summaryBanner.innerHTML = `<div class="summary-title">${lucide('clock', 16)} <span>Grading Solution...</span></div><div class="summary-desc">Evaluating your code against all ${lesson.tests.length} autograder test cases.</div>`;
    results.innerHTML = '';

    try {
      const j = await post('/api/grade', {});
      const nextBtn = next
        ? `<a class="btn-primary-action celebration-btn" href="#/${course.id}/${next.id}"><span>Continue to Lesson ${esc(next.number)}</span> ${lucide('arrow-right', 14)}</a>`
        : `<a class="btn-primary-action celebration-btn" href="#/${course.id}"><span>${lucide('trophy', 16)} Course Completed! View Curriculum</span></a>`;

      if (!j.compiled) {
        summaryBanner.className = 'test-summary-fail';
        summaryBanner.innerHTML = `<div class="summary-title">${lucide('x-circle', 16)} <span>Execution Failed</span></div><div class="summary-desc">${course.language || 'The compiler'} could not run your program. Review the guidance below:</div>`;
        const diag = friendlyDiagnostic(j.error);
        results.innerHTML = `
          ${diag ? `
            <div class="diag-card">
              <div class="diag-head">${lucide('lightbulb', 15)} ${esc(diag.title)}</div>
              <div class="diag-tip">${inline(diag.tip)}</div>
            </div>` : ''}
          <div class="test-field-label">COMPILER OUTPUT</div>
          <pre class="out">${esc(j.error)}</pre>`;
      } else if (j.checkFailed && (!j.results || j.results.length === 0)) {
        summaryBanner.className = 'test-summary-fail';
        summaryBanner.innerHTML = `<div class="summary-title">${lucide('x-circle', 16)} <span>Requirement Check Failed</span></div><div class="summary-desc">${esc(j.checkFailed)}</div>`;
        renderInitialTestCases();
      } else {
        const passCount = (j.results || []).filter((r) => r.pass).length;
        if (j.checkFailed) {
          summaryBanner.className = 'test-summary-fail';
          summaryBanner.innerHTML = `<div class="summary-title">${lucide('x-circle', 16)} <span>Requirement Check Failed</span></div><div class="summary-desc">${esc(j.checkFailed)}</div>`;
        } else if (j.passed) {
          markDone(course.id, lesson.id);
          summaryBanner.className = 'test-summary-pass';
          summaryBanner.innerHTML = `
            <div class="summary-title">${lucide('check-circle-2', 18)} <span>All ${j.results.length} / ${j.results.length} Test Cases Passed!</span></div>
            <div class="summary-desc">Excellent work! Your code satisfied all test conditions.</div>
            <div class="summary-actions">${nextBtn}</div>`;

          const statusBar = document.querySelector('.status-bar');
          if (statusBar) {
            statusBar.className = 'status-bar status-completed';
            const statusText = statusBar.querySelector('.status-text');
            if (statusText) statusText.innerHTML = `${lucide('check', 13)} <span>Status: Completed</span>`;
          }
          const p = document.querySelector('.pill.cur');
          if (p) {
            p.classList.add('done');
            p.innerHTML = lucide('check', 12);
          }
        } else {
          summaryBanner.className = 'test-summary-fail';
          summaryBanner.innerHTML = `
            <div class="summary-title">${lucide('x-circle', 18)} <span>${passCount} / ${j.results.length} Test Cases Passed</span></div>
            <div class="summary-desc">Your output differed on some test cases. Compare Expected Output vs Your Output below to debug:</div>`;
        }

        results.innerHTML = j.results.map((r, i) => {
          let diffHint = '';
          if (!r.pass) {
            if (!r.got) {
              diffHint = 'Notice: No output was captured. Make sure your program prints the answer using println!.';
            } else if (r.got.toLowerCase() === r.expected.toLowerCase()) {
              diffHint = 'Notice: Capitalization difference. Rust output checking is case-sensitive.';
            } else if (r.got.replace(/\s+/g, '') === r.expected.replace(/\s+/g, '')) {
              diffHint = 'Notice: Spacing or newline difference. Check your spaces, commas, and punctuation.';
            } else {
              diffHint = 'Notice: Output does not match the expected text.';
            }
          }

          return `
          <div class="test-case-card ${r.pass ? 'pass' : 'fail'}">
            <div class="test-case-header">
              <div class="test-case-title">
                ${r.pass ? lucide('check-circle-2', 16, 'icon-pass') : lucide('x-circle', 16, 'icon-fail')}
                <strong>${esc(r.name || `Test Case ${i + 1}`)}</strong>
              </div>
              <span class="badge-status ${r.pass ? 'status-pass' : 'status-fail'}">${r.pass ? 'PASSED' : 'FAILED'}</span>
            </div>
            <div class="test-case-body">
              ${r.input ? `
                <div class="test-field-label">INPUT (STDIN)</div>
                <pre class="test-pre test-in">${esc(r.input)}</pre>` : ''}
              <div class="test-field-label">EXPECTED OUTPUT</div>
              <pre class="test-pre test-exp">${esc(r.expected === '' ? '(empty)' : r.expected)}</pre>
              <div class="test-field-label">YOUR OUTPUT</div>
              <pre class="test-pre test-got ${r.pass ? 'match' : 'mismatch'}">${esc(r.got === '' ? '(empty)' : r.got)}</pre>
              ${diffHint ? `<div class="test-diff-hint">${esc(diffHint)}</div>` : ''}
              ${r.stderr ? `
                <div class="test-field-label">ERRORS / PANIC</div>
                <pre class="test-pre test-err">${esc(r.stderr)}</pre>` : ''}
            </div>
          </div>`;
        }).join('');
      }
    } catch (e) {
      summaryBanner.className = 'test-summary-fail';
      summaryBanner.innerHTML = `<div class="summary-title">Error</div><div class="summary-desc">${esc(e.message)}</div>`;
    }
    busy(false);
  }
  $('submit').onclick = submitGrading;
}

boot();
