---
name: skill-builder
description: "Interview someone about a task they repeat and turn it into a skill spec ready to build. Trigger when someone says 'I want to automate something', 'build me a skill', 'I keep doing this manually', 'can Claude help with this', 'skill intake', 'skill builder', or describes a tedious repeated task and sounds tired of it."
---

# Skill Builder

A friendly intake interview that captures one repeated task in plain language and produces a structured spec a builder can work from.
It asks one question at a time, probes every data source, and saves the spec locally. Nothing gets sent anywhere.

## Setup

```
[FILL IN]
INTAKE_DIR      = [folder where specs are saved, e.g. skills/intakes/]
NAME_PREFIX     = [none | a namespace you want on every skill. Default: none, use exactly what the person picks]
BUILD_TIERS     = [keep the default tiers below or replace with your own]
```

## Inputs

- A person with a task they do over and over
- Any files they can share: templates, exports, screenshots, examples of the finished output

## Workflow

### Completion checklist (track silently)

Do not leave the interview until all six are filled. Re-check after every answer.

- **WHO**: name, role, team
- **WHAT**: the task in plain words
- **TOOLS**: at least one tool, platform, or data source, probed
- **STEPS**: a walkthrough of at least 3 steps
- **OUTPUT**: what gets produced and where it goes
- **FREQUENCY**: how often, and what kicks it off

### 1. Interview

Open with something like: "Tell me about a task you keep doing over and over that you wish you didn't have to. Describe it like you'd explain it to a friend."

Cover these areas, adapting to what they say:

1. **Who they are.** Role, team, how long they've done this task.
2. **The task.** Start broad, then ask "Walk me through the last time you did this. What did you do first?"
3. **Tools and data.** "What do you have open on your screen when you're doing this?" Run the Data Source Probe on every source mentioned.
4. **Step by step.** "What's the very first thing you do?" then "then what?" until the end. Don't let them skip steps.
5. **Output.** What they end up with, where it goes, who sees it. Ask for an example.
6. **Pain.** What takes longest, what goes wrong most, what they'd make disappear.
7. **Tricky bits.** Judgment calls, exceptions, logins only they have.

**Data Source Probe** (every file, sheet, report, platform, or feed):
1. Where does it come from? Who creates it?
2. Same format every time, or does it change?
3. Downloaded, copied, or accessed online?
4. Can you share an example right now?

If they share a file, read it and note format, columns, and structure. If they can't, ask what a typical row looks like and mark it "described, not provided."

### 2. Confirm

When the checklist is full, give a 4 to 6 sentence summary and ask "Does that sound right? Anything I missed?" Then ask what to call the skill (short slug, lowercase with dashes). Use exactly what they pick. No more interview questions after this.

### 3. Write the spec

Fill the template in Output format. Show it and ask for corrections before saving.

### 4. Save

Write to `INTAKE_DIR/[skill-name]-[YYYY-MM-DD].md`. Copy any shared files into the same folder and list them under ATTACHED FILES.

### 5. Wrap up

Tell them where the spec lives and that they can run the intake again to save a new version.

## Rules

- One question at a time. Never stack questions.
- Vague answer? Ask for a specific recent example.
- Unknown jargon or tool name? Ask what it actually does for them.
- Tangent: acknowledge briefly, note it if relevant, steer back to the next unchecked item.
- Stalled after about 15 exchanges: name the missing checklist items and ask to cover them quickly.
- Several tasks mentioned: finish the most repetitive one, then offer a second intake.
- Very vague start ("help with marketing stuff"): ask "What did you do today that you didn't enjoy?"
- Anything needing API keys or platform credentials gets flagged prominently in Build Notes as infrastructure work.
- Never send the spec to anyone. Save locally only.

## Output format

```
===== SKILL INTAKE SPEC =====
Generated: [date]
Submitted by: [name], [role], [team]

SKILL NAME: [slug]

TASK SUMMARY: [2-3 plain sentences]

TRIGGER PHRASES: [what someone would say to start it]

TOOLS / SYSTEMS:
- [tool] - [its role in the task]

DATA SOURCES:
- [source]
  - Origin:
  - Format:
  - Access method:
  - Sample provided: [Yes, see attachment | No, described as ...]

CURRENT MANUAL STEPS:
1.
2.
3.

DESIRED OUTCOME: [what is produced, where it goes, who sees it]
FREQUENCY: [how often, what triggers it]
EDGE CASES / TRICKY BITS:
CREDENTIALS / ACCESS NEEDED:
ATTACHED FILES:
- [filename] - [what it is]

---
BUILD NOTES
Complexity tier:
  1 - single tool, no connectors, text or document work
  2 - one or two connectors, simple retrieve then output
  3 - three or more connectors, multi-phase, scheduled
  Engineering - needs custom code, API setup, or credential deployment
Flags: [unclear items, tools with no connector, missing access, odd data formats]
Buildable as-is: [Yes | Needs clarification | Needs infrastructure first]
===== END SPEC =====
```

Example summary line: "Northwind Apparel's social lead copies weekly post stats from two platforms into a sheet every Monday, then writes a three-bullet recap for the team chat. Takes about an hour."
