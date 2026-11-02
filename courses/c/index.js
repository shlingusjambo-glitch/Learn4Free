// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

module.exports = {
  id: 'c',
  title: 'C Programming',
  language: 'C',
  languageId: 'c',
  description: 'Master systems programming from the ground up: pointers, memory management, structs, and hardware efficiency.',
  units: [
    require('./u1-foundations'),
    require('./u2-logic-loops'),
    require('./u3-functions'),
    require('./u4-pointers'),
    require('./u5-structs-strings'),
  ],
};
