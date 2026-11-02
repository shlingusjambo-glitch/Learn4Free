// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

module.exports = {
  id: 'cybersecurity',
  title: 'Practical Cybersecurity',
  language: 'Python',
  languageId: 'cybersecurity',
  description: 'Learn defensive cybersecurity: cryptography, hashing & password salting, SQL injection & XSS mitigation, network packet inspection, and secure coding.',
  units: [
    require('./u1-cryptography'),
    require('./u2-hashing-passwords'),
    require('./u3-web-security'),
    require('./u4-network-security'),
    require('./u5-secure-software'),
  ],
};
