// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

// Registered courses: Rust, C, Web Development, Linux, Cybersecurity
const courseModules = [
  '../courses/rust',
  '../courses/c',
  '../courses/web',
  '../courses/linux',
  '../courses/cybersecurity',
];

const courses = [];
for (const p of courseModules) {
  try {
    courses.push(require(p));
  } catch (e) {
    // Gracefully handled while subagents build other tracks
  }
}

for (const c of courses) {
  const seen = new Set();
  c.languageId = c.languageId || (c.language ? c.language.toLowerCase() : 'rust');
  c.units.forEach((u, ui) => {
    u.course = c;
    u.lessons.forEach((l, li) => {
      if (seen.has(l.id)) throw new Error(`duplicate lesson id ${l.id} in course ${c.id}`);
      seen.add(l.id);
      l.number = `${ui + 1}.${li + 1}`;
      l.unit = u;
      l.course = c;
      l.language = l.language || c.languageId;
      if (l.isUnitTest === undefined) {
        l.isUnitTest = li === u.lessons.length - 1;
      }
      l.image = l.image || {
        url: `/diagrams/${c.id}/${l.id}.svg`,
        caption: `Visual diagram: ${l.title}`,
      };
    });
  });
}

// Strip graded data (solutions, harness) from what the browser receives.
function publicCourse(c) {
  return {
    id: c.id,
    title: c.title,
    language: c.language,
    languageId: c.languageId || c.language.toLowerCase(),
    description: c.description,
    units: c.units.map((u) => ({
      id: u.id,
      title: u.title,
      lessons: u.lessons.map((l) => ({
        id: l.id,
        number: l.number,
        title: l.title,
        content: l.content,
        starter: l.starter,
        hint: l.hint || '',
        terms: l.terms || [],
        image: l.image,
        isUnitTest: !!l.isUnitTest,
        fileName: l.fileName || (
          l.language === 'c' ? 'main.c' :
          l.language === 'javascript' || l.language === 'web' ? 'index.js' :
          l.language === 'bash' || l.language === 'linux' ? 'script.sh' :
          l.language === 'python' || l.language === 'cybersecurity' ? 'security.py' :
          'main.rs'
        ),
        tests: l.tests.map((t, i) => ({
          name: t.name || `Test ${i + 1}`,
          input: t.stdin || '',
          expected: t.expected,
        })),
        usesInput: l.tests.some((t) => t.stdin),
        hasHarness: !!l.harness,
      })),
    })),
  };
}

function findLesson(courseId, lessonId) {
  const c = courses.find((x) => x.id === courseId);
  if (!c) return null;
  for (const u of c.units) {
    for (const l of u.lessons) {
      if (l.id === lessonId) return l;
    }
  }
  return null;
}

module.exports = { courses, publicCourse, findLesson };
