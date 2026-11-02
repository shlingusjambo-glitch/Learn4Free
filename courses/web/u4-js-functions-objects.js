// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

module.exports = {
  "id": "js-functions-objects",
  "title": "JavaScript Functions & Objects",
  "lessons": [
    {
      "id": "js-functions",
      "title": "Functions & Arrow Syntax",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/js-functions.svg",
        "caption": "Function machines: Parameters as inputs, logic body, and return value output."
      },
      "content": "## The Reusable Spell Machine (Espresso Maker)\n\nImagine you run a bustling coffee shop. You would not invent a brand new way to brew coffee for every single customer who walks through the door! You have an espresso machine: you supply beans and milk (the **parameters** / **arguments**), the machine runs its brewing recipe, and it hands back a fresh latte (the **return value**).\n\nIn programming, that reusable machine is called a **function**.\n\n## Declaring Functions vs Arrow Functions\n\nThere are two primary ways to author functions in modern JavaScript:\n\n1. **Standard Function Declaration**:\n   ~~~\n   function calculateBaseDamage(spellPower, intelligence) {\n     return spellPower + (intelligence * 1.5);\n   }\n   ~~~\n2. **Modern Arrow Function (^() =>^)**:\n   A sleek, concise shorthand popular in modern codebases:\n   ~~~\n   const applyCrit = (damage, critRate) => damage * critRate;\n   ~~~\n\n## Parameters vs Return Values\n\n- **Parameters**: The variable placeholders declared in the parentheses (e.g. ^spellPower, intelligence^).\n- **Arguments**: The real values passed in during an actual call (e.g. ^calculateBaseDamage(80, 20)^).\n- **^return^**: The crucial statement that stops the function and sends the computed result back out into your code. Without ^return^, a function yields ^undefined^!\n\n## Your Task\n\nBuild a wizard combat calculation module:\n1. Declare a standard function ^calculateBaseDamage(spellPower, intelligence)^ that returns ^spellPower + (intelligence * 1.5)^.\n2. Declare an arrow function ^applyCrit = (damage, critRate) => damage * critRate^.\n3. Compute ^base = calculateBaseDamage(80, 20)^.\n4. Compute ^total = applyCrit(base, 2.0)^.\n5. Print the two lines shown below.\n\nExpected output:\n\n~~~\nBase Spell Damage: 110\nCritical Spell Hit: 220\n~~~",
      "terms": [
        {
          "term": "function",
          "def": "A named, reusable block of instructions that performs a computation and can return a value."
        },
        {
          "term": "parameter",
          "def": "A named placeholder variable defined in a function signature for receiving input values."
        },
        {
          "term": "argument",
          "def": "The actual value passed into a function when it is invoked."
        },
        {
          "term": "return",
          "def": "A keyword terminating function execution and passing a value back to the function caller."
        },
        {
          "term": "arrow function",
          "def": "A compact syntax for writing JavaScript functions using the ^=>^ symbol."
        },
        {
          "term": "scope",
          "def": "The context determining where variables are declared, accessible, or hidden."
        }
      ],
      "starter": "// Wizard Spell Combat Calculator\nfunction combatEngine() {\n  // TODO: Define calculateBaseDamage(spellPower, intelligence)\n  // TODO: Define arrow function applyCrit(damage, critRate)\n\n  const base = 0;\n  const total = 0;\n\n  console.log(`Base Spell Damage: ${base}`);\n  console.log(`Critical Spell Hit: ${total}`);\n}\n\ncombatEngine();\n",
      "solution": "// Wizard Spell Combat Calculator\nfunction combatEngine() {\n  function calculateBaseDamage(spellPower, intelligence) {\n    return spellPower + (intelligence * 1.5);\n  }\n\n  const applyCrit = (damage, critRate) => damage * critRate;\n\n  const base = calculateBaseDamage(80, 20);\n  const total = applyCrit(base, 2.0);\n\n  console.log(`Base Spell Damage: ${base}`);\n  console.log(`Critical Spell Hit: ${total}`);\n}\n\ncombatEngine();\n",
      "hint": "Return spellPower + (intelligence * 1.5) from calculateBaseDamage, and return damage * critRate from applyCrit.",
      "tests": [
        {
          "name": "Computes base damage and critical multiplier with functions",
          "expected": "Base Spell Damage: 110\nCritical Spell Hit: 220"
        }
      ]
    },
    {
      "id": "js-objects",
      "title": "Objects & Methods",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/js-objects.svg",
        "caption": "Object character sheets: Key-value properties and callable object methods."
      },
      "content": "## The RPG Character Sheet & Pokémon Card\n\nAn array is great for an ordered list of identical things (like high scores). But what if you want to describe a rich, multifaceted entity, like a Pokémon or an RPG superhero?\n\nA single character has a name, a type, hit points, attack power, and special abilities. In JavaScript, we group these related traits into an **object** using curly braces ^{ ... }^ and **key-value pairs**.\n\n~~~\nconst pikachu = {\n  name: 'Pikachu',\n  type: 'Electric',\n  hp: 100\n};\n~~~\n\n## Reading Data: Dot Notation vs Bracket Notation\n\nYou can read properties in two ways:\n1. **Dot notation** (most common): ^pikachu.hp^\n2. **Bracket notation** (ideal when the key name is stored in another variable): ^pikachu['type']^\n\n## Objects That Take Action: Methods\n\nWhen an object has a property that is a function, we call it a **method**. Inside a method, the special keyword **^this^** refers to the object itself!\n\n~~~\nconst pikachu = {\n  name: 'Pikachu',\n  hp: 100,\n  takeDamage(amount) {\n    this.hp -= amount;\n  }\n};\n~~~\n\n## Your Task\n\nConstruct the ^pikachu^ object with:\n- ^name: 'Pikachu'^\n- ^type: 'Electric'^\n- ^level: 25^\n- ^hp: 100^\n- ^maxHp: 100^\n- Method ^takeDamage(amount)^: decrements ^this.hp^ by ^amount^ (not falling below 0 using ^Math.max(0, ...)^) and returns ^\"<name> took <amount> damage! Current HP: <hp>/<maxHp>\"^\n- Method ^heal(amount)^: increments ^this.hp^ by ^amount^ (not exceeding ^maxHp^ using ^Math.min(this.maxHp, ...)^) and returns ^\"<name> restored <amount> HP! Current HP: <hp>/<maxHp>\"^\n\nRun the battle simulation below and print the combat logs.\n\nExpected output:\n\n~~~\nPokemon: Pikachu (Lv. 25)\nPrimary Type: Electric\nPikachu took 35 damage! Current HP: 65/100\nPikachu restored 20 HP! Current HP: 85/100\n~~~",
      "terms": [
        {
          "term": "object",
          "def": "A standalone data structure grouping related properties and methods into key-value pairs."
        },
        {
          "term": "key-value pair",
          "def": "A named identifier (key) associated with its data value inside an object."
        },
        {
          "term": "property",
          "def": "A named data attribute belonging to an object, like ^pikachu.level^."
        },
        {
          "term": "method",
          "def": "A function defined as a property of an object that can interact with the object’s internal state."
        },
        {
          "term": "dot notation",
          "def": "Accessing an object property using a period, such as ^hero.health^."
        },
        {
          "term": "bracket notation",
          "def": "Accessing an object property using square brackets and strings, such as ^hero[\"health\"]^."
        },
        {
          "term": "this",
          "def": "A context keyword in JavaScript referring to the object currently executing the method."
        }
      ],
      "starter": "// Pokemon Battle Simulation\nfunction runPokemonBattle() {\n  const pikachu = {\n    name: 'Pikachu',\n    type: 'Electric',\n    level: 25,\n    hp: 100,\n    maxHp: 100,\n    takeDamage(amount) {\n      // TODO: Decrement hp and return status string\n      return '';\n    },\n    heal(amount) {\n      // TODO: Increment hp and return status string\n      return '';\n    }\n  };\n\n  console.log(`Pokemon: ${pikachu.name} (Lv. ${pikachu.level})`);\n  console.log(`Primary Type: ${pikachu['type']}`);\n  console.log(pikachu.takeDamage(35));\n  console.log(pikachu.heal(20));\n}\n\nrunPokemonBattle();\n",
      "solution": "// Pokemon Battle Simulation\nfunction runPokemonBattle() {\n  const pikachu = {\n    name: 'Pikachu',\n    type: 'Electric',\n    level: 25,\n    hp: 100,\n    maxHp: 100,\n    takeDamage(amount) {\n      this.hp = Math.max(0, this.hp - amount);\n      return `${this.name} took ${amount} damage! Current HP: ${this.hp}/${this.maxHp}`;\n    },\n    heal(amount) {\n      this.hp = Math.min(this.maxHp, this.hp + amount);\n      return `${this.name} restored ${amount} HP! Current HP: ${this.hp}/${this.maxHp}`;\n    }\n  };\n\n  console.log(`Pokemon: ${pikachu.name} (Lv. ${pikachu.level})`);\n  console.log(`Primary Type: ${pikachu['type']}`);\n  console.log(pikachu.takeDamage(35));\n  console.log(pikachu.heal(20));\n}\n\nrunPokemonBattle();\n",
      "hint": "In takeDamage: this.hp = Math.max(0, this.hp - amount). In heal: this.hp = Math.min(this.maxHp, this.hp + amount). Return the formatted status strings.",
      "tests": [
        {
          "name": "Executes Pokemon battle methods and logs status transitions",
          "expected": "Pokemon: Pikachu (Lv. 25)\nPrimary Type: Electric\nPikachu took 35 damage! Current HP: 65/100\nPikachu restored 20 HP! Current HP: 85/100"
        }
      ]
    },
    {
      "id": "js-array-methods",
      "title": "Modern Array Methods: map, filter & reduce",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": false,
      "image": {
        "url": "/diagrams/web/js-array-methods.svg",
        "caption": "The Modern Pipeline: .filter() selects, .map() transforms, and .reduce() aggregates."
      },
      "content": "## The Supercharged Assembly Line: map, filter & reduce\n\nTraditional ^for^ loops get the job done, but modern JavaScript developers prefer expressive, declarative superpowers known as **higher-order array methods**.\n\nMeet the Big Three:\n\n1. **^.filter(callback)^**:\n   The VIP bouncer. It inspects every element in the array. If the callback returns ^true^, the item is kept; if ^false^, it is discarded. The original array remains untouched!\n   ~~~\n   const qualifiers = scores.filter(s => s >= 100);\n   ~~~\n\n2. **^.map(callback)^**:\n   The transformation spell. It takes every item, applies a function to it, and returns a new array with the transformed items. Think of it like putting sunglasses on everyone in a group photo.\n   ~~~\n   const boosted = qualifiers.map(s => s * 1.10);\n   ~~~\n\n3. **^.reduce(callback, initialValue)^**:\n   The cash register receipt. It crunches an entire array down to a single value (such as a total sum, average, or single composite object).\n   ~~~\n   const total = boosted.reduce((sum, s) => sum + s, 0);\n   ~~~\n\n## Why Immutability Matters\n\nNotice that none of these methods modify the original array! They return fresh copies, which prevents subtle bugs in complex web applications.\n\n## Your Task\n\nProcess a roster of esports tournament scores: ^[45, 120, 80, 250, 95, 310]^:\n1. Use **^.filter()^** to keep only scores ^>= 100^.\n2. Use **^.map()^** on the qualifiers to apply a 10% bonus (^Math.round(score * 1.10)^).\n3. Use **^.reduce()^** to sum all boosted scores starting from 0.\n4. Print the three summary lines shown below.\n\nExpected output:\n\n~~~\nQualifying Scores: 120, 250, 310\nBoosted Scores: 132, 275, 341\nTotal Prize Pool Points: 748\n~~~",
      "terms": [
        {
          "term": "callback function",
          "def": "A function supplied as an argument to another function, to be called when needed."
        },
        {
          "term": "higher-order function",
          "def": "A function that accepts other functions as arguments or returns a function."
        },
        {
          "term": "filter",
          "def": "An array method creating a new array containing all elements passing a test condition."
        },
        {
          "term": "map",
          "def": "An array method creating a new array containing the results of transforming each element."
        },
        {
          "term": "reduce",
          "def": "An array method iterating across all items to reduce them into a single aggregate result."
        }
      ],
      "starter": "// Esports Tournament Score Pipeline\nfunction processTournamentScores() {\n  const scores = [45, 120, 80, 250, 95, 310];\n\n  // 1. Filter scores >= 100\n  const highScores = [];\n\n  // 2. Map highScores applying 10% bonus: Math.round(score * 1.10)\n  const boostedScores = [];\n\n  // 3. Reduce boostedScores to calculate sum starting at 0\n  const totalPrizePool = 0;\n\n  console.log(`Qualifying Scores: ${highScores.join(', ')}`);\n  console.log(`Boosted Scores: ${boostedScores.join(', ')}`);\n  console.log(`Total Prize Pool Points: ${totalPrizePool}`);\n}\n\nprocessTournamentScores();\n",
      "solution": "// Esports Tournament Score Pipeline\nfunction processTournamentScores() {\n  const scores = [45, 120, 80, 250, 95, 310];\n\n  const highScores = scores.filter(score => score >= 100);\n  const boostedScores = highScores.map(score => Math.round(score * 1.10));\n  const totalPrizePool = boostedScores.reduce((sum, score) => sum + score, 0);\n\n  console.log(`Qualifying Scores: ${highScores.join(', ')}`);\n  console.log(`Boosted Scores: ${boostedScores.join(', ')}`);\n  console.log(`Total Prize Pool Points: ${totalPrizePool}`);\n}\n\nprocessTournamentScores();\n",
      "hint": "Use scores.filter(s => s >= 100), highScores.map(s => Math.round(s * 1.10)), and boostedScores.reduce((acc, s) => acc + s, 0).",
      "tests": [
        {
          "name": "Executes filter, map, and reduce pipeline correctly",
          "expected": "Qualifying Scores: 120, 250, 310\nBoosted Scores: 132, 275, 341\nTotal Prize Pool Points: 748"
        }
      ]
    },
    {
      "id": "unit-4-test",
      "title": "Unit 4 Test: Video Game Inventory & Stat Powerup Engine",
      "language": "javascript",
      "fileName": "index.js",
      "isUnitTest": true,
      "image": {
        "url": "/diagrams/web/unit-4-test.svg",
        "caption": "RPG Inventory Pipeline: filtering legendary gear, applying potion multipliers, and computing total gear score."
      },
      "content": "## Unit 4 Capstone Challenge: RPG Inventory Engine\n\nWelcome to the Unit 4 Capstone Assessment! You have unlocked functions, arrow syntax, objects, methods, and higher-order array pipelines (^.filter^, ^.map^, ^.reduce^).\n\nNow build an automated equipment scoring and enchantment pipeline for an RPG video game.\n\n## Specifications\n\nYou are given a player's inventory bag:\n\n~~~javascript\nconst inventory = [\n  { name: 'Rusty Dagger', type: 'weapon', rarity: 'common', power: 15 },\n  { name: 'Excalibur', type: 'weapon', rarity: 'legendary', power: 250 },\n  { name: 'Leather Boots', type: 'armor', rarity: 'common', power: 10 },\n  { name: 'Dragon Plate Armor', type: 'armor', rarity: 'legendary', power: 180 },\n  { name: 'Healing Potion', type: 'consumable', rarity: 'rare', power: 50 },\n  { name: 'Infinity Gauntlet', type: 'artifact', rarity: 'legendary', power: 500 }\n];\n~~~\n\nBuild the data pipeline:\n1. **Filter**: Select only items where ^rarity === 'legendary'^.\n2. **Map**: Transform each legendary item into a new object carrying a ^buffedPower^ property calculated as ^Math.floor(item.power * 1.25)^ (enchantment boost!).\n3. **Reduce**: Sum all ^buffedPower^ values to calculate the ^totalGearScore^.\n4. **Log**: Print the full battle readiness report:\n   - ^Legendary Items Found: <count>^\n   - ^Buffed Gear Roster:^\n   - For each buffed item: ^- <name>: <buffedPower> power^\n   - ^Total Player Gear Score: <totalGearScore>^\n   - ^Battle Readiness: RAID READY^\n\nExpected output:\n\n~~~\nLegendary Items Found: 3\nBuffed Gear Roster:\n- Excalibur: 312 power\n- Dragon Plate Armor: 225 power\n- Infinity Gauntlet: 625 power\nTotal Player Gear Score: 1162\nBattle Readiness: RAID READY\n~~~",
      "terms": [
        {
          "term": "gear score",
          "def": "A composite numerical index reflecting the collective power level of equipped gear."
        },
        {
          "term": "data transformation",
          "def": "The process of taking raw structured data and converting it into a clean enriched format."
        },
        {
          "term": "pipeline",
          "def": "A chained sequence of operations where the output of each function feeds into the next."
        }
      ],
      "starter": "// Unit 4 Test: RPG Equipment Scoring Engine\nfunction runInventoryEngine() {\n  const inventory = [\n    { name: 'Rusty Dagger', type: 'weapon', rarity: 'common', power: 15 },\n    { name: 'Excalibur', type: 'weapon', rarity: 'legendary', power: 250 },\n    { name: 'Leather Boots', type: 'armor', rarity: 'common', power: 10 },\n    { name: 'Dragon Plate Armor', type: 'armor', rarity: 'legendary', power: 180 },\n    { name: 'Healing Potion', type: 'consumable', rarity: 'rare', power: 50 },\n    { name: 'Infinity Gauntlet', type: 'artifact', rarity: 'legendary', power: 500 }\n  ];\n\n  // TODO: Use filter, map, and reduce to compute the required gear report\n}\n\nrunInventoryEngine();\n",
      "solution": "// Unit 4 Test: RPG Equipment Scoring Engine\nfunction runInventoryEngine() {\n  const inventory = [\n    { name: 'Rusty Dagger', type: 'weapon', rarity: 'common', power: 15 },\n    { name: 'Excalibur', type: 'weapon', rarity: 'legendary', power: 250 },\n    { name: 'Leather Boots', type: 'armor', rarity: 'common', power: 10 },\n    { name: 'Dragon Plate Armor', type: 'armor', rarity: 'legendary', power: 180 },\n    { name: 'Healing Potion', type: 'consumable', rarity: 'rare', power: 50 },\n    { name: 'Infinity Gauntlet', type: 'artifact', rarity: 'legendary', power: 500 }\n  ];\n\n  const legendaryItems = inventory.filter(item => item.rarity === 'legendary');\n\n  const buffedItems = legendaryItems.map(item => ({\n    name: item.name,\n    buffedPower: Math.floor(item.power * 1.25),\n  }));\n\n  const totalGearScore = buffedItems.reduce((acc, item) => acc + item.buffedPower, 0);\n\n  console.log(`Legendary Items Found: ${buffedItems.length}`);\n  console.log('Buffed Gear Roster:');\n  for (const item of buffedItems) {\n    console.log(`- ${item.name}: ${item.buffedPower} power`);\n  }\n  console.log(`Total Player Gear Score: ${totalGearScore}`);\n  console.log('Battle Readiness: RAID READY');\n}\n\nrunInventoryEngine();\n",
      "hint": "Filter on item.rarity === \"legendary\", map with buffedPower: Math.floor(item.power * 1.25), and reduce to sum buffedPower.",
      "tests": [
        {
          "name": "Computes legendary gear buffs and reports total gear score",
          "expected": "Legendary Items Found: 3\nBuffed Gear Roster:\n- Excalibur: 312 power\n- Dragon Plate Armor: 225 power\n- Infinity Gauntlet: 625 power\nTotal Player Gear Score: 1162\nBattle Readiness: RAID READY"
        }
      ]
    }
  ]
};
