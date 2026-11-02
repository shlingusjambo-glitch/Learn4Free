// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'navigation',
  title: 'Navigation & The Linux Filesystem Tree',
  lessons: [
    {
      id: 'pwd-ls',
      title: 'Where Am I? pwd and ls',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/pwd-ls.svg',
        caption: 'Filesystem GPS: pwd outputs your path, ls reveals visible and hidden files',
      },
      setupFiles: {
        'hogwarts/gryffindor.txt': 'Bravery, daring, nerve, and chivalry.\n',
        'hogwarts/potions.txt': 'Add fluxweed picked at the full moon.\n',
        'hogwarts/.marauders_map': 'Messrs Moony, Wormtail, Padfoot, and Prongs are proud to present...\n',
      },
      content: L`## Concept Hook: The Marauder's Map

In *Harry Potter*, Harry and Ron don't wander blindly through the sprawling corridors of Hogwarts. Harry pulls out the **Marauder's Map**, taps it with his wand, and utters the charm: *"I solemnly swear that I am up to no good."* Instantly, inked footprints appear, revealing his exact coordinate location in the castle and all nearby doors.

When you use the Linux command line, you have no mouse, no desktop icons, and no double-clickable folders. You are standing inside a massive castle of files. Your primary navigational spells are ^pwd^ (your magical GPS) and ^ls^ (your torchlight to inspect the room).

## Plain English: How Files are Organized

Every file and folder on a computer lives inside a giant upside-down tree called the **filesystem**. The trunk at the very top is called the **root directory**, represented by a single forward slash ^/^. Every folder branch splits off from that root.

When you open a terminal, you are always "standing" in one specific folder. That location is your **current working directory**.

- ^pwd^ stands for **Print Working Directory**. It prints the complete address from root ^/^ all the way down to where you are standing right now.
- ^ls^ stands for **List**. It lists the names of every file and folder in your current room.
- Hidden files in Linux always begin with a period (like ^.marauders_map^). Standard ^ls^ keeps them invisible so they don't clutter your view. Adding the flag ^-a^ (all) tells ^ls -a^ to reveal everything, including hidden dotfiles!

## Pop Culture & Soul

Think of your computer as the Millennium Falcon or the Hogwarts castle. Graphical interfaces hide the engine cables under shiny plastic panels. The Linux terminal lifts the hood and hands you the wrench. When you type commands, you talk directly to the operating system kernel with zero middlemen.

## Code Walkthrough

~~~
# 1. Step into the hogwarts directory
cd hogwarts

# 2. Ask the terminal where we are
pwd

# 3. List normal visible files
ls

# 4. List ALL files, including secret dotfiles
ls -a
~~~

- Line 1: ^cd hogwarts^ walks forward into the folder named ^hogwarts^.
- Line 2: ^pwd^ prints the full path (e.g. ^/home/student/workspace/hogwarts^).
- Line 3: ^ls^ prints visible files (^gryffindor.txt^ and ^potions.txt^).
- Line 4: ^ls -a^ reveals ^.^ (current folder), ^..^ (parent folder), ^.marauders_map^, and the visible files.

## Predict & Observe

What do you think happens if you run ^ls^ without ^-a^? You will only see the normal text files. Running ^ls -a^ acts like a blacklight, illuminating the secret ^.marauders_map^ file that was hidden in plain sight.

## Your Task

Write a bash script in ^script.sh^ that:
1. Changes directory into the ^hogwarts^ folder using ^cd hogwarts^.
2. Prints the current working directory using ^pwd^.
3. Lists visible files using ^ls^.
4. Lists all files including hidden files using ^ls -a^.`,
      terms: [
        { term: 'command line', def: 'A text-based interface where you type instructions for the computer instead of clicking icons.' },
        { term: 'filesystem', def: 'The hierarchical tree structure used by an operating system to store and organize files.' },
        { term: 'working directory', def: 'The folder you are currently inside within the terminal.' },
        { term: 'pwd', def: 'Print Working Directory: outputs the full absolute path of where you are standing.' },
        { term: 'ls', def: 'List: displays the names of files and directories in your current location.' },
        { term: 'flag', def: 'A modifier starting with a dash (like ^-a^) that changes how a command behaves.' },
        { term: 'hidden file', def: 'A file whose name begins with a dot (like ^.config^); hidden from regular ^ls^.' },
      ],
      starter: L`# Navigation Lesson 1.1: pwd and ls
# Step into hogwarts and inspect your surroundings

`,
      solution: L`cd hogwarts
pwd
ls
ls -a
`,
      hint: 'First type "cd hogwarts", then on new lines call "pwd", "ls", and "ls -a".',
      tests: [
        {
          name: 'Inspect hogwarts location and list files',
          expected: `/home/student/workspace/hogwarts
gryffindor.txt
potions.txt
.
..
.marauders_map
gryffindor.txt
potions.txt`,
        },
      ],
    },
    {
      id: 'cd-paths',
      title: 'Moving Around: cd and Paths',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/cd-paths.svg',
        caption: 'Path Navigation: Absolute paths start at root (/), relative paths use . and ..',
      },
      setupFiles: {
        'galaxy/sector7/outpost/radar.log': 'All quiet on the Western spiral arm.\n',
        'galaxy/earth/mission_control.txt': 'Houston, we copy you.\n',
      },
      content: L`## Concept Hook: The DeLorean GPS

In *Back to the Future*, Doc Brown punches exact dates and coordinates into the DeLorean dashboard to travel to precise moments in history. In Linux, an **absolute path** is like dialing exact global coordinates into your navigation computer: no matter where you are in the galaxy, starting with a forward slash ^/^ gives directions from the absolute root of the filesystem.

A **relative path**, on the other hand, is like saying *"Take two steps back into the hallway, then turn left into the kitchen."* It only makes sense relative to where you are standing right now.

## Plain English: Mastering cd, . and ..

The ^cd^ command stands for **Change Directory**. It is your steering wheel.

- Single dot ^.^ represents **right here** (your current directory).
- Double dot ^..^ represents **the parent directory** (one floor up).
- Forward slash ^/^ at the start of a path means the **root directory** (the foundation of the whole disk).
- Tilde ^~^ is shorthand for your **home directory** (your personal user space).

If you are standing deep in ^galaxy/sector7/outpost^ and want to travel to ^galaxy/earth^, you don't need to start all the way back from root. You can climb two levels up with ^../..^ and walk straight into ^earth^!

## Pop Culture & Soul

Think of exploring directories like navigating the tunnels of the Death Star or an old-school text adventure game (*"You are in a maze of twisty little passages, all alike"*). Learning ^..^ gives you spatial awareness so you never get lost in a server again.

## Code Walkthrough

~~~
# Step into the deep outpost
cd galaxy/sector7/outpost
pwd

# Jump two levels up to galaxy, then down into earth
cd ../../earth
pwd

# List the files in earth
ls
~~~

- Line 2: Walks three folders deep into ^galaxy/sector7/outpost^.
- Line 3: Prints the deep outpost path.
- Line 6: ^cd ../..^ steps out of ^outpost^, out of ^sector7^, and into ^earth^.
- Line 10: Lists ^mission_control.txt^ inside ^earth^.

## Predict & Observe

What would happen if you typed ^cd ..^ when standing at the absolute root ^/^? Root has no parent! Linux simply keeps you at ^/^ without crashing.

## Your Task

Write a script in ^script.sh^ that:
1. Navigates into ^galaxy/sector7/outpost^ using ^cd^.
2. Prints your current path with ^pwd^.
3. Moves relatively to ^../../earth^ using ^cd ../../earth^.
4. Prints your new path with ^pwd^.
5. Lists the files in ^earth^ using ^ls^.`,
      terms: [
        { term: 'cd', def: 'Change Directory: moves your active terminal session to a different folder.' },
        { term: 'absolute path', def: 'A path starting with / that describes a location from the filesystem root.' },
        { term: 'relative path', def: 'A path that describes a location starting from your current directory.' },
        { term: '.', def: 'A special shortcut referring to the current directory.' },
        { term: '..', def: 'A special shortcut referring to the parent directory (one level up).' },
        { term: '~', def: 'Tilde shortcut representing the current logged-in user home directory.' },
      ],
      starter: L`# Navigation Lesson 1.2: cd and Relative Paths
# Navigate to the outpost, then use .. to travel to earth

`,
      solution: L`cd galaxy/sector7/outpost
pwd
cd ../../earth
pwd
ls
`,
      hint: 'Use "cd galaxy/sector7/outpost", print with "pwd", then "cd ../../earth", "pwd", and "ls".',
      tests: [
        {
          name: 'Navigate across galaxy directories',
          expected: `/home/student/workspace/galaxy/sector7/outpost
/home/student/workspace/galaxy/earth
mission_control.txt`,
        },
      ],
    },
    {
      id: 'mkdir-touch',
      title: 'Creating Worlds: mkdir and touch',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/mkdir-touch.svg',
        caption: 'Creation Commands: mkdir -p builds directory pyramids, touch creates blank files',
      },
      content: L`## Concept Hook: Minecraft Foundations

In *Minecraft*, before you can store enchanted weapons or brew potions, you place cobblestone blocks to build rooms, and you craft empty wooden chests to hold your loot.

In Linux, you create the digital world from scratch using two simple commands: ^mkdir^ (which constructs new folder rooms) and ^touch^ (which crafts empty files ready for data).

## Plain English: Building Hierarchies

- ^mkdir^ stands for **Make Directory**. Calling ^mkdir photos^ creates a new folder named ^photos^.
- The ^-p^ flag stands for **parents**. Normally, if you try to create ^station/hangar/bays^ when ^station^ doesn't exist yet, Linux gives an error. Adding ^-p^ tells Linux: *"Build any missing parent folders along the way without complaining!"*
- ^touch^ creates a brand-new, empty file with a size of 0 bytes. (If the file already exists, ^touch^ simply updates its timestamp without modifying its contents).

## Pop Culture & Soul

In 1993's *Jurassic Park*, Lex Murphy famously sits at the Unix terminal and proclaims: *"It's a UNIX system! I know this!"* Knowing how to rapidly conjure nested directory structures and files with one-line bash commands is the superpower behind automated software deployment and server provisioning.

## Code Walkthrough

~~~
# Create a 3-level folder structure in one swift strike
mkdir -p station/hangar/bays

# Create two empty ship manifests inside bays
touch station/hangar/bays/ship1.txt station/hangar/bays/ship2.txt

# Verify the files exist
ls station/hangar/bays
~~~

- Line 2: ^mkdir -p^ creates ^station^, creates ^hangar^ inside it, and creates ^bays^ inside that.
- Line 5: ^touch^ creates both ^ship1.txt^ and ^ship2.txt^ inside ^station/hangar/bays^.
- Line 8: ^ls station/hangar/bays^ displays both files.

## Predict & Observe

What would happen if you omitted the ^-p^ flag when typing ^mkdir station/hangar/bays^ on a blank disk? Linux would abort with: *No such file or directory*, because the parent folders didn't exist yet. Always remember ^-p^ when creating nested paths!

## Your Task

Write a script in ^script.sh^ that:
1. Creates the nested directory path ^station/hangar/bays^ using ^mkdir -p^.
2. Creates two empty files inside that folder: ^ship1.txt^ and ^ship2.txt^ using ^touch^.
3. Lists the contents of ^station/hangar/bays^ using ^ls station/hangar/bays^.`,
      terms: [
        { term: 'mkdir', def: 'Make Directory: creates one or more new folders on disk.' },
        { term: 'mkdir -p', def: 'Creates intermediate parent directories as needed without throwing an error.' },
        { term: 'touch', def: 'Creates a new empty 0-byte file, or updates an existing file timestamp.' },
        { term: 'directory', def: 'A folder on disk that contains files and other subdirectories.' },
      ],
      starter: L`# Navigation Lesson 1.3: mkdir and touch
# Build station/hangar/bays and touch ship1.txt and ship2.txt

`,
      solution: L`mkdir -p station/hangar/bays
touch station/hangar/bays/ship1.txt station/hangar/bays/ship2.txt
ls station/hangar/bays
`,
      hint: 'Run "mkdir -p station/hangar/bays", touch both files, then list with "ls station/hangar/bays".',
      tests: [
        {
          name: 'Create nested directories and files',
          expected: `ship1.txt
ship2.txt`,
        },
      ],
    },
    {
      id: 'unit-1-test',
      title: 'Unit 1 Test: Star Wars Rebel Base Architecture',
      language: 'bash',
      fileName: 'script.sh',
      isUnitTest: true,
      image: {
        url: '/diagrams/linux/unit-1-test.svg',
        caption: 'Unit 1 Test: Build the Yavin 4 Rebel Base filesystem architecture',
      },
      content: L`## The Mission: Yavin 4 Rebel Outpost

**Priority Transmission from General Leia Organa:**

*"The Galactic Empire has tracked our convoy to the jungle moon of Yavin 4. An Imperial Star Destroyer will enter orbit within minutes. We must establish our underground base directory structure immediately so our flight computers can coordinate the starfighter assault on the Death Star!"*

You are the Rebel Alliance's Chief Systems Architect. Prove your mastery of Linux navigation and filesystem construction.

## The Specification

Your automated script must construct the exact organizational architecture required by Alliance High Command:

1. Create two directory branches in a single command using ^mkdir -p^:
   - ^rebel_base/hangar^
   - ^rebel_base/command/briefing^
2. Inside ^rebel_base/hangar^, create two starfighter files using ^touch^:
   - ^x-wing.txt^
   - ^y-wing.txt^
3. Inside ^rebel_base/command/briefing^, create the tactical briefing file:
   - ^plans.txt^
4. Change directory into ^rebel_base^ using ^cd rebel_base^.
5. Print your current location with ^pwd^.
6. List the contents of ^hangar^ using ^ls hangar^.
7. List the contents of ^command/briefing^ using ^ls command/briefing^.

## Expected Output

Your script must produce the following terminal output:

~~~
/home/student/workspace/rebel_base
x-wing.txt
y-wing.txt
plans.txt
~~~

May the Force be with you, Commander!`,
      terms: [
        { term: 'unit test', def: 'A comprehensive challenge testing all core concepts learned in the unit.' },
        { term: 'hierarchy', def: 'A structured tree of directories and files with parent-child relationships.' },
      ],
      starter: L`# Unit 1 Test: Star Wars Rebel Base Architecture
# Construct the rebel_base tree, touch the fighter files, and verify with pwd and ls

`,
      solution: L`mkdir -p rebel_base/hangar rebel_base/command/briefing
touch rebel_base/hangar/x-wing.txt rebel_base/hangar/y-wing.txt
touch rebel_base/command/briefing/plans.txt
cd rebel_base
pwd
ls hangar
ls command/briefing
`,
      hint: 'Create folders with "mkdir -p rebel_base/hangar rebel_base/command/briefing", touch files, "cd rebel_base", then "pwd", "ls hangar", "ls command/briefing".',
      tests: [
        {
          name: 'Construct Rebel Base filesystem hierarchy',
          expected: `/home/student/workspace/rebel_base
x-wing.txt
y-wing.txt
plans.txt`,
        },
      ],
    },
  ],
};
