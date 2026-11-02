// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'logic-loops',
  title: 'Logic, Decision Making & Loops',
  lessons: [
    {
      id: 'if-else',
      title: 'Branching: The Matrix Choice',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/if-else.svg',
        caption: 'Morpheus’s choice: how conditional if/else if/else branches guide code down distinct pathways.',
      },
      content: L`## The Red Pill or The Blue Pill

In *The Matrix*, Morpheus presents Neo with the ultimate choice:
*"You take the blue pill, the story ends, you wake up in your bed... You take the red pill, you stay in Wonderland, and I show you how deep the rabbit hole goes."*

Computers make decisions using **conditional branching**. By evaluating expressions that evaluate to **true** (non-zero in C) or **false** (zero), your program chooses which block of code to run.

## Syntax of if-else

~~~
if (condition) {
    // executes if condition is true
} else if (another_condition) {
    // executes if first is false and second is true
} else {
    // fallback if all above were false
}
~~~

## Comparison Operators

- ^==^ - Equal to (Notice: two equal signs! A single ^=^ is assignment).
- ^!=^ - Not equal to.
- ^>^ and ^<^ - Greater than and less than.
- ^>=^ and ^<=^ - Greater than or equal to, less than or equal to.

## Predict & Observe

What is the single most notorious bug in beginner C code? Writing ^if (choice = 1)^ instead of ^if (choice == 1)^! A single ^=^ assigns the value ^1^ to ^choice^, which evaluates to true every single time regardless of what the user chose. Always use double equals for comparisons.

## Your Task

Read an integer ^choice^ from standard input using ^scanf^:
- If ^choice == 1^, print:
  ^Red Pill chosen: You stay in Wonderland.^
- If ^choice == 2^, print:
  ^Blue Pill chosen: The story ends, wake up in your bed.^
- Otherwise (any other number), print:
  ^Unknown signal: The Matrix glitches.^

Remember to end each output with a newline (^\n^).`,
      terms: [
        { term: 'conditional branching', def: 'The ability of a program to execute different instructions depending on whether a condition is true or false.' },
        { term: 'if statement', def: 'A control structure that executes an inner block of code only when its condition expression evaluates to true (non-zero).' },
        { term: 'else / else if', def: 'Alternative paths executed when preceding if conditions evaluate to false.' },
        { term: 'equality operator (==)', def: 'Compares two values and evaluates to 1 (true) if they match, or 0 (false) if they differ.' },
      ],
      starter: L`#include <stdio.h>

int main(void) {
    int choice = 0;

    // TODO: Read choice from standard input with scanf
    // Write if / else if / else branching to handle choices 1, 2, and other

    return 0;
}
`,
      solution: L`#include <stdio.h>

int main(void) {
    int choice = 0;

    if (scanf("%d", &choice) == 1) {
        if (choice == 1) {
            printf("Red Pill chosen: You stay in Wonderland.\n");
        } else if (choice == 2) {
            printf("Blue Pill chosen: The story ends, wake up in your bed.\n");
        } else {
            printf("Unknown signal: The Matrix glitches.\n");
        }
    }
    return 0;
}
`,
      hint: 'Check if (choice == 1), else if (choice == 2), and else for all other numbers. Use == for comparisons.',
      tests: [
        {
          name: 'Pill Choice 1: Red Pill',
          stdin: '1',
          expected: 'Red Pill chosen: You stay in Wonderland.',
        },
        {
          name: 'Pill Choice 2: Blue Pill',
          stdin: '2',
          expected: 'Blue Pill chosen: The story ends, wake up in your bed.',
        },
        {
          name: 'Unexpected Glitch Input',
          stdin: '42',
          expected: 'Unknown signal: The Matrix glitches.',
        },
      ],
    },
    {
      id: 'switch-case',
      title: 'Switch Statements: The Jukebox Selector',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/switch-case.svg',
        caption: 'The switch jump table: matching discrete labels and using break to cleanly exit.',
      },
      content: L`## The Jukebox Mode Selector

Picture an old-school diner jukebox or Spotify's playback bar: you press a single button to toggle **Shuffle**, **Repeat**, or **Autoplay**.

When you need to compare a single variable against many discrete integer or character constants, a chain of ten ^if-else^ statements gets messy. C gives you the ^switch^ statement—a lightning-fast **jump table** that leaps directly to the matching case.

## Anatomy of a Switch

~~~
char mode;
scanf(" %c", &mode);

switch (mode) {
    case 'S':
        printf("Mode [S]: Shuffle enabled.\n");
        break;
    case 'R':
        printf("Mode [R]: Repeat enabled.\n");
        break;
    case 'A':
        printf("Mode [A]: Autoplay enabled.\n");
        break;
    default:
        printf("Mode [?]: Standard playback.\n");
        break;
}
~~~

Notice:
- Each ^case^ ends with a colon (^:^).
- ^break;^ is essential! If you forget ^break;^, C will **fall through** and execute all the subsequent cases below it, whether they matched or not!
- ^default:^ runs if none of the cases matched (like the final ^else^ in an if-else chain).
- In ^scanf(" %c", &mode)^, the leading space skips any whitespace or newline left in the buffer.

## Predict & Observe

What happens if you remove the ^break;^ after ^case 'S':^? If the user inputs ^'S'^, the program will print the Shuffle message *and* immediately print the Repeat message! Fallthrough is occasionally intentional in advanced C, but 99% of the time, missing a ^break^ is a classic bug.

## Your Task

Read a single character ^mode^ from standard input.
Using a ^switch^ statement:
- Case ^'S'^: print ^Mode [S]: Shuffle enabled.^
- Case ^'R'^: print ^Mode [R]: Repeat enabled.^
- Case ^'A'^: print ^Mode [A]: Autoplay enabled.^
- Default: print ^Mode [?]: Standard playback.^`,
      terms: [
        { term: 'switch', def: 'A control structure that tests a variable against a list of constant values (cases).' },
        { term: 'case', def: 'A label inside a switch representing a specific constant value to match.' },
        { term: 'break', def: 'A statement that immediately exits the switch block, preventing fallthrough.' },
        { term: 'default', def: 'The fallback case in a switch statement that runs when no other case matches.' },
        { term: 'fallthrough', def: 'The behavior where execution continues into subsequent cases when break is omitted.' },
      ],
      starter: L`#include <stdio.h>

int main(void) {
    char mode = ' ';

    // TODO: Read mode using scanf(" %c", &mode)
    // Implement switch (mode) with cases 'S', 'R', 'A', and default

    return 0;
}
`,
      solution: L`#include <stdio.h>

int main(void) {
    char mode = ' ';

    if (scanf(" %c", &mode) == 1) {
        switch (mode) {
            case 'S':
                printf("Mode [S]: Shuffle enabled.\n");
                break;
            case 'R':
                printf("Mode [R]: Repeat enabled.\n");
                break;
            case 'A':
                printf("Mode [A]: Autoplay enabled.\n");
                break;
            default:
                printf("Mode [?]: Standard playback.\n");
                break;
        }
    }
    return 0;
}
`,
      hint: 'Remember to include break; at the end of each case, and put a space before %c in scanf(" %c", &mode).',
      tests: [
        {
          name: 'Shuffle Mode',
          stdin: 'S',
          expected: 'Mode [S]: Shuffle enabled.',
        },
        {
          name: 'Repeat Mode',
          stdin: 'R',
          expected: 'Mode [R]: Repeat enabled.',
        },
        {
          name: 'Autoplay Mode',
          stdin: 'A',
          expected: 'Mode [A]: Autoplay enabled.',
        },
        {
          name: 'Default Fallback Mode',
          stdin: 'Z',
          expected: 'Mode [?]: Standard playback.',
        },
      ],
    },
    {
      id: 'while-for-loops',
      title: 'Loops: Groundhog Day & Training Montages',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/while-for-loops.svg',
        caption: 'The four-phase lifecycle of a loop: initialize, condition check, execute body, and step.',
      },
      content: L`## Repeating Until the Mission is Complete

In the classic movie *Groundhog Day*, Bill Murray is trapped in a loop, waking up at 6:00 AM to the same radio alarm every single day until he figures out how to live a meaningful life. In *Rocky*, the training montage shows repetition after repetition until the boxer is ready for the championship fight.

Computers never get tired. A loop lets a CPU repeat a block of instructions thousands, millions, or billions of times without breaking a sweat.

## The for Loop

The most common loop in C is the ^for^ loop, which bundles initialization, condition check, and step into one clean line:

~~~
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}
~~~

Output: ^0 1 2 3 4 ^

- ^int i = 0;^ - **Initialization**: creates a counter variable ^i^ (runs once at start).
- ^i < 5;^ - **Condition**: checked before every repetition. If true, loop continues; if false, loop stops.
- ^i++^ - **Step**: increments ^i^ by 1 after each pass.

## Accumulating Values

Loops often calculate running totals using an **accumulator**:

~~~
int sum = 0;
for (int i = 1; i <= n; i++) {
    sum += i; // Equivalent to: sum = sum + i;
}
~~~

## Predict & Observe

What happens if your condition is always true, such as ^for (int i = 5; i > 0; i++)^?
Because ^i^ starts at 5 and keeps growing, ^i > 0^ is never false. This creates an **infinite loop**. The CPU will run at 100% until your operating system or timeout kills it!

## Your Task

Read an integer ^n^ from standard input.
1. Print a countdown starting at ^n^ down to ^1^ separated by spaces, followed by ^BLASTOFF!^:
   Example for n = 5:
   ^Countdown: 5 4 3 2 1 BLASTOFF!^
2. Using a loop, calculate the sum of all integers from ^1^ to ^n^. On a new line, print:
   ^Sum: <sum>^`,
      terms: [
        { term: 'loop', def: 'A control structure that repeats a block of instructions while a condition remains true.' },
        { term: 'for loop', def: 'A loop that packs initialization, condition, and increment into a single header statement.' },
        { term: 'accumulator', def: 'A variable initialized before a loop used to collect running sums or products.' },
        { term: 'infinite loop', def: 'A defect where a loop condition never becomes false, freezing program execution.' },
        { term: 'increment / decrement', def: 'Operators (++ and --) that add or subtract 1 from an integer.' },
      ],
      starter: L`#include <stdio.h>

int main(void) {
    int n = 0;

    // TODO: Read n from stdin
    // Print "Countdown: " followed by n down to 1 and "BLASTOFF!\n"
    // Calculate and print "Sum: <sum>\n"

    return 0;
}
`,
      solution: L`#include <stdio.h>

int main(void) {
    int n = 0;

    if (scanf("%d", &n) == 1) {
        printf("Countdown: ");
        for (int i = n; i >= 1; i--) {
            printf("%d ", i);
        }
        printf("BLASTOFF!\n");

        int sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }
        printf("Sum: %d\n", sum);
    }
    return 0;
}
`,
      hint: 'Use for (int i = n; i >= 1; i--) for countdown, and another loop to compute sum += i from 1 to n.',
      tests: [
        {
          name: 'Five Second Launch',
          stdin: '5',
          expected: 'Countdown: 5 4 3 2 1 BLASTOFF!\nSum: 15',
        },
        {
          name: 'Three Second Quick Launch',
          stdin: '3',
          expected: 'Countdown: 3 2 1 BLASTOFF!\nSum: 6',
        },
        {
          name: 'Immediate Launch (n=1)',
          stdin: '1',
          expected: 'Countdown: 1 BLASTOFF!\nSum: 1',
        },
      ],
    },
    {
      id: 'unit-2-test',
      title: 'Unit 2 Test: Retro Arcade Level Progression & High Score Filter',
      isUnitTest: true,
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/unit-2-test.svg',
        caption: 'Processing streams of arcade tournament scores, filtering qualifiers and tracking the peak high score.',
      },
      content: L`## Mission Briefing: The Neon Arcade Championship

You are programming the main tournament screen for a 1980s retro arcade (think *Tron*, *Pac-Man*, and *Stranger Things* Palace Arcade). Contenders from across the city are feeding tokens into the machines. Your C program must process incoming player scores in real-time, filter out players who meet the qualification threshold, and preserve the ultimate high score on the leaderboard.

In this Unit 2 Test, you will synthesize:
- Loops and iteration counters.
- Conditional statements and comparisons (^>=^).
- Accumulating running statistics (qualifier count and high score peak).
- Structured console output formatting.

## Specification

1. Read an integer ^n^: the number of players participating.
2. In a loop from player ^1^ to ^n^:
   - Read that player's integer ^score^.
   - If ^score >= 1000^:
     Print: ^Player <index>: <score> [QUALIFIED]^
     Increment the count of qualified players.
     If this ^score^ is greater than the current high score, update the high score.
   - Else (^score < 1000^):
     Print: ^Player <index>: <score> [TRY AGAIN]^
3. After evaluating all players, print the tournament roster summary:
   ~~~
   --- TOURNAMENT ROSTER ---
   Qualified: <qualified_count> / <n>
   High Score: <high_score>
   ~~~

Note: If no player qualifies (or all scores are under 1000), ^High Score^ should remain ^0^.

## Example

Input:
~~~
4
1200 450 3400 950
~~~

Output:
~~~
Player 1: 1200 [QUALIFIED]
Player 2: 450 [TRY AGAIN]
Player 3: 3400 [QUALIFIED]
Player 4: 950 [TRY AGAIN]
--- TOURNAMENT ROSTER ---
Qualified: 2 / 4
High Score: 3400
~~~`,
      terms: [
        { term: 'stream processing', def: 'Reading and evaluating sequential items one by one inside a loop.' },
        { term: 'threshold filtering', def: 'Testing each data element against a minimum criterion to qualify or discard.' },
        { term: 'maximum tracking', def: 'An algorithm that compares each item against a peak record variable, replacing it when higher.' },
      ],
      starter: L`#include <stdio.h>

int main(void) {
    int n = 0;

    // TODO: Read n (number of players)
    // Loop through each player from 1 to n
    // Read their score, print [QUALIFIED] or [TRY AGAIN]
    // Track qualified count and high score
    // Print the final --- TOURNAMENT ROSTER ---

    return 0;
}
`,
      solution: L`#include <stdio.h>

int main(void) {
    int n = 0;

    if (scanf("%d", &n) == 1) {
        int qualified = 0;
        int high_score = 0;

        for (int i = 1; i <= n; i++) {
            int score = 0;
            if (scanf("%d", &score) == 1) {
                if (score >= 1000) {
                    printf("Player %d: %d [QUALIFIED]\n", i, score);
                    qualified++;
                    if (score > high_score) {
                        high_score = score;
                    }
                } else {
                    printf("Player %d: %d [TRY AGAIN]\n", i, score);
                }
            }
        }

        printf("--- TOURNAMENT ROSTER ---\n");
        printf("Qualified: %d / %d\n", qualified, n);
        printf("High Score: %d\n", high_score);
    }
    return 0;
}
`,
      hint: 'Loop from i = 1 to n. Inside the loop, read each score. If score >= 1000, qualified++ and check if score > high_score.',
      tests: [
        {
          name: 'Mixed Roster of 4 Players',
          stdin: '4\n1200 450 3400 950',
          expected: 'Player 1: 1200 [QUALIFIED]\nPlayer 2: 450 [TRY AGAIN]\nPlayer 3: 3400 [QUALIFIED]\nPlayer 4: 950 [TRY AGAIN]\n--- TOURNAMENT ROSTER ---\nQualified: 2 / 4\nHigh Score: 3400',
        },
        {
          name: 'All Star Trio (100% Qualify)',
          stdin: '3\n1500 2200 1800',
          expected: 'Player 1: 1500 [QUALIFIED]\nPlayer 2: 2200 [QUALIFIED]\nPlayer 3: 1800 [QUALIFIED]\n--- TOURNAMENT ROSTER ---\nQualified: 3 / 3\nHigh Score: 2200',
        },
        {
          name: 'Under-levelled Duo (0 Qualify)',
          stdin: '2\n500 700',
          expected: 'Player 1: 500 [TRY AGAIN]\nPlayer 2: 700 [TRY AGAIN]\n--- TOURNAMENT ROSTER ---\nQualified: 0 / 2\nHigh Score: 0',
        },
      ],
    },
  ],
};
