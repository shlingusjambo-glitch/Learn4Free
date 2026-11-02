// Cloudflare Pages Function: /api/grade
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only

import UniversalGrader from '../../lib/universal-evaluator.js';

export async function onRequestPost(context) {
  let body;
  try {
    body = await context.request.json();
  } catch (_) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const url = new URL(context.request.url);
  const coursesRes = await context.env.ASSETS.fetch(new URL('/api/courses.json', url));
  const courses = await coursesRes.json();

  let targetCourse = null;
  let targetLesson = null;
  for (const c of courses) {
    if (c.id === body.course) {
      targetCourse = c;
      for (const u of c.units || []) {
        for (const l of u.lessons || []) {
          if (l.id === body.lesson) {
            targetLesson = l;
            break;
          }
        }
        if (targetLesson) break;
      }
      break;
    }
  }

  if (!targetLesson) {
    return new Response(JSON.stringify({ error: 'Unknown lesson' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const result = UniversalGrader.evaluateSubmission(targetCourse, targetLesson, body.code || '', {
    path: '/api/grade'
  });

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
