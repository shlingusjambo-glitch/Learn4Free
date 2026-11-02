// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'pointers',
  title: 'Pointers & Memory Addresses',
  lessons: [
    {
      id: 'pointer-intro',
      title: 'Pointers: Street Addresses of the RAM City',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/pointer-intro.svg',
        caption: 'Pointers store the street addresses of RAM cells; dereferencing (*ptr) follows the address to read or write contents.',
      },
      content: L`## Street Addresses of the RAM City

Imagine a city where every single house along a massive boulevard has a unique, sequential street address: 1000, 1004, 1008...
In Sherlock Holmes, or on Harry Potter's *Marauder's Map*, knowing someone's exact street address gives you the power to find them, inspect what is inside their house, and even change what is in the living room without moving the house an inch.

Your computer's RAM is that city.
A **variable** is the house.
The **value** is what is stored inside the house.
The **memory address** is the street address where that house was built.

A **pointer** is a special variable whose entire purpose in life is to hold the **memory address** of another variable!

## The Two Master Operators

1. **Address-of operator (^&^)**: Retrieves the memory address of a variable.
   ~~~
   int secret = 1337;
   int *ptr = &secret; // ptr now holds the memory address of secret
   ~~~
   The asterisk in ^int *ptr^ indicates: *"ptr is a pointer to an integer"*.

2. **Dereference operator (^*^)**: Follows the pointer's stored address down to the actual target house, letting you read or modify its contents!
   ~~~
   printf("Value: %d\n", *ptr); // Reads what is inside secret (1337)
   *ptr = 2048;                 // Overwrites the living room! secret is now 2048!
   ~~~

## Predict & Observe

What is the difference between ^ptr^ and ^*ptr^?
- ^ptr^ is the raw street address (e.g. ^0x7ffee4^). If you print ^ptr^ with ^%p^, you see hexadecimal memory coordinates.
- ^*ptr^ dereferences the address and grabs the actual integer stored at that address (^1337^).

## Your Task

1. Declare an integer variable ^secret^ initialized to ^1337^.
2. Declare an integer pointer ^ptr^ initialized to the address of ^secret^ (^&secret^).
3. Print the value of ^secret^ using the dereferenced pointer:
   ^Initial Value: <*ptr>^
4. Mutate ^secret^ **only** through the pointer by setting ^*ptr = 2048;^.
5. Print the variable ^secret^ directly:
   ^Updated Value: <secret>^
6. Print the value through ^*ptr^ once more to verify:
   ^Direct Verification: <*ptr>^`,
      terms: [
        { term: 'pointer', def: 'A variable that holds the memory address of another variable rather than holding raw data directly.' },
        { term: 'address-of operator (&)', def: 'An operator placed before a variable name that returns its physical memory address in RAM.' },
        { term: 'dereference operator (*)', def: 'An operator placed before a pointer variable that accesses or modifies the value at the target memory address.' },
        { term: 'RAM (Random Access Memory)', def: 'The computer hardware where active program variables and instructions are temporarily stored.' },
      ],
      starter: L`#include <stdio.h>

int main(void) {
    // TODO:
    // 1. Declare int secret = 1337;
    // 2. Declare int *ptr = &secret;
    // 3. Print Initial Value: %d\n using *ptr
    // 4. Update via *ptr = 2048;
    // 5. Print Updated Value: %d\n using secret
    // 6. Print Direct Verification: %d\n using *ptr

    return 0;
}
`,
      solution: L`#include <stdio.h>

int main(void) {
    int secret = 1337;
    int *ptr = &secret;

    printf("Initial Value: %d\n", *ptr);
    *ptr = 2048;
    printf("Updated Value: %d\n", secret);
    printf("Direct Verification: %d\n", *ptr);

    return 0;
}
`,
      hint: 'Declare int secret = 1337; int *ptr = &secret; Then print *ptr, set *ptr = 2048, and print secret and *ptr.',
      tests: [
        {
          name: 'Pointer Address Mutation Sequence',
          expected: 'Initial Value: 1337\nUpdated Value: 2048\nDirect Verification: 2048',
        },
      ],
    },
    {
      id: 'pointer-mutation',
      title: 'Pointer Mutation: Handing Over the Keys',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/pointer-mutation.svg',
        caption: 'Passing memory addresses gives foreign functions the keys to mutate caller variables in place.',
      },
      content: L`## The Body-Swap Comedy

In the classic body-swap movie *Freaky Friday*, a mysterious fortune cookie causes mother and daughter to wake up with their identities completely swapped.

In Unit 3, we learned that C is strictly pass-by-value: functions get photocopies and cannot mutate your original variables. But what if you **hand the function the keys to your house**?

By passing a variable's **memory address** (^&a^) to a function that accepts a **pointer parameter** (^int *a^), that function can reach back into the caller's stack frame and mutate the original variable directly!

## The Canonical Swap Function

~~~
void swap(int *x, int *y) {
    int temp = *x; // 1. Save value at address x
    *x = *y;       // 2. Overwrite address x with value at y
    *y = temp;     // 3. Overwrite address y with saved temp
}

int main(void) {
    int a = 10, b = 20;
    swap(&a, &b);  // We pass addresses (&), not values!
    // a is now 20, b is now 10!
}
~~~

Notice how ^swap(&a, &b)^ gives ^swap^ the memory coordinates of ^a^ and ^b^. Dereferencing them with ^*x^ and ^*y^ modifies the original memory in ^main^.

## Predict & Observe

What happens if you accidentally write ^x = y;^ inside ^swap^ without the asterisks?
You will simply reassign the local pointer parameter to point to the other address! The actual numbers in ^a^ and ^b^ inside ^main^ will remain completely unchanged. Always dereference with ^*^ to change the underlying value.

## Your Task

Implement two functions:
1. ^void swap_inventory(int *itemA, int *itemB);^
   Swaps the values stored at the two pointers.
2. ^void apply_boost(int *stat, int multiplier);^
   Multiplies the value stored at ^*stat^ by ^multiplier^.

In ^main^:
1. Read three integers from standard input: ^a^, ^b^, and ^boost^.
2. Print: ^Initial: A=<a\>, B=<b\>^
3. Call ^swap_inventory(&a, &b);^
4. Print: ^After Swap: A=<a\>, B=<b\>^
5. Call ^apply_boost(&a, boost);^
6. Print: ^After Boost: A=<a\>, B=<b\>^`,
      terms: [
        { term: 'pass-by-reference', def: 'Simulating reference semantics in C by explicitly passing memory addresses via pointers.' },
        { term: 'in-place mutation', def: 'Modifying data directly in its existing memory location without allocating new storage.' },
        { term: 'swap algorithm', def: 'A 3-step routine using a temporary variable to exchange the values stored at two addresses.' },
      ],
      starter: L`#include <stdio.h>

// TODO: Prototypes for swap_inventory and apply_boost

int main(void) {
    int a = 0, b = 0, boost = 0;

    // TODO: Read a, b, boost from stdin
    // Print Initial state
    // Call swap_inventory(&a, &b)
    // Print After Swap state
    // Call apply_boost(&a, boost)
    // Print After Boost state

    return 0;
}

// TODO: Implement swap_inventory and apply_boost
`,
      solution: L`#include <stdio.h>

void swap_inventory(int *itemA, int *itemB);
void apply_boost(int *stat, int multiplier);

int main(void) {
    int a = 0, b = 0, boost = 0;

    if (scanf("%d %d %d", &a, &b, &boost) == 3) {
        printf("Initial: A=%d, B=%d\n", a, b);
        swap_inventory(&a, &b);
        printf("After Swap: A=%d, B=%d\n", a, b);
        apply_boost(&a, boost);
        printf("After Boost: A=%d, B=%d\n", a, b);
    }
    return 0;
}

void swap_inventory(int *itemA, int *itemB) {
    int temp = *itemA;
    *itemA = *itemB;
    *itemB = temp;
}

void apply_boost(int *stat, int multiplier) {
    *stat = (*stat) * multiplier;
}
`,
      hint: 'In swap_inventory, use int temp = *itemA; *itemA = *itemB; *itemB = temp; Remember to pass &a and &b when calling.',
      tests: [
        {
          name: 'Item Swap and Stat 3x Boost',
          stdin: '10 25 3',
          expected: 'Initial: A=10, B=25\nAfter Swap: A=25, B=10\nAfter Boost: A=75, B=10',
        },
        {
          name: 'Hero Stat Rebalance with 5x Boost',
          stdin: '100 500 5',
          expected: 'Initial: A=100, B=500\nAfter Swap: A=500, B=100\nAfter Boost: A=2500, B=100',
        },
      ],
    },
    {
      id: 'pointer-arrays',
      title: 'Pointers and Arrays: Twin Siblings of C',
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/pointer-arrays.svg',
        caption: 'Array decay and pointer arithmetic: arr[i] is syntactically equivalent to *(arr + i).',
      },
      content: L`## Train Cars Linked on a Track

Picture a high-speed passenger train: each train car is coupled sequentially to the one before it. If you know where train car #0 is parked on the tracks, you can walk forward car-by-car simply by taking steps down the platform.

In C, arrays and pointers are virtually twin siblings:
Whenever an array name appears in an expression, it automatically **decays** into a pointer pointing directly to its first element (^&arr[0]^).

In fact, the bracket index notation ^arr[i]^ is nothing more than syntactic sugar for pointer arithmetic:

$$\text{arr}[i] \equiv *(\text{arr} + i)$$

## Pointer Arithmetic

When you add ^1^ to a pointer in C (^ptr + 1^), C does **not** add 1 single byte. C automatically multiplies the step by ^sizeof(*ptr)^!
- For an ^int^ (4 bytes), ^ptr + 1^ moves forward 4 bytes to the very next integer.
- For a ^double^ (8 bytes), ^ptr + 1^ moves forward 8 bytes.

Look at how you can traverse an entire array using a walking pointer:

~~~
int numbers[4] = {10, 20, 30, 40};
int *ptr = numbers; // points to &numbers[0]

for (int i = 0; i < 4; i++) {
    printf("%d ", *ptr);
    ptr++; // advances pointer to next element!
}
~~~

Output: ^10 20 30 40 ^

## Predict & Observe

What happens if you step a pointer past the end of the array and attempt to dereference it (^*(arr + 100)^)?
C has no bounds-checking. The CPU will dutifully read whatever random garbage or other program's memory happens to reside at that address, leading to undefined behavior or crash!

## Your Task

Read an integer ^n^ (number of elements, up to 20), followed by ^n^ integers into an array ^arr^.
Using **pointer arithmetic** (walking a pointer with ^*ptr^ and ^ptr++^, without using bracket indexing ^arr[i]^ in your calculation loops):
1. Compute the ^sum^ of all elements.
2. Find the ^max^ element in the array.

Print:
~~~
Array Traversed via Pointers
Sum: <sum>
Max: <max>
~~~`,
      terms: [
        { term: 'array decay', def: 'The automatic conversion of an array name into a pointer to its first element.' },
        { term: 'pointer arithmetic', def: 'Performing addition or subtraction on memory addresses, automatically scaled by element byte size.' },
        { term: '*(arr + i)', def: 'The foundational pointer dereferencing expression equivalent to arr[i].' },
        { term: 'contiguous memory', def: 'A memory layout where elements are positioned consecutively side-by-side without gaps.' },
      ],
      starter: L`#include <stdio.h>

int main(void) {
    int n = 0;
    int arr[20];

    // TODO: Read n, then read n integers into arr
    // Traverse arr using a walking pointer (int *ptr = arr;)
    // Calculate sum and max
    // Print:
    // Array Traversed via Pointers
    // Sum: <sum>
    // Max: <max>

    return 0;
}
`,
      solution: L`#include <stdio.h>

int main(void) {
    int n = 0;
    int arr[20];

    if (scanf("%d", &n) == 1 && n > 0) {
        for (int i = 0; i < n; i++) {
            scanf("%d", arr + i);
        }

        int *ptr = arr;
        int sum = 0;
        int max = *ptr;

        for (int i = 0; i < n; i++) {
            int val = *ptr;
            sum += val;
            if (val > max) {
                max = val;
            }
            ptr++;
        }

        printf("Array Traversed via Pointers\n");
        printf("Sum: %d\n", sum);
        printf("Max: %d\n", max);
    }
    return 0;
}
`,
      hint: 'Initialize int *ptr = arr; int sum = 0; int max = *ptr; Inside the loop, read *ptr, update sum and max, then ptr++;',
      tests: [
        {
          name: 'Five Element Integer Array',
          stdin: '5\n10 25 5 40 15',
          expected: 'Array Traversed via Pointers\nSum: 95\nMax: 40',
        },
        {
          name: 'Three Element Traversal',
          stdin: '3\n100 200 50',
          expected: 'Array Traversed via Pointers\nSum: 350\nMax: 200',
        },
        {
          name: 'Single Element Array',
          stdin: '1\n42',
          expected: 'Array Traversed via Pointers\nSum: 42\nMax: 42',
        },
      ],
    },
    {
      id: 'unit-4-test',
      title: 'Unit 4 Test: Secret Agent Cipher Decryption',
      isUnitTest: true,
      language: 'c',
      fileName: 'main.c',
      image: {
        url: '/diagrams/c/unit-4-test.svg',
        caption: 'In-place secret cipher decryption using converging two-pointer array reversal and pointer arithmetic offsets.',
      },
      content: L`## Mission Briefing: Operation Enigma

You are on covert assignment for the agency (think James Bond 007 meets the Bletchley Park crypto-analysts). An intercepted field transmission contains an encrypted buffer of integer signals.

The cipher employs a two-stage in-place scrambling protocol:
1. The memory buffer has been **reversed**.
2. Each integer in the buffer has been shifted forward by an encryption **key offset**.

To decrypt this message without triggering memory surveillance alarms, the agency demands that all operations be performed **in-place using pure pointer arithmetic**—no bracket indexing (^arr[i]^) and no secondary buffers.

## Technical Specifications

Declare and implement two pointer functions:

1. ^void reverse_buffer(int *start, int len);^
   Reverses the buffer in-place using two converging pointers:
   - ^int *left = start;^
   - ^int *right = start + len - 1;^
   - While ^left < right^: swap the integers at ^*left^ and ^*right^, increment ^left++^, and decrement ^right--^.

2. ^void apply_cipher_offset(int *start, int len, int key);^
   Using a walking pointer from ^start^ up to ^start + len^:
   - Subtract ^key^ from each integer: ^*curr -= key;^

## Main Program

Inside ^main^:
1. Read ^len^ (number of integers) and ^key^ (offset integer) from standard input.
2. Read the ^len^ scrambled integers into an array ^buffer[20]^.
3. Call ^reverse_buffer(buffer, len);^.
4. Call ^apply_cipher_offset(buffer, len, key);^.
5. Print the decrypted sequence on one line:
   ^Decrypted: <val1> <val2> ... <valN>^
   (With a trailing space after the last number, followed by a newline).

## Example

Input:
~~~
5 10
60 50 40 30 20
~~~

Execution:
1. In-place reversal: ^20 30 40 50 60^
2. Apply offset (-10): ^10 20 30 40 50^

Output:
~~~
Decrypted: 10 20 30 40 50
~~~`,
      terms: [
        { term: 'two-pointer technique', def: 'An algorithm using two pointer variables moving towards or away from each other to process arrays in place.' },
        { term: 'in-place algorithm', def: 'An algorithm that transforms input without using any extra memory proportional to the input size.' },
        { term: 'cipher offset', def: 'A constant numeric value added to or subtracted from data to encode or decode its meaning.' },
      ],
      starter: L`#include <stdio.h>

// TODO: Prototypes for reverse_buffer and apply_cipher_offset

int main(void) {
    int len = 0, key = 0;
    int buffer[20];

    // TODO: Read len and key from stdin
    // Read len integers into buffer
    // Call reverse_buffer(buffer, len)
    // Call apply_cipher_offset(buffer, len, key)
    // Print Decrypted: followed by each number and a newline

    return 0;
}

// TODO: Implement reverse_buffer and apply_cipher_offset using pointers
`,
      solution: L`#include <stdio.h>

void reverse_buffer(int *start, int len);
void apply_cipher_offset(int *start, int len, int key);

int main(void) {
    int len = 0, key = 0;
    int buffer[20];

    if (scanf("%d %d", &len, &key) == 2 && len > 0) {
        for (int i = 0; i < len; i++) {
            scanf("%d", buffer + i);
        }

        reverse_buffer(buffer, len);
        apply_cipher_offset(buffer, len, key);

        printf("Decrypted: ");
        int *ptr = buffer;
        for (int i = 0; i < len; i++) {
            printf("%d ", *ptr);
            ptr++;
        }
        printf("\n");
    }
    return 0;
}

void reverse_buffer(int *start, int len) {
    int *left = start;
    int *right = start + len - 1;

    while (left < right) {
        int temp = *left;
        *left = *right;
        *right = temp;
        left++;
        right--;
    }
}

void apply_cipher_offset(int *start, int len, int key) {
    int *curr = start;
    int *end = start + len;

    while (curr < end) {
        *curr -= key;
        curr++;
    }
}
`,
      hint: 'In reverse_buffer, use int *left = start; int *right = start + len - 1; while (left < right) { int t = *left; *left = *right; *right = t; left++; right--; }',
      tests: [
        {
          name: 'Transmission 1: Five Values Key 10',
          stdin: '5 10\n60 50 40 30 20',
          expected: 'Decrypted: 10 20 30 40 50 ',
        },
        {
          name: 'Transmission 2: Four Values Key 7',
          stdin: '4 7\n47 37 27 17',
          expected: 'Decrypted: 10 20 30 40 ',
        },
        {
          name: 'Transmission 3: Zero Key Offset',
          stdin: '3 0\n99 88 77',
          expected: 'Decrypted: 77 88 99 ',
        },
      ],
    },
  ],
};
