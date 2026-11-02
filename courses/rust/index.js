// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

module.exports = {
  id: 'rust',
  title: 'Rust Programming',
  language: 'Rust',
  description: 'Learn systems programming with safety and speed: from Hello World to ownership, traits and error handling.',
  units: [
    require('./u1-getting-started'),
    require('./u2-variables-types'),
    require('./u3-control-flow'),
    require('./u4-functions'),
    require('./u5-ownership'),
    require('./u6-structs-enums'),
    require('./u7-collections'),
    require('./u8-errors-traits'),
  ],
};
