// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'streams-pipes',
  title: 'Streams, Redirection & Pipes',
  lessons: [
    {
      id: 'stdout-redirection',
      title: 'Directing the Flow: > and >>',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/stdout-redirection.svg',
        caption: 'Redirection Operators: > overwrites existing content, >> appends new lines',
      },
      content: L`## Concept Hook: Ghostbusters & Plumbing Valves

In *Ghostbusters*, when Peter Venkman fires his proton wand, the energy stream flies freely forward through the air. But when he points the beam downward directly into the ghost trap, he **redirects** the stream into a storage container.

In Linux, every command you execute writes its answers to a default river called **Standard Output** (^stdout^), which flows right onto your screen. But you can screw a nozzle onto that stream and redirect it into a file using the angle brackets: ^>^ (overwrite) and ^>>^ (append).

## Plain English: Overwrite vs Append

- Standard Output (^stdout^) is where programs send their normal output text.
- Single bracket ^>^ is the **overwrite** operator. It directs the output into a file. If the file already exists, it is wiped clean to 0 bytes before writing new text!
- Double bracket ^>>^ is the **append** operator. It directs the output to the file without erasing anything, attaching the new lines neatly to the bottom.

## Pop Culture & Soul

Imagine a diary or spaceship flight recorder. If you use ^>^ every morning, today's entry erases yesterday's history! That's why log files always use ^>>^ to preserve the continuous journal of events.

## Code Walkthrough

~~~
# 1. Overwrite status.txt with the first entry
echo "System Online" > status.txt

# 2. Append the second status entry
echo "Sensors Nominal" >> status.txt

# 3. Append the third status entry
echo "Shields 100%" >> status.txt

# 4. Display the resulting file
cat status.txt
~~~

- Line 2: Creates or resets ^status.txt^ containing "System Online".
- Lines 5 & 8: ^>>^ appends "Sensors Nominal" and "Shields 100%" below it.
- Line 11: ^cat status.txt^ prints all three lines.

## Predict & Observe

What would happen if on Line 8 you mistakenly used ^>^ instead of ^>>^? The entire file would be wiped, leaving only "Shields 100%" inside! Always double-check whether you want to clobber (^>^) or append (^>>^).

## Your Task

Write a script in ^script.sh^ that:
1. Writes ^"System Online"^ into ^status.txt^ using ^>^.
2. Appends ^"Sensors Nominal"^ to ^status.txt^ using ^>>^.
3. Appends ^"Shields 100%"^ to ^status.txt^ using ^>>^.
4. Outputs the file contents using ^cat status.txt^.`,
      terms: [
        { term: 'stdout', def: 'Standard Output: the default text stream where programs send output messages.' },
        { term: 'redirection', def: 'Diverting an input or output stream to or from a file instead of the terminal.' },
        { term: '>', def: 'Output redirection operator that overwrites the destination file.' },
        { term: '>>', def: 'Output redirection operator that appends to the end of the destination file.' },
        { term: 'echo', def: 'Command that prints text strings to standard output.' },
      ],
      starter: L`# Streams Lesson 3.1: > and >>
# Build status.txt with overwrite and append, then cat

`,
      solution: L`echo "System Online" > status.txt
echo "Sensors Nominal" >> status.txt
echo "Shields 100%" >> status.txt
cat status.txt
`,
      hint: 'Use "echo \\"System Online\\" > status.txt", then append two lines with ">>", then "cat status.txt".',
      tests: [
        {
          name: 'Redirect and append status updates',
          expected: `System Online
Sensors Nominal
Shields 100%`,
        },
      ],
    },
    {
      id: 'pipes-basics',
      title: 'Assembly Lines: The Pipe |',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/pipes-basics.svg',
        caption: 'The Unix Pipeline: Connecting command stdout directly to stdin via pipe |',
      },
      setupFiles: {
        'passengers.txt': 'John Jacob Astor IV,First Class,Survived\nMadeleine Astor,First Class,Survived\nJack Dawson,Third Class,Died\nRose DeWitt Bukater,First Class,Survived\nFabrizio De Rossi,Third Class,Died\nThomas Andrews,First Class,Died\nBruce Ismay,First Class,Survived\nMolly Brown,First Class,Survived\nTommy Ryan,Third Class,Died\n',
      },
      content: L`## Concept Hook: The Willy Wonka Chocolate Assembly Line

In Willy Wonka's chocolate factory, you don't take warm liquid chocolate out of the mixing vat, pour it into a bucket, carry it across the room, dump it onto a cooling slab, pick it up again, and hand it to a packaging machine.

The machines are connected directly by overhead pipes! The output of the mixer flows directly into the cooling chamber, which flows into the wrapper.

The vertical bar **pipe** ^|^ is the most celebrated invention in Unix history. It connects the **standard output** of one command directly into the **standard input** of the next command in memory without saving intermediate files to disk!

## Plain English: How the Pipe Works

The Linux philosophy states:
> *"Write programs that do one thing and do it well. Write programs to work together."*

Instead of creating one giant bloated program that searches, sorts, and counts, Linux gives you small, razor-sharp tools:
- ^grep^ searches.
- ^wc -l^ counts lines.
- The pipe ^|^ connects them: ^grep "First Class" passengers.txt | wc -l^ filters the passengers and counts them in one smooth breath.

## Pop Culture & Soul

Invented by Doug McIlroy at Bell Labs in the 1970s, the pipe transformed computing. Think of it like connecting Lego blocks: with small building bricks and the pipe connector, you can assemble infinite data-processing machines.

## Code Walkthrough

~~~
# Filter First Class passengers and count how many rows match
grep "First Class" passengers.txt | wc -l

# Count total lines in the passenger roster
cat passengers.txt | wc -l
~~~

- Line 2: ^grep^ extracts the 6 matching First Class lines; the pipe ^|^ feeds them into ^wc -l^ which outputs ^6^.
- Line 5: ^cat^ streams all 9 lines into ^wc -l^ which outputs ^9^.

## Predict & Observe

Notice that no temporary text file was ever created on your hard drive! The data flowed through a high-speed memory pipe.

## Your Task

Write a script in ^script.sh^ that:
1. Counts the number of passengers with "First Class" tickets by piping ^grep "First Class" passengers.txt^ into ^wc -l^.
2. Counts the total number of passenger records by piping ^cat passengers.txt^ into ^wc -l^.`,
      terms: [
        { term: 'pipe (|)', def: 'The Unix pipe operator that routes stdout from one command directly into stdin of another.' },
        { term: 'stdin', def: 'Standard Input: the stream where a command reads its incoming input data.' },
        { term: 'wc', def: 'Word Count: utility to count lines (-l), words (-w), or bytes (-c).' },
        { term: 'pipeline', def: 'A chain of two or more commands linked together with pipe (|) operators.' },
      ],
      starter: L`# Streams Lesson 3.2: The Pipe |
# Pipe grep into wc -l, and cat into wc -l

`,
      solution: L`grep "First Class" passengers.txt | wc -l
cat passengers.txt | wc -l
`,
      hint: 'Run "grep \\"First Class\\" passengers.txt | wc -l" and "cat passengers.txt | wc -l".',
      tests: [
        {
          name: 'Count filtered and total passengers via pipe',
          expected: `6
9`,
        },
      ],
    },
    {
      id: 'sort-uniq',
      title: 'Clean and Tidy: sort and uniq',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/sort-uniq.svg',
        caption: 'Deduplication Pipeline: Always sort before uniq to group adjacent duplicates',
      },
      setupFiles: {
        'votes.txt': 'Inception\nThe Matrix\nInterstellar\nInception\nThe Matrix\nInterstellar\nInception\nThe Matrix\n',
      },
      content: L`## Concept Hook: The Hogwarts Sorting Hat

Imagine being handed a box of thousands of movie ballots from an Oscars poll. If you try to count how many votes "The Matrix" received while pulling names at random, you will constantly lose count.

First, you sort all ballots alphabetically into stacks (^sort^). Once all identical names sit side by side, counting and deduplicating becomes effortless (^uniq^).

## Plain English: Mastering sort and uniq

- ^sort^ organizes lines in alphabetical (or numerical) order.
- ^uniq^ detects and removes consecutive duplicate lines.
- **The Golden Rule of uniq:** ^uniq^ ONLY compares adjacent lines! If "Inception" appears on line 1 and line 7, ^uniq^ will NOT see the duplicate. You must ALWAYS sort your data before piping into ^uniq^: ^sort votes.txt | uniq^!
- The ^-c^ flag tells ^uniq -c^ to print a count prefix showing how many times each unique item occurred.

## Pop Culture & Soul

Every time Spotify generates your *Spotify Wrapped* or billboard charts tally top songs, data pipelines sort stream logs and aggregate frequency counts. You are learning the exact pipeline primitives that drive big data analytics.

## Code Walkthrough

~~~
# 1. Output unique movie titles in alphabetical order
sort votes.txt | uniq

# 2. Count the frequency of each movie vote
sort votes.txt | uniq -c
~~~

- Line 2: Sorts the list and removes duplicates, outputting: ^Inception^, ^Interstellar^, ^The Matrix^.
- Line 5: ^uniq -c^ counts how many times each title occurred in the sorted stream.

## Predict & Observe

What would happen if you ran ^uniq votes.txt^ without sorting first? None of the duplicate votes would be merged, because identical movie names were separated by other titles! Always sort first.

## Your Task

Write a script in ^script.sh^ that:
1. Prints the unique list of movies sorted alphabetically using ^sort votes.txt | uniq^.
2. Prints the counted vote tally for each unique movie using ^sort votes.txt | uniq -c^.`,
      terms: [
        { term: 'sort', def: 'Sorts lines of text files alphabetically or numerically.' },
        { term: 'uniq', def: 'Reports or omits repeated lines; requires adjacent sorted input.' },
        { term: 'uniq -c', def: 'Prefixes lines by the number of occurrences.' },
        { term: 'aggregation', def: 'Combining multiple data rows into summary counts or statistics.' },
      ],
      starter: L`# Streams Lesson 3.3: sort and uniq
# Sort and deduplicate votes.txt, then count occurrences

`,
      solution: L`sort votes.txt | uniq
sort votes.txt | uniq -c
`,
      hint: 'Run "sort votes.txt | uniq" followed by "sort votes.txt | uniq -c".',
      tests: [
        {
          name: 'Sort and deduplicate movie votes',
          expected: `Inception
Interstellar
The Matrix
      3 Inception
      2 Interstellar
      3 The Matrix`,
        },
      ],
    },
    {
      id: 'unit-3-test',
      title: 'Unit 3 Test: Music Streaming Top 10 Chart Aggregator',
      language: 'bash',
      fileName: 'script.sh',
      isUnitTest: true,
      image: {
        url: '/diagrams/linux/unit-3-test.svg',
        caption: 'Unit 3 Test: Multi-stage streaming pipeline to aggregate Billboard Top 3',
      },
      setupFiles: {
        'streams.log': 'Daft Punk - One More Time\nQueen - Bohemian Rhapsody\nTEST_STREAM\nFleetwood Mac - Dreams\nQueen - Bohemian Rhapsody\nDaft Punk - One More Time\nKendrick Lamar - Alright\nTEST_STREAM\nQueen - Bohemian Rhapsody\nDaft Punk - One More Time\nFleetwood Mac - Dreams\nDaft Punk - One More Time\n',
      },
      content: L`## The Mission: Billboard & Spotify Stream Tally

**Emergency Memo from Spotify Data Engineering:**

*"The weekly Global Top Chart closes in five minutes! Millions of raw streaming events have poured into ^streams.log^. However, quality assurance engineers left ^TEST_STREAM^ probe records scattered throughout the log. We need an automated analytics pipeline to filter out the test data, calculate play counts, rank the top 3 songs, and publish the chart!"*

You are the Lead Data Infrastructure Engineer. Prove your mastery of Linux pipelines and stream redirection.

## The Specification

Write an automated multi-stage pipeline script in ^script.sh^ that:

1. Filters out any lines matching ^"TEST_STREAM"^ using ^grep -v "TEST_STREAM" streams.log^.
2. Pipes into ^sort^ to group identical track names together.
3. Pipes into ^uniq -c^ to count the number of plays for each track.
4. Pipes into ^sort -nr^ (numerical reverse sort) so the track with the highest play count appears first.
5. Grabs only the top 3 leaderboard tracks using ^head -n 3^.
6. Redirects that output into a new file named ^top3.txt^ using ^>^.
7. Prints ^top3.txt^ to the terminal using ^cat top3.txt^.

## Expected Output

Your script must produce the following leaderboard:

~~~
      4 Daft Punk - One More Time
      3 Queen - Bohemian Rhapsody
      2 Fleetwood Mac - Dreams
~~~

Publish the chart to millions of listeners worldwide!`,
      terms: [
        { term: 'grep -v', def: 'Inverted grep: selects lines that DO NOT match the search pattern.' },
        { term: 'sort -nr', def: 'Sorts numerically (-n) in reverse descending order (-r).' },
        { term: 'data pipeline', def: 'A sequence of data-processing stages connected in series.' },
      ],
      starter: L`# Unit 3 Test: Music Streaming Top 10 Chart Aggregator
# Filter TEST_STREAM, sort, uniq -c, sort -nr, head -n 3 > top3.txt, then cat

`,
      solution: L`grep -v "TEST_STREAM" streams.log | sort | uniq -c | sort -nr | head -n 3 > top3.txt
cat top3.txt
`,
      hint: 'Chain the commands together with | into "> top3.txt", then call "cat top3.txt".',
      tests: [
        {
          name: 'Generate and display top 3 streaming leaderboard',
          expected: `      4 Daft Punk - One More Time
      3 Queen - Bohemian Rhapsody
      2 Fleetwood Mac - Dreams`,
        },
      ],
    },
  ],
};
