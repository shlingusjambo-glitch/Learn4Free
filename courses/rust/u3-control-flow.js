// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';
const L = String.raw;

const READ_N = L`use std::io;

fn main() {
    let mut line = String::new();
    io::stdin().read_line(&mut line).unwrap();
    let n: i32 = line.trim().parse().unwrap();
`;

module.exports = {
  id: 'control-flow',
  title: 'Control Flow',
  lessons: [
    {
      id: 'if-else',
      title: 'if and else',
      content: L`## Programs that make decisions

So far your programs ran every line from top to bottom. **Control flow** means choosing which lines run, or running some lines again. Think of a fork in a road: you look at a sign and pick a path.

An **if** statement is that fork. It asks a question, called a **condition**. A condition is a question whose answer is only ever **true** or **false**. A value that is true or false has the type **bool** (short for **boolean**, named after the mathematician George Boole). If the answer is true, Rust runs the code in the first **block**. A block is a group of lines wrapped in curly braces ^{ }^. If the answer is false, Rust skips that block and runs the **else** block instead, if there is one.

To build conditions we use **comparison operators**. An **operator** is a symbol that does something with values. These ones compare two values and give back true or false: ^==^ (equal to), ^!=^ (not equal), ^<^ (less than), ^>^ (greater than), ^<=^ (less than or equal), ^>=^ (greater than or equal). Careful: one ^=^ stores a value in a variable, two ^==^ asks if two things are equal.

~~~
fn main() {
    let x = 7;
    if x > 0 {
        println!("positive");
    } else {
        println!("not positive");
    }
}
~~~

- ^let x = 7;^ makes a variable named x holding the number 7.
- ^if x > 0 {^ asks the condition "is x greater than 0?" The answer is true. No parentheses are needed around the condition, and it must be a bool (Rust never treats a number as true or false).
- ^println!("positive");^ is inside the first block, so it runs because the condition was true.
- ^} else {^ starts the block that runs when the condition is false. It is skipped here.
- ^println!("not positive");^ would print if x were 0 or negative.
- The last two ^}^ close the else block and the function.

Output:

~~~
positive
~~~

You can chain questions with **else if**: Rust checks conditions from top to bottom and runs only the first block whose condition is true. You can also combine conditions: ^&&^ means "and" (both must be true), ^||^ means "or" (at least one true), ^!^ means "not" (flips true and false).

## Try it

Change ^let x = 7;^ to ^let x = -2;^ and run it. Which line prints now? Then try ^0^.

## Your task

The starter code already reads a whole number from the user into a variable called ^n^. Using ^if^, ^else if^ and ^else^, print exactly one word:

- ^positive^ if n is greater than 0
- ^negative^ if n is less than 0
- ^zero^ otherwise

For example, input ^5^ prints:

~~~
positive
~~~`,
      terms: [
        { term: 'control flow', def: 'Deciding which lines of a program run, and how many times.' },
        { term: 'condition', def: 'A question that is answered with true or false.' },
        { term: 'bool', def: 'The type of a value that is either true or false.' },
        { term: 'block', def: 'A group of lines wrapped in curly braces { }.' },
        { term: 'if / else / else if', def: 'Keywords that run a block only when a condition is true (else: when it is not; else if: another question to try).' },
        { term: '== != < > <= >=', def: 'Comparison operators that check two values and give true or false.' },
        { term: '&& || !', def: 'And, or, and not: they combine or flip conditions.' },
      ],
      starter: READ_N + L`
}
`,
      solution: READ_N + L`    if n > 0 {
        println!("positive");
    } else if n < 0 {
        println!("negative");
    } else {
        println!("zero");
    }
}
`,
      hint: 'Use if n > 0 { } else if n < 0 { } else { }',
      tests: [
        { name: 'positive number', stdin: '5\n', expected: 'positive' },
        { name: 'negative number', stdin: '-3\n', expected: 'negative' },
        { name: 'zero', stdin: '0\n', expected: 'zero' },
        { name: 'smallest positive', stdin: '1\n', expected: 'positive' },
        { name: 'smallest negative', stdin: '-1\n', expected: 'negative' },
        { name: 'large positive', stdin: '2000000000\n', expected: 'positive' },
        { name: 'large negative', stdin: '-2000000000\n', expected: 'negative' },
      ],
    },
    {
      id: 'letter-grades',
      title: 'Letter Grades',
      content: L`## if produces a value

In Rust, ^if^ is an **expression**. An expression is a piece of code that works out to a value, like ^2 + 3^ works out to 5. Because ^if^ is an expression, you can store its result in a variable. Each **branch** (one possible path, such as the if part or the else part) gives back a value.

~~~
fn main() {
    let n = 150;
    let size = if n > 100 { "big" } else { "small" };
    println!("{}", size);
}
~~~

- ^let n = 150;^ stores 150 in n.
- ^let size = if n > 100 { "big" } else { "small" };^ checks if n is over 100. It is, so the whole if expression becomes the text "big", which is stored in size.
- Notice there is no semicolon after ^"big"^ inside the braces. The last line of a block with no semicolon is the value the block hands back. Adding a semicolon would throw the value away.
- Both branches must give the same type (here, both are text), and an else is required, because there must always be a value.
- ^println!("{}", size);^ prints the stored text; ^{}^ is the placeholder filled by size.

Output:

~~~
big
~~~

A **threshold** is a cut-off value where behaviour changes (like 90 for an A). When you chain ^else if^ branches, always list them from the highest threshold down, because the first true condition wins.

## Try it

Change ^let n = 150;^ to ^let n = 100;^. Does it print big or small? Why? (Hint: is 100 greater than 100?) Try changing ^>^ to ^>=^.

## Your task

The starter reads a score into ^n^. Store a letter in a variable called ^grade^ using an ^if^ expression, then print it:

- ^A^ for 90 or more
- ^B^ for 80 to 89
- ^C^ for 70 to 79
- ^D^ for 60 to 69
- ^F^ for anything lower

For example, input ^85^ prints:

~~~
B
~~~`,
      terms: [
        { term: 'expression', def: 'Code that works out to a single value.' },
        { term: 'branch', def: 'One of the possible paths of an if (the if part, an else if part, or the else part).' },
        { term: 'threshold', def: 'A cut-off number where the result changes.' },
        { term: 'let', def: 'The keyword that creates a variable.' },
        { term: 'no semicolon', def: 'A last line without ; in a block is the value the block gives back.' },
        { term: '{}', def: 'In println!, a placeholder that is replaced by a value.' },
      ],
      starter: READ_N + L`
}
`,
      solution: READ_N + L`    let grade = if n >= 90 {
        "A"
    } else if n >= 80 {
        "B"
    } else if n >= 70 {
        "C"
    } else if n >= 60 {
        "D"
    } else {
        "F"
    };
    println!("{}", grade);
}
`,
      hint: 'Chain else if from the highest threshold downward.',
      tests: [100, 95, 90, 89, 85, 80, 79, 75, 70, 69, 65, 60, 59, 30, 0, -5].map((s) => ({ name: `score ${s}`, stdin: `${s}\n`, expected: s >= 90 ? 'A' : s >= 80 ? 'B' : s >= 70 ? 'C' : s >= 60 ? 'D' : 'F' })),
    },
    {
      id: 'loop-break',
      title: 'loop and break',
      content: L`## Repeating code

A **loop** repeats a block of code again and again. Each time through the block is called an **iteration** (one lap around a running track). The simplest loop is the keyword ^loop^: it repeats forever, like a song on repeat, until something tells it to stop. That something is **break**, which immediately jumps out of the loop. Another keyword, **continue**, skips the rest of the current iteration and goes straight to the next one.

A loop usually needs a **counter**: a variable that changes every iteration so the loop can notice when to stop. For that the variable must be **mutable** (changeable), written ^let mut^. The shortcut ^i += 1^ means "add 1 to i".

~~~
fn main() {
    let mut i = 0;
    loop {
        i += 1;
        if i == 3 {
            continue;
        }
        if i > 5 {
            break;
        }
        println!("{}", i);
    }
}
~~~

- ^let mut i = 0;^ creates a changeable counter starting at 0.
- ^loop {^ begins the endless loop.
- ^i += 1;^ adds 1 to i. It becomes 1, then 2, then 3...
- ^if i == 3 { continue; }^ when i is 3, skip the print and start the next lap.
- ^if i > 5 { break; }^ when i reaches 6, leave the loop for good.
- ^println!("{}", i);^ prints the counter on laps that were not skipped.

Output:

~~~
1
2
4
5
~~~

The 3 is missing because of ^continue^. If you forget ^break^, the loop never ends (an **infinite loop**), and the program has to be stopped by force.

## Try it

Change ^i == 3^ to ^i == 2^ and see which number disappears. Change ^i > 5^ to ^i > 8^ to count higher.

## Your task

Using a ^loop^ and ^break^, print the numbers 1 to 5, one per line. The starter has a counter ^i^ starting at 1 already. Inside the loop: if i is greater than 5, break; otherwise print i and add 1 to it. Expected output:

~~~
1
2
3
4
5
~~~`,
      terms: [
        { term: 'loop', def: 'A block of code that repeats; the keyword loop repeats forever until a break.' },
        { term: 'iteration', def: 'One run through the body of a loop.' },
        { term: 'break', def: 'Leaves the loop immediately.' },
        { term: 'continue', def: 'Skips the rest of this iteration and starts the next one.' },
        { term: 'counter', def: 'A variable that changes each iteration to track progress.' },
        { term: 'mut', def: 'Makes a variable changeable.' },
        { term: '+=', def: 'Adds a number to a variable (i += 1 means i = i + 1).' },
      ],
      starter: L`fn main() {
    let mut i = 1;

}
`,
      solution: L`fn main() {
    let mut i = 1;
    loop {
        if i > 5 {
            break;
        }
        println!("{}", i);
        i += 1;
    }
}
`,
      require: [{ re: '\\bloop\\b', msg: 'Use a loop { } block.' }, { re: '\\bbreak\\b', msg: 'Use break to leave the loop.' }],
      hint: 'Inside loop: break when i > 5, otherwise print and increment.',
      tests: [{ name: 'prints 1 to 5', expected: '1\n2\n3\n4\n5' }],
    },
    {
      id: 'while-loops',
      title: 'while Loops',
      content: L`## Looping while something is true

A **while loop** repeats its block as long as a condition (a true/false question) stays true. Before every iteration (one run through the block) Rust re-checks the condition. When it turns false, the loop ends by itself, with no ^break^ needed. Think of "while the kettle is not boiling, keep waiting".

If the condition is false the very first time, the block never runs at all. And you must change something inside the loop that eventually makes the condition false, or it will run forever.

~~~
fn main() {
    let mut count = 0;
    while count < 3 {
        println!("count is {}", count);
        count += 1;
    }
    println!("done");
}
~~~

- ^let mut count = 0;^ creates a changeable counter (^mut^ means mutable, changeable).
- ^while count < 3 {^ checks: is count less than 3? Yes, so enter the block.
- ^println!("count is {}", count);^ prints the current value.
- ^count += 1;^ adds 1. After this, Rust goes back and checks the condition again.
- When count reaches 3, ^count < 3^ is false and the loop ends.
- ^println!("done");^ is after the loop, so it runs once at the end.

Output:

~~~
count is 0
count is 1
count is 2
done
~~~

Use ^-=^ to subtract: ^n -= 1^ means "make n one smaller", handy for counting down.

## Try it

Change ^count < 3^ to ^count < 6^. Then change the starting value to 10 and see that nothing from the loop prints.

## Your task

Print a countdown from 5 to 1, one number per line, then print ^Liftoff!^. Use a ^while^ loop; the starter has ^n^ set to 5. Expected output:

~~~
5
4
3
2
1
Liftoff!
~~~`,
      terms: [
        { term: 'while', def: 'A loop that repeats as long as its condition is true.' },
        { term: 'condition', def: 'A true/false question checked before each iteration.' },
        { term: 'iteration', def: 'One run through the loop body.' },
        { term: 'mutable (mut)', def: 'A variable that is allowed to change.' },
        { term: '-=', def: 'Subtracts a number from a variable (n -= 1 means n = n - 1).' },
        { term: 'infinite loop', def: 'A loop whose condition never becomes false, so it never stops.' },
      ],
      starter: L`fn main() {
    let mut n = 5;

}
`,
      solution: L`fn main() {
    let mut n = 5;
    while n > 0 {
        println!("{}", n);
        n -= 1;
    }
    println!("Liftoff!");
}
`,
      require: [{ re: '\\bwhile\\b', msg: 'Use a while loop.' }],
      hint: 'while n > 0 { print; n -= 1; } then print Liftoff!',
      tests: [{ name: 'countdown then Liftoff', expected: '5\n4\n3\n2\n1\nLiftoff!' }],
    },
    {
      id: 'for-ranges',
      title: 'for Loops & Ranges',
      content: L`## Counting with for

When you know how many times to repeat, a **for loop** is neatest. It takes each item from a collection of values, one at a time, and puts it in a variable for you. No manual counter is needed. Going through values one by one is called **iterating**.

A **range** is a sequence of whole numbers written with two dots. ^1..4^ means 1, 2, 3 (it stops just before the end number, like "up to but not including"). ^1..=4^ with an equals sign includes the end: 1, 2, 3, 4. Calling ^.rev()^ on a range (in parentheses) runs it **in reverse**.

~~~
fn main() {
    let mut total = 0;
    for i in 1..=4 {
        println!("i is {}", i);
        total += i;
    }
    println!("total is {}", total);
}
~~~

- ^let mut total = 0;^ makes a changeable variable to collect a running sum, an **accumulator** (like a piggy bank you keep adding to).
- ^for i in 1..=4 {^ runs the block four times; i is 1, then 2, 3, 4. The variable ^i^ is created by the loop itself.
- ^println!("i is {}", i);^ prints each value.
- ^total += i;^ adds the current i to the total.
- After the loop, ^total^ holds 1 + 2 + 3 + 4 = 10.

Output:

~~~
i is 1
i is 2
i is 3
i is 4
total is 10
~~~

Other forms: ^for i in 1..4^ gives 1, 2, 3; ^for i in (1..=3).rev()^ gives 3, 2, 1.

## Try it

Remove the ^=^ from ^1..=4^ and see the total change to 6. Then try ^(1..=4).rev()^ to print in reverse.

## Your task

Read ^n^ (the starter does this) and print the sum 1 + 2 + ... + n, using a ^for^ loop with an accumulator. For input ^5^ print:

~~~
15
~~~

For input ^0^ the range is empty, so the answer is ^0^.`,
      terms: [
        { term: 'for loop', def: 'A loop that takes values one at a time from a range or collection.' },
        { term: 'range', def: 'A sequence of whole numbers like 1..5 (excludes 5) or 1..=5 (includes 5).' },
        { term: 'iterate', def: 'To go through values one by one.' },
        { term: 'accumulator', def: 'A variable that collects a running total as a loop goes.' },
        { term: '..  and ..=', def: 'Range operators: .. stops before the end number, ..= includes it.' },
        { term: 'rev()', def: 'Makes a range go backwards.' },
        { term: 'in', def: 'Keyword in a for loop that names where the values come from.' },
      ],
      starter: READ_N + L`
}
`,
      solution: READ_N + L`    let mut sum = 0;
    for i in 1..=n {
        sum += i;
    }
    println!("{}", sum);
}
`,
      require: [{ re: '\\bfor\\b', msg: 'Use a for loop.' }],
      hint: 'let mut sum = 0; for i in 1..=n { sum += i; }',
      tests: [[1, 1], [2, 3], [5, 15], [10, 55], [100, 5050], [1000, 500500], [0, 0], [-4, 0]].map(([n, e]) => ({ name: `sum to ${n}`, stdin: `${n}\n`, expected: String(e) })),
    },
    {
      id: 'fizzbuzz',
      title: 'FizzBuzz',
      content: L`## A famous puzzle

FizzBuzz is a classic exercise used to check that you can combine loops and conditions. First you need the **remainder operator** ^%^. It gives what is left over after division. ^7 % 3^ is 1 (3 fits twice, 6, leaving 1). If ^a % b == 0^ there is nothing left over, so a is **divisible** by b (it divides evenly).

~~~
fn main() {
    for i in 1..=6 {
        if i % 2 == 0 {
            println!("{} is even", i);
        } else {
            println!("{} is odd", i);
        }
    }
}
~~~

- ^for i in 1..=6^ repeats for i = 1 to 6 (inclusive range).
- ^i % 2 == 0^ asks: is the remainder after dividing by 2 equal to zero? That is true for even numbers.
- The if prints "even" in that case; the else branch handles the rest.

Output:

~~~
1 is odd
2 is even
3 is odd
4 is even
5 is odd
6 is even
~~~

An important idea is **order**: in an ^if / else if^ chain only the first true branch runs. If a number fits several rules, put the most specific rule first.

## Try it

Change ^% 2^ to ^% 3^ and the words to "multiple of 3" / "not". See which numbers match.

## Your task

Read ^n^. For each number from 1 to n, print one line:

- ^FizzBuzz^ if divisible by both 3 and 5 (that means divisible by 15), checked **first**
- ^Fizz^ if divisible by 3
- ^Buzz^ if divisible by 5
- otherwise the number itself

For input ^5^:

~~~
1
2
Fizz
4
Buzz
~~~`,
      terms: [
        { term: '%', def: 'The remainder operator: what is left after dividing (7 % 3 is 1).' },
        { term: 'divisible', def: 'Divides evenly with remainder 0.' },
        { term: 'for loop', def: 'Repeats once for each number in a range.' },
        { term: 'else if chain', def: 'Several conditions checked in order; only the first true one runs.' },
        { term: '1..=n', def: 'A range from 1 up to and including n.' },
      ],
      starter: READ_N + L`
}
`,
      solution: READ_N + L`    for i in 1..=n {
        if i % 15 == 0 {
            println!("FizzBuzz");
        } else if i % 3 == 0 {
            println!("Fizz");
        } else if i % 5 == 0 {
            println!("Buzz");
        } else {
            println!("{}", i);
        }
    }
}
`,
      hint: 'i % 15 == 0 is the FizzBuzz case.',
      tests: [15, 3, 1, 5, 30, 100, 14].map((n) => ({
        name: `up to ${n}`,
        stdin: `${n}\n`,
        expected: Array.from({ length: n }, (_, k) => { const i = k + 1; return i % 15 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : String(i); }).join('\n'),
      })),
    },
    {
      id: 'match-expressions',
      title: 'match',
      content: L`## Choosing between many options

When you compare one value against many possibilities, a long else-if chain gets messy. **match** is tidier. You give it a value, then a list of **arms**. Each arm has a **pattern** (a shape the value is compared with) and, after ^=>^, the code to run when it fits. Rust tries arms from top to bottom and runs the first that matches. Think of sorting mail into pigeonholes.

Rust demands that match is **exhaustive**: it must cover every possible value. The pattern ^_^ (underscore) is the **catch-all**: it matches anything not already handled. You can also write ^2 | 3^ (either value) and ranges like ^4..=9^.

~~~
fn main() {
    let n = 3;
    match n {
        1 => println!("one"),
        2 | 3 => println!("two or three"),
        4..=9 => println!("four to nine"),
        _ => println!("something else"),
    }
}
~~~

- ^match n {^ starts comparing the value in n against the arms.
- ^1 => println!("one"),^ pattern 1; if n is 1 print "one". Arms end with a comma.
- ^2 | 3 =>^ matches 2 or 3. Here n is 3, so this arm runs.
- ^4..=9 =>^ matches any number from 4 through 9.
- ^_ =>^ catches everything else, such as 0 or 100.
- Only one arm runs, so only one line prints.

Output:

~~~
two or three
~~~

Like ^if^, ^match^ is an expression and can give a value: ^let name = match n { 1 => "one", _ => "other" };^

## Try it

Change ^let n = 3;^ to 7, then 1, then 50 and predict the output each time.

## Your task

Read a number (the starter gives you ^n^). Use ^match^ to print the weekday name: 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday, 7 = Sunday. Any other number prints ^invalid^. For input ^3^:

~~~
Wednesday
~~~`,
      terms: [
        { term: 'match', def: 'Compares a value against a list of patterns and runs the first arm that fits.' },
        { term: 'pattern', def: 'A shape a value is compared against, like 1, 2 | 3, or 4..=9.' },
        { term: 'arm', def: 'One pattern plus its code, written pattern => code.' },
        { term: '=>', def: 'Separates a pattern from the code to run.' },
        { term: '_', def: 'The catch-all pattern that matches any value.' },
        { term: '|', def: 'Inside a pattern, means "or".' },
        { term: 'exhaustive', def: 'Covering every possible value, which Rust requires of match.' },
      ],
      starter: READ_N + L`
}
`,
      solution: READ_N + L`    match n {
        1 => println!("Monday"),
        2 => println!("Tuesday"),
        3 => println!("Wednesday"),
        4 => println!("Thursday"),
        5 => println!("Friday"),
        6 => println!("Saturday"),
        7 => println!("Sunday"),
        _ => println!("invalid"),
    }
}
`,
      require: [{ re: '\\bmatch\\b', msg: 'Use a match expression.' }],
      hint: 'match n { 1 => println!("Monday"), ... _ => println!("invalid") }',
      tests: [[1, 'Monday'], [2, 'Tuesday'], [3, 'Wednesday'], [4, 'Thursday'], [5, 'Friday'], [6, 'Saturday'], [7, 'Sunday'], [0, 'invalid'], [8, 'invalid'], [-1, 'invalid'], [100, 'invalid']].map(([n, e]) => ({ name: `day ${n}`, stdin: `${n}\n`, expected: e })),
    },
    {
      id: 'nested-loops',
      title: 'Nested Loops',
      content: L`## Loops inside loops

**Nested** means placed inside another. A **nested loop** is a loop inside a loop. Think of a clock: for each hour (outer loop) the minute hand goes round fully (inner loop). The inner loop runs completely every time the outer one does one iteration (one lap).

Two helpers: ^print!^ prints without moving to a new line, so output stays on the same line. ^println!()^ with nothing inside just ends the current line. A name like ^_^ for the loop variable means "I don't need this value".

~~~
fn main() {
    for row in 1..=3 {
        for _ in 0..row {
            print!("*");
        }
        println!();
    }
}
~~~

- ^for row in 1..=3^ is the outer loop; row is 1, then 2, then 3.
- ^for _ in 0..row^ is the inner loop. ^0..row^ is a range holding exactly row numbers, so it repeats row times. We use ^_^ because we do not need the value.
- ^print!("*");^ draws one star without a new line.
- ^println!();^ runs after the inner loop finishes, ending the row.
- Row 1 gets one star, row 2 two stars, row 3 three.

Output:

~~~
*
**
***
~~~

## Try it

Change the star to another character, or change ^1..=3^ to ^1..=5^ for a bigger triangle.

## Your task

Read ^n^ (provided). Print a right triangle made of ^#^ characters with n rows: row 1 has one ^#^, row 2 has two, and so on. For input ^3^:

~~~
#
##
###
~~~`,
      terms: [
        { term: 'nested loop', def: 'A loop placed inside another loop.' },
        { term: 'outer / inner loop', def: 'The outside loop and the loop inside it; the inner one runs fully for each outer iteration.' },
        { term: 'print!', def: 'Prints text without ending the line.' },
        { term: 'println!()', def: 'With nothing inside, just ends the current line.' },
        { term: '_', def: 'A loop variable name meaning the value is not needed.' },
        { term: '0..row', def: 'A range that repeats exactly row times.' },
      ],
      starter: READ_N + L`
}
`,
      solution: READ_N + L`    for row in 1..=n {
        for _ in 0..row {
            print!("#");
        }
        println!();
    }
}
`,
      hint: 'Outer loop over rows; inner loop prints "#" row times; then println!().',
      tests: [1, 2, 3, 5, 8, 12].map((n) => ({ name: `${n} rows`, stdin: `${n}\n`, expected: Array.from({ length: n }, (_, k) => '#'.repeat(k + 1)).join('\n') })),
    },
  ],
};
