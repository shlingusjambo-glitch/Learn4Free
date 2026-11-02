// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';
// Verifies every lesson: the reference solution must pass, and the starter code must NOT.
const { courses } = require('../lib/courses');
const { grade } = require('../lib/grader');

(async () => {
  let bad = 0, total = 0;
  const jobs = [];
  const only = process.argv[2]; // optional: a lesson id or a unit id
  for (const c of courses) for (const u of c.units) for (const l of u.lessons) if (!only || l.id === only || u.id === only || c.id === only) jobs.push(l);
  const queue = jobs;
  async function worker() {
    while (queue.length) {
      const l = queue.shift();
      total++;
      const sol = await grade(l, l.solution);
      const st = await grade(l, l.starter);
      const okSol = sol.passed, okStart = !st.passed;
      if (!okSol || !okStart) {
        bad++;
        console.log(`FAIL ${l.number} ${l.id}: solution ${okSol ? 'ok' : 'FAILED'}, starter ${okStart ? 'fails (ok)' : 'PASSES (bad)'}`);
        if (!okSol) console.log(sol.error || sol.checkFailed || JSON.stringify(sol.results.filter((r) => !r.pass), null, 1));
      } else console.log(`ok   ${l.number} ${l.id}`);
    }
  }
  await Promise.all([worker(), worker(), worker(), worker()]);
  console.log(`\n${total - bad}/${total} lessons verified`);
  process.exit(bad ? 1 : 0);
})();
