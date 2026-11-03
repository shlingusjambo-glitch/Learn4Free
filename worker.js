// Learn4Free - Cloudflare Worker with Assets
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only

export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
