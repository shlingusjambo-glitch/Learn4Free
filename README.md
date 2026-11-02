# Learn4Free

Free, open source (GPL-2.0-only) interactive coding education platform. Built with zero accounts, zero paywalls, CodeHS-style autograding test cases, and comprehensive visual diagrams.

- **No accounts, no paywalls.** All progress, code drafts, and completions live privately in your browser's `localStorage` with 1-click JSON backup/export.
- **Multi-language Autograder.** Submissions are compiled and run on the fly (`rustc`, `gcc`, `node`, `bash`, `python3`) against test cases comparing expected output vs your output with actionable beginner diagnostics.
- **Pedagogy & Visuals.** Concept hook (< 120 words), real-world analogies, pop culture references, plain-English vocabulary definitions, and 121 custom SVG concept diagrams.
- **End-of-Unit Tests.** Every unit concludes with a comprehensive capstone challenge evaluating all composite concepts learned.

## Courses & Curriculum (121 Lessons, 28 Units)

1. **Rust Programming** (8 Units, 44 Lessons): From `println!` and variables to ownership, borrowing, structs, enums, pattern matching, iterators, traits, and error handling.
2. **C Programming** (5 Units, 20 Lessons): Foundations, format specifiers, pointers, memory addresses, arrays, structs, and spacecraft telemetry systems.
3. **Web Development** (5 Units, 19 Lessons): HTML5 semantic markup, CSS3 styling & Box Model, Flexbox layouts, JavaScript logic, and DOM event-driven web apps.
4. **Linux & Command Line** (5 Units, 19 Lessons): Filesystem navigation, text inspection (`cat`, `grep`), stream redirection (`>`, `>>`), pipes (`|`), permissions (`chmod`), and Bash automation scripts.
5. **Practical Cybersecurity** (5 Units, 19 Lessons): Cryptography fundamentals, Caesar & XOR ciphers, SHA-256 hashing, password salting & rainbow table defense, SQL injection & XSS sanitization, packet inspection, and buffer boundary defense.

## Quick Start

### Requirements
- Node.js >= 18
- Build toolchains for courses: `rustc`, `gcc`, `bash`, `python3` (all standard on Linux / Ubuntu).
- Zero npm package dependencies.

```bash
# Start server (default: http://127.0.0.1:3000)
npm start

# Run verification test suite across all 121 lessons
npm test
```

## Environment Variables
- `PORT`: Server port (default: `3000`)
- `HOST`: Server host binding (default: `127.0.0.1`)

## Deployment & Cloudflare Setup

Because Learn4Free compiles and executes live code (C via `gcc`, Rust via `rustc`, Bash, and Python), the server requires a Linux environment with system compilers.

To connect Learn4Free to a custom domain using Cloudflare:
1. **Self-Hosted / VPS with Cloudflare Tunnel (Recommended)**: Run Learn4Free on a Linux server or VPS and use `cloudflared` to route your domain directly to `http://localhost:3000` with automatic free HTTPS, DDoS protection, and CDN caching without opening firewall ports.
2. **Cloudflare Proxy / Reverse Proxy**: Deploy the Node app on a VPS or container platform (e.g. Render, Railway, Fly.io, or DigitalOcean) and add a CNAME / A record in Cloudflare DNS with the orange proxy icon enabled.

## Security

The autograder compiles and runs untrusted student code. It applies static denylists, memory/CPU/file-size `ulimit` restrictions, output truncation, and concurrency rate limiting. When hosting publicly, run inside a container or isolated virtual machine.

## License

GPL-2.0-only. See `LICENSE`.
