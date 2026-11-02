// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

module.exports = {
  "id": "css3-styling",
  "title": "CSS3 - Styling, Colors & The Box Model",
  "lessons": [
    {
      "id": "css-selectors",
      "title": "CSS Selectors & Colors",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/css-selectors.svg",
        "caption": "Targeting styles using element selectors, class selectors (.), and ID selectors (#)."
      },
      "content": "## The Wardrobe Stylist of the Web\n\nIf HTML is the plain mannequin standing in a storefront window, **CSS (Cascading Style Sheets)** is the superstar stylist who dresses it in neon sunglasses, leather jackets, and custom kicks.\n\nA CSS rule has two main pieces:\n1. **Selector**: Declares *which* HTML elements to dress.\n2. **Declaration Block**: Sits inside curly braces ^{ ... }^ and lists property-value pairs ending with semicolons.\n\n~~~\nselector {\n  property: value;\n}\n~~~\n\n## The Three Core Selectors\n\n1. **Element Selector** (e.g. ^body^ or ^p^): Targets every single element of that tag name across the whole document.\n2. **Class Selector** (prefixed with a period ^.^, e.g. ^.stage-light^): Targets any element decorated with that class. You can apply the same class to dozens of items!\n3. **ID Selector** (prefixed with a hashtag ^#^, e.g. ^#dj-booth^): Targets one unique element with that exact ID.\n\n## Expressing Color: Hex Codes & Fonts\n\nComputers mix light from Red, Green, and Blue. Hexadecimal color codes like ^#0b0c10^ and ^#66fcf1^ allow you to choose from over 16 million vivid shades.\n\n~~~\nbody {\n  background-color: #0b0c10;\n  color: #c5c6c7;\n  font-family: sans-serif;\n}\n.stage-light {\n  color: #66fcf1;\n  font-size: 20px;\n}\n#dj-booth {\n  background-color: #1f2833;\n  color: #45a29e;\n}\n~~~\n\n## Predict & Observe\n\nWhat happens if an element matches both a class selector and an ID selector? The ID selector has higher **specificity**, meaning its styles win in any direct conflict!\n\n## Your Task\n\nConstruct and log the CSS rules for a Cyberpunk DJ Stage stylesheet containing rules for ^body^, ^.stage-light^, and ^#dj-booth^.\n\nExpected output:\n\n~~~\nbody {\n  background-color: #0b0c10;\n  color: #c5c6c7;\n  font-family: sans-serif;\n}\n.stage-light {\n  color: #66fcf1;\n  font-size: 20px;\n}\n#dj-booth {\n  background-color: #1f2833;\n  color: #45a29e;\n}\n~~~",
      "terms": [
        {
          "term": "CSS",
          "def": "Cascading Style Sheets, used to style the visual presentation and layout of HTML."
        },
        {
          "term": "selector",
          "def": "The pattern in a CSS rule pointing to which HTML elements should receive styling."
        },
        {
          "term": "class selector",
          "def": "A selector starting with a period (.) that styles all elements bearing that class attribute."
        },
        {
          "term": "id selector",
          "def": "A selector starting with a hash (#) that targets one single element with that unique ID."
        },
        {
          "term": "hex color",
          "def": "A 6-character hexadecimal color notation representing RGB channels (e.g. #66fcf1)."
        },
        {
          "term": "property",
          "def": "A specific visual attribute being styled, such as color, font-size, or background-color."
        }
      ],
      "starter": "// Build Cyberpunk DJ Stage CSS Stylesheet\nfunction generateStageStyles() {\n  // Fix the missing periods, hashtags, and CSS properties\n  return `body {\n  background-color: #0b0c10;\n  color: #c5c6c7;\n  font-family: sans-serif;\n}\nstage-light {\n  color: #66fcf1;\n  font-size: 20px;\n}\ndj-booth {\n  background-color: #1f2833;\n  color: #45a29e;\n}`;\n}\n\nconsole.log(generateStageStyles());\n",
      "solution": "// Build Cyberpunk DJ Stage CSS Stylesheet\nfunction generateStageStyles() {\n  return `body {\n  background-color: #0b0c10;\n  color: #c5c6c7;\n  font-family: sans-serif;\n}\n.stage-light {\n  color: #66fcf1;\n  font-size: 20px;\n}\n#dj-booth {\n  background-color: #1f2833;\n  color: #45a29e;\n}`;\n}\n\nconsole.log(generateStageStyles());\n",
      "hint": "Remember that class selectors must begin with a dot (.) and ID selectors must begin with a hash (#).",
      "tests": [
        {
          "name": "Generates valid CSS stylesheet with element, class, and ID rules",
          "expected": "body {\n  background-color: #0b0c10;\n  color: #c5c6c7;\n  font-family: sans-serif;\n}\n.stage-light {\n  color: #66fcf1;\n  font-size: 20px;\n}\n#dj-booth {\n  background-color: #1f2833;\n  color: #45a29e;\n}"
        }
      ]
    },
    {
      "id": "box-model",
      "title": "The CSS Box Model",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/box-model.svg",
        "caption": "The 4 concentric layers: content, padding, border, and margin."
      },
      "content": "## The Cardboard Delivery & Picture Frame Analogy\n\nHere is the secret of the web: to a browser, every single element on the screen is a rectangular cardboard package. This fundamental concept is known as the **CSS Box Model**.\n\nA box consists of 4 concentric layers, working from the inside out:\n\n1. **Content**: The inner treasure (text, icon, or image). Defined by ^width^ and ^height^.\n2. **Padding**: The protective bubble wrap inside the box between the content and the cardboard shell.\n3. **Border**: The cardboard shell or picture frame itself. Defined by thickness, style, and color (^2px solid #f59e0b^).\n4. **Margin**: The personal bubble space outside the box keeping neighbor boxes from bumping into it.\n\n## Calculating Real Dimensions\n\nWhen calculating how much horizontal space a box occupies on a shelf:\nTotal Width = ^width + (left/right padding) + (left/right border) + (left/right margin)^\n\nFor example, a vinyl sleeve with:\n- Content width = 300px\n- Padding = 20px on both sides (40px total)\n- Border = 5px on both sides (10px total)\n- Margin = 15px on both sides (30px total)\nTotal space occupied = 300 + 40 + 10 + 30 = **380px**!\n\nSetting ^box-sizing: border-box;^ is best practice in modern web development because it locks the total width to include padding and border automatically.\n\n## Your Task\n\nWrite a script that computes the total occupied width for a vinyl album sleeve and prints the calculated width followed by the CSS rule block for ^.vinyl-sleeve^.\n\nExpected output:\n\n~~~\nTotal Occupied Width: 380px\n.vinyl-sleeve {\n  box-sizing: border-box;\n  width: 300px;\n  padding: 20px;\n  border: 5px solid #f59e0b;\n  margin: 15px;\n}\n~~~",
      "terms": [
        {
          "term": "box model",
          "def": "The core CSS layout model where elements are rendered as boxes with content, padding, border, and margin."
        },
        {
          "term": "content",
          "def": "The innermost area where text, images, or child elements appear."
        },
        {
          "term": "padding",
          "def": "The inner clear space between the content and the element border."
        },
        {
          "term": "border",
          "def": "The outer edge or frame wrapping around padding and content."
        },
        {
          "term": "margin",
          "def": "The outer buffer space separating the element from neighboring elements."
        },
        {
          "term": "box-sizing",
          "def": "A CSS property controlling whether width and height include padding and borders (^border-box^)."
        }
      ],
      "starter": "// Box Model Calculator for Vinyl Album Sleeve\nfunction buildBoxModel() {\n  const contentWidth = 300;\n  const padding = 20;\n  const border = 5;\n  const margin = 15;\n\n  // Compute total occupied horizontal width: content + padding*2 + border*2 + margin*2\n  const totalOccupiedWidth = 0; // Fix this formula!\n\n  const css = `.vinyl-sleeve {\n  box-sizing: border-box;\n  width: ${contentWidth}px;\n  padding: ${padding}px;\n  border: ${border}px solid #f59e0b;\n  margin: ${margin}px;\n}`;\n\n  return `Total Occupied Width: ${totalOccupiedWidth}px\\n${css}`;\n}\n\nconsole.log(buildBoxModel());\n",
      "solution": "// Box Model Calculator for Vinyl Album Sleeve\nfunction buildBoxModel() {\n  const contentWidth = 300;\n  const padding = 20;\n  const border = 5;\n  const margin = 15;\n\n  const totalOccupiedWidth = contentWidth + (padding * 2) + (border * 2) + (margin * 2);\n\n  const css = `.vinyl-sleeve {\n  box-sizing: border-box;\n  width: ${contentWidth}px;\n  padding: ${padding}px;\n  border: ${border}px solid #f59e0b;\n  margin: ${margin}px;\n}`;\n\n  return `Total Occupied Width: ${totalOccupiedWidth}px\\n${css}`;\n}\n\nconsole.log(buildBoxModel());\n",
      "hint": "Total width = contentWidth + (padding * 2) + (border * 2) + (margin * 2).",
      "tests": [
        {
          "name": "Calculates total occupied width and outputs box model CSS",
          "expected": "Total Occupied Width: 380px\n.vinyl-sleeve {\n  box-sizing: border-box;\n  width: 300px;\n  padding: 20px;\n  border: 5px solid #f59e0b;\n  margin: 15px;\n}"
        }
      ]
    },
    {
      "id": "flexbox-basics",
      "title": "Flexbox Layout Basics",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/flexbox-basics.svg",
        "caption": "Flexbox axes: Main axis (justify-content) and Cross axis (align-items)."
      },
      "content": "## The Netflix Carousel & Superhero Lineup\n\nIn the early days of the web, arranging boxes side-by-side required tricky math and brittle hacks. Then came **Flexbox (Flexible Box Layout)** — the greatest layout superpower in CSS history.\n\nFlexbox turns any container into a smart magnetic director. You declare ^display: flex;^ on the parent container, and all child items instantly snap into a responsive row!\n\n## The Two Axes: Main Axis vs Cross Axis\n\nFlexbox operates along two perpendicular axes:\n\n1. **Main Axis** (Horizontal by default when ^flex-direction: row^):\n   Controlled by **^justify-content^**:\n   - ^flex-start^: Items pack to the left\n   - ^center^: Items center together\n   - ^space-between^: First item at the start, last at the end, equal space in between!\n2. **Cross Axis** (Vertical by default):\n   Controlled by **^align-items^**:\n   - ^center^: Centers items vertically\n   - ^stretch^: Stretches items to fill the container height\n\n~~~\n.movie-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n~~~\n\nThe **^gap^** property provides effortless gutter spacing between items without needing messy margins.\n\n## Your Task\n\nConstruct and print the CSS rules for a Netflix-style movie carousel:\n- ^.movie-row^: flex container arranged in a row, spaced evenly with ^space-between^, aligned centrally with ^center^, and a ^16px^ gap.\n- ^.movie-card^: nested flex container arranged as a column, centering both horizontally and vertically.\n\nExpected output:\n\n~~~\n.movie-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n.movie-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n~~~",
      "terms": [
        {
          "term": "Flexbox",
          "def": "A 1-dimensional CSS layout model designed to distribute space and align items within a container."
        },
        {
          "term": "flex container",
          "def": "The parent element that has ^display: flex^ enabled."
        },
        {
          "term": "flex item",
          "def": "Any direct child element living inside a flex container."
        },
        {
          "term": "main axis",
          "def": "The primary axis along which flex items are positioned (horizontal by default)."
        },
        {
          "term": "cross axis",
          "def": "The axis perpendicular to the main axis (vertical by default)."
        },
        {
          "term": "justify-content",
          "def": "A Flexbox property aligning items along the main axis."
        },
        {
          "term": "align-items",
          "def": "A Flexbox property aligning items along the cross axis."
        }
      ],
      "starter": "// Build Flexbox movie carousel rules\nfunction generateFlexLayout() {\n  // Fix the missing flex properties and alignments below\n  return `.movie-row {\n  display: block;\n  flex-direction: row;\n  gap: 16px;\n}\n.movie-card {\n  display: block;\n}`;\n}\n\nconsole.log(generateFlexLayout());\n",
      "solution": "// Build Flexbox movie carousel rules\nfunction generateFlexLayout() {\n  return `.movie-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n.movie-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}`;\n}\n\nconsole.log(generateFlexLayout());\n",
      "hint": "Set display: flex on both rules, justify-content: space-between and align-items: center on .movie-row, and flex-direction: column on .movie-card.",
      "tests": [
        {
          "name": "Outputs valid Flexbox carousel and card rules",
          "expected": ".movie-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n.movie-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}"
        }
      ]
    },
    {
      "id": "unit-2-test",
      "title": "Unit 2 Test: Neon Cyberpunk Album Card",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": true,
      "image": {
        "url": "/diagrams/web/unit-2-test.svg",
        "caption": "Neon Cyberpunk Album Card component styling specifications."
      },
      "content": "## Unit 2 Capstone Challenge: Neon Cyberpunk Album Card\n\nWelcome to the Unit 2 Capstone Assessment! You have mastered CSS selectors, hex color palettes, the 4 layers of the box model, and modern Flexbox layouts.\n\nNow apply your knowledge to style a retro-futuristic synthwave album card component.\n\n## Specifications\n\nGenerate the complete CSS stylesheet defining three rules:\n\n1. **^.album-card^**:\n   - ^box-sizing: border-box;^\n   - ^width: 320px;^\n   - ^padding: 24px;^\n   - ^margin: 20px auto;^\n   - ^background-color: #0d1117;^\n   - ^border: 2px solid #00ffcc;^\n   - ^border-radius: 12px;^\n   - ^display: flex;^\n   - ^flex-direction: column;^\n   - ^align-items: center;^\n   - ^gap: 12px;^\n\n2. **^.album-card:hover^** (the hover pseudo-class):\n   - ^border-color: #ff007f;^\n   - ^box-shadow: 0 0 20px #ff007f;^\n   - ^transform: translateY(-4px);^\n\n3. **^.track-row^**:\n   - ^width: 100%;^\n   - ^display: flex;^\n   - ^justify-content: space-between;^\n   - ^align-items: center;^\n   - ^color: #e6edf3;^\n\nExpected output:\n\n~~~\n.album-card {\n  box-sizing: border-box;\n  width: 320px;\n  padding: 24px;\n  margin: 20px auto;\n  background-color: #0d1117;\n  border: 2px solid #00ffcc;\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n.album-card:hover {\n  border-color: #ff007f;\n  box-shadow: 0 0 20px #ff007f;\n  transform: translateY(-4px);\n}\n.track-row {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  color: #e6edf3;\n}\n~~~",
      "terms": [
        {
          "term": "pseudo-class",
          "def": "A keyword added to a selector specifying a special interaction state, such as ^:hover^."
        },
        {
          "term": "box-shadow",
          "def": "A CSS property adding drop-shadow or glowing light effects around an element frame."
        },
        {
          "term": "border-radius",
          "def": "A CSS property that curves the outer corners of an element border."
        },
        {
          "term": "transform",
          "def": "A CSS property enabling 2D/3D transformations like moving (^translateY^), rotating, or scaling."
        }
      ],
      "starter": "// Unit 2 Test: Neon Cyberpunk Album Card Stylesheet\nfunction generateAlbumCardStyles() {\n  // Replace this stub with the full CSS specification\n  return `/* TODO: Complete album card styles */`;\n}\n\nconsole.log(generateAlbumCardStyles());\n",
      "solution": "// Unit 2 Test: Neon Cyberpunk Album Card Stylesheet\nfunction generateAlbumCardStyles() {\n  return `.album-card {\n  box-sizing: border-box;\n  width: 320px;\n  padding: 24px;\n  margin: 20px auto;\n  background-color: #0d1117;\n  border: 2px solid #00ffcc;\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n.album-card:hover {\n  border-color: #ff007f;\n  box-shadow: 0 0 20px #ff007f;\n  transform: translateY(-4px);\n}\n.track-row {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  color: #e6edf3;\n}`;\n}\n\nconsole.log(generateAlbumCardStyles());\n",
      "hint": "Include .album-card with box-sizing, width, padding, margin, background, border, border-radius, flex layout, gap; .album-card:hover with glow effect; and .track-row with flex layout.",
      "tests": [
        {
          "name": "Outputs complete neon album card stylesheet",
          "expected": ".album-card {\n  box-sizing: border-box;\n  width: 320px;\n  padding: 24px;\n  margin: 20px auto;\n  background-color: #0d1117;\n  border: 2px solid #00ffcc;\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n.album-card:hover {\n  border-color: #ff007f;\n  box-shadow: 0 0 20px #ff007f;\n  transform: translateY(-4px);\n}\n.track-row {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  color: #e6edf3;\n}"
        }
      ]
    }
  ]
};
