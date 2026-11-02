// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'cryptography-foundations',
  title: 'Foundations of Cryptography & Encoding',
  lessons: [
    {
      id: 'encoding-vs-encryption',
      title: 'Encoding vs. Encryption',
      fileName: 'security.py',
      image: {
        url: '/diagrams/cybersecurity/encoding-vs-encryption.svg',
        caption: 'Encoding converts data formats for transport with NO secret key. Encryption scrambles data for confidentiality using a secret key.'
      },
      content: L`## The Cellophane Wrap vs. The Titanium Safe

Imagine you want to mail a secret diary. You wrap the pages in transparent cellophane film to protect them from raindrops during shipping. The mail carrier, the postal clerks, and anyone standing nearby can read every single sentence straight through the clear plastic. That is **encoding**.

Now imagine placing those pages inside a heavy titanium lockbox with a six-digit combination dial. You turn the dial to lock it. Even if a thief steals the box off the truck, they cannot read a single word unless they know the secret combination. That is **encryption**.

The golden rule of cybersecurity: **Encoding is NOT encryption!**

## What is Base64 and Hexadecimal?

Computers communicate using electrical binary pulses (zeros and ones). When programs send images, audio, or binary files over protocols designed for plain text (such as email or web pages), binary bytes can break the connection. 

- **Hexadecimal (Hex)**: Represents each byte (8 bits) as two characters using numbers ^0-9^ and letters ^a-f^. For example, the character ^'H'^ has the byte value ^72^ in decimal, which is written as ^48^ in hex.
- **Base64**: Chunks binary data into 6-bit pieces and maps each piece to one of 64 standard printable ASCII characters (^A-Z^, ^a-z^, ^0-9^, ^+^, ^/^). If the data length isn't a multiple of 3 bytes, it adds padding with ^=^ signs.

Anyone in the world can run ^base64.b64decode()^ without a password and get the original text back in a microsecond. Encoding provides **zero confidentiality**!

## Pop Culture: The Secret Decoder Pin

In the holiday classic movie *A Christmas Story*, nine-year-old Ralphie Parker waits weeks for his Little Orphan Annie Secret Society decoder pin to arrive in the mail. When the radio announcer broadcasts the secret code, Ralphie furiously calculates the letters, expecting an earth-shattering secret mission. Instead, the decoded message reads: *"Be sure to drink your Ovaltine."*

Ralphie learned a painful lesson: substitution codes and encodings don't protect data—they just make you look up values on a chart!

## Code Walkthrough

In Python's standard library, the built-in ^bytes.hex()^ method converts bytes to hex, and the ^base64^ module handles Base64:

~~~
import base64

secret = b"Enigma"
print(secret.hex())                 # "456e69676d61"
print(base64.b64encode(secret))     # b"RW5pZ21h"
~~~

## Predict & Observe

What will happen if you send a customer's credit card number encoded in Base64 across the internet without HTTPS or AES encryption? 
Any eavesdropper on public Wi-Fi can run a single Base64 decode command and immediately obtain the plain credit card numbers!

## Your Task

Write the function ^inspect_data(data_bytes: bytes)^ in ^security.py^.
It must:
1. Decode and print the ASCII string: ^ASCII: <text>^
2. Print the hexadecimal string: ^Hex: <hex_str>^
3. Print the Base64 string: ^Base64: <b64_str>^
4. Print the exact security warning: ^Confidentiality: None (Encoding is not encryption!)^`,
      terms: [
        { term: 'encoding', def: 'Transforming data into another public format (like Base64 or Hex) so systems can transmit it. Requires zero secret keys to decode.' },
        { term: 'encryption', def: 'Scrambling plaintext into unreadable ciphertext using a mathematical algorithm and a secret key to ensure confidentiality.' },
        { term: 'Base64', def: 'An encoding format that turns arbitrary binary bytes into 64 printable characters for safe text transmission.' },
        { term: 'hexadecimal', def: 'Base-16 numeral system using 0-9 and a-f, where every byte is written as two hex characters.' },
        { term: 'confidentiality', def: 'The security guarantee that only authorized individuals possessing the secret key can view the data.' }
      ],
      starter: L`import base64

def inspect_data(data_bytes: bytes):
    # TODO: Print ASCII, Hex, Base64, and the confidentiality warning.
    pass
`,
      solution: L`import base64

def inspect_data(data_bytes: bytes):
    ascii_text = data_bytes.decode('ascii', errors='replace')
    hex_str = data_bytes.hex()
    b64_str = base64.b64encode(data_bytes).decode('ascii')
    print(f"ASCII: {ascii_text}")
    print(f"Hex: {hex_str}")
    print(f"Base64: {b64_str}")
    print("Confidentiality: None (Encoding is not encryption!)")
`,
      harness: L`if __name__ == '__main__':
    import sys
    raw = sys.stdin.read().strip()
    if not raw:
        raw = "Hello"
    inspect_data(raw.encode('utf-8'))
`,
      hint: 'Use data_bytes.decode("ascii"), data_bytes.hex(), and base64.b64encode(data_bytes).decode("ascii").',
      tests: [
        {
          name: 'Inspect "Hello"',
          stdin: 'Hello\n',
          expected: 'ASCII: Hello\nHex: 48656c6c6f\nBase64: SGVsbG8=\nConfidentiality: None (Encoding is not encryption!)'
        },
        {
          name: 'Inspect "TopSecret"',
          stdin: 'TopSecret\n',
          expected: 'ASCII: TopSecret\nHex: 546f70536563726574\nBase64: VG9wU2VjcmV0\nConfidentiality: None (Encoding is not encryption!)'
        },
        {
          name: 'Inspect "Cyber"',
          stdin: 'Cyber\n',
          expected: 'ASCII: Cyber\nHex: 4379626572\nBase64: Q3liZXI=\nConfidentiality: None (Encoding is not encryption!)'
        }
      ]
    },

    {
      id: 'caesar-cipher',
      title: 'The Caesar Shift Cipher & Frequency Analysis',
      fileName: 'security.py',
      image: {
        url: '/diagrams/cybersecurity/caesar-cipher.svg',
        caption: 'The Caesar cipher shifts each letter along the alphabet. With only 25 possible shifts, an attacker can brute-force all keys in milliseconds.'
      },
      content: L`## Julius Caesar's Battle Orders

In 50 BC, Julius Caesar needed to communicate with his generals across Gaul without enemy scouts reading his troop movements. He devised a system: replace every letter in the message with the letter three spots down the alphabet. ^'A'^ became ^'D'^, ^'B'^ became ^'E'^, and at the end of the alphabet, letters wrapped around: ^'X'^ became ^'A'^, ^'Y'^ became ^'B'^, and ^'Z'^ became ^'C'^.

For centuries, this worked because most enemies were illiterate. But in modern cybersecurity, the Caesar cipher has a fatal vulnerability: **the keyspace is microscopic**.

## Keyspace and Modular Arithmetic

The **keyspace** is the set of all possible keys that could decrypt a cipher:
- The English alphabet has 26 letters.
- A shift of 0 or 26 does nothing (the message stays identical).
- That leaves only **25 possible shifts**!

A human can write down all 25 shifts on a napkin in five minutes. A Python program tests all 25 shifts in less than 0.001 seconds. This is called a **brute-force attack**.

Furthermore, human languages are not random. In English, the letter **E** appears in about 12.7% of all text, followed by **T** (9.1%) and **A** (8.2%). Letters like **Z**, **Q**, and **X** appear rarely. Even if you don't know the shift, counting how often each letter appears (**frequency analysis**) instantly gives away the key.

## Pop Culture: The Imitation Game

In the movie *The Imitation Game*, British codebreaker Alan Turing (played by Benedict Cumberbatch) works at Bletchley Park trying to break the German Enigma machine. The team realizes that because German weather stations always end their 6:00 AM transmissions with the exact same known phrase—*"Heil Hitler"*—they have a "crib" (known plaintext). Once you know one piece of expected text, you can test all keys until that phrase appears.

## Code Walkthrough

To shift characters safely, we use modular arithmetic with the modulo operator ^%^:

~~~
# Shifting uppercase 'A' by shift 3:
shifted_code = (ord('A') - ord('A') + 3) % 26 + ord('A')
shifted_char = chr(shifted_code) # 'D'
~~~

## Predict & Observe

If an attacker intercepts the ciphertext ^"Wkh hqhpb kdv iodqnhg rxu edvh"^ and tests shifts 1 through 25, how long before they find real English words? By shift 3, the message turns into *"The enemy has flanked our base"*.

## Your Task

Implement three functions:
1. ^caesar_encrypt(text: str, shift: int) -> str^: Shifts uppercase and lowercase letters by ^shift^. Leaves spaces, punctuation, and digits untouched.
2. ^caesar_decrypt(text: str, shift: int) -> str^: Reverses the shift.
3. ^caesar_crack(ciphertext: str, crib: str) -> int^: Tests shifts 1 through 25 to find which shift decrypts the message so that ^crib.lower()^ is found inside the decrypted text. Returns the integer shift (1 to 25), or -1 if not found.`,
      terms: [
        { term: 'Caesar cipher', def: 'A substitution cipher where each letter is replaced by a letter a fixed number of positions down the alphabet.' },
        { term: 'keyspace', def: 'The total number of possible secret keys. A small keyspace makes a cipher vulnerable to brute-force guessing.' },
        { term: 'modular arithmetic', def: 'A system of arithmetic for integers where numbers wrap around upon reaching a certain value (the modulus), like a 12-hour clock.' },
        { term: 'brute-force attack', def: 'An attack that attempts every possible key systematically until the correct key is found.' },
        { term: 'crib', def: 'Known or suspected plaintext that an attacker searches for within decrypted candidates to confirm a cracked key.' }
      ],
      starter: L`def caesar_encrypt(text: str, shift: int) -> str:
    # TODO: Shift alphabet letters by shift modulo 26
    return ""

def caesar_decrypt(text: str, shift: int) -> str:
    # TODO: Reverse the shift
    return ""

def caesar_crack(ciphertext: str, crib: str) -> int:
    # TODO: Test shifts 1 through 25, return shift where crib is in decrypted text
    return -1
`,
      solution: L`def caesar_encrypt(text: str, shift: int) -> str:
    res = []
    shift = shift % 26
    for ch in text:
        if 'A' <= ch <= 'Z':
            res.append(chr((ord(ch) - ord('A') + shift) % 26 + ord('A')))
        elif 'a' <= ch <= 'z':
            res.append(chr((ord(ch) - ord('a') + shift) % 26 + ord('a')))
        else:
            res.append(ch)
    return ''.join(res)

def caesar_decrypt(text: str, shift: int) -> str:
    return caesar_encrypt(text, -shift)

def caesar_crack(ciphertext: str, crib: str) -> int:
    crib_lower = crib.lower()
    for s in range(1, 26):
        decrypted = caesar_decrypt(ciphertext, s)
        if crib_lower in decrypted.lower():
            return s
    return -1
`,
      harness: L`if __name__ == '__main__':
    import sys
    lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lines:
        enc = caesar_encrypt("DEFEND THE CASTLE", 3)
        print(f"Encrypted: {enc}")
    else:
        cmd = lines[0]
        if cmd == 'encrypt':
            print(caesar_encrypt(lines[1], int(lines[2])))
        elif cmd == 'decrypt':
            print(caesar_decrypt(lines[1], int(lines[2])))
        elif cmd == 'crack':
            s = caesar_crack(lines[1], lines[2])
            print(f"Key: {s} -> {caesar_decrypt(lines[1], s)}")
`,
      hint: 'To decrypt with shift S, simply encrypt with -S. For cracking, loop over range(1, 26).',
      tests: [
        {
          name: 'Encrypt message',
          stdin: 'encrypt\nATTACK AT DAWN\n3\n',
          expected: 'DWWDFN DW GDZQ'
        },
        {
          name: 'Decrypt message with mixed case and punctuation',
          stdin: 'decrypt\nKhoor, Zruog!\n3\n',
          expected: 'Hello, World!'
        },
        {
          name: 'Brute-force crack with crib',
          stdin: 'crack\nWkh hqhpb kdv iodqnhg rxu idoo-edfn edvh\nbase\n',
          expected: 'Key: 3 -> The enemy has flanked our fall-back base'
        }
      ]
    },

    {
      id: 'xor-encryption',
      title: 'Bitwise XOR & The One-Time Pad',
      fileName: 'security.py',
      image: {
        url: '/diagrams/cybersecurity/xor-encryption.svg',
        caption: 'XOR is the reversible toggle switch of cryptography: A ^ B ^ B = A. Encrypting twice with the same key recovers the original data.'
      },
      content: L`## The Magic Reversible Toggle Switch

In electrical engineering, think of a toggle light switch on a wall. 
- You flip it once: the light turns **ON**.
- You flip it again with the exact same motion: the light turns **OFF**.

In computer science, that toggle switch is the **XOR** (Exclusive OR) bitwise operator, written as ^^^ in Python.
The XOR rule is simple:
- If two bits are identical (^0 ^ 0^ or ^1 ^ 1^), the answer is **0**.
- If two bits are different (^1 ^ 0^ or ^0 ^ 1^), the answer is **1**.

Because of this property, XOR has an extraordinary mathematical identity:
$$\text{Plaintext} \oplus \text{Key} \oplus \text{Key} = \text{Plaintext}$$

If you take a message and XOR its bytes with a secret key, you get scrambled ciphertext. If you take that ciphertext and XOR it with the exact same key again, the original plaintext pops back out!

## The One-Time Pad (OTP)

In 1949, mathematician Claude Shannon published a proof that stunned the intelligence world: if you XOR a message with a truly random key that is **as long as the message** and **never reused**, the resulting ciphertext is **mathematically impossible to break**, even with an infinite supercomputer! This is known as a **One-Time Pad (OTP)**.

Why? Because every possible message of that length is equally probable. If the ciphertext is 5 letters long, the key could decrypt it to "HELLO", "APPLE", "WATER", or "TIGER" with identical statistical probability. There is zero information leaked.

## Pop Culture: The Cold War Red Telephone

During the Cold War, the Washington-Moscow direct communications link (popularly called the "Red Telephone", though it was actually a teletype telegraph) used One-Time Pad tapes. Couriers carrying sealed diplomatic pouches physically delivered reels of random punch tapes between Washington and Moscow to ensure presidential communications could never be decrypted by Soviet or American spies.

## Code Walkthrough

In Python, we iterate through data bytes and key bytes, using modulo arithmetic ^i % len(key)^ to repeat the key if the message is longer than the key:

~~~
data = b"HELLO"
key = b"K"
ciphertext = bytes(b ^ key[i % len(key)] for i, b in enumerate(data))
decrypted = bytes(b ^ key[i % len(key)] for i, b in enumerate(ciphertext))
print(decrypted == data)  # True!
~~~

## Predict & Observe

What happens if you use a key composed entirely of zeroes (^b"\x00"^)?
Since ^A ^ 0 = A^, the data remains completely unencrypted! The strength of XOR relies entirely on the randomness and secrecy of the key.

## Your Task

Implement ^xor_cipher(data: bytes, key: bytes) -> bytes^ in ^security.py^.
It must:
1. Raise a ^ValueError("Key cannot be empty")^ if ^key^ has length 0.
2. XOR each byte of ^data^ with ^key[i % len(key)]^.
3. Return the resulting ^bytes^ object.`,
      terms: [
        { term: 'XOR (Exclusive OR)', def: 'A bitwise operation (symbol ^) that outputs 1 when bits differ and 0 when they match. Reversible: A ^ B ^ B = A.' },
        { term: 'One-Time Pad (OTP)', def: 'An encryption method using a random key of equal length to the plaintext, used once. Mathematically unbreakable.' },
        { term: 'symmetric encryption', def: 'A cryptographic system where the same secret key is used for both encryption and decryption.' },
        { term: 'keystream', def: 'A sequence of key characters or bytes applied successively to the plaintext to produce ciphertext.' }
      ],
      starter: L`def xor_cipher(data: bytes, key: bytes) -> bytes:
    # TODO: Check key not empty, then XOR each byte of data with key[i % len(key)]
    return b""
`,
      solution: L`def xor_cipher(data: bytes, key: bytes) -> bytes:
    if not key:
        raise ValueError("Key cannot be empty")
    k_len = len(key)
    return bytes(b ^ key[i % k_len] for i, b in enumerate(data))
`,
      harness: L`if __name__ == '__main__':
    import sys
    lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lines:
        k = b"SECRET"
        c = xor_cipher(b"MISSION", k)
        print(f"Decrypted: {xor_cipher(c, k).decode()}")
    else:
        text = lines[0].encode('utf-8')
        key = lines[1].encode('utf-8')
        c = xor_cipher(text, key)
        d = xor_cipher(c, key)
        print(f"CipherHex: {c.hex()}")
        print(f"Decrypted: {d.decode('utf-8')}")
        print(f"Reversible: {d == text}")
`,
      hint: 'Use a generator expression inside bytes(...) combining b ^ key[i % len(key)].',
      tests: [
        {
          name: 'XOR with single-byte key',
          stdin: 'HELLO\nK\n',
          expected: 'CipherHex: 030e070704\nDecrypted: HELLO\nReversible: True'
        },
        {
          name: 'XOR with multi-byte repeating key',
          stdin: 'MISSION ACCOMPLISHED\nSPYKEY\n',
          expected: 'CipherHex: 1e190a180c161d70180806161e00150216111614\nDecrypted: MISSION ACCOMPLISHED\nReversible: True'
        }
      ]
    },

    {
      id: 'unit-1-test',
      title: 'Unit 1 Test: Mission Impossible Multi-Layer Decoder',
      fileName: 'security.py',
      isUnitTest: true,
      image: {
        url: '/diagrams/cybersecurity/unit-1-test.svg',
        caption: 'Ethan Hunt must peel back three nested defensive layers: Base64 transport encoding, Caesar shift cipher, and bitwise XOR key encryption.'
      },
      content: L`## Operation Syndicate Intercept

**Agent Ethan Hunt**, IMF intelligence has intercepted an encrypted radio transmission broadcast by an undercover Syndicate operative. The enemy knew that simple encodings or single ciphers could be spotted by automated listening posts. To evade detection, the operative layered three distinct security transformations:

1. **Step 1 (At transmitter)**: The operative shifted the alphabet with a **Caesar Shift**.
2. **Step 2 (At transmitter)**: The operative encrypted the shifted text's UTF-8 bytes using a repeating **XOR Key**.
3. **Step 3 (At transmitter)**: The operative encoded the resulting binary ciphertext using **Base64** so it could be transmitted over radio channels.

Your mission, should you choose to accept it, is to write the multi-layer decoder that reverses all three steps in the exact correct sequence and reveals the enemy's intelligence.

## Pop Culture: Mission: Impossible

In *Mission: Impossible - Rogue Nation*, Ethan Hunt must dive into an underwater computer torus without oxygen tanks while Benji Dunn attempts to decode encrypted security profiles. If Benji misses a single layer of the authentication chain, the gate seals permanently. Every layer must be unwound in precise mathematical reverse order!

## The Reverse Decoding Chain

To recover the original message:
1. **Unwrap Layer 1**: Use ^base64.b64decode()^ to turn the incoming Base64 ASCII string back into raw encrypted bytes.
2. **Unwrap Layer 2**: XOR the bytes with ^xor_key^ using your repeating key algorithm. Then decode those bytes back into a UTF-8 string.
3. **Unwrap Layer 3**: Reverse the Caesar shift (shifting backwards by ^caesar_shift^) on letters ^A-Z^ and ^a-z^, keeping spaces and punctuation intact.

## Your Task

Implement ^decode_transmission(intercepted_b64: str, caesar_shift: int, xor_key: bytes) -> str^ in ^security.py^.
It must return the clean, original English message string.`,
      terms: [
        { term: 'defense-in-depth', def: 'Layering multiple security controls so that if one layer is compromised, additional layers continue to protect the asset.' },
        { term: 'decoding pipeline', def: 'Executing a sequence of inverse operations in exact reverse order to restore transformed data.' }
      ],
      starter: L`import base64

def decode_transmission(intercepted_b64: str, caesar_shift: int, xor_key: bytes) -> str:
    # TODO:
    # 1. Base64 decode intercepted_b64 to raw bytes
    # 2. XOR decipher bytes with xor_key, then decode to UTF-8 text
    # 3. Reverse the Caesar shift on letters and return the plaintext
    return ""
`,
      solution: L`import base64

def decode_transmission(intercepted_b64: str, caesar_shift: int, xor_key: bytes) -> str:
    # Step 1: Base64 decode
    raw_bytes = base64.b64decode(intercepted_b64)
    
    # Step 2: XOR decipher
    k_len = len(xor_key)
    c_bytes = bytes(b ^ xor_key[i % k_len] for i, b in enumerate(raw_bytes))
    caesar_text = c_bytes.decode('utf-8')
    
    # Step 3: Reverse Caesar shift
    shift = caesar_shift % 26
    plain_chars = []
    for ch in caesar_text:
        if 'A' <= ch <= 'Z':
            plain_chars.append(chr((ord(ch) - ord('A') - shift) % 26 + ord('A')))
        elif 'a' <= ch <= 'z':
            plain_chars.append(chr((ord(ch) - ord('a') - shift) % 26 + ord('a')))
        else:
            plain_chars.append(ch)
    return ''.join(plain_chars)
`,
      harness: L`if __name__ == '__main__':
    import sys
    lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lines:
        print("Awaiting transmission...")
    else:
        b64 = lines[0]
        shift = int(lines[1])
        key = lines[2].encode('utf-8')
        print(decode_transmission(b64, shift, key))
`,
      hint: 'First base64.b64decode, then XOR with key, decode utf-8, then shift by -caesar_shift modulo 26.',
      tests: [
        {
          name: 'Rendezvous Transmission',
          stdin: 'Hic1NiIwLyAzNWY5MXU8OiA+KDMlLG4zIyAoLCF1NzkjbSQ5Pz8jIDM1LHE=\n5\nIMF_HUNT\n',
          expected: 'Rendezvous at midnight behind the warehouse.'
        },
        {
          name: 'Syndicate Operative Alert',
          stdin: 'Hz8qOyY1NmU1OyNwKjMtMCl0LiklODUpOiQ4dDknPzwrMzU3OG8gJzEvOTU8NSMjNWs=\n7\nTOPSECRET\n',
          expected: 'Disavow the rogue syndicate operative immediately.'
        }
      ]
    }
  ]
};
