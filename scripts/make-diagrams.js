// Generates 19 rich SVG diagrams for the Linux & Command Line track
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/diagrams/linux');
fs.mkdirSync(outDir, { recursive: true });

const commonHeader = (title, subtitle, badgeColor = '#38bdf8') => `
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0e1a"/>
      <stop offset="100%" stop-color="#141c33"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>
  <rect width="600" height="300" rx="12" fill="url(#bgGrad)"/>
  <rect width="598" height="298" x="1" y="1" rx="11" fill="none" stroke="#242d4a" stroke-width="1.5"/>
  <rect x="24" y="18" width="190" height="26" rx="6" fill="#1e294b"/>
  <text x="34" y="35" fill="${badgeColor}" font-family="system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="1">${title}</text>
  <text x="576" y="35" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">${subtitle}</text>
`;

const diagrams = {
  'pwd-ls': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('FILESYSTEM GPS &amp; MAP', 'Marauder&#39;s Map Navigation', '#38bdf8')}
  <!-- Filesystem Tree -->
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="250" height="185" rx="8" fill="#151c33" stroke="#38bdf8" stroke-width="1.5"/>
    <rect width="250" height="26" rx="8" fill="#1b2545"/>
    <text x="125" y="18" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">pwd: Print Working Directory</text>
    <text x="20" y="55" fill="#f472b6" font-family="monospace" font-size="12" font-weight="700">/ (Root)</text>
    <path d="M 30 65 L 30 85 L 50 85" stroke="#475569" stroke-width="1.5" fill="none"/>
    <text x="55" y="89" fill="#94a3b8" font-family="monospace" font-size="11">home/</text>
    <path d="M 65 95 L 65 120 L 85 120" stroke="#475569" stroke-width="1.5" fill="none"/>
    <text x="90" y="124" fill="#94a3b8" font-family="monospace" font-size="11">student/</text>
    <path d="M 100 130 L 100 155 L 120 155" stroke="#ffd600" stroke-width="2" fill="none"/>
    <rect x="120" y="140" width="115" height="26" rx="4" fill="#ffd600" fill-opacity="0.15" stroke="#ffd600" stroke-width="1.5"/>
    <text x="128" y="157" fill="#ffd600" font-family="monospace" font-size="11" font-weight="700">&#128205; hogwarts/ (YOU)</text>
  </g>
  <!-- ls vs ls -a -->
  <g transform="translate(310, 65)" filter="url(#shadow)">
    <rect width="260" height="185" rx="8" fill="#070a16" stroke="#34d399" stroke-width="1.5"/>
    <rect width="260" height="26" rx="8" fill="#121a2d"/>
    <text x="130" y="18" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="11" font-weight="700">ls vs ls -a (Directory Listing)</text>
    <text x="16" y="52" fill="#64748b" font-family="monospace" font-size="10">$ ls (Visible Only)</text>
    <text x="26" y="70" fill="#a3e635" font-family="monospace" font-size="11">gryffindor.txt  potions.txt</text>
    <line x1="16" y1="88" x2="244" y2="88" stroke="#242d4a" stroke-width="1"/>
    <text x="16" y="108" fill="#64748b" font-family="monospace" font-size="10">$ ls -a (Shows Hidden Dotfiles)</text>
    <text x="26" y="126" fill="#a3e635" font-family="monospace" font-size="11">.  ..  <tspan fill="#f472b6" font-weight="700">.marauders_map</tspan></text>
    <text x="26" y="144" fill="#a3e635" font-family="monospace" font-size="11">gryffindor.txt  potions.txt</text>
    <rect x="16" y="156" width="228" height="20" rx="3" fill="#1e294b"/>
    <text x="130" y="170" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="9">Files starting with &quot;.&quot; are hidden by default</text>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    <tspan fill="#ffd600">pwd</tspan> reveals your absolute location; <tspan fill="#34d399">ls -a</tspan> reveals secret dotfiles like a Marauder&#39;s Map.
  </text>
