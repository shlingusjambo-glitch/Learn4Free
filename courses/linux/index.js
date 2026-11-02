// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

module.exports = {
  id: 'linux',
  title: 'Linux & Command Line',
  language: 'Bash',
  languageId: 'linux',
  description: 'Master the command line, filesystem navigation, stream redirection, pipes, permissions, and shell scripting.',
  units: [
    require('./u1-navigation'),
    require('./u2-file-operations'),
    require('./u3-streams-pipes'),
    require('./u4-permissions-env'),
    require('./u5-scripting-automation'),
  ],
};
