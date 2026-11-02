// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const fs = require('fs');
const path = require('path');
const { courses, publicCourse } = require('../lib/courses');
const { RUST_DOCS } = require('../public/docs-data');

const publicCourses = courses.map(publicCourse);
const pubDir = path.join(__dirname, '..', 'public');
const apiDir = path.join(pubDir, 'api');

fs.mkdirSync(apiDir, { recursive: true });
fs.writeFileSync(path.join(apiDir, 'courses'), JSON.stringify(publicCourses));
fs.writeFileSync(path.join(apiDir, 'courses.json'), JSON.stringify(publicCourses));
fs.writeFileSync(path.join(apiDir, 'docs'), JSON.stringify(RUST_DOCS));
fs.writeFileSync(path.join(apiDir, 'docs.json'), JSON.stringify(RUST_DOCS));
fs.writeFileSync(path.join(pubDir, 'courses-data.js'), 'window.LEARN4FREE_COURSES = ' + JSON.stringify(publicCourses) + ';\n');

console.log('Exported static curriculum and docs for Cloudflare Pages.');