</svg>`,

  'cd-paths': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('DIRECTORY NAVIGATION', 'Absolute vs Relative Paths', '#ffd600')}
  <!-- Absolute Path Box -->
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="250" height="185" rx="8" fill="#151c33" stroke="#ffd600" stroke-width="1.5"/>
    <rect width="250" height="26" rx="8" fill="#242338"/>
    <text x="125" y="18" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="11" font-weight="700">Absolute Path (Starts at /)</text>
    <text x="16" y="50" fill="#94a3b8" font-family="system-ui" font-size="10">Exact GPS Coordinates from Root:</text>
    <rect x="16" y="60" width="218" height="28" rx="4" fill="#1e294b"/>
    <text x="24" y="79" fill="#38bdf8" font-family="monospace" font-size="10">cd /home/student/galaxy/earth</text>
    <text x="16" y="112" fill="#e2e8f0" font-family="system-ui" font-size="10">&bull; Always begins with leading slash <tspan fill="#f472b6" font-family="monospace">/</tspan></text>
    <text x="16" y="130" fill="#e2e8f0" font-family="system-ui" font-size="10">&bull; Works from ANY folder in the system</text>
    <text x="16" y="148" fill="#e2e8f0" font-family="system-ui" font-size="10">&bull; <tspan fill="#a3e635" font-family="monospace">~</tspan> shortcut = your user home directory</text>
  </g>
  <!-- Relative Path Box -->
  <g transform="translate(310, 65)" filter="url(#shadow)">
    <rect width="260" height="185" rx="8" fill="#151c33" stroke="#38bdf8" stroke-width="1.5"/>
    <rect width="260" height="26" rx="8" fill="#1b2545"/>
    <text x="130" y="18" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">Relative Path (. and ..)</text>
    <text x="16" y="50" fill="#94a3b8" font-family="system-ui" font-size="10">Directions from Current Room:</text>
    <rect x="16" y="60" width="228" height="28" rx="4" fill="#1e294b"/>
    <text x="24" y="79" fill="#ffd600" font-family="monospace" font-size="10">cd ../../earth</text>
    <g transform="translate(16, 100)">
      <rect width="36" height="24" rx="4" fill="#38bdf8" fill-opacity="0.2" stroke="#38bdf8"/>
      <text x="18" y="16" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">.</text>
      <text x="46" y="16" fill="#e2e8f0" font-family="system-ui" font-size="10">= Current directory</text>
    </g>
    <g transform="translate(16, 134)">
      <rect width="36" height="24" rx="4" fill="#f472b6" fill-opacity="0.2" stroke="#f472b6"/>
      <text x="18" y="16" text-anchor="middle" fill="#f472b6" font-family="monospace" font-size="11" font-weight="700">..</text>
      <text x="46" y="16" fill="#e2e8f0" font-family="system-ui" font-size="10">= Parent directory (one level up)</text>
    </g>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    Use <tspan fill="#ffd600">cd ..</tspan> to step up into the parent folder, or <tspan fill="#38bdf8">cd ~</tspan> to teleport back home.
  </text>
</svg>`,

  'mkdir-touch': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('CREATING DIRECTORIES &amp; FILES', 'mkdir and touch', '#a78bfa')}
  <!-- mkdir block -->
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="250" height="185" rx="8" fill="#151c33" stroke="#a78bfa" stroke-width="1.5"/>
    <rect width="250" height="26" rx="8" fill="#24213d"/>
    <text x="125" y="18" text-anchor="middle" fill="#a78bfa" font-family="monospace" font-size="11" font-weight="700">mkdir -p: Build Folders</text>
    <text x="16" y="50" fill="#94a3b8" font-family="system-ui" font-size="10">Make Directory (with parents -p):</text>
    <rect x="16" y="60" width="218" height="28" rx="4" fill="#1e294b"/>
    <text x="24" y="78" fill="#ffd600" font-family="monospace" font-size="10">mkdir -p station/hangar/bays</text>
    <!-- Folder graphics -->
    <rect x="20" y="105" width="60" height="40" rx="4" fill="#1e294b" stroke="#a78bfa" stroke-dasharray="2,2"/>
    <text x="50" y="128" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="9">station</text>
    <text x="88" y="128" fill="#a78bfa" font-size="12">&rarr;</text>
    <rect x="100" y="105" width="60" height="40" rx="4" fill="#1e294b" stroke="#a78bfa" stroke-dasharray="2,2"/>
    <text x="130" y="128" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="9">hangar</text>
    <text x="168" y="128" fill="#a78bfa" font-size="12">&rarr;</text>
    <rect x="180" y="105" width="55" height="40" rx="4" fill="#2e1065" stroke="#a78bfa"/>
    <text x="207" y="128" text-anchor="middle" fill="#a78bfa" font-family="monospace" font-size="9" font-weight="700">bays/</text>
  </g>
  <!-- touch block -->
  <g transform="translate(310, 65)" filter="url(#shadow)">
    <rect width="260" height="185" rx="8" fill="#151c33" stroke="#34d399" stroke-width="1.5"/>
    <rect width="260" height="26" rx="8" fill="#122d25"/>
    <text x="130" y="18" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="11" font-weight="700">touch: Create Empty Files</text>
    <text x="16" y="50" fill="#94a3b8" font-family="system-ui" font-size="10">Conjure Blank Files Instantly:</text>
    <rect x="16" y="60" width="228" height="28" rx="4" fill="#1e294b"/>
    <text x="24" y="78" fill="#34d399" font-family="monospace" font-size="10">touch ship1.txt ship2.txt</text>
    <!-- File icons -->
    <g transform="translate(35, 105)">
      <rect width="65" height="50" rx="4" fill="#0f291e" stroke="#34d399"/>
      <text x="32" y="24" text-anchor="middle" fill="#34d399" font-family="system-ui" font-size="14">&#128196;</text>
      <text x="32" y="42" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="8">ship1.txt</text>
    </g>
    <g transform="translate(145, 105)">
      <rect width="65" height="50" rx="4" fill="#0f291e" stroke="#34d399"/>
      <text x="32" y="24" text-anchor="middle" fill="#34d399" font-family="system-ui" font-size="14">&#128196;</text>
      <text x="32" y="42" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="8">ship2.txt</text>
    </g>
    <text x="130" y="172" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="9">Size: 0 bytes &bull; Ready for data entry</text>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    <tspan fill="#a78bfa">mkdir -p</tspan> builds nested directory paths safely; <tspan fill="#34d399">touch</tspan> creates new files.
  </text>
</svg>`,

  'unit-1-test': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('UNIT 1 TEST', 'Star Wars Rebel Base Architecture', '#f472b6')}
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="540" height="185" rx="8" fill="#151c33" stroke="#f472b6" stroke-width="1.5"/>
    <rect width="540" height="26" rx="8" fill="#2d152c"/>
    <text x="270" y="18" text-anchor="middle" fill="#f472b6" font-family="monospace" font-size="11" font-weight="700">Yavin 4 Rebel Base Target Architecture</text>
    <!-- Root node -->
    <rect x="200" y="40" width="140" height="28" rx="5" fill="#f472b6" fill-opacity="0.2" stroke="#f472b6" stroke-width="1.5"/>
    <text x="270" y="58" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="11" font-weight="700">rebel_base/</text>
    <!-- Branch Left: Hangar -->
    <path d="M 230 68 L 130 95" stroke="#f472b6" stroke-width="1.5"/>
    <rect x="70" y="95" width="120" height="26" rx="4" fill="#1e294b" stroke="#38bdf8"/>
    <text x="130" y="112" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="700">hangar/</text>
    <!-- Left Files -->
    <text x="130" y="142" text-anchor="middle" fill="#a3e635" font-family="monospace" font-size="10">&#128640; x-wing.txt</text>
    <text x="130" y="162" text-anchor="middle" fill="#a3e635" font-family="monospace" font-size="10">&#128640; y-wing.txt</text>
    <!-- Branch Right: Command -->
    <path d="M 310 68 L 410 95" stroke="#f472b6" stroke-width="1.5"/>
    <rect x="340" y="95" width="140" height="26" rx="4" fill="#1e294b" stroke="#a78bfa"/>
    <text x="410" y="112" text-anchor="middle" fill="#a78bfa" font-family="monospace" font-size="10" font-weight="700">command/briefing/</text>
    <!-- Right Files -->
    <text x="410" y="145" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="10">&#128220; plans.txt (Death Star)</text>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    Unit 1 Capstone: Create folders with <tspan fill="#38bdf8">mkdir -p</tspan>, touch starfighters, and verify with <tspan fill="#ffd600">pwd</tspan> and <tspan fill="#34d399">ls</tspan>.
  </text>
</svg>`,

  'cat-head-tail': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('TEXT INSPECTION TOOLS', 'cat, head, and tail', '#38bdf8')}
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <!-- Document representation -->
    <rect width="180" height="185" rx="8" fill="#070a16" stroke="#38bdf8" stroke-width="1.5"/>
    <rect width="180" height="26" rx="8" fill="#121a2d"/>
    <text x="90" y="18" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11">movie_credits.txt</text>
    <rect x="15" y="40" width="150" height="30" rx="4" fill="#38bdf8" fill-opacity="0.2" stroke="#38bdf8"/>
    <text x="90" y="58" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="10">Lines 1 - 2 (Cast Intro)</text>
    <rect x="15" y="80" width="150" height="55" rx="4" fill="#1e294b" stroke="#475569" stroke-dasharray="2,2"/>
    <text x="90" y="112" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="9">Lines 3 - 8 (Credits body)</text>
    <rect x="15" y="145" width="150" height="30" rx="4" fill="#34d399" fill-opacity="0.2" stroke="#34d399"/>
    <text x="90" y="163" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10">Lines 9 - 10 (Post-Credits)</text>
  </g>
  <!-- Commands on right -->
  <g transform="translate(240, 65)" filter="url(#shadow)">
    <rect width="330" height="185" rx="8" fill="#151c33" stroke="#242d4a" stroke-width="1.5"/>
    <!-- Head command -->
    <g transform="translate(15, 18)">
      <rect width="300" height="42" rx="6" fill="#1e294b" stroke="#38bdf8"/>
      <text x="14" y="22" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">head -n 2 file.txt</text>
      <text x="14" y="36" fill="#94a3b8" font-family="system-ui" font-size="9">&rarr; Grabs top 2 lines (Movie opening / intro)</text>
    </g>
    <!-- Cat command -->
    <g transform="translate(15, 72)">
      <rect width="300" height="42" rx="6" fill="#1e294b" stroke="#ffd600"/>
      <text x="14" y="22" fill="#ffd600" font-family="monospace" font-size="11" font-weight="700">cat file.txt</text>
      <text x="14" y="36" fill="#94a3b8" font-family="system-ui" font-size="9">&rarr; Concatenates and dumps ENTIRE scroll</text>
    </g>
    <!-- Tail command -->
    <g transform="translate(15, 126)">
      <rect width="300" height="42" rx="6" fill="#1e294b" stroke="#34d399"/>
      <text x="14" y="22" fill="#34d399" font-family="monospace" font-size="11" font-weight="700">tail -n 2 file.txt</text>
      <text x="14" y="36" fill="#94a3b8" font-family="system-ui" font-size="9">&rarr; Grabs last 2 lines (Post-credit scene teaser)</text>
    </g>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    Inspect text rapidly: <tspan fill="#38bdf8">head</tspan> starts at the beginning, <tspan fill="#34d399">tail</tspan> reads the end, <tspan fill="#ffd600">cat</tspan> reads all.
  </text>
