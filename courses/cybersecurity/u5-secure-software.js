// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'secure-software',
  title: 'Secure Software & Defensive Engineering',
  lessons: [
    {
      id: 'buffer-overflow-defense',
      title: 'Buffer Overflow & Safe Memory Boundaries',
      fileName: 'security.py',
      image: {
        url: '/diagrams/cybersecurity/buffer-overflow-defense.svg',
        caption: 'Buffer Overflow: Pouring 16 bytes into an 8-byte buffer overwrites adjacent memory and the instruction return pointer. Bounds checking prevents memory corruption.'
      },
      content: L`## Pouring Coffee into an 8-Ounce Mug

Imagine holding an 8-ounce ceramic coffee mug. You tilt a 16-ounce glass carafe and pour continuously. 

What happens? The coffee reaches the brim, spills over the ceramic edges, puddles across your desk, and ruins your expensive laptop.

In computer systems programming (such as C, C++, or assembly), a **buffer** is a contiguous block of reserved memory—like that 8-ounce mug. When a program reads network input or user input into a buffer using unsafe functions (such as ^gets()^ or ^strcpy()^) without checking the length, excess bytes spill over into neighboring memory locations.

## The Return Instruction Pointer Hijack

Why is a buffer overflow so devastating?
On the computer's execution stack, right next to your local buffer sits the **Return Instruction Pointer (EIP/RIP)**. The return pointer tells the CPU what line of code to execute next when a function finishes.

When an attacker sends an oversized payload, the spillover overwrites the return pointer with their own address! When the function returns, instead of continuing normal execution, the CPU jumps directly into the attacker's injected **shellcode**, giving the attacker full remote control of the machine.

## Pop Culture: The Morris Worm (1988)

On the evening of November 2, 1988, Cornell graduate student Robert Tappan Morris released a program intended to gauge the size of the internet. The worm exploited an unvalidated buffer in the UNIX ^fingerd^ service (which used the dangerous C function ^gets()^ without bounds checking). 

Because of a coding mistake, the worm infected computers multiple times, overloading machines across NASA, MIT, Stanford, and the Pentagon. It crashed approximately 10% of the entire global internet—all caused by a missing buffer boundary check!

## Defensive Bounds Checking

In defensive software engineering, you must enforce strict boundary checks before any byte write occurs. If an incoming payload exceeds capacity, the system must immediately reject the operation and record a security incident.

## Your Task

Implement ^class SafeMemoryBuffer^ in ^security.py^:
- ^__init__(capacity: int)^:
  - Stores ^self.capacity = capacity^.
  - Initializes ^self.buffer = b""^.
- ^write(data: bytes) -> tuple[bool, str]^:
  - If ^len(data) > self.capacity^:
    - Do NOT modify ^self.buffer^!
    - Return: ^(False, f"BUFFER_OVERFLOW_BLOCKED: {len(data)}B exceeds {self.capacity}B")^
  - If ^len(data) <= self.capacity^:
    - Sets ^self.buffer = data^.
    - Return: ^(True, f"SUCCESS: {len(data)}B written safely")^
- ^read() -> bytes^:
  - Returns ^self.buffer^.`,
      terms: [
        { term: 'buffer', def: 'A contiguous region of physical memory used to hold data while it is being moved from one place to another.' },
        { term: 'buffer overflow', def: 'An anomaly where a program, while writing data to a buffer, overruns the boundary and overwrites adjacent memory.' },
        { term: 'instruction pointer', def: 'A CPU register that points to the next memory address of instructions to be executed.' },
        { term: 'shellcode', def: 'A small piece of code used as the payload in the exploitation of a software vulnerability.' },
        { term: 'bounds checking', def: 'A defensive programming practice that tests whether an index or size is within legal boundaries before accessing memory.' }
      ],
      starter: L`class SafeMemoryBuffer:
    def __init__(self, capacity: int):
        # TODO: Initialize capacity and internal storage
        pass

    def write(self, data: bytes) -> tuple[bool, str]:
        # TODO: Check bounds. Reject if oversized; otherwise store and return success.
        return False, ""

    def read() -> bytes:
        # TODO: Return stored bytes
        return b""
`,
      solution: L`class SafeMemoryBuffer:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.buffer = b""

    def write(self, data: bytes) -> tuple[bool, str]:
        if len(data) > self.capacity:
            return False, f"BUFFER_OVERFLOW_BLOCKED: {len(data)}B exceeds {self.capacity}B"
        self.buffer = data
        return True, f"SUCCESS: {len(data)}B written safely"

    def read(self) -> bytes:
        return self.buffer
`,
      harness: L`if __name__ == '__main__':
    buf = SafeMemoryBuffer(capacity=8)
    ops = [
        b"HELLO",       # 5 bytes (fits)
        b"OVERFLOW_12345", # 14 bytes (exceeds 8)
        b"SAFE_OK!"     # 8 bytes (fits)
    ]
    for data in ops:
        ok, msg = buf.write(data)
        print(f"Write {data.decode()}: {ok} | {msg}")
    print(f"Final Buffer Content: {buf.read().decode()}")
`,
      hint: 'If len(data) > self.capacity, return False and the exact error string. Do not alter self.buffer.',
      tests: [
        {
          name: 'Safe Memory Boundary Verification',
          stdin: '',
          expected: "Write HELLO: True | SUCCESS: 5B written safely\nWrite OVERFLOW_12345: False | BUFFER_OVERFLOW_BLOCKED: 14B exceeds 8B\nWrite SAFE_OK!: True | SUCCESS: 8B written safely\nFinal Buffer Content: SAFE_OK!"
        }
      ]
    },

    {
      id: 'least-privilege',
      title: 'Principle of Least Privilege & Role-Based Access Control',
      fileName: 'security.py',
      image: {
        url: '/diagrams/cybersecurity/least-privilege.svg',
        caption: 'The Principle of Least Privilege (PoLP): Users and services are granted only the minimum permissions necessary to perform their legitimate roles.'
      },
      content: L`## The Hotel Keycard & The Master Key

When you check into a hotel, the front desk gives you a magnetic plastic keycard. That keycard opens the door to room 304 and unlocks the fitness center door. 

Does that keycard open the manager's office? No. Does it open the security camera server room? No. Does it unlock room 305 next door? No!

If the hotel gave every single guest a master skeleton key that unlocked every door in the building, a single lost card would endanger every guest's life and property.

This is the **Principle of Least Privilege (PoLP)**:
> *"Every program, process, and user of the system should operate using the least set of privileges necessary to complete the job."*

## Role-Based Access Control (RBAC)

In modern cybersecurity architectures, we implement least privilege using **Role-Based Access Control (RBAC)**:
- **GUEST**: Can only read public announcements.
- **OPERATOR**: Can read logs, write telemetry, and view telemetry metrics.
- **ADMIN**: Can manage users, reboot servers, and deploy code updates.

By locking down permissions by default, even if an attacker compromises a service or account running with a lower role, they cannot immediately compromise the entire infrastructure.

## Pop Culture: Jurassic Park & Dennis Nedry

In Steven Spielberg's *Jurassic Park*, lead programmer Dennis Nedry (Wayne Knight) had unchecked, monopolistic superuser access over the island's entire computer network. Because the park had no segregation of duties or least privilege enforcement, Nedry was able to deactivate the electric fences, kill the phone lines, and lock the park's chief engineer out of the system:
*"Ah ah ah! You didn't say the magic word!"*

Had John Hammond implemented least privilege, a single developer could never have taken down the physical safety systems of the dinosaur enclosures!

## Your Task

Implement ^class RoleAccessControl^ in ^security.py^:
- Roles & allowed permission sets:
  - ^"GUEST"^: ^{"read_public"}^
  - ^"OPERATOR"^: ^{"read_public", "read_logs", "write_telemetry"}^
  - ^"ADMIN"^: ^{"read_public", "read_logs", "write_telemetry", "reboot_system", "manage_roles"}^
- Method ^authorize(user_role: str, action: str) -> tuple[bool, str]^:
  - If ^user_role^ is not in the recognized roles:
    - Return: ^(False, f"DENIED: Unknown role {user_role}")^
  - If ^action^ is permitted for ^user_role^:
    - Return: ^(True, f"GRANTED: {action} permitted for {user_role}")^
  - Otherwise:
    - Return: ^(False, f"DENIED: {action} requires higher privilege than {user_role}")^`,
      terms: [
        { term: 'Principle of Least Privilege (PoLP)', def: 'The practice of limiting access rights for users to the bare minimum permissions needed to perform their work.' },
        { term: 'Role-Based Access Control (RBAC)', def: 'An approach to restricting system access to authorized users based on their assigned organizational roles.' },
        { term: 'privilege escalation', def: 'An attack technique where a threat actor exploits a bug or configuration error to gain higher access levels than authorized.' }
      ],
      starter: L`class RoleAccessControl:
    # TODO: Define roles and permissions
    def authorize(self, user_role: str, action: str) -> tuple[bool, str]:
        # TODO: Check role existence and permission membership
        return False, ""
`,
      solution: L`class RoleAccessControl:
    ROLES = {
        "GUEST": {"read_public"},
        "OPERATOR": {"read_public", "read_logs", "write_telemetry"},
        "ADMIN": {"read_public", "read_logs", "write_telemetry", "reboot_system", "manage_roles"}
    }

    def authorize(self, user_role: str, action: str) -> tuple[bool, str]:
        if user_role not in self.ROLES:
            return False, f"DENIED: Unknown role {user_role}"
        if action in self.ROLES[user_role]:
            return True, f"GRANTED: {action} permitted for {user_role}"
        return False, f"DENIED: {action} requires higher privilege than {user_role}"
`,
      harness: L`if __name__ == '__main__':
    rbac = RoleAccessControl()
    checks = [
        ("GUEST", "read_public"),
        ("GUEST", "reboot_system"),
        ("OPERATOR", "write_telemetry"),
        ("OPERATOR", "manage_roles"),
        ("ADMIN", "reboot_system"),
        ("HACKER", "read_public")
    ]
    for role, act in checks:
        ok, msg = rbac.authorize(role, act)
        print(f"Auth({role}, {act}): {ok} | {msg}")
`,
      hint: 'Check if user_role in self.ROLES. Then check if action in self.ROLES[user_role].',
      tests: [
        {
          name: 'RBAC Access Authorization Matrix',
          stdin: '',
          expected: "Auth(GUEST, read_public): True | GRANTED: read_public permitted for GUEST\nAuth(GUEST, reboot_system): False | DENIED: reboot_system requires higher privilege than GUEST\nAuth(OPERATOR, write_telemetry): True | GRANTED: write_telemetry permitted for OPERATOR\nAuth(OPERATOR, manage_roles): False | DENIED: manage_roles requires higher privilege than OPERATOR\nAuth(ADMIN, reboot_system): True | GRANTED: reboot_system permitted for ADMIN\nAuth(HACKER, read_public): False | DENIED: Unknown role HACKER"
        }
      ]
    },

    {
      id: 'unit-5-test',
      title: 'Unit 5 Capstone: Autonomous Satellite Defense Shield',
      fileName: 'security.py',
      isUnitTest: true,
      image: {
        url: '/diagrams/cybersecurity/unit-5-test.svg',
        caption: 'The Aegis-1 Orbital Satellite Defense Shield: integrates C2 blacklists, role authorization, buffer limits, and SHA-256 cryptographic packet signing.'
      },
      content: L`## Mission Briefing: Orbital Defense Satellite Aegis-1

The autonomous orbital defense satellite **Aegis-1** travels in low Earth orbit at 17,500 mph. It communicates with international ground telemetry stations via radio frequencies. 

Rogue nation-state threat actors are attempting to hijack the satellite's orbital thrusters. They are sending forged packets across ground stations, attempting buffer overflows on packet telemetry buffers, and forging authentication signatures.

You are the Lead Cybersecurity Flight Director. Your capstone mission: implement the complete ^SatelliteDefenseShield^ packet validation engine to protect the satellite from being hijacked!

## Pop Culture: GoldenEye & Interstellar

In the James Bond thriller *GoldenEye*, rogue agents hijack the Soviet GoldenEye space weapon by compromising ground terminal authorization keys. In *Interstellar*, the robotic co-pilot TARS refuses to obey commands that violate security parameter constraints.

Aegis-1 requires uncompromising, multi-layer defensive verification.

## The 5-Stage Defense Shield Pipeline

Every received packet is a dictionary:
^{ "station_id": str, "role": str, "command": str, "payload": str, "auth_hash": str }^

Your shield must enforce five sequential checkpoints:

1. **Check 1: Blacklist Verification**:
   If ^station_id in {"ROGUE_STATION_9", "UNKNOWN_SAT_X"}^:
   - Return: ^{ "status": "DROPPED", "reason": "BLACKLISTED_STATION" }^

2. **Check 2: Role-Based Access Control (RBAC)**:
   Authorized commands per role:
   - ^"ANALYST"^: ^{"GET_TELEMETRY", "PING"}^
   - ^"ENGINEER"^: ^{"GET_TELEMETRY", "PING", "ADJUST_SOLAR_PANELS"}^
   - ^"COMMANDER"^: ^{"GET_TELEMETRY", "PING", "ADJUST_SOLAR_PANELS", "ORBITAL_BURN", "DEPLOY_PAYLOAD"}^
   If ^role^ is unrecognized or ^command^ is not in that role's permissions:
   - Return: ^{ "status": "DROPPED", "reason": "UNAUTHORIZED_ROLE_COMMAND" }^

3. **Check 3: Buffer Overflow Defense**:
   Payloads are stored in a fixed 32-byte hardware register.
   If ^len(payload.encode('utf-8')) > 32^:
   - Return: ^{ "status": "DROPPED", "reason": "BUFFER_OVERFLOW_ATTEMPT" }^

4. **Check 4: Cryptographic Authenticity**:
   Satellite secret key: ^SECRET_KEY = "AEGIS_TOP_SECRET_SALT_2026"^
   Calculate expected hash:
   ^expected_hash = hashlib.sha256(f"{station_id}:{command}:{payload}:{SECRET_KEY}".encode('utf-8')).hexdigest()^
   If ^auth_hash != expected_hash^:
   - Return: ^{ "status": "DROPPED", "reason": "INVALID_AUTH_HASH" }^

5. **Check 5: Command Execution**:
   If all four defensive checks pass:
   - Return: ^{ "status": "EXECUTED", "station_id": station_id, "command": command, "payload": payload }^

## Your Task

Implement ^class SatelliteDefenseShield^ in ^security.py^ with method ^process_command_packet(packet: dict) -> dict^.`,
      terms: [
        { term: 'cryptographic signature', def: 'A mathematical mechanism that proves the authenticity and integrity of a digital message or command.' },
        { term: 'defense-in-depth', def: 'An information assurance strategy integrating multiple layers of defense throughout an IT system.' },
        { term: 'HMAC / signed digest', def: 'A specific type of message authentication code involving a cryptographic hash function and a secret key.' },
        { term: 'secure architecture', def: 'A system design where defensive mechanisms fail safely and grant zero trust to incoming input.' }
      ],
      starter: L`import hashlib

SECRET_KEY = "AEGIS_TOP_SECRET_SALT_2026"

class SatelliteDefenseShield:
    def process_command_packet(self, packet: dict) -> dict:
        # TODO: Implement 5-stage verification (Blacklist, RBAC, Buffer Check, SHA-256 Hash, Execute)
        return {"status": "DROPPED"}
`,
      solution: L`import hashlib

SECRET_KEY = "AEGIS_TOP_SECRET_SALT_2026"

class SatelliteDefenseShield:
    BLACKLIST = {"ROGUE_STATION_9", "UNKNOWN_SAT_X"}
    ROLES = {
        "ANALYST": {"GET_TELEMETRY", "PING"},
        "ENGINEER": {"GET_TELEMETRY", "PING", "ADJUST_SOLAR_PANELS"},
        "COMMANDER": {"GET_TELEMETRY", "PING", "ADJUST_SOLAR_PANELS", "ORBITAL_BURN", "DEPLOY_PAYLOAD"}
    }
    MAX_PAYLOAD_BYTES = 32

    def process_command_packet(self, packet: dict) -> dict:
        sid = packet.get("station_id", "")
        role = packet.get("role", "")
        cmd = packet.get("command", "")
        payload = packet.get("payload", "")
        auth_hash = packet.get("auth_hash", "")

        # 1. Blacklist check
        if sid in self.BLACKLIST:
            return {"status": "DROPPED", "reason": "BLACKLISTED_STATION"}

        # 2. RBAC check
        allowed = self.ROLES.get(role, set())
        if cmd not in allowed:
            return {"status": "DROPPED", "reason": "UNAUTHORIZED_ROLE_COMMAND"}

        # 3. Buffer Bounds check
        if len(payload.encode("utf-8")) > self.MAX_PAYLOAD_BYTES:
            return {"status": "DROPPED", "reason": "BUFFER_OVERFLOW_ATTEMPT"}

        # 4. Hash Integrity check
        raw = f"{sid}:{cmd}:{payload}:{SECRET_KEY}".encode("utf-8")
        expected_hash = hashlib.sha256(raw).hexdigest()
        if auth_hash != expected_hash:
            return {"status": "DROPPED", "reason": "INVALID_AUTH_HASH"}

        # 5. Execution
        return {"status": "EXECUTED", "station_id": sid, "command": cmd, "payload": payload}
`,
      harness: L`if __name__ == '__main__':
    shield = SatelliteDefenseShield()
    
    def mk_hash(sid, cmd, payload):
        import hashlib
        return hashlib.sha256(f"{sid}:{cmd}:{payload}:AEGIS_TOP_SECRET_SALT_2026".encode('utf-8')).hexdigest()

    test_packets = [
        # 1. Valid Commander Burn
        {
            "station_id": "NASA_HOUSTON",
            "role": "COMMANDER",
            "command": "ORBITAL_BURN",
            "payload": "THRUSTER_A:5SEC",
            "auth_hash": mk_hash("NASA_HOUSTON", "ORBITAL_BURN", "THRUSTER_A:5SEC")
        },
        # 2. Rogue Blacklisted Station
        {
            "station_id": "ROGUE_STATION_9",
            "role": "ANALYST",
            "command": "PING",
            "payload": "HELLO",
            "auth_hash": mk_hash("ROGUE_STATION_9", "PING", "HELLO")
        },
        # 3. Privilege Escalation Attempt (Analyst trying Commander command)
        {
            "station_id": "ESA_DARMSTADT",
            "role": "ANALYST",
            "command": "ORBITAL_BURN",
            "payload": "THRUSTER_A:5SEC",
            "auth_hash": mk_hash("ESA_DARMSTADT", "ORBITAL_BURN", "THRUSTER_A:5SEC")
        },
        # 4. Buffer Overflow Attempt
        {
            "station_id": "NASA_HOUSTON",
            "role": "COMMANDER",
            "command": "ORBITAL_BURN",
            "payload": "A" * 64,
            "auth_hash": mk_hash("NASA_HOUSTON", "ORBITAL_BURN", "A" * 64)
        },
        # 5. Forged Tampered Hash
        {
            "station_id": "NASA_HOUSTON",
            "role": "COMMANDER",
            "command": "ORBITAL_BURN",
            "payload": "THRUSTER_A:5SEC",
            "auth_hash": "bad_forged_signature_hash_hex"
        }
    ]

    for p in test_packets:
        res = shield.process_command_packet(p)
        print(f"Packet from {p['station_id']} [{p['command']}]: {res['status']} | {res.get('reason', res.get('command'))}")
`,
      hint: 'Run the 5 checks in order: Blacklist -> RBAC -> Buffer len <= 32 -> SHA-256 hash match -> Return EXECUTED.',
      tests: [
        {
          name: 'Satellite Defense Shield Verification Suite',
          stdin: '',
          expected: "Packet from NASA_HOUSTON [ORBITAL_BURN]: EXECUTED | ORBITAL_BURN\nPacket from ROGUE_STATION_9 [PING]: DROPPED | BLACKLISTED_STATION\nPacket from ESA_DARMSTADT [ORBITAL_BURN]: DROPPED | UNAUTHORIZED_ROLE_COMMAND\nPacket from NASA_HOUSTON [ORBITAL_BURN]: DROPPED | BUFFER_OVERFLOW_ATTEMPT\nPacket from NASA_HOUSTON [ORBITAL_BURN]: DROPPED | INVALID_AUTH_HASH"
        }
      ]
    }
  ]
};
