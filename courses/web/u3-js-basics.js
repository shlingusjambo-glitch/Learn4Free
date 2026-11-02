// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

module.exports = {
  "id": "js-essentials",
  "title": "JavaScript Essentials - Variables & Logic",
  "lessons": [
    {
      "id": "js-variables",
      "title": "Variables & Data Types",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/js-variables.svg",
        "caption": "JavaScript memory slots: let for mutable counters, const for fixed constants, and primitive data types."
      },
      "content": "## The Mario Vault: Storing Data in Memory\n\nHTML gives a website structure, and CSS gives it beauty, but **JavaScript** is the nervous system that brings everything alive. Without JavaScript, you cannot add items to a shopping cart, like an Instagram reel, or play browser games!\n\nAt the heart of JavaScript are **variables**. Think of a variable as a labeled storage vault in the computer's memory. When Mario runs through World 1-1, the game needs to remember his name, how many coins he has collected, how many lives he has left, and whether he has a Super Star powerup.\n\n## let vs const\n\nIn modern JavaScript, you create variables using two core keywords:\n- **^let^**: Creates a **mutable** variable whose contents can change over time (like a coin counter starting at 0 and growing to 100).\n- **^const^**: Creates an **immutable binding** that cannot be reassigned (like the player's name ^'Mario'^ or the world ^'1-1'^). Rule of thumb: always default to ^const^ unless you know the value will be updated!\n\n## The Three Fundamental Primitive Types\n\n1. **Strings**: Text wrapped in quotes, e.g. ^'Mario'^.\n2. **Numbers**: Integers or decimals used for calculations, e.g. ^42^ or ^3.14^.\n3. **Booleans**: Binary logical flags that can only ever be ^true^ or ^false^.\n\n~~~\nconst hero = 'Mario';\nlet coins = 0;\nlet isInvincible = false;\n\n// Mario picks up 5 coins!\ncoins = coins + 5;\nconsole.log('Hero:', hero);\nconsole.log('Coins:', coins);\n~~~\n\n## Predict & Observe\n\nWhat happens if you try to reassign a ^const^ variable like ^hero = 'Luigi';^? JavaScript throws a ^TypeError: Assignment to constant variable^! It guards your constants against accidental overwrites.\n\n## Your Task\n\nTrack Mario's gameplay run in World 1-1:\n1. Declare ^const playerName = 'Mario';^\n2. Declare ^const world = '1-1';^\n3. Declare ^let coins = 0;^\n4. Declare ^let lives = 3;^\n5. Declare ^let score = 0;^\n6. Declare ^const hasFireFlower = true;^\n7. Mario collects 5 coins: increase ^coins^ by 5, and increase ^score^ by 500!\n8. Print the exact status report shown below using ^console.log^.\n\nExpected output:\n\n~~~\nPlayer: Mario\nWorld: 1-1\nCoins: 5\nLives: 3\nScore: 500\nFire Power: true\n~~~",
      "terms": [
        {
          "term": "JavaScript",
          "def": "The dynamic programming language that powers the interactive behavior of websites and web applications."
        },
        {
          "term": "variable",
          "def": "A named memory container used to store, retrieve, and update data values."
        },
        {
          "term": "let",
          "def": "A keyword used to declare variables that can be reassigned new values later."
        },
        {
          "term": "const",
          "def": "A keyword used to declare constant variables whose references cannot be reassigned."
        },
        {
          "term": "string",
          "def": "A sequence of characters wrapped in quotes representing textual data."
        },
        {
          "term": "number",
          "def": "A numeric data type representing whole integers or decimal floating-point values."
        },
        {
          "term": "boolean",
          "def": "A logical data type that holds only one of two possible values: ^true^ or ^false^."
        },
        {
          "term": "console.log",
          "def": "A built-in JavaScript method that prints information to the standard output / terminal."
        }
      ],
      "starter": "// Super Mario World Tracker\nfunction runMarioGame() {\n  // Declare the variables, collect 5 coins (+500 score), and print stats\n  const playerName = 'Mario';\n  let coins = 0;\n  // TODO: Add missing variables and updates\n\n  console.log(`Player: ${playerName}`);\n  console.log(`Coins: ${coins}`);\n}\n\nrunMarioGame();\n",
      "solution": "// Super Mario World Tracker\nfunction runMarioGame() {\n  const playerName = 'Mario';\n  const world = '1-1';\n  let coins = 0;\n  let lives = 3;\n  let score = 0;\n  const hasFireFlower = true;\n\n  // Mario smashes a question block and collects 5 coins!\n  coins += 5;\n  score += 500;\n\n  console.log(`Player: ${playerName}`);\n  console.log(`World: ${world}`);\n  console.log(`Coins: ${coins}`);\n  console.log(`Lives: ${lives}`);\n  console.log(`Score: ${score}`);\n  console.log(`Fire Power: ${hasFireFlower}`);\n}\n\nrunMarioGame();\n",
      "hint": "Declare world, lives, score, hasFireFlower, increment coins by 5 and score by 500, then log each line.",
      "tests": [
        {
          "name": "Prints accurate Super Mario game stats",
          "expected": "Player: Mario\nWorld: 1-1\nCoins: 5\nLives: 3\nScore: 500\nFire Power: true"
        }
      ]
    },
    {
      "id": "js-conditionals",
      "title": "Conditionals & Logical Operators",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/js-conditionals.svg",
        "caption": "Conditional branches: Evaluating boolean conditions to steer program execution."
      },
      "content": "## The Bouncer at the Arcade Door\n\nPrograms need to make decisions. Think of a conditional like a security guard standing at an arcade entrance checking passes:\n- If you have a VIP badge, walk straight into the private lounge.\n- Else if you have a regular ticket and you are at least 13 years old, enter the main gaming floor.\n- Else if you have a ticket and are under 13, go to the junior gaming zone with a guardian.\n- Otherwise (if you have no ticket at all), access is denied!\n\nIn JavaScript, we write this logic with **^if^**, **^else if^**, and **^else^**.\n\n## Comparisons & Strict Equality\n\nWhen comparing values in JavaScript, always use **strict equality (^===^)** and **strict inequality (^!==^)**. They verify that both the value AND the data type match, preventing strange bugs (like ^'0' == 0^ being true in loose equality).\n\n## Logical Operators\n\nWe combine multiple conditions using logical operators:\n- **^&&^ (Logical AND)**: Both conditions MUST be true (e.g. ^hasTicket && age >= 13^).\n- **^||^ (Logical OR)**: At least one condition must be true.\n- **^!^ (Logical NOT)**: Inverts a boolean (^!isGameOver^).\n\n~~~\nfunction checkAccess(age, hasTicket, isVIP) {\n  if (isVIP) {\n    return 'VIP Lounge';\n  } else if (hasTicket && age >= 13) {\n    return 'Main Floor';\n  } else {\n    return 'Access Denied';\n  }\n}\n~~~\n\n## Your Task\n\nWrite the ^checkArcadeAccess(age, hasTicket, isVIP)^ function:\n1. If ^isVIP^ is true: return ^'VIP Lounge: Unlimited Arcade Access + Free Snacks!'^\n2. Else if ^hasTicket^ is true and ^age >= 13^: return ^'Main Floor: All Games Unlocked'^\n3. Else if ^hasTicket^ is true and ^age < 13^: return ^'Junior Zone: Kid-friendly Arcade Games (Parent Required)'^\n4. Otherwise: return ^'Access Denied: Ticket Required at Entrance'^\n\nLog the evaluation for the four test cases specified below.\n\nExpected output:\n\n~~~\nVIP Lounge: Unlimited Arcade Access + Free Snacks!\nMain Floor: All Games Unlocked\nJunior Zone: Kid-friendly Arcade Games (Parent Required)\nAccess Denied: Ticket Required at Entrance\n~~~",
      "terms": [
        {
          "term": "conditional",
          "def": "A control structure executing different code blocks depending on whether a condition is true or false."
        },
        {
          "term": "if statement",
          "def": "The primary conditional statement that runs a code block if its test expression evaluates to true."
        },
        {
          "term": "else if",
          "def": "A secondary conditional clause checked only when the preceding if/else-if conditions evaluate to false."
        },
        {
          "term": "else",
          "def": "The catch-all branch that executes if none of the preceding conditions were met."
        },
        {
          "term": "strict equality",
          "def": "The ^===^ operator that checks whether two operands share both identical values and types."
        },
        {
          "term": "logical operator",
          "def": "Symbols like ^&&^ (AND), ^||^ (OR), and ^!^ (NOT) that evaluate compound boolean expressions."
        }
      ],
      "starter": "// Arcade Access Clearance Checker\nfunction checkArcadeAccess(age, hasTicket, isVIP) {\n  // Implement the 4-branch conditional logic here\n  return 'Access Denied';\n}\n\nconsole.log(checkArcadeAccess(25, true, true));\nconsole.log(checkArcadeAccess(16, true, false));\nconsole.log(checkArcadeAccess(10, true, false));\nconsole.log(checkArcadeAccess(20, false, false));\n",
      "solution": "// Arcade Access Clearance Checker\nfunction checkArcadeAccess(age, hasTicket, isVIP) {\n  if (isVIP) {\n    return 'VIP Lounge: Unlimited Arcade Access + Free Snacks!';\n  } else if (hasTicket && age >= 13) {\n    return 'Main Floor: All Games Unlocked';\n  } else if (hasTicket && age < 13) {\n    return 'Junior Zone: Kid-friendly Arcade Games (Parent Required)';\n  } else {\n    return 'Access Denied: Ticket Required at Entrance';\n  }\n}\n\nconsole.log(checkArcadeAccess(25, true, true));\nconsole.log(checkArcadeAccess(16, true, false));\nconsole.log(checkArcadeAccess(10, true, false));\nconsole.log(checkArcadeAccess(20, false, false));\n",
      "hint": "Use if (isVIP), else if (hasTicket && age >= 13), else if (hasTicket && age < 13), and else.",
      "tests": [
        {
          "name": "Evaluates all four arcade clearance scenarios accurately",
          "expected": "VIP Lounge: Unlimited Arcade Access + Free Snacks!\nMain Floor: All Games Unlocked\nJunior Zone: Kid-friendly Arcade Games (Parent Required)\nAccess Denied: Ticket Required at Entrance"
        }
      ]
    },
    {
      "id": "js-loops-arrays",
      "title": "Arrays & For Loops",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/js-loops-arrays.svg",
        "caption": "Array indexing [0, 1, 2] and the for loop iterator iterating across items."
      },
      "content": "## The Mixtape Cassette & The Robotic Assembly Line\n\nWhat if you have 100 songs in a playlist or 50 inventory items in your Minecraft chest? You do not want 50 separate variables named ^item1^, ^item2^, ^item3^... That would be a nightmare to maintain!\n\nInstead, we use an **array**: an ordered list of values bundled inside square brackets ^[ ... ]^.\n\n## Zero-Indexed Memory\n\nArrays are **zero-indexed**. The very first item is stored at index ^0^, the second at index ^1^, and so on. You access an item by putting its index inside brackets: ^songs[0]^. The total count of items is always given by the **^.length^** property.\n\n## The Tireless for Loop\n\nA **^for^ loop** is a tireless robotic worker that visits each slot of the array in sequence:\n\n~~~\nconst songs = ['Cruel Summer', 'Style', 'Karma'];\n\nfor (let i = 0; i < songs.length; i++) {\n  console.log(`Track ${i + 1}: ${songs[i]}`);\n}\n~~~\n\n- ^let i = 0^: Start the loop counter at the first index (0).\n- ^i < songs.length^: Keep running as long as ^i^ is within the array bounds.\n- ^i++^: Increment ^i^ by 1 after each loop cycle.\n\nYou can append new items to the end of any array using the **^.push()^** method!\n\n## Your Task\n\nA spacecraft's power bank has battery cells with varying charge percentages: ^[85, 40, 100, 15, 90, 30]^.\n1. Create an empty array ^activeCells = []^ and a variable ^totalPower = 0^.\n2. Loop through all cells using a standard ^for^ loop.\n3. For every cell with a charge of at least 50% (^charge >= 50^):\n   - Add it to ^activeCells^ using ^.push(charge)^\n   - Add its charge to ^totalPower^\n4. Print the final inventory report shown below.\n\nExpected output:\n\n~~~\nActive Cells: 3\nActive Cell Charges: 85, 100, 90\nTotal Power Output: 275%\n~~~",
      "terms": [
        {
          "term": "array",
          "def": "An ordered list of values stored within a single variable using square brackets ^[]^."
        },
        {
          "term": "index",
          "def": "The numeric position of an element in an array, starting at index 0."
        },
        {
          "term": "zero-indexed",
          "def": "The programming convention where list indexing begins with 0 rather than 1."
        },
        {
          "term": "length",
          "def": "An array property returning the total number of elements currently stored in the array."
        },
        {
          "term": "push",
          "def": "A built-in array method that appends one or more items to the end of the array."
        },
        {
          "term": "for loop",
          "def": "A control loop repeating a code block while a condition holds true, using an incrementing counter."
        },
        {
          "term": "iteration",
          "def": "A single complete execution cycle through a loop body."
        }
      ],
      "starter": "// Spacecraft Power Cell Inventory\nfunction processPowerCells() {\n  const powerCells = [85, 40, 100, 15, 90, 30];\n  const activeCells = [];\n  let totalPower = 0;\n\n  // TODO: Write a for loop iterating through powerCells\n  // Filter cells >= 50, push to activeCells, and sum totalPower\n\n  console.log(`Active Cells: ${activeCells.length}`);\n  console.log(`Active Cell Charges: ${activeCells.join(', ')}`);\n  console.log(`Total Power Output: ${totalPower}%`);\n}\n\nprocessPowerCells();\n",
      "solution": "// Spacecraft Power Cell Inventory\nfunction processPowerCells() {\n  const powerCells = [85, 40, 100, 15, 90, 30];\n  const activeCells = [];\n  let totalPower = 0;\n\n  for (let i = 0; i < powerCells.length; i++) {\n    const charge = powerCells[i];\n    if (charge >= 50) {\n      activeCells.push(charge);\n      totalPower += charge;\n    }\n  }\n\n  console.log(`Active Cells: ${activeCells.length}`);\n  console.log(`Active Cell Charges: ${activeCells.join(', ')}`);\n  console.log(`Total Power Output: ${totalPower}%`);\n}\n\nprocessPowerCells();\n",
      "hint": "Loop from i = 0 to i < powerCells.length. If powerCells[i] >= 50, push to activeCells and add to totalPower.",
      "tests": [
        {
          "name": "Filters active cells and sums total power",
          "expected": "Active Cells: 3\nActive Cell Charges: 85, 100, 90\nTotal Power Output: 275%"
        }
      ]
    },
    {
      "id": "unit-3-test",
      "title": "Unit 3 Test: Spotify Playlist Queue Filter & Duration Calculator",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": true,
      "image": {
        "url": "/diagrams/web/unit-3-test.svg",
        "caption": "Music Queue Pipeline: filtering skipped tracks, calculating total minutes and seconds, and reporting summary."
      },
      "content": "## Unit 3 Capstone Challenge: Spotify Playlist Queue Engine\n\nWelcome to the Unit 3 Capstone Assessment! You have mastered JavaScript variables, data types, conditional branching, array indexing, and loop accumulators.\n\nNow build the core queue and duration engine for a music streaming service like Spotify.\n\n## Specifications\n\nYou are given an array of song objects:\n\n~~~javascript\nconst playlist = [\n  { title: 'Cruel Summer', duration: 178, skipped: false },\n  { title: 'Anti-Hero', duration: 200, skipped: false },\n  { title: 'Interlude', duration: 45, skipped: true },\n  { title: 'Karma', duration: 184, skipped: false },\n  { title: 'Bad Blood Remix', duration: 212, skipped: true },\n  { title: 'Blank Space', duration: 231, skipped: false }\n];\n~~~\n\nWrite the logic to:\n1. Loop through all songs in ^playlist^.\n2. For each song where ^skipped === false^:\n   - Print: ^Playing: <title> (<duration>s)^\n   - Count this as an active track\n   - Add its duration to an accumulator ^totalSeconds^\n3. Convert ^totalSeconds^ into minutes and seconds:\n   - ^minutes = Math.floor(totalSeconds / 60)^\n   - ^remainingSeconds = totalSeconds % 60^ (using the modulo operator!)\n4. Print the final summary lines:\n   - ^Active Tracks: <activeCount> / <totalTracks>^\n   - ^Total Queue Duration: <minutes>m <remainingSeconds>s^\n   - ^Status: Queue Ready for Playback^\n\nExpected output:\n\n~~~\nPlaying: Cruel Summer (178s)\nPlaying: Anti-Hero (200s)\nPlaying: Karma (184s)\nPlaying: Blank Space (231s)\nActive Tracks: 4 / 6\nTotal Queue Duration: 13m 13s\nStatus: Queue Ready for Playback\n~~~",
      "terms": [
        {
          "term": "accumulator",
          "def": "A variable initialized before a loop that continually aggregates data across iterations."
        },
        {
          "term": "modulo",
          "def": "The remainder operator (%), computing the remaining value after integer division."
        },
        {
          "term": "queue",
          "def": "A data sequence where items are arranged to be processed in order."
        }
      ],
      "starter": "// Unit 3 Test: Spotify Playlist Queue Engine\nfunction runPlaylistQueue() {\n  const playlist = [\n    { title: 'Cruel Summer', duration: 178, skipped: false },\n    { title: 'Anti-Hero', duration: 200, skipped: false },\n    { title: 'Interlude', duration: 45, skipped: true },\n    { title: 'Karma', duration: 184, skipped: false },\n    { title: 'Bad Blood Remix', duration: 212, skipped: true },\n    { title: 'Blank Space', duration: 231, skipped: false }\n  ];\n\n  // TODO: Iterate through playlist, filter active tracks, calculate duration, and print output\n}\n\nrunPlaylistQueue();\n",
      "solution": "// Unit 3 Test: Spotify Playlist Queue Engine\nfunction runPlaylistQueue() {\n  const playlist = [\n    { title: 'Cruel Summer', duration: 178, skipped: false },\n    { title: 'Anti-Hero', duration: 200, skipped: false },\n    { title: 'Interlude', duration: 45, skipped: true },\n    { title: 'Karma', duration: 184, skipped: false },\n    { title: 'Bad Blood Remix', duration: 212, skipped: true },\n    { title: 'Blank Space', duration: 231, skipped: false }\n  ];\n\n  let activeCount = 0;\n  let totalSeconds = 0;\n\n  for (let i = 0; i < playlist.length; i++) {\n    const track = playlist[i];\n    if (!track.skipped) {\n      activeCount++;\n      totalSeconds += track.duration;\n      console.log(`Playing: ${track.title} (${track.duration}s)`);\n    }\n  }\n\n  const minutes = Math.floor(totalSeconds / 60);\n  const remainingSeconds = totalSeconds % 60;\n\n  console.log(`Active Tracks: ${activeCount} / ${playlist.length}`);\n  console.log(`Total Queue Duration: ${minutes}m ${remainingSeconds}s`);\n  console.log('Status: Queue Ready for Playback');\n}\n\nrunPlaylistQueue();\n",
      "hint": "Filter on !track.skipped, accumulate totalSeconds, use Math.floor(totalSeconds / 60) for minutes, and totalSeconds % 60 for seconds.",
      "tests": [
        {
          "name": "Processes playlist queue, filters tracks, and formats duration",
          "expected": "Playing: Cruel Summer (178s)\nPlaying: Anti-Hero (200s)\nPlaying: Karma (184s)\nPlaying: Blank Space (231s)\nActive Tracks: 4 / 6\nTotal Queue Duration: 13m 13s\nStatus: Queue Ready for Playback"
        }
      ]
    }
  ]
};