</svg>`,

  'cp-mv-rm': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('FILE MANIPULATION', 'cp, mv, and rm Operations', '#f59e0b')}
  <!-- cp -->
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="170" height="185" rx="8" fill="#151c33" stroke="#38bdf8" stroke-width="1.5"/>
    <rect width="170" height="26" rx="8" fill="#1b2545"/>
    <text x="85" y="18" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">cp: Clone / Duplicate</text>
    <text x="15" y="55" fill="#94a3b8" font-family="monospace" font-size="10">$ cp draft.txt copy.txt</text>
    <rect x="25" y="75" width="45" height="45" rx="4" fill="#1e294b" stroke="#38bdf8"/>
    <text x="47" y="102" text-anchor="middle" fill="#38bdf8" font-size="14">&#128196;</text>
    <text x="85" y="102" fill="#38bdf8" font-size="14">&rarr;</text>
    <rect x="100" y="75" width="45" height="45" rx="4" fill="#1e294b" stroke="#38bdf8"/>
    <text x="122" y="102" text-anchor="middle" fill="#38bdf8" font-size="14">&#128196;</text>
    <text x="85" y="145" text-anchor="middle" fill="#e2e8f0" font-family="system-ui" font-size="10">Both files exist</text>
    <text x="85" y="160" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="9">Use -r for folders</text>
  </g>
  <!-- mv -->
  <g transform="translate(215, 65)" filter="url(#shadow)">
    <rect width="170" height="185" rx="8" fill="#151c33" stroke="#ffd600" stroke-width="1.5"/>
    <rect width="170" height="26" rx="8" fill="#242338"/>
    <text x="85" y="18" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="11" font-weight="700">mv: Move or Rename</text>
    <text x="15" y="55" fill="#94a3b8" font-family="monospace" font-size="10">$ mv draft.txt final.txt</text>
    <rect x="25" y="75" width="45" height="45" rx="4" fill="#1e294b" stroke="#ffd600" stroke-dasharray="2,2"/>
    <text x="47" y="102" text-anchor="middle" fill="#64748b" font-size="12">Gone</text>
    <text x="85" y="102" fill="#ffd600" font-size="14">&rarr;</text>
    <rect x="100" y="75" width="45" height="45" rx="4" fill="#1e294b" stroke="#ffd600"/>
    <text x="122" y="102" text-anchor="middle" fill="#ffd600" font-size="14">&#128196;</text>
    <text x="85" y="145" text-anchor="middle" fill="#e2e8f0" font-family="system-ui" font-size="10">Renamed or Relocated</text>
    <text x="85" y="160" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="9">No duplicate left behind</text>
  </g>
  <!-- rm -->
  <g transform="translate(400, 65)" filter="url(#shadow)">
    <rect width="170" height="185" rx="8" fill="#151c33" stroke="#ef4444" stroke-width="1.5"/>
    <rect width="170" height="26" rx="8" fill="#2f1519"/>
    <text x="85" y="18" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="11" font-weight="700">rm: Permanent Delete</text>
    <text x="15" y="55" fill="#94a3b8" font-family="monospace" font-size="10">$ rm copy.txt</text>
    <rect x="62" y="75" width="45" height="45" rx="4" fill="#1e294b" stroke="#ef4444"/>
    <text x="85" y="105" text-anchor="middle" fill="#ef4444" font-size="18">&#10006;</text>
    <text x="85" y="145" text-anchor="middle" fill="#ef4444" font-family="system-ui" font-size="10" font-weight="700">NO TRASH BIN</text>
    <text x="85" y="160" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="9">Deletion is immediate</text>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    <tspan fill="#38bdf8">cp</tspan> clones files, <tspan fill="#ffd600">mv</tspan> renames or moves them, and <tspan fill="#ef4444">rm</tspan> deletes without a recycling bin.
  </text>
</svg>`,

  'grep-search': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('TEXT SEARCH SCANNER', 'grep: Finding Waldo in Text', '#34d399')}
  <!-- Input Stream -->
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="230" height="185" rx="8" fill="#070a16" stroke="#475569" stroke-width="1.5"/>
    <rect width="230" height="26" rx="8" fill="#121a2d"/>
    <text x="115" y="18" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="11">server.log (Raw Input)</text>
    <text x="14" y="52" fill="#64748b" font-family="monospace" font-size="10">1 [INFO] Server started</text>
    <text x="14" y="76" fill="#ef4444" font-family="monospace" font-size="10" font-weight="700">2 [ERROR] Database timeout</text>
    <text x="14" y="100" fill="#64748b" font-family="monospace" font-size="10">3 [INFO] User login: alice</text>
    <text x="14" y="124" fill="#ef4444" font-family="monospace" font-size="10" font-weight="700">4 [error] Socket reset</text>
    <text x="14" y="148" fill="#64748b" font-family="monospace" font-size="10">5 [DEBUG] Cache flushed</text>
    <text x="14" y="172" fill="#ef4444" font-family="monospace" font-size="10" font-weight="700">6 [ERROR] Auth rejected</text>
  </g>
  <!-- Grep Lens in Center -->
  <g transform="translate(275, 120)">
    <circle cx="35" cy="35" r="28" fill="#1e294b" stroke="#34d399" stroke-width="2"/>
    <text x="35" y="40" text-anchor="middle" fill="#34d399" font-family="system-ui" font-size="20">&#128269;</text>
    <text x="35" y="80" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10" font-weight="700">grep -i</text>
  </g>
  <!-- Output Stream -->
  <g transform="translate(360, 65)" filter="url(#shadow)">
    <rect width="210" height="185" rx="8" fill="#070a16" stroke="#34d399" stroke-width="1.5"/>
    <rect width="210" height="26" rx="8" fill="#122d25"/>
    <text x="105" y="18" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="11">Filtered Matches</text>
    <text x="14" y="60" fill="#a3e635" font-family="monospace" font-size="10">[ERROR] Database timeout</text>
    <text x="14" y="90" fill="#a3e635" font-family="monospace" font-size="10">[error] Socket reset</text>
    <text x="14" y="120" fill="#a3e635" font-family="monospace" font-size="10">[ERROR] Auth rejected</text>
    <rect x="14" y="140" width="182" height="30" rx="4" fill="#1e294b"/>
    <text x="105" y="159" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="10">grep -c: count = 3</text>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    <tspan fill="#34d399">grep &quot;pattern&quot;</tspan> extracts matching lines; <tspan fill="#ffd600">-i</tspan> ignores uppercase/lowercase.
  </text>
