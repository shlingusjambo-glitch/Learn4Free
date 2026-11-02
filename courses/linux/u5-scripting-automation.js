// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'scripting-automation',
  title: 'Bash Scripting & Automation (Capstone)',
  lessons: [
    {
      id: 'bash-args',
      title: 'Passing Parameters: Positional Arguments $1, $2, $#',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/bash-args.svg',
        caption: 'Positional Arguments: Map incoming command flags to $1, $2, and argument count $#',
      },
      content: L`## Concept Hook: The Doctor's TARDIS Coordinates

In *Doctor Who*, whenever the Doctor steps up to the TARDIS flight console, they don't rebuild the ship from scratch for every journey. They dial in variable coordinates: **Destination Planet**, **Time Period**, and **Dimension**. The TARDIS takes those inputs and propels the vessel into the time vortex.

In Bash scripts, **positional arguments** allow your scripts to become reusable automated machines. Instead of hardcoding values inside your code, you pass parameters when running the command:
^./travel.sh "Gallifrey" "2026"^

## Plain English: How Positional Arguments Work

When a bash script or function is executed with words after its name, bash automatically assigns each word to a numbered variable:
- ^$0^ is the name of the script itself.
- ^$1^ is the **first argument** passed.
- ^$2^ is the **second argument** passed.
- ^$3^, ^$4^, etc., capture further arguments.
- ^$#^ is the **count** of how many total arguments were supplied.
- ^$@^ represents all arguments together as a list.

In bash, you can also use the ^set --^ command to simulate or assign positional arguments directly inside a script!

## Pop Culture & Soul

Imagine an undercover spy network like the Avengers or the Kingsman. When an agent reports in, you don't rewrite headquarters software; you pass their assigned role and codename as parameters:
^Agent count: 2^
^Welcome, Agent Falcon! Assigned role: Recon.^

## Code Walkthrough

~~~
# Set the first mission parameters: $1="Recon", $2="Falcon"
set -- "Recon" "Falcon"
echo "Agent count: $#"
echo "Welcome, Agent $2! Assigned role: $1."

# Reassign for a second mission: $1="Infiltration", $2="Shadow"
set -- "Infiltration" "Shadow"
echo "Agent count: $#"
echo "Welcome, Agent $2! Assigned role: $1."
~~~

- Lines 2 & 7: ^set --^ sets the positional parameters ^$1^ and ^$2^.
- Lines 3 & 8: ^$#^ evaluates to ^2^ (two arguments passed).
- Lines 4 & 9: ^$2^ prints the agent name, and ^$1^ prints the role.

## Predict & Observe

What would happen if you printed ^$3^ when only two arguments were set? In bash, referencing an unset positional argument evaluates safely to an empty string ("") without throwing an error.

## Your Task

Write a script in ^script.sh^ that:
1. Sets positional arguments to ^"Recon"^ and ^"Falcon"^ using ^set -- "Recon" "Falcon"^.
2. Prints ^"Agent count: $#"^ using ^echo^.
3. Prints ^"Welcome, Agent $2! Assigned role: $1."^ using ^echo^.
4. Sets positional arguments to ^"Infiltration"^ and ^"Shadow"^ using ^set -- "Infiltration" "Shadow"^.
5. Prints ^"Agent count: $#"^ using ^echo^.
6. Prints ^"Welcome, Agent $2! Assigned role: $1."^ using ^echo^.`,
      terms: [
        { term: 'positional argument', def: 'A parameter passed to a script or function, accessed via $1, $2, etc.' },
        { term: '$1, $2', def: 'The first and second command-line arguments provided to the script.' },
        { term: '$#', def: 'Special variable containing the total number of positional arguments.' },
        { term: '$0', def: 'Special variable containing the name of the script being executed.' },
      ],
      starter: L`# Scripting Lesson 5.1: Positional Arguments
# Use set -- to assign parameters and print formatted agent greetings

`,
      solution: L`set -- "Recon" "Falcon"
echo "Agent count: $#"
echo "Welcome, Agent $2! Assigned role: $1."

set -- "Infiltration" "Shadow"
echo "Agent count: $#"
echo "Welcome, Agent $2! Assigned role: $1."
`,
      hint: 'Use "set -- \\"Recon\\" \\"Falcon\\"", echo agent count and welcome with $2 and $1, then repeat for Shadow.',
      tests: [
        {
          name: 'Handle positional arguments $1, $2, and $#',
          expected: `Agent count: 2
Welcome, Agent Falcon! Assigned role: Recon.
Agent count: 2
Welcome, Agent Shadow! Assigned role: Infiltration.`,
        },
      ],
    },
    {
      id: 'bash-conditionals',
      title: 'Making Decisions: if, then, else',
      language: 'bash',
      fileName: 'script.sh',
      image: {
        url: '/diagrams/linux/bash-conditionals.svg',
        caption: 'Conditional Logic: if [ condition ]; then ... else ... fi with test operators',
      },
      setupFiles: {
        'telemetry/sensor.dat': 'Temperature: 45C\nPressure: 101.3 kPa\n',
      },
      content: L`## Concept Hook: The Matrix Red Pill or Blue Pill

In *The Matrix*, Morpheus stands before Neo with two open palms:
*"You take the blue pill—the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill—you stay in Wonderland, and I show you how deep the rabbit hole goes."*

A computer script becomes genuinely intelligent the moment it can evaluate conditions and choose different paths. In Bash, you make decisions using the **if / then / else** construct.

## Plain English: How Bash Conditionals Work

The anatomy of a bash conditional looks like this:

~~~
if [ condition ]; then
    # commands if true
else
    # commands if false
fi
~~~

Notice two crucial syntax rules that catch every beginner:
1. **The spaces inside brackets are MANDATORY!** You must write ^[ condition ]^ with a space after ^[^ and before ^]^. If you write ^[condition]^, bash will crash!
2. Every ^if^ block must conclude with **fi** (^if^ spelled backwards).

Common test operators inside brackets:
- ^-f "$file"^ tests if a regular file exists on disk.
- ^! -f "$file"^ tests if a file DOES NOT exist.
- ^-d "$dir"^ tests if a directory exists.
- ^-z "$str"^ tests if a text string is empty (length 0).
- ^"$a" = "$b"^ tests if two strings are identical.

## Pop Culture & Soul

Automated server backup systems, space probes, and cybersecurity monitors run thousands of these checks every minute. If disk space is low, trigger an alarm; if backup files are missing, alert the on-call engineer.

## Code Walkthrough

~~~
# Check if the primary sensor file exists
if [ -f "telemetry/sensor.dat" ]; then
    echo "Sensor data found: reading telemetry"
    cat telemetry/sensor.dat
else
    echo "Sensor data missing!"
fi

# Check if the backup file is missing
if [ ! -f "telemetry/backup.dat" ]; then
    echo "Warning: Backup missing"
fi
~~~

- Line 2: ^[ -f "telemetry/sensor.dat" ]^ checks if the file exists. Because it does, lines 3-4 run.
- Line 10: ^[ ! -f "telemetry/backup.dat" ]^ checks if the backup is missing. Because it is absent, line 11 executes.

## Predict & Observe

What would happen if you removed the space after ^[^, writing ^if [-f "file"];^? Bash would attempt to execute a non-existent command named ^[-f^ and fail. Always leave breathing room around brackets!

## Your Task

Write a script in ^script.sh^ that:
1. Checks if ^telemetry/sensor.dat^ exists using ^if [ -f "telemetry/sensor.dat" ]; then^.
   - If it exists, prints ^"Sensor data found: reading telemetry"^ and outputs the file with ^cat telemetry/sensor.dat^.
   - Otherwise, prints ^"Sensor data missing!"^.
2. Checks if ^telemetry/backup.dat^ is missing using ^if [ ! -f "telemetry/backup.dat" ]; then^.
   - If missing, prints ^"Warning: Backup missing"^.`,
      terms: [
        { term: 'if / then / else', def: 'Conditional statement in bash that executes code blocks based on whether a test succeeds.' },
        { term: 'fi', def: 'Keyword that closes an if statement block in bash (if backwards).' },
        { term: '-f', def: 'Test operator that checks if a specified path exists and is a regular file.' },
        { term: '!', def: 'Logical NOT operator; inverts the condition (true becomes false, false becomes true).' },
      ],
      starter: L`# Scripting Lesson 5.2: Conditionals
# Test if sensor.dat exists, and warn if backup.dat is missing

`,
      solution: L`if [ -f "telemetry/sensor.dat" ]; then
    echo "Sensor data found: reading telemetry"
    cat telemetry/sensor.dat
else
    echo "Sensor data missing!"
fi

if [ ! -f "telemetry/backup.dat" ]; then
    echo "Warning: Backup missing"
fi
`,
      hint: 'Remember spaces inside brackets: "if [ -f \\"telemetry/sensor.dat\\" ]; then". Close each if with "fi".',
      tests: [
        {
          name: 'Evaluate sensor file existence and backup status',
          expected: `Sensor data found: reading telemetry
Temperature: 45C
Pressure: 101.3 kPa
Warning: Backup missing`,
        },
      ],
    },
    {
      id: 'unit-5-test',
      title: 'Unit 5 Capstone Test: NASA Space Mission Pre-Flight Health Check',
      language: 'bash',
      fileName: 'script.sh',
      isUnitTest: true,
      image: {
        url: '/diagrams/linux/unit-5-test.svg',
        caption: 'Unit 5 Capstone: NASA Cape Canaveral Automated Launch Health Check',
      },
      setupFiles: {
        'systems/oxygen.ok': 'Oxygen status: 100% nominal\n',
        'systems/fuel.ok': 'Liquid hydrogen and oxygen tanks full\n',
        'logs/checklist.txt': 'Guidance computer online\nComms array aligned\nThermal shields armed\n',
      },
      content: L`## The Mission: Apollo Launch Countdown

**Priority Broadcast from Launch Control Center, Cape Canaveral:**

*"Flight Directors, this is Launch Control. The countdown has halted at T-minus 30 seconds for the automated Pre-Flight Readiness Poll. Before the Flight Director can give the final GO for launch, our automated shell script must verify life support oxygen reserves, confirm propulsion fuel pressure, count verified checklist items, lock down the flight manifest, and clear the spacecraft for orbital insertion!"*

You are NASA's Chief Flight Software Engineer. This is the ultimate capstone of your Linux command line journey.

## The Specification

Write an end-to-end automated pre-flight health check script in ^script.sh^ that executes the following sequence:

1. Test if **both** ^systems/oxygen.ok^ and ^systems/fuel.ok^ exist using conditional testing:
   - If both exist, print: ^Propulsion & Life Support: GO^
   - Otherwise, print: ^Propulsion & Life Support: NO-GO^
2. Count the number of verified items in ^logs/checklist.txt^ using ^wc -l < logs/checklist.txt^, and print:
   ^Checklist items verified: <count>^
3. Create an official flight manifest file named ^flight_manifest.log^:
   - Write ^MISSION=APOLLO_L4F^ using overwrite ^>^.
   - Append ^STATUS=FLIGHT_READY^ using append ^>>^.
4. Secure the flight manifest against accidental edits by making it read-only (^chmod 444 flight_manifest.log^).
5. Verify that ^flight_manifest.log^ exists on disk using ^if [ -f "flight_manifest.log" ]; then^:
   - Print: ^Flight manifest secured: READY^
6. Output the final launch clearance:
   ^Pre-flight check complete. Ready for launch.^

## Expected Output

Your script must produce the following pre-flight telemetry:

~~~
Propulsion & Life Support: GO
Checklist items verified: 3
Flight manifest secured: READY
Pre-flight check complete. Ready for launch.
~~~

All systems are green. Ignite the Saturn V engines and soar into the cosmos!`,
      terms: [
        { term: 'capstone', def: 'The culminating project demonstrating mastery of all skills acquired across the curriculum.' },
        { term: 'chmod 444', def: 'Sets read-only permissions for User, Group, and Others (r--r--r--).' },
        { term: 'command substitution', def: '$(command): executes a command and inserts its output text directly into the string.' },
      ],
      starter: L`# Unit 5 Capstone: NASA Space Mission Pre-Flight Health Check
# Verify oxygen & fuel, count checklist items, generate and lock manifest, and issue launch GO

`,
      solution: L`if [ -f "systems/oxygen.ok" ] && [ -f "systems/fuel.ok" ]; then
    echo "Propulsion & Life Support: GO"
else
    echo "Propulsion & Life Support: NO-GO"
fi

echo "Checklist items verified: $(wc -l < logs/checklist.txt)"

echo "MISSION=APOLLO_L4F" > flight_manifest.log
echo "STATUS=FLIGHT_READY" >> flight_manifest.log
chmod 444 flight_manifest.log

if [ -f "flight_manifest.log" ]; then
    echo "Flight manifest secured: READY"
fi

echo "Pre-flight check complete. Ready for launch."
`,
      hint: 'Check both files with "&&", count lines with "$(wc -l < logs/checklist.txt)", write/append to manifest, chmod 444, test file with if, and echo final message.',
      tests: [
        {
          name: 'Perform NASA automated pre-flight health check',
          expected: `Propulsion & Life Support: GO
Checklist items verified: 3
Flight manifest secured: READY
Pre-flight check complete. Ready for launch.`,
        },
      ],
    },
  ],
};
