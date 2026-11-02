// Learn4Free - free and open source programming education
// Copyright (C) 2026 Learn4Free contributors
// SPDX-License-Identifier: GPL-2.0-only
'use strict';

const L = String.raw;

module.exports = {
  id: 'network-security',
  title: 'Network Security & Traffic Analysis',
  lessons: [
    {
      id: 'ip-port-basics',
      title: 'IP Addresses, Ports & Network Services',
      fileName: 'security.py',
      image: {
        url: '/diagrams/cybersecurity/ip-port-basics.svg',
        caption: 'An IP address identifies the host building. Port numbers identify specific entrance doors for services (Port 22 SSH, Port 80 HTTP, Port 443 HTTPS).'
      },
      content: L`## The Airport Gate & Apartment Analogy

Think of an **IP Address** (Internet Protocol) like the street address of a large international airport terminal. When an airplane flies toward the airport, air traffic control routes it to that specific GPS destination.

Once the airplane lands at the terminal, where do the passengers get off? They dock at a numbered gate! 
- **Gate 80**: The open public lobby (HTTP cleartext web).
- **Gate 443**: The secure international customs checkpoint (HTTPS encrypted web).
- **Gate 22**: The locked maintenance door for pilots and mechanics (SSH remote shell).
- **Gate 53**: The airport directory and timetable board (DNS domain lookup).

These numbered gates are **Ports**! While an IP address routes traffic to the correct computer, the port number routes traffic to the specific software program running on that computer.

## Private vs. Public IP Addresses

Certain IP address ranges are reserved for internal home or corporate Local Area Networks (LANs). These addresses are never routed directly over the public internet:
- ^127.0.0.1^: Localhost (your own machine)
- ^10.0.0.0^ - ^10.255.255.255^: Class A Private LAN
- ^172.16.0.0^ - ^172.31.255.255^: Class B Private LAN
- ^192.168.0.0^ - ^192.168.255.255^: Class C Private LAN (most home Wi-Fi routers)

Any IP outside these ranges is a **Public IP**.

## Port Classification & Security Risk

Port numbers range from 0 to 65,535:
- **0 - 1,023**: Well-Known Ports (assigned to standard protocols like HTTP, SSH, FTP).
- **1,024 - 49,151**: Registered Ports (used by database servers and custom applications).
- **49,152 - 65,535**: Dynamic / Ephemeral Ports (temporary client ports).

Leaving cleartext services (like FTP on port 21 or HTTP on port 80) open on a public IP allows attackers to sniff passwords in transit. Leaving a database port (like MySQL on port 3306) directly accessible to the public internet is a critical security vulnerability.

## Pop Culture: WarGames & Wardialing

In the 1983 cybersecurity movie *WarGames*, high school hacker David Lightman (Matthew Broderick) programs his computer modem to dial every phone number in Sunnyvale, California looking for computer carrier tones. He stumbles upon a military supercomputer named WOPR. 

Today, attackers don't dial phone numbers; they scan IP addresses and port numbers looking for forgotten, open doors.

## Your Task

Implement ^classify_endpoint(ip: str, port: int) -> dict^ in ^security.py^:
1. Determine if IP is ^"Private"^ or ^"Public"^:
   - Private if it starts with ^"127."^, ^"10."^, ^"192.168."^, or ^"172.16."^ through ^"172.31."^.
   - Otherwise ^"Public"^.
2. Determine the service name:
   - 21: ^"FTP"^
   - 22: ^"SSH"^
   - 53: ^"DNS"^
   - 80: ^"HTTP"^
   - 443: ^"HTTPS"^
   - 3306: ^"MySQL"^
   - Otherwise: ^"Unknown"^
3. Determine risk level:
   - If port 3306 on a Public IP: ^"CRITICAL_DATABASE_EXPOSED"^
   - If port in (21, 80) on a Public IP: ^"HIGH_RISK_CLEARTEXT"^
   - If port in (22, 443): ^"SECURE_ENCRYPTED"^
   - Otherwise: ^"STANDARD"^
4. Return: ^{ "network": network, "service": service, "risk": risk }^`,
      terms: [
        { term: 'IP address', def: 'A unique numerical identifier assigned to each device connected to a computer network.' },
        { term: 'port', def: 'A 16-bit number (0-65535) identifying a specific network service or application on a host.' },
        { term: 'private IP', def: 'An IP address reserved for internal networks (e.g. 192.168.x.x, 10.x.x.x) not routable on the public internet.' },
        { term: 'cleartext protocol', def: 'A communication protocol (like HTTP or FTP) that transmits data without encryption, visible to anyone eavesdropping.' }
      ],
      starter: L`def classify_endpoint(ip: str, port: int) -> dict:
    # TODO: Determine network type (Private/Public), service, and risk level
    return {}
`,
      solution: L`def is_private_ip(ip: str) -> bool:
    if ip.startswith("127.") or ip.startswith("10.") or ip.startswith("192.168."):
        return True
    if ip.startswith("172."):
        parts = ip.split('.')
        if len(parts) >= 2 and parts[1].isdigit():
            sec = int(parts[1])
            if 16 <= sec <= 31:
                return True
    return False

SERVICES = {
    21: "FTP",
    22: "SSH",
    53: "DNS",
    80: "HTTP",
    443: "HTTPS",
    3306: "MySQL"
}

def classify_endpoint(ip: str, port: int) -> dict:
    net = "Private" if is_private_ip(ip) else "Public"
    srv = SERVICES.get(port, "Unknown")
    
    if srv == "MySQL" and net == "Public":
        risk = "CRITICAL_DATABASE_EXPOSED"
    elif srv in ("FTP", "HTTP") and net == "Public":
        risk = "HIGH_RISK_CLEARTEXT"
    elif srv in ("SSH", "HTTPS"):
        risk = "SECURE_ENCRYPTED"
    else:
        risk = "STANDARD"

    return {"network": net, "service": srv, "risk": risk}
`,
      harness: L`if __name__ == '__main__':
    import sys
    endpoints = [
        ("192.168.1.1", 443),
        ("93.184.216.34", 80),
        ("198.51.100.22", 3306),
        ("10.0.0.5", 22)
    ]
    for ip, port in endpoints:
        res = classify_endpoint(ip, port)
        print(f"{ip}:{port} -> Network: {res['network']} | Service: {res['service']} | Risk: {res['risk']}")
`,
      hint: 'Check if IP starts with 192.168., 10., or 127. Classify port 3306 as MySQL, 80 as HTTP, 443 as HTTPS.',
      tests: [
        {
          name: 'Network Endpoint Classification Suite',
          stdin: '',
          expected: "192.168.1.1:443 -> Network: Private | Service: HTTPS | Risk: SECURE_ENCRYPTED\n93.184.216.34:80 -> Network: Public | Service: HTTP | Risk: HIGH_RISK_CLEARTEXT\n198.51.100.22:3306 -> Network: Public | Service: MySQL | Risk: CRITICAL_DATABASE_EXPOSED\n10.0.0.5:22 -> Network: Private | Service: SSH | Risk: SECURE_ENCRYPTED"
        }
      ]
    },

    {
      id: 'packet-inspection',
      title: 'Packet Header Parsing & Port Scan Detection',
      fileName: 'security.py',
      image: {
        url: '/diagrams/cybersecurity/packet-inspection.svg',
        caption: 'Packet inspection analyzes source and destination headers. A single source IP querying multiple distinct ports in rapid succession triggers a port scan alert.'
      },
      content: L`## The Hotel Doorknob Burglar

Imagine a hotel corridor at 3:00 AM. A normal guest steps out of the elevator, walks directly to room 304, inserts their keycard, and enters.

Now imagine a suspicious figure walking down the hallway. They jiggle the doorknob of room 301. Locked. They jiggle room 302. Locked. Room 303. Locked. Room 304. Locked. 

That suspicious behavior is a **port scan** (executed using tools like Nmap). The attacker sends probe packets to dozens of ports on a target server to discover which doors are unlocked.

## The Anatomy of an IP Packet Header

Every network packet traveling across the internet includes header metadata:
- **Source IP**: The address of the sender.
- **Destination IP**: The address of the recipient.
- **Destination Port**: The application port targeted on the recipient.
- **Protocol**: TCP (Transmission Control Protocol) or UDP (User Datagram Protocol).
- **Flags**: TCP connection state flags, such as **SYN** (Synchronize / request connection).

A security analyst inspecting network telemetry groups connection attempts by source IP. If one source IP attempts connections to more than a threshold number of unique ports, the system flags a **Port Scan Alert**.

## Pop Culture: The Matrix Reloaded (Trinity Uses Nmap)

In *The Matrix Reloaded*, Trinity needs to deactivate the city's power grid before Neo enters the building. She opens a computer terminal and types:
~~~
nmap -v -sS -O 10.0.0.1
~~~
Unlike most movies that use absurd fake Hollywood graphics, the directors used the real open-source network scanner **Nmap**! Trinity's scan reveals that port 22 (SSH) is running a vulnerable service (CRC32 exploit), which she uses to disable the power.

## Your Task

Implement ^detect_port_scanners(packets: list[dict], threshold: int = 3) -> list[str]^ in ^security.py^.
- Each packet is a dictionary:
  ^{ "src_ip": str, "dst_ip": str, "dst_port": int, "proto": str }^
- Track the set of unique ^dst_port^ values queried by each ^src_ip^.
- Return a sorted list of all source IP addresses that targeted $\ge$ ^threshold^ unique ports.`,
      terms: [
        { term: 'packet header', def: 'The metadata at the beginning of a network packet containing source and destination addresses, port numbers, and protocol flags.' },
        { term: 'port scan', def: 'A technique where an attacker sends probes to multiple ports on a server to identify open services and vulnerable software.' },
        { term: 'Nmap', def: 'Network Mapper: a widely used open-source network security scanner for discovering hosts and services on a computer network.' },
        { term: 'SYN scan', def: 'A stealth port scan technique that sends TCP SYN packets without completing the three-way handshake.' }
      ],
      starter: L`def detect_port_scanners(packets: list[dict], threshold: int = 3) -> list[str]:
    # TODO: Group packets by src_ip, count unique dst_ports, return sorted IPs >= threshold
    return []
`,
      solution: L`def detect_port_scanners(packets: list[dict], threshold: int = 3) -> list[str]:
    port_map = {}
    for p in packets:
        src = p.get("src_ip")
        port = p.get("dst_port")
        if src and port is not None:
            if src not in port_map:
                port_map[src] = set()
            port_map[src].add(port)
            
    scanners = [ip for ip, ports in port_map.items() if len(ports) >= threshold]
    return sorted(scanners)
`,
      harness: L`if __name__ == '__main__':
    import sys
    log = [
        {"src_ip": "10.0.0.5", "dst_ip": "192.168.1.1", "dst_port": 80, "proto": "TCP"},
        {"src_ip": "10.0.0.5", "dst_ip": "192.168.1.1", "dst_port": 80, "proto": "TCP"},
        {"src_ip": "198.51.100.4", "dst_ip": "192.168.1.1", "dst_port": 21, "proto": "TCP"},
        {"src_ip": "198.51.100.4", "dst_ip": "192.168.1.1", "dst_port": 22, "proto": "TCP"},
        {"src_ip": "198.51.100.4", "dst_ip": "192.168.1.1", "dst_port": 80, "proto": "TCP"},
        {"src_ip": "198.51.100.4", "dst_ip": "192.168.1.1", "dst_port": 443, "proto": "TCP"},
        {"src_ip": "10.0.0.8", "dst_ip": "192.168.1.1", "dst_port": 443, "proto": "TCP"}
    ]
    detected = detect_port_scanners(log, threshold=3)
    print(f"Scanners: {detected}")
`,
      hint: 'Use a dictionary mapping src_ip to a set() of destination ports. Return sorted list of IPs where len(ports) >= threshold.',
      tests: [
        {
          name: 'Port Scan Detection in Packet Log',
          stdin: '',
          expected: "Scanners: ['198.51.100.4']"
        }
      ]
    },

    {
      id: 'rate-limiting',
      title: 'Denial-of-Service Defense & Rate Limiting',
      fileName: 'security.py',
      image: {
        url: '/diagrams/cybersecurity/rate-limiting.svg',
        caption: 'Sliding window rate limiting: maintains request timestamps over a 10-second window. Requests exceeding capacity are throttled with HTTP 429.'
      },
      content: L`## The Nightclub Bouncer & The Velvet Rope

Imagine an exclusive nightclub that holds 100 people. A line of partygoers waits outside. 
If an aggressive crowd of 500 people tries to rush through the front door at the exact same instant, the doorway jams, the door breaks, and nobody can enjoy the music. This is a **Denial-of-Service (DoS)** event.

To protect the venue, the nightclub stations a bouncer with a velvet rope and a click counter. The bouncer enforces a strict rule: **at most 5 people may pass every 10 seconds**. Anyone who attempts to enter after the limit is reached must wait outside until previous entries clear the window.

## The Sliding Window Algorithm

Web servers and APIs protect themselves using **Rate Limiting**. When a malicious bot attempts to brute-force passwords by trying 1,000 guesses per second, the rate limiter shuts down the attack.

In the **Sliding Window** rate limiting algorithm:
1. For each client IP, the server stores a list of timestamps of recent requests.
2. When a new request arrives at time $T$:
   - The server discards all timestamps older than $T - \text{window\_seconds}$.
   - If the remaining request count is less than $\text{max\_requests}$, the request is **ALLOWED** and the current timestamp $T$ is recorded.
   - If the count has reached $\text{max\_requests}$, the request is **BLOCKED** with HTTP status **429 Too Many Requests**.

## Pop Culture: Ticketmaster & Silicon Valley

In the HBO comedy series *Silicon Valley*, the compression startup Pied Piper launches their platform and suddenly suffers a massive Distributed Denial of Service (DDoS) attack. The server rack (fondly named "Anton") begins overheating and catches fire because millions of requests hit the system without a rate limiter or firewall.

In real life, during the 2022 Taylor Swift "Eras Tour" ticket sale, over **3.5 billion bot requests** assaulted Ticketmaster's servers, causing the entire platform to crash. Modern applications must enforce strict sliding window rate limits on every public route.

## Your Task

Implement ^class SlidingWindowRateLimiter^ in ^security.py^:
- ^__init__(max_requests: int = 5, window_seconds: float = 10.0)^
- ^is_allowed(client_ip: str, current_time: float) -> tuple[bool, str]^:
  - Prunes timestamps for ^client_ip^ older than ^current_time - window_seconds^.
  - If ^len(timestamps) < max_requests^:
    - Appends ^current_time^ to timestamps.
    - Returns ^(True, "200 OK")^.
  - If ^len(timestamps) >= max_requests^:
    - Does NOT append timestamp.
    - Returns ^(False, "429 Too Many Requests")^.`,
      terms: [
        { term: 'Denial of Service (DoS)', def: 'A cyber attack aimed at rendering a computer or network unavailable to its intended users by overloading it with requests.' },
        { term: 'rate limiting', def: 'A defensive policy that controls the rate of incoming network traffic to prevent abuse and exhaustion of resources.' },
        { term: 'sliding window', def: 'A rate-limiting algorithm that measures request count across a continuously moving time window.' },
        { term: 'HTTP 429', def: 'The standard HTTP status code indicating "Too Many Requests".' }
      ],
      starter: L`class SlidingWindowRateLimiter:
    def __init__(self, max_requests: int = 5, window_seconds: float = 10.0):
        # TODO: Initialize limits and timestamp store
        pass

    def is_allowed(self, client_ip: str, current_time: float) -> tuple[bool, str]:
        # TODO: Prune expired timestamps, check limit, return (allowed, status)
        return False, ""
`,
      solution: L`class SlidingWindowRateLimiter:
    def __init__(self, max_requests: int = 5, window_seconds: float = 10.0):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.history = {}

    def is_allowed(self, client_ip: str, current_time: float) -> tuple[bool, str]:
        timestamps = self.history.setdefault(client_ip, [])
        cutoff = current_time - self.window_seconds
        while timestamps and timestamps[0] <= cutoff:
            timestamps.pop(0)

        if len(timestamps) < self.max_requests:
            timestamps.append(current_time)
            return True, "200 OK"
        return False, "429 Too Many Requests"
`,
      harness: L`if __name__ == '__main__':
    limiter = SlidingWindowRateLimiter(max_requests=3, window_seconds=5.0)
    requests = [
        ("192.168.1.10", 1.0),
        ("192.168.1.10", 2.0),
        ("192.168.1.10", 3.0),
        ("192.168.1.10", 4.0), # Should be blocked
        ("192.168.1.10", 7.0), # Should pass (1.0 has expired)
    ]
    for ip, t in requests:
        ok, msg = limiter.is_allowed(ip, t)
        print(f"Time {t}s: {ok} | {msg}")
`,
      hint: 'Remove timestamps older than current_time - window_seconds. If remaining length < max_requests, append and return True, "200 OK".',
      tests: [
        {
          name: 'Sliding Window Rate Limiter Timeline',
          stdin: '',
          expected: "Time 1.0s: True | 200 OK\nTime 2.0s: True | 200 OK\nTime 3.0s: True | 200 OK\nTime 4.0s: False | 429 Too Many Requests\nTime 7.0s: True | 200 OK"
        }
      ]
    },

    {
      id: 'unit-4-test',
      title: 'Unit 4 Test: Intrusion Detection System (IDS) Engine',
      fileName: 'security.py',
      isUnitTest: true,
      image: {
        url: '/diagrams/cybersecurity/unit-4-test.svg',
        caption: 'The Intrusion Detection System alert engine correlates C2 blacklist feeds, port scan reconnaissance, and sliding window DoS surges.'
      },
      content: L`## Cloudflare Network Defense Command Center

The Security Operations Center (SOC) is monitoring real-time telemetry from edge routers. A high-volume packet stream is arriving from multiple remote networks. 

Adversaries are coordinating multi-vector attacks:
1. Compromised machines are sending packets from known **Command-and-Control (C2)** blacklisted IP addresses.
2. Reconnaissance bots are conducting **port scans** to discover vulnerable services.
3. Attacker nodes are attempting **traffic flooding** that violates sliding window rate limits.

You are tasked with building the unified ^IntrusionDetectionSystem^ alert engine!

## IDS Processing Rules

For each incoming packet in ^packet_stream^:
1. **Blacklist Check**:
   If ^src_ip in self.blacklisted_ips^:
   - Packet is **dropped**.
   - Add alert: ^f"C2_ALERT: Blacklisted IP {src_ip} dropped"^ (record message once per IP).
   - Continue to next packet.

2. **Rate Limiting Check**:
   Apply sliding window rate limiting per ^src_ip^ (using ^rate_limit^ and ^window^):
   - If rate limit is exceeded: packet is **dropped**.
   - Add alert: ^f"DOS_ALERT: Rate limit exceeded by {src_ip}"^ (record once per IP).
   - Continue to next packet.

3. **Port Scanning Reconnaissance**:
   Track unique destination ports accessed by each ^src_ip^:
   - If unique port count reaches or exceeds ^scan_threshold^:
     - Add alert: ^f"SCAN_ALERT: Port scan detected from {src_ip} ({count} ports)"^ (record once per IP).

4. **Pass**:
   If the packet was not dropped, it is counted as **passed**.

## Your Task

Implement ^class IntrusionDetectionSystem^ in ^security.py^:
- ^__init__(blacklisted_ips: set, scan_threshold: int = 3, rate_limit: int = 4, window: float = 10.0)^
- ^analyze_traffic(packets: list[dict]) -> dict^ returning:
  ^{ "total_analyzed": int, "passed": int, "dropped": int, "alerts": list[str] }^`,
      terms: [
        { term: 'Intrusion Detection System (IDS)', def: 'A defensive device or application that monitors network or system activities for malicious activities or policy violations.' },
        { term: 'Command and Control (C2)', def: 'Centralized servers used by cybercriminals to maintain communications with and control compromised computers.' }
      ],
      starter: L`class IntrusionDetectionSystem:
    def __init__(self, blacklisted_ips: set, scan_threshold: int = 3, rate_limit: int = 4, window: float = 10.0):
        # TODO: Store configuration
        pass

    def analyze_traffic(self, packets: list[dict]) -> dict:
        # TODO: Process packets, enforce blacklist, rate limit, and port scan detection
        return {}
`,
      solution: L`class IntrusionDetectionSystem:
    def __init__(self, blacklisted_ips: set, scan_threshold: int = 3, rate_limit: int = 4, window: float = 10.0):
        self.blacklisted_ips = set(blacklisted_ips)
        self.scan_threshold = scan_threshold
        self.rate_limit = rate_limit
        self.window = window

    def analyze_traffic(self, packets: list[dict]) -> dict:
        passed = 0
        dropped = 0
        alerts = []
        port_history = {}
        time_history = {}
        alerted_scanners = set()

        for pkt in packets:
            t = pkt["time"]
            src = pkt["src_ip"]
            port = pkt["dst_port"]

            # 1. Blacklist check
            if src in self.blacklisted_ips:
                dropped += 1
                msg = f"C2_ALERT: Blacklisted IP {src} dropped"
                if msg not in alerts:
                    alerts.append(msg)
                continue

            # 2. Rate limit check
            history = time_history.setdefault(src, [])
            cutoff = t - self.window
            while history and history[0] <= cutoff:
                history.pop(0)

            if len(history) >= self.rate_limit:
                dropped += 1
                msg = f"DOS_ALERT: Rate limit exceeded by {src}"
                if msg not in alerts:
                    alerts.append(msg)
                continue

            history.append(t)

            # 3. Port scan check
            ports = port_history.setdefault(src, set())
            ports.add(port)
            if len(ports) >= self.scan_threshold and src not in alerted_scanners:
                alerted_scanners.add(src)
                alerts.append(f"SCAN_ALERT: Port scan detected from {src} ({len(ports)} ports)")

            passed += 1

        return {
            "total_analyzed": len(packets),
            "passed": passed,
            "dropped": dropped,
            "alerts": alerts
        }
`,
      harness: L`if __name__ == '__main__':
    ids = IntrusionDetectionSystem(blacklisted_ips={"198.51.100.99"}, scan_threshold=3, rate_limit=3, window=5.0)
    stream = [
        {"time": 1.0, "src_ip": "10.0.0.1", "dst_ip": "192.168.1.1", "dst_port": 80},
        {"time": 1.1, "src_ip": "198.51.100.99", "dst_ip": "192.168.1.1", "dst_port": 443},
        {"time": 1.2, "src_ip": "10.0.0.2", "dst_ip": "192.168.1.1", "dst_port": 21},
        {"time": 1.3, "src_ip": "10.0.0.2", "dst_ip": "192.168.1.1", "dst_port": 22},
        {"time": 1.4, "src_ip": "10.0.0.2", "dst_ip": "192.168.1.1", "dst_port": 80},
        {"time": 1.5, "src_ip": "10.0.0.1", "dst_ip": "192.168.1.1", "dst_port": 80},
        {"time": 1.6, "src_ip": "10.0.0.1", "dst_ip": "192.168.1.1", "dst_port": 80},
        {"time": 1.7, "src_ip": "10.0.0.1", "dst_ip": "192.168.1.1", "dst_port": 80},
    ]
    res = ids.analyze_traffic(stream)
    print(f"Total: {res['total_analyzed']} | Passed: {res['passed']} | Dropped: {res['dropped']}")
    for a in res['alerts']:
        print(f"Alert: {a}")
`,
      hint: 'First check if src_ip is blacklisted. If not, apply sliding window rate limit. Then track unique ports and alert if >= scan_threshold.',
      tests: [
        {
          name: 'Real-Time IDS Incident Detection',
          stdin: '',
          expected: "Total: 8 | Passed: 6 | Dropped: 2\nAlert: C2_ALERT: Blacklisted IP 198.51.100.99 dropped\nAlert: SCAN_ALERT: Port scan detected from 10.0.0.2 (3 ports)\nAlert: DOS_ALERT: Rate limit exceeded by 10.0.0.1"
        }
      ]
    }
  ]
};
