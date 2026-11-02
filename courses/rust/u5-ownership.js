// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';
const L = String.raw;

// Harness builder: reads all of stdin, then runs ^body^ once per input line.
const harness = (body) => 'fn main() {\n    let mut input = String::new();\n    std::io::Read::read_to_string(&mut std::io::stdin(), &mut input).unwrap();\n    for line in input.lines() {\n' + body + '\n    }\n}';

module.exports = {
  id: 'ownership',
  title: 'Ownership & Borrowing',
  lessons: [
    {
      id: 'own-move-clone',
      title: 'Moves and Clones',
      content: L`## One value, one owner

Every program stores information in the computer's **memory** - the working space where a running program keeps its data. Rust has a special way of managing memory called **ownership**. Think of a library book: at any moment the book has exactly one person who has checked it out. That person is the **owner**. If the owner hands the book to a friend, the owner no longer has it.

Rust has three rules:

- Each value has exactly one **owner** (the variable that holds it).
- When the owner goes out of **scope** (the region of code between ^{^ and ^}^ where a variable exists), the value is thrown away. Rust calls that being **dropped**: its memory is given back automatically.
- Handing a value to another variable **moves** it: the new variable becomes the owner and the old variable can no longer be used.

Text that can grow, like a ^String^, lives in the **heap** - a big shared storage area for data whose size can change while the program runs. Small fixed-size values such as numbers live on the **stack** - a tidy, fast pile of small values that is cleaned up automatically when a block ends. A ^String^ keeps a small label on the stack that points to its letters on the heap, so copying it carelessly would give two owners for one pile of letters. That is why Rust moves it instead.

## Example: a move

~~~
fn main() {
    let a = String::from("hi");
    let b = a;
    println!("{}", b);
}
~~~

- ^let a = String::from("hi");^ creates a ^String^ (growable text) and makes ^a^ its owner.
- ^let b = a;^ moves the text from ^a^ to ^b^. Now ^b^ is the owner and ^a^ is unusable.
- ^println!("{}", b);^ prints the text. We used ^b^, the current owner.

Output:

~~~
hi
~~~

If we printed ^a^ after the move, the **compiler** (the tool that checks and translates your program before it runs) would refuse with an error like:

~~~
error[E0382]: borrow of moved value: a
  value moved here, in previous assignment: let b = a;
  value borrowed here after move: println!("{}", a);
~~~

It means: "you gave the book away, then tried to read it". The error appears before the program ever runs, which protects you from bugs.

## Clone and Copy

If you want a second, independent book, photocopy it. In Rust, ^.clone()^ makes a full duplicate of the value, so both variables own their own copy. Simple values such as whole numbers are **Copy** types: they are tiny, so Rust copies them automatically and never moves them.

~~~
fn main() {
    let a = String::from("hi");
    let b = a.clone();
    let n = 5;
    let m = n;
    println!("{} {} {} {}", a, b, n, m);
}
~~~

- ^a.clone()^ builds a duplicate of the text, so ^a^ keeps its own.
- ^let m = n;^ copies the number, so ^n^ still works.
- The ^println!^ prints all four values separated by spaces.

Output:

~~~
hi hi 5 5
~~~

## Try it

In the example above, change ^a.clone()^ to just ^a^ and press Run. Read the error message: it says ^a^ was moved. Then change it back.

## Your task

This program doesn't compile because ^s1^ is moved into ^s2^ and then used. Fix it with ^.clone()^ (keep both values in the ^println!^) so it prints:

~~~
hello hello
~~~`,
      terms: [
        { term: 'memory', def: 'The working space where a running program keeps its data.' },
        { term: 'owner', def: 'The one variable responsible for a value; when it goes out of scope the value is dropped.' },
        { term: 'move', def: 'Handing a value to another variable so the old variable can no longer be used.' },
        { term: 'clone', def: '.clone() makes a full independent duplicate of a value.' },
        { term: 'Copy', def: 'Small types like numbers that are duplicated automatically instead of moved.' },
        { term: 'heap / stack', def: 'Heap: shared storage for growable data. Stack: fast pile for small fixed-size values.' },
        { term: 'scope / drop', def: 'Scope is where a variable exists; drop is Rust cleaning up a value when its owner leaves scope.' },
      ],
      starter: L`fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    println!("{} {}", s1, s2);
}
`,
      solution: L`fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();
    println!("{} {}", s1, s2);
}
`,
      require: [{ re: '\\.clone\\(\\)', msg: 'Use .clone() to make an independent copy.' }],
      hint: 'let s2 = s1.clone();',
      tests: [{ name: 'prints both copies', expected: 'hello hello' }],
    },
    {
      id: 'own-borrow',
      title: 'References',
      content: L`## Lending instead of giving

Moving a value into a function gives it away for good. Usually you only want to *lend* it, like letting a friend read your library book and return it. In Rust, lending is called **borrowing**, and you do it with a **reference**: a pointer to a value that lets you look at it without owning it. You make one by writing ^&^ in front of a variable. The owner keeps ownership, and the value is not dropped when the borrower is done.

A function's **parameter** is a named input slot, written like ^s: &String^ (name, colon, type). The type ^&String^ means "a borrowed String".

## Example

~~~
fn show(s: &String) {
    println!("{}", s);
}

fn main() {
    let name = String::from("Ada");
    show(&name);
    show(&name);
}
~~~

- ^fn show(s: &String)^ defines a function that borrows a ^String^ and does not take it.
- ^println!("{}", s);^ prints the borrowed text.
- ^let name = ...^ makes ^name^ the owner.
- ^show(&name);^ lends ^name^ out. When ^show^ ends, the loan ends.
- The second ^show(&name)^ works because ^name^ was never given away.

Output:

~~~
Ada
Ada
~~~

If ^show^ took ^String^ (no ^&^), the second call would fail with ^error[E0382]: borrow of moved value: name^.

## Try it

Remove the ^&^ from the first ^show(&name)^ call and Run. Read the error (mismatched types: expected ^&String^, found ^String^), then undo it.

## Your task

^calc_length^ takes ownership of its argument, so the caller can't use the string afterwards. Change it to borrow a ^&String^ instead. The autograder calls ^calc_length(&s)^ on each input line and prints the text with its length, for example:

~~~
"Learn4Free" -> 10
~~~`,
      terms: [
        { term: 'borrow', def: 'Temporarily use a value without taking ownership of it.' },
        { term: 'reference', def: 'A pointer to a value that lets you use it without owning it.' },
        { term: '&', def: 'Makes a reference when written before a value, and marks a reference in a type.' },
        { term: 'parameter', def: 'A named input slot of a function, with a type.' },
        { term: '.len()', def: 'Returns how many bytes of text a String holds.' },
      ],
      starter: L`fn calc_length(s: String) -> usize {
    s.len()
}
`,
      solution: L`fn calc_length(s: &String) -> usize {
    s.len()
}
`,
      harness: harness('        let s = String::from(line);\n        let n = calc_length(&s);\n        println!("\\"{}\\" -> {}", s, n);'),
      hint: 'Change the parameter type to &String.',
      tests: [
        { name: 'one word', stdin: 'Learn4Free\n', expected: '"Learn4Free" -> 10' },
        { name: 'empty line', stdin: '\n', expected: '"" -> 0' },
        { name: 'with spaces', stdin: 'hello world\n', expected: '"hello world" -> 11' },
        { name: 'several lines', stdin: 'a\nabc\n\nRust\n', expected: '"a" -> 1\n"abc" -> 3\n"" -> 0\n"Rust" -> 4' },
      ],
    },
    {
      id: 'own-mut-ref',
      title: 'Mutable References',
      content: L`## Lending a book you may write in

A plain reference ^&^ is read-only, like lending a book with "no highlighting". A **mutable reference** is written ^&mut^ and allows the borrower to change the value. (**Mutable** means "changeable".) The variable must itself be declared ^let mut^ so Rust knows it may change.

Inside the function, ^*n^ means "the value that ^n^ points to". The ^*^ is called **dereferencing**: following the pointer to reach the real value.

The safety rule: at one moment you can have **either** any number of read-only ^&^ borrows **or** exactly one ^&mut^ borrow, never both. Imagine one person editing a shared document while others try to read it halfway through: confusing! Rust forbids it before the program runs.

## Example

~~~
fn add_one(n: &mut i32) {
    *n += 1;
}

fn main() {
    let mut x = 1;
    add_one(&mut x);
    add_one(&mut x);
    println!("{}", x);
}
~~~

- ^n: &mut i32^ is a parameter holding a changeable borrow of a whole number.
- ^*n += 1;^ follows the pointer and adds 1 to the real number.
- ^let mut x = 1;^ creates a changeable variable.
- ^add_one(&mut x);^ lends ^x^ out for editing. This happens twice.
- ^println!^ prints the final value.

Output:

~~~
3
~~~

Forgetting ^mut^ gives: ^error[E0596]: cannot borrow x as mutable, as it is not declared as mutable^. Two ^&mut^ at once gives: ^error[E0499]: cannot borrow x as mutable more than once at a time^.

## Try it

Delete the word ^mut^ from ^let mut x = 1;^ and Run to see the E0596 error. Undo it afterwards.

## Your task

Write ^add_exclaim^ which appends a ^!^ to the end of a ^String^. Use ^s.push('!')^, which adds one character to a ^String^. Example: calling it twice on ^Hi^ gives ^Hi!!^. The autograder calls it twice on each input line:

~~~
Hi!!
~~~`,
      terms: [
        { term: '&mut', def: 'A changeable borrow: lets the borrower modify the value.' },
        { term: 'mut', def: 'Marks a variable as changeable.' },
        { term: '*', def: 'Dereference: follow a reference to the real value.' },
        { term: 'mutable', def: 'Able to be changed.' },
        { term: '.push(c)', def: 'Adds one character to the end of a String.' },
        { term: 'borrowing rule', def: 'Either many read-only borrows or one mutable borrow, never both at once.' },
      ],
      starter: L`fn add_exclaim(s: &mut String) {
    // TODO
}
`,
      solution: L`fn add_exclaim(s: &mut String) {
    s.push('!');
}
`,
      harness: harness('        let mut s = String::from(line);\n        add_exclaim(&mut s);\n        add_exclaim(&mut s);\n        println!("{}", s);'),
      hint: "s.push('!') adds one char.",
      tests: [
        { name: 'simple word', stdin: 'Hi\n', expected: 'Hi!!' },
        { name: 'empty string', stdin: '\n', expected: '!!' },
        { name: 'sentence', stdin: 'Hello there\n', expected: 'Hello there!!' },
        { name: 'several lines', stdin: 'a\nb c\n\n', expected: 'a!!\nb c!!\n!!' },
      ],
    },
    {
      id: 'own-slices',
      title: 'Slices',
      content: L`## Borrowing part of a value

Sometimes you want to borrow only a piece of some text. A **slice** is a reference to a contiguous (unbroken) part of a collection. For text, the slice type is ^&str^ (read "string slice"). Picture a bookmark and a highlighter: the slice doesn't copy the words, it just points at a stretch of the original.

You write a slice with a **range**: ^[start..end]^ means "from position start up to, but not including, end". Positions count from 0. ^[..3]^ starts at the beginning and ^[6..]^ goes to the end. String literals like ^"hello"^ are already ^&str^, and ^&str^ parameters accept both ^&String^ and literals, so prefer ^&str^.

Useful: ^s.find(' ')^ searches for a space and returns an **Option** - a value that is either ^Some(position)^ (found) or ^None^ (not found). A ^match^ chooses what to do for each case.

## Example

~~~
fn main() {
    let s = String::from("hello world");
    let hello = &s[0..5];
    let world = &s[6..];
    println!("{}|{}", hello, world);
}
~~~

- ^&s[0..5]^ borrows positions 0,1,2,3,4: the letters ^hello^.
- ^&s[6..]^ borrows from position 6 to the end: ^world^ (position 5 is the space).
- ^println!^ prints both slices with a ^|^ between them.

Output:

~~~
hello|world
~~~

The compiler protects slices too: if you tried to clear ^s^ while ^hello^ was still in use, you'd get ^error[E0502]: cannot borrow s as mutable because it is also borrowed as immutable^ (immutable means "not changeable", like a plain ^&^).

## Try it

Change ^&s[0..5]^ to ^&s[0..3]^ and Run: it prints ^hel|world^.

## Your task

Write ^first_word^ returning the first word of the text (everything before the first space), or the whole text if there is no space. The autograder prints each result inside square brackets:

~~~
[Rust]
~~~
for the input ^Rust is great^.`,
      terms: [
        { term: 'slice', def: 'A reference to a contiguous part of a collection, without copying it.' },
        { term: '&str', def: 'The string slice type; string literals have this type.' },
        { term: 'range', def: 'start..end means from start up to but not including end.' },
        { term: 'Option', def: 'A value that is either Some(thing) or None.' },
        { term: '.find(c)', def: 'Searches text and returns Some(position) or None.' },
        { term: 'match', def: 'Picks code to run depending on which pattern a value fits.' },
      ],
      starter: L`fn first_word(s: &str) -> &str {
    todo!()
}
`,
      solution: L`fn first_word(s: &str) -> &str {
    match s.find(' ') {
        Some(i) => &s[..i],
        None => s,
    }
}
`,
      harness: harness('        println!("[{}]", first_word(line));'),
      hint: "match s.find(' ') { Some(i) => &s[..i], None => s }",
      tests: [
        { name: 'several words', stdin: 'Rust is great\n', expected: '[Rust]' },
        { name: 'single word', stdin: 'Ferris\n', expected: '[Ferris]' },
        { name: 'empty string', stdin: '\n', expected: '[]' },
        { name: 'two words', stdin: 'a b\n', expected: '[a]' },
        { name: 'many lines', stdin: 'one two\nthree\n\nfour five six\n', expected: '[one]\n[three]\n[]\n[four]' },
      ],
    },
    {
      id: 'own-return',
      title: 'Taking and Returning Ownership',
      content: L`## Passing the book through

When a function takes a value by value (no ^&^), it becomes the new owner, like a friend you gave the book to. When the function finishes, the book would be dropped. But the function can hand ownership back by **returning** the value: sending a result back to whoever called the function. The function's **return type** is written after ^->^.

The last line of a function without a semicolon is its **return value**. That's how ^s^ below is returned.

## Example

~~~
fn append_world(mut s: String) -> String {
    s.push_str(" world");
    s
}

fn main() {
    let a = String::from("hello");
    let b = append_world(a);
    println!("{}", b);
}
~~~

- ^mut s: String^ means the function owns ^s^ and may change it.
- ^s.push_str(" world")^ adds a whole piece of text (^push^ adds one character; ^push_str^ adds a string).
- The final ^s^ (no semicolon) returns ownership to the caller.
- ^let b = append_world(a);^ moves ^a^ in and receives the result as ^b^. ^a^ can no longer be used.

Output:

~~~
hello world
~~~

Printing ^a^ at the end would give ^error[E0382]: borrow of moved value: a^, since ^a^ was given away.

## Try it

Add a semicolon after the last ^s^ in ^append_world^ and Run. The compiler complains about mismatched types because the function now returns nothing. Remove it again.

## Your task

Write ^shout(s: String) -> String^ that returns the text in uppercase followed by ^!^. ^s.to_uppercase()^ makes a new ^String^ in capitals. The autograder prints the result per input line:

~~~
RUST!
~~~
for the input ^rust^.`,
      terms: [
        { term: 'return value', def: 'The result a function hands back to its caller.' },
        { term: '->', def: 'Written before a function\'s return type.' },
        { term: 'ownership transfer', def: 'Passing a value by value moves ownership into the function.' },
        { term: '.to_uppercase()', def: 'Makes a new String with all letters in capitals.' },
        { term: '.push_str(s)', def: 'Adds a piece of text to the end of a String.' },
      ],
      starter: L`fn shout(s: String) -> String {
    todo!()
}
`,
      solution: L`fn shout(s: String) -> String {
    let mut up = s.to_uppercase();
    up.push('!');
    up
}
`,
      harness: harness('        println!("{}", shout(String::from(line)));'),
      hint: "let mut up = s.to_uppercase(); up.push('!'); up",
      tests: [
        { name: 'lowercase word', stdin: 'rust\n', expected: 'RUST!' },
        { name: 'mixed with digits', stdin: 'Learn4Free\n', expected: 'LEARN4FREE!' },
        { name: 'empty string', stdin: '\n', expected: '!' },
        { name: 'sentence', stdin: 'hello world\n', expected: 'HELLO WORLD!' },
        { name: 'many lines', stdin: 'a\nBc\n', expected: 'A!\nBC!' },
      ],
    },
  ],
};
