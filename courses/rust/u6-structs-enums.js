// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';
const L = String.raw;

module.exports = {
  id: 'structs-enums',
  title: 'Structs & Enums',
  lessons: [
    {
      id: 'struct-rect',
      title: 'Structs & Methods',
      content: L`## Bundling values into a struct

So far each value you stored lived in its own variable. Real things have several parts: a point on a map has an x and a y. A **struct** (short for "structure") is a custom type you design that bundles several related values together, like a paper form with labelled boxes. Each labelled box is called a **field**: it has a name and a type. A concrete filled-in form is an **instance** of the struct.

~~~
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 3, y: 4 };
    println!("x is {}, y is {}", p.x, p.y);
}
~~~

- ^struct Point { ... }^ defines a new type named ^Point^ (the form template). Type names start with a capital letter by convention.
- ^x: i32,^ and ^y: i32,^ declare two fields. Each says "a field called this holds a whole number of this type".
- ^let p = Point { x: 3, y: 4 };^ makes an instance: you fill in every field by name.
- ^p.x^ and ^p.y^ use **dot syntax**: a dot after the variable name, then the field name, reads that field.
- ^println!^ prints the two values into the ^{}^ slots.

Output:

~~~
x is 3, y is 4
~~~

## Giving a struct behaviour: methods

An **impl block** (short for "implementation") is where you attach functions to a type: ^impl Point { ... }^ means "here is what a Point can do". Two kinds of function live inside:

- A **method** is a function that works on one particular instance and is called with a dot, like ^p.dist_sq()^. Its first parameter is ^&self^. **self** is a name for "the instance this method was called on". The ^&^ means it only **borrows** (looks at) the instance without taking it away from you.
- An **associated function** belongs to the type itself and has no ^self^. You call it with ^::^, like ^Point::new(3, 4)^. It is often used as a **constructor**, a function that builds a new instance.

~~~
struct Point {
    x: i32,
    y: i32,
}

impl Point {
    fn new(x: i32, y: i32) -> Point {
        Point { x, y }
    }
    fn dist_sq(&self) -> i32 {
        self.x * self.x + self.y * self.y
    }
}

fn main() {
    let p = Point::new(3, 4);
    println!("{}", p.dist_sq());
}
~~~

- ^impl Point {^ opens the impl block for ^Point^.
- ^fn new(x: i32, y: i32) -> Point^ is an associated function (no ^self^) that returns a ^Point^.
- ^Point { x, y }^ is shorthand for ^Point { x: x, y: y }^ when the variable names match the field names. It has no semicolon, so it is the returned value.
- ^fn dist_sq(&self) -> i32^ is a method: it receives the instance as ^self^.
- ^self.x * self.x + self.y * self.y^ reads the instance's fields and returns x squared plus y squared.
- In ^main^, ^Point::new(3, 4)^ calls the associated function with ^::^, and ^p.dist_sq()^ calls the method with a dot.

Output:

~~~
25
~~~

## Try it

In the editor, change ^Point::new(3, 4)^ to ^Point::new(6, 8)^ in your own scratch code and predict the answer before running: it should be 100.

## Your task

Fill in the three functions of ^Rectangle^ (already declared with ^width^ and ^height^ fields, both ^u32^, which is a whole number that cannot be negative):

- ^square(size)^: an associated function returning a ^Rectangle^ whose width and height both equal ^size^.
- ^area(&self)^: width times height.
- ^perimeter(&self)^: 2 times (width plus height).

For a 3 by 4 rectangle: area is 12 and perimeter is 14. ^Rectangle::square(5)^ has area 25 and perimeter 20. Replace each ^todo!()^ (a placeholder that crashes the program if it runs) with real code.`,
      terms: [
        { term: 'struct', def: 'A custom type that bundles several named values together.' },
        { term: 'field', def: 'One named, typed slot inside a struct.' },
        { term: 'instance', def: 'One concrete value made from a struct, with every field filled in.' },
        { term: 'impl block', def: 'A block (impl Type { ... }) that holds the functions belonging to a type.' },
        { term: 'method', def: 'A function inside an impl block that takes self and is called with dot syntax.' },
        { term: 'self', def: 'The name for the instance a method was called on; &self borrows it.' },
        { term: 'associated function', def: 'A function inside an impl block with no self, called with Type::name().' },
        { term: '::', def: 'The path separator, used to reach something that belongs to a type, such as Point::new.' },
      ],
      starter: L`struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn square(size: u32) -> Rectangle {
        todo!()
    }
    fn area(&self) -> u32 {
        todo!()
    }
    fn perimeter(&self) -> u32 {
        todo!()
    }
}
`,
      solution: L`struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
    fn area(&self) -> u32 {
        self.width * self.height
    }
    fn perimeter(&self) -> u32 {
        2 * (self.width + self.height)
    }
}
`,
      harness: L`fn main() {
    use std::io::Read;
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).unwrap();
    for line in input.lines() {
        let n: Vec<u32> = line.split_whitespace().map(|t| t.parse().unwrap()).collect();
        if n.len() < 2 { continue; }
        let r = Rectangle { width: n[0], height: n[1] };
        let s = Rectangle::square(n[0]);
        println!("{} {} {} {}", r.area(), r.perimeter(), s.area(), s.perimeter());
    }
}`,
      hint: 'Rectangle { width: size, height: size }',
      tests: [
        { name: '3 by 4 and square 3', stdin: '3 4\n', expected: '12 14 9 12' },
        { name: 'square(5) via 5 by 2', stdin: '5 2\n', expected: '10 14 25 20' },
        { name: 'zero width', stdin: '0 5\n', expected: '0 10 0 0' },
        { name: 'already a square', stdin: '7 7\n', expected: '49 28 49 28' },
        { name: 'several rectangles', stdin: '1 1\n10 3\n', expected: '1 4 1 4\n30 26 100 40' },
      ],
    },
    {
      id: 'enum-match',
      title: 'Enums & match',
      content: L`## Enums: one value, several possible shapes

A struct says "I have this AND this AND this". An **enum** (short for "enumeration") says "I am exactly ONE of these choices". Think of a traffic light: it is red, yellow or green, never two at once. Each choice is called a **variant**. A variant can also carry its own extra data, and different variants can carry different data.

~~~
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

fn main() {
    let msg = Message::Write(String::from("hello"));
    match msg {
        Message::Quit => println!("quit"),
        Message::Move { x, y } => println!("move to {} {}", x, y),
        Message::Write(text) => println!("say {}", text),
    }
}
~~~

- ^enum Message { ... }^ defines a type with three variants.
- ^Quit,^ is a variant with no data.
- ^Move { x: i32, y: i32 },^ is a variant with named fields, like a tiny struct.
- ^Write(String),^ is a variant holding one unnamed value (a **tuple variant**, a variant whose data sits in parentheses).
- ^Message::Write(String::from("hello"))^ builds a value; you name the variant with ^::^.
- ^match msg { ... }^ is **pattern matching**: Rust compares the value against each **pattern** (a shape to look for) from top to bottom and runs the code after ^=>^ for the first one that fits. Each pattern-plus-code pair is called an **arm**.
- In ^Message::Write(text)^ the pattern also pulls the stored string out into a new variable called ^text^.
- ^match^ must cover every variant, otherwise the program will not compile. That is how Rust stops you forgetting a case.

Output:

~~~
say hello
~~~

## Try it

In your scratch code change the value to ^Message::Move { x: 1, y: 2 }^ and run. You should see ^move to 1 2^. Then delete the ^Quit^ arm and read the compiler error about a missing pattern.

## Your task

The ^Shape^ enum has three variants: ^Circle(f64)^ holds the radius, ^Square(f64)^ holds the side, and ^Triangle { base, height }^ holds two numbers (^f64^ is a decimal number). Write ^area(shape: &Shape) -> f64^ using ^match^:

- Circle: pi times radius times radius. Use ^std::f64::consts::PI^ for pi.
- Square: side times side.
- Triangle: 0.5 times base times height.

A circle of radius 1.0 has area 3.14 (when printed with two decimals), a square of side 2.0 has 4.00, and a triangle with base 3.0 and height 4.0 has 6.00.`,
      terms: [
        { term: 'enum', def: 'A type whose value is exactly one of several named choices.' },
        { term: 'variant', def: 'One of the choices of an enum, optionally carrying data.' },
        { term: 'match', def: 'An expression that compares a value against patterns and runs the first arm that fits.' },
        { term: 'pattern matching', def: 'Checking a value against shapes (patterns) and pulling data out of it.' },
        { term: 'arm', def: 'One pattern => code pair inside a match.' },
        { term: '=>', def: 'Separates a pattern from the code to run in a match arm.' },
        { term: 'f64', def: 'The standard decimal (floating-point) number type.' },
      ],
      starter: L`enum Shape {
    Circle(f64),                        // radius
    Square(f64),                        // side
    Triangle { base: f64, height: f64 },
}

fn area(shape: &Shape) -> f64 {
    todo!()
}
`,
      solution: L`enum Shape {
    Circle(f64),
    Square(f64),
    Triangle { base: f64, height: f64 },
}

fn area(shape: &Shape) -> f64 {
    match shape {
        Shape::Circle(r) => std::f64::consts::PI * r * r,
        Shape::Square(s) => s * s,
        Shape::Triangle { base, height } => 0.5 * base * height,
    }
}
`,
      require: [{ re: '\\bmatch\\b', msg: 'Use match on the shape.' }],
      harness: L`fn main() {
    use std::io::Read;
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).unwrap();
    for line in input.lines() {
        let t: Vec<&str> = line.split_whitespace().collect();
        if t.is_empty() { continue; }
        let n: Vec<f64> = t[1..].iter().map(|x| x.parse().unwrap()).collect();
        let shape = match t[0] {
            "circle" => Shape::Circle(n[0]),
            "square" => Shape::Square(n[0]),
            _ => Shape::Triangle { base: n[0], height: n[1] },
        };
        println!("{:.2}", area(&shape));
    }
}`,
      hint: 'Shape::Circle(r) => std::f64::consts::PI * r * r,',
      tests: [
        { name: 'unit circle', stdin: 'circle 1\n', expected: '3.14' },
        { name: 'square', stdin: 'square 2\n', expected: '4.00' },
        { name: 'triangle', stdin: 'triangle 3 4\n', expected: '6.00' },
        { name: 'bigger circle', stdin: 'circle 2.5\n', expected: '19.63' },
        { name: 'zero-size shapes', stdin: 'circle 0\nsquare 0\ntriangle 0 9\n', expected: '0.00\n0.00\n0.00' },
        { name: 'all together', stdin: 'circle 1\nsquare 2\ntriangle 3 4\ncircle 2.5\n', expected: '3.14\n4.00\n6.00\n19.63' },
      ],
    },
    {
      id: 'enum-option',
      title: 'Option',
      content: L`## Values that might be missing

Sometimes a question has no answer: "Where is the number 99 in this list?" when 99 is not there. Many languages use a special "null" value for that, which causes famous crashes when forgotten. Rust has no null. Instead it has a built-in enum called **Option**. An ^Option<T>^ (the ^T^ stands for "whatever type is inside", written in angle brackets) has exactly two variants:

- **Some(value)**: there is an answer, and here it is.
- **None**: there is no answer.

Think of a gift box that is either holding a gift or is empty. The compiler makes you open the box and handle both cases before you can use what is inside.

~~~
fn half(n: i32) -> Option<i32> {
    if n % 2 == 0 {
        Some(n / 2)
    } else {
        None
    }
}

fn main() {
    println!("{:?}", half(10));
    println!("{:?}", half(7));
    if let Some(h) = half(10) {
        println!("half is {}", h);
    }
}
~~~

- ^fn half(n: i32) -> Option<i32>^ promises to return either ^Some^ number or ^None^.
- ^n % 2 == 0^ asks "is n even?" (^%^ gives the remainder after dividing).
- ^Some(n / 2)^ wraps the answer in the Some variant.
- ^None^ means "no answer" (odd numbers cannot be halved evenly).
- ^{:?}^ is the **Debug** format: a developer-friendly way to print values like enums. ^{}^ would not work here because Option has no plain display form.
- ^if let Some(h) = half(10)^ is a short form of ^match^: "if the value fits the pattern Some(h), put the inside into h and run the block; otherwise skip it".

Output:

~~~
Some(5)
None
half is 5
~~~

## Try it

In your scratch code call ^half(0)^ and ^half(-4)^ with ^{:?}^. Zero is even, so you should see ^Some(0)^ and ^Some(-2)^.

## Your task

Write ^find_index(items: &[i32], target: i32) -> Option<usize>^. ^&[i32]^ is a **slice**, a borrowed view of a list of numbers, and ^usize^ is the whole-number type used for positions. Return ^Some(position)^ of the **first** item equal to ^target^ (positions start at 0), or ^None^ if it is not found.

- ^find_index(&[5, 8, 13, 8], 13)^ gives ^Some(2)^
- ^find_index(&[5, 8, 13, 8], 8)^ gives ^Some(1)^ (the first match)
- ^find_index(&[5, 8, 13], 99)^ gives ^None^
- an empty list gives ^None^

Hint: ^for (i, &x) in items.iter().enumerate()^ gives you each position ^i^ together with its value ^x^.`,
      terms: [
        { term: 'Option', def: 'A built-in enum meaning "maybe a value": either Some(value) or None.' },
        { term: 'Some', def: 'The Option variant that holds a real value.' },
        { term: 'None', def: 'The Option variant meaning there is no value.' },
        { term: '<T>', def: 'Angle brackets name a type placed inside another type, like the i32 in Option<i32>.' },
        { term: 'if let', def: 'A short match that runs a block only when a value fits one pattern.' },
        { term: 'Debug ({:?})', def: 'A print format that shows values such as enums for programmers.' },
        { term: 'slice (&[T])', def: 'A borrowed view of a list of values.' },
        { term: 'usize', def: 'The whole-number type used for positions and sizes.' },
      ],
      starter: L`fn find_index(items: &[i32], target: i32) -> Option<usize> {
    todo!()
}
`,
      solution: L`fn find_index(items: &[i32], target: i32) -> Option<usize> {
    for (i, &x) in items.iter().enumerate() {
        if x == target {
            return Some(i);
        }
    }
    None
}
`,
      harness: L`fn main() {
    use std::io::Read;
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).unwrap();
    let mut lines = input.lines();
    let target: i32 = lines.next().unwrap().trim().parse().unwrap();
    let items: Vec<i32> = lines
        .next()
        .unwrap_or("")
        .split_whitespace()
        .map(|t| t.parse().unwrap())
        .collect();
    println!("{:?}", find_index(&items, target));
}`,
      hint: 'for (i, &x) in items.iter().enumerate() { ... }',
      tests: [
        { name: 'found once', stdin: '13\n5 8 13 8\n', expected: 'Some(2)' },
        { name: 'first of duplicates', stdin: '8\n5 8 13 8\n', expected: 'Some(1)' },
        { name: 'missing', stdin: '99\n5 8 13\n', expected: 'None' },
        { name: 'empty list', stdin: '1\n\n', expected: 'None' },
        { name: 'at index zero', stdin: '5\n5 8 13\n', expected: 'Some(0)' },
        { name: 'last item and negatives', stdin: '-3\n4 -1 -3\n', expected: 'Some(2)' },
      ],
    },
    {
      id: 'enum-direction',
      title: 'Enum Methods',
      content: L`## Methods on enums

Enums can have an impl block and methods, just like structs. Inside a method, ^self^ is the enum value the method was called on, and you usually ^match^ on it to decide what to do.

To print an enum value you must opt in. **derive** is an instruction placed above a type, written ^#[derive(Debug)]^ (an **attribute**: a note to the compiler wrapped in ^#[ ]^). It asks the compiler to write the boilerplate code for you automatically. Deriving **Debug** lets you print the value with ^{:?}^, which shows the variant's name.

~~~
#[derive(Debug)]
enum Light {
    Red,
    Green,
    Yellow,
}

impl Light {
    fn next(&self) -> Light {
        match self {
            Light::Red => Light::Green,
            Light::Green => Light::Yellow,
            Light::Yellow => Light::Red,
        }
    }
}

fn main() {
    let mut light = Light::Red;
    for _ in 0..4 {
        print!("{:?} ", light);
        light = light.next();
    }
    println!();
}
~~~

- ^#[derive(Debug)]^ makes ^{:?}^ printing work for ^Light^.
- ^impl Light { ... }^ attaches methods to the enum.
- ^fn next(&self) -> Light^ borrows the current light and returns a new ^Light^.
- ^match self^ checks which variant we have; each arm returns the following variant.
- ^let mut light^ makes a variable that is allowed to change (^mut^ means "mutable").
- ^for _ in 0..4^ repeats 4 times; the ^_^ means "I do not need the counter".
- ^print!^ prints without a newline, and ^println!()^ at the end finishes the line.

Output:

~~~
Red Green Yellow Red
~~~

## Try it

In your scratch code change ^0..4^ to ^0..7^ and watch the cycle wrap around: the lights repeat in the same order.

## Your task

The ^Direction^ enum has variants ^North^, ^East^, ^South^ and ^West^ and already derives ^Debug^. Fill in two methods using ^match self^:

- ^turn_right(&self)^: North becomes East, East becomes South, South becomes West, West becomes North.
- ^opposite(&self)^: North is South, East is West, South is North, West is East.

For example ^Direction::East.opposite()^ is ^West^, and turning right from ^North^ five times prints North East South West North.`,
      terms: [
        { term: 'derive', def: 'An instruction that asks the compiler to generate common code for a type.' },
        { term: 'Debug', def: 'A built-in ability that lets a value be printed with {:?}.' },
        { term: 'attribute (#[...])', def: 'A note to the compiler placed above an item.' },
        { term: 'impl block', def: 'The place where methods and associated functions for a type are written.' },
        { term: 'match self', def: 'Choosing code depending on which variant the method was called on.' },
        { term: 'mut', def: 'Marks a variable as changeable after it is created.' },
      ],
      starter: L`#[derive(Debug)]
enum Direction {
    North,
    East,
    South,
    West,
}

impl Direction {
    fn turn_right(&self) -> Direction {
        todo!()
    }
    fn opposite(&self) -> Direction {
        todo!()
    }
}
`,
      solution: L`#[derive(Debug)]
enum Direction {
    North,
    East,
    South,
    West,
}

impl Direction {
    fn turn_right(&self) -> Direction {
        match self {
            Direction::North => Direction::East,
            Direction::East => Direction::South,
            Direction::South => Direction::West,
            Direction::West => Direction::North,
        }
    }
    fn opposite(&self) -> Direction {
        match self {
            Direction::North => Direction::South,
            Direction::East => Direction::West,
            Direction::South => Direction::North,
            Direction::West => Direction::East,
        }
    }
}
`,
      harness: L`fn main() {
    use std::io::Read;
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).unwrap();
    for line in input.lines() {
        let d = match line.trim() {
            "N" => Direction::North,
            "E" => Direction::East,
            "S" => Direction::South,
            "W" => Direction::West,
            _ => continue,
        };
        let mut c = d.turn_right();
        let mut path = vec![format!("{:?}", c)];
        for _ in 0..3 {
            c = c.turn_right();
            path.push(format!("{:?}", c));
        }
        println!("{:?}: right={:?} opposite={:?} full-turn={}", d, d.turn_right(), d.opposite(), path.join(">"));
    }
}`,
      hint: 'Two match expressions over self.',
      tests: [
        { name: 'north', stdin: 'N\n', expected: 'North: right=East opposite=South full-turn=East>South>West>North' },
        { name: 'east', stdin: 'E\n', expected: 'East: right=South opposite=West full-turn=South>West>North>East' },
        { name: 'south', stdin: 'S\n', expected: 'South: right=West opposite=North full-turn=West>North>East>South' },
        { name: 'west wraps to north', stdin: 'W\n', expected: 'West: right=North opposite=East full-turn=North>East>South>West' },
        { name: 'all four', stdin: 'N\nE\nS\nW\n', expected: 'North: right=East opposite=South full-turn=East>South>West>North\nEast: right=South opposite=West full-turn=South>West>North>East\nSouth: right=West opposite=North full-turn=West>North>East>South\nWest: right=North opposite=East full-turn=North>East>South>West' },
      ],
    },
  ],
};
