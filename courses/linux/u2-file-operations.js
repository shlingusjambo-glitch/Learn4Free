// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'file-operations',
  title: 'File Operations & Text Inspection',
  lessons: [
    {
      id: 'cat-head-tail',
      title: 'Reading Text: cat, head, and tail',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/cat-head-tail.svg',
        caption: 'Text Inspection: head views top lines, tail views the end, cat dumps all',
      },
      setupFiles: {
        'scroll.txt': 'Line 1: A long time ago in a galaxy far, far away...\nLine 2: Episode IV: A NEW HOPE\nLine 3: It is a period of civil war.\nLine 4: Rebel spaceships, striking from a hidden base,\nLine 5: have won their first victory against the evil Galactic Empire.\nLine 6: During the battle, Rebel spies managed to steal secret plans\nLine 7: to the Empire\'s ultimate weapon, the DEATH STAR,\nLine 8: an armored space station with enough power to destroy an entire planet.\nLine 9: Pursued by the Empire\'s sinister agents, Princess Leia races home\nLine 10: custodian of the stolen plans that can save her people and restore freedom to the galaxy...\n',
      },
      content: L`## Concept Hook: Movie Credit Rolls

When you sit in a movie theater after a Marvel blockbuster, you don't need to read every single caterer, lighting grip, and sound engineer if you only want to see the opening crawl or wait for the secret post-credits teaser scene.

In Linux, opening a 20-gigabyte database log inside a graphical text editor will freeze your computer. Command-line engineers inspect text with surgical precision: ^head^ shows the opening lines, ^tail^ shows the closing lines, and ^cat^ prints the entire scroll in a flash.

## Plain English: How cat, head, and tail Work

- ^cat^ is short for **concatenate**. It outputs the entire contents of a file from line 1 to the very end directly onto your screen.
- ^head^ displays the beginning of a file. By default, it prints the first 10 lines. With the ^-n^ flag (number of lines), you can specify exactly how many lines you want (e.g. ^head -n 2 filename^).
- ^tail^ displays the end of a file. Running ^tail -n 2 filename^ grabs the final 2 lines. In real-world DevOps, engineers run ^tail -f^ to watch web server traffic stream by in real time!

## Pop Culture & Soul

In *Star Wars*, every saga begins with yellow crawl text disappearing into the stars. If you just need the title and episode number, ^head -n 2^ gives you the story hook without waiting for the whole scroll.

## Code Walkthrough

~~~
# Inspect the opening crawl lines
head -n 2 scroll.txt

# Inspect the final lines of the scroll
tail -n 2 scroll.txt
~~~

- Line 2: ^head -n 2 scroll.txt^ grabs only Lines 1 and 2.
- Line 5: ^tail -n 2 scroll.txt^ grabs only Lines 9 and 10.

## Predict & Observe

What happens if you run ^head^ without passing ^-n^? It defaults to showing the first 10 lines. The ^-n^ option lets you customize the exact line count.

## Your Task

Write a script in ^script.sh^ that:
1. Prints the first 2 lines of ^scroll.txt^ using ^head -n 2 scroll.txt^.
2. Prints the last 2 lines of ^scroll.txt^ using ^tail -n 2 scroll.txt^.`,
      terms: [
        { term: 'cat', def: 'Concatenate: reads files sequentially and writes their full content to standard output.' },
        { term: 'head', def: 'Outputs the first part (head) of files; default is 10 lines.' },
        { term: 'tail', def: 'Outputs the last part (tail) of files; useful for reading recent log entries.' },
        { term: '-n', def: 'Flag specifying the exact number of lines to display with head or tail.' },
      ],
      starter: L`# File Operations Lesson 2.1: cat, head, and tail
# Inspect the start and end of scroll.txt

`,
      solution: L`head -n 2 scroll.txt
tail -n 2 scroll.txt
`,
      hint: 'Run "head -n 2 scroll.txt" followed by "tail -n 2 scroll.txt".',
      tests: [
        {
          name: 'Inspect head and tail of movie scroll',
          expected: `Line 1: A long time ago in a galaxy far, far away...
Line 2: Episode IV: A NEW HOPE
Line 9: Pursued by the Empire's sinister agents, Princess Leia races home
Line 10: custodian of the stolen plans that can save her people and restore freedom to the galaxy...`,
        },
      ],
    },
    {
      id: 'cp-mv-rm',
      title: 'Manipulating Files: cp, mv, and rm',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/cp-mv-rm.svg',
        caption: 'File Operations: cp duplicates, mv moves or renames, rm permanently deletes',
      },
      setupFiles: {
        'lab/draft.txt': 'Top secret blueprints.\n',
        'lab/archive/old.log': 'Deprecated protocol.\n',
      },
      content: L`## Concept Hook: The Bank Heist Toolkit

In a classic heist film like *Ocean's Eleven* or *Mission: Impossible*, Ethan Hunt needs three essential tools:
1. A scanner to **clone** the security keycard (^cp^).
2. A disguise to **relocate** or rename the stolen vault diamonds into a laundry cart (^mv^).
3. An incinerator to **destroy** the blueprints without leaving any evidence behind (^rm^).

These three commands (^cp^, ^mv^, ^rm^) form the bedrock of file management in Linux.

## Plain English: Copy, Move, and Remove

- ^cp <source> <dest>^ makes a duplicate copy. The original file remains untouched, and a new identical twin is born. (To copy an entire directory, use ^cp -r^ for recursive).
- ^mv <source> <dest>^ moves a file to a new location OR renames it if the destination is in the same folder. Unlike copy, ^mv^ does not create a duplicate; it simply updates the file's label.
- ^rm <file>^ removes (deletes) a file permanently. **Warning:** There is NO Trash Can or Recycle Bin in the Linux command line! When you run ^rm^, those bytes are unlinked immediately.

## Pop Culture & Soul

Command-line power comes with great responsibility. In Hollywood movies, hackers type furiously and files vanish in seconds. In real life, seasoned Linux sysadmins treat ^rm^ with deep respect because there is no "Undo" button.

## Code Walkthrough

~~~
# 1. Step into the lab
cd lab

# 2. Duplicate draft.txt to copy.txt
cp draft.txt copy.txt

# 3. Rename draft.txt to final.txt
mv draft.txt final.txt

# 4. Shred the duplicate copy.txt
rm copy.txt

# 5. List what remains
ls
~~~

- Line 5: ^cp draft.txt copy.txt^ creates a duplicate.
- Line 8: ^mv draft.txt final.txt^ renames the original draft to final.
- Line 11: ^rm copy.txt^ deletes the twin.
- Line 14: ^ls^ shows only ^archive^ and ^final.txt^ remain.

## Predict & Observe

What would happen if you ran ^mv draft.txt archive/^? The file ^draft.txt^ would be moved *inside* the ^archive^ directory! When the target is an existing folder, ^mv^ places the file inside it.

## Your Task

Write a script in ^script.sh^ that:
1. Enters the ^lab^ directory using ^cd lab^.
2. Clones ^draft.txt^ to ^copy.txt^ using ^cp draft.txt copy.txt^.
3. Renames ^draft.txt^ to ^final.txt^ using ^mv draft.txt final.txt^.
4. Deletes ^copy.txt^ using ^rm copy.txt^.
5. Lists the folder contents using ^ls^.`,
      terms: [
        { term: 'cp', def: 'Copy: duplicates files or directories from a source to a destination.' },
        { term: 'mv', def: 'Move: moves a file to another directory or renames it in place.' },
        { term: 'rm', def: 'Remove: permanently deletes files from disk without a recycling bin.' },
        { term: 'recursive', def: 'Operating on a directory and all files and subdirectories inside it.' },
      ],
      starter: L`# File Operations Lesson 2.2: cp, mv, and rm
# Enter lab, copy draft.txt, rename draft to final, and remove copy

`,
      solution: L`cd lab
cp draft.txt copy.txt
mv draft.txt final.txt
rm copy.txt
ls
`,
      hint: 'Navigate with "cd lab", then "cp draft.txt copy.txt", "mv draft.txt final.txt", "rm copy.txt", and "ls".',
      tests: [
        {
          name: 'Perform copy, rename, and delete in lab directory',
          expected: `archive
final.txt`,
        },
      ],
    },
    {
      id: 'grep-search',
      title: 'Finding the Needle: grep',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/grep-search.svg',
        caption: 'Text Search: grep filters lines matching a pattern with flags like -i and -c',
      },
      setupFiles: {
        'server.log': '[INFO] 10:00:01 System initialized\n[ERROR] 10:01:23 Database connection timed out\n[DEBUG] 10:02:11 Cache refreshed\n[error] 10:03:45 Socket read error on port 8080\n[INFO] 10:04:02 User alice logged in\n[ERROR] 10:05:59 Authentication failed for user root\n[INFO] 10:06:30 Database backup completed\n',
      },
      content: L`## Concept Hook: Where's Waldo in 100,000 Lines

Imagine being handed a 500-page telephone directory and tasked with finding every person whose last name is "Wayne". Flipping through every single page with your eyes would take hours.

In Linux, **grep** is your optical scanner. You give it a target word, and it scans through millions of lines of text in milliseconds, printing out only the exact lines that contain your search term.

## Plain English: How grep Works

^grep^ stands for **Global Regular Expression Print**. It searches input files line by line for a specific pattern of text.

Key flags make ^grep^ infinitely flexible:
- ^-i^ stands for **ignore case**. It matches "error", "ERROR", and "Error" equally.
- ^-c^ stands for **count**. Instead of printing the matching lines, it prints the single number of how many times the term appeared.
- ^-n^ shows the line number where each match occurred.
- ^-v^ inverts the search, printing every line that DOES NOT match.

## Pop Culture & Soul

Whether you're Sherlock Holmes investigating clues in a Victorian ledger or Morpheus searching the Matrix for anomaly signatures, ^grep^ is the most famous and beloved search utility in computing history.

## Code Walkthrough

~~~
# Find all error lines regardless of capitalization
grep -i "error" server.log

# Count how many lines mention database
grep -c -i "database" server.log
~~~

- Line 2: ^grep -i "error"^ prints the three error messages (both uppercase ^[ERROR]^ and lowercase ^[error]^).
- Line 5: ^grep -c -i "database"^ outputs ^2^ because two lines contain the word "database".

## Predict & Observe

What would happen if you ran ^grep "error" server.log^ without the ^-i^ flag? It would only match the single lowercase ^[error]^ line and completely miss the two uppercase ^[ERROR]^ lines! Always use ^-i^ when case might vary.

## Your Task

Write a script in ^script.sh^ that:
1. Searches ^server.log^ for all lines containing ^"error"^ with case-insensitivity using ^grep -i "error" server.log^.
2. Counts how many lines mention ^"database"^ with case-insensitivity using ^grep -c -i "database" server.log^.`,
      terms: [
        { term: 'grep', def: 'Global Regular Expression Print: searches text line by line for matching patterns.' },
        { term: 'pattern', def: 'The text string or regular expression you are searching for.' },
        { term: '-i', def: 'Grep flag for case-insensitive matching (ignores uppercase vs lowercase).' },
        { term: '-c', def: 'Grep flag that outputs only the count of matching lines instead of the text.' },
      ],
      starter: L`# File Operations Lesson 2.3: grep
# Search server.log for errors and count database mentions

`,
      solution: L`grep -i "error" server.log
grep -c -i "database" server.log
`,
      hint: 'Run "grep -i \\"error\\" server.log" and "grep -c -i \\"database\\" server.log".',
      tests: [
        {
          name: 'Extract error lines and count database occurrences',
          expected: `[ERROR] 10:01:23 Database connection timed out
[error] 10:03:45 Socket read error on port 8080
[ERROR] 10:05:59 Authentication failed for user root
2`,
        },
      ],
    },
    {
      id: 'unit-2-test',
      title: 'Unit 2 Test: Server Intrusion Log Investigator',
      language: 'bash',
      fileName: 'script.sh',
      isUnitTest: true,
      image: {
        url: '/diagrams/linux/unit-2-test.svg',
        caption: 'Unit 2 Test: Forensic analysis of server intrusion logs and quarantine isolation',
      },
      setupFiles: {
        'auth.log': 'Jun 10 04:01:12 host sshd[1201]: Accepted publickey for neo\nJun 10 04:02:45 host sshd[1205]: FAILED password for invalid user root from 192.168.1.100\nJun 10 04:03:10 host sshd[1208]: Accepted publickey for trinity\nJun 10 04:04:22 host sshd[1212]: FAILED password for morpheus from 10.0.0.55\nJun 10 04:05:01 host sshd[1215]: failed login attempt detected from 172.16.0.4\nJun 10 04:06:18 host sshd[1220]: System lockdown triggered by security daemon\n',
        'temp_dump.txt': 'RAW MEMORY CRASH DUMP 0xDEADBEEF\n',
      },
      content: L`## The Mission: Zion Mainframe Intrusion

**Alert from Cyber Defense Operations:**

*"An unauthorized IP address has attempted a brute-force breach against our core authentication gateway! Agent Smith's bots are scanning our ports. We need a security engineer to isolate the forensic evidence, extract the failed logins, and inspect the final lockdown entries!"*

You are the Incident Response Lead. Demonstrate your file manipulation and text inspection skills.

## The Specification

Write an automated investigation script in ^script.sh^ that executes the following protocol:

1. Extract all failed login attempts from ^auth.log^ with case-insensitivity using ^grep -i "failed" auth.log^.
2. Create an isolated evidence directory ^quarantine^ using ^mkdir -p quarantine^.
3. Make a forensic backup copy of ^auth.log^ named ^quarantine/auth_backup.log^ using ^cp^.
4. Move the raw memory dump ^temp_dump.txt^ into ^quarantine/temp_evidence.log^ using ^mv^.
5. Inspect the final 2 lines of ^auth.log^ using ^tail -n 2 auth.log^ to confirm the lockdown status.

## Expected Output

Your script must produce the following output:

~~~
Jun 10 04:02:45 host sshd[1205]: FAILED password for invalid user root from 192.168.1.100
Jun 10 04:04:22 host sshd[1212]: FAILED password for morpheus from 10.0.0.55
Jun 10 04:05:01 host sshd[1215]: failed login attempt detected from 172.16.0.4
Jun 10 04:05:01 host sshd[1215]: failed login attempt detected from 172.16.0.4
Jun 10 04:06:18 host sshd[1220]: System lockdown triggered by security daemon
~~~

Secure the mainframe, Detective!`,
      terms: [
        { term: 'forensics', def: 'The practice of collecting, analyzing, and preserving digital evidence from logs and files.' },
        { term: 'quarantine', def: 'An isolated directory where suspicious or compromised files are moved for safe analysis.' },
      ],
      starter: L`# Unit 2 Test: Server Intrusion Log Investigator
# Grep failed attempts, quarantine evidence, and tail final status

`,
      solution: L`grep -i "failed" auth.log
mkdir -p quarantine
cp auth.log quarantine/auth_backup.log
mv temp_dump.txt quarantine/temp_evidence.log
tail -n 2 auth.log
`,
      hint: 'Use "grep -i \\"failed\\" auth.log", "mkdir -p quarantine", "cp auth.log quarantine/auth_backup.log", "mv temp_dump.txt quarantine/temp_evidence.log", and "tail -n 2 auth.log".',
      tests: [
        {
          name: 'Perform forensic investigation of auth.log',
          expected: `Jun 10 04:02:45 host sshd[1205]: FAILED password for invalid user root from 192.168.1.100
Jun 10 04:04:22 host sshd[1212]: FAILED password for morpheus from 10.0.0.55
Jun 10 04:05:01 host sshd[1215]: failed login attempt detected from 172.16.0.4
Jun 10 04:05:01 host sshd[1215]: failed login attempt detected from 172.16.0.4
Jun 10 04:06:18 host sshd[1220]: System lockdown triggered by security daemon`,
        },
      ],
    },
  ],
};
