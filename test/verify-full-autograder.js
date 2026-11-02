// Learn4Free - Autograder Verification Suite
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const { courses, findLesson } = require('../lib/courses');
const { evaluateSubmission } = require('../lib/universal-evaluator');

console.log('Testing Universal Autograder on all 121 lessons...\n');

let totalLessons = 0;
let starterFailsCount = 0;
let emptyFailsCount = 0;
let dummyFailsCount = 0;

for (const c of courses) {
  for (const u of c.units) {
    for (const l of u.lessons) {
      totalLessons++;

      // 1. Starter code MUST fail
      const stRes = evaluateSubmission(c, l, l.starter);
      if (!stRes.passed) starterFailsCount++;
      else console.error(`CRITICAL FAILURE: Starter code PASSED on ${c.id} / ${l.id}!`);

      // 2. Empty code MUST fail
      const emptyRes = evaluateSubmission(c, l, '');
      if (!emptyRes.passed) emptyFailsCount++;
      else console.error(`CRITICAL FAILURE: Empty code PASSED on ${c.id} / ${l.id}!`);

      // 3. Dummy / wrong code MUST fail
      const dummyCode = 'fn main() { println!("unrelated_dummy_12345"); }';
      const dummyRes = evaluateSubmission(c, l, dummyCode);
      if (!dummyRes.passed) dummyFailsCount++;
      else console.error(`CRITICAL FAILURE: Dummy code PASSED on ${c.id} / ${l.id}!`);
    }
  }
}

console.log(`Starter rejection: ${starterFailsCount} / ${totalLessons} properly rejected.`);
console.log(`Empty code rejection: ${emptyFailsCount} / ${totalLessons} properly rejected.`);
console.log(`Dummy code rejection: ${dummyFailsCount} / ${totalLessons} properly rejected.`);

// Test Ferris specifically
const ferris = findLesson('rust', 'placeholders');
const ferrisCourse = courses.find(c => c.id === 'rust');

console.log('\n--- Deep Inspection: Ferris Lesson (rust / placeholders) ---');

const test1 = evaluateSubmission(ferrisCourse, ferris, '');
console.log('1. Submitting empty code: passed =', test1.passed, '| reason =', test1.checkFailed);

const test2 = evaluateSubmission(ferrisCourse, ferris, ferris.starter);
console.log('2. Submitting untouched starter code: passed =', test2.passed, '| reason =', test2.checkFailed);

const test3 = evaluateSubmission(ferrisCourse, ferris, 'fn main() {\n    let name = "Ferris";\n    let age = 7;\n    println!("Random text");\n}\n');
console.log('3. Submitting incorrect text: passed =', test3.passed, '| got =', JSON.stringify(test3.results[0].got), '| expected =', JSON.stringify(test3.results[0].expected));

const test4 = evaluateSubmission(ferrisCourse, ferris, ferris.solution);
console.log('4. Submitting reference solution: passed =', test4.passed, '| got =', JSON.stringify(test4.results[0].got), '| expected =', JSON.stringify(test4.results[0].expected));

if (starterFailsCount === totalLessons && emptyFailsCount === totalLessons && dummyFailsCount === totalLessons && !test1.passed && !test2.passed && !test3.passed && test4.passed) {
  console.log('\nVERIFICATION SUCCESS: Autograder is 100% strict and authentic! ZERO blind passes.');
  process.exit(0);
} else {
  console.error('\nVERIFICATION FAILED: Some tests did not meet strict autograding standards.');
  process.exit(1);
}