</svg>`,

  'unit-2-test': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('UNIT 2 TEST', 'Cyber Intrusion Log Investigator', '#ef4444')}
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="540" height="185" rx="8" fill="#151c33" stroke="#ef4444" stroke-width="1.5"/>
    <rect width="540" height="26" rx="8" fill="#2f1519"/>
    <text x="270" y="18" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="11" font-weight="700">Security Operations Incident Triage</text>
    <!-- Step 1: auth.log -->
    <g transform="translate(20, 45)">
      <rect width="140" height="115" rx="6" fill="#070a16" stroke="#475569"/>
      <text x="70" y="20" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="10">auth.log</text>
      <text x="10" y="45" fill="#ef4444" font-family="monospace" font-size="9">FAILED: 192.168.1.5</text>
      <text x="10" y="65" fill="#a3e635" font-family="monospace" font-size="9">SUCCESS: admin</text>
      <text x="10" y="85" fill="#ef4444" font-family="monospace" font-size="9">FAILED: root</text>
      <text x="70" y="105" text-anchor="middle" fill="#ffd600" font-family="system-ui" font-size="8">grep -i &quot;FAILED&quot;</text>
    </g>
    <!-- Arrow 1 -->
    <text x="175" y="110" fill="#38bdf8" font-size="18">&rarr;</text>
    <!-- Step 2: cp to quarantine -->
    <g transform="translate(200, 45)">
      <rect width="140" height="115" rx="6" fill="#1e294b" stroke="#38bdf8"/>
      <text x="70" y="20" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="10">quarantine/</text>
      <text x="70" y="55" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="9">auth_backup.log</text>
      <text x="70" y="80" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="9">temp_evidence.log</text>
      <text x="70" y="105" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="8">Secure Evidence</text>
    </g>
    <!-- Arrow 2 -->
    <text x="355" y="110" fill="#34d399" font-size="18">&rarr;</text>
    <!-- Step 3: tail -->
    <g transform="translate(380, 45)">
      <rect width="140" height="115" rx="6" fill="#070a16" stroke="#34d399"/>
      <text x="70" y="20" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10">tail -n 2</text>
      <text x="10" y="50" fill="#a3e635" font-family="monospace" font-size="9">Latest anomalies</text>
      <text x="10" y="70" fill="#a3e635" font-family="monospace" font-size="9">captured in real-time</text>
      <text x="70" y="105" text-anchor="middle" fill="#34d399" font-family="system-ui" font-size="8">Final Incident Status</text>
    </g>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    Unit 2 Capstone: Extract failed logins with <tspan fill="#ef4444">grep</tspan>, isolate files with <tspan fill="#38bdf8">cp</tspan> and <tspan fill="#ffd600">mv</tspan>, and inspect with <tspan fill="#34d399">tail</tspan>.
  </text>
</svg>`,

  'stdout-redirection': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('STREAM REDIRECTION', '> Overwrite vs >> Append', '#ffd600')}
  <!-- Single Angle Bracket > -->
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="250" height="185" rx="8" fill="#151c33" stroke="#ffd600" stroke-width="1.5"/>
    <rect width="250" height="26" rx="8" fill="#242338"/>
    <text x="125" y="18" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="11" font-weight="700">&gt; Overwrite (Clobber)</text>
    <rect x="16" y="45" width="218" height="28" rx="4" fill="#1e294b"/>
    <text x="24" y="63" fill="#ffd600" font-family="monospace" font-size="10">echo &quot;Hello&quot; &gt; file.txt</text>
    <!-- Diagram -->
    <rect x="25" y="90" width="70" height="35" rx="4" fill="#1e294b" stroke="#ffd600"/>
    <text x="60" y="112" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="10">stdout</text>
    <path d="M 100 107 L 140 107" stroke="#ffd600" stroke-width="2"/>
    <polygon points="144,107 136,102 136,112" fill="#ffd600"/>
    <rect x="150" y="85" width="80" height="50" rx="4" fill="#070a16" stroke="#ffd600"/>
    <text x="190" y="105" text-anchor="middle" fill="#ef4444" font-family="system-ui" font-size="8">&#128465; Wipes old</text>
    <text x="190" y="125" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="9" font-weight="700">New content</text>
    <text x="125" y="160" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="9">Destination file is reset to 0 bytes first</text>
  </g>
  <!-- Double Angle Bracket >> -->
  <g transform="translate(310, 65)" filter="url(#shadow)">
    <rect width="260" height="185" rx="8" fill="#151c33" stroke="#34d399" stroke-width="1.5"/>
    <rect width="260" height="26" rx="8" fill="#122d25"/>
    <text x="130" y="18" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="11" font-weight="700">&gt;&gt; Append (Preserve Old)</text>
    <rect x="16" y="45" width="228" height="28" rx="4" fill="#1e294b"/>
    <text x="24" y="63" fill="#34d399" font-family="monospace" font-size="10">echo &quot;More&quot; &gt;&gt; file.txt</text>
    <!-- Diagram -->
    <rect x="25" y="90" width="70" height="35" rx="4" fill="#1e294b" stroke="#34d399"/>
    <text x="60" y="112" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10">stdout</text>
    <path d="M 100 107 L 140 107" stroke="#34d399" stroke-width="2"/>
    <polygon points="144,107 136,102 136,112" fill="#34d399"/>
    <rect x="150" y="85" width="85" height="50" rx="4" fill="#070a16" stroke="#34d399"/>
    <text x="192" y="105" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="8">Line 1: Hello</text>
    <text x="192" y="125" text-anchor="middle" fill="#a3e635" font-family="system-ui" font-size="9" font-weight="700">+ Line 2: More</text>
    <text x="130" y="160" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="9">Appends seamlessly to the bottom</text>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    Single <tspan fill="#ffd600">&gt;</tspan> overwrites and clears the file; double <tspan fill="#34d399">&gt;&gt;</tspan> adds new lines to the end.
  </text>
