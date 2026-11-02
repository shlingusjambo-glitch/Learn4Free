// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';
const L = String.raw;

module.exports = {
  id: 'errors-traits',
  title: 'Errors, Traits & Generics',
  lessons: [
    {
      id: 'result-basics',
      title: 'Result',
      content: L`## Things can go wrong

A **function** is a named recipe of code. Some recipes can fail: turning the text "abc" into a number makes no sense. Rust does not hide this. A function that might fail returns a **Result**, a box that holds EITHER a success OR an error. Think of ordering a parcel: it arrives with your item, or with a "could not deliver" note.

- **Ok(value)** is the success side: the box holds the good answer.
- **Err(error)** is the failure side: the box holds a description of what went wrong.
- ^Result<i32, String>^ is the type: the **<...>** part says "success holds an ^i32^, failure holds a ^String^".
- To look inside the box we use **match**, which checks which side we have and runs the matching arm.
- **parse** converts text to another type, like a number, and itself returns a ^Result^.

## Example

~~~
fn parse_num(s: &str) -> Result<i32, String> {
    match s.parse::<i32>() {
        Ok(n) => Ok(n),
        Err(_) => Err(format!("bad number: {}", s)),
    }
}

fn main() {
    println!("{:?}", parse_num("42"));
    println!("{:?}", parse_num("hi"));
}
~~~

- ^fn parse_num(s: &str) -> Result<i32, String>^ declares a function taking text and returning a ^Result^.
- ^s.parse::<i32>()^ tries to read the text as an ^i32^ number; the ^::<i32>^ names the wanted type.
- ^Ok(n) => Ok(n)^: parsing worked, so pass the number on as a success.
- ^Err(_) => ...^: parsing failed; ^_^ means "I don't care about the details".
- ^format!^ works like ^println!^ but gives back a ^String^ instead of printing.
- ^{:?}^ prints a value in "debug" form, which shows ^Ok(...)^ and ^Err(...)^ wrappers.

Output:

~~~
Ok(42)
Err("bad number: hi")
~~~

## Try it

Change ^"hi"^ to ^"7"^ and run: the second line becomes ^Ok(7)^.

## Your task

Write ^parse_age^: parse a ^u8^ (a whole number 0 to 255) and return ^Ok(age)^, or ^Err("invalid age: <text>")^ if it isn't a valid ^u8^ (negative, too large, or not a number). For example ^"300"^ gives ^Err("invalid age: 300")^.`,
      terms: [{ term: "Result", def: "A value that is either Ok (success) or Err (failure)." }, { term: "Ok", def: "The success side of a Result, holding the good value." }, { term: "Err", def: "The failure side of a Result, holding the error." }, { term: "match", def: "Checks which shape a value has and runs the matching arm." }, { term: "parse", def: "Converts text into another type such as a number; returns a Result." }, { term: "format!", def: "Like println! but returns a String instead of printing." }, { term: "{:?}", def: "Debug print format that shows the structure of a value." }],
      starter: L`fn parse_age(s: &str) -> Result<u8, String> {
    todo!()
}
`,
      solution: L`fn parse_age(s: &str) -> Result<u8, String> {
    match s.parse::<u8>() {
        Ok(n) => Ok(n),
        Err(_) => Err(format!("invalid age: {}", s)),
    }
}
`,
      harness: L`fn main() {
    println!("{:?}", parse_age("42"));
    println!("{:?}", parse_age("abc"));
    println!("{:?}", parse_age("300"));
    println!("{:?}", parse_age("-1"));
}`,
      hint: 'match s.parse::<u8>() { Ok(n) => Ok(n), Err(_) => Err(format!(...)) }',
      tests: [{ expected: 'Ok(42)\nErr("invalid age: abc")\nErr("invalid age: 300")\nErr("invalid age: -1")' }],
    },
    {
      id: 'result-question',
      title: 'The ? Operator',
      content: L`## Passing the problem upward

Writing a ^match^ for every possible failure is tiring. The **?** operator is a shortcut: put it after something that returns a ^Result^. If it is ^Ok^, ^?^ takes out the value inside and carries on. If it is ^Err^, the function stops right there and hands that error back to whoever called it. Handing an error up to the caller like this is called **error propagation**, like passing a complaint to your boss instead of fixing it yourself.

Two rules: ^?^ only works inside a function that itself returns a ^Result^, and the error types must match. A **ParseIntError** is the standard error type that ^parse^ produces for integers.

## Example

~~~
fn double(s: &str) -> Result<i32, std::num::ParseIntError> {
    let n: i32 = s.trim().parse()?;
    Ok(n * 2)
}

fn main() {
    println!("{:?}", double("21"));
    println!("{:?}", double("x"));
}
~~~

- ^s.trim()^ removes spaces around the text.
- ^.parse()?^ parses; on failure the function returns the ^Err^ immediately.
- ^let n: i32^ names the unwrapped number (the type tells ^parse^ what to make).
- ^Ok(n * 2)^ wraps the final answer as a success.
- ^main^ prints both results with ^{:?}^.

Output:

~~~
Ok(42)
Err(ParseIntError { kind: InvalidDigit })
~~~

## Try it

Remove the ^?^ and read the compiler error: it explains that a ^Result^ is not a number yet.

## Your task

Write ^add_strs^ that parses both strings as ^i32^ and returns their sum inside ^Ok^. Use ^?^ and no ^match^. For example ^add_strs("3", "4")^ gives ^Ok(7)^, and ^add_strs("x", "4")^ gives an ^Err^.`,
      terms: [{ term: "?", def: "Unwraps an Ok value, or returns the Err from the function immediately." }, { term: "error propagation", def: "Passing an error up to the caller instead of handling it." }, { term: "ParseIntError", def: "The error type produced when text cannot be parsed as an integer." }, { term: "trim", def: "Removes whitespace from both ends of a string." }, { term: "Result", def: "Either Ok(value) or Err(error)." }],
      starter: L`use std::num::ParseIntError;

fn add_strs(a: &str, b: &str) -> Result<i32, ParseIntError> {
    todo!()
}
`,
      solution: L`use std::num::ParseIntError;

fn add_strs(a: &str, b: &str) -> Result<i32, ParseIntError> {
    let x: i32 = a.trim().parse()?;
    let y: i32 = b.trim().parse()?;
    Ok(x + y)
}
`,
      require: [{ re: '\\?\\s*;', msg: 'Use the ? operator.' }],
      harness: L`fn main() {
    println!("{:?}", add_strs("3", "4"));
    println!("{:?}", add_strs(" 10 ", "-20"));
    println!("{}", add_strs("x", "4").is_err());
    println!("{}", add_strs("4", "").is_err());
}`,
      hint: 'let x: i32 = a.trim().parse()?; ... Ok(x + y)',
      tests: [{ expected: 'Ok(7)\nOk(-10)\ntrue\ntrue' }],
    },
    {
      id: 'traits',
      title: 'Traits',
      content: L`## A promise of abilities

A **trait** is a promise that a type can do certain things, like a job description: "anyone with this job can ^name^ themselves and ^sound^ off." The trait lists **methods** (functions attached to a value) without saying how each type does them. To **implement** a trait for a type means writing the real code for those methods, using ^impl Trait for Type^. A trait method may also have a **default implementation**: ready-made code types get for free unless they replace it.

A **struct** is a custom type you define. ^&self^ means "this method borrows the value it was called on".

## Example

~~~
trait Greet {
    fn name(&self) -> String;
    fn hello(&self) -> String {
        format!("Hello, {}!", self.name())
    }
}

struct Bob;

impl Greet for Bob {
    fn name(&self) -> String { String::from("Bob") }
}

fn main() {
    println!("{}", Bob.hello());
}
~~~

- ^trait Greet { ... }^ declares the promise.
- ^fn name(&self) -> String;^ has no body: each type must supply it.
- ^fn hello^ has a body, so it is the default and uses ^self.name()^.
- ^struct Bob;^ makes an empty type.
- ^impl Greet for Bob^ fulfils the promise by writing ^name^.
- ^Bob.hello()^ uses the free default method.

Output:

~~~
Hello, Bob!
~~~

## Try it

Inside ^impl Greet for Bob^ add your own ^fn hello(&self) -> String { String::from("Yo") }^ to override the default; the output becomes ^Yo^.

## Your task

Implement ^Animal^ for ^Dog^ (name "Dog", sound "Woof") and for ^Cat^ (name "Cat", sound "Meow"). The default ^speak^ is provided. The program then prints ^Dog says Woof!^ and ^Cat says Meow!^. (The test code stores both in a ^Vec<Box<dyn Animal>>^: a **Box** is a pointer to data kept on the heap, and **dyn** means "any type that implements this trait", so different animals fit in one list.)`,
      terms: [{ term: "trait", def: "A promise that a type can do certain things; a list of methods." }, { term: "impl", def: "Writes the real code of a trait or methods for a type." }, { term: "method", def: "A function attached to a value, called with a dot." }, { term: "default implementation", def: "Method code in a trait that types get unless they override it." }, { term: "&self", def: "The method borrows the value it is called on." }, { term: "Box", def: "A pointer that stores a value on the heap." }, { term: "dyn", def: "Marks a value of any type that implements a given trait." }],
      starter: L`trait Animal {
    fn name(&self) -> String;
    fn sound(&self) -> String;
    fn speak(&self) -> String {
        format!("{} says {}!", self.name(), self.sound())
    }
}

struct Dog;
struct Cat;

// TODO: impl Animal for Dog and for Cat
`,
      solution: L`trait Animal {
    fn name(&self) -> String;
    fn sound(&self) -> String;
    fn speak(&self) -> String {
        format!("{} says {}!", self.name(), self.sound())
    }
}

struct Dog;
struct Cat;

impl Animal for Dog {
    fn name(&self) -> String { String::from("Dog") }
    fn sound(&self) -> String { String::from("Woof") }
}

impl Animal for Cat {
    fn name(&self) -> String { String::from("Cat") }
    fn sound(&self) -> String { String::from("Meow") }
}
`,
      harness: L`fn main() {
    let animals: Vec<Box<dyn Animal>> = vec![Box::new(Dog), Box::new(Cat)];
    for a in animals.iter() {
        println!("{}", a.speak());
    }
}`,
      hint: 'impl Animal for Dog { fn name(&self) -> String { String::from("Dog") } ... }',
      tests: [{ expected: 'Dog says Woof!\nCat says Meow!' }],
    },
    {
      id: 'generics',
      title: 'Generics',
      content: L`## One recipe, many types

Writing a separate "biggest number" function for integers, decimals and letters would be repetitive. A **generic** function uses a placeholder type, written ^T^ inside ^<...>^, standing for "some type, decided when the function is used", like a form with a blank to fill in.

But not every type can do everything. A **trait bound** states what the placeholder must be able to do, written ^T: Trait^. ^Display^ means "can be printed with {}". ^PartialOrd^ means "can be compared with ^>^ and ^<^". ^Copy^ means "can be duplicated cheaply", so we can return a value without moving it. Join bounds with ^+^. A **slice** ^&[T]^ is a borrowed view of a list of items.

## Example

~~~
fn show_twice<T: std::fmt::Display>(x: T) {
    println!("{} {}", x, x);
}

fn main() {
    show_twice(5);
    show_twice("hi");
}
~~~

- ^<T: std::fmt::Display>^ declares placeholder ^T^ that must be printable.
- ^x: T^ takes a value of that type.
- ^println!^ prints it twice; this is allowed only because of the bound. (Using ^x^ twice also works since ^5^ and ^"hi"^ are Copy.)
- ^show_twice(5)^ uses ^T = i32^; ^show_twice("hi")^ uses ^T = &str^.

Output:

~~~
5 5
hi hi
~~~

## Try it

Call ^show_twice(2.5)^ too: it works for decimals with no new code.

## Your task

Write ^largest<T: PartialOrd + Copy>^ returning the biggest item of a non-empty slice. For ^[3, 7, 2]^ it returns ^7^; for ^['a','z','c']^ it returns ^z^. Idea: start with the first item, then loop and replace it whenever you see a bigger one.`,
      terms: [{ term: "generic", def: "Code written with a placeholder type that works for many real types." }, { term: "T", def: "A common name for a placeholder type." }, { term: "trait bound", def: "A requirement on a generic type, like T: Copy." }, { term: "PartialOrd", def: "Trait for types that can be compared with < and >." }, { term: "Copy", def: "Trait for types that are duplicated instead of moved." }, { term: "slice", def: "A borrowed view of a run of items, written &[T]." }, { term: "Display", def: "Trait for types that can be printed with {}." }],
      starter: L`fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    todo!()
}
`,
      solution: L`fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut best = list[0];
    for &item in list {
        if item > best {
            best = item;
        }
    }
    best
}
`,
      harness: L`fn main() {
    println!("{}", largest(&[3, 7, 2]));
    println!("{}", largest(&[1.5, 0.2, 1.4]));
    println!("{}", largest(&['a', 'z', 'c']));
    println!("{}", largest(&[-9]));
}`,
      hint: 'Start with list[0] and update when item > best.',
      tests: [{ expected: '7\n1.5\nz\n-9' }],
    },
    {
      id: 'capstone-bank',
      title: 'Capstone: Bank Account',
      content: L`## Putting it together

Time to combine **structs** (custom types holding data in named **fields**), **methods** (functions in an ^impl^ block), ^Result^ and **mutable borrowing**. ^&mut self^ means a method borrows the value and is allowed to change it; ^&self^ only reads. Rust has no exceptions: a method that may fail returns ^Result^. ^Result<(), String>^ uses ^()^, the **unit** value meaning "nothing useful", so success is ^Ok(())^.

A bank account is a nice model: a withdrawal that would overdraw must be refused and change nothing.

## Example

~~~
struct Jar { cookies: u32 }

impl Jar {
    fn take(&mut self, n: u32) -> Result<(), String> {
        if n > self.cookies {
            Err(String::from("not enough"))
        } else {
            self.cookies -= n;
            Ok(())
        }
    }
}

fn main() {
    let mut j = Jar { cookies: 5 };
    println!("{:?}", j.take(2));
    println!("{:?}", j.take(9));
    println!("{}", j.cookies);
}
~~~

- ^struct Jar { cookies: u32 }^ has one field.
- ^&mut self^ lets ^take^ change the field.
- The ^if^ checks first, so a failed take changes nothing.
- ^-=^ subtracts in place; ^Ok(())^ signals success.
- ^let mut j^ is mutable so we may call ^take^.

Output:

~~~
Ok(())
Err("not enough")
3
~~~

## Try it

Change ^j.take(9)^ to ^j.take(3)^: it now succeeds and the last line is ^0^.

## Your task

Implement ^Account^:

- ^Account::new(balance: u32)^ creates an account.
- ^deposit(&mut self, amount: u32)^ adds to the balance.
- ^withdraw(&mut self, amount: u32) -> Result<(), String>^: on success subtract and return ^Ok(())^; if the balance is too low change nothing and return ^Err("insufficient funds")^.
- ^balance(&self) -> u32^ returns the balance.`,
      terms: [{ term: "struct", def: "A custom type grouping named fields." }, { term: "field", def: "A named piece of data inside a struct." }, { term: "&mut self", def: "The method borrows the value and may change it." }, { term: "()", def: "The unit value, meaning nothing useful; Ok(()) is a bare success." }, { term: "Result", def: "Either Ok(value) or Err(error)." }, { term: "impl", def: "Block where a type's methods are written." }],
      starter: L`struct Account {
    balance: u32,
}

impl Account {
    fn new(balance: u32) -> Account {
        todo!()
    }
    fn deposit(&mut self, amount: u32) {
        todo!()
    }
    fn withdraw(&mut self, amount: u32) -> Result<(), String> {
        todo!()
    }
    fn balance(&self) -> u32 {
        todo!()
    }
}
`,
      solution: L`struct Account {
    balance: u32,
}

impl Account {
    fn new(balance: u32) -> Account {
        Account { balance }
    }
    fn deposit(&mut self, amount: u32) {
        self.balance += amount;
    }
    fn withdraw(&mut self, amount: u32) -> Result<(), String> {
        if amount > self.balance {
            Err(String::from("insufficient funds"))
        } else {
            self.balance -= amount;
            Ok(())
        }
    }
    fn balance(&self) -> u32 {
        self.balance
    }
}
`,
      harness: L`fn main() {
    let mut acc = Account::new(100);
    acc.deposit(50);
    println!("{:?}", acc.withdraw(30));
    println!("{:?}", acc.withdraw(500));
    println!("{}", acc.balance());
    println!("{:?}", acc.withdraw(120));
    println!("{}", acc.balance());
}`,
      hint: 'Check amount > self.balance before subtracting.',
      tests: [{ expected: 'Ok(())\nErr("insufficient funds")\n120\nOk(())\n0' }],
    },
  ],
};
