// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

module.exports = {
  "id": "html5-structure",
  "title": "HTML5 - Structure & Semantic Markup",
  "lessons": [
    {
      "id": "html-tags",
      "title": "Anatomy of an HTML Tag",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/html-tags.svg",
        "caption": "Anatomy of an HTML element: opening tag, attribute, inner content, and closing tag."
      },
      "content": "## The LEGO Bricks of the Web\n\nImagine building a movie studio soundstage. You do not just throw cameras and costumes into an empty field — you need a structural blueprint. In web development, **HTML (HyperText Markup Language)** is that structural blueprint.\n\nEvery single webpage you have ever visited, from YouTube to Spotify, is built from interlocking components called **elements**. Think of elements like LEGO bricks. To create a brick, you wrap your content in an **opening tag** like ^<h1>^ and snap it shut with a **closing tag** like ^</h1>^. The forward slash ^/^ is the crucial signal that tells the browser: \"this brick ends here!\"\n\nInside the opening tag, you can also attach **attributes** — extra information or superpowers, like ^class=\"hero\"^ or ^id=\"main-stage\"^.\n\n~~~\n<h1 class=\"hero\">Avengers Assemble</h1>\n~~~\n\n- ^<h1 class=\"hero\">^ - The **opening tag**. It names the element (^h1^ for headline) and defines an **attribute** (^class=\"hero\"^).\n- ^Avengers Assemble^ - The **content**. The actual text or nested elements living inside the brick.\n- ^</h1>^ - The **closing tag**. The forward slash ^/^ cleanly finishes the element.\n\n## The HTML5 Page Skeleton\n\nEvery complete HTML5 document follows a sacred four-part skeleton:\n\n1. ^<!DOCTYPE html>^ - The modern HTML5 declaration telling the browser to render standard modern code.\n2. ^<html>...</html>^ - The root container wrapping every element on the entire page.\n3. ^<head>...</head>^ - The behind-the-scenes control room holding page metadata, like the browser tab ^<title>^.\n4. ^<body>...</body>^ - The main stage holding everything visible to the user: headlines, paragraphs, images, and buttons.\n\n~~~\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Marvel Studios Official</title>\n  </head>\n  <body>\n    <h1>Avengers Headquarters</h1>\n    <p>Earth's Mightiest Heroes assemble here.</p>\n  </body>\n</html>\n~~~\n\n## Predict & Observe\n\nWhat would happen if you forgot the closing tag ^</h1>^? The browser would treat every paragraph and button underneath as part of the giant headline, throwing the whole stage into chaos! Tags must always be paired or properly closed.\n\n## Your Task\n\nConstruct and print the complete HTML5 document blueprint for Marvel Studios' official headquarters using a JavaScript template string.\n\nYour output must match exactly:\n\n~~~\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Marvel Studios Official</title>\n  </head>\n  <body>\n    <h1>Avengers Headquarters</h1>\n    <p>Earth's Mightiest Heroes assemble here.</p>\n  </body>\n</html>\n~~~",
      "terms": [
        {
          "term": "HTML",
          "def": "HyperText Markup Language, the standard code for structuring web pages."
        },
        {
          "term": "element",
          "def": "A complete building block consisting of an opening tag, content, and a closing tag."
        },
        {
          "term": "tag",
          "def": "Keywords enclosed in angle brackets like ^<h1>^ that instruct browsers how to render content."
        },
        {
          "term": "attribute",
          "def": "Extra configuration added to an opening tag, written as ^name=\"value\"^."
        },
        {
          "term": "DOCTYPE",
          "def": "The declaration ^<!DOCTYPE html>^ telling browsers to interpret the page as modern HTML5."
        },
        {
          "term": "head",
          "def": "The container for page metadata and the browser tab title that is not directly shown on the page."
        },
        {
          "term": "body",
          "def": "The container for all visible content displayed to the user on the webpage."
        }
      ],
      "starter": "// Build the Marvel Studios HTML5 blueprint\nfunction buildStudioBlueprint() {\n  // Fill in the complete HTML5 document structure below\n  const html = `<!DOCTYPE html>\n<html>\n  <head>\n    <title>TODO</title>\n  </head>\n  <body>\n    <!-- Add h1 and p elements here -->\n  </body>\n</html>`;\n  return html;\n}\n\nconsole.log(buildStudioBlueprint());\n",
      "solution": "// Build the Marvel Studios HTML5 blueprint\nfunction buildStudioBlueprint() {\n  const html = `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Marvel Studios Official</title>\n  </head>\n  <body>\n    <h1>Avengers Headquarters</h1>\n    <p>Earth's Mightiest Heroes assemble here.</p>\n  </body>\n</html>`;\n  return html;\n}\n\nconsole.log(buildStudioBlueprint());\n",
      "hint": "Include <!DOCTYPE html>, <html>, <head> with <title>Marvel Studios Official</title>, and <body> with <h1>Avengers Headquarters</h1> and the paragraph.",
      "tests": [
        {
          "name": "Generates valid HTML5 studio blueprint",
          "expected": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Marvel Studios Official</title>\n  </head>\n  <body>\n    <h1>Avengers Headquarters</h1>\n    <p>Earth's Mightiest Heroes assemble here.</p>\n  </body>\n</html>"
        }
      ]
    },
    {
      "id": "headings-paragraphs",
      "title": "Headings & Paragraph Hierarchy",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/headings-paragraphs.svg",
        "caption": "Visual scale comparing h1 through h6 semantic headings, paragraphs, strong, and em."
      },
      "content": "## The Newspaper Headline vs Spotify Tracklist\n\nWhen you pick up a newspaper or browse a Taylor Swift album on Spotify, your eyes do not read every word at equal size. You see one massive, unmissable headline at the top, followed by subheadings, followed by readable paragraphs of lyrics or liner notes.\n\nHTML models this hierarchy using **semantic headings**:\n- ^<h1>^ - The single primary headline for the entire page (like the album title *1989 (Taylor's Version)*). A good webpage almost always has only one ^<h1>^!\n- ^<h2>^ - Major section titles (like \"Album Overview\" or \"Disc 1\").\n- ^<h3>^ through ^<h6>^ - Progressively smaller sub-headings for fine-grained sections.\n- ^<p>^ - Standard **paragraphs** for body copy, descriptions, and story text.\n\n~~~\n<h1>1989 (Taylor's Version)</h1>\n<h2>Album Overview</h2>\n<p>The definitive <strong>pop reinvention</strong> that defined a generation.</p>\n<h3>Track Spotlight</h3>\n<p>Featuring <em>Style</em> and <em>Blank Space</em> with brand new vault recordings.</p>\n~~~\n\n## Meaning Over Looks: Semantic Formatting\n\nDo not use bold or italics just to look pretty — use them to communicate true meaning:\n- ^<strong>^ - Signifies strong importance or seriousness. Screen readers will read this text with vocal gravity!\n- ^<em>^ - Signifies conversational stress or a shift in tone (emphasis), rendered in italics.\n\n## Predict & Observe\n\nWhat is the danger of skipping from ^<h1>^ directly to ^<h4>^? Search engines and screen reader software for blind users rely on heading levels to build an outline of the page. Skipping levels breaks the document outline, making your page confusing to navigate.\n\n## Your Task\n\nGenerate the semantic album review snippet for *1989 (Taylor's Version)* using proper ^<h1>^, ^<h2>^, ^<h3>^, ^<p>^, ^<strong>^, and ^<em>^ tags.\n\nExpected output:\n\n~~~\n<h1>1989 (Taylor's Version)</h1>\n<h2>Album Overview</h2>\n<p>The definitive <strong>pop reinvention</strong> that defined a generation.</p>\n<h3>Track Spotlight</h3>\n<p>Featuring <em>Style</em> and <em>Blank Space</em> with brand new vault recordings.</p>\n~~~",
      "terms": [
        {
          "term": "heading",
          "def": "Structural titles ranging from ^<h1>^ (most important) to ^<h6>^ (least important)."
        },
        {
          "term": "paragraph",
          "def": "The ^<p>^ tag used to group sentences into standard readable text blocks."
        },
        {
          "term": "semantic HTML",
          "def": "Choosing HTML tags based on what the content means rather than how it looks."
        },
        {
          "term": "strong",
          "def": "An element denoting strong importance or urgency; typically displayed in bold."
        },
        {
          "term": "em",
          "def": "An element denoting spoken emphasis that changes the meaning of a sentence; rendered in italics."
        }
      ],
      "starter": "// Generate semantic album review snippet\nfunction formatAlbumReview() {\n  // Fix the broken heading levels and add missing strong and em formatting\n  return `<h1>1989 (Taylor's Version)</h1>\n<h4>Album Overview</h4>\n<p>The definitive pop reinvention that defined a generation.</p>\n<h6>Track Spotlight</h6>\n<p>Featuring Style and Blank Space with brand new vault recordings.</p>`;\n}\n\nconsole.log(formatAlbumReview());\n",
      "solution": "// Generate semantic album review snippet\nfunction formatAlbumReview() {\n  return `<h1>1989 (Taylor's Version)</h1>\n<h2>Album Overview</h2>\n<p>The definitive <strong>pop reinvention</strong> that defined a generation.</p>\n<h3>Track Spotlight</h3>\n<p>Featuring <em>Style</em> and <em>Blank Space</em> with brand new vault recordings.</p>`;\n}\n\nconsole.log(formatAlbumReview());\n",
      "hint": "Use <h2> for Album Overview, <h3> for Track Spotlight, <strong> around pop reinvention, and <em> around Style and Blank Space.",
      "tests": [
        {
          "name": "Outputs semantic album review with proper hierarchy",
          "expected": "<h1>1989 (Taylor's Version)</h1>\n<h2>Album Overview</h2>\n<p>The definitive <strong>pop reinvention</strong> that defined a generation.</p>\n<h3>Track Spotlight</h3>\n<p>Featuring <em>Style</em> and <em>Blank Space</em> with brand new vault recordings.</p>"
        }
      ]
    },
    {
      "id": "links-images",
      "title": "Hyperlinks & Accessible Images",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/links-images.svg",
        "caption": "Anchor links with href teleporting users, and img elements with src and accessible alt text."
      },
      "content": "## The Multiverse Portals of the Internet\n\nWithout links, the web would be a bunch of isolated islands. The **anchor tag** ^<a>^ is the multiverse portal of the Internet: click on it, and it teleports the browser to an entirely new address across the globe!\n\nThe destination URL is passed in the **^href^** attribute (short for Hypertext REFerence):\n\n~~~\n<a href=\"https://dailybugle.com\">Visit Daily Bugle</a>\n~~~\n\n## Embedding Visuals with Accessible Images\n\nTo show images, we use the **^<img>^** element. Notice something unique: ^<img>^ is a **void element** (it has no closing tag like ^</img>^). Instead, it carries two essential attributes:\n1. **^src^** (Source): The URL or file path to the image asset.\n2. **^alt^** (Alternative text): A concise, descriptive plain-English explanation of what the image shows.\n\n~~~\n<img src=\"https://dailybugle.com/spidey.jpg\" alt=\"Spider-Man swinging between Manhattan skyscrapers\" />\n~~~\n\n## Why Alt Text Matters\n\nAlt text is not optional. If the user is visually impaired and using a screen reader, the software reads your ^alt^ text aloud. If the user has a slow mobile connection and the image fails to download, the browser renders the ^alt^ text in its place. Great developers always write clear, descriptive alt text!\n\n## Your Task\n\nConstruct an article card for a Daily Bugle scoop on Spider-Man. The card must wrap in an ^<article>^ container, featuring an ^<h2>^ headline, an accessible ^<img>^, a descriptive ^<p>^, and an ^<a>^ hyperlink.\n\nExpected output:\n\n~~~\n<article>\n  <h2>Spider-Man Spotted Over Queens!</h2>\n  <img src=\"https://dailybugle.com/spidey.jpg\" alt=\"Spider-Man swinging between Manhattan skyscrapers\" />\n  <p>Peter Parker captured exclusive photos of the web-slinger in action.</p>\n  <a href=\"https://dailybugle.com/full-story\">Read full Daily Bugle scoop</a>\n</article>\n~~~",
      "terms": [
        {
          "term": "anchor tag",
          "def": "The ^<a>^ tag used to create clickable hyperlinks."
        },
        {
          "term": "href",
          "def": "Hypertext REFerence; the destination URL attribute for a link."
        },
        {
          "term": "img tag",
          "def": "A void tag used to embed visual graphics on a page."
        },
        {
          "term": "src",
          "def": "Source; the file path or web URL of the image."
        },
        {
          "term": "alt text",
          "def": "Descriptive alternative text for screen readers and failed image loads."
        },
        {
          "term": "void element",
          "def": "An HTML tag that cannot hold child content and has no closing tag (like ^<img>^)."
        }
      ],
      "starter": "// Generate Spider-Man Daily Bugle article card\nfunction createDailyBugleArticle() {\n  // Fix the missing alt text, incorrect attributes, and broken anchor tag\n  return `<article>\n  <h2>Spider-Man Spotted Over Queens!</h2>\n  <img src=\"https://dailybugle.com/spidey.jpg\" />\n  <p>Peter Parker captured exclusive photos of the web-slinger in action.</p>\n  <a url=\"https://dailybugle.com/full-story\">Read full Daily Bugle scoop</a>\n</article>`;\n}\n\nconsole.log(createDailyBugleArticle());\n",
      "solution": "// Generate Spider-Man Daily Bugle article card\nfunction createDailyBugleArticle() {\n  return `<article>\n  <h2>Spider-Man Spotted Over Queens!</h2>\n  <img src=\"https://dailybugle.com/spidey.jpg\" alt=\"Spider-Man swinging between Manhattan skyscrapers\" />\n  <p>Peter Parker captured exclusive photos of the web-slinger in action.</p>\n  <a href=\"https://dailybugle.com/full-story\">Read full Daily Bugle scoop</a>\n</article>`;\n}\n\nconsole.log(createDailyBugleArticle());\n",
      "hint": "Add alt=\"Spider-Man swinging between Manhattan skyscrapers\" to the img tag, and change url= to href= on the anchor tag.",
      "tests": [
        {
          "name": "Outputs article card with accessible image and link",
          "expected": "<article>\n  <h2>Spider-Man Spotted Over Queens!</h2>\n  <img src=\"https://dailybugle.com/spidey.jpg\" alt=\"Spider-Man swinging between Manhattan skyscrapers\" />\n  <p>Peter Parker captured exclusive photos of the web-slinger in action.</p>\n  <a href=\"https://dailybugle.com/full-story\">Read full Daily Bugle scoop</a>\n</article>"
        }
      ]
    },
    {
      "id": "unit-1-test",
      "title": "Unit 1 Test: Fan Club Profile Page",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": true,
      "image": {
        "url": "/diagrams/web/unit-1-test.svg",
        "caption": "Full fan club profile layout: DOCTYPE, head title, semantic headings, strong/em text, image, and unordered list."
      },
      "content": "## Unit 1 Capstone Challenge: Fan Club Profile Page\n\nCongratulations on reaching the end of Unit 1! You have learned the grammar of HTML: tags, attributes, document scaffolding, semantic hierarchies, images, and links.\n\nNow put it all together to build the official portal for the **Avengers Fan Club**.\n\n## Specifications\n\nYour function must generate a complete, valid HTML5 document containing:\n\n1. Modern ^<!DOCTYPE html>^ declaration.\n2. Root ^<html>^ with child ^<head>^ and ^<body>^.\n3. Inside ^<head>^: a ^<title>^ containing ^Avengers Official Fan Club^.\n4. Inside ^<body>^:\n   - An ^<h1>^ containing ^Avengers Fan Club^\n   - A ^<p>^ containing ^Welcome to the <strong>official headquarters</strong> for Earth's mightiest supporters, founded in <em>New York City</em>.^\n   - An ^<h2>^ containing ^Featured Roster^\n   - An unordered list ^<ul>^ containing three list items (^<li>^):\n     - ^Iron Man - Genius Inventor^\n     - ^Captain America - First Avenger^\n     - ^Thor - God of Thunder^\n   - An accessible ^<img>^ with ^src=\"/images/avengers-badge.png\"^ and ^alt=\"Avengers golden crest shield emblem\"^\n   - An anchor ^<a>^ with ^href=\"https://avengers.org/join\"^ and text ^Join the Initiative Today^\n\nExpected output:\n\n~~~\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Avengers Official Fan Club</title>\n  </head>\n  <body>\n    <h1>Avengers Fan Club</h1>\n    <p>Welcome to the <strong>official headquarters</strong> for Earth's mightiest supporters, founded in <em>New York City</em>.</p>\n    <h2>Featured Roster</h2>\n    <ul>\n      <li>Iron Man - Genius Inventor</li>\n      <li>Captain America - First Avenger</li>\n      <li>Thor - God of Thunder</li>\n    </ul>\n    <img src=\"/images/avengers-badge.png\" alt=\"Avengers golden crest shield emblem\" />\n    <a href=\"https://avengers.org/join\">Join the Initiative Today</a>\n  </body>\n</html>\n~~~",
      "terms": [
        {
          "term": "unit test",
          "def": "A cumulative coding challenge assessing all core skills covered in a unit."
        },
        {
          "term": "unordered list",
          "def": "The ^<ul>^ tag used to create bulleted collections of list items."
        },
        {
          "term": "list item",
          "def": "The ^<li>^ tag representing an individual item inside a ^<ul>^ or ^<ol>^ list."
        }
      ],
      "starter": "// Unit 1 Test: Avengers Fan Club Profile Page\nfunction generateFanClubPage() {\n  // Replace this placeholder with the full HTML5 page markup\n  return `<div>Work in progress...</div>`;\n}\n\nconsole.log(generateFanClubPage());\n",
      "solution": "// Unit 1 Test: Avengers Fan Club Profile Page\nfunction generateFanClubPage() {\n  return `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Avengers Official Fan Club</title>\n  </head>\n  <body>\n    <h1>Avengers Fan Club</h1>\n    <p>Welcome to the <strong>official headquarters</strong> for Earth's mightiest supporters, founded in <em>New York City</em>.</p>\n    <h2>Featured Roster</h2>\n    <ul>\n      <li>Iron Man - Genius Inventor</li>\n      <li>Captain America - First Avenger</li>\n      <li>Thor - God of Thunder</li>\n    </ul>\n    <img src=\"/images/avengers-badge.png\" alt=\"Avengers golden crest shield emblem\" />\n    <a href=\"https://avengers.org/join\">Join the Initiative Today</a>\n  </body>\n</html>`;\n}\n\nconsole.log(generateFanClubPage());\n",
      "hint": "Include <!DOCTYPE html>, <html>, <head> with <title>, <body> with <h1>, <p> using <strong> and <em>, <h2>, <ul> with 3 <li> items, <img> with src and alt, and <a> with href.",
      "tests": [
        {
          "name": "Generates full Avengers fan club profile page",
          "expected": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Avengers Official Fan Club</title>\n  </head>\n  <body>\n    <h1>Avengers Fan Club</h1>\n    <p>Welcome to the <strong>official headquarters</strong> for Earth's mightiest supporters, founded in <em>New York City</em>.</p>\n    <h2>Featured Roster</h2>\n    <ul>\n      <li>Iron Man - Genius Inventor</li>\n      <li>Captain America - First Avenger</li>\n      <li>Thor - God of Thunder</li>\n    </ul>\n    <img src=\"/images/avengers-badge.png\" alt=\"Avengers golden crest shield emblem\" />\n    <a href=\"https://avengers.org/join\">Join the Initiative Today</a>\n  </body>\n</html>"
        }
      ]
    }
  ]
};
