// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'structs-strings',
  title: 'Structs, Strings & Capstone',
  lessons: [
    {
      id: 'c-strings',
      title: 'C Strings: The Null-Terminated Whispers',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/c-strings.svg',
        caption: 'C strings are arrays of characters ending with a null terminator character (\'\\0\').',
      },
      content: L`## Morse Code in the Dark

In *Stranger Things*, Will Byers communicates from the Upside Down using Christmas tree light bulbs blinking Morse code messages across the wall. Every message has to have a designated silent pause—a clear stopping signal—so Joyce knows where the sentence ends.

In languages like Python or JavaScript, strings are high-level objects with built-in length tracking. In C, **there is no string data type**.

A "string" in C is simply an array of ^char^ bytes where the final character is the **null terminator** (^'\0'^, ASCII value 0).

## The Sentinel Null Byte

~~~
char pass[] = "VOYAGER";
~~~

In memory, this creates 8 contiguous bytes:
^'V', 'O', 'Y', 'A', 'G', 'E', 'R', '\0'^

The ^'\0'^ acts as a stop light. Every standard C string function in ^<string.h>^—including ^strlen^ (count length), ^strcpy^ (copy string), and ^strcmp^ (compare strings)—starts at index 0 and marches forward byte-by-byte until it strikes ^'\0'^!

## Comparing Strings with strcmp

Because a string is an array pointer, writing ^if (input == "VOYAGER")^ compares the **memory addresses**, not the text!
To compare the actual characters, use ^strcmp^:

~~~
#include <string.h>

if (strcmp(input, "VOYAGER") == 0) {
    // strcmp returns 0 when strings match identically!
}
~~~

## Predict & Observe

What happens if a character array has no ^'\0'^ at the end?
Functions like ^printf("%s", str)^ and ^strlen(str)^ will keep reading straight past the end of your buffer, traversing random RAM until they stumble upon an accidental zero byte somewhere in memory. This is called a **buffer overrun** and is one of the most famous security vulnerabilities in history.

## Your Task

Read a string ^passcode^ from standard input (up to 30 characters).
1. Using a walking pointer (^const char *ptr = passcode;^), count the string length manually until ^*ptr == '\0'^.
2. Using ^strcmp^ from ^<string.h>^, check if ^passcode^ matches ^"VOYAGER"^.
3. Print:
   ^Length: <len>^
   If matched:
   ^Access Granted: Mission Log Unlocked^
   If not matched:
   ^Access Denied: Invalid Passcode^`,
      terms: [
        { term: 'null terminator (\\0)', def: 'A special byte with numeric value 0 used to mark the end of a character sequence in C.' },
        { term: 'c-string', def: 'A contiguous array of characters ending with a null byte (\\0).' },
        { term: 'strcmp()', def: 'Standard library function that compares two strings lexicographically, returning 0 if they match.' },
        { term: '<string.h>', def: 'Standard header containing string manipulation functions including strlen, strcmp, and strcpy.' },
        { term: 'buffer overrun', def: 'An anomaly where software reads or writes past the allocated boundary of a buffer.' },
      ],
      starter: L`#include <stdio.h>
#include <string.h>

int main(void) {
    char passcode[32];

    // TODO: Read passcode with scanf("%s", passcode)
    // Count length manually with a walking pointer until '\0'
    // Compare with "VOYAGER" using strcmp
    // Print:
    // Length: <len>
    // Access Granted: Mission Log Unlocked OR Access Denied: Invalid Passcode

    return 0;
}
`,
      solution: L`#include <stdio.h>
#include <string.h>

int main(void) {
    char passcode[32];

    if (scanf("%31s", passcode) == 1) {
        int len = 0;
        const char *ptr = passcode;
        while (*ptr != '\0') {
            len++;
            ptr++;
        }

        printf("Length: %d\n", len);

        if (strcmp(passcode, "VOYAGER") == 0) {
            printf("Access Granted: Mission Log Unlocked\n");
        } else {
            printf("Access Denied: Invalid Passcode\n");
        }
    }
    return 0;
}
`,
      hint: 'Walk pointer with while (*ptr != \'\\0\') { len++; ptr++; } and use if (strcmp(passcode, "VOYAGER") == 0) for matching.',
      tests: [
        {
          name: 'Correct Passcode: VOYAGER',
          stdin: 'VOYAGER',
          expected: 'Length: 7\nAccess Granted: Mission Log Unlocked',
        },
        {
          name: 'Incorrect Passcode: APOLLO',
          stdin: 'APOLLO',
          expected: 'Length: 6\nAccess Denied: Invalid Passcode',
        },
        {
          name: 'Long Incorrect Passcode: ENTERPRISE',
          stdin: 'ENTERPRISE',
          expected: 'Length: 10\nAccess Denied: Invalid Passcode',
        },
      ],
    },
    {
      id: 'struct-basics',
      title: 'Structs: Assembling Custom Blueprints',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/struct-basics.svg',
        caption: 'Defining custom data structures with struct and accessing members with the dot (.) operator.',
      },
      content: L`## Pokémon Stat Cards & Character Sheets

Think of a *Pokémon* card or a *Dungeons & Dragons* character sheet: you don't keep the monster's name, hit points, attack power, and defense rating in four disconnected scraps of paper scattered across the table. They are bound together on a single unified card.

In C, a **struct** (short for structure) is a user-defined datatype that lets you combine several variables of different types into a single named record.

## Defining and Accessing Structs

~~~
struct Character {
    char name[30];
    int hp;
    int attack;
    int defense;
};
~~~

To create an instance and access its fields, use the **dot operator** (^.^):

~~~
struct Character hero;
hero.hp = 100;
hero.attack = 45;
hero.defense = 20;

printf("Hero HP: %d\n", hero.hp);
~~~

In physical memory, C packs all four fields together in one single, continuous block of bytes on the stack.

## Predict & Observe

What happens if you assign one struct directly to another (^struct Character clone = hero;^)?
Unlike arrays, C **will** copy the entire struct byte-for-byte! Every field inside ^hero^ is duplicated into ^clone^.

## Your Task

Define the ^struct Character^:
~~~
struct Character {
    char name[30];
    int hp;
    int attack;
    int defense;
};
~~~

In ^main^:
1. Declare two instances: ^struct Character attacker;^ and ^struct Character defender;^.
2. Read the attacker's stats from stdin: ^name hp attack defense^.
3. Read the defender's stats from stdin: ^name hp attack defense^.
4. Calculate battle damage:
   ^damage = attacker.attack - defender.defense^
   (If ^damage < 1^, set ^damage = 1^).
5. Apply damage to defender:
   ^defender.hp -= damage;^
   (If ^defender.hp < 0^, set ^defender.hp = 0^).
6. Print the battle round summary:
~~~
Battle Round: <attacker.name> vs <defender.name>
Damage Dealt: <damage>
<defender.name> Remaining HP: <defender.hp>
~~~`,
      terms: [
        { term: 'struct', def: 'A user-defined composite data type grouping multiple variables under a single name.' },
        { term: 'member / field', def: 'An individual variable declared inside a struct definition.' },
        { term: 'dot operator (.)', def: 'Operator used to access or assign members of a direct struct instance.' },
        { term: 'composite type', def: 'A data type composed of multiple smaller primitive types.' },
      ],
      starter: L`#include <stdio.h>

// TODO: Define struct Character with name[30], hp, attack, defense

int main(void) {
    // TODO:
    // Declare attacker and defender structs
    // Read stats using scanf("%s %d %d %d", ...)
    // Calculate damage = attacker.attack - defender.defense (min 1)
    // Reduce defender.hp (min 0)
    // Print battle report

    return 0;
}
`,
      solution: L`#include <stdio.h>

struct Character {
    char name[30];
    int hp;
    int attack;
    int defense;
};

int main(void) {
    struct Character attacker;
    struct Character defender;

    if (scanf("%29s %d %d %d", attacker.name, &attacker.hp, &attacker.attack, &attacker.defense) == 4 &&
        scanf("%29s %d %d %d", defender.name, &defender.hp, &defender.attack, &defender.defense) == 4) {

        int damage = attacker.attack - defender.defense;
        if (damage < 1) {
            damage = 1;
        }

        defender.hp -= damage;
        if (defender.hp < 0) {
            defender.hp = 0;
        }

        printf("Battle Round: %s vs %s\n", attacker.name, defender.name);
        printf("Damage Dealt: %d\n", damage);
        printf("%s Remaining HP: %d\n", defender.name, defender.hp);
    }
    return 0;
}
`,
      hint: 'Define struct Character before main. Calculate damage = attacker.attack - defender.defense. If < 1 set to 1. Reduce defender.hp.',
      tests: [
        {
          name: 'Pikachu vs Charmander',
          stdin: 'Pikachu 100 45 20\nCharmander 90 40 15',
          expected: 'Battle Round: Pikachu vs Charmander\nDamage Dealt: 30\nCharmander Remaining HP: 60',
        },
        {
          name: 'Mewtwo Overwhelming Strike',
          stdin: 'Mewtwo 200 120 80\nGengar 80 70 30',
          expected: 'Battle Round: Mewtwo vs Gengar\nDamage Dealt: 90\nGengar Remaining HP: 0',
        },
        {
          name: 'Heavy Armor Absorbs Hit (Minimum 1 Damage)',
          stdin: 'Rook 100 20 50\nGolem 150 15 60',
          expected: 'Battle Round: Rook vs Golem\nDamage Dealt: 1\nGolem Remaining HP: 149',
        },
      ],
    },
    {
      id: 'struct-pointers',
      title: 'Struct Pointers & The Arrow: Directing the Fleet',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/struct-pointers.svg',
        caption: 'Using struct pointers and the arrow operator (->) for memory-efficient in-place modification.',
      },
      content: L`## Bridge Command on the USS Enterprise

On the bridge of the Starship *Enterprise*, Captain Picard does not duplicate and transport the entire 500-meter starship into his ready room whenever he orders a shield adjustment. He transmits a command signal directly to the ship's existing systems.

In C, structs often contain dozens of fields, strings, and buffers, taking up hundreds or thousands of bytes. If you pass a struct into a function by value, C has to duplicate every single byte onto the stack frame.

Instead, professional C systems pass a **struct pointer** (costing only 8 bytes!).

## The Arrow Operator (->)

When you hold a pointer to a struct:
~~~
struct Starship enterprise;
struct Starship *ship = &enterprise;
~~~

To access a field through the pointer, you *could* write:
~~~
(*ship).shield = 100; // Dereference, then access field
~~~
Because that syntax is awkward and the parentheses are mandatory (due to operator precedence), C provides the **arrow operator** (^->^):

~~~
ship->shield = 100; // Exactly identical to (*ship).shield!
~~~

The arrow operator is clean, elegant, and the universal signature of systems code in C.

## Predict & Observe

What happens if you write ^ship.shield^ when ^ship^ is a pointer?
The compiler stops with a syntax error: *member reference type 'struct Starship *' is a pointer; did you mean '->'?* Modern C compilers will even politely suggest the arrow for you.

## Your Task

Define the struct:
~~~
struct Starship {
    char designation[30];
    int shield;
    int warp_core;
};
~~~

Implement two functions that operate on struct pointers:
1. ^void upgrade_shields(struct Starship *ship, int amount);^
   Adds ^amount^ to ^ship->shield^.
2. ^void engage_warp(struct Starship *ship, int burn);^
   Subtracts ^burn^ from ^ship->warp_core^ (clamp to ^0^ if it drops below 0).

In ^main^:
1. Read from stdin: ^designation shield warp_core upgrade_amt warp_burn^.
2. Print initial status:
   ^Vessel: <designation> | Shield: <shield>% | Warp Core: <warp_core>%^
3. Call ^upgrade_shields(&ship, upgrade_amt);^
4. Call ^engage_warp(&ship, warp_burn);^
5. Print updated status:
   ^Updated: <designation> | Shield: <shield>% | Warp Core: <warp_core>%^`,
      terms: [
        { term: 'arrow operator (->)', def: 'Syntactic sugar in C for dereferencing a struct pointer and accessing a member: ptr->member.' },
        { term: 'struct pointer', def: 'A pointer storing the starting memory address of a struct instance.' },
        { term: 'pass-by-pointer', def: 'Passing the address of a struct to avoid expensive memory copying on the stack.' },
      ],
      starter: L`#include <stdio.h>

// TODO: Define struct Starship with designation[30], shield, warp_core
// TODO: Prototypes for upgrade_shields and engage_warp

int main(void) {
    // TODO:
    // Declare struct Starship ship;
    // Read stats and adjustments from stdin
    // Print initial Vessel status
    // Call upgrade_shields and engage_warp with &ship
    // Print Updated status

    return 0;
}

// TODO: Implement upgrade_shields and engage_warp using the -> operator
`,
      solution: L`#include <stdio.h>

struct Starship {
    char designation[30];
    int shield;
    int warp_core;
};

void upgrade_shields(struct Starship *ship, int amount);
void engage_warp(struct Starship *ship, int burn);

int main(void) {
    struct Starship ship;
    int upgrade_amt = 0;
    int warp_burn = 0;

    if (scanf("%29s %d %d %d %d", ship.designation, &ship.shield, &ship.warp_core, &upgrade_amt, &warp_burn) == 5) {
        printf("Vessel: %s | Shield: %d%% | Warp Core: %d%%\n", ship.designation, ship.shield, ship.warp_core);
        upgrade_shields(&ship, upgrade_amt);
        engage_warp(&ship, warp_burn);
        printf("Updated: %s | Shield: %d%% | Warp Core: %d%%\n", ship.designation, ship.shield, ship.warp_core);
    }
    return 0;
}

void upgrade_shields(struct Starship *ship, int amount) {
    ship->shield += amount;
}

void engage_warp(struct Starship *ship, int burn) {
    ship->warp_core -= burn;
    if (ship->warp_core < 0) {
        ship->warp_core = 0;
    }
}
`,
      hint: 'In upgrade_shields and engage_warp, use the -> operator on ship (e.g. ship->shield += amount).',
      tests: [
        {
          name: 'USS Enterprise Shield Upgrade and Warp Burn',
          stdin: 'Enterprise 75 90 25 30',
          expected: 'Vessel: Enterprise | Shield: 75% | Warp Core: 90%\nUpdated: Enterprise | Shield: 100% | Warp Core: 60%',
        },
        {
          name: 'Voyager Full Warp Exhaustion',
          stdin: 'Voyager 50 40 30 50',
          expected: 'Vessel: Voyager | Shield: 50% | Warp Core: 40%\nUpdated: Voyager | Shield: 80% | Warp Core: 0%',
        },
      ],
    },
    {
      id: 'unit-5-test',
      title: 'Unit 5 Capstone Test: Spacecraft Flight Computer & Telemetry System',
      isUnitTest: true,
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/unit-5-test.svg',
        caption: 'The Apollo Guidance Computer (AGC) telemetry architecture: composite structs, pointer calibrations, and status diagnostics.',
      },
      content: L`## Mission Briefing: Apollo Guidance Computer (AGC)

In July 1969, the Apollo 11 Lunar Module *Eagle* touched down on the Moon powered by the Apollo Guidance Computer—an embedded systems marvel that inspired generations of C systems programmers.

As your final capstone challenge in this course, you will build the core telemetry calibration engine for a modern deep-space probe (think *Interstellar* meets *Apollo 11*).

You will synthesize every pillar of the C programming language:
- Header files, standard I/O, format specifiers.
- Struct blueprints and composite data records.
- Pointers, memory addresses, and the arrow operator (^->^).
- Conditionals, threshold checking, and modular functions.

## Technical Specifications

1. Define the telemetry struct:
~~~
struct TelemetryPacket {
    char mission_code[16];
    int altitude_km;
    int velocity_kms;
    int fuel_percent;
    int status_code; // 1 = Nominal, 2 = Warning, 3 = Critical
};
~~~

2. Implement the calibration function:
^void calibrate_telemetry(struct TelemetryPacket *p, int altitude_drift, int burn_pct);^
- Adjust altitude: ^p->altitude_km += altitude_drift;^
- Burn fuel: ^p->fuel_percent -= burn_pct;^ (If ^p->fuel_percent < 0^, clamp to ^0^).
- Evaluate flight status based on remaining fuel:
  - If ^p->fuel_percent <= 15^: set ^p->status_code = 3;^
  - Else if ^p->fuel_percent <= 40^: set ^p->status_code = 2;^
  - Else: set ^p->status_code = 1;^

3. Implement the reporting function:
^void print_telemetry_dossier(const struct TelemetryPacket *p);^
Prints the mission log:
~~~
--- FLIGHT TELEMETRY LOG ---
Mission: <mission_code>
Altitude: <altitude_km> km
Velocity: <velocity_kms> km/s
Fuel: <fuel_percent>%
Status: <status_string>
~~~

Status String Mapping:
- Code ^1^ &rarr; ^NOMINAL^
- Code ^2^ &rarr; ^WARNING: LOW FUEL^
- Code ^3^ &rarr; ^CRITICAL: ABORT MISSION^

## Main Program

Inside ^main^:
1. Declare an instance: ^struct TelemetryPacket packet;^
2. Read from stdin:
   ^mission_code altitude_km velocity_kms fuel_percent altitude_drift burn_pct^
3. Call ^calibrate_telemetry(&packet, altitude_drift, burn_pct);^
4. Call ^print_telemetry_dossier(&packet);^

## Example

Input:
~~~
Apollo-11 384000 11 95 400 10
~~~

Output:
~~~
--- FLIGHT TELEMETRY LOG ---
Mission: Apollo-11
Altitude: 384400 km
Velocity: 11 km/s
Fuel: 85%
Status: NOMINAL
~~~`,
      terms: [
        { term: 'capstone', def: 'A culminating project that integrates and applies concepts from across the entire curriculum.' },
        { term: 'telemetry packet', def: 'A structured data payload containing sensor measurements transmitted from a remote craft.' },
        { term: 'const struct pointer', def: 'A pointer parameter (const struct TelemetryPacket *p) signaling that the function will read but not mutate the struct.' },
        { term: 'systems engineering', def: 'Designing robust, hardware-level software that runs continuously with predictable behavior.' },
      ],
      starter: L`#include <stdio.h>

// TODO: Define struct TelemetryPacket
// TODO: Prototypes for calibrate_telemetry and print_telemetry_dossier

int main(void) {
    // TODO:
    // Declare struct TelemetryPacket packet
    // Read mission_code, altitude, velocity, fuel, altitude_drift, burn_pct
    // Call calibrate_telemetry(&packet, altitude_drift, burn_pct)
    // Call print_telemetry_dossier(&packet)

    return 0;
}

// TODO: Implement calibrate_telemetry and print_telemetry_dossier
`,
      solution: L`#include <stdio.h>

struct TelemetryPacket {
    char mission_code[16];
    int altitude_km;
    int velocity_kms;
    int fuel_percent;
    int status_code;
};

void calibrate_telemetry(struct TelemetryPacket *p, int altitude_drift, int burn_pct);
void print_telemetry_dossier(const struct TelemetryPacket *p);

int main(void) {
    struct TelemetryPacket packet;
    int altitude_drift = 0;
    int burn_pct = 0;

    if (scanf("%15s %d %d %d %d %d",
              packet.mission_code,
              &packet.altitude_km,
              &packet.velocity_kms,
              &packet.fuel_percent,
              &altitude_drift,
              &burn_pct) == 6) {

        calibrate_telemetry(&packet, altitude_drift, burn_pct);
        print_telemetry_dossier(&packet);
    }
    return 0;
}

void calibrate_telemetry(struct TelemetryPacket *p, int altitude_drift, int burn_pct) {
    p->altitude_km += altitude_drift;
    p->fuel_percent -= burn_pct;
    if (p->fuel_percent < 0) {
        p->fuel_percent = 0;
    }

    if (p->fuel_percent <= 15) {
        p->status_code = 3;
    } else if (p->fuel_percent <= 40) {
        p->status_code = 2;
    } else {
        p->status_code = 1;
    }
}

void print_telemetry_dossier(const struct TelemetryPacket *p) {
    const char *status_str = "NOMINAL";
    if (p->status_code == 3) {
        status_str = "CRITICAL: ABORT MISSION";
    } else if (p->status_code == 2) {
        status_str = "WARNING: LOW FUEL";
    }

    printf("--- FLIGHT TELEMETRY LOG ---\n");
    printf("Mission: %s\n", p->mission_code);
    printf("Altitude: %d km\n", p->altitude_km);
    printf("Velocity: %d km/s\n", p->velocity_kms);
    printf("Fuel: %d%%\n", p->fuel_percent);
    printf("Status: %s\n", status_str);
}
`,
      hint: 'In calibrate_telemetry use p->fuel_percent -= burn_pct, then assign p->status_code based on the threshold (<=15 is 3, <=40 is 2, else 1).',
      tests: [
        {
          name: 'Lunar Insertion Burn (Nominal)',
          stdin: 'Apollo-11 384000 11 95 400 10',
          expected: '--- FLIGHT TELEMETRY LOG ---\nMission: Apollo-11\nAltitude: 384400 km\nVelocity: 11 km/s\nFuel: 85%\nStatus: NOMINAL',
        },
        {
          name: 'Orbital Deceleration (Warning Low Fuel)',
          stdin: 'Endurance 52000 24 50 1500 25',
          expected: '--- FLIGHT TELEMETRY LOG ---\nMission: Endurance\nAltitude: 53500 km\nVelocity: 24 km/s\nFuel: 25%\nStatus: WARNING: LOW FUEL',
        },
        {
          name: 'Emergency Surface Evasion (Critical Abort)',
          stdin: 'Voyager-2 90000 35 20 -500 10',
          expected: '--- FLIGHT TELEMETRY LOG ---\nMission: Voyager-2\nAltitude: 89500 km\nVelocity: 35 km/s\nFuel: 10%\nStatus: CRITICAL: ABORT MISSION',
        },
      ],
    },
  ],
};
