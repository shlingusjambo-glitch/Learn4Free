// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';
// Content format: ~~~ fenced code ~~~, ^inline code^, **bold**, "- " lists, "## " headings.
const L = String.raw;

module.exports = {
  id: 'getting-started',
  title: 'Getting Started',
  lessons: [
    {
      id: 'hello-world',
      title: 'Hello, World!',
      content: L`## What is a program?

A **program** is a list of instructions for a computer, like a recipe is a list of instructions for a cook. The computer follows the instructions one after another, from top to bottom. You write a program as **code**: text written in a **programming language**. Our language is **Rust**.

Before a computer can follow your code, a tool called a **compiler** translates it into the numbers the computer really understands. This translating step is called to **compile**. When you press Run, Learn4Free compiles your code and then **runs** it, which means the computer carries out the instructions.

## Your first program

Programs are built from **functions**. A **function** is a named group of instructions, like a recipe card with a title. Every Rust program must have a function named ^main^: the computer always starts there.

Inside ^main^ we use ^println!^ to **print**, which means to show text on the screen. The text we want to show is called a **string**: any text wrapped in double quotes ^"like this"^.

~~~
fn main() {
    println!("Hello, Rust!");
}
~~~

- ^fn main() {^ - ^fn^ is short for "function". This line says "here begins a function named main". The empty parentheses ^()^ mean it needs no extra information. The curly brace ^{^ opens the function's body (its instructions).
- ^println!("Hello, Rust!");^ - this is a **statement**, one complete instruction. ^println!^ is a **macro**: a special built-in helper that writes code for you (you can spot one by the ^!^ after its name). It prints the string and then moves to a new line. The **semicolon** ^;^ marks the end of the statement, like a full stop ends a sentence.
- ^}^ - the closing curly brace ends the function's body.

Output:

~~~
Hello, Rust!
~~~

The quote marks are not printed. They only tell Rust where the string starts and ends.

## Try it

Change the text between the quotes to your own name, then press Run. Then delete the semicolon and run again to see what an error message looks like. Put it back afterwards.

## Your task

Make the program print exactly this:

~~~
Hello, World!
~~~

Write one ^println!^ statement inside ^main^, replacing the comment. A **comment** is a note for humans that starts with ^//^ and is ignored by the computer.`,
      terms: [
        { term: 'program', def: 'A list of instructions that a computer follows from top to bottom.' },
        { term: 'compiler', def: 'A tool that translates your code into something the computer can run.' },
        { term: 'function', def: 'A named group of instructions; ^main^ is the one where every Rust program begins.' },
        { term: 'println!', def: 'A macro that prints text and then moves to a new line.' },
        { term: 'macro', def: 'A built-in helper whose name ends in ! and which writes code for you.' },
        { term: 'string', def: 'Text wrapped in double quotes, such as "Hello".' },
        { term: 'statement', def: 'One complete instruction; in Rust most end with a semicolon.' },
        { term: 'semicolon', def: 'The ; symbol that ends a statement, like a full stop in a sentence.' },
      ],
      starter: L`fn main() {
    // Print Hello, World! below

}
`,
      solution: L`fn main() {
    println!("Hello, World!");
}
`,
      hint: 'Use println!("...") with the text between double quotes.',
      tests: [{ expected: 'Hello, World!' }],
    },
    {
      id: 'multiple-lines',
      title: 'Printing Several Lines',
      content: L`## println! vs print!

Computers print text one piece at a time. ^println!^ prints text and then moves to a **new line**, like pressing Enter in a document. Its sibling ^print!^ prints text and stays on the same line, so the next thing printed continues right after it. Both are **macros** (built-in helpers whose names end in ^!^), and the text you give them is a **string** (text in double quotes).

~~~
fn main() {
    print!("Hello, ");
    println!("there!");
    println!("Bye!");
}
~~~

- ^print!("Hello, ");^ - prints ^Hello, ^ and stays on the same line. The **statement** (one complete instruction) ends with a semicolon.
- ^println!("there!");^ - continues on that same line with ^there!^, then moves to a new line.
- ^println!("Bye!");^ - prints ^Bye!^ on the new line.

Output:

~~~
Hello, there!
Bye!
~~~

Inside a string you can also write an **escape sequence**: a backslash ^\^ followed by a letter that stands for a character you cannot easily type. ^\n^ means "new line" and ^\t^ means "tab" (a wide gap). For example ^println!("A\nB");^ prints A and B on two lines.

## Try it

Change ^println!("there!");^ to ^print!("there!");^ and run it. What happens to ^Bye!^? Then try putting ^\n^ inside one of the strings.

## Your task

Print this poem, with one ^println!^ for each line:

~~~
Roses are red,
Violets are blue,
Rust is fun,
And so are you!
~~~

That is four ^println!^ statements, in the same order as the poem.`,
      terms: [
        { term: 'print!', def: 'A macro that prints text and stays on the same line.' },
        { term: 'println!', def: 'A macro that prints text and then moves to a new line.' },
        { term: 'new line', def: 'The point where text continues on the next line, like pressing Enter.' },
        { term: 'escape sequence', def: 'A backslash plus a letter inside a string that stands for a special character.' },
        { term: '\\n', def: 'The escape sequence for a new line.' },
        { term: '\\t', def: 'The escape sequence for a tab (a wide gap).' },
      ],
      starter: L`fn main() {

}
`,
      solution: L`fn main() {
    println!("Roses are red,");
    println!("Violets are blue,");
    println!("Rust is fun,");
    println!("And so are you!");
}
`,
      hint: 'Four println! calls, each ending with a semicolon.',
      tests: [{ expected: 'Roses are red,\nViolets are blue,\nRust is fun,\nAnd so are you!' }],
    },
    {
      id: 'placeholders',
      title: 'Placeholders',
      content: L`## Variables and placeholders

A **variable** is a labeled box that stores a value. You make one with the keyword ^let^. A **keyword** is a word that has a special meaning in Rust. The **value** is the thing inside the box, such as the string ^"Rust"^ or the number ^7^.

To put a variable's value inside printed text, use a **placeholder**: a pair of curly braces ^{}^ in the string that acts like a blank in a form. Rust fills each blank with a value you list after the string, in order. Text with placeholders is called a **format string**.

~~~
fn main() {
    let language = "Rust";
    let year = 2015;
    println!("I love {}!", language);
    println!("{} appeared in {}.", language, year);
    println!("I love {language}!");
}
~~~

- ^let language = "Rust";^ - makes a box labeled ^language^ and puts the string ^"Rust"^ in it. The ^=^ sign means "store this value".
- ^let year = 2015;^ - makes a box labeled ^year^ holding the number ^2015^. Numbers have no quotes.
- ^println!("I love {}!", language);^ - the ^{}^ blank is filled with the value of ^language^. The value comes after a comma.
- ^println!("{} appeared in {}.", language, year);^ - two blanks, filled in order: first ^language^, then ^year^.
- ^println!("I love {language}!");^ - a shortcut: you can write the variable's name inside the braces.

Output:

~~~
I love Rust!
Rust appeared in 2015.
I love Rust!
~~~

## Try it

Change the value of ^language^ to ^"Ferris"^ and run it. All the lines that use the variable change at once. That is the benefit of variables.

## Your task

The variables ^name^ and ^age^ are already made for you. Use one ^println!^ with two ^{}^ placeholders to print exactly:

~~~
Ferris is 7 years old.
~~~

Do not type the name or the age directly inside the string. Let the placeholders fill them in.`,
      terms: [
        { term: 'variable', def: 'A labeled box that stores a value.' },
        { term: 'let', def: 'The keyword that creates a new variable.' },
        { term: 'keyword', def: 'A word with a special built-in meaning in Rust.' },
        { term: 'value', def: 'A piece of data, such as a number or a string.' },
        { term: '{}', def: 'A placeholder: a blank in a format string that gets filled with a value.' },
        { term: 'format string', def: 'A string containing placeholders, used by println! and print!.' },
        { term: '=', def: 'In a let statement, stores the value on the right into the variable on the left.' },
      ],
      starter: L`fn main() {
    let name = "Ferris";
    let age = 7;

}
`,
      solution: L`fn main() {
    let name = "Ferris";
    let age = 7;
    println!("{} is {} years old.", name, age);
}
`,
      require: [{ re: 'println!\\s*\\(\\s*"[^"]*\\{[^"]*"', msg: 'Use {} placeholders in your println! format string.' }],
      hint: 'println!("{} is {} years old.", name, age);',
      tests: [{ expected: 'Ferris is 7 years old.' }],
    },
    {
      id: 'format-numbers',
      title: 'Formatting Numbers',
      content: L`## Controlling how values look

Rust has two main kinds of numbers. An **integer** is a whole number like ^42^. A **float** (floating-point number) has a decimal point, like ^3.14159^. Floats often have many digits, and you may want to show fewer.

Inside a placeholder you can add a colon ^:^ and a **format specifier**: a short code that says how to display the value. Some examples:

- ^{:.2}^ - show exactly 2 digits after the decimal point (rounded)
- ^{:5}^ - pad with spaces to a width of 5 characters
- ^{:>5}^ and ^{:<5}^ - right-align and left-align inside that width
- ^{:05}^ - pad with zeros to width 5
- ^{:?}^ - **debug format**, a plain display meant for programmers

~~~
fn main() {
    let pi = 3.14159;
    let n = 42;
    println!("{:.1}", pi);
    println!("{:.3}", pi);
    println!("{:05}", n);
}
~~~

- ^let pi = 3.14159;^ - a variable holding a float.
- ^let n = 42;^ - a variable holding an integer.
- ^println!("{:.1}", pi);^ - prints ^pi^ with one digit after the point.
- ^println!("{:.3}", pi);^ - prints it with three digits.
- ^println!("{:05}", n);^ - prints ^n^ padded with zeros to 5 characters.

Output:

~~~
3.1
3.142
00042
~~~

Notice ^3.14159^ became ^3.142^: Rust rounds, it doesn't just cut digits off.

Math in Rust uses ^*^ for multiply, ^+^ for add, ^-^ for subtract and ^/^ for divide. A calculation like ^3.14 * 2.0^ is called an **expression**: something Rust works out into a single value.

## Try it

Change ^{:.3}^ to ^{:.0}^ and run it. Then try ^{:8}^ with ^n^ and count the spaces.

## Your task

The program already computes the area of a circle (pi times radius times radius) and stores it in the variable ^area^. Print it with exactly two digits after the decimal point, like this:

~~~
Area: 78.54
~~~

Use the ^{:.2}^ format specifier in your ^println!^.`,
      terms: [
        { term: 'integer', def: 'A whole number with no decimal point, like 42.' },
        { term: 'float', def: 'A number with a decimal point, like 3.14.' },
        { term: 'format specifier', def: 'A code after a colon inside {} that controls how a value is shown.' },
        { term: '{:.2}', def: 'Shows a number with exactly 2 digits after the decimal point.' },
        { term: '{:05}', def: 'Pads a number with leading zeros to a width of 5.' },
        { term: 'expression', def: 'A piece of code, like 3.0 * 2.0, that Rust works out into one value.' },
        { term: '*', def: 'The multiplication operator.' },
      ],
      starter: L`fn main() {
    let radius = 5.0;
    let area = 3.14159265 * radius * radius;

}
`,
      solution: L`fn main() {
    let radius = 5.0;
    let area = 3.14159265 * radius * radius;
    println!("Area: {:.2}", area);
}
`,
      require: [{ re: '\\{[^}]*:\\.2\\}', msg: 'Use the {:.2} format specifier.' }],
      hint: 'println!("Area: {:.2}", area);',
      tests: [{ expected: 'Area: 78.54' }],
    },
  ],
};
