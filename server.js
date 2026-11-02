// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { grade, run } = require('./lib/grader');
const { courses, publicCourse, findLesson } = require('./lib/courses');

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const PUBLIC = path.join(__dirname, 'public');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8' };

function send(res, status, body, type = 'application/json') {
  res.writeHead(status, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store' });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => { data += c; if (data.length > 64 * 1024) { reject(new Error('too large')); req.destroy(); } });
    req.on('end', () => { try { resolve(JSON.parse(data || '{}')); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}

async function api(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/courses') {
    return send(res, 200, courses.map(publicCourse));
  }
  if (req.method === 'GET' && url.pathname === '/api/docs') {
    const { RUST_DOCS } = require('./public/docs-data');
    return send(res, 200, RUST_DOCS);
  }
  if (req.method === 'POST' && (url.pathname === '/api/grade' || url.pathname === '/api/run')) {
    let body;
    try { body = await readBody(req); } catch (_) { return send(res, 400, { error: 'Bad request' }); }
    const lesson = findLesson(body.course, body.lesson);
    if (!lesson || typeof body.code !== 'string') return send(res, 404, { error: 'Unknown lesson' });
    try {
      const out = url.pathname === '/api/grade' ? await grade(lesson, body.code) : await run(lesson, body.code, body.stdin || '');
      return send(res, 200, out);
    } catch (e) {
      return send(res, e.busy ? 503 : 500, { error: e.message || 'Server error' });
    }
  }
  return send(res, 404, { error: 'Not found' });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname.startsWith('/api/')) return api(req, res, url).catch(() => send(res, 500, { error: 'Server error' }));
  let rel = decodeURIComponent(url.pathname);
  if (rel === '/') rel = '/index.html';
  const file = path.normalize(path.join(PUBLIC, rel));
  if (!file.startsWith(PUBLIC + path.sep)) return send(res, 403, 'Forbidden', 'text/plain');
  fs.readFile(file, (err, buf) => {
    if (err) return send(res, 404, 'Not found', 'text/plain');
    send(res, 200, buf, TYPES[path.extname(file)] || 'application/octet-stream');
  });
});

if (require.main === module) {
  server.listen(PORT, HOST, () => console.log(`Learn4Free running at http://${HOST}:${PORT}`));
}
module.exports = server;