</svg>`,

  'pipes-basics': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('THE UNIX PIPELINE', 'Chaining Tools with Pipe |', '#38bdf8')}
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="540" height="185" rx="8" fill="#151c33" stroke="#38bdf8" stroke-width="1.5"/>
    <rect width="540" height="26" rx="8" fill="#1b2545"/>
    <text x="270" y="18" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">grep &quot;First Class&quot; passengers.txt | wc -l</text>
    <!-- Machine 1 -->
    <g transform="translate(30, 45)">
      <rect width="130" height="110" rx="6" fill="#1e294b" stroke="#38bdf8"/>
      <text x="65" y="24" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">grep</text>
      <text x="65" y="48" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="9">Filters passenger</text>
      <text x="65" y="62" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="9">records matching pattern</text>
      <rect x="20" y="78" width="90" height="20" rx="3" fill="#070a16"/>
      <text x="65" y="92" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9">stdout</text>
    </g>
    <!-- Pipe conduit -->
    <g transform="translate(170, 85)">
      <rect width="50" height="30" rx="4" fill="#ffd600" fill-opacity="0.2" stroke="#ffd600" stroke-width="2"/>
      <text x="25" y="21" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="18" font-weight="900">|</text>
      <text x="25" y="45" text-anchor="middle" fill="#ffd600" font-family="system-ui" font-size="8">In-Memory Pipe</text>
    </g>
    <!-- Machine 2 -->
    <g transform="translate(230, 45)">
      <rect width="130" height="110" rx="6" fill="#1e294b" stroke="#34d399"/>
      <rect x="20" y="12" width="90" height="20" rx="3" fill="#070a16"/>
      <text x="65" y="26" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="9">stdin</text>
      <text x="65" y="52" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="11" font-weight="700">wc -l</text>
      <text x="65" y="72" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="9">Word/Line Count</text>
      <text x="65" y="86" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="9">Counts incoming lines</text>
    </g>
    <!-- Arrow to terminal -->
    <text x="375" y="105" fill="#a3e635" font-size="18">&rarr;</text>
    <!-- Final Terminal Output -->
    <g transform="translate(400, 45)">
      <rect width="110" height="110" rx="6" fill="#070a16" stroke="#a3e635"/>
      <text x="55" y="24" text-anchor="middle" fill="#a3e635" font-family="monospace" font-size="10">Output</text>
      <text x="55" y="65" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="24" font-weight="700">42</text>
      <text x="55" y="95" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="9">No temp files used!</text>
    </g>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    The pipe <tspan fill="#ffd600">|</tspan> connects the stdout of command A directly to the stdin of command B in memory.
  </text>
</svg>`,

  'sort-uniq': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('DATA TRANSFORMATIONS', 'sort and uniq Pipeline', '#a78bfa')}
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="540" height="185" rx="8" fill="#151c33" stroke="#a78bfa" stroke-width="1.5"/>
    <rect width="540" height="26" rx="8" fill="#24213d"/>
    <text x="270" y="18" text-anchor="middle" fill="#a78bfa" font-family="monospace" font-size="11" font-weight="700">sort votes.txt | uniq -c</text>
    <!-- Stage 1: Unsorted Input -->
    <g transform="translate(20, 45)">
      <rect width="130" height="115" rx="6" fill="#070a16" stroke="#475569"/>
      <text x="65" y="18" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="9">Raw votes.txt</text>
      <text x="14" y="38" fill="#f472b6" font-family="monospace" font-size="9">The Matrix</text>
      <text x="14" y="55" fill="#38bdf8" font-family="monospace" font-size="9">Inception</text>
      <text x="14" y="72" fill="#ffd600" font-family="monospace" font-size="9">Interstellar</text>
      <text x="14" y="89" fill="#38bdf8" font-family="monospace" font-size="9">Inception</text>
      <text x="14" y="106" fill="#f472b6" font-family="monospace" font-size="9">The Matrix</text>
    </g>
    <!-- Arrow 1: sort -->
    <g transform="translate(155, 95)">
      <text x="20" y="0" text-anchor="middle" fill="#a78bfa" font-family="monospace" font-size="10" font-weight="700">| sort</text>
      <text x="20" y="15" text-anchor="middle" fill="#a78bfa" font-size="16">&rarr;</text>
    </g>
    <!-- Stage 2: Sorted -->
    <g transform="translate(200, 45)">
      <rect width="130" height="115" rx="6" fill="#070a16" stroke="#a78bfa"/>
      <text x="65" y="18" text-anchor="middle" fill="#a78bfa" font-family="monospace" font-size="9">Adjacent Dups</text>
      <text x="14" y="38" fill="#38bdf8" font-family="monospace" font-size="9">Inception</text>
      <text x="14" y="55" fill="#38bdf8" font-family="monospace" font-size="9">Inception</text>
      <text x="14" y="72" fill="#ffd600" font-family="monospace" font-size="9">Interstellar</text>
      <text x="14" y="89" fill="#f472b6" font-family="monospace" font-size="9">The Matrix</text>
      <text x="14" y="106" fill="#f472b6" font-family="monospace" font-size="9">The Matrix</text>
    </g>
    <!-- Arrow 2: uniq -c -->
    <g transform="translate(335, 95)">
      <text x="25" y="0" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10" font-weight="700">| uniq -c</text>
      <text x="25" y="15" text-anchor="middle" fill="#34d399" font-size="16">&rarr;</text>
    </g>
    <!-- Stage 3: Aggregated -->
    <g transform="translate(390, 45)">
      <rect width="130" height="115" rx="6" fill="#070a16" stroke="#34d399"/>
      <text x="65" y="18" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="9">Frequency Table</text>
      <text x="14" y="45" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="700">2 Inception</text>
      <text x="14" y="75" fill="#ffd600" font-family="monospace" font-size="10" font-weight="700">1 Interstellar</text>
      <text x="14" y="105" fill="#f472b6" font-family="monospace" font-size="10" font-weight="700">2 The Matrix</text>
    </g>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    <tspan fill="#a78bfa">uniq</tspan> requires sorted input! Always pipe into <tspan fill="#ffd600">sort</tspan> before calling <tspan fill="#34d399">uniq -c</tspan>.
  </text>
