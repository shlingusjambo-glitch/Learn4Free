// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

module.exports = {
  id: 'web',
  title: 'Web Development (HTML, CSS & JS)',
  language: 'JavaScript',
  languageId: 'web',
  description: 'Build the modern web from scratch: semantic HTML, modern CSS styling and Flexbox, JavaScript logic, and dynamic DOM interactivity.',
  units: [
    require('./u1-html'),
    require('./u2-css'),
    require('./u3-js-basics'),
    require('./u4-js-functions-objects'),
    require('./u5-dom-interactive'),
  ],
};
