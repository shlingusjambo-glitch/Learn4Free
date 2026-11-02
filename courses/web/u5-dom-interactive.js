// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

module.exports = {
  "id": "dom-interactive",
  "title": "DOM & Interactive Web Apps (Capstone)",
  "lessons": [
    {
      "id": "dom-selection",
      "title": "DOM Selection & Text Manipulation",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/dom-selection.svg",
        "caption": "The Document Object Model tree hierarchy: selecting nodes and updating textContent."
      },
      "content": "## The Puppeteer's Strings & The Family Tree\n\nWhen a web browser loads your HTML file, it does not just treat it as static text. It converts every single tag, attribute, and sentence into an interactive living tree of JavaScript objects called the **DOM (Document Object Model)**.\n\nThink of JavaScript as the master puppeteer: HTML creates the wooden puppet, and the DOM gives JavaScript the strings to manipulate it in real time!\n\n## Selecting Elements in the Tree\n\nTo change an element, you first have to find it in the tree:\n1. **^document.getElementById('id')^**: Fast and direct. Finds the one element carrying that unique ^id^.\n2. **^document.querySelector('selector')^**: Extremely versatile. Accepts any valid CSS selector (^#id^, ^.class^, or ^tag^).\n\n## Mutating State: textContent & classList\n\nOnce you hold a reference to an element object, you can modify its live state:\n- **^element.textContent^**: Reads or overwrites the text inside the element without reloading the page.\n- **^element.classList.add('new-class')^**: Dynamically applies a CSS styling class!\n\n~~~\nconst heading = document.getElementById('hero-title');\nheading.textContent = 'Welcome to the Multiverse';\nheading.classList.add('highlighted');\n~~~\n\n## Predict & Observe\n\nWhat is the difference between ^textContent^ and ^innerHTML^? ^textContent^ inserts plain text safely, protecting your users against malicious code injection (XSS attacks). In contrast, ^innerHTML^ parses raw HTML strings. Modern developers prefer ^textContent^ whenever updating text!\n\n## Your Task\n\nUsing the simulated web page DOM provided in the editor:\n1. Select the headline using ^document.getElementById('hero-title')^.\n2. Select the mission paragraph using ^document.querySelector('.mission-text')^.\n3. Select the badge using ^document.getElementById('status-badge')^.\n4. Update ^title.textContent = 'Welcome to the Multiverse'^.\n5. Update ^mission.textContent = 'Protect the timeline from temporal anomalies.'^.\n6. Update ^badge.textContent = 'STATUS: ACTIVE'^ and call ^badge.classList.add('badge-online')^.\n7. Print the three lines shown below using ^console.log^.\n\nExpected output:\n\n~~~\nTitle: Welcome to the Multiverse\nMission: Protect the timeline from temporal anomalies.\nBadge: STATUS: ACTIVE [badge-online]\n~~~",
      "terms": [
        {
          "term": "DOM",
          "def": "Document Object Model; the browser's in-memory object tree representing the loaded HTML page."
        },
        {
          "term": "document",
          "def": "The root JavaScript object representing the webpage and entry point for all DOM operations."
        },
        {
          "term": "getElementById",
          "def": "A DOM method that locates an element matching a specific ^id^ attribute."
        },
        {
          "term": "querySelector",
          "def": "A flexible DOM method that returns the first element matching any CSS selector string."
        },
        {
          "term": "textContent",
          "def": "A property used to safely read or replace the text inside an element."
        },
        {
          "term": "classList",
          "def": "An object property providing methods like ^.add()^ and ^.remove()^ to manipulate an element’s CSS classes."
        }
      ],
      "starter": "// --- Simulated DOM Environment ---\nclass MockElement {\n  constructor(id = '', className = '', textContent = '') {\n    this.id = id;\n    this.className = className;\n    this.textContent = textContent;\n    this.classList = {\n      add: (cls) => {\n        const set = new Set(this.className ? this.className.split(' ') : []);\n        set.add(cls);\n        this.className = Array.from(set).join(' ');\n      }\n    };\n  }\n}\n\nconst document = {\n  elements: [\n    new MockElement('hero-title', 'title-main', 'Draft Headline'),\n    new MockElement('mission-desc', 'mission-text', 'Draft mission description'),\n    new MockElement('status-badge', '', 'STATUS: PENDING')\n  ],\n  getElementById(id) {\n    return this.elements.find(el => el.id === id) || null;\n  },\n  querySelector(selector) {\n    if (selector.startsWith('#')) return this.getElementById(selector.slice(1));\n    if (selector.startsWith('.')) {\n      const cls = selector.slice(1);\n      return this.elements.find(el => el.className.split(' ').includes(cls)) || null;\n    }\n    return null;\n  }\n};\n// ----------------------------------\n\nfunction updateWebPageDOM() {\n  // TODO: Select hero-title, .mission-text, and status-badge\n  // Update their textContent and add class 'badge-online' to the badge\n\n  const title = null;\n  const mission = null;\n  const badge = null;\n\n  console.log(`Title: ${title ? title.textContent : ''}`);\n  console.log(`Mission: ${mission ? mission.textContent : ''}`);\n  console.log(`Badge: ${badge ? badge.textContent : ''} [${badge ? badge.className : ''}]`);\n}\n\nupdateWebPageDOM();\n",
      "solution": "// --- Simulated DOM Environment ---\nclass MockElement {\n  constructor(id = '', className = '', textContent = '') {\n    this.id = id;\n    this.className = className;\n    this.textContent = textContent;\n    this.classList = {\n      add: (cls) => {\n        const set = new Set(this.className ? this.className.split(' ') : []);\n        set.add(cls);\n        this.className = Array.from(set).join(' ');\n      }\n    };\n  }\n}\n\nconst document = {\n  elements: [\n    new MockElement('hero-title', 'title-main', 'Draft Headline'),\n    new MockElement('mission-desc', 'mission-text', 'Draft mission description'),\n    new MockElement('status-badge', '', 'STATUS: PENDING')\n  ],\n  getElementById(id) {\n    return this.elements.find(el => el.id === id) || null;\n  },\n  querySelector(selector) {\n    if (selector.startsWith('#')) return this.getElementById(selector.slice(1));\n    if (selector.startsWith('.')) {\n      const cls = selector.slice(1);\n      return this.elements.find(el => el.className.split(' ').includes(cls)) || null;\n    }\n    return null;\n  }\n};\n// ----------------------------------\n\nfunction updateWebPageDOM() {\n  const title = document.getElementById('hero-title');\n  const mission = document.querySelector('.mission-text');\n  const badge = document.getElementById('status-badge');\n\n  title.textContent = 'Welcome to the Multiverse';\n  mission.textContent = 'Protect the timeline from temporal anomalies.';\n  badge.textContent = 'STATUS: ACTIVE';\n  badge.classList.add('badge-online');\n\n  console.log(`Title: ${title.textContent}`);\n  console.log(`Mission: ${mission.textContent}`);\n  console.log(`Badge: ${badge.textContent} [${badge.className}]`);\n}\n\nupdateWebPageDOM();\n",
      "hint": "Use document.getElementById(\"hero-title\"), document.querySelector(\".mission-text\"), and document.getElementById(\"status-badge\"), then update textContent and call badge.classList.add(\"badge-online\").",
      "tests": [
        {
          "name": "Locates DOM elements and updates text and class states",
          "expected": "Title: Welcome to the Multiverse\nMission: Protect the timeline from temporal anomalies.\nBadge: STATUS: ACTIVE [badge-online]"
        }
      ]
    },
    {
      "id": "event-listeners",
      "title": "Event Listeners & User Interactivity",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/event-listeners.svg",
        "caption": "Event loop tripwire: Listening for user clicks, executing callbacks, and updating UI state."
      },
      "content": "## The Security Tripwire & Sensor\n\nA web page with HTML and CSS is like a printed poster. To transform it into a responsive app, you need **event listeners**.\n\nThink of an event listener like an infrared security beam or doorbell sensor. You tell the browser: *\"Keep your eyes glued to this button. The moment a user clicks on it, wake me up immediately and run this callback function!\"*\n\n## Registering Click Events\n\nYou wire up an interaction using **^addEventListener()^**:\n\n~~~\nbutton.addEventListener('click', () => {\n  upvotes++;\n  badge.textContent = `${upvotes} upvotes`;\n});\n~~~\n\nThe two key arguments are:\n1. The **event name**: ^'click'^ (or ^'keydown'^, ^'submit'^, ^'input'^).\n2. The **callback function**: The code that runs when the event fires.\n\n## State Drives the UI\n\nInteractive development follows a clean mental cycle:\n1. Store your data in **state variables** (e.g. ^let upvotes = 0^).\n2. When the user interacts, update the state variable.\n3. Update the DOM elements to reflect the new state to the user.\n\n## Your Task\n\nUsing the interactive button environment provided in the editor:\n1. Declare state variables: ^let upvotes = 0;^ and ^let isDarkMode = false;^.\n2. Select ^voteBtn = document.getElementById('upvote-btn')^ and ^countBadge = document.getElementById('vote-count')^.\n3. Select ^themeBtn = document.getElementById('theme-toggle')^.\n4. Add a ^'click'^ listener to ^voteBtn^ that:\n   - Increments ^upvotes += 1^\n   - Sets ^countBadge.textContent = `${upvotes} upvotes`^\n   - Logs: ^[Event] Upvote clicked! Total: ${countBadge.textContent}^\n5. Add a ^'click'^ listener to ^themeBtn^ that:\n   - Toggles ^isDarkMode = !isDarkMode^\n   - Logs: ^[Event] Theme toggled! Dark mode: ${isDarkMode}^\n6. Trigger the sequence of user clicks:\n   - ^voteBtn.click()^\n   - ^voteBtn.click()^\n   - ^themeBtn.click()^\n   - ^voteBtn.click()^\n\nExpected output:\n\n~~~\n[Event] Upvote clicked! Total: 1 upvotes\n[Event] Upvote clicked! Total: 2 upvotes\n[Event] Theme toggled! Dark mode: true\n[Event] Upvote clicked! Total: 3 upvotes\n~~~",
      "terms": [
        {
          "term": "event",
          "def": "An action or signal occurring in the browser, such as a user mouse click or key press."
        },
        {
          "term": "event listener",
          "def": "A function registered on a DOM node that waits for a specific event type to occur."
        },
        {
          "term": "click event",
          "def": "The event fired when a mouse button is clicked or a screen is tapped on an element."
        },
        {
          "term": "callback",
          "def": "A function passed into ^addEventListener^ to be executed whenever the event occurs."
        },
        {
          "term": "event-driven programming",
          "def": "A programming paradigm where flow is dictated by events like user gestures or incoming messages."
        },
        {
          "term": "UI state",
          "def": "The live data and visual condition of an application interface at any given moment."
        }
      ],
      "starter": "// --- Simulated DOM Event Environment ---\nclass InteractiveElement {\n  constructor(id, textContent = '') {\n    this.id = id;\n    this.textContent = textContent;\n    this.listeners = {};\n  }\n  addEventListener(event, callback) {\n    if (!this.listeners[event]) this.listeners[event] = [];\n    this.listeners[event].push(callback);\n  }\n  click() {\n    (this.listeners['click'] || []).forEach(fn => fn({ target: this, type: 'click' }));\n  }\n}\n\nconst document = {\n  elements: [\n    new InteractiveElement('upvote-btn', 'Upvote Post'),\n    new InteractiveElement('vote-count', '0 upvotes'),\n    new InteractiveElement('theme-toggle', 'Switch Mode')\n  ],\n  getElementById(id) {\n    return this.elements.find(el => el.id === id) || null;\n  }\n};\n// ----------------------------------------\n\nfunction setupAppInteractions() {\n  let upvotes = 0;\n  let isDarkMode = false;\n\n  const voteBtn = document.getElementById('upvote-btn');\n  const countBadge = document.getElementById('vote-count');\n  const themeBtn = document.getElementById('theme-toggle');\n\n  // TODO: Add 'click' event listener to voteBtn\n  // TODO: Add 'click' event listener to themeBtn\n\n  // Simulate user actions:\n  voteBtn.click();\n  voteBtn.click();\n  themeBtn.click();\n  voteBtn.click();\n}\n\nsetupAppInteractions();\n",
      "solution": "// --- Simulated DOM Event Environment ---\nclass InteractiveElement {\n  constructor(id, textContent = '') {\n    this.id = id;\n    this.textContent = textContent;\n    this.listeners = {};\n  }\n  addEventListener(event, callback) {\n    if (!this.listeners[event]) this.listeners[event] = [];\n    this.listeners[event].push(callback);\n  }\n  click() {\n    (this.listeners['click'] || []).forEach(fn => fn({ target: this, type: 'click' }));\n  }\n}\n\nconst document = {\n  elements: [\n    new InteractiveElement('upvote-btn', 'Upvote Post'),\n    new InteractiveElement('vote-count', '0 upvotes'),\n    new InteractiveElement('theme-toggle', 'Switch Mode')\n  ],\n  getElementById(id) {\n    return this.elements.find(el => el.id === id) || null;\n  }\n};\n// ----------------------------------------\n\nfunction setupAppInteractions() {\n  let upvotes = 0;\n  let isDarkMode = false;\n\n  const voteBtn = document.getElementById('upvote-btn');\n  const countBadge = document.getElementById('vote-count');\n  const themeBtn = document.getElementById('theme-toggle');\n\n  voteBtn.addEventListener('click', () => {\n    upvotes += 1;\n    countBadge.textContent = `${upvotes} upvotes`;\n    console.log(`[Event] Upvote clicked! Total: ${countBadge.textContent}`);\n  });\n\n  themeBtn.addEventListener('click', () => {\n    isDarkMode = !isDarkMode;\n    console.log(`[Event] Theme toggled! Dark mode: ${isDarkMode}`);\n  });\n\n  // Simulate user actions:\n  voteBtn.click();\n  voteBtn.click();\n  themeBtn.click();\n  voteBtn.click();\n}\n\nsetupAppInteractions();\n",
      "hint": "Register voteBtn.addEventListener(\"click\", () => { ... }) to increment upvotes and log status, and themeBtn.addEventListener(\"click\", () => { ... }) to toggle isDarkMode.",
      "tests": [
        {
          "name": "Dispatches click events and updates UI state smoothly",
          "expected": "[Event] Upvote clicked! Total: 1 upvotes\n[Event] Upvote clicked! Total: 2 upvotes\n[Event] Theme toggled! Dark mode: true\n[Event] Upvote clicked! Total: 3 upvotes"
        }
      ]
    },
    {
      "id": "unit-5-test",
      "title": "Unit 5 Capstone Test: Interactive Trivia Game & Score Tracker",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": true,
      "image": {
        "url": "/diagrams/web/unit-5-test.svg",
        "caption": "Interactive Trivia Game Engine: Questions, user choices, answer validation, score updates, and victory screen."
      },
      "content": "## Grand Curriculum Capstone: Interactive Trivia Game & Score Tracker\n\nWelcome to the ultimate graduation capstone of the Learn4Free Web Development curriculum! You have journeyed from writing your very first ^<h1>^ LEGO brick to styling responsive Flexbox cards, mastering algorithms, and handling real-time DOM events.\n\nNow bring every single skill together to build a complete, stateful **Interactive Web Trivia Game**.\n\n## Specifications\n\nYou are provided with a questions dataset:\n\n~~~javascript\nconst questions = [\n  {\n    q: 'Which HTML tag defines the highest level headline?',\n    choices: { A: '<p>', B: '<h6>', C: '<h1>', D: '<header>' },\n    correct: 'C'\n  },\n  {\n    q: 'Which CSS property defines the inner spacing inside an element border?',\n    choices: { A: 'margin', B: 'padding', C: 'border-width', D: 'gap' },\n    correct: 'B'\n  },\n  {\n    q: 'Which array method creates a new array by transforming every item?',\n    choices: { A: 'filter', B: 'reduce', C: 'forEach', D: 'map' },\n    correct: 'D'\n  }\n];\n~~~\n\nBuild the Trivia Engine:\n1. Maintain state:\n   - ^score = 0^\n   - ^currentQuestionIndex = 0^\n2. Select DOM elements:\n   - ^scoreBadge = document.getElementById('score-display')^\n   - ^questionBox = document.getElementById('question-text')^\n   - ^feedbackBox = document.getElementById('feedback-message')^\n3. Implement ^answerQuestion(userChoice)^:\n   - Check ^userChoice === question.correct^\n   - If correct:\n     - Add 100 to ^score^\n     - Set ^feedbackBox.textContent = 'Correct! 🎉 (+100 pts)'^\n     - Log: ^Question <qNum>: Correct! 🎉 (+100 pts)^\n   - If incorrect:\n     - Set ^feedbackBox.textContent = 'Incorrect! ❌'^\n     - Log: ^Question <qNum>: Incorrect! ❌^\n   - Update ^scoreBadge.textContent = `Score: ${score}`^\n   - Advance ^currentQuestionIndex++^\n4. After answering all 3 questions with choices ^['C', 'B', 'D']^, print the grand victory banner:\n   ~~~\n   --- TRIVIA GAME OVER ---\n   Final Score: 300 / 300\n   Rank: MASTER WEB DEVELOPER\n   ~~~\n\nExpected output:\n\n~~~\nQuestion 1: Correct! 🎉 (+100 pts)\nQuestion 2: Correct! 🎉 (+100 pts)\nQuestion 3: Correct! 🎉 (+100 pts)\n--- TRIVIA GAME OVER ---\nFinal Score: 300 / 300\nRank: MASTER WEB DEVELOPER\n~~~",
      "terms": [
        {
          "term": "capstone",
          "def": "A comprehensive culminating project demonstrating unified mastery across an entire curriculum."
        },
        {
          "term": "state management",
          "def": "The systematic handling of dynamic runtime data across application interactions."
        },
        {
          "term": "game loop",
          "def": "The logical cycle evaluating player input, updating state, and rendering UI updates."
        },
        {
          "term": "UI dispatch",
          "def": "Propagating data changes out to visual interface elements in response to events."
        }
      ],
      "starter": "// --- Simulated Trivia App DOM ---\nclass TriviaElement {\n  constructor(id, textContent = '') {\n    this.id = id;\n    this.textContent = textContent;\n  }\n}\n\nconst document = {\n  elements: [\n    new TriviaElement('score-display', 'Score: 0'),\n    new TriviaElement('question-text', 'Ready to start?'),\n    new TriviaElement('feedback-message', '')\n  ],\n  getElementById(id) {\n    return this.elements.find(el => el.id === id) || null;\n  }\n};\n// ---------------------------------\n\nfunction runTriviaGame() {\n  const questions = [\n    {\n      q: 'Which HTML tag defines the highest level headline?',\n      choices: { A: '<p>', B: '<h6>', C: '<h1>', D: '<header>' },\n      correct: 'C'\n    },\n    {\n      q: 'Which CSS property defines the inner spacing inside an element border?',\n      choices: { A: 'margin', B: 'padding', C: 'border-width', D: 'gap' },\n      correct: 'B'\n    },\n    {\n      q: 'Which array method creates a new array by transforming every item?',\n      choices: { A: 'filter', B: 'reduce', C: 'forEach', D: 'map' },\n      correct: 'D'\n    }\n  ];\n\n  // TODO: Implement state tracking, question answering logic, and final game over report\n}\n\nrunTriviaGame();\n",
      "solution": "// --- Simulated Trivia App DOM ---\nclass TriviaElement {\n  constructor(id, textContent = '') {\n    this.id = id;\n    this.textContent = textContent;\n  }\n}\n\nconst document = {\n  elements: [\n    new TriviaElement('score-display', 'Score: 0'),\n    new TriviaElement('question-text', 'Ready to start?'),\n    new TriviaElement('feedback-message', '')\n  ],\n  getElementById(id) {\n    return this.elements.find(el => el.id === id) || null;\n  }\n};\n// ---------------------------------\n\nfunction runTriviaGame() {\n  const questions = [\n    {\n      q: 'Which HTML tag defines the highest level headline?',\n      choices: { A: '<p>', B: '<h6>', C: '<h1>', D: '<header>' },\n      correct: 'C'\n    },\n    {\n      q: 'Which CSS property defines the inner spacing inside an element border?',\n      choices: { A: 'margin', B: 'padding', C: 'border-width', D: 'gap' },\n      correct: 'B'\n    },\n    {\n      q: 'Which array method creates a new array by transforming every item?',\n      choices: { A: 'filter', B: 'reduce', C: 'forEach', D: 'map' },\n      correct: 'D'\n    }\n  ];\n\n  let score = 0;\n  let currentQuestionIndex = 0;\n\n  const scoreBadge = document.getElementById('score-display');\n  const questionBox = document.getElementById('question-text');\n  const feedbackBox = document.getElementById('feedback-message');\n\n  function answerQuestion(userChoice) {\n    const qNum = currentQuestionIndex + 1;\n    const currentQ = questions[currentQuestionIndex];\n\n    if (userChoice === currentQ.correct) {\n      score += 100;\n      feedbackBox.textContent = 'Correct! 🎉 (+100 pts)';\n      console.log(`Question ${qNum}: Correct! 🎉 (+100 pts)`);\n    } else {\n      feedbackBox.textContent = 'Incorrect! ❌';\n      console.log(`Question ${qNum}: Incorrect! ❌`);\n    }\n\n    scoreBadge.textContent = `Score: ${score}`;\n    currentQuestionIndex++;\n  }\n\n  // Answering all questions correctly\n  answerQuestion('C');\n  answerQuestion('B');\n  answerQuestion('D');\n\n  console.log('--- TRIVIA GAME OVER ---');\n  console.log(`Final Score: ${score} / ${questions.length * 100}`);\n  console.log('Rank: MASTER WEB DEVELOPER');\n}\n\nrunTriviaGame();\n",
      "hint": "In answerQuestion, check if userChoice === questions[currentQuestionIndex].correct. If so, add 100 to score and log \"Question <qNum>: Correct! 🎉 (+100 pts)\". Update scoreBadge and increment index.",
      "tests": [
        {
          "name": "Plays through all trivia questions, tracks score, and renders final report",
          "expected": "Question 1: Correct! 🎉 (+100 pts)\nQuestion 2: Correct! 🎉 (+100 pts)\nQuestion 3: Correct! 🎉 (+100 pts)\n--- TRIVIA GAME OVER ---\nFinal Score: 300 / 300\nRank: MASTER WEB DEVELOPER"
        }
      ]
    }
  ]
};
