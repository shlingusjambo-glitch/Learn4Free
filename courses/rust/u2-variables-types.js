// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';
const L = String.raw;

const READ = L`use std::io;

fn main() {
    let mut line = String::new();
    io::stdin().read_line(&mut line).unwrap();
`;

module.exports = {
  id: 'variables-types',
  title: 'Variables & Types',
  lessons: [
    {
      id: 'let-bindings',
      title: 'Variables with let',
      content: L`## A variable is a labeled box

A **variable** is a labeled box that stores a value so you can use it later. The label is the variable's **name**, and what is inside the box is its **value**. In Rust you make a variable with the word ^let^. A **keyword** is a word that Rust reserves for itself and gives a special meaning; ^let^ is a keyword that means "create a new variable".

Every value also has a **type**, which says what kind of thing it is (a whole number, a decimal number, text, and so on). Rust usually works out the type by itself; this is called **type inference**. You can also write the type yourself after a colon. The type ^i32^ means "a whole number (an **integer**) that fits in 32 bits of computer memory", and ^i64^ is the same idea with a bigger box.

An **expression** is a piece of code that produces a value, like ^12 + 30^. In ^println!^ (which prints text on the screen), the symbols ^{}^ are a **placeholder**: a gap that Rust fills in with the value you list after the text.

Example:

~~~
fn main() {
    let x = 5;
    let y: i64 = 10;
    println!("{}", x + y);
}
~~~

- ^fn main() {^ starts the **function** (a named, reusable block of code) called ^main^, where your program begins.
- ^let x = 5;^ creates a variable named ^x^ and puts 5 in it. Rust infers that it is an ^i32^. The ^=^ sign here means "store this value", not "is equal to".
- ^let y: i64 = 10;^ creates ^y^ and explicitly says its type is ^i64^.
- ^println!("{}", x + y);^ works out ^x + y^ (that is 15) and puts it where the ^{}^ is. The ^;^ (**semicolon**) ends the statement.
- ^}^ closes the function.

Output:

~~~
15
~~~

By default a variable is **immutable**, which means that once you give it a value you cannot change it. That is a safety feature: nothing can silently change a value behind your back.

## Try it

Change ^let x = 5;^ to ^let x = 100;^ and run again. The output should become ^110^.

## Your task

Declare two variables, ^a^ with the value 12 and ^b^ with the value 30, using ^let^. Then print their sum on one line.

Expected output:

~~~
42
~~~`,
      terms: [
        { term: 'variable', def: 'A named box in memory that stores a value.' },
        { term: 'let', def: 'The keyword that creates a new variable.' },
        { term: 'type', def: 'The kind of value something is, such as a whole number or text.' },
        { term: 'i32 / i64', def: 'Whole-number types that use 32 or 64 bits of memory.' },
        { term: 'immutable', def: 'Unchangeable: after being set, the value cannot be changed.' },
        { term: '{}', def: 'A placeholder inside println! that is replaced by a value.' },
      ],
      starter: L`fn main() {

}
`,
      solution: L`fn main() {
    let a = 12;
    let b = 30;
    println!("{}", a + b);
}
`,
      require: [{ re: '\\blet\\s+a\\b[\\s\\S]*\\blet\\s+b\\b', msg: 'Declare variables a and b with let.' }],
      hint: 'let a = 12; let b = 30; println!("{}", a + b);',
      tests: [{ expected: '42' }],
    },
    {
      id: 'mutability',
      title: 'Mutable Variables',
      content: L`## Letting a variable change

Variables made with ^let^ are **immutable** (unchangeable). If you want one to change, you mark it as **mutable** (changeable) by adding the keyword ^mut^ (short for "mutable"). Think of a whiteboard versus a printed page: ^let mut^ gives you the whiteboard.

Changing a variable's value is called **assignment**. Writing ^score = score + 10;^ means "work out score plus 10, then store the result back in score". The shorthand ^+=^ means "add to the variable itself", so ^score += 5;^ is the same as ^score = score + 5;^.

If you try to change a variable that is not ^mut^, Rust refuses to **compile** your program. To **compile** means to translate your code into instructions the computer can run; a **compile error** is Rust telling you it cannot do that because something is wrong.

Example:

~~~
fn main() {
    let mut score = 0;
    score = score + 10;
    score += 5;
    println!("{}", score);
}
~~~

- ^let mut score = 0;^ makes a changeable variable ^score^ that starts at 0.
- ^score = score + 10;^ stores 0 + 10 in ^score^, so it is now 10.
- ^score += 5;^ adds 5 to it, so it is now 15.
- ^println!("{}", score);^ prints the current value.

Output:

~~~
15
~~~

## Try it

Delete the word ^mut^ and run it. Read the compile error Rust gives you; it tells you that you cannot assign twice to an immutable variable. Put ^mut^ back afterwards.

## Your task

The starter has ^counter^ starting at 0. Make it mutable, then add 1 to it three times (one line per addition), and print it.

Expected output:

~~~
3
~~~`,
      terms: [
        { term: 'mut', def: 'Keyword that makes a variable mutable (changeable).' },
        { term: 'mutable', def: 'Able to be changed after it is first set.' },
        { term: 'assignment', def: 'Storing a new value in an existing variable using =.' },
        { term: '+=', def: 'Shorthand that adds a value to a variable and stores the result back in it.' },
        { term: 'compile', def: 'To translate your code into instructions the computer can run.' },
        { term: 'compile error', def: 'A message from Rust saying the code is not allowed and cannot be built.' },
      ],
      starter: L`fn main() {
    let counter = 0;

    println!("{}", counter);
}
`,
      solution: L`fn main() {
    let mut counter = 0;
    counter += 1;
    counter += 1;
    counter += 1;
    println!("{}", counter);
}
`,
      require: [{ re: 'let\\s+mut\\s+counter', msg: 'Declare counter with let mut.' }],
      hint: 'Change to let mut counter = 0; then use counter += 1; three times.',
      tests: [{ expected: '3' }],
    },
    {
      id: 'shadowing',
      title: 'Shadowing',
      content: L`## Reusing a name

You can write ^let^ again with a name you have already used. This creates a brand-new variable that **shadows** (hides) the old one: from then on, the name refers to the new box, like putting a new label over an old one. This is called **shadowing**.

Unlike ^mut^, shadowing makes a whole new variable, so it can even have a different type.

A piece of text in double quotes, like ^"hello"^, is called a **string**. A **method** is an action attached to a value, which you call by writing a dot and then its name, like ^text.len()^. The ^len^ method returns the **length**: how many characters (letters, spaces, symbols) the string has.

Example:

~~~
fn main() {
    let spaces = "   ";
    let spaces = spaces.len();
    println!("{}", spaces);
}
~~~

- ^let spaces = "   ";^ makes a string containing three spaces.
- ^let spaces = spaces.len();^ asks the old ^spaces^ for its length (3) and makes a new ^spaces^ holding that number. The old string is now hidden.
- ^println!("{}", spaces);^ prints the new ^spaces^.

Output:

~~~
3
~~~

## Try it

Change the three spaces to five spaces and run again. The output should be ^5^.

## Your task

The starter has ^text^ set to the string ^"hello world"^. Shadow ^text^ with a second ^let^ so it becomes the length of the string, then print it.

Expected output:

~~~
11
~~~`,
      terms: [
        { term: 'shadowing', def: 'Declaring a new variable with an existing name, hiding the old one.' },
        { term: 'string', def: 'A piece of text written in double quotes.' },
        { term: 'method', def: 'An action attached to a value, called with a dot, like text.len().' },
        { term: 'len()', def: 'Method that gives the number of characters in a string.' },
        { term: '.', def: 'The dot that calls a method on a value.' },
      ],
      starter: L`fn main() {
    let text = "hello world";

    println!("{}", text);
}
`,
      solution: L`fn main() {
    let text = "hello world";
    let text = text.len();
    println!("{}", text);
}
`,
      require: [{ re: 'let\\s+text[\\s\\S]*let\\s+text', msg: 'Shadow text with a second let text = ...' }],
      hint: 'let text = text.len();',
      tests: [{ expected: '11' }],
    },
    {
      id: 'integer-math',
      title: 'Integer Arithmetic',
      content: L`## Doing math with whole numbers

An **operator** is a symbol that does something to values. The math operators are ^+^ (add), ^-^ (subtract), ^*^ (multiply), ^/^ (divide), and ^%^ (remainder). With integers, ^/^ throws away the fraction: ^7 / 2^ is ^3^, not 3.5. The **remainder** operator ^%^ gives what is left over: ^7 % 2^ is ^1^ (two goes into seven three times, with one left over).

## Reading input

**Standard input** (stdin) is the text a user types into your program. The starter code already reads one line of it into a variable. ^parse^ converts text into a number. Reading numbers works in these steps: ^split_whitespace^ cuts the line into words at the spaces; ^map^ does something to each word; ^collect^ gathers the results into a **vector** (^Vec^), which is a growing list of values of the same type. ^unwrap^ means "give me the result, and crash if something went wrong". The ^|s| ...^ part is a **closure**, a tiny nameless function.

You get items out of a list by **index**, their position counting from 0, so ^nums[0]^ is the first. ^let (a, b) = (nums[0], nums[1]);^ is a **tuple**: a group of values in parentheses; here it creates two variables at once.

Example (input is ^7 2^):

~~~
let nums: Vec<i32> = line.split_whitespace().map(|s| s.parse().unwrap()).collect();
let (a, b) = (nums[0], nums[1]);
println!("{}", a / b);
println!("{}", a % b);
~~~

- The first line turns the text ^"7 2"^ into the list ^[7, 2]^.
- The second line names the first number ^a^ and the second ^b^.
- ^a / b^ is 7 / 2, which is 3 with the fraction dropped.
- ^a % b^ is the remainder, 1.

Output:

~~~
3
1
~~~

## Try it

In the editor, add ^println!("{}", a + b + 1);^ and run it with the input ^7 2^. You should see ^10^.

## Your task

The input is two integers ^a b^ on one line (b is never 0). The starter already reads them. Print four lines: the sum, the difference (a - b), the product, and then the quotient and remainder written like ^3 r 1^ (use ^println!("{} r {}", a / b, a % b);^).

For input ^7 2^ the expected output is:

~~~
9
5
14
3 r 1
~~~`,
      terms: [
        { term: 'operator', def: 'A symbol such as + or * that does an operation on values.' },
        { term: '/', def: 'Division; with integers it drops the fraction.' },
        { term: '%', def: 'Remainder operator: what is left after dividing.' },
        { term: 'stdin', def: 'Standard input: text typed in or given to your program.' },
        { term: 'parse', def: 'Converts text into another type, such as a number.' },
        { term: 'Vec', def: 'A vector: a list of values of one type that can grow.' },
        { term: 'index', def: 'The position of an item in a list, starting at 0.' },
        { term: 'tuple', def: 'A group of values in parentheses, like (a, b).' },
      ],
      starter: READ + L`    let nums: Vec<i32> = line.split_whitespace().map(|s| s.parse().unwrap()).collect();
    let (a, b) = (nums[0], nums[1]);

}
`,
      solution: READ + L`    let nums: Vec<i32> = line.split_whitespace().map(|s| s.parse().unwrap()).collect();
    let (a, b) = (nums[0], nums[1]);
    println!("{}", a + b);
    println!("{}", a - b);
    println!("{}", a * b);
    println!("{} r {}", a / b, a % b);
}
`,
      hint: 'Four println! lines. The last: println!("{} r {}", a / b, a % b);',
      tests: [
        { name: 'seven and two', stdin: '7 2\n', expected: '9\n5\n14\n3 r 1' },
        { name: 'exact division', stdin: '20 5\n', expected: '25\n15\n100\n4 r 0' },
        { name: 'smaller divided by larger', stdin: '3 10\n', expected: '13\n-7\n30\n0 r 3' },
        { name: 'negative first number', stdin: '-7 2\n', expected: '-5\n-9\n-14\n-3 r -1' },
        { name: 'zero first number', stdin: '0 5\n', expected: '5\n-5\n0\n0 r 0' },
        { name: 'larger numbers', stdin: '100000 3\n', expected: '100003\n99997\n300000\n33333 r 1' },
      ],
    },
    {
      id: 'floats-casting',
      title: 'Floats & Casting',
      content: L`## Decimal numbers

A number with a decimal point, like ^3.5^, is a **float** (short for floating-point number). Rust's float types are ^f64^ (precise, the usual choice) and ^f32^ (smaller). Integers and floats are different types, and Rust will not mix them automatically. To convert a value from one type to another, you use **casting** with the keyword ^as^. For example ^n as f64^ turns the integer ^n^ into a float.

Because integer division drops the fraction, write ^9.0 / 5.0^ instead of ^9 / 5^ when you want the exact answer 1.8.

To control how a float is printed, change the placeholder: ^{:.1}^ means "show exactly 1 digit after the decimal point".

Example:

~~~
fn main() {
    let n: i32 = 7;
    let half = n as f64 / 2.0;
    println!("{}", half);
    println!("{:.2}", half);
}
~~~

- ^let n: i32 = 7;^ is a whole number.
- ^n as f64^ casts it to a float (7.0), then ^/ 2.0^ divides it, giving 3.5.
- The first ^println!^ prints the float as it is.
- ^{:.2}^ prints it with two decimal places.

Output:

~~~
3.5
3.50
~~~

## Try it

Change ^2.0^ to ^3.0^ and run it. You will see ^2.33333...^ and then ^2.33^ (the first line has many digits).

## Your task

Read a temperature in Celsius (a float) from the input, as the starter does, and print the Fahrenheit value with one decimal place, using F = C * 9/5 + 32. Write the numbers as floats (^9.0^, ^5.0^, ^32.0^).

For input ^100^ the expected output is:

~~~
212.0
~~~`,
      terms: [
        { term: 'float', def: 'A number with a decimal point, such as 3.5.' },
        { term: 'f64', def: 'A 64-bit float type; the usual choice for decimals.' },
        { term: 'as', def: 'Keyword that converts (casts) a value to another type.' },
        { term: 'casting', def: 'Converting a value from one type to another.' },
        { term: '{:.1}', def: 'A placeholder that prints a float with 1 digit after the decimal point.' },
        { term: 'trim()', def: 'Method that removes spaces and the newline at the ends of a string.' },
      ],
      starter: READ + L`    let c: f64 = line.trim().parse().unwrap();

}
`,
      solution: READ + L`    let c: f64 = line.trim().parse().unwrap();
    println!("{:.1}", c * 9.0 / 5.0 + 32.0);
}
`,
      hint: 'Use 9.0 / 5.0 (floats!) and print with {:.1}.',
      tests: [
        { name: 'boiling point', stdin: '100\n', expected: '212.0' },
        { name: 'freezing point', stdin: '0\n', expected: '32.0' },
        { name: 'body temperature', stdin: '37\n', expected: '98.6' },
        { name: 'negative forty', stdin: '-40\n', expected: '-40.0' },
        { name: 'decimal input', stdin: '36.6\n', expected: '97.9' },
        { name: 'large value', stdin: '1000\n', expected: '1832.0' },
      ],
    },
    {
      id: 'tuples-arrays',
      title: 'Tuples & Arrays',
      content: L`## Grouping values

Sometimes you want one variable to hold several values. Rust has two basic ways. A **tuple** groups a fixed number of values that may be of different types, written in parentheses. An **array** holds a fixed number of values that are all the same type, written in square brackets. Picture a tuple as a bag of mixed items and an array as an egg carton: every slot holds the same kind of thing.

Each value inside is an **element**. You reach an element by its **index**, its position counted from 0 (the first element is at index 0, not 1). For arrays write ^a[0]^; for tuples write ^t.0^. The method ^len()^ tells you how many elements an array has, so the last element is at index ^a.len() - 1^.

Example:

~~~
fn main() {
    let t = (1, "two", 3.0);
    println!("{}", t.1);

    let a = [3, 1, 4];
    println!("{} {}", a[0], a.len());
}
~~~

- ^let t = (1, "two", 3.0);^ makes a tuple holding an integer, a string, and a float.
- ^t.1^ is the element at index 1, the string ^two^.
- ^let a = [3, 1, 4];^ makes an array of three integers.
- ^a[0]^ is the first element (3) and ^a.len()^ is the count (3).

Output:

~~~
two
3 3
~~~

## Try it

Change ^a[0]^ to ^a[2]^ and run it. The output's second line becomes ^4 3^.

## Your task

The starter has an array ^nums^ with 8 numbers. Print one line in exactly this form, getting the values from the array with indexing and ^len()^ (do not type them in by hand):

~~~
first=3 last=6 len=8
~~~`,
      terms: [
        { term: 'tuple', def: 'A fixed-size group of values that can have different types.' },
        { term: 'array', def: 'A fixed-size list of values that all have the same type.' },
        { term: 'element', def: 'One value stored inside a tuple or array.' },
        { term: 'index', def: 'An element\'s position, starting from 0.' },
        { term: '[ ]', def: 'Square brackets: they write an array or pick an element by index.' },
        { term: 'len()', def: 'Method that returns how many elements an array has.' },
      ],
      starter: L`fn main() {
    let nums = [3, 1, 4, 1, 5, 9, 2, 6];

}
`,
      solution: L`fn main() {
    let nums = [3, 1, 4, 1, 5, 9, 2, 6];
    println!("first={} last={} len={}", nums[0], nums[nums.len() - 1], nums.len());
}
`,
      require: [{ re: 'nums\\s*\\[', msg: 'Read elements from the array with indexing.' }],
      hint: 'nums[0], nums[nums.len() - 1], nums.len()',
      tests: [{ expected: 'first=3 last=6 len=8' }],
    },
  ],
};
