// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'foundations',
  title: 'Foundations of C & Standard I/O',
  lessons: [
    {
      id: 'hello-c',
      title: 'Hello, C: The Origin Story',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/hello-c.svg',
        caption: 'The C build pipeline: source code compiles into native machine instructions that write directly to stdout.',
      },
      content: L`## The Origin of Modern Computing

In 1972 at Bell Labs, Dennis Ritchie sat down to build an operating system named Unix. He needed a language that was as blindingly fast as raw assembly machine code, yet clean enough for human beings to read. He created **C**.

Like Daft Punk's anthem *"Harder, Better, Faster, Stronger"* or Taylor Swift boldly stepping into Manhattan in *"Welcome to New York"*, C stripped away every ounce of fluff. It gives you direct, uninhibited control over the computer's CPU and memory. Fifty years later, the foundations of the digital world—Windows, Linux, macOS, Python, game engines, and the flight computers on NASA spacecraft—are all written in C.

## Anatomy of a C Program

~~~
#include <stdio.h>

int main(void) {
    printf("Hello, World!\n");
    return 0;
}
~~~

Let's break down every single piece with zero assumed knowledge:

- ^#include <stdio.h>^ - This is a **preprocessor directive**. Think of it as opening a toolbox. It tells the compiler to grab standard input and output tools (like ^printf^) before building your program.
- ^int main(void)^ - The main stage door. Every C program begins running at the ^main^ function. The ^int^ means this function finishes by handing an integer number back to the operating system. ^void^ inside the parentheses means "takes no input parameters".
- ^{ ... }^ - Curly braces group together the block of instructions that belong to the function.
- ^printf("Hello, World!\n");^ - A function call that prints text to the screen (**standard output**). The ^\n^ is an **escape sequence** representing a newline character, just like pressing Enter on your keyboard.
- ^;^ - Every individual instruction (statement) in C must terminate with a semicolon.
- ^return 0;^ - By convention, returning ^0^ to the operating system means: *"Everything ran cleanly with zero errors!"*

## Predict & Observe

What happens if you remove the ^\n^ from inside the quotes? The text still prints, but any next program running in your terminal would print right on the same line! What happens if you remove the semicolon? The C compiler stops dead in its tracks and refuses to build your binary.

## Your Task

Write a complete, valid C program inside ^main.c^ that:
1. Includes the ^<stdio.h>^ header.
2. Defines the ^main^ function.
3. Uses ^printf^ to print ^Hello, World!^ followed by a newline (^\n^).
4. Returns ^0^ to signal clean execution.`,
      terms: [
        { term: 'compiler', def: 'A program (like GCC) that translates human-readable C source code into machine code that your CPU executes.' },
        { term: '#include', def: 'A preprocessor command that pulls in standard library headers before compilation begins.' },
        { term: '<stdio.h>', def: 'Standard Input/Output header file, providing printf, scanf, and stream tools.' },
        { term: 'main', def: 'The mandatory starting point and entry function for every C program.' },
        { term: 'printf', def: 'A standard library function that formats and prints text to the terminal screen.' },
        { term: 'newline (\\n)', def: 'A special escape character that moves the cursor down to the start of the next line.' },
        { term: 'return 0', def: 'An exit code sent back to the operating system signaling successful program termination.' },
      ],
      starter: L`#include <stdio.h>

int main(void) {
    // Print "Hello, World!\n" below and return 0

    return 1;
}
`,
      solution: L`#include <stdio.h>

int main(void) {
    printf("Hello, World!\n");
    return 0;
}
`,
      hint: 'Include <stdio.h>, call printf("Hello, World!\\n"); inside main, and end with return 0;',
      tests: [
        {
          name: 'Prints Hello, World!',
          expected: 'Hello, World!',
        },
      ],
    },
    {
      id: 'format-specifiers',
      title: 'Format Specifiers: The Universal Translator',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/format-specifiers.svg',
        caption: 'How printf format specifiers map placeholders (%s, %c, %d, %.1f) directly to supplied variables.',
      },
      content: L`## Speaking Every Data Type Fluently

In *Star Wars*, the golden droid C-3PO is fluent in over six million forms of communication. In C, ^printf^ is your program's universal translator.

Because C is a **statically typed** language, numbers, letters, and text are stored as fundamentally different patterns of magnetic charges in your hardware. To display them, ^printf^ relies on **format specifiers**—special placeholders beginning with a percent sign (^%^) that tell C how to translate each byte into readable characters on your screen.

## The Core Four Format Specifiers

- ^%d^ - Decimal Integer (e.g. ^42^, ^-7^).
- ^%f^ - Floating-point decimal (e.g. ^3.141592^). Use ^%.1f^ or ^%.2f^ to specify how many decimal places to round to!
- ^%c^ - A single character enclosed in single quotes (e.g. ^'A'^, ^'!'^).
- ^%s^ - A string of characters enclosed in double quotes (e.g. ^"Starliner"^).
- ^%%^ - Prints a literal percent sign symbol.

Look at how arguments match placeholders in order:

~~~
char grade = 'A';
int crew = 42;
float fuel = 98.75f;
const char ship[] = "Starliner";

printf("Ship: %s [%c] | Crew: %d | Fuel: %.1f%%\n", ship, grade, crew, fuel);
~~~

Output:
~~~
Ship: Starliner [A] | Crew: 42 | Fuel: 98.8%
~~~

Notice how ^%.1f^ neatly rounded ^98.75^ up to ^98.8^, and ^%%^ produced the single ^%^ character.

## Predict & Observe

What happens if you accidentally pass a float into ^%d^? C will not give you a polite warning; it will re-interpret the floating-point bit pattern as an integer, producing wildly incorrect garbage numbers. Precision and matching types is everything in C!

## Your Task

The orbital transport console needs to report vessel telemetry. The variables ^grade^, ^crew^, ^fuel^, and ^ship^ are already declared for you.

Replace the placeholder in ^printf^ so the program outputs exactly:

~~~
Ship: Starliner [A] | Crew: 42 | Fuel: 98.8%
~~~`,
      terms: [
        { term: 'format specifier', def: 'A placeholder starting with % that tells printf how to interpret and print variable data.' },
        { term: '%d', def: 'Format placeholder for signed decimal integers.' },
        { term: '%f', def: 'Format placeholder for single or double precision floating-point numbers.' },
        { term: '%.1f', def: 'Format modifier that rounds a float to exactly 1 decimal digit.' },
        { term: '%c', def: 'Format placeholder for a single ASCII character.' },
        { term: '%s', def: 'Format placeholder for a null-terminated string of characters.' },
      ],
      starter: L`#include <stdio.h>

int main(void) {
    char grade = 'A';
    int crew = 42;
    float fuel = 98.75f;
    const char ship[] = "Starliner";

    // Use printf with %s, %c, %d, and %.1f to print the telemetry line:
    printf("TODO\n");
    return 0;
}
`,
      solution: L`#include <stdio.h>

int main(void) {
    char grade = 'A';
    int crew = 42;
    float fuel = 98.75f;
    const char ship[] = "Starliner";

    printf("Ship: %s [%c] | Crew: %d | Fuel: %.1f%%\n", ship, grade, crew, fuel);
    return 0;
}
`,
      hint: 'Use printf("Ship: %s [%c] | Crew: %d | Fuel: %.1f%%\\n", ship, grade, crew, fuel);',
      tests: [
        {
          name: 'Telemetry line printed accurately',
          expected: 'Ship: Starliner [A] | Crew: 42 | Fuel: 98.8%',
        },
      ],
    },
    {
      id: 'scanf-input',
      title: 'Reading Input with scanf: Address Required',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/scanf-input.svg',
        caption: 'Why scanf requires the & (address-of) operator to drop values into physical RAM cells.',
      },
      content: L`## Delivery to a Physical Address

When an owl delivers a letter to Harry Potter at *"The Cupboard under the Stairs, 4 Privet Drive"*, the owl doesn't just drop the letter into thin air. It needs the exact physical street address of the destination.

In C, variables reside in physical cells of your computer's RAM. When you want to read user input from the keyboard, the standard function is ^scanf^. But ^scanf^ cannot do its job if you only give it the name of the variable: it needs the **address** of where that variable lives in memory.

That is why we use the **address-of operator** (^&^).

## How scanf Works

~~~
int age;
printf("Enter age: ");
scanf("%d", &age);
~~~

- ^"%d"^ tells ^scanf^ to parse characters typed by the user as a decimal integer.
- ^&age^ gives ^scanf^ the memory pointer to the exact bytes where ^age^ is stored.
- As soon as the user presses Enter, ^scanf^ writes the parsed number directly into that memory cell.

To read multiple values separated by spaces, you can supply multiple specifiers:

~~~
int level;
int xp;
scanf("%d %d", &level, &xp);
~~~

## Predict & Observe

What happens if you accidentally write ^scanf("%d", level);^ without the ^&^?
The program will treat the current uninitialized value of ^level^ (say, ^0^) as a memory address and attempt to write data there. The operating system detects this illegal memory access and instantly kills your program with a **Segmentation Fault (core dumped)**!

## Your Task

Read two integers from standard input:
1. The player's ^level^.
2. The player's ^xp^.

Then print the formatted profile string:

~~~
Player Level: <level>, XP: <xp>
~~~`,
      terms: [
        { term: 'scanf', def: 'A standard C function that reads formatted input from the standard input stream (keyboard).' },
        { term: 'address-of operator (&)', def: 'A unary operator that evaluates to the physical memory address of a variable.' },
        { term: 'segmentation fault', def: 'A fatal runtime error that occurs when a program attempts to access memory it does not own.' },
        { term: 'stdin', def: 'Standard input stream, typically characters fed from keyboard or piped input.' },
      ],
      starter: L`#include <stdio.h>

int main(void) {
    int level = 0;
    int xp = 0;

    // Use scanf to read level and xp from stdin into &level and &xp

    printf("Player Level: %d, XP: %d\n", level, xp);
    return 0;
}
`,
      solution: L`#include <stdio.h>

int main(void) {
    int level = 0;
    int xp = 0;

    if (scanf("%d %d", &level, &xp) == 2) {
        printf("Player Level: %d, XP: %d\n", level, xp);
    }
    return 0;
}
`,
      hint: 'Use scanf("%d %d", &level, &xp); to read both values from standard input.',
      tests: [
        {
          name: 'Player Rank 10',
          stdin: '10 2500',
          expected: 'Player Level: 10, XP: 2500',
        },
        {
          name: 'Max Level Champion',
          stdin: '99 99999',
          expected: 'Player Level: 99, XP: 99999',
        },
        {
          name: 'Rookie Starter',
          stdin: '1 50',
          expected: 'Player Level: 1, XP: 50',
        },
      ],
    },
    {
      id: 'unit-1-test',
      title: 'Unit 1 Test: Pop Concert Ticket Calculator',
      isUnitTest: true,
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/unit-1-test.svg',
        caption: 'The complete concert ticket calculation and thermal receipt printing pipeline.',
      },
      content: L`## Mission Briefing: Box Office Grand Opening

You have been hired as lead systems engineer for the world tour ticketing engine (think Taylor Swift's *Eras Tour* meets Daft Punk's *Alive*). Millions of fans are in queue, and the box office terminal must run with zero lag, zero memory leaks, and 100% mathematical accuracy down to the cent.

In this Unit 1 Test, you will combine everything you have learned:
- Header inclusion and ^main^ function structure.
- Reading formatted inputs from standard input using ^scanf^ and ^&^.
- Floating-point calculations.
- Formatting currency outputs strictly to 2 decimal places (^%.2f^).

## Mathematical Specification

Given:
- ^tickets^ (integer): The number of tickets purchased.
- ^price^ (float): The base price per ticket.

Calculate:
1. ^subtotal = tickets * price^
2. ^tax = subtotal * 0.08^ (8% municipal entertainment tax)
3. ^total = subtotal + tax^

## Required Receipt Output Format

~~~
--- CONCERT RECEIPT ---
Tickets: <tickets> @ $<price>
Subtotal: $<subtotal>
Tax: $<tax>
Total: $<total>
~~~

All monetary values (^price^, ^subtotal^, ^tax^, ^total^) must be formatted with ^%.2f^.

## Example

Input:
~~~
2 89.50
~~~

Output:
~~~
--- CONCERT RECEIPT ---
Tickets: 2 @ $89.50
Subtotal: $179.00
Tax: $14.32
Total: $193.32
~~~`,
      terms: [
        { term: 'subtotal', def: 'The initial cost before sales tax is applied (count multiplied by unit price).' },
        { term: 'floating-point precision', def: 'Specifying exact decimal rounding in printf using syntax like %.2f.' },
        { term: 'receipt layout', def: 'Structured console text formatting mimicking physical retail thermal printers.' },
      ],
      starter: L`#include <stdio.h>

int main(void) {
    int tickets = 0;
    float price = 0.0f;

    // TODO: Read tickets and price from standard input
    // Calculate subtotal, 8% tax (subtotal * 0.08f), and grand total
    // Print the formatted concert receipt

    return 0;
}
`,
      solution: L`#include <stdio.h>

int main(void) {
    int tickets = 0;
    float price = 0.0f;

    if (scanf("%d %f", &tickets, &price) == 2) {
        float subtotal = tickets * price;
        float tax = subtotal * 0.08f;
        float total = subtotal + tax;

        printf("--- CONCERT RECEIPT ---\n");
        printf("Tickets: %d @ $%.2f\n", tickets, price);
        printf("Subtotal: $%.2f\n", subtotal);
        printf("Tax: $%.2f\n", tax);
        printf("Total: $%.2f\n", total);
    }
    return 0;
}
`,
      hint: 'Read with scanf("%d %f", &tickets, &price). Compute subtotal, tax = subtotal * 0.08f, and total = subtotal + tax. Format every price as $%.2f',
      tests: [
        {
          name: 'Pair of General Admission Tickets',
          stdin: '2 89.50',
          expected: '--- CONCERT RECEIPT ---\nTickets: 2 @ $89.50\nSubtotal: $179.00\nTax: $14.32\nTotal: $193.32',
        },
        {
          name: 'Four VIP Floor Passes',
          stdin: '4 150.00',
          expected: '--- CONCERT RECEIPT ---\nTickets: 4 @ $150.00\nSubtotal: $600.00\nTax: $48.00\nTotal: $648.00',
        },
        {
          name: 'Single Balcony Ticket',
          stdin: '1 45.25',
          expected: '--- CONCERT RECEIPT ---\nTickets: 1 @ $45.25\nSubtotal: $45.25\nTax: $3.62\nTotal: $48.87',
        },
      ],
    },
  ],
};
