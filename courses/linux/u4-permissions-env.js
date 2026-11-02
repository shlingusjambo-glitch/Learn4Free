// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'permissions-env',
  title: 'Permissions & Environment Variables',
  lessons: [
    {
      id: 'file-permissions',
      title: 'The Security Gate: Understanding rwx',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/file-permissions.svg',
        caption: 'Linux Permissions: rwx triad breakdown for User, Group, and Others',
      },
      setupFiles: {
        'public_notes.txt': 'Community guidelines.\n',
        'secret_vault.sh': '#!/bin/bash\necho "Vault accessed"\n',
      },
      content: L`## Concept Hook: VIP Concert Passes

At a stadium concert, not everyone has the same level of access:
- Fans with standard tickets sit in the stands (**Read** access: you can watch the show).
- The sound engineers have backstage passes (**Write** access: they can plug in cables and modify equipment).
- The lead guitarist has stage access (**Execute** access: they can run out and perform).

Linux is a multi-user operating system designed from day one to protect files from unauthorized access. Every single file has three rings of permissions: **User** (the owner), **Group** (teammates), and **Others** (the rest of the world).

## Plain English: Decoding -rwxr-xr--

When you inspect a file with ^ls -l^, the first column shows a 10-character code like ^-rwxr-xr--^:
- Character 1: File type (^^-^^ for normal file, ^^d^^ for directory).
- Characters 2-4: **User (Owner)** permissions (^rwx^ = can read, write, and execute).
- Characters 5-7: **Group** permissions (^r-x^ = can read and execute, but cannot write).
- Characters 8-10: **Others** permissions (^r--^ = can only read).

The three basic permissions are:
- **r** (Read): View the file's contents.
- **w** (Write): Modify, edit, or delete the file.
- **x** (Execute): Run the file as a program or script.

## Pop Culture & Soul

In *Harry Potter*, the Hogwarts library has a "Restricted Section" behind a locked rope. Students have read permissions in the general stacks, but only professors have execute and write permissions in the restricted wing. Permissions protect computers from accidents and hackers alike.

## Code Walkthrough

~~~
# Set standard permissions: public read-only (644), secret owner-only (600)
chmod 644 public_notes.txt
chmod 600 secret_vault.sh

# Display only the permission mask column
ls -l public_notes.txt | awk '{print $1}'
ls -l secret_vault.sh | awk '{print $1}'
~~~

- Lines 2-3: Standardizes the permission masks.
- Lines 6-7: Prints ^-rw-r--r--^ (public document) and ^-rw-------^ (locked vault file).

## Predict & Observe

What does the dash ^-^ mean in a permission slot like ^r-x^? It means that particular privilege is revoked! In ^r-x^, the write permission is absent.

## Your Task

Write a script in ^script.sh^ that:
1. Sets permissions on ^public_notes.txt^ to 644 using ^chmod 644 public_notes.txt^.
2. Sets permissions on ^secret_vault.sh^ to 600 using ^chmod 600 secret_vault.sh^.
3. Prints the permission string of ^public_notes.txt^ with ^ls -l public_notes.txt | awk '{print $1}'^.
4. Prints the permission string of ^secret_vault.sh^ with ^ls -l secret_vault.sh | awk '{print $1}'^.`,
      terms: [
        { term: 'permissions', def: 'Security rules defining who can read (r), write (w), or execute (x) a file.' },
        { term: 'user (u)', def: 'The user account that owns the file.' },
        { term: 'group (g)', def: 'A collection of users with shared access to specific files.' },
        { term: 'others (o)', def: 'All other users on the operating system.' },
        { term: 'rwx', def: 'Read (4), Write (2), Execute (1) access rights.' },
      ],
      starter: L`# Permissions Lesson 4.1: Understanding rwx
# Set permissions and inspect the permission columns

`,
      solution: L`chmod 644 public_notes.txt
chmod 600 secret_vault.sh
ls -l public_notes.txt | awk '{print $1}'
ls -l secret_vault.sh | awk '{print $1}'
`,
      hint: 'Apply chmod 644 and chmod 600, then display column 1 using awk with ls -l.',
      tests: [
        {
          name: 'Inspect decoded permission strings',
          expected: `-rw-r--r--
-rw-------`,
        },
      ],
    },
    {
      id: 'chmod-basics',
      title: 'Changing Rights: chmod',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/chmod-basics.svg',
        caption: 'Modifying Access: chmod +x enables execution, octal 755 sets standard rights',
      },
      setupFiles: {
        'launch_rocket.sh': '#!/bin/bash\necho "Rocket launched into orbit!"\n',
      },
      content: L`## Concept Hook: Gandalf on the Bridge

In *The Lord of the Rings*, Gandalf slams his staff on the stone bridge of Khazad-dûm and roars: *"You shall not pass!"*

When you write a brand-new script in Linux, the operating system intentionally creates it without execute rights. If you try to run it with ^./launch_rocket.sh^, Linux stops you cold: *Permission denied*. Linux does this to protect you from accidentally running downloaded scripts that might harm your machine.

To grant execution rights, you act as the wizard with the **chmod** command.

## Plain English: How chmod Works

^chmod^ stands for **Change Mode**. It changes the access permissions of files and folders.

There are two popular ways to use ^chmod^:
1. **Symbolic Mode**: Quick switches like ^chmod +x filename^. The ^+x^ simply adds the execute bit for everyone.
2. **Octal Numbers Mode**: Three numbers representing User, Group, and Others (where Read = 4, Write = 2, Execute = 1):
   - ^755^ = ^rwxr-xr-x^ (Owner can do everything; teammates and others can read & execute). Ideal for scripts!
   - ^644^ = ^rw-r--r--^ (Owner can read/write; others can read). Standard for text documents.
   - ^600^ = ^rw-------^ (Owner can read/write; no one else can touch). Used for private SSH keys and passwords.

## Pop Culture & Soul

Every Linux programmer remembers the first time they wrote a shell script and got hit with *Permission denied*. Typing ^chmod +x script.sh^ is like turning the ignition key in a sports car: suddenly the engine roars to life.

## Code Walkthrough

~~~
# 1. Grant execute rights to the launch script
chmod +x launch_rocket.sh

# 2. Fire the script!
./launch_rocket.sh
~~~

- Line 2: ^chmod +x launch_rocket.sh^ flips the execute flag on.
- Line 5: ^./launch_rocket.sh^ executes the script, outputting: "Rocket launched into orbit!"

## Predict & Observe

What does the leading ^./^ mean when running ^./launch_rocket.sh^? It explicitly tells Linux: *"Look in the current directory (^.^) for this script."* For security reasons, Linux never runs programs in your current directory unless you prefix them with ^./^.

## Your Task

Write a script in ^script.sh^ that:
1. Makes ^launch_rocket.sh^ executable using ^chmod +x launch_rocket.sh^.
2. Executes it using ^./launch_rocket.sh^.`,
      terms: [
        { term: 'chmod', def: 'Change Mode: command used to modify file and directory read/write/execute permissions.' },
        { term: 'chmod +x', def: 'Adds execute permission to a file so it can be run as a program.' },
        { term: '755', def: 'Octal permission: User=rwx (7), Group=r-x (5), Others=r-x (5).' },
        { term: './', def: 'Prefix telling the shell to execute a program located in the current directory.' },
      ],
      starter: L`# Permissions Lesson 4.2: chmod
# Grant execute rights to launch_rocket.sh and run it

`,
      solution: L`chmod +x launch_rocket.sh
./launch_rocket.sh
`,
      hint: 'Type "chmod +x launch_rocket.sh" followed by "./launch_rocket.sh".',
      tests: [
        {
          name: 'Enable execution and launch rocket',
          expected: `Rocket launched into orbit!`,
        },
      ],
    },
    {
      id: 'env-variables',
      title: 'Terminal Memory: Environment Variables',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/env-variables.svg',
        caption: 'Global State: Environment variables store global system configuration',
      },
      content: L`## Concept Hook: JARVIS & Iron Man Suit State

In Marvel's *Iron Man*, Tony Stark steps into his workshop and asks: *"JARVIS, what is our current power level?"* JARVIS instantly checks the global system diagnostics and responds with suit telemetry.

In Linux, **environment variables** act as the global memory of your terminal session. They hold essential facts about who you are (^$USER^), where your home is located (^$HOME^), and which directories contain runnable software (^$PATH^).

## Plain English: Variables and export

A **variable** is a named container that holds a value.
- To create a variable in bash, type its name followed immediately by an equals sign and value: ^HERO="Tony Stark"^. **Crucial rule:** In bash, you must NEVER put spaces around the ^=^ sign!
- To read the value back, prefix the name with a dollar sign: ^echo $HERO^.
- Normally, a variable only lives inside the current shell. If that shell runs another script, the child script won't know the variable exists. The ^export^ command promotes the variable to global status, sharing it with all child programs and scripts!

## Pop Culture & Soul

Every modern web app, cloud deployment, and game engine relies on environment variables for API keys and database passwords. When Netflix or NASA deploys code, they don't hardcode passwords; they inject them through exported environment variables.

## Code Walkthrough

~~~
# Define and export environment variables
export HERO="Tony Stark"
export SUIT="Mark 85"

# Print the formatted output using variable interpolation
echo "Hero: $HERO | Armor: $SUIT"
~~~

- Lines 2 & 3: Creates and exports ^HERO^ and ^SUIT^ into the shell environment.
- Line 6: ^$HERO^ and ^$SUIT^ expand to their stored text values.

## Predict & Observe

What would happen if you wrote ^HERO = "Tony Stark"^ with spaces around the equals sign? Bash would try to execute a program named ^HERO^ with arguments ^=^ and ^"Tony Stark"^, resulting in an error! Remember: zero spaces around ^=^.

## Your Task

Write a script in ^script.sh^ that:
1. Exports an environment variable named ^HERO^ set to ^"Tony Stark"^.
2. Exports an environment variable named ^SUIT^ set to ^"Mark 85"^.
3. Prints the exact string: ^Hero: $HERO | Armor: $SUIT^ using ^echo^.`,
      terms: [
        { term: 'variable', def: 'A named storage location in memory holding a text string or number.' },
        { term: '$ (dollar sign)', def: 'Prefix operator used in bash to read or expand the value of a variable.' },
        { term: 'export', def: 'Marks an environment variable to be exported to child processes and scripts.' },
        { term: '$PATH', def: 'A colon-separated list of directories where Linux looks for executable commands.' },
      ],
      starter: L`# Permissions Lesson 4.3: Environment Variables
# Export HERO and SUIT, then print them

`,
      solution: L`export HERO="Tony Stark"
export SUIT="Mark 85"
echo "Hero: $HERO | Armor: $SUIT"
`,
      hint: 'Remember: no spaces around "=" when assigning variables! Use export HERO="..." and echo.',
      tests: [
        {
          name: 'Export variables and print formatted string',
          expected: `Hero: Tony Stark | Armor: Mark 85`,
        },
      ],
    },
    {
      id: 'unit-4-test',
      title: 'Unit 4 Test: Secure Vault Script Deployment',
      language: 'bash',
      fileName: 'script.sh',
      isUnitTest: true,
      image: {
        url: '/diagrams/linux/unit-4-test.svg',
        caption: 'Unit 4 Test: Hardening SSH key permissions and deploying vault services',
      },
      setupFiles: {
        'deploy/id_rsa': '-----BEGIN OPENSSH PRIVATE KEY-----\nMIIEogIBAAKCAQEA0...\n-----END OPENSSH PRIVATE KEY-----\n',
        'deploy/run_vault.sh': '#!/bin/bash\necho "$VAULT_ENV ready on port $VAULT_PORT"\n',
      },
      content: L`## The Mission: Langley CIA Vault Hardening

**Top Secret Dispatch from Mission Commander:**

*"Our automated deployment pipeline is preparing to spin up the secure intelligence vault. However, the private encryption key ^deploy/id_rsa^ currently has insecure permissions. If SSH detects key permissions that are open to other users, it will refuse to connect! Furthermore, the deployment runner script needs execution rights and production environment variables."*

You are the Lead DevSecOps Engineer. Secure the keys, configure the runtime environment, and launch the vault!

## The Specification

Write an automated deployment hardening script in ^script.sh^ that:

1. Locks down the private key ^deploy/id_rsa^ so only the owner can read and write it (^chmod 600 deploy/id_rsa^).
2. Grants read, write, and execute permissions to the owner, and read and execute to others on ^deploy/run_vault.sh^ (^chmod 755 deploy/run_vault.sh^).
3. Sets and exports the environment variable ^VAULT_ENV="production"^.
4. Sets and exports the environment variable ^VAULT_PORT="8443"^.
5. Executes the vault launcher: ^./deploy/run_vault.sh^.
6. Verifies the hardened permissions of ^deploy/id_rsa^ by printing column 1 of ^ls -l^:
   ^ls -l deploy/id_rsa | awk '{print $1}'^.

## Expected Output

Your script must produce the following deployment output:

~~~
production ready on port 8443
-rw-------
~~~

Deploy the vault and secure the intelligence network!`,
      terms: [
        { term: 'devsecops', def: 'Development, Security, and Operations: integrating security practices into automation.' },
        { term: '600', def: 'Octal permission: User read/write (rw-------); required for private keys.' },
        { term: 'interpolation', def: 'Substituting variable names with their values inside strings (e.g. $VAULT_ENV).' },
      ],
      starter: L`# Unit 4 Test: Secure Vault Script Deployment
# Harden id_rsa (600), enable run_vault.sh (755), export env vars, execute, and verify

`,
      solution: L`chmod 600 deploy/id_rsa
chmod 755 deploy/run_vault.sh
export VAULT_ENV="production"
export VAULT_PORT="8443"
./deploy/run_vault.sh
ls -l deploy/id_rsa | awk '{print $1}'
`,
      hint: 'Apply chmod 600 to id_rsa, chmod 755 to run_vault.sh, export VAULT_ENV and VAULT_PORT, run ./deploy/run_vault.sh, then check permissions with awk.',
      tests: [
        {
          name: 'Harden permissions and execute vault deployment',
          expected: `production ready on port 8443
-rw-------`,
        },
      ],
    },
  ],
};