</svg>`,

  'unit-3-test': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('UNIT 3 TEST', 'Music Streaming Top 10 Chart Aggregator', '#38bdf8')}
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="540" height="185" rx="8" fill="#151c33" stroke="#38bdf8" stroke-width="1.5"/>
    <rect width="540" height="26" rx="8" fill="#1b2545"/>
    <text x="270" y="18" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">Streaming Analytics Data Assembly Pipeline</text>
    <!-- Stages Row -->
    <g transform="translate(15, 45)">
      <rect width="80" height="70" rx="4" fill="#1e294b" stroke="#475569"/>
      <text x="40" y="25" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="8">streams.log</text>
      <text x="40" y="45" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9">grep -v</text>
      <text x="40" y="58" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="7">Drop test plays</text>
    </g>
    <text x="105" y="85" fill="#ffd600" font-size="14">&rarr;</text>
    <g transform="translate(120, 45)">
      <rect width="75" height="70" rx="4" fill="#1e294b" stroke="#a78bfa"/>
      <text x="37" y="32" text-anchor="middle" fill="#a78bfa" font-family="monospace" font-size="10" font-weight="700">sort</text>
      <text x="37" y="52" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="8">Group track names</text>
    </g>
    <text x="205" y="85" fill="#ffd600" font-size="14">&rarr;</text>
    <g transform="translate(220, 45)">
      <rect width="80" height="70" rx="4" fill="#1e294b" stroke="#34d399"/>
      <text x="40" y="32" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10" font-weight="700">uniq -c</text>
      <text x="40" y="52" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="8">Count plays</text>
    </g>
    <text x="310" y="85" fill="#ffd600" font-size="14">&rarr;</text>
    <g transform="translate(325, 45)">
      <rect width="80" height="70" rx="4" fill="#1e294b" stroke="#ffd600"/>
      <text x="40" y="32" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="10" font-weight="700">sort -nr</text>
      <text x="40" y="52" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="8">Highest count 1st</text>
    </g>
    <text x="415" y="85" fill="#ffd600" font-size="14">&rarr;</text>
    <g transform="translate(430, 45)">
      <rect width="90" height="70" rx="4" fill="#070a16" stroke="#38bdf8"/>
      <text x="45" y="25" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9">head -n 3</text>
      <text x="45" y="42" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="10">&gt; top3.txt</text>
      <text x="45" y="58" text-anchor="middle" fill="#a3e635" font-family="system-ui" font-size="8">Billboard Top 3</text>
    </g>
    <!-- Code banner -->
    <rect x="25" y="135" width="490" height="30" rx="4" fill="#070a16" stroke="#242d4a"/>
    <text x="270" y="155" text-anchor="middle" fill="#a3e635" font-family="monospace" font-size="10">grep -v &quot;TEST_STREAM&quot; streams.log | sort | uniq -c | sort -nr | head -n 3 &gt; top3.txt</text>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    Unit 3 Capstone: Master multi-stage Unix pipelines to filter, aggregate, and publish chart leaderboards.
  </text>
</svg>`,

  'file-permissions': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('LINUX PERMISSION MASKS', 'The rwx Security Triad', '#ffd600')}
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="540" height="185" rx="8" fill="#151c33" stroke="#ffd600" stroke-width="1.5"/>
    <rect width="540" height="26" rx="8" fill="#242338"/>
    <text x="270" y="18" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="11" font-weight="700">Decoding: - r w x r - x r - - (754)</text>
    <!-- String representation -->
    <g transform="translate(40, 45)">
      <!-- File type -->
      <rect x="0" y="0" width="30" height="40" rx="4" fill="#1e294b" stroke="#475569"/>
      <text x="15" y="25" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="16" font-weight="700">-</text>
      <text x="15" y="55" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="8">Type (File)</text>
      <!-- User (u) -->
      <rect x="40" y="0" width="130" height="40" rx="4" fill="#1e294b" stroke="#38bdf8"/>
      <text x="105" y="25" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="16" font-weight="700">r w x</text>
      <text x="105" y="55" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="9" font-weight="700">User (4+2+1 = 7)</text>
      <!-- Group (g) -->
      <rect x="180" y="0" width="130" height="40" rx="4" fill="#1e294b" stroke="#ffd600"/>
      <text x="245" y="25" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="16" font-weight="700">r - x</text>
      <text x="245" y="55" text-anchor="middle" fill="#ffd600" font-family="system-ui" font-size="9" font-weight="700">Group (4+0+1 = 5)</text>
      <!-- Others (o) -->
      <rect x="320" y="0" width="130" height="40" rx="4" fill="#1e294b" stroke="#34d399"/>
      <text x="385" y="25" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="16" font-weight="700">r - -</text>
      <text x="385" y="55" text-anchor="middle" fill="#34d399" font-family="system-ui" font-size="9" font-weight="700">Others (4+0+0 = 4)</text>
    </g>
    <!-- Value Table -->
    <g transform="translate(50, 120)">
      <rect width="440" height="45" rx="6" fill="#070a16" stroke="#242d4a"/>
      <text x="70" y="28" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11">r = Read (4)</text>
      <text x="220" y="28" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="11">w = Write (2)</text>
      <text x="370" y="28" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="11">x = Execute (1)</text>
    </g>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    Linux file permissions protect files across three classes: <tspan fill="#38bdf8">User</tspan>, <tspan fill="#ffd600">Group</tspan>, and <tspan fill="#34d399">Others</tspan>.
  </text>
