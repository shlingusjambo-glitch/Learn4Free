// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';
const L = String.raw;

module.exports = {
  id: 'collections',
  title: 'Collections & Iterators',
  lessons: [
    {
      id: 'vec-basics',
      title: 'Vectors',
      content: L`## What is a collection?

So far each variable held one value. A **collection** is a single variable that holds many values at once, like a shopping list holds many items. The most common collection in Rust is the **vector**: a growable list of values that all have the same type. Its type is written ^Vec<T>^, where ^T^ stands for the type of the items, for example ^Vec<i32>^ is a vector of integers.

Each item in a vector is called an **element**. Each element has an **index**: its position number, counting from 0. In ^[10, 20, 30]^ the element at index 0 is 10 and the element at index 2 is 30.

## Example: making and reading a vector

~~~
fn main() {
    let mut v = Vec::new();
    v.push(10);
    v.push(20);
    let w = vec![1, 2, 3];
    println!("{} {:?}", v.len(), w);
    for x in &w {
        println!("{}", x);
    }
}
~~~

- ^let mut v = Vec::new();^ makes an empty vector. ^mut^ (mutable) is needed because we will change it.
- ^v.push(10);^ adds 10 to the end of the vector. ^push^ is a **method**: a function that is called on a value with a dot.
- ^let w = vec![1, 2, 3];^ builds a vector with starting elements. ^vec!^ is a **macro** (a shortcut that ends in ^!^ and writes code for you).
- ^v.len()^ returns how many elements the vector has.
- ^{:?}^ inside ^println!^ is the **debug format**: it prints a whole collection, such as ^[1, 2, 3]^.
- ^for x in &w^ is a loop that **iterates** (visits each element one after another, in order). ^&w^ lends the vector to the loop without giving it away.

Output:

~~~
2 [1, 2, 3]
1
2
3
~~~

## Slices: passing vectors to functions

A **slice** is a borrowed view of a run of elements, written ^&[T]^, for example ^&[i32]^. It lets a function read a vector (or an **array**, a fixed-size list like ^[1, 2, 3]^ that can never grow) without taking it over. Functions that only need to read a list should take a slice.

When you loop over a slice with ^for &x in v^, the ^&x^ pattern copies each number into ^x^ so you can use it like a normal integer. An element is even when ^x % 2 == 0^ (the remainder after dividing by 2 is zero).

## Try it

In the example, change ^v.push(20);^ to also push 30, then print ^v.len()^ again. What does it print now?

## Your task

Write a function ^fn sum_evens(v: &[i32]) -> i32^ that returns the sum of the even numbers in the slice. Keep a ^mut total^ starting at 0, loop over the slice, and add each even number.

- ^sum_evens(&[1, 2, 3, 4, 5, 6])^ is ^12^ (2 + 4 + 6)
- an empty slice gives ^0^
- ^sum_evens(&[-2, -4, 5])^ is ^-6^

The tests feed a line of numbers on stdin to your function.`,
      terms: [
        { term: 'collection', def: 'One variable that holds many values at once.' },
        { term: 'Vec<T>', def: 'A growable list of values that all have type T.' },
        { term: 'element', def: 'One item stored inside a collection.' },
        { term: 'index', def: 'The position number of an element, starting at 0.' },
        { term: 'slice (&[T])', def: 'A borrowed view of a run of elements that you can read.' },
        { term: 'iterate', def: 'To visit each element one after another.' },
        { term: 'push', def: 'A vector method that adds an element to the end.' },
        { term: 'vec!', def: 'A macro that builds a vector from a list of values.' },
      ],
      starter: L`fn sum_evens(v: &[i32]) -> i32 {
    todo!()
}
`,
      solution: L`fn sum_evens(v: &[i32]) -> i32 {
    let mut total = 0;
    for &x in v {
        if x % 2 == 0 {
            total += x;
        }
    }
    total
}
`,
      harness: L`fn main() {
    let mut line = String::new();
    std::io::stdin().read_line(&mut line).unwrap();
    let v: Vec<i32> = line.split_whitespace().map(|s| s.parse().unwrap()).collect();
    println!("{}", sum_evens(&v));
}`,
      hint: 'Loop with for &x in v and add when x % 2 == 0.',
      tests: [
        { name: 'mixed numbers', stdin: '1 2 3 4 5 6\n', expected: '12' },
        { name: 'empty list', stdin: '\n', expected: '0' },
        { name: 'only odds', stdin: '7 9\n', expected: '0' },
        { name: 'negatives', stdin: '-2 -4 5\n', expected: '-6' },
        { name: 'single even', stdin: '8\n', expected: '8' },
        { name: 'zero and duplicates', stdin: '0 2 2\n', expected: '4' },
      ],
    },
    {
      id: 'vec-build',
      title: 'Building Vectors',
      content: L`## Building a vector and returning it

A function can create a vector, fill it, and hand it back to the caller. The pattern is: make an empty vector, **push** elements in a loop, then return it. Because the vector is **owned** (it belongs to the variable), returning it moves it out of the function to the caller.

A **range** like ^1..=n^ is a sequence of whole numbers from 1 up to and including n. (^1..n^ without ^=^ stops just before n.)

## Example

~~~
fn evens(n: u32) -> Vec<u32> {
    let mut out = Vec::new();
    for i in 1..=n {
        if i % 2 == 0 {
            out.push(i);
        }
    }
    out
}

fn main() {
    println!("{:?}", evens(7));
}
~~~

- ^fn evens(n: u32) -> Vec<u32>^ takes an unsigned (never negative) integer and gives back a vector of them.
- ^let mut out = Vec::new();^ starts with an empty vector we can add to.
- ^for i in 1..=n^ runs the body once for each number from 1 to n, putting that number in ^i^.
- ^if i % 2 == 0^ keeps only even numbers.
- ^out.push(i);^ adds ^i^ to the end of the vector.
- ^out^ on the last line has no semicolon, so it is the value the function returns.
- ^{:?}^ prints the whole vector.

Output:

~~~
[2, 4, 6]
~~~

## Try it

Change ^evens(7)^ to ^evens(0)^. The range ^1..=0^ is empty, so the loop never runs and you should see ^[]^, an empty vector.

## Your task

Write ^fn squares(n: u32) -> Vec<u32>^ returning ^[1, 4, 9, ... n*n]^: the squares of 1 up to n. For ^0^ it returns an empty vector.

- ^squares(5)^ prints ^[1, 4, 9, 16, 25]^
- ^squares(0)^ prints ^[]^
- ^squares(1)^ prints ^[1]^

The tests give ^n^ on stdin and print your vector with ^{:?}^.`,
      terms: [
        { term: 'owned', def: 'A value that belongs to one variable, which cleans it up when it goes away.' },
        { term: 'range (1..=n)', def: 'The whole numbers from 1 up to and including n.' },
        { term: 'return', def: 'Hand a value back to whoever called the function.' },
        { term: 'u32', def: 'An unsigned 32-bit integer: a whole number that is never negative.' },
        { term: '{:?}', def: 'Debug format, which prints a whole collection.' },
      ],
      starter: L`fn squares(n: u32) -> Vec<u32> {
    todo!()
}
`,
      solution: L`fn squares(n: u32) -> Vec<u32> {
    let mut out = Vec::new();
    for i in 1..=n {
        out.push(i * i);
    }
    out
}
`,
      harness: L`fn main() {
    let mut line = String::new();
    std::io::stdin().read_line(&mut line).unwrap();
    let n: u32 = line.trim().parse().unwrap();
    println!("{:?}", squares(n));
}`,
      hint: 'for i in 1..=n { out.push(i * i); }',
      tests: [
        { name: 'five', stdin: '5\n', expected: '[1, 4, 9, 16, 25]' },
        { name: 'zero is empty', stdin: '0\n', expected: '[]' },
        { name: 'one', stdin: '1\n', expected: '[1]' },
        { name: 'ten', stdin: '10\n', expected: '[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]' },
        { name: 'three', stdin: '3\n', expected: '[1, 4, 9]' },
      ],
    },
    {
      id: 'string-palindrome',
      title: 'Working with Strings',
      content: L`## Strings are collections of characters

A **String** is text you own and can grow. A **&str** ("string slice") is a borrowed view of text, such as a literal ^"hello"^ in your code. Functions that only read text usually take ^&str^. Both store text in **UTF-8**, a standard way of storing letters from every language (and emoji) as bytes. Because of UTF-8 you cannot just ask for "letter number 3" by index; instead you walk through the **characters**. A **char** is one single letter, digit, or symbol, written with single quotes like ^'a'^.

An **iterator** is something that hands out values one at a time. ^s.chars()^ gives an iterator over the characters of ^s^. You can attach steps to it with dots:

- ^.filter(...)^ keeps only items that pass a test
- ^.map(...)^ changes each item into something else
- ^.rev()^ walks the items backwards
- ^.collect()^ gathers the items into a collection (you say which kind with a type, such as ^Vec<char>^ or ^String^)

The test or change inside ^filter^ and ^map^ is written as a **closure**: a tiny nameless function written ^|c| expression^, where the part between the bars is its input.

## Example

~~~
fn main() {
    let rev: String = "abc".chars().rev().collect();
    println!("{}", rev);

    let letters: Vec<char> = "a1 b2!"
        .chars()
        .filter(|c| c.is_alphanumeric())
        .collect();
    println!("{:?}", letters);
}
~~~

- ^"abc".chars()^ makes an iterator over ^'a'^, ^'b'^, ^'c'^.
- ^.rev()^ flips the order to c, b, a.
- ^.collect()^ builds a ^String^ because the variable is declared ^let rev: String^.
- ^|c| c.is_alphanumeric()^ is a closure that is true when ^c^ is a letter or digit.
- ^.filter(...)^ throws away spaces and punctuation.
- The second ^collect^ makes a ^Vec<char>^, printed with ^{:?}^.

Output:

~~~
cba
['a', '1', 'b', '2']
~~~

## Try it

Change ^"abc"^ to ^"hello"^ and see it reversed. Then change ^is_alphanumeric()^ to ^is_alphabetic()^ and notice the digits disappear.

## Your task

A **palindrome** reads the same forwards and backwards (like "Racecar"). Write ^fn is_palindrome(s: &str) -> bool^ that ignores upper/lower case and ignores anything that is not a letter or digit.

Steps: filter to alphanumeric characters, map each with ^to_ascii_lowercase()^, collect into a ^Vec<char>^, build a reversed copy, and compare the two vectors with ^==^.

- "A man, a plan, a canal: Panama" gives ^true^
- "hello" gives ^false^
- "" (empty) gives ^true^`,
      terms: [
        { term: 'String', def: 'Owned, growable text.' },
        { term: '&str', def: 'A borrowed view of text, such as a string literal.' },
        { term: 'UTF-8', def: 'The standard way text from all languages is stored as bytes.' },
        { term: 'char', def: 'A single letter, digit, or symbol, written in single quotes.' },
        { term: 'iterator', def: 'Something that hands out values one at a time.' },
        { term: 'closure', def: 'A small nameless function written |input| expression.' },
        { term: 'collect', def: 'Gathers the items of an iterator into a collection such as a Vec or String.' },
        { term: 'palindrome', def: 'Text that reads the same forwards and backwards.' },
      ],
      starter: L`fn is_palindrome(s: &str) -> bool {
    todo!()
}
`,
      solution: L`fn is_palindrome(s: &str) -> bool {
    let cleaned: Vec<char> = s
        .chars()
        .filter(|c| c.is_alphanumeric())
        .map(|c| c.to_ascii_lowercase())
        .collect();
    let rev: Vec<char> = cleaned.iter().rev().cloned().collect();
    cleaned == rev
}
`,
      harness: L`fn main() {
    let mut line = String::new();
    std::io::stdin().read_line(&mut line).unwrap();
    println!("{}", is_palindrome(line.trim()));
}`,
      hint: 'Filter to alphanumerics, lowercase them, compare with the reversed sequence.',
      tests: [
        { name: 'classic sentence', stdin: 'A man, a plan, a canal: Panama\n', expected: 'true' },
        { name: 'not a palindrome', stdin: 'hello\n', expected: 'false' },
        { name: 'empty string', stdin: '\n', expected: 'true' },
        { name: 'mixed case', stdin: 'Racecar\n', expected: 'true' },
        { name: 'two different letters', stdin: 'ab\n', expected: 'false' },
        { name: 'quotes and spaces', stdin: "No 'x' in Nixon\n", expected: 'true' },
        { name: 'digits', stdin: '12321\n', expected: 'true' },
        { name: 'digits not palindrome', stdin: '123\n', expected: 'false' },
      ],
    },
    {
      id: 'hashmap-count',
      title: 'HashMaps',
      content: L`## Looking things up by key

A **hash map** is a collection that stores pairs: a **key** and a **value**. You look a value up by its key, like finding a phone number by a person's name in a phonebook. Name = key, number = value. Each key appears only once. The type is ^HashMap<K, V>^, such as ^HashMap<String, usize>^ (text keys, whole-number values). ^usize^ is the whole-number type Rust uses for counts and sizes.

A hash map lives in the standard library, so you bring it in with ^use std::collections::HashMap;^. A **hash map does not keep any order**, so when we print one we sort first.

The **entry API** is the handy way to count: ^map.entry(key)^ looks at a key's slot, ^.or_insert(0)^ puts in 0 if the key was missing, and gives back a **mutable reference** (a lent handle that lets you change the stored value). The star ^*^ **dereferences** it, meaning "go to the value it points at", so ^*... += 1^ adds one to the stored count.

## Example

~~~
use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    scores.insert(String::from("Ada"), 10);
    *scores.entry(String::from("Ada")).or_insert(0) += 5;
    *scores.entry(String::from("Bob")).or_insert(0) += 1;
    println!("{:?}", scores.get("Ada"));
    println!("{:?}", scores.get("Zed"));
}
~~~

- ^HashMap::new()^ makes an empty map.
- ^scores.insert(key, value)^ stores a pair.
- The first ^entry(...)^ line finds Ada (already 10) and adds 5, making 15.
- The second ^entry(...)^ line finds no Bob, inserts 0, then adds 1.
- ^scores.get("Ada")^ returns an ^Option^: ^Some(value)^ if the key exists, or ^None^ if not.

Output:

~~~
Some(15)
None
~~~

## Try it

Change ^scores.get("Zed")^ to ^scores.get("Bob")^. It should now print ^Some(1)^.

## Your task

Write ^fn word_count(text: &str) -> HashMap<String, usize>^ mapping each whitespace-separated word to how many times it appears. ^text.split_whitespace()^ is an iterator over the words. For each word do ^*map.entry(w.to_string()).or_insert(0) += 1;^ (^to_string()^ turns a ^&str^ into an owned ^String^).

For "the cat and the hat and the bat" you get: and 2, bat 1, cat 1, hat 1, the 3. For an empty text the map is empty.

The tests print each pair sorted as ^word: count^ followed by ^distinct=N^, the number of different words.`,
      terms: [
        { term: 'hash map', def: 'A collection of key and value pairs, looked up by key.' },
        { term: 'key', def: 'The label used to find an entry in a map; each key appears once.' },
        { term: 'value', def: 'The data stored under a key.' },
        { term: 'entry().or_insert()', def: 'Finds a key, inserting a starting value if it is missing.' },
        { term: '*', def: 'Dereference: follow a reference to the value it points at.' },
        { term: 'usize', def: 'The unsigned whole-number type used for counts and sizes.' },
        { term: 'Option', def: 'Either Some(value) or None, for results that may be missing.' },
        { term: 'use', def: 'Brings a name from the standard library into scope.' },
      ],
      starter: L`use std::collections::HashMap;

fn word_count(text: &str) -> HashMap<String, usize> {
    todo!()
}
`,
      solution: L`use std::collections::HashMap;

fn word_count(text: &str) -> HashMap<String, usize> {
    let mut map = HashMap::new();
    for w in text.split_whitespace() {
        *map.entry(w.to_string()).or_insert(0) += 1;
    }
    map
}
`,
      harness: L`fn main() {
    let mut line = String::new();
    std::io::stdin().read_line(&mut line).unwrap();
    let m = word_count(line.trim());
    let mut items: Vec<_> = m.iter().collect();
    items.sort();
    for (k, v) in items {
        println!("{}: {}", k, v);
    }
    println!("distinct={}", m.len());
}`,
      hint: '*map.entry(w.to_string()).or_insert(0) += 1;',
      tests: [
        { name: 'repeated words', stdin: 'the cat and the hat and the bat\n', expected: 'and: 2\nbat: 1\ncat: 1\nhat: 1\nthe: 3\ndistinct=5' },
        { name: 'empty text', stdin: '\n', expected: 'distinct=0' },
        { name: 'single word', stdin: 'hello\n', expected: 'hello: 1\ndistinct=1' },
        { name: 'all the same', stdin: 'a a a a\n', expected: 'a: 4\ndistinct=1' },
        { name: 'extra spaces', stdin: '  Spaces   between  words \n', expected: 'Spaces: 1\nbetween: 1\nwords: 1\ndistinct=3' },
        { name: 'case matters', stdin: 'The the\n', expected: 'The: 1\nthe: 1\ndistinct=2' },
      ],
    },
    {
      id: 'iterators',
      title: 'Iterator Chains',
      content: L`## Building a pipeline

You met iterators already: an **iterator** hands out values one at a time. Calling ^v.iter()^ on a vector or slice gives an iterator over references to its elements. You can chain **adapters** onto it, each one a step in an assembly line:

- ^filter(test)^ keeps items for which the test is true
- ^map(change)^ transforms each item

Adapters are **lazy**: they do nothing by themselves, like a recipe that has not been cooked. A **consumer** such as ^sum()^, ^count()^ or ^collect()^ actually runs the pipeline and produces a final answer.

The tests are written as **closures**, tiny nameless functions: ^|x| x * 2^ means "given x, give back x times 2". Because ^iter()^ lends references, you often see patterns like ^|&x|^ (copy the number out of the reference) or ^|&&x|^ in ^filter^ (filter receives a reference to the reference).

## Example

~~~
fn main() {
    let v = vec![-1, 2, 3, -4, 5];
    let total: i32 = v.iter()
        .filter(|&&x| x > 0)
        .map(|x| x * 2)
        .sum();
    println!("{}", total);
}
~~~

- ^v.iter()^ starts the pipeline over -1, 2, 3, -4, 5.
- ^.filter(|&&x| x > 0)^ keeps only positives: 2, 3, 5.
- ^.map(|x| x * 2)^ doubles each: 4, 6, 10.
- ^.sum()^ is the consumer that adds them up. The type annotation ^: i32^ tells Rust what kind of number to produce.

Output:

~~~
20
~~~

## Try it

Change ^x > 0^ to ^x < 0^ and run it. Only -1 and -4 remain, doubled and summed to -10.

## Your task

Write ^fn sum_odd_squares(v: &[i32]) -> i32^ returning the sum of the squares of the **odd** numbers, using an iterator chain (no ^for^ loop). A number is odd when ^x % 2 != 0^ (this also works for negatives).

- ^[1, 2, 3, 4, 5]^ gives ^35^ (1 + 9 + 25)
- an empty list gives ^0^
- ^[-3, 3]^ gives ^18^`,
      terms: [
        { term: 'iterator', def: 'Something that hands out values one at a time.' },
        { term: 'adapter', def: 'An iterator step such as filter or map that changes the stream of items.' },
        { term: 'lazy', def: 'Does no work until a consumer asks for the result.' },
        { term: 'consumer', def: 'A final step such as sum, count or collect that runs the chain.' },
        { term: 'closure', def: 'A small nameless function written |input| expression.' },
        { term: 'iter()', def: 'Makes an iterator over references to the elements.' },
        { term: '%', def: 'The remainder operator: what is left after dividing.' },
      ],
      starter: L`fn sum_odd_squares(v: &[i32]) -> i32 {
    todo!()
}
`,
      solution: L`fn sum_odd_squares(v: &[i32]) -> i32 {
    v.iter().filter(|&&x| x % 2 != 0).map(|&x| x * x).sum()
}
`,
      require: [{ re: '\\.iter\\(\\)', msg: 'Use .iter() and an iterator chain.' }, { re: '^(?![\\s\\S]*\\bfor\\b)', msg: 'Do not use a for loop - use iterator adapters.' }],
      harness: L`fn main() {
    let mut line = String::new();
    std::io::stdin().read_line(&mut line).unwrap();
    let v: Vec<i32> = line.split_whitespace().map(|s| s.parse().unwrap()).collect();
    println!("{}", sum_odd_squares(&v));
}`,
      hint: 'v.iter().filter(...).map(...).sum()',
      tests: [
        { name: 'one to five', stdin: '1 2 3 4 5\n', expected: '35' },
        { name: 'empty list', stdin: '\n', expected: '0' },
        { name: 'only evens', stdin: '2 4\n', expected: '0' },
        { name: 'negative odd', stdin: '-3 3\n', expected: '18' },
        { name: 'single odd', stdin: '7\n', expected: '49' },
        { name: 'all negative', stdin: '-1 -2 -3\n', expected: '10' },
      ],
    },
    {
      id: 'sort-stats',
      title: 'Sorting & Statistics',
      content: L`## Sorting and finding extremes

To **sort** a vector is to put its elements in order, smallest first (**ascending**). ^v.sort()^ does this in place, so the vector must be declared ^mut^. After sorting, the smallest element (the **minimum**) is at index 0 and the largest (the **maximum**) is at the last index, which is ^v.len() - 1^.

To print numbers on one line, turn each into a ^String^ with ^map(|n| n.to_string())^, collect them into a ^Vec<String>^, and glue them together with ^.join(" ")^, which puts the given separator between the pieces.

To read input, ^read_line^ puts a line of text into a ^String^; ^split_whitespace^ cuts it into words; ^parse()^ **parses** each word, meaning it converts text such as "42" into the number 42. ^unwrap()^ takes the number out of the result (and crashes if the text was not a number).

## Example

~~~
fn main() {
    let mut v = vec![3, 1, 2];
    v.sort();
    let words: Vec<String> = v.iter().map(|n| n.to_string()).collect();
    println!("{}", words.join(" "));
    println!("first={} last={}", v[0], v[v.len() - 1]);
}
~~~

- ^v.sort();^ reorders to [1, 2, 3].
- ^v.iter().map(|n| n.to_string()).collect()^ makes the strings "1", "2", "3".
- ^words.join(" ")^ glues them with spaces: ^1 2 3^.
- ^v[0]^ reads the element at index 0 (the minimum). ^v[v.len() - 1]^ reads the last one (the maximum).

Output:

~~~
1 2 3
first=1 last=3
~~~

## Try it

Change the vector to ^vec![9, -4, 7]^ and run it. Notice negatives sort before positives.

## Your task

The starter already reads a line of integers into the vector ^nums^. After it, add code that sorts ^nums^ and prints three lines: the numbers sorted ascending separated by spaces, then ^max=^ and the largest, then ^min=^ and the smallest.

For the input ^5 3 9 1^ print:

~~~
1 3 5 9
max=9
min=1
~~~

You may assume at least one number is given.`,
      terms: [
        { term: 'sort', def: 'Put the elements of a vector in order, smallest first.' },
        { term: 'minimum / maximum', def: 'The smallest and the largest element.' },
        { term: 'join', def: 'Glues a list of strings together with a separator between them.' },
        { term: 'parse', def: 'Convert text such as "42" into a number.' },
        { term: 'unwrap', def: 'Take the value out of a result, crashing if there is none.' },
        { term: 'stdin', def: 'The standard input: text typed in or fed to the program.' },
      ],
      starter: L`use std::io;

fn main() {
    let mut line = String::new();
    io::stdin().read_line(&mut line).unwrap();
    let mut nums: Vec<i32> = line.split_whitespace().map(|s| s.parse().unwrap()).collect();

}
`,
      solution: L`use std::io;

fn main() {
    let mut line = String::new();
    io::stdin().read_line(&mut line).unwrap();
    let mut nums: Vec<i32> = line.split_whitespace().map(|s| s.parse().unwrap()).collect();
    nums.sort();
    let strs: Vec<String> = nums.iter().map(|n| n.to_string()).collect();
    println!("{}", strs.join(" "));
    println!("max={}", nums[nums.len() - 1]);
    println!("min={}", nums[0]);
}
`,
      hint: 'After sort(), min is the first element and max is the last.',
      tests: [
        { name: 'four numbers', stdin: '5 3 9 1\n', expected: '1 3 5 9\nmax=9\nmin=1' },
        { name: 'single element', stdin: '42\n', expected: '42\nmax=42\nmin=42' },
        { name: 'negatives and duplicates', stdin: '-1 -5 10 0 10\n', expected: '-5 -1 0 10 10\nmax=10\nmin=-5' },
        { name: 'all equal', stdin: '7 7 7\n', expected: '7 7 7\nmax=7\nmin=7' },
        { name: 'descending input', stdin: '3 2 1\n', expected: '1 2 3\nmax=3\nmin=1' },
      ],
    },
  ],
};
