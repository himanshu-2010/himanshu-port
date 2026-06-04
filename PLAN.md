# Himanshu — Portfolio Master Plan v3.0
> **Digital Engineering Workshop** | Student Engineer · Electronics Maker · Robotics Enthusiast · Embedded Systems Developer
> *Status: Production-Ready Blueprint*

---

## Table of Contents

1. [Vision & Core Identity](#1-vision--core-identity)
2. [Design System](#2-design-system)
3. [Site Architecture & Navigation](#3-site-architecture--navigation)
4. [Section Specifications](#4-section-specifications)
   - 4.1 [Hero Terminal Unit](#41-hero-terminal-unit)
   - 4.2 [Engineering Metrics Bar](#42-engineering-metrics-bar)
   - 4.3 [About — Core Profile](#43-about--core-profile)
   - 4.4 [Skill Matrix](#44-skill-matrix)
   - 4.5 [Project Workbench (Gallery)](#45-project-workbench-gallery)
   - 4.6 [Engineering Gallery](#46-engineering-gallery)
   - 4.7 [Chronological Timeline](#47-chronological-timeline)
   - 4.8 [Technical Blog](#48-technical-blog)
   - 4.9 [Open Source Hub](#49-open-source-hub)
   - 4.10 [Achievements](#410-achievements)
   - 4.11 [Resume Section](#411-resume-section)
   - 4.12 [Contact Terminal](#412-contact-terminal)
5. [Project Documentation Standard](#5-project-documentation-standard)
   - [Project 1 — PID Line Follower "Tarzan Bot"](#project-1--pid-line-follower-tarzan-bot)
   - [Project 2 — RC Combat Robot "Battle Bot"](#project-2--rc-combat-robot-battle-bot)
   - [Project 3 — Solar Water Purifier System](#project-3--solar-water-purifier-system)
   - [Project 4 — Portable ESP8266 MP3 Player](#project-4--portable-esp8266-mp3-player)
   - [Project 5 — Raspberry Pi eBook Reader](#project-5--raspberry-pi-ebook-reader)
   - [Project 6 — Linux ASCII Media Engine](#project-6--linux-ascii-media-engine)
6. [Automation & GitHub Integration](#6-automation--github-integration)
7. [Performance & Technical Requirements](#7-performance--technical-requirements)
8. [Future Roadmap](#8-future-roadmap)
9. [Operational Motto](#9-operational-motto)

---

## 1. Vision & Core Identity

### The "Digital Workbench" Concept

This portfolio must feel like walking into an active electronics lab — not a marketing brochure. Every design decision, section layout, and content choice should reflect the mindset of someone who builds real things: someone who has burned out motor drivers, debugged PID loops at 2am, and soldered components by hand.

Standard developer portfolios showcase APIs and web apps. This portfolio showcases **firmware, hardware, robots, and systems** — the entire stack from the silicon level upward.

### Primary Objectives

| Objective | Target Outcome |
|---|---|
| **Instant Identity** | Visitor understands within 5 seconds: embedded systems + robotics + Linux |
| **Proof of Competency** | Real failure logs, real schematics, real code — not polished marketing copy |
| **Frictionless Access** | Resume, GitHub, and key projects accessible in ≤2 clicks from any page |
| **Technical Credibility** | Documentation reads like engineering datasheets, not a student project summary |
| **Community Signal** | Open-source contributions, documented repos, visible commit history |

### Personal Introduction

**Short Version**

Hi, I'm Himanshu — a student engineer from India building real things. My work spans electronics, robotics, embedded systems, and Linux utilities. I learn by doing: every project is an experiment, every failure is a data point.

**Detailed Version**

I am a hands-on student engineer whose learning philosophy is built around practical experimentation. I do not learn engineering from textbooks alone — I learn it from voltage spikes, sensor noise, failed prototypes, and iterative debugging sessions.

My technical interests span:
- Embedded systems design (Arduino, ESP8266/ESP32, Raspberry Pi Pico)
- Autonomous robotics and motor control algorithms
- Low-level firmware development in C++
- Linux system administration and terminal utilities
- Open-source hardware and software development
- Battery systems, power electronics, and sensor integration

Every project I build is an opportunity to develop deeper engineering instincts and stronger problem-solving capability.

---

## 2. Design System

### Color Palette

| Variable | Hex | Purpose |
|---|---|---|
| `--bg-main` | `#0B0F17` | Primary page background — deep terminal void |
| `--bg-surface` | `#121824` | Card surfaces, code blocks, component tiles |
| `--bg-elevated` | `#1A2235` | Hover states, active selections, nested panels |
| `--brand-cyan` | `#00D9FF` | Primary accent — headings, links, active indicators |
| `--brand-blue` | `#2563EB` | Secondary accent — tags, secondary buttons, icons |
| `--neon-green` | `#10B981` | Success/active states, metric highlights, status flags |
| `--warning-amber` | `#F59E0B` | Failure logs, caution states, important callouts |
| `--text-primary` | `#F3F4F6` | Body content, high-priority text |
| `--text-muted` | `#9CA3AF` | Captions, metadata, code comments |
| `--text-dim` | `#6B7280` | Timestamps, secondary labels |
| `--border` | `#1F2937` | Dividers, card borders |
| `--glow-cyan` | `rgba(0, 217, 255, 0.15)` | Subtle glow effects on hover |

### Typography

| Role | Font | Weight | Use |
|---|---|---|---|
| Display Headings | `Space Grotesk` | 700–800 | `h1`, hero title, section labels |
| Body Text | `Inter` | 400–500 | Paragraphs, lists, descriptions |
| Monospace / Code | `JetBrains Mono` | 400–500 | Code blocks, terminal snippets, pin maps |
| Accent Labels | `Space Grotesk` | 600 | Metric counters, skill tags, badge text |

### Visual Language Rules

1. **No decorative gradients on text** unless used sparingly on section titles.
2. **Code blocks** must use `--bg-surface` with a left cyan border accent (`border-left: 3px solid var(--brand-cyan)`).
3. **Failure Log blocks** use amber left-border to distinguish from standard code.
4. **Cards** must have a subtle `box-shadow: 0 0 0 1px var(--border)` rather than heavy drop shadows.
5. **Hover states** on interactive elements trigger a faint `--glow-cyan` background bloom.
6. **Animated PCB trace lines** in the hero background: thin SVG paths pulsing left-to-right at low opacity (~8%).

---

## 3. Site Architecture & Navigation

### Single-Page Layout with Anchor Navigation

```
[🏠 HIMANSHU — PORTFOLIO]
│
├── [🚀 §01 Hero Terminal]          → #hero
├── [📊 §02 Engineering Metrics]    → #metrics
├── [👤 §03 About]                  → #about
├── [⚙️  §04 Skills]                → #skills
├── [📂 §05 Projects]               → #projects
├── [🖼️  §06 Gallery]               → #gallery
├── [📈 §07 Timeline]               → #timeline
├── [✍️  §08 Blog]                  → #blog
├── [🔓 §09 Open Source]            → #opensource
├── [🏆 §10 Achievements]           → #achievements
└── [📬 §11 Contact]                → #contact
```

### Navigation Bar Spec

- **Position:** Fixed top, full-width, `backdrop-filter: blur(12px)`, background `rgba(11, 15, 23, 0.85)`.
- **Left:** `HIMANSHU` wordmark in `--brand-cyan`, monospace font.
- **Right:** Section anchor links + `[Resume ↓]` button styled as a bordered cyan pill.
- **Mobile:** Collapsed hamburger with a sliding drawer panel from the right.
- **Scroll behavior:** Active section anchor highlights in navbar using Intersection Observer.

---

## 4. Section Specifications

### 4.1 Hero Terminal Unit

**Layout:** Two-column split on desktop, stacked on mobile.

**Left Column:**

```
HIMANSHU
──────────────────────────────────
Student Engineer & Electronics Maker
──────────────────────────────────
Building autonomous robots, low-level firmware
systems, and lightweight Linux utilities —
from the ground up.

[ Explore Workbench ↓ ]   [ Download Resume PDF ]

  ⬡ GitHub    ⬡ LinkedIn    ⬡ Email
```

**Right Column — Simulated Boot Terminal:**

```bash
himanshu@workbench:~$ ./init_portfolio.sh --verbose

[⚙️ ] Loading hardware abstraction layer...
[OK] ESP8266 / ESP32 / Pico frameworks initialized
[OK] PID control parameters stable (Kp=3.14, Ki=0.02, Kd=1.1)
[OK] IR sensor array calibrated — 8 channels nominal
[OK] DFPlayer audio pipeline ready on UART
[OK] OLED display initialized on I2C (0x3C)
[🚀] System stable. All modules online.

Welcome to the workshop.
himanshu@workbench:~$ _
```

**Implementation Notes:**
- Right terminal uses a typewriter animation loop (JS `setInterval` or CSS keyframes).
- Terminal cursor blinks at 1Hz.
- Background: full-bleed animated SVG PCB grid with faint pulsing traces at 6% opacity.
- Both CTAs are high-contrast buttons. Primary: filled cyan. Secondary: outlined cyan.

---

### 4.2 Engineering Metrics Bar

A horizontal band of 4 animated counters. Numbers count up when scrolled into view (Intersection Observer trigger).

| Metric | Value | Label |
|---|---|---|
| Hardware Prototypes | `12+` | Assembled & Tested |
| Embedded Code | `42k+` | Lines of C++ / Python |
| Microcontroller Platforms | `5` | Active Environments |
| Max Baud Rate | `115,200` | bps — Stable Pipeline |

- **Background:** `--bg-surface` with a thin top and bottom `--border` divider.
- **Numbers:** `Space Grotesk 700`, `--brand-cyan`, large (48–56px).
- **Labels:** `Inter`, `--text-muted`, small (13px).

---

### 4.3 About — Core Profile

Two-column: short bio paragraph on the left, quick-fact sidebar on the right.

**Bio (Left):**

> I'm a student engineer from India who learns through building real things. My work spans embedded systems, autonomous robotics, and Linux utilities — always starting from the hardware layer and working upward. I've designed motor control circuits, tuned PID loops, configured dual-boot Linux environments, and written firmware for platforms ranging from Arduino to ESP32. Every project on this site started as a problem I wanted to solve.

**Quick-Fact Sidebar (Right):**

```
📍 India
🎓 Dayanand Public School
⚡ Focus: Embedded Systems & Robotics
🐧 OS: Arch Linux / Dual-Boot
🔧 Editor: VS Code + PlatformIO
🌐 GitHub: @himanshu [link]
```

**Philosophy Block (full-width, below):**

```
"Engineering is learned by building.
Every failed prototype is a debugging session.
Every successful build is proof of concept."
```

---

### 4.4 Skill Matrix

Organized into four engineering domains. Each domain is a collapsible card tile.

```
┌──────────────────────────────────────────────────────────────────┐
│  📟 EMBEDDED SYSTEMS & HARDWARE                                  │
│  ─────────────────────────────────────────────                   │
│  Microcontrollers: Arduino UNO/Nano · ESP8266 · ESP32 · Pi Pico  │
│  Protocols:        I2C · SPI · UART · RF (FlySky 2.4GHz)         │
│  Displays:         SSD1306 OLED · 16x2 LCD                       │
│  Power:            Li-Ion Pack Design · BMS · Voltage Regulators  │
│  Drivers:          L298N · Dual H-Bridge · ESC Configuration      │
├──────────────────────────────────────────────────────────────────┤
│  🤖 ROBOTICS & AUTOMATION                                         │
│  ─────────────────────────────────────────────                   │
│  Navigation:       PID Closed-Loop Control · IR Array Tracking    │
│  Motion:           DC Motor Control · High-Torque Drive Systems   │
│  Remote Control:   RF Transmitter/Receiver · FlySky i6            │
│  Prototyping:      Chassis Design · Structural Combat Engineering  │
├──────────────────────────────────────────────────────────────────┤
│  💻 SOFTWARE & SYSTEMS                                            │
│  ─────────────────────────────────────────────                   │
│  Languages:        Embedded C++ · Python 3 · Bash Scripting       │
│  Web:              HTML · CSS · JavaScript (basic UI work)        │
│  Systems:          Linux Admin · Dual-Boot Config · Shell Tooling  │
│  Dev Tools:        Arduino IDE · PlatformIO · VS Code · Git       │
├──────────────────────────────────────────────────────────────────┤
│  🔌 ELECTRONICS                                                   │
│  ─────────────────────────────────────────────                   │
│  Circuit Work:     Breadboarding · Schematic Reading · Soldering  │
│  Sensors:          IR Arrays · Ultrasonic · Temperature           │
│  Audio:            DFPlayer Mini · UART Audio Pipelines           │
│  Troubleshooting:  Multimeter Diagnostics · Logic Tracing         │
└──────────────────────────────────────────────────────────────────┘
```

---

### 4.5 Project Workbench (Gallery)

**Layout:** Filterable card grid. Filter bar at top with toggle buttons:

`[All]` `[Robotics]` `[Embedded]` `[Linux / Software]` `[Electronics]`

Each card includes:
- Project title in `--brand-cyan`
- One-line summary
- Technology tag pills (e.g., `ESP8266`, `PID`, `C++`)
- Status badge: `[ACTIVE]` / `[COMPLETE]` / `[OPEN SOURCE]`
- `[View Datasheet →]` link to full project documentation

---

### 4.6 Engineering Gallery

A masonry-style photo grid with category filter. Images are grouped by:

| Category | Contents |
|---|---|
| `[Robotics]` | Battle bot assembly, line follower chassis, RC vehicle builds |
| `[Electronics]` | Breadboard setups, soldered PCBs, wiring harnesses |
| `[Workbench]` | Testing sessions, component layouts, debugging setups |
| `[Firmware]` | IDE screenshots, serial monitor output, code sessions |

Click to expand images in a full-screen lightbox with caption.

---

### 4.7 Chronological Timeline

A vertical timeline with alternating left/right cards.

```
2022 ─────────── FOUNDATION
                 Started with Arduino UNO and basic electronics.
                 First breadboard circuits, LED control, sensor reads.
                 Language: C++ basics via Arduino IDE.

2023 ─────────── FIRST BUILDS
                 Constructed early robotics prototypes.
                 Explored motor drivers, H-bridges, servo control.
                 Built first autonomous line-following prototype (v1).

2024 ─────────── WIRELESS SYSTEMS
                 ESP8266 development — WiFi-enabled projects.
                 Explored serial communication: I2C, UART, SPI.
                 Built portable MP3 player with DFPlayer + OLED.

2025 ─────────── ADVANCED ROBOTICS & LINUX
                 PID Line Follower with 8-sensor IR array (Tarzan Bot).
                 RC Combat Robot with FlySky RF control.
                 Transitioned to Linux — dual-boot, terminal workflows.
                 ASCII media engine; Raspberry Pi eBook reader.

2026 ─────────── CURRENT: SYSTEMS & OPEN SOURCE
                 Building reusable embedded libraries.
                 Documenting schematics and firmware for public release.
                 Exploring PCB design and custom board fabrication.
```

---

### 4.8 Technical Blog

Topics are scoped to hands-on embedded/electronics engineering knowledge.

**Planned Articles:**

1. **PID Tuning from Scratch** — Deriving Kp, Ki, Kd from system response data without guessing; applied to a real line-follower.
2. **Active-Low Sensor Gotchas** — Why your IR array reads backwards and how to fix it at both hardware and firmware levels.
3. **Li-Ion Pack Safety** — Cell balancing, BMS selection, discharge curves, and thermal runaway prevention for custom battery packs.
4. **Non-Blocking Firmware Patterns** — Writing responsive embedded loops without `delay()` using state machines and millis().
5. **DFPlayer Mini Deep Dive** — UART protocol, folder/file indexing, debugging audio glitches, OLED integration.
6. **Dual-Boot Linux for Makers** — Partitioning strategy, GRUB config, driver management for hardware development.
7. **Why Your Motor Driver Keeps Dying** — Common L298N failure modes, current limits, protection circuits.

**Blog Card Template:**
- Title, category tag, estimated read time, 2-sentence preview, `[Read →]` link.

---

### 4.9 Open Source Hub

A GitHub-integrated section displaying live repository data via the GitHub REST API.

**Repos to Feature:**

| Project | Description | Highlight |
|---|---|---|
| `ascii-media-engine` | Terminal ASCII video/image renderer | Python, OpenCV, ANSI |
| `tarzan-bot-firmware` | PID line follower firmware for ESP8266 | C++, PID, IR arrays |
| `esp8266-mp3-player` | Portable OLED MP3 player | C++, DFPlayer, I2C |

**Each repo card shows:**
- Name + description
- Star count, fork count, last commit date (live via GitHub API)
- Primary language badge
- `[View Repository →]` button

---

### 4.10 Achievements

Initially minimal — designed to grow. Use a "locked" placeholder card style for upcoming entries.

**Current / Planned Entries:**
- School science/engineering exhibition participation
- Robotics club or local competition entries
- Open-source project releases with public traction
- Notable peer recognitions or teacher endorsements

---

### 4.11 Resume Section

**Downloadable PDF trigger button:** `[ ↓ Download Technical Resume ]`

**Resume Content Outline:**

```
HIMANSHU
Student Engineer | Electronics Maker | Embedded Systems Developer
[Email] · [GitHub] · [Location: India]

EDUCATION
────────────────────────────────────────
Dayanand Public School

TECHNICAL SKILLS
────────────────────────────────────────
Embedded:    C++, Arduino, ESP8266/ESP32, Raspberry Pi Pico
Robotics:    PID Control, Motor Drivers, RF Systems
Systems:     Linux, Bash, Git, PlatformIO, VS Code
Electronics: Soldering, Breadboarding, Sensor Integration

PROJECTS
────────────────────────────────────────
PID Line Follower Robot (Tarzan Bot) — ESP8266, IR Array, L298N
RC Combat Robot (Battle Bot)         — FlySky RF, Motor ESC
Portable MP3 Player                  — DFPlayer Mini, OLED, ESP8266
Linux ASCII Media Engine             — Python, OpenCV, Terminal
Raspberry Pi eBook Reader            — Linux, EPUB, Terminal UI

OPEN SOURCE
────────────────────────────────────────
[GitHub repositories with links]
```

---

### 4.12 Contact Terminal

**Layout:** Styled as a terminal input session.

```bash
himanshu@workbench:~$ ./contact.sh

[INPUT] Name    : ___________________
[INPUT] Email   : ___________________
[INPUT] Message : ___________________
                  ___________________

[ > Send Transmission ]
```

**Also show direct links:**

| Channel | Handle |
|---|---|
| GitHub | `@himanshu` |
| Email | Direct link |
| LinkedIn | Profile link |
| YouTube | Channel link (if applicable) |

---

## 5. Project Documentation Standard

Every project page follows this strict template. No vague summaries — every section must contain real engineering data.

---

### Project 1 — PID Line Follower "Tarzan Bot"

**Category:** Robotics · Autonomous Navigation
**Status:** Complete · Documented

#### System Parameters

| Field | Value |
|---|---|
| Problem | Build a robot that autonomously follows a black line on a white surface at high speed |
| Solution | ESP8266 + 8-channel IR array + PID closed-loop control driving L298N motor driver |
| Target Speed | Maximum navigable velocity with stable line tracking |
| Control Mode | Fully autonomous — no remote input during operation |

#### Bill of Materials (BOM)

| Component | Spec | Qty |
|---|---|---|
| Microcontroller | NodeMCU ESP8266 | 1 |
| IR Reflectance Array | 8-channel (e.g., TCRT5000 or QTR-8A) | 1 |
| Motor Driver | L298N Dual H-Bridge | 1 |
| DC Motors | High-RPM gear motors | 2 |
| Battery | 2S Li-Ion pack (~7.4V) | 1 |
| Voltage Regulator | 5V LDO / buck converter for logic | 1 |
| Chassis | Custom or off-the-shelf line-follower frame | 1 |

#### Pin Configuration

| ESP8266 Pin | Connected To |
|---|---|
| D0–D7 | IR sensor array outputs |
| D8 | L298N IN1 |
| D9 | L298N IN2 |
| D10 | L298N IN3 |
| D11 | L298N IN4 |
| A0 | Battery voltage monitor (optional) |

#### PID Control Summary

```
Error = (WeightedSensorAverage) − (CenterValue)

ControlSignal = (Kp × Error)
              + (Ki × IntegralOfError)
              + (Kd × DerivativeOfError)

Left Motor Speed  = BaseSpeed + ControlSignal
Right Motor Speed = BaseSpeed − ControlSignal
```

Tuned Parameters: `Kp = 3.14`, `Ki = 0.02`, `Kd = 1.1` (iterate per surface and speed)

#### Key Firmware Snippet — Active-Low Sensor Inversion

```cpp
// ESP8266 NodeMCU — Active-Low IR Sensor Handling
// TCRT5000 and many IR arrays output LOW when line detected

const int SENSOR_PINS[] = {D0, D1, D2, D3, D4, D5, D6, D7};
int sensorValues[8];

void readSensors() {
    for (int i = 0; i < 8; i++) {
        // Active-Low: invert reading so 1 = line detected
        sensorValues[i] = !digitalRead(SENSOR_PINS[i]);
    }
}

int weightedError() {
    int weightedSum = 0, activeCount = 0;
    int weights[] = {-4, -3, -2, -1, 1, 2, 3, 4};
    for (int i = 0; i < 8; i++) {
        if (sensorValues[i]) {
            weightedSum += weights[i];
            activeCount++;
        }
    }
    return activeCount > 0 ? weightedSum / activeCount : lastError;
}
```

#### Failure Analysis Log

| Issue | Root Cause | Resolution |
|---|---|---|
| IR readings flicker under fluorescent light | Ambient IR interference on uncovered sensors | 3D-printed sensor shroud to block ambient IR |
| Robot oscillates at high speed | Kd too low — derivative damping insufficient | Increased Kd, reduced base speed threshold |
| Sensor array misread at track joins | All-black region returns no weighted center | Added "all-sensors-on" handling to hold last known error |
| Motor driver overheats | L298N driven at continuous max current | Added thermal heatsink; implemented current-limiting PWM ceiling |

---

### Project 2 — RC Combat Robot "Battle Bot"

**Category:** Robotics · Combat · RC Systems
**Status:** Complete · Operational

#### System Parameters

| Field | Value |
|---|---|
| Problem | Build a durable, radio-controlled combat platform capable of sustained mechanical engagement |
| Solution | FlySky RF control driving high-torque motors with isolated weapon ESC system |
| Control Range | ~200m open field with FlySky i6 |
| Weight Class | [To be defined for competition entry] |

#### Bill of Materials (BOM)

| Component | Spec | Qty |
|---|---|---|
| RF Transmitter | FlySky i6 6-Channel 2.4GHz | 1 |
| RF Receiver | FlySky FS-iA6B | 1 |
| Drive Motors | High-torque metal gear DC motors | 2–4 |
| Weapon Motor | High-RPM brushless or brushed | 1 |
| Weapon ESC | Isolated motor controller | 1 |
| Drive ESC / Driver | L298N or dedicated dual ESC | 1 |
| Battery | LiPo / Li-Ion high-discharge pack | 1 |
| Chassis | Modular aluminum/HDPE frame | 1 |

#### Failure Analysis Log

| Issue | Root Cause | Resolution |
|---|---|---|
| MCU resets during weapon activation | Weapon motor inrush current collapsed logic rail voltage | Fully isolated dual power rails — weapon motor on dedicated LiPo cell |
| Drive motors lose sync during combat | PWM signal noise from weapon ESC coupling | Ferrite beads on PWM lines; physical separation of signal wiring |
| Receiver loses link under vibration | Antenna contact loosening during impact | Epoxy-secured antenna mounts; secondary receiver binding |

---

### Project 3 — Solar Water Purifier System

**Category:** Electronics · Sustainable Systems
**Status:** Prototype Demonstrated
**Team:** Zero Sentinels / Nova Node

#### System Parameters

| Field | Value |
|---|---|
| Problem | Provide clean drinking water for off-grid or underserved communities without mains power |
| Solution | Solar-charged battery system powering multi-stage filtration with low-voltage cutoff protection |
| Input | Photovoltaic panel (12V system) |
| Output | Filtered + UV-sterilized potable water |

#### System Block Diagram

```
[PV Panel] → [Charge Controller] → [12V Battery Bank]
                                           ↓
                              [Low-Voltage Cutoff Circuit]
                                           ↓
                              [12V DC Pressure Pump]
                                           ↓
                    [Stage 1: Sediment Filter] → [Stage 2: Carbon Filter]
                                           ↓
                              [UV-C Sterilizer Array]
                                           ↓
                              [Clean Water Output]
```

#### Failure Analysis Log

| Issue | Root Cause | Resolution |
|---|---|---|
| Pump rapid-cycles under cloudy conditions | Insufficient battery reserve, solar dip triggers cutoff repeatedly | Increased battery bank capacity; hysteresis added to cutoff thresholds |
| UV bulb flickers | Voltage sag under pump load | Separated UV supply from pump rail with dedicated regulator |

---

### Project 4 — Portable ESP8266 MP3 Player

**Category:** Embedded Systems · Audio · Consumer Device
**Status:** Complete · Functional Prototype

#### System Parameters

| Field | Value |
|---|---|
| Goal | Build a pocket-sized standalone audio player without requiring a smartphone or computer |
| MCU | NodeMCU ESP8266 |
| Storage | MicroSD card via DFPlayer Mini |
| Interface | SSD1306 OLED + tactile button cluster |
| Power | Li-Ion cell with charging circuit |

#### Pin Configuration

| ESP8266 Pin | Component | Note |
|---|---|---|
| D1 (SCL) | SSD1306 OLED | I2C Clock |
| D2 (SDA) | SSD1306 OLED | I2C Data |
| D5 (TX→RX) | DFPlayer Mini RX | UART audio commands |
| D6 (RX←TX) | DFPlayer Mini TX | UART status feedback |
| D7 | Button: NEXT | Active-Low, INPUT_PULLUP |
| D8 | Button: PREV | Active-Low, INPUT_PULLUP |
| D9 | Button: PLAY/PAUSE | Active-Low, INPUT_PULLUP |
| A0 | Battery voltage divider | ADC monitoring |

#### OLED Display Layout

```
┌─────────────────────────────┐
│  ♫  NOW PLAYING             │
│                             │
│  Track 03 / 12              │
│  [▓▓▓▓▓▓░░░░░░] 02:14       │
│                             │
│  VOL: ████████░░   80%      │
│  BAT: ██████████  100%      │
└─────────────────────────────┘
```

#### Failure Analysis Log

| Issue | Root Cause | Resolution |
|---|---|---|
| DFPlayer unresponsive on first boot | UART baud mismatch (DFPlayer default: 9600) | Explicitly set SoftwareSerial to 9600 baud |
| OLED freezes after track change | I2C bus locked up during simultaneous UART + I2C ops | Added `Wire.begin()` recovery call; separated UART and I2C timing with non-blocking state machine |
| Button triggers multiple track skips | Contact bounce on mechanical buttons | Software debounce: 50ms lockout after first trigger detection |

---

### Project 5 — Raspberry Pi eBook Reader

**Category:** Linux · Single-Board Computer · Consumer Device
**Status:** Functional · In Use

#### System Parameters

| Field | Value |
|---|---|
| Goal | Build a low-power offline reading device that doesn't need a commercial e-reader |
| Hardware | Raspberry Pi (any model) + small display or HDMI output |
| OS | Raspberry Pi OS Lite (headless optimized) |
| Interface | Terminal-based with lightweight GUI option |

#### Software Stack

| Layer | Tool |
|---|---|
| OS | Raspberry Pi OS Lite |
| EPUB Reader | `fbreader` or `epr` (terminal) |
| PDF Viewer | `zathura` (lightweight) |
| File Manager | `ranger` (terminal) |
| Font Rendering | Freetype with subpixel hints |
| Boot Target | `multi-user.target` (no desktop environment) |

---

### Project 6 — Linux ASCII Media Engine

**Category:** Linux · Python · Terminal Utilities
**Status:** Functional · Open Source Target

#### System Parameters

| Field | Value |
|---|---|
| Goal | Render video/images as real-time ASCII art streams inside any Linux terminal |
| Language | Python 3 |
| Key Libraries | OpenCV, NumPy, ANSI escape sequences |
| Target Platform | Any Linux terminal with 256-color or TrueColor support |

#### Core Algorithm

```python
import cv2
import numpy as np

ASCII_CHARS = " .:-=+*#%@"  # Light to dark density map

def frame_to_ascii(frame, cols=80, rows=40):
    """Downsample a video frame to ASCII character grid."""
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    resized = cv2.resize(gray, (cols, rows * 2))  # 2x height for char aspect ratio
    normalized = resized / 255.0
    
    lines = []
    for row in resized:
        line = ""
        for pixel in row:
            idx = int((pixel / 255) * (len(ASCII_CHARS) - 1))
            line += ASCII_CHARS[idx]
        lines.append(line)
    
    return "\n".join(lines)
```

---

## 6. Automation & GitHub Integration

### GitHub REST API Integration

```javascript
// Fetch live repo stats for Open Source section
const GITHUB_USER = "himanshu";  // replace with actual handle
const REPOS = ["ascii-media-engine", "tarzan-bot-firmware", "esp8266-mp3-player"];

async function fetchRepoStats(repoName) {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repoName}`);
    const data = await res.json();
    return {
        stars: data.stargazers_count,
        forks: data.forks_count,
        lastCommit: data.pushed_at,
        description: data.description,
        language: data.language
    };
}
```

### Scroll-Triggered Counter Animation

```javascript
// Intersection Observer for metric counter animation
const counters = document.querySelectorAll('.metric-value');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || "");
    }, 16);
}
```

---

## 7. Performance & Technical Requirements

### Core Requirements

| Requirement | Target |
|---|---|
| Lighthouse Performance Score | ≥ 90 |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3.0s |
| Mobile Responsive | All breakpoints ≥ 320px |
| Accessibility (WCAG) | AA compliant |
| Dark Mode | Default + persistent (localStorage) |

### Technical Stack Options

**Option A — Static HTML/CSS/JS (Recommended for v1)**
- Zero build step, maximum portability
- Hosted on GitHub Pages or Netlify
- Tailwind CSS via CDN for utilities
- Vanilla JS for interactions

**Option B — Next.js / React (Recommended for v2+)**
- Component-based architecture for blog and project pages
- Static site generation (SSG) for performance
- GitHub API integration cleaner with server-side fetch

### File Structure (Static Option)

```
himanshu-portfolio/
├── index.html              # Main single-page layout
├── assets/
│   ├── css/
│   │   ├── main.css        # Custom properties + base styles
│   │   └── components.css  # Section-specific styles
│   ├── js/
│   │   ├── terminal.js     # Hero typing animation
│   │   ├── counters.js     # Metric counter animations
│   │   ├── gallery.js      # Filter + lightbox logic
│   │   └── github.js       # GitHub API fetch + render
│   └── img/
│       ├── gallery/        # Project and workbench photos
│       └── icons/          # SVG tech icons
├── projects/
│   ├── tarzan-bot.html
│   ├── battle-bot.html
│   ├── mp3-player.html
│   ├── ascii-engine.html
│   └── solar-purifier.html
├── resume/
│   └── Himanshu_Resume.pdf
└── README.md
```

---

## 8. Future Roadmap

### Short-Term (0–3 Months)
- [ ] Launch v1 static site with hero, projects, and contact sections
- [ ] Document all existing projects with failure logs and BOM tables
- [ ] Upload all firmware repositories to GitHub with proper READMEs
- [ ] Photograph all hardware builds for gallery section
- [ ] Generate downloadable PDF resume

### Medium-Term (3–9 Months)
- [ ] Design first custom PCB (starting with line follower sensor array board)
- [ ] Register for at least one local/national robotics or engineering competition
- [ ] Write first 2–3 technical blog articles
- [ ] Implement GitHub API live stats in open-source section
- [ ] Migrate to Next.js for blog and project routing

### Long-Term (9–24 Months)
- [ ] Release all hardware projects as fully documented open-source repositories
- [ ] Build a multi-sensor autonomous vehicle platform (beyond line following)
- [ ] Contribute to an established open-source embedded systems project
- [ ] Achieve measurable GitHub community traction (stars, forks, issues)
- [ ] Develop reusable firmware abstraction libraries (ESP utilities, display drivers)

---

## 9. Operational Motto

> **Build. Experiment. Learn. Improve.**
>
> *Every failed prototype is a diagnostic log.*
> *Every successful build is proof of concept.*
> *Every iteration makes the next one better.*

---

*Last Updated: 2026 — Version 3.0 Production Blueprint*
