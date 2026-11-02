// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';
const L = String.raw;

// Function lessons: the autograder supplies `main` (the "harness") and calls your function.
module.exports = {
  id: 'functions',
  title: 'Functions',
  lessons: [
    {
      id: 'fn-square',
      title: 'Writing Functions',
      content: L`## What is a function?

A **function** is a named, reusable recipe: a bundle of instructions that you write once and can run (the programmer's word is **call**) as many times as you like. Think of a juice machine: you drop fruit in, it does its steps, and juice comes out. You don't rebuild the machine each time.

In Rust a function starts with the keyword ^fn^ (a **keyword** is a word with a special built-in meaning). Between parentheses you list the **parameters**: named slots the function fills in with the values you hand it. Each parameter needs a **type** (the kind of data it holds, like ^i32^, a whole number that can be negative). After ^->^ you write the **return type**: the type of the **return value**, which is the answer the function hands back to whoever called it.

~~~
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    let total = add(2, 3);
    println!("{}", total);
}
~~~

- ^fn add(a: i32, b: i32) -> i32 {^ defines a function named ^add^ with two parameters, both ^i32^, that returns an ^i32^. The ^{^ opens the function's **body** (the instructions inside).
- ^a + b^ is an **expression**: a piece of code that works out to a value. It has no semicolon, so Rust treats it as the value to return.
- ^}^ ends the body.
- ^fn main() {^ is the special function where every program starts.
- ^add(2, 3)^ calls ^add^. The values ^2^ and ^3^ are the **arguments** (the actual values you pass in); they fill the parameters ^a^ and ^b^.
- ^let total = ...^ stores the returned value in a variable called ^total^.
- ^println!("{}", total);^ prints it.

Output:

~~~
5
~~~

Key rule: the last expression **without a semicolon** is the return value. Adding a semicolon turns it into a statement (an instruction that produces no value), and Rust will complain. You can also write ^return a + b;^ explicitly.

From here on, the autograder supplies ^main^ for you and calls your function with several inputs. Don't write your own ^main^.

## Try it

Change ^a + b^ to ^a * b^ and run the example in your head (or in a scratch program): what prints now? Then add a semicolon after the expression and read the compiler's error message.

## Your task

Implement ^square^ so it returns ^x * x^. For example ^square(4)^ is ^16^, ^square(-3)^ is ^9^ and ^square(0)^ is ^0^.`,
      terms: [
        { term: 'function', def: 'A named, reusable block of code that you can call whenever you need it.' },
        { term: 'fn', def: 'The keyword that starts a function definition.' },
        { term: 'parameter', def: 'A named slot in a function that is filled with the value you pass in.' },
        { term: 'argument', def: 'The actual value you give a function when you call it.' },
        { term: 'return value', def: 'The answer a function hands back to its caller.' },
        { term: '->', def: 'Written before the return type to say what type the function gives back.' },
        { term: 'expression', def: 'Code that works out to a value, like a + b.' },
      ],
      starter: L`fn square(x: i32) -> i32 {
    // TODO
    todo!()
}
`,
      solution: L`fn square(x: i32) -> i32 {
    x * x
}
`,
      harness: L`fn main() {
    for line in std::io::stdin().lines() {
        let line = line.unwrap();
        let v: Vec<&str> = line.split_whitespace().collect();
        if v.is_empty() { continue; }
        for t in v {
            let x: i32 = t.parse().unwrap();
            println!("{}", square(x));
        }
    }
}`,
      hint: 'Return x * x with no semicolon.',
      tests: [
        { name: 'positive', stdin: '4\n', expected: '16' },
        { name: 'negative', stdin: '-3\n', expected: '9' },
        { name: 'zero', stdin: '0\n', expected: '0' },
        { name: 'large', stdin: '46340\n', expected: '2147395600' },
        { name: 'several numbers', stdin: '1 2 3 10\n', expected: '1\n4\n9\n100' },
      ],
    },
    {
      id: 'fn-max3',
      title: 'Several Parameters',
      content: L`## More than one input

A function can have any number of **parameters**, separated by commas. Inside the function you can make decisions with ^if^ (run code only when a **condition**, a question with a true/false answer, is true). Remember that ^if ... else ...^ is itself an **expression** (code that produces a value), so it can be the function's return value.

~~~
fn bigger(a: i32, b: i32) -> i32 {
    if a > b { a } else { b }
}

fn main() {
    println!("{}", bigger(3, 8));
    println!("{}", bigger(-1, -7));
}
~~~

- ^fn bigger(a: i32, b: i32) -> i32^ takes two numbers and gives one back.
- ^if a > b { a } else { b }^ checks whether ^a^ is greater (^>^). If so the whole ^if^ becomes ^a^, otherwise ^b^. No semicolons, so it is the return value.
- ^bigger(3, 8)^ passes ^3^ and ^8^ as **arguments** (values handed in), in the same order as the parameters.
- ^bigger(-1, -7)^ shows negatives work too; ^-1^ is bigger than ^-7^.

Output:

~~~
8
-1
~~~

Another handy idea is a **running maximum**: a variable that holds the biggest value seen so far. Declare it with ^let mut^ (a **mutable** variable can be changed later) and update it with ^=^ whenever you see something bigger.

## Try it

Change ^>^ to ^<^ in ^bigger^. It now returns the smaller number. Which output lines change?

## Your task

Write ^max_of_three(a, b, c)^ taking three ^i32^ values and returning the largest. For example ^max_of_three(1, 2, 3)^ is ^3^ and ^max_of_three(-5, -2, -9)^ is ^-2^.`,
      terms: [
        { term: 'parameter', def: 'A named input slot of a function; a function may have several, separated by commas.' },
        { term: 'condition', def: 'A true-or-false question, like a > b, that if uses to decide.' },
        { term: 'if / else', def: 'Runs one branch of code or another depending on a condition; it also produces a value.' },
        { term: '>', def: 'Greater-than comparison; gives true or false.' },
        { term: 'let mut', def: 'Creates a variable whose value is allowed to change later.' },
        { term: 'running maximum', def: 'A variable holding the biggest value seen so far, updated as you check more values.' },
      ],
      starter: L`fn max_of_three(a: i32, b: i32, c: i32) -> i32 {
    todo!()
}
`,
      solution: L`fn max_of_three(a: i32, b: i32, c: i32) -> i32 {
    let mut m = a;
    if b > m { m = b; }
    if c > m { m = c; }
    m
}
`,
      harness: L`fn main() {
    for line in std::io::stdin().lines() {
        let line = line.unwrap();
        let v: Vec<&str> = line.split_whitespace().collect();
        if v.is_empty() { continue; }
        let a: i32 = v[0].parse().unwrap();
        let b: i32 = v[1].parse().unwrap();
        let c: i32 = v[2].parse().unwrap();
        println!("{}", max_of_three(a, b, c));
    }
}`,
      hint: 'Keep a running maximum, or nest two comparisons.',
      tests: [
        { name: 'ascending', stdin: '1 2 3\n', expected: '3' },
        { name: 'first is biggest', stdin: '9 2 3\n', expected: '9' },
        { name: 'middle is biggest', stdin: '4 8 3\n', expected: '8' },
        { name: 'all negative', stdin: '-5 -2 -9\n', expected: '-2' },
        { name: 'all equal', stdin: '7 7 7\n', expected: '7' },
        { name: 'extremes', stdin: '2147483647 0 -2147483648\n', expected: '2147483647' },
        { name: 'several lines', stdin: '1 5 2\n-1 -1 -2\n0 0 0\n', expected: '5\n-1\n0' },
      ],
    },
    {
      id: 'fn-is-prime',
      title: 'Returning bool',
      content: L`## Yes/no functions

A **bool** (short for Boolean) is a type with only two values: ^true^ and ^false^. A function that answers a yes/no question returns a ^bool^, and by convention its name starts with ^is_^. Comparisons like ^==^ ("is equal to") produce a ^bool^.

The **remainder operator** ^%^ gives what is left over after division: ^7 % 2^ is ^1^, and ^8 % 2^ is ^0^. A number is **divisible** by another when the remainder is ^0^.

Sometimes you know the answer early. The keyword ^return^ leaves the function immediately with a value.

~~~
fn is_even(n: u32) -> bool {
    n % 2 == 0
}

fn has_small_factor(n: u32) -> bool {
    let mut d = 2;
    while d < n {
        if n % d == 0 {
            return true;
        }
        d += 1;
    }
    false
}

fn main() {
    println!("{}", is_even(10));
    println!("{}", is_even(7));
    println!("{}", has_small_factor(9));
    println!("{}", has_small_factor(7));
}
~~~

- ^is_even^ takes a ^u32^ (an **unsigned** integer: whole number, never negative) and returns whether ^n % 2^ equals ^0^.
- ^let mut d = 2;^ starts a counter at 2.
- ^while d < n {^ is a **loop**: it repeats its body as long as the condition is true.
- ^if n % d == 0 { return true; }^ leaves right away if ^d^ divides ^n^ evenly.
- ^d += 1;^ adds one to ^d^ so the next pass tries the next number.
- ^false^ on the last line is the answer if the loop finished without finding a divisor.

Output:

~~~
true
false
true
false
~~~

## Try it

Change ^has_small_factor(9)^ to ^has_small_factor(11)^. What do you expect, and why?

## Your task

Write ^is_prime(n: u32) -> bool^. A **prime** is a number greater than 1 that is divisible only by 1 and itself. 0 and 1 are not prime. So ^is_prime(2)^, ^is_prime(17)^ are ^true^; ^is_prime(0)^, ^is_prime(1)^, ^is_prime(100)^ are ^false^.

Tip: you only need to try divisors ^d^ while ^d * d <= n^, since a bigger divisor would pair with a smaller one you've already tried.`,
      terms: [
        { term: 'bool', def: 'A type with only two values, true and false.' },
        { term: '%', def: 'The remainder operator: what is left after dividing (7 % 2 is 1).' },
        { term: '==', def: 'Comparison that asks whether two values are equal; gives a bool.' },
        { term: 'return', def: 'Leaves the function immediately, handing back a value.' },
        { term: 'while', def: 'A loop that repeats its body as long as its condition is true.' },
        { term: 'u32', def: 'An unsigned (never negative) whole-number type.' },
        { term: 'prime', def: 'A number greater than 1 divisible only by 1 and itself.' },
      ],
      starter: L`fn is_prime(n: u32) -> bool {
    todo!()
}
`,
      solution: L`fn is_prime(n: u32) -> bool {
    if n < 2 {
        return false;
    }
    let mut d = 2;
    while d * d <= n {
        if n % d == 0 {
            return false;
        }
        d += 1;
    }
    true
}
`,
      harness: L`fn main() {
    for line in std::io::stdin().lines() {
        let line = line.unwrap();
        let v: Vec<&str> = line.split_whitespace().collect();
        if v.is_empty() { continue; }
        let n: u32 = v[0].parse().unwrap();
        println!("{} {}", n, is_prime(n));
    }
}`,
      hint: 'Try every divisor from 2 while d * d <= n.',
      tests: [
        { name: 'zero and one', stdin: '0\n1\n', expected: '0 false\n1 false' },
        { name: 'two and three', stdin: '2\n3\n', expected: '2 true\n3 true' },
        { name: 'small composite', stdin: '4\n18\n100\n', expected: '4 false\n18 false\n100 false' },
        { name: 'primes', stdin: '17\n97\n7919\n', expected: '17 true\n97 true\n7919 true' },
        { name: 'perfect square', stdin: '65536\n', expected: '65536 false' },
        { name: 'large prime', stdin: '2147483647\n', expected: '2147483647 true' },
      ],
    },
    {
      id: 'fn-factorial',
      title: 'Recursion',
      content: L`## Functions calling themselves

**Recursion** means a function calls itself to solve a smaller piece of the same problem. Picture a set of nesting dolls: to count them, open one, then count the dolls inside it, which is the same job again, only smaller.

Every recursive function needs a **base case**: a situation simple enough to answer directly, which stops the chain. Without one, the function would call itself forever.

~~~
fn countdown(n: u32) {
    if n == 0 {
        println!("liftoff");
        return;
    }
    println!("{}", n);
    countdown(n - 1);
}

fn main() {
    countdown(3);
}
~~~

- ^fn countdown(n: u32)^ has no ^->^, so it returns nothing useful (it only prints).
- ^if n == 0 {^ is the base case: stop counting.
- ^println!("liftoff"); return;^ prints and leaves the function, so no more calls are made.
- ^println!("{}", n);^ prints the current number.
- ^countdown(n - 1);^ is the **recursive call**: the same function with a smaller number, getting closer to the base case.

Output:

~~~
3
2
1
liftoff
~~~

The **factorial** of n, written ^n!^, is ^n * (n-1) * ... * 1^. So ^5! = 120^. It fits recursion naturally: ^0! = 1^ (base case) and ^n! = n * (n-1)!^.

## Try it

Change ^countdown(3)^ to ^countdown(5)^ and predict the output before running.

## Your task

Write ^factorial(n: u64) -> u64^ **recursively** (it must call itself). ^u64^ is an unsigned 64-bit whole number, big enough for ^20!^. Examples: ^factorial(0)^ is ^1^, ^factorial(5)^ is ^120^, ^factorial(10)^ is ^3628800^.`,
      terms: [
        { term: 'recursion', def: 'A function calling itself to solve a smaller version of the same problem.' },
        { term: 'base case', def: 'The simple situation that is answered directly and stops the recursion.' },
        { term: 'recursive call', def: 'The line where a function calls itself.' },
        { term: 'factorial', def: 'n! is n multiplied by every whole number below it down to 1; 0! is 1.' },
        { term: 'u64', def: 'An unsigned 64-bit whole-number type that holds very large values.' },
      ],
      starter: L`fn factorial(n: u64) -> u64 {
    todo!()
}
`,
      solution: L`fn factorial(n: u64) -> u64 {
    if n == 0 {
        1
    } else {
        n * factorial(n - 1)
    }
}
`,
      require: [{ re: 'fn\\s+factorial[\\s\\S]*factorial\\s*\\(\\s*n', msg: 'factorial should call itself.' }],
      harness: L`fn main() {
    for line in std::io::stdin().lines() {
        let line = line.unwrap();
        let v: Vec<&str> = line.split_whitespace().collect();
        if v.is_empty() { continue; }
        let n: u64 = v[0].parse().unwrap();
        println!("{}", factorial(n));
    }
}`,
      hint: 'Base case n == 0 returns 1; otherwise n * factorial(n - 1).',
      tests: [
        { name: 'zero', stdin: '0\n', expected: '1' },
        { name: 'one', stdin: '1\n', expected: '1' },
        { name: 'five', stdin: '5\n', expected: '120' },
        { name: 'ten', stdin: '10\n', expected: '3628800' },
        { name: 'twenty (largest that fits)', stdin: '20\n', expected: '2432902008176640000' },
        { name: 'several', stdin: '3\n4\n6\n', expected: '6\n24\n720' },
      ],
    },
    {
      id: 'fn-fibonacci',
      title: 'Fibonacci',
      content: L`## A famous sequence

The **Fibonacci sequence** is 0, 1, 1, 2, 3, 5, 8, 13, ... where each number is the sum of the two before it. We write ^fib(0) = 0^ and ^fib(1) = 1^.

Recursion (a function calling itself) works but is slow here, because it recomputes the same values again and again. A **loop** (code that repeats) is much faster: keep just the last two numbers and slide forward.

A **tuple** is a small fixed group of values written in parentheses, like ^(0, 1)^. You can unpack one into several variables in one go: ^let (mut a, mut b) = (0u64, 1u64);^. The ^u64^ suffix on a number says "this is a u64".

~~~
fn main() {
    let (mut a, mut b) = (0u64, 1u64);
    for _ in 0..5 {
        println!("{}", a);
        let next = a + b;
        a = b;
        b = next;
    }
}
~~~

- ^let (mut a, mut b) = (0u64, 1u64);^ makes two changeable variables: ^a = 0^, ^b = 1^.
- ^for _ in 0..5 {^ repeats 5 times. ^0..5^ is a **range** (0,1,2,3,4); ^_^ means "I don't need the counter's value".
- ^println!("{}", a);^ prints the current Fibonacci number.
- ^let next = a + b;^ computes the following number and stores it temporarily.
- ^a = b;^ shifts the window: the old second number becomes the first.
- ^b = next;^ the new number becomes the second.

Output:

~~~
0
1
1
2
3
~~~

## Try it

Change ^0..5^ to ^0..10^. How many numbers print now? What is the last?

## Your task

Write ^fib(n: u32) -> u64^ returning the n-th Fibonacci number. After looping n times, ^a^ holds the answer. Examples: ^fib(0)^ is ^0^, ^fib(10)^ is ^55^, ^fib(40)^ is ^102334155^. The tests go up to n = 90, so a naive recursive version would take far too long.`,
      terms: [
        { term: 'Fibonacci sequence', def: '0, 1, 1, 2, 3, 5, ... where each number is the sum of the previous two.' },
        { term: 'loop', def: 'Code that repeats several times.' },
        { term: 'tuple', def: 'A fixed-size group of values in parentheses, like (0, 1).' },
        { term: 'range', def: 'Written 0..5; the numbers from 0 up to but not including 5.' },
        { term: '_', def: 'A placeholder name meaning "I do not need this value".' },
        { term: 'for', def: 'A loop that goes through each value of a range or collection.' },
      ],
      starter: L`fn fib(n: u32) -> u64 {
    todo!()
}
`,
      solution: L`fn fib(n: u32) -> u64 {
    let (mut a, mut b) = (0u64, 1u64);
    for _ in 0..n {
        let next = a + b;
        a = b;
        b = next;
    }
    a
}
`,
      harness: L`fn main() {
    for line in std::io::stdin().lines() {
        let line = line.unwrap();
        let v: Vec<&str> = line.split_whitespace().collect();
        if v.is_empty() { continue; }
        let n: u32 = v[0].parse().unwrap();
        println!("{}", fib(n));
    }
}`,
      hint: 'Keep two variables a and b and loop n times, updating them.',
      tests: [
        { name: 'fib 0', stdin: '0\n', expected: '0' },
        { name: 'fib 1', stdin: '1\n', expected: '1' },
        { name: 'fib 2', stdin: '2\n', expected: '1' },
        { name: 'fib 10', stdin: '10\n', expected: '55' },
        { name: 'fib 20', stdin: '20\n', expected: '6765' },
        { name: 'fib 40', stdin: '40\n', expected: '102334155' },
        { name: 'fib 90 (needs a loop)', stdin: '90\n', expected: '2880067194370816120' },
      ],
    },
    {
      id: 'fn-gcd',
      title: "Euclid's Algorithm",
      content: L`## Greatest common divisor

The **greatest common divisor** (GCD) of two numbers is the biggest number that divides both with no remainder. For 12 and 18 it is 6. Think of cutting two ribbons into equal pieces as long as possible with nothing left over.

An **algorithm** is a step-by-step method for solving a problem. Euclid's algorithm, over 2000 years old, is recursive:

- If ^b^ is ^0^, the answer is ^a^ (base case).
- Otherwise the answer is the GCD of ^b^ and ^a % b^ (the **remainder**, what's left after dividing ^a^ by ^b^).

~~~
fn gcd(a: u64, b: u64) -> u64 {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}

fn main() {
    println!("{}", gcd(12, 18));
}
~~~

- ^if b == 0 { a }^ is the base case: nothing left to divide, so ^a^ is the answer.
- ^gcd(b, a % b)^ is the recursive call with smaller numbers.
- The chain is ^gcd(12, 18)^, then ^gcd(18, 12)^, then ^gcd(12, 6)^, then ^gcd(6, 0)^, which returns ^6^.

Output:

~~~
6
~~~

## Try it

Replace ^gcd(12, 18)^ with ^gcd(17, 5)^. Two numbers with GCD 1 are called **coprime**: they share no factor.

## Your task

Write ^gcd(a: u64, b: u64) -> u64^. Examples: ^gcd(100, 75)^ is ^25^, ^gcd(7, 0)^ is ^7^, ^gcd(0, 9)^ is ^9^.`,
      terms: [
        { term: 'greatest common divisor', def: 'The largest number that divides both given numbers with no remainder.' },
        { term: 'algorithm', def: 'A step-by-step method for solving a problem.' },
        { term: 'remainder', def: 'What is left over after division; written with %.' },
        { term: 'recursive call', def: 'A function calling itself with a smaller problem.' },
        { term: 'coprime', def: 'Two numbers whose greatest common divisor is 1.' },
      ],
      starter: L`fn gcd(a: u64, b: u64) -> u64 {
    todo!()
}
`,
      solution: L`fn gcd(a: u64, b: u64) -> u64 {
    if b == 0 { a } else { gcd(b, a % b) }
}
`,
      harness: L`fn main() {
    for line in std::io::stdin().lines() {
        let line = line.unwrap();
        let v: Vec<&str> = line.split_whitespace().collect();
        if v.is_empty() { continue; }
        let a: u64 = v[0].parse().unwrap();
        let b: u64 = v[1].parse().unwrap();
        println!("{}", gcd(a, b));
    }
}`,
      hint: 'if b == 0 { a } else { gcd(b, a % b) }',
      tests: [
        { name: 'common factor', stdin: '12 18\n', expected: '6' },
        { name: 'coprime', stdin: '17 5\n', expected: '1' },
        { name: 'multiple', stdin: '100 75\n', expected: '25' },
        { name: 'b is zero', stdin: '7 0\n', expected: '7' },
        { name: 'a is zero', stdin: '0 9\n', expected: '9' },
        { name: 'both zero', stdin: '0 0\n', expected: '0' },
        { name: 'classic', stdin: '1071 462\n', expected: '21' },
        { name: 'large primes', stdin: '1000000007 998244353\n', expected: '1' },
      ],
    },
  ],
};