</svg>`,

  'chmod-basics': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('MODIFYING PERMISSIONS', 'chmod: Symbolic vs Octal Mode', '#34d399')}
  <!-- Symbolic chmod -->
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="250" height="185" rx="8" fill="#151c33" stroke="#34d399" stroke-width="1.5"/>
    <rect width="250" height="26" rx="8" fill="#122d25"/>
    <text x="125" y="18" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="11" font-weight="700">Symbolic Mode: chmod +x</text>
    <rect x="16" y="45" width="218" height="28" rx="4" fill="#1e294b"/>
    <text x="24" y="63" fill="#34d399" font-family="monospace" font-size="10">chmod +x script.sh</text>
    <!-- Before/After -->
    <g transform="translate(20, 85)">
      <rect width="90" height="50" rx="4" fill="#070a16" stroke="#ef4444"/>
      <text x="45" y="22" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="9">Locked</text>
      <text x="45" y="40" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="9">-rw-r--r--</text>
    </g>
    <text x="125" y="115" fill="#34d399" font-size="16">&rarr;</text>
    <g transform="translate(140, 85)">
      <rect width="90" height="50" rx="4" fill="#070a16" stroke="#34d399"/>
      <text x="45" y="22" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="9">Executable</text>
      <text x="45" y="40" text-anchor="middle" fill="#a3e635" font-family="monospace" font-size="9">-rwxr-xr-x</text>
    </g>
    <text x="125" y="160" text-anchor="middle" fill="#e2e8f0" font-family="system-ui" font-size="9">Now runnable with ./script.sh</text>
  </g>
  <!-- Octal Numbers -->
  <g transform="translate(310, 65)" filter="url(#shadow)">
    <rect width="260" height="185" rx="8" fill="#151c33" stroke="#ffd600" stroke-width="1.5"/>
    <rect width="260" height="26" rx="8" fill="#242338"/>
    <text x="130" y="18" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="11" font-weight="700">Octal Mode: Common Numbers</text>
    <!-- Octal 755 -->
    <rect x="16" y="45" width="228" height="34" rx="4" fill="#1e294b"/>
    <text x="24" y="67" fill="#ffd600" font-family="monospace" font-size="11" font-weight="700">chmod 755 (rwxr-xr-x)</text>
    <text x="175" y="67" fill="#94a3b8" font-family="system-ui" font-size="8">Public scripts</text>
    <!-- Octal 644 -->
    <rect x="16" y="85" width="228" height="34" rx="4" fill="#1e294b"/>
    <text x="24" y="107" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">chmod 644 (rw-r--r--)</text>
    <text x="175" y="107" fill="#94a3b8" font-family="system-ui" font-size="8">Normal files</text>
    <!-- Octal 600 -->
    <rect x="16" y="125" width="228" height="34" rx="4" fill="#1e294b"/>
    <text x="24" y="147" fill="#ef4444" font-family="monospace" font-size="11" font-weight="700">chmod 600 (rw-------)</text>
    <text x="175" y="147" fill="#94a3b8" font-family="system-ui" font-size="8">SSH Keys / Secret</text>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    <tspan fill="#34d399">chmod +x</tspan> unlocks execution rights; octal numbers like <tspan fill="#ffd600">755</tspan> and <tspan fill="#ef4444">600</tspan> set all rights at once.
  </text>
</svg>`,

  'env-variables': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('ENVIRONMENT VARIABLES', 'Global Shell State &amp; export', '#a78bfa')}
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="540" height="185" rx="8" fill="#151c33" stroke="#a78bfa" stroke-width="1.5"/>
    <rect width="540" height="26" rx="8" fill="#24213d"/>
    <text x="270" y="18" text-anchor="middle" fill="#a78bfa" font-family="monospace" font-size="11" font-weight="700">Shell Environment Memory Stack</text>
    <!-- Built-in standard variables -->
    <g transform="translate(30, 45)">
      <rect width="220" height="115" rx="6" fill="#070a16" stroke="#475569"/>
      <text x="110" y="20" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="10">Built-in Standard Vars</text>
      <text x="14" y="45" fill="#38bdf8" font-family="monospace" font-size="10">$USER</text>
      <text x="90" y="45" fill="#e2e8f0" font-family="system-ui" font-size="9">&rarr; Current username</text>
      <text x="14" y="70" fill="#ffd600" font-family="monospace" font-size="10">$HOME</text>
      <text x="90" y="70" fill="#e2e8f0" font-family="system-ui" font-size="9">&rarr; User directory (~)</text>
      <text x="14" y="95" fill="#34d399" font-family="monospace" font-size="10">$PATH</text>
      <text x="90" y="95" fill="#e2e8f0" font-family="system-ui" font-size="9">&rarr; Executable search folders</text>
    </g>
    <!-- Custom Exported Variables -->
    <g transform="translate(290, 45)">
      <rect width="220" height="115" rx="6" fill="#070a16" stroke="#a78bfa"/>
      <text x="110" y="20" text-anchor="middle" fill="#a78bfa" font-family="monospace" font-size="10">Custom Exported Vars</text>
      <rect x="14" y="32" width="192" height="24" rx="3" fill="#1e294b"/>
      <text x="20" y="48" fill="#ffd600" font-family="monospace" font-size="9">export HERO=&quot;Tony Stark&quot;</text>
      <rect x="14" y="62" width="192" height="24" rx="3" fill="#1e294b"/>
      <text x="20" y="78" fill="#ffd600" font-family="monospace" font-size="9">export SUIT=&quot;Mark 85&quot;</text>
      <text x="110" y="105" text-anchor="middle" fill="#a3e635" font-family="system-ui" font-size="9">Available to all child scripts!</text>
    </g>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    Store data with <tspan fill="#ffd600">VAR=val</tspan> and read with <tspan fill="#38bdf8">$VAR</tspan>; use <tspan fill="#a78bfa">export</tspan> to share with child programs.
  </text>
</svg>`,

  'unit-4-test': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('UNIT 4 TEST', 'Secure Vault Script Deployment', '#ffd600')}
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="540" height="185" rx="8" fill="#151c33" stroke="#ffd600" stroke-width="1.5"/>
    <rect width="540" height="26" rx="8" fill="#242338"/>
    <text x="270" y="18" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="11" font-weight="700">Production Deployment Hardening Matrix</text>
    <!-- Task 1: SSH Key -->
    <g transform="translate(20, 45)">
      <rect width="155" height="115" rx="6" fill="#070a16" stroke="#ef4444"/>
      <text x="77" y="20" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="10">id_rsa (Private Key)</text>
      <text x="77" y="45" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="11" font-weight="700">chmod 600</text>
      <text x="77" y="70" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="10">-rw-------</text>
      <text x="77" y="95" text-anchor="middle" fill="#e2e8f0" font-family="system-ui" font-size="8">Owner Only Access</text>
    </g>
    <!-- Task 2: Script Executable -->
    <g transform="translate(195, 45)">
      <rect width="155" height="115" rx="6" fill="#070a16" stroke="#34d399"/>
      <text x="77" y="20" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10">run_vault.sh</text>
      <text x="77" y="45" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="11" font-weight="700">chmod 755</text>
      <text x="77" y="70" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="10">-rwxr-xr-x</text>
      <text x="77" y="95" text-anchor="middle" fill="#e2e8f0" font-family="system-ui" font-size="8">Executable Script</text>
    </g>
    <!-- Task 3: Env Injection -->
    <g transform="translate(370, 45)">
      <rect width="150" height="115" rx="6" fill="#070a16" stroke="#38bdf8"/>
      <text x="75" y="20" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="10">export Configs</text>
      <text x="14" y="48" fill="#ffd600" font-family="monospace" font-size="8">VAULT_ENV=production</text>
      <text x="14" y="68" fill="#ffd600" font-family="monospace" font-size="8">VAULT_PORT=8443</text>
      <text x="75" y="95" text-anchor="middle" fill="#a3e635" font-family="system-ui" font-size="8">Passed to Runtime</text>
    </g>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    Unit 4 Capstone: Lock down private keys with <tspan fill="#ef4444">600</tspan>, enable scripts with <tspan fill="#34d399">755</tspan>, and inject environment state.
  </text>
</svg>`,

  'bash-args': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('COMMAND LINE ARGUMENTS', 'Positional Parameters $1, $2, $#', '#38bdf8')}
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="540" height="185" rx="8" fill="#151c33" stroke="#38bdf8" stroke-width="1.5"/>
    <rect width="540" height="26" rx="8" fill="#1b2545"/>
    <text x="270" y="18" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">./script.sh &quot;Recon&quot; &quot;Falcon&quot;</text>
    <!-- Command elements -->
    <g transform="translate(35, 45)">
      <!-- $0 -->
      <rect x="0" y="0" width="120" height="40" rx="4" fill="#1e294b" stroke="#475569"/>
      <text x="60" y="25" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="12">./script.sh</text>
      <text x="60" y="55" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="11" font-weight="700">$0 (Script)</text>
      <!-- $1 -->
      <rect x="150" y="0" width="130" height="40" rx="4" fill="#1e294b" stroke="#38bdf8"/>
      <text x="215" y="25" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="12">&quot;Recon&quot;</text>
      <text x="215" y="55" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">$1 (Param 1)</text>
      <!-- $2 -->
      <rect x="310" y="0" width="130" height="40" rx="4" fill="#1e294b" stroke="#34d399"/>
      <text x="375" y="25" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="12">&quot;Falcon&quot;</text>
      <text x="375" y="55" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="11" font-weight="700">$2 (Param 2)</text>
    </g>
    <!-- Parameter Count Banner -->
    <g transform="translate(60, 120)">
      <rect width="420" height="40" rx="6" fill="#070a16" stroke="#242d4a"/>
      <text x="210" y="25" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="12" font-weight="700">$# = 2 (Total Count of Arguments Passed)</text>
    </g>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    Access input flags via <tspan fill="#38bdf8">$1</tspan>, <tspan fill="#34d399">$2</tspan>, and check the total number of arguments with <tspan fill="#ffd600">$#</tspan>.
  </text>
