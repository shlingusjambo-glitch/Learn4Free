// Generator script for Web Development course SVG diagrams
const fs = require('fs');
const path = require('path');

const svgDir = path.join(__dirname, '../public/diagrams/web');
fs.mkdirSync(svgDir, { recursive: true });

const svgs = {};

// 1.1 html-tags
svgs['html-tags.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-html-tags" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="box-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-html-tags)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="32" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Anatomy of an HTML Element (LEGO Brick Analogy)</text>

  <!-- Opening Tag Box -->
  <g transform="translate(30, 60)">
    <rect width="160" height="115" rx="8" fill="url(#box-grad)" stroke="#38bdf8" stroke-width="1.8"/>
    <circle cx="20" cy="20" r="10" fill="#0284c7"/>
    <text x="20" y="24" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">1</text>
    <text x="85" y="45" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle" font-family="monospace">&lt;h1 class="hero"&gt;</text>
    <rect x="15" y="65" width="130" height="36" rx="4" fill="#020617" stroke="#1e293b"/>
    <text x="80" y="80" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">OPENING TAG</text>
    <text x="80" y="94" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Tag Name + Attribute</text>
  </g>

  <!-- Flow 1 -->
  <path d="M 195 118 L 220 118" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="220,114 228,118 220,122" fill="#38bdf8"/>

  <!-- Content Box -->
  <g transform="translate(230, 60)">
    <rect width="150" height="115" rx="8" fill="url(#box-grad)" stroke="#f59e0b" stroke-width="1.8"/>
    <circle cx="20" cy="20" r="10" fill="#d97706"/>
    <text x="20" y="24" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">2</text>
    <text x="75" y="45" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle" font-family="monospace">Avengers Assemble</text>
    <rect x="12" y="65" width="126" height="36" rx="4" fill="#020617" stroke="#1e293b"/>
    <text x="75" y="80" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">CONTENT</text>
    <text x="75" y="94" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="sans-serif">Text / Nested Elements</text>
  </g>

  <!-- Flow 2 -->
  <path d="M 385 118 L 410 118" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="410,114 418,118 410,122" fill="#f59e0b"/>

  <!-- Closing Tag Box -->
  <g transform="translate(420, 60)">
    <rect width="150" height="115" rx="8" fill="url(#box-grad)" stroke="#34d399" stroke-width="1.8"/>
    <circle cx="20" cy="20" r="10" fill="#059669"/>
    <text x="20" y="24" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">3</text>
    <text x="75" y="45" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle" font-family="monospace">&lt;/h1&gt;</text>
    <rect x="12" y="65" width="126" height="36" rx="4" fill="#020617" stroke="#1e293b"/>
    <text x="75" y="80" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">CLOSING TAG</text>
    <text x="75" y="94" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Forward Slash / Ends Brick</text>
  </g>
</svg>`;

// 1.2 headings-paragraphs
svgs['headings-paragraphs.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-headings" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-headings)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="30" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Semantic Text Hierarchy: Headlines to Paragraphs</text>

  <!-- Left: Hierarchy Pyramid -->
  <g transform="translate(30, 52)">
    <rect width="250" height="145" rx="8" fill="url(#card-grad)" stroke="#38bdf8" stroke-width="1.5"/>
    <rect x="15" y="15" width="220" height="26" rx="4" fill="#0369a1"/>
    <text x="125" y="32" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle" font-family="monospace">&lt;h1&gt; Main Album Title (Huge)</text>

    <rect x="30" y="48" width="190" height="24" rx="4" fill="#0284c7"/>
    <text x="125" y="64" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">&lt;h2&gt; Track Section Header</text>

    <rect x="45" y="79" width="160" height="22" rx="4" fill="#0ea5e9"/>
    <text x="125" y="94" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">&lt;h3&gt; Sub-detail Header</text>

    <rect x="60" y="108" width="130" height="24" rx="4" fill="#020617" stroke="#334155"/>
    <text x="125" y="124" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="monospace">&lt;p&gt; Body text &amp; lyrics</text>
  </g>

  <!-- Right: Semantic Formatting -->
  <g transform="translate(310, 52)">
    <rect width="260" height="145" rx="8" fill="url(#card-grad)" stroke="#a855f7" stroke-width="1.5"/>
    <text x="130" y="24" fill="#c084fc" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Semantic Emphasis &amp; Importance</text>

    <rect x="15" y="36" width="230" height="42" rx="6" fill="#020617" stroke="#334155"/>
    <text x="25" y="54" fill="#e2e8f0" font-size="11" font-family="sans-serif">&lt;strong&gt;Bold Notice&lt;/strong&gt;</text>
    <text x="25" y="70" fill="#fb7185" font-size="10" font-family="sans-serif">Conveys critical meaning (screen readers stress)</text>

    <rect x="15" y="88" width="230" height="42" rx="6" fill="#020617" stroke="#334155"/>
    <text x="25" y="106" fill="#e2e8f0" font-size="11" font-family="sans-serif">&lt;em&gt;Italicized Tone&lt;/em&gt;</text>
    <text x="25" y="122" fill="#38bdf8" font-size="10" font-family="sans-serif">Shifts verbal tone or conversational stress</text>
  </g>
</svg>`;

// 1.3 links-images
svgs['links-images.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-links" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="card-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-links)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="30" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Multiverse Portals: Links (&lt;a&gt;) and Images (&lt;img&gt;)</text>

  <!-- Left: Anchor Tag -->
  <g transform="translate(30, 52)">
    <rect width="250" height="145" rx="8" fill="url(#card-grad2)" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="125" y="25" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle" font-family="monospace">&lt;a href="url"&gt;Label&lt;/a&gt;</text>
    <rect x="15" y="38" width="220" height="42" rx="5" fill="#020617" stroke="#1e293b"/>
    <text x="25" y="55" fill="#94a3b8" font-size="10" font-family="monospace">href = "Hypertext REFerence"</text>
    <text x="25" y="70" fill="#38bdf8" font-size="10" font-family="sans-serif">The wormhole destination URL</text>
    <rect x="15" y="90" width="220" height="45" rx="5" fill="#0369a1" fill-opacity="0.2" stroke="#0284c7"/>
    <text x="125" y="110" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Teleports user upon click</text>
    <text x="125" y="125" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="sans-serif">Can wrap text, icons, or full image cards</text>
  </g>

  <!-- Right: Image Tag -->
  <g transform="translate(310, 52)">
    <rect width="260" height="145" rx="8" fill="url(#card-grad2)" stroke="#10b981" stroke-width="1.5"/>
    <text x="130" y="25" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle" font-family="monospace">&lt;img src="..." alt="..." /&gt;</text>
    <rect x="15" y="38" width="230" height="42" rx="5" fill="#020617" stroke="#1e293b"/>
    <text x="25" y="55" fill="#94a3b8" font-size="10" font-family="monospace">src = "Source image path"</text>
    <text x="25" y="70" fill="#34d399" font-size="10" font-family="sans-serif">File URL or relative asset path</text>
    <rect x="15" y="90" width="230" height="45" rx="5" fill="#065f46" fill-opacity="0.2" stroke="#059669"/>
    <text x="130" y="110" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">alt = Accessible Description</text>
    <text x="130" y="125" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="sans-serif">Read by screen readers if image fails</text>
  </g>
</svg>`;

// 1.4 unit-1-test
svgs['unit-1-test.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-u1t" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-u1t)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="28" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Unit 1 Test Architecture: Fan Club Profile Page</text>

  <!-- Browser Window Mock -->
  <g transform="translate(60, 45)">
    <rect width="480" height="155" rx="6" fill="#020617" stroke="#475569" stroke-width="1.5"/>
    <!-- Browser Top Bar -->
    <rect width="480" height="22" rx="6" fill="#1e293b"/>
    <circle cx="15" cy="11" r="4" fill="#ef4444"/>
    <circle cx="28" cy="11" r="4" fill="#f59e0b"/>
    <circle cx="41" cy="11" r="4" fill="#10b981"/>
    <text x="240" y="15" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="monospace">&lt;title&gt;Avengers Fan Club&lt;/title&gt;</text>

    <!-- Page Content Breakdown -->
    <text x="20" y="42" fill="#38bdf8" font-size="12" font-weight="bold" font-family="sans-serif">&lt;h1&gt; Avengers Fan Club Official Portal</text>
    <text x="20" y="60" fill="#cbd5e1" font-size="10" font-family="sans-serif">&lt;p&gt; Earth&apos;s &lt;strong&gt;Mightiest Heroes&lt;/strong&gt; headquarters in &lt;em&gt;New York City&lt;/em&gt;.&lt;/p&gt;</text>

    <!-- Sub components -->
    <rect x="20" y="72" width="130" height="68" rx="4" fill="#1e293b" stroke="#38bdf8"/>
    <text x="85" y="100" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">&lt;img src="..."&gt;</text>
    <text x="85" y="118" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="sans-serif">Hero Shield Badge</text>

    <g transform="translate(165, 72)">
      <rect width="295" height="68" rx="4" fill="#1e293b" stroke="#10b981"/>
      <text x="15" y="20" fill="#34d399" font-size="10" font-weight="bold" font-family="sans-serif">&lt;h2&gt; Featured Members &lt;ul&gt;&lt;li&gt;</text>
      <text x="15" y="38" fill="#cbd5e1" font-size="9" font-family="sans-serif">• Iron Man (Tech Lead) • Thor (God of Thunder)</text>
      <text x="15" y="55" fill="#f59e0b" font-size="9" font-family="monospace">&lt;a href="https://avengers.org"&gt;Join the Initiative &amp;rarr;&lt;/a&gt;</text>
    </g>
  </g>
</svg>`;

// 2.1 css-selectors
svgs['css-selectors.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-css-sel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="card-sel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-css-sel)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="30" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">The Three Core CSS Selectors</text>

  <!-- Element Selector -->
  <g transform="translate(25, 55)">
    <rect width="165" height="140" rx="8" fill="url(#card-sel)" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="82" y="30" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle" font-family="monospace">p { ... }</text>
    <rect x="12" y="45" width="141" height="35" rx="4" fill="#020617"/>
    <text x="82" y="60" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">ELEMENT SELECTOR</text>
    <text x="82" y="72" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Targets all &lt;p&gt; tags</text>
    <text x="82" y="105" fill="#cbd5e1" font-size="10" text-anchor="middle" font-family="sans-serif">Broad sweep across</text>
    <text x="82" y="122" fill="#cbd5e1" font-size="10" text-anchor="middle" font-family="sans-serif">all matching tags</text>
  </g>

  <!-- Class Selector -->
  <g transform="translate(215, 55)">
    <rect width="170" height="140" rx="8" fill="url(#card-sel)" stroke="#a855f7" stroke-width="1.8"/>
    <text x="85" y="30" fill="#c084fc" font-size="14" font-weight="bold" text-anchor="middle" font-family="monospace">.vip-badge { ... }</text>
    <rect x="12" y="45" width="146" height="35" rx="4" fill="#020617"/>
    <text x="85" y="60" fill="#c084fc" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">CLASS SELECTOR (.)</text>
    <text x="85" y="72" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Reusable across elements</text>
    <text x="85" y="105" fill="#cbd5e1" font-size="10" text-anchor="middle" font-family="sans-serif">Applies to any tag</text>
    <text x="85" y="122" fill="#cbd5e1" font-size="10" text-anchor="middle" font-family="sans-serif">with class="vip-badge"</text>
  </g>

  <!-- ID Selector -->
  <g transform="translate(410, 55)">
    <rect width="165" height="140" rx="8" fill="url(#card-sel)" stroke="#f59e0b" stroke-width="1.8"/>
    <text x="82" y="30" fill="#fbbf24" font-size="14" font-weight="bold" text-anchor="middle" font-family="monospace">#lead-singer { ... }</text>
    <rect x="12" y="45" width="141" height="35" rx="4" fill="#020617"/>
    <text x="82" y="60" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">ID SELECTOR (#)</text>
    <text x="82" y="72" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Unique single element</text>
    <text x="82" y="105" fill="#cbd5e1" font-size="10" text-anchor="middle" font-family="sans-serif">Highest specificity</text>
    <text x="82" y="122" fill="#cbd5e1" font-size="10" text-anchor="middle" font-family="sans-serif">Only one per page!</text>
  </g>
</svg>`;

// 2.2 box-model
svgs['box-model.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-box-model" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-box-model)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="24" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">The CSS Box Model: 4 Concentric Layers</text>

  <!-- Concentric Boxes Centered -->
  <g transform="translate(110, 36)">
    <!-- Margin Box -->
    <rect width="380" height="170" rx="8" fill="#f43f5e" fill-opacity="0.15" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="190" y="18" fill="#fb7185" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">MARGIN (Personal bubble / spacing from neighboring boxes)</text>

    <!-- Border Box -->
    <rect x="25" y="25" width="330" height="130" rx="6" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="2"/>
    <text x="190" y="42" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">BORDER (Visible cardboard frame / edge)</text>

    <!-- Padding Box -->
    <rect x="50" y="50" width="280" height="90" rx="4" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
    <text x="190" y="66" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">PADDING (Inner bubble wrap cushioning)</text>

    <!-- Content Box -->
    <rect x="80" y="74" width="220" height="52" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
    <text x="190" y="96" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">CONTENT</text>
    <text x="190" y="112" fill="#bae6fd" font-size="10" text-anchor="middle" font-family="monospace">width x height</text>
  </g>
</svg>`;

// 2.3 flexbox-basics
svgs['flexbox-basics.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-flex" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-flex)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="26" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Flexbox: Main Axis &amp; Cross Axis (Netflix Row Layout)</text>

  <!-- Flex Container -->
  <g transform="translate(40, 42)">
    <rect width="520" height="150" rx="8" fill="#020617" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="15" y="20" fill="#38bdf8" font-size="11" font-weight="bold" font-family="monospace">display: flex; (Flex Container)</text>

    <!-- Main Axis Indicator -->
    <path d="M 15 36 L 490 36" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
    <polygon points="490,32 500,36 490,40" fill="#f59e0b"/>
    <text x="250" y="32" fill="#fbbf24" font-size="10" font-weight="bold" font-family="sans-serif">MAIN AXIS &rarr; justify-content: space-between</text>

    <!-- Cross Axis Indicator -->
    <path d="M 28 50 L 28 135" stroke="#a855f7" stroke-width="2" stroke-linecap="round"/>
    <polygon points="24,135 28,143 32,135" fill="#a855f7"/>
    <text x="35" y="100" fill="#c084fc" font-size="9" font-weight="bold" font-family="sans-serif" transform="rotate(90, 35, 100)">CROSS AXIS &darr; align-items: center</text>

    <!-- Flex Items (Movie Cards) -->
    <g transform="translate(60, 52)">
      <rect width="90" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="45" y="36" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Card 1</text>
      <text x="45" y="55" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Iron Man</text>
    </g>

    <g transform="translate(170, 52)">
      <rect width="90" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="45" y="36" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Card 2</text>
      <text x="45" y="55" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Spider-Man</text>
    </g>

    <g transform="translate(280, 52)">
      <rect width="90" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="45" y="36" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Card 3</text>
      <text x="45" y="55" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Thor</text>
    </g>

    <g transform="translate(390, 52)">
      <rect width="90" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="45" y="36" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Card 4</text>
      <text x="45" y="55" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Hulk</text>
    </g>
  </g>
</svg>`;

// 2.4 unit-2-test
svgs['unit-2-test.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-u2t" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="neon-glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-u2t)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="28" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Unit 2 Test: Neon Cyberpunk Album Card (.album-card)</text>

  <!-- Left: CSS Card Representation -->
  <g transform="translate(50, 48)">
    <rect width="220" height="150" rx="10" fill="#020617" stroke="url(#neon-glow)" stroke-width="2.5"/>
    <rect x="20" y="15" width="180" height="40" rx="6" fill="#1e293b"/>
    <text x="110" y="38" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">SYNTHWAVE 2099</text>
    <text x="110" y="75" fill="#ec4899" font-size="10" text-anchor="middle" font-family="monospace">box-shadow: 0 0 15px #ec4899</text>

    <!-- Flex Track Row inside -->
    <rect x="20" y="90" width="180" height="30" rx="4" fill="#0f172a" stroke="#334155"/>
    <text x="30" y="108" fill="#f8fafc" font-size="9" font-family="sans-serif">Track 01</text>
    <text x="175" y="108" fill="#f59e0b" font-size="9" font-family="monospace">03:45</text>
    <text x="110" y="138" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="sans-serif">display: flex; justify-content: space-between</text>
  </g>

  <!-- Right: CSS Specifications Checklist -->
  <g transform="translate(300, 48)">
    <rect width="250" height="150" rx="8" fill="#020617" stroke="#334155" stroke-width="1.5"/>
    <text x="20" y="25" fill="#34d399" font-size="12" font-weight="bold" font-family="sans-serif">✓ Box Model Specs:</text>
    <text x="30" y="46" fill="#cbd5e1" font-size="10" font-family="monospace">• width: 300px; padding: 20px;</text>
    <text x="30" y="64" fill="#cbd5e1" font-size="10" font-family="monospace">• border: 2px solid #00ffcc;</text>
    <text x="30" y="82" fill="#cbd5e1" font-size="10" font-family="monospace">• border-radius: 12px; margin: 24px;</text>
    <text x="20" y="105" fill="#38bdf8" font-size="12" font-weight="bold" font-family="sans-serif">✓ Flex Layout &amp; Hover:</text>
    <text x="30" y="124" fill="#cbd5e1" font-size="10" font-family="monospace">• display: flex; flex-direction: col</text>
    <text x="30" y="140" fill="#ec4899" font-size="10" font-family="monospace">• :hover { transform: translateY(-4px); }</text>
  </g>
</svg>`;

// 3.1 js-variables
svgs['js-variables.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-vars" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="slot-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-vars)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="30" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">JavaScript Memory Slots: let vs const (Mario Vault)</text>

  <!-- Slot 1: let coins (Number) -->
  <g transform="translate(30, 55)">
    <rect width="160" height="135" rx="8" fill="url(#slot-grad)" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="80" y="25" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle" font-family="monospace">let coins = 99</text>
    <rect x="15" y="38" width="130" height="42" rx="4" fill="#020617"/>
    <text x="80" y="56" fill="#f59e0b" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">99 (Number)</text>
    <text x="80" y="72" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">MUTABLE</text>
    <text x="80" y="102" fill="#cbd5e1" font-size="10" text-anchor="middle" font-family="sans-serif">Can reassign:</text>
    <text x="80" y="118" fill="#34d399" font-size="10" text-anchor="middle" font-family="monospace">coins = coins + 1</text>
  </g>

  <!-- Slot 2: const player (String) -->
  <g transform="translate(220, 55)">
    <rect width="160" height="135" rx="8" fill="url(#slot-grad)" stroke="#f43f5e" stroke-width="1.8"/>
    <text x="80" y="25" fill="#fb7185" font-size="12" font-weight="bold" text-anchor="middle" font-family="monospace">const hero = "Mario"</text>
    <rect x="15" y="38" width="130" height="42" rx="4" fill="#020617"/>
    <text x="80" y="56" fill="#fb7185" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">"Mario" (String)</text>
    <text x="80" y="72" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">IMMUTABLE BINDING</text>
    <text x="80" y="102" fill="#cbd5e1" font-size="10" text-anchor="middle" font-family="sans-serif">Locked in vault!</text>
    <text x="80" y="118" fill="#fb7185" font-size="10" text-anchor="middle" font-family="monospace">hero = "Luigi" &cross;</text>
  </g>

  <!-- Slot 3: let hasSuperStar (Boolean) -->
  <g transform="translate(410, 55)">
    <rect width="160" height="135" rx="8" fill="url(#slot-grad)" stroke="#10b981" stroke-width="1.8"/>
    <text x="80" y="25" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">let star = true</text>
    <rect x="15" y="38" width="130" height="42" rx="4" fill="#020617"/>
    <text x="80" y="56" fill="#34d399" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">true (Boolean)</text>
    <text x="80" y="72" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">BINARY STATE</text>
    <text x="80" y="102" fill="#cbd5e1" font-size="10" text-anchor="middle" font-family="sans-serif">Only two values:</text>
    <text x="80" y="118" fill="#38bdf8" font-size="10" text-anchor="middle" font-family="monospace">true | false</text>
  </g>
</svg>`;

// 3.2 js-conditionals
svgs['js-conditionals.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-cond" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-cond)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="28" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Conditionals: The Bouncer at the Club Fork</text>

  <!-- Condition Diamond -->
  <g transform="translate(190, 50)">
    <polygon points="110,0 220,40 110,80 0,40" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
    <text x="110" y="36" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">if (age &gt;= 21)</text>
    <text x="110" y="52" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Boolean Evaluation</text>
  </g>

  <!-- True Branch (Right) -->
  <path d="M 410 90 L 460 90 L 460 120" stroke="#10b981" stroke-width="2" fill="none"/>
  <polygon points="456,120 460,128 464,120" fill="#10b981"/>
  <text x="440" y="82" fill="#34d399" font-size="11" font-weight="bold" font-family="sans-serif">TRUE</text>
  <g transform="translate(390, 130)">
    <rect width="140" height="60" rx="6" fill="#020617" stroke="#10b981" stroke-width="1.8"/>
    <text x="70" y="26" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">VIP Access Granted</text>
    <text x="70" y="44" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="monospace">console.log("Welcome")</text>
  </g>

  <!-- False Branch (Left) -->
  <path d="M 190 90 L 140 90 L 140 120" stroke="#f43f5e" stroke-width="2" fill="none"/>
  <polygon points="136,120 140,128 144,120" fill="#f43f5e"/>
  <text x="145" y="82" fill="#fb7185" font-size="11" font-weight="bold" font-family="sans-serif">FALSE</text>
  <g transform="translate(70, 130)">
    <rect width="140" height="60" rx="6" fill="#020617" stroke="#f43f5e" stroke-width="1.8"/>
    <text x="70" y="26" fill="#fb7185" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Access Denied</text>
    <text x="70" y="44" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="monospace">console.log("Underage")</text>
  </g>
</svg>`;

// 3.3 js-loops-arrays
svgs['js-loops-arrays.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-loop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-loop)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="28" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Arrays &amp; Loops: The Indexed Assembly Line</text>

  <!-- Array Container -->
  <g transform="translate(60, 50)">
    <!-- Box 0 -->
    <rect x="0" y="20" width="110" height="70" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="55" y="14" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">Index [0]</text>
    <text x="55" y="55" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">"Cruel Summer"</text>

    <!-- Box 1 -->
    <rect x="120" y="20" width="110" height="70" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="175" y="14" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">Index [1]</text>
    <text x="175" y="55" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">"Style"</text>

    <!-- Box 2 -->
    <rect x="240" y="20" width="110" height="70" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="295" y="14" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">Index [2]</text>
    <text x="295" y="55" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">"Karma"</text>

    <!-- Box 3 -->
    <rect x="360" y="20" width="110" height="70" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="415" y="14" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">Index [3]</text>
    <text x="415" y="55" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">"Blank Space"</text>
  </g>

  <!-- Loop Iterator Banner -->
  <g transform="translate(60, 150)">
    <rect width="470" height="45" rx="6" fill="#020617" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="235" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle" font-family="monospace">for (let i = 0; i &lt; songs.length; i++)</text>
    <text x="235" y="38" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">Robot visits each slot in order from 0 to length - 1</text>
  </g>
</svg>`;

// 3.4 unit-3-test
svgs['unit-3-test.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-u3t" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-u3t)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="28" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Unit 3 Test: Spotify Playlist Queue Filter &amp; Duration Calculator</text>

  <!-- Step 1: Raw Queue -->
  <g transform="translate(30, 52)">
    <rect width="145" height="135" rx="8" fill="#020617" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="72" y="25" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">1. Raw Queue Array</text>
    <rect x="10" y="35" width="125" height="24" rx="4" fill="#1e293b"/>
    <text x="72" y="51" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="sans-serif">Song 1 (210s) [keep]</text>
    <rect x="10" y="65" width="125" height="24" rx="4" fill="#3f121d" stroke="#f43f5e"/>
    <text x="72" y="81" fill="#fb7185" font-size="9" text-anchor="middle" font-family="sans-serif">Song 2 (skipped &cross;)</text>
    <rect x="10" y="95" width="125" height="24" rx="4" fill="#1e293b"/>
    <text x="72" y="111" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="sans-serif">Song 3 (180s) [keep]</text>
  </g>

  <!-- Arrow 1 -->
  <path d="M 185 120 L 210 120" stroke="#f59e0b" stroke-width="2.5"/>
  <polygon points="210,116 218,120 210,124" fill="#f59e0b"/>

  <!-- Step 2: Loop & Filter Accumulator -->
  <g transform="translate(225, 52)">
    <rect width="165" height="135" rx="8" fill="#020617" stroke="#f59e0b" stroke-width="1.8"/>
    <text x="82" y="25" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">2. Filter &amp; Accumulate</text>
    <text x="82" y="50" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="monospace">totalSeconds += duration</text>
    <rect x="12" y="65" width="141" height="55" rx="4" fill="#1e293b"/>
    <text x="82" y="85" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">minutes = floor(sec / 60)</text>
    <text x="82" y="105" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">seconds = sec % 60</text>
  </g>

  <!-- Arrow 2 -->
  <path d="M 400 120 L 425 120" stroke="#10b981" stroke-width="2.5"/>
  <polygon points="425,116 433,120 425,124" fill="#10b981"/>

  <!-- Step 3: Formatted Output -->
  <g transform="translate(435, 52)">
    <rect width="135" height="135" rx="8" fill="#020617" stroke="#10b981" stroke-width="1.8"/>
    <text x="67" y="25" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">3. Queue Summary</text>
    <rect x="10" y="38" width="115" height="82" rx="4" fill="#1e293b"/>
    <text x="67" y="60" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">Queue: 2 tracks</text>
    <text x="67" y="80" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">Total: 6m 30s</text>
    <text x="67" y="100" fill="#a855f7" font-size="9" text-anchor="middle" font-family="monospace">Status: Ready</text>
  </g>
</svg>`;

// 4.1 js-functions
svgs['js-functions.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-fn" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-fn)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="28" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Functions: The Reusable Spell Machine (Coffee Maker)</text>

  <!-- Input: Parameters -->
  <g transform="translate(30, 60)">
    <rect width="130" height="110" rx="8" fill="#020617" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="65" y="28" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">PARAMETERS</text>
    <rect x="15" y="42" width="100" height="26" rx="4" fill="#1e293b"/>
    <text x="65" y="59" fill="#f8fafc" font-size="10" text-anchor="middle" font-family="monospace">baseDamage</text>
    <rect x="15" y="74" width="100" height="24" rx="4" fill="#1e293b"/>
    <text x="65" y="90" fill="#f8fafc" font-size="10" text-anchor="middle" font-family="monospace">critMultiplier</text>
  </g>

  <!-- Arrow In -->
  <path d="M 170 115 L 205 115" stroke="#38bdf8" stroke-width="2.5"/>
  <polygon points="205,111 213,115 205,119" fill="#38bdf8"/>

  <!-- Function Body -->
  <g transform="translate(215, 50)">
    <rect width="180" height="130" rx="10" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
    <text x="90" y="28" fill="#c084fc" font-size="12" font-weight="bold" text-anchor="middle" font-family="monospace">function castSpell()</text>
    <rect x="12" y="40" width="156" height="50" rx="4" fill="#020617"/>
    <text x="90" y="60" fill="#fbbf24" font-size="10" text-anchor="middle" font-family="monospace">let hit = base * crit;</text>
    <text x="90" y="78" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">return hit;</text>
    <text x="90" y="112" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Arrow: (b, c) =&gt; b * c</text>
  </g>

  <!-- Arrow Out -->
  <path d="M 405 115 L 440 115" stroke="#34d399" stroke-width="2.5"/>
  <polygon points="440,111 448,115 440,119" fill="#34d399"/>

  <!-- Output: Return Value -->
  <g transform="translate(450, 60)">
    <rect width="120" height="110" rx="8" fill="#020617" stroke="#10b981" stroke-width="1.8"/>
    <text x="60" y="30" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">RETURN VALUE</text>
    <rect x="15" y="45" width="90" height="45" rx="4" fill="#065f46" fill-opacity="0.3" stroke="#059669"/>
    <text x="60" y="72" fill="#34d399" font-size="16" font-weight="bold" text-anchor="middle" font-family="monospace">250</text>
  </g>
</svg>`;

// 4.2 js-objects
svgs['js-objects.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-obj" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-obj)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="28" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Objects: Character Sheets with Properties &amp; Methods</text>

  <!-- Object Card (Pikachu) -->
  <g transform="translate(40, 48)">
    <rect width="250" height="150" rx="8" fill="#020617" stroke="#f59e0b" stroke-width="2"/>
    <rect x="15" y="12" width="220" height="25" rx="4" fill="#1e293b"/>
    <text x="125" y="29" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">const pikachu = { ... }</text>

    <!-- Properties -->
    <text x="25" y="58" fill="#38bdf8" font-size="11" font-family="monospace">name: "Pikachu",</text>
    <text x="25" y="76" fill="#38bdf8" font-size="11" font-family="monospace">type: "Electric",</text>
    <text x="25" y="94" fill="#38bdf8" font-size="11" font-family="monospace">hp: 100,</text>

    <!-- Method -->
    <rect x="18" y="105" width="214" height="32" rx="4" fill="#0f172a" stroke="#a855f7"/>
    <text x="125" y="125" fill="#c084fc" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">thunderbolt() { ... }</text>
  </g>

  <!-- Right: Accessing Notation -->
  <g transform="translate(320, 48)">
    <rect width="240" height="150" rx="8" fill="#020617" stroke="#334155" stroke-width="1.5"/>
    <text x="20" y="26" fill="#34d399" font-size="12" font-weight="bold" font-family="sans-serif">Reading &amp; Calling Members</text>

    <rect x="15" y="38" width="210" height="44" rx="4" fill="#1e293b"/>
    <text x="25" y="55" fill="#38bdf8" font-size="10" font-weight="bold" font-family="monospace">pikachu.hp // 100 (Dot)</text>
    <text x="25" y="72" fill="#94a3b8" font-size="9" font-family="monospace">pikachu["hp"] // Bracket notation</text>

    <rect x="15" y="92" width="210" height="44" rx="4" fill="#1e293b"/>
    <text x="25" y="110" fill="#c084fc" font-size="10" font-weight="bold" font-family="monospace">pikachu.thunderbolt();</text>
    <text x="25" y="126" fill="#94a3b8" font-size="9" font-family="sans-serif">Executes method via this.hp</text>
  </g>
</svg>`;

// 4.3 js-array-methods
svgs['js-array-methods.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-methods" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-methods)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="28" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">The Big Three: .filter(), .map(), and .reduce()</text>

  <!-- Filter -->
  <g transform="translate(25, 52)">
    <rect width="170" height="145" rx="8" fill="#020617" stroke="#f43f5e" stroke-width="1.8"/>
    <text x="85" y="26" fill="#fb7185" font-size="13" font-weight="bold" text-anchor="middle" font-family="monospace">.filter()</text>
    <text x="85" y="44" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Keeps matching items</text>
    <rect x="12" y="55" width="146" height="30" rx="4" fill="#1e293b"/>
    <text x="85" y="74" fill="#fb7185" font-size="9" text-anchor="middle" font-family="monospace">x =&gt; x.score &gt;= 100</text>
    <text x="85" y="105" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="sans-serif">Input: [50, 120, 200]</text>
    <text x="85" y="124" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">&rarr; [120, 200]</text>
  </g>

  <!-- Map -->
  <g transform="translate(215, 52)">
    <rect width="170" height="145" rx="8" fill="#020617" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="85" y="26" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle" font-family="monospace">.map()</text>
    <text x="85" y="44" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Transforms every item</text>
    <rect x="12" y="55" width="146" height="30" rx="4" fill="#1e293b"/>
    <text x="85" y="74" fill="#38bdf8" font-size="9" text-anchor="middle" font-family="monospace">x =&gt; x * 2</text>
    <text x="85" y="105" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="sans-serif">Input: [120, 200]</text>
    <text x="85" y="124" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">&rarr; [240, 400]</text>
  </g>

  <!-- Reduce -->
  <g transform="translate(405, 52)">
    <rect width="170" height="145" rx="8" fill="#020617" stroke="#10b981" stroke-width="1.8"/>
    <text x="85" y="26" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle" font-family="monospace">.reduce()</text>
    <text x="85" y="44" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Crunches into single value</text>
    <rect x="12" y="55" width="146" height="30" rx="4" fill="#1e293b"/>
    <text x="85" y="74" fill="#34d399" font-size="9" text-anchor="middle" font-family="monospace">(sum, x) =&gt; sum + x</text>
    <text x="85" y="105" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="sans-serif">Input: [240, 400]</text>
    <text x="85" y="124" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle" font-family="monospace">&rarr; 640</text>
  </g>
</svg>`;

// 4.4 unit-4-test
svgs['unit-4-test.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-u4t" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-u4t)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="28" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Unit 4 Test: Video Game Inventory &amp; Stat Powerup Pipeline</text>

  <!-- Diagram Flow -->
  <g transform="translate(30, 50)">
    <!-- Stage 1 -->
    <rect width="115" height="135" rx="6" fill="#020617" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="57" y="24" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">1. Gear Bag</text>
    <rect x="8" y="34" width="99" height="22" rx="3" fill="#1e293b"/>
    <text x="57" y="49" fill="#cbd5e1" font-size="8" text-anchor="middle" font-family="sans-serif">Rusty Dagger (Common)</text>
    <rect x="8" y="60" width="99" height="22" rx="3" fill="#1e293b"/>
    <text x="57" y="75" fill="#f59e0b" font-size="8" text-anchor="middle" font-family="sans-serif">Excalibur (Legendary)</text>
    <rect x="8" y="86" width="99" height="22" rx="3" fill="#1e293b"/>
    <text x="57" y="101" fill="#f59e0b" font-size="8" text-anchor="middle" font-family="sans-serif">Dragon Bow (Legendary)</text>
  </g>

  <path d="M 150 115 L 170 115" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="170,111 178,115 170,119" fill="#f59e0b"/>

  <!-- Stage 2 -->
  <g transform="translate(180, 50)">
    <rect width="115" height="135" rx="6" fill="#020617" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="57" y="24" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">2. .filter()</text>
    <text x="57" y="45" fill="#cbd5e1" font-size="8" text-anchor="middle" font-family="sans-serif">Weed out commons</text>
    <rect x="8" y="60" width="99" height="50" rx="3" fill="#1e293b"/>
    <text x="57" y="80" fill="#34d399" font-size="8" text-anchor="middle" font-family="monospace">rarity ===</text>
    <text x="57" y="96" fill="#34d399" font-size="8" text-anchor="middle" font-family="monospace">&apos;legendary&apos;</text>
  </g>

  <path d="M 300 115 L 320 115" stroke="#a855f7" stroke-width="2"/>
  <polygon points="320,111 328,115 320,119" fill="#a855f7"/>

  <!-- Stage 3 -->
  <g transform="translate(330, 50)">
    <rect width="115" height="135" rx="6" fill="#020617" stroke="#a855f7" stroke-width="1.5"/>
    <text x="57" y="24" fill="#c084fc" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">3. .map()</text>
    <text x="57" y="45" fill="#cbd5e1" font-size="8" text-anchor="middle" font-family="sans-serif">Apply potion buff</text>
    <rect x="8" y="60" width="99" height="50" rx="3" fill="#1e293b"/>
    <text x="57" y="80" fill="#c084fc" font-size="8" text-anchor="middle" font-family="monospace">atk * 1.5</text>
    <text x="57" y="96" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="sans-serif">+ Enchantment</text>
  </g>

  <path d="M 450 115 L 470 115" stroke="#10b981" stroke-width="2"/>
  <polygon points="470,111 478,115 470,119" fill="#10b981"/>

  <!-- Stage 4 -->
  <g transform="translate(480, 50)">
    <rect width="90" height="135" rx="6" fill="#020617" stroke="#10b981" stroke-width="1.5"/>
    <text x="45" y="24" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">4. .reduce()</text>
    <text x="45" y="45" fill="#cbd5e1" font-size="8" text-anchor="middle" font-family="sans-serif">Total Score</text>
    <rect x="8" y="60" width="74" height="50" rx="3" fill="#065f46" fill-opacity="0.3" stroke="#059669"/>
    <text x="45" y="90" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle" font-family="monospace">4,850</text>
  </g>
</svg>`;

// 5.1 dom-selection
svgs['dom-selection.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-dom" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-dom)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="28" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">The DOM Tree: Document Object Model Hierarchy</text>

  <!-- Root: Document -->
  <g transform="translate(240, 42)">
    <rect width="120" height="28" rx="6" fill="#0284c7" stroke="#38bdf8"/>
    <text x="60" y="19" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="monospace">document</text>
  </g>

  <!-- Branch lines -->
  <path d="M 300 70 L 300 85" stroke="#38bdf8" stroke-width="2"/>
  <path d="M 180 85 L 420 85" stroke="#38bdf8" stroke-width="2"/>
  <path d="M 180 85 L 180 100" stroke="#38bdf8" stroke-width="2"/>
  <path d="M 420 85 L 420 100" stroke="#38bdf8" stroke-width="2"/>

  <!-- <head> -->
  <g transform="translate(130, 100)">
    <rect width="100" height="26" rx="4" fill="#1e293b" stroke="#94a3b8"/>
    <text x="50" y="17" fill="#cbd5e1" font-size="10" text-anchor="middle" font-family="monospace">&lt;head&gt;</text>
  </g>

  <!-- <body> -->
  <g transform="translate(370, 100)">
    <rect width="100" height="26" rx="4" fill="#1e293b" stroke="#f59e0b"/>
    <text x="50" y="17" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">&lt;body&gt;</text>
  </g>

  <!-- Sub branches from body -->
  <path d="M 420 126 L 420 142" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 300 142 L 530 142" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 300 142 L 300 155" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 420 142 L 420 155" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 530 142 L 530 155" stroke="#f59e0b" stroke-width="2"/>

  <!-- h1#title -->
  <g transform="translate(245, 155)">
    <rect width="110" height="42" rx="4" fill="#020617" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="55" y="18" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle" font-family="monospace">&lt;h1 id="title"&gt;</text>
    <text x="55" y="32" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="sans-serif">getElementById()</text>
  </g>

  <!-- p.desc -->
  <g transform="translate(365, 155)">
    <rect width="110" height="42" rx="4" fill="#020617" stroke="#a855f7" stroke-width="1.5"/>
    <text x="55" y="18" fill="#c084fc" font-size="9" font-weight="bold" text-anchor="middle" font-family="monospace">&lt;p class="desc"&gt;</text>
    <text x="55" y="32" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="sans-serif">querySelector()</text>
  </g>

  <!-- button -->
  <g transform="translate(485, 155)">
    <rect width="95" height="42" rx="4" fill="#020617" stroke="#10b981" stroke-width="1.5"/>
    <text x="47" y="18" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle" font-family="monospace">&lt;button&gt;</text>
    <text x="47" y="32" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="sans-serif">.textContent</text>
  </g>
</svg>`;

// 5.2 event-listeners
svgs['event-listeners.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-evt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-evt)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="28" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Event Listeners: User Click Tripwire &amp; UI Re-render</text>

  <!-- 1. User Action -->
  <g transform="translate(30, 55)">
    <rect width="115" height="130" rx="8" fill="#020617" stroke="#38bdf8" stroke-width="1.8"/>
    <text x="57" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">1. User Event</text>
    <circle cx="57" cy="55" r="18" fill="#0369a1"/>
    <text x="57" y="60" fill="#ffffff" font-size="12" text-anchor="middle">🖱️</text>
    <text x="57" y="90" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="sans-serif">Clicks button</text>
    <text x="57" y="106" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle" font-family="monospace">&apos;click&apos;</text>
  </g>

  <!-- Flow 1 -->
  <path d="M 150 120 L 175 120" stroke="#38bdf8" stroke-width="2.5"/>
  <polygon points="175,116 183,120 175,124" fill="#38bdf8"/>

  <!-- 2. Listener Sensor -->
  <g transform="translate(190, 55)">
    <rect width="180" height="130" rx="8" fill="#020617" stroke="#f59e0b" stroke-width="1.8"/>
    <text x="90" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">2. Event Listener Callback</text>
    <rect x="10" y="36" width="160" height="42" rx="4" fill="#1e293b"/>
    <text x="90" y="52" fill="#fbbf24" font-size="9" font-family="monospace">btn.addEventListener(</text>
    <text x="90" y="68" fill="#34d399" font-size="9" font-family="monospace">&apos;click&apos;, (e) =&gt; { ... })</text>
    <text x="90" y="96" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="sans-serif">Wakes up upon trigger</text>
    <text x="90" y="112" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">Executes handler logic</text>
  </g>

  <!-- Flow 2 -->
  <path d="M 375 120 L 400 120" stroke="#10b981" stroke-width="2.5"/>
  <polygon points="400,116 408,120 400,124" fill="#10b981"/>

  <!-- 3. DOM Mutate -->
  <g transform="translate(415, 55)">
    <rect width="155" height="130" rx="8" fill="#020617" stroke="#10b981" stroke-width="1.8"/>
    <text x="77" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">3. UI State Update</text>
    <rect x="10" y="38" width="135" height="40" rx="4" fill="#065f46" fill-opacity="0.2" stroke="#059669"/>
    <text x="77" y="54" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle" font-family="monospace">score += 10;</text>
    <text x="77" y="68" fill="#34d399" font-size="8" text-anchor="middle" font-family="monospace">badge.textContent = ...</text>
    <text x="77" y="98" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="sans-serif">Screen updates</text>
    <text x="77" y="112" fill="#cbd5e1" font-size="9" text-anchor="middle" font-family="sans-serif">instantly for user</text>
  </g>
</svg>`;

// 5.3 unit-5-test
svgs['unit-5-test.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-u5t" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="600" height="220" rx="12" fill="url(#bg-u5t)" stroke="#334155" stroke-width="1.5"/>
  <text x="300" y="28" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Unit 5 Capstone: Interactive Trivia Game &amp; Score Tracker</text>

  <!-- Browser App Container -->
  <g transform="translate(60, 48)">
    <rect width="480" height="150" rx="8" fill="#020617" stroke="#38bdf8" stroke-width="1.8"/>

    <!-- App Header -->
    <rect width="480" height="30" rx="8" fill="#1e293b"/>
    <text x="20" y="20" fill="#38bdf8" font-size="11" font-weight="bold" font-family="sans-serif">🎯 Web Dev Trivia Masters</text>
    <text x="460" y="20" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="end" font-family="monospace">Score: &lt;span id="score"&gt;200&lt;/span&gt;</text>

    <!-- Question Box -->
    <rect x="20" y="42" width="440" height="32" rx="4" fill="#0f172a" stroke="#334155"/>
    <text x="35" y="62" fill="#f8fafc" font-size="10" font-family="sans-serif">Q: Which HTML tag defines the highest level heading?</text>

    <!-- Options Row -->
    <g transform="translate(20, 82)">
      <rect width="100" height="28" rx="4" fill="#1e293b" stroke="#334155"/>
      <text x="50" y="18" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="monospace">A) &lt;h6&gt;</text>
    </g>
    <g transform="translate(130, 82)">
      <rect width="100" height="28" rx="4" fill="#065f46" fill-opacity="0.3" stroke="#10b981"/>
      <text x="50" y="18" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle" font-family="monospace">B) &lt;h1&gt; &check;</text>
    </g>
    <g transform="translate(240, 82)">
      <rect width="100" height="28" rx="4" fill="#1e293b" stroke="#334155"/>
      <text x="50" y="18" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="monospace">C) &lt;head&gt;</text>
    </g>
    <g transform="translate(350, 82)">
      <rect width="110" height="28" rx="4" fill="#1e293b" stroke="#334155"/>
      <text x="55" y="18" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="monospace">D) &lt;header&gt;</text>
    </g>

    <!-- Feedback Banner -->
    <rect x="20" y="118" width="440" height="22" rx="4" fill="#0369a1" fill-opacity="0.2"/>
    <text x="240" y="133" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle" font-family="sans-serif">Feedback: Correct! &plus;100 Points &bull; Advancing to Next Question &rarr;</text>
  </g>
</svg>`;

// Write all SVGs
for (const [filename, content] of Object.entries(svgs)) {
  const filePath = path.join(svgDir, filename);
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('Wrote', filename);
}
console.log('Finished generating all 19 SVG diagrams!');
