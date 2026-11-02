// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'functions',
  title: 'Functions & Modular Code',
  lessons: [
    {
      id: 'function-basics',
      title: 'Functions: The Mission Impossible Gadget Dispenser',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/function-basics.svg',
        caption: 'Function anatomy: prototypes declare signatures up front; definitions provide execution bodies.',
      },
      content: L`## The Gadget Dispenser

In *Mission: Impossible*, Ethan Hunt receives a specialized gadget dispenser from IMF headquarters: you feed in the mission requirements, it does the technical heavy lifting, and hands back exactly the tool you need.

A **function** is a reusable, named subprogram. Instead of stuffing hundreds of lines of code into ^main^, you break complex software down into clean, modular building blocks.

## The Two-Part Rule in C: Prototype & Definition

Because the C compiler reads your code strictly from top to bottom, it must be warned that a function exists before it encounters any call to it. That requires two steps:

1. **Function Prototype** (Forward Declaration): Placed at the top of the file, ending in a semicolon. Tells the compiler the function's name, return type, and parameter types.
2. **Function Definition**: The actual code block inside curly braces, usually placed below ^main^.

~~~
#include <stdio.h>

// 1. Prototype
int calculate_shield(int base, int multiplier);
void display_status(int shield);

int main(void) {
    int shield = calculate_shield(10, 5);
    display_status(shield);
    return 0;
}

// 2. Definition
int calculate_shield(int base, int multiplier) {
    return base * multiplier;
}

void display_status(int shield) {
    printf("Shield Integrity: %d%%\n", shield);
}
~~~

Notice that ^display_status^ has return type ^void^: this means it executes actions (printing) but does not return a value back to the caller.

## Predict & Observe

What happens if you delete the prototype at the top and leave the function definition at the bottom below ^main^?
In older C compilers, you got an implicit declaration warning; in modern C11, the compiler flags an error: ^call to undeclared function^. Always declare prototypes at the top of your file.

## Your Task

Implement the prototypes and definitions for:
1. ^int calculate_shield(int base, int multiplier);^ which returns ^base * multiplier^.
2. ^void display_status(int shield);^ which prints:
   ^Shield Integrity: <shield>%^ followed by a newline.

Inside ^main^, read two integers (^base^ and ^multiplier^) from standard input, calculate the shield value, and display it using ^display_status^.`,
      terms: [
        { term: 'function prototype', def: 'A forward declaration that introduces a function name and type signature before its definition.' },
        { term: 'return type', def: 'The data type (such as int, double, or void) that a function returns to its caller.' },
        { term: 'parameter', def: 'A placeholder variable listed in the function definition that receives input values.' },
        { term: 'argument', def: 'The concrete value passed into a function when calling it.' },
        { term: 'void', def: 'A special type keyword indicating that a function returns nothing, or takes no arguments.' },
      ],
      starter: L`#include <stdio.h>

// TODO: Write prototypes for calculate_shield and display_status

int main(void) {
    int base = 0;
    int multiplier = 0;

    // TODO: Read base and multiplier from standard input
    // Call calculate_shield and then display_status

    return 0;
}

// TODO: Implement calculate_shield and display_status definitions
`,
      solution: L`#include <stdio.h>

int calculate_shield(int base, int multiplier);
void display_status(int shield);

int main(void) {
    int base = 0;
    int multiplier = 0;

    if (scanf("%d %d", &base, &multiplier) == 2) {
        int shield = calculate_shield(base, multiplier);
        display_status(shield);
    }
    return 0;
}

int calculate_shield(int base, int multiplier) {
    return base * multiplier;
}

void display_status(int shield) {
    printf("Shield Integrity: %d%%\n", shield);
}
`,
      hint: 'Declare prototypes before main. In main, read base and multiplier, call int s = calculate_shield(base, multiplier), then display_status(s).',
      tests: [
        {
          name: 'Base 10 Multiplier 5',
          stdin: '10 5',
          expected: 'Shield Integrity: 50%',
        },
        {
          name: 'Full Shield Recharge 25 x 4',
          stdin: '25 4',
          expected: 'Shield Integrity: 100%',
        },
        {
          name: 'Overcharged Boost 40 x 3',
          stdin: '40 3',
          expected: 'Shield Integrity: 120%',
        },
      ],
    },
    {
      id: 'pass-by-value',
      title: 'Pass-by-Value: The Photocopier Rule',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/pass-by-value.svg',
        caption: 'The photocopier rule: functions receive isolated copies of variables on their own stack frame.',
      },
      content: L`## The Photocopier Rule

In the adventure movie *National Treasure*, Benjamin Franklin Gates discovers an ancient parchment map. If he hands a team member a **photocopy** of the map, and that person scribbles notes and draws paths all over it, what happens to the original parchment locked in the museum case?

Absolutely nothing. The original is untouched.

This is the golden rule of C function arguments: **C is strictly pass-by-value**.

When you pass a variable into a function, C makes a temporary, duplicated photocopy of the value and places it into the function's own isolated memory space (its **stack frame**). Any modifications made inside the function modify only that local copy.

## Witnessing Pass-by-Value in Action

Consider this failed attempt at modifying a variable:

~~~
void bad_damage(int hp) {
    hp = hp - 20; // Modifies ONLY the local photocopy!
}

int main(void) {
    int player_hp = 100;
    bad_damage(player_hp);
    // player_hp is STILL 100!
}
~~~

To communicate new results back to the caller in standard C functions, you must **return** the computed value and assign it in ^main^:

~~~
int apply_damage(int hp, int damage) {
    return hp - damage;
}

int main(void) {
    int player_hp = 100;
    int damage = 35;
    int remaining = apply_damage(player_hp, damage);
    // remaining is now 65!
}
~~~

## Predict & Observe

What happens to the stack memory of ^apply_damage^ once it finishes executing?
The operating system instantly tears down and recycles that entire stack frame. Any local variables created inside the function vanish forever into thin air. Only the returned value survives!

## Your Task

Write the function:
^int apply_damage(int hp, int damage);^
which computes and returns ^hp - damage^.

In ^main^:
1. Read initial ^hp^ and ^damage^ from standard input.
2. Call ^apply_damage(hp, damage)^ to calculate remaining HP.
3. Print:
~~~
Original HP: <hp>
Damage Dealt: <damage>
Remaining HP: <remaining>
~~~`,
      terms: [
        { term: 'pass-by-value', def: 'The argument-passing mechanism where values are copied; changes inside the callee do not affect caller variables.' },
        { term: 'stack frame', def: 'A dedicated block of memory allocated automatically whenever a function is called, storing its local variables.' },
        { term: 'scope', def: 'The region of code where a variable is visible and accessible.' },
      ],
      starter: L`#include <stdio.h>

// TODO: Prototype for apply_damage

int main(void) {
    int hp = 0;
    int damage = 0;

    // TODO: Read hp and damage from stdin
    // Compute remaining HP using apply_damage
    // Print Original HP, Damage Dealt, and Remaining HP

    return 0;
}

// TODO: Implement apply_damage
`,
      solution: L`#include <stdio.h>

int apply_damage(int hp, int damage);

int main(void) {
    int hp = 0;
    int damage = 0;

    if (scanf("%d %d", &hp, &damage) == 2) {
        int remaining = apply_damage(hp, damage);
        printf("Original HP: %d\n", hp);
        printf("Damage Dealt: %d\n", damage);
        printf("Remaining HP: %d\n", remaining);
    }
    return 0;
}

int apply_damage(int hp, int damage) {
    return hp - damage;
}
`,
      hint: 'In apply_damage(int hp, int damage), return hp - damage; Print the three lines in main exactly matching the prompt.',
      tests: [
        {
          name: 'Direct Hit: 100 HP minus 35',
          stdin: '100 35',
          expected: 'Original HP: 100\nDamage Dealt: 35\nRemaining HP: 65',
        },
        {
          name: 'Boss Battle Strike: 500 HP minus 120',
          stdin: '500 120',
          expected: 'Original HP: 500\nDamage Dealt: 120\nRemaining HP: 380',
        },
        {
          name: 'Armor Deflected: 50 HP minus 5',
          stdin: '50 5',
          expected: 'Original HP: 50\nDamage Dealt: 5\nRemaining HP: 45',
        },
      ],
    },
    {
      id: 'math-helpers',
      title: 'Math Helpers: Avengers Trajectory Calculations',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/math-helpers.svg',
        caption: 'Linking <math.h> for hardware-accelerated square roots and exponential powers.',
      },
      content: L`## Flight Diagnostics with JARVIS

When Tony Stark steps into the Mark VII Iron Man suit, JARVIS runs millions of flight calculations every second: calculating Euclidean radar distances to enemy Chitauri vessels, and calibrating the exact kinetic energy of repulsor blasts.

Standard C includes a comprehensive library of hardware-accelerated mathematical functions in ^<math.h>^.

## Key <math.h> Helpers

- ^sqrt(x)^ - Computes the square root of a double: ^sqrt(25.0) == 5.0^.
- ^pow(base, exp)^ - Computes base raised to the power of exp: ^pow(3.0, 2.0) == 9.0^.
- ^fabs(x)^ - Absolute value of a floating-point number.

## Formulas

1. **2D Euclidean Distance**:
   $$\text{distance} = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$
   In C: ^sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2))^

2. **Kinetic Energy**:
   $$\text{KE} = \frac{1}{2} \cdot \text{mass} \cdot \text{velocity}^2$$
   In C: ^0.5 * mass * pow(velocity, 2)^

## Predict & Observe

Why must we link with ^-lm^ in gcc when compiling math programs?
In Unix and Linux systems, math functions are kept in a separate library archive named ^libm^. The ^-lm^ flag tells the linker to fuse the hardware floating-point math routines into your final executable!

## Your Task

Implement two functions:
1. ^double calculate_distance(double x1, double y1, double x2, double y2);^
2. ^double kinetic_energy(double mass, double velocity);^

In ^main^:
Read 6 doubles from standard input: ^x1 y1 x2 y2 mass velocity^.
Call your helper functions and print:
~~~
Distance: <dist> km
Kinetic Energy: <ke> Joules
~~~
Format both outputs to 2 decimal places (^%.2f^).`,
      terms: [
        { term: '<math.h>', def: 'Standard C library header containing mathematical declarations such as sqrt, pow, sin, cos, and log.' },
        { term: 'sqrt()', def: 'A function that returns the non-negative square root of a non-negative floating-point number.' },
        { term: 'pow()', def: 'A function that raises a floating-point base number to a specified floating-point exponent.' },
        { term: 'double', def: 'A double-precision 64-bit floating point data type providing ~15 to 17 decimal digits of precision.' },
        { term: '-lm', def: 'The compiler linker flag that binds the standard system math library (libm) into the binary.' },
      ],
      starter: L`#include <stdio.h>
#include <math.h>

// TODO: Write prototypes for calculate_distance and kinetic_energy

int main(void) {
    double x1 = 0, y1 = 0, x2 = 0, y2 = 0, mass = 0, velocity = 0;

    // TODO: Read 6 doubles using scanf("%lf %lf %lf %lf %lf %lf", ...)
    // Print Distance: %.2f km
    // Print Kinetic Energy: %.2f Joules

    return 0;
}

// TODO: Implement calculate_distance and kinetic_energy
`,
      solution: L`#include <stdio.h>
#include <math.h>

double calculate_distance(double x1, double y1, double x2, double y2);
double kinetic_energy(double mass, double velocity);

int main(void) {
    double x1 = 0, y1 = 0, x2 = 0, y2 = 0, mass = 0, velocity = 0;

    if (scanf("%lf %lf %lf %lf %lf %lf", &x1, &y1, &x2, &y2, &mass, &velocity) == 6) {
        double dist = calculate_distance(x1, y1, x2, y2);
        double ke = kinetic_energy(mass, velocity);

        printf("Distance: %.2f km\n", dist);
        printf("Kinetic Energy: %.2f Joules\n", ke);
    }
    return 0;
}

double calculate_distance(double x1, double y1, double x2, double y2) {
    return sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
}

double kinetic_energy(double mass, double velocity) {
    return 0.5 * mass * pow(velocity, 2);
}
`,
      hint: 'Include <math.h>. Use %lf in scanf to read double values. In calculate_distance use sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2)).',
      tests: [
        {
          name: 'Classic 3-4-5 Triangle Trajectory',
          stdin: '0.0 0.0 3.0 4.0 10.0 20.0',
          expected: 'Distance: 5.00 km\nKinetic Energy: 2000.00 Joules',
        },
        {
          name: 'High Velocity Projectile',
          stdin: '10.0 20.0 16.0 28.0 2.5 100.0',
          expected: 'Distance: 10.00 km\nKinetic Energy: 12500.00 Joules',
        },
      ],
    },
    {
      id: 'unit-3-test',
      title: 'Unit 3 Test: Superhero Power Level Analyzer',
      isUnitTest: true,
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/unit-3-test.svg',
        caption: 'The complete Avengers Threat Matrix modular function suite.',
      },
      content: L`## Mission Briefing: Avengers Threat Assessment

Nick Fury and S.H.I.E.L.D. need a certified tactical analyzer to grade emerging superhumans into threat tiers before assembling the next Avengers roster.

In this Unit 3 Test, you will demonstrate mastery of modular C software design:
- Splitting tasks into clean, single-responsibility functions.
- Defining precise function prototypes.
- Mathematical weighting calculations.
- Multi-tier conditional evaluation.

## Required Functions

You must declare prototypes and implement three functions:

1. ^double calculate_threat(int strength, int speed, int intellect);^
   Computes and returns the weighted threat index:
   $$\text{threat} = (\text{strength} \times 1.5) + (\text{speed} \times 1.2) + (\text{intellect} \times 2.0)$$

2. ^char classify_tier(double threat);^
   Evaluates the threat index and returns an ASCII tier letter:
   - If ^threat >= 100.0^ &rarr; return ^'S'^ (Cosmic / Omega Level)
   - Else if ^threat >= 75.0^ &rarr; return ^'A'^ (Global Avenger)
   - Else if ^threat >= 50.0^ &rarr; return ^'B'^ (City Defender)
   - Else &rarr; return ^'C'^ (Local Vigilante)

3. ^void print_hero_dossier(int strength, int speed, int intellect);^
   Calls ^calculate_threat^ and ^classify_tier^, then prints the formatted dossier:
   ~~~
   --- HERO DOSSIER ---
   Stats: STR <strength> | SPD <speed> | INT <intellect>
   Threat Index: <threat>
   Rank: Tier <tier>
   ~~~
   Format the ^Threat Index^ to 1 decimal place (^%.1f^).

## Main Program

Inside ^main^, read three integers from standard input:
^strength speed intellect^
and call ^print_hero_dossier(strength, speed, intellect);^.

## Example

Input:
~~~
30 25 35
~~~

Calculation:
$$\text{threat} = (30 \times 1.5) + (25 \times 1.2) + (35 \times 2.0) = 45.0 + 30.0 + 70.0 = 145.0$$
$$\text{tier} = \text{'S'}$$

Output:
~~~
--- HERO DOSSIER ---
Stats: STR 30 | SPD 25 | INT 35
Threat Index: 145.0
Rank: Tier S
~~~`,
      terms: [
        { term: 'modular design', def: 'Structuring software as separate, interchangeable subroutines that each handle one specific sub-problem.' },
        { term: 'single responsibility', def: 'The programming principle that each function should do one thing and do it well.' },
        { term: 'weighted calculation', def: 'A formula where different variables contribute according to assigned importance multipliers.' },
      ],
      starter: L`#include <stdio.h>

// TODO: Prototypes for calculate_threat, classify_tier, and print_hero_dossier

int main(void) {
    int str = 0, spd = 0, intel = 0;

    // TODO: Read str, spd, intel from stdin and call print_hero_dossier

    return 0;
}

// TODO: Implement calculate_threat, classify_tier, and print_hero_dossier
`,
      solution: L`#include <stdio.h>

double calculate_threat(int strength, int speed, int intellect);
char classify_tier(double threat);
void print_hero_dossier(int strength, int speed, int intellect);

int main(void) {
    int str = 0, spd = 0, intel = 0;

    if (scanf("%d %d %d", &str, &spd, &intel) == 3) {
        print_hero_dossier(str, spd, intel);
    }
    return 0;
}

double calculate_threat(int strength, int speed, int intellect) {
    return (strength * 1.5) + (speed * 1.2) + (intellect * 2.0);
}

char classify_tier(double threat) {
    if (threat >= 100.0) {
        return 'S';
    } else if (threat >= 75.0) {
        return 'A';
    } else if (threat >= 50.0) {
        return 'B';
    } else {
        return 'C';
    }
}

void print_hero_dossier(int strength, int speed, int intellect) {
    double threat = calculate_threat(strength, speed, intellect);
    char tier = classify_tier(threat);

    printf("--- HERO DOSSIER ---\n");
    printf("Stats: STR %d | SPD %d | INT %d\n", strength, speed, intellect);
    printf("Threat Index: %.1f\n", threat);
    printf("Rank: Tier %c\n", tier);
}
`,
      hint: 'In calculate_threat, return (strength * 1.5) + (speed * 1.2) + (intellect * 2.0). In classify_tier check >= 100 for S, >= 75 for A, >= 50 for B, else C.',
      tests: [
        {
          name: 'Omega Level Champion (Tier S)',
          stdin: '30 25 35',
          expected: '--- HERO DOSSIER ---\nStats: STR 30 | SPD 25 | INT 35\nThreat Index: 145.0\nRank: Tier S',
        },
        {
          name: 'Global Defender (Tier A)',
          stdin: '20 15 20',
          expected: '--- HERO DOSSIER ---\nStats: STR 20 | SPD 15 | INT 20\nThreat Index: 88.0\nRank: Tier A',
        },
        {
          name: 'City Patrol Hero (Tier B)',
          stdin: '15 15 10',
          expected: '--- HERO DOSSIER ---\nStats: STR 15 | SPD 15 | INT 10\nThreat Index: 60.5\nRank: Tier B',
        },
        {
          name: 'Local Street Vigilante (Tier C)',
          stdin: '10 10 10',
          expected: '--- HERO DOSSIER ---\nStats: STR 10 | SPD 10 | INT 10\nThreat Index: 47.0\nRank: Tier C',
        },
      ],
    },
  ],
};