</svg>`,

  'bash-conditionals': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('CONDITIONAL BRANCHING', 'if, then, else &amp; Test Flags', '#f472b6')}
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="540" height="185" rx="8" fill="#151c33" stroke="#f472b6" stroke-width="1.5"/>
    <rect width="540" height="26" rx="8" fill="#2d152c"/>
    <text x="270" y="18" text-anchor="middle" fill="#f472b6" font-family="monospace" font-size="11" font-weight="700">Decision Branch: if [ -f &quot;$FILE&quot; ]; then</text>
    <!-- Test Decision Diamond -->
    <g transform="translate(190, 40)">
      <polygon points="80,0 160,35 80,70 0,35" fill="#1e294b" stroke="#ffd600" stroke-width="1.5"/>
      <text x="80" y="32" text-anchor="middle" fill="#ffd600" font-family="monospace" font-size="10" font-weight="700">[ -f file ]</text>
      <text x="80" y="46" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="8">File exists?</text>
    </g>
    <!-- Branch True -->
    <path d="M 190 75 L 100 105" stroke="#34d399" stroke-width="2"/>
    <g transform="translate(25, 105)">
      <rect width="145" height="50" rx="6" fill="#070a16" stroke="#34d399"/>
      <text x="72" y="20" text-anchor="middle" fill="#34d399" font-family="system-ui" font-size="9" font-weight="700">TRUE (then)</text>
      <text x="72" y="38" text-anchor="middle" fill="#a3e635" font-family="monospace" font-size="8">Read telemetry data</text>
    </g>
    <!-- Branch False -->
    <path d="M 350 75 L 435 105" stroke="#ef4444" stroke-width="2"/>
    <g transform="translate(370, 105)">
      <rect width="145" height="50" rx="6" fill="#070a16" stroke="#ef4444"/>
      <text x="72" y="20" text-anchor="middle" fill="#ef4444" font-family="system-ui" font-size="9" font-weight="700">FALSE (else)</text>
      <text x="72" y="38" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="8">Warning: Missing!</text>
    </g>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    Test operators: <tspan fill="#34d399">-f</tspan> (file exists), <tspan fill="#38bdf8">-d</tspan> (directory exists), <tspan fill="#ffd600">-z</tspan> (string is empty). End with <tspan fill="#f472b6">fi</tspan>.
  </text>
</svg>`,

  'unit-5-test': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  ${commonHeader('UNIT 5 CAPSTONE', 'NASA Pre-Flight Mission Health Check', '#38bdf8')}
  <g transform="translate(30, 65)" filter="url(#shadow)">
    <rect width="540" height="185" rx="8" fill="#151c33" stroke="#38bdf8" stroke-width="1.5"/>
    <rect width="540" height="26" rx="8" fill="#1b2545"/>
    <text x="270" y="18" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="700">Cape Canaveral Launch Diagnostic Matrix</text>
    <!-- Diagnostic Checklist -->
    <g transform="translate(20, 42)">
      <rect width="230" height="120" rx="6" fill="#070a16" stroke="#242d4a"/>
      <text x="14" y="22" fill="#94a3b8" font-family="monospace" font-size="10">Telemetry Checks:</text>
      <text x="14" y="44" fill="#34d399" font-family="monospace" font-size="9">&#9745; Oxygen reserves present (-f)</text>
      <text x="14" y="64" fill="#34d399" font-family="monospace" font-size="9">&#9745; Fuel tanks full (-f)</text>
      <text x="14" y="84" fill="#ffd600" font-family="monospace" font-size="9">&#9745; Checklist items counted (wc -l)</text>
      <text x="14" y="104" fill="#38bdf8" font-family="monospace" font-size="9">&#9745; Manifest locked (chmod 444)</text>
    </g>
    <!-- Launch Status Box -->
    <g transform="translate(275, 42)">
      <rect width="245" height="120" rx="6" fill="#070a16" stroke="#34d399" stroke-width="2"/>
      <circle cx="35" cy="40" r="14" fill="#10b981"/>
      <text x="35" y="45" text-anchor="middle" fill="#fff" font-family="system-ui" font-size="12">&#10003;</text>
      <text x="60" y="44" fill="#34d399" font-family="system-ui" font-size="14" font-weight="900">MISSION STATUS: GO</text>
      <text x="20" y="75" fill="#e2e8f0" font-family="monospace" font-size="10">Propulsion &amp; Life Support: GO</text>
      <text x="20" y="95" fill="#ffd600" font-family="monospace" font-size="10">Checklist items verified: 3</text>
      <text x="20" y="112" fill="#a3e635" font-family="system-ui" font-size="9">Ready for Saturn V engine ignition!</text>
    </g>
  </g>
  <text x="300" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">
    Unit 5 Capstone: Combine conditionals, line counting, permissions, and file generation into production automation.
  </text>
</svg>`
};

for (const [id, svg] of Object.entries(diagrams)) {
  const filePath = path.join(outDir, `${id}.svg`);
  fs.writeFileSync(filePath, svg.trim());
  console.log(`Generated ${id}.svg`);
}
console.log(`Successfully generated ${Object.keys(diagrams).length} Linux diagrams.`);
