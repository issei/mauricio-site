# SPEC — Cognitive Editorial Refactoring & Layout Architecture
## Project: `devin.html`

Version: 1.0  
Role: Principal Editorial Systems Designer + UX Architecture Refactor  
Scope: Structural HTML refinement + CSS layout system modernization  
Non-Scope: Visual branding, glow systems, color atmosphere, aurora effects, content rewriting

---

# 1. Core Mission

Transform the current experience from:

> “a long technical document adapted into a webpage”

into:

> “a premium editorial manifesto with cinematic pacing, cognitive clarity, and mobile-first readability.”

The refactor must preserve all original content while dramatically improving:

- readability
- cognitive scanning
- narrative pacing
- semantic hierarchy
- editorial rhythm
- responsive behavior
- perceptual sophistication

The final experience should feel closer to:
- Linear
- Stripe Docs
- Vercel
- Gemini editorial redesign
- modern long-form product storytelling

without becoming:
- marketing-heavy
- animation-heavy
- visually chaotic
- overengineered

---

# 2. Critical Constraints

## 2.1 Content Integrity
DO NOT:
- rewrite text
- summarize text
- remove paragraphs
- modify titles
- alter terminology
- reinterpret meaning

Allowed:
- wrapping sections
- grouping semantic blocks
- adding utility classes
- inserting structural containers
- creating semantic layout wrappers
- progressive disclosure wrappers

---

# 3. Architectural Objectives

## 3.1 Primary UX Goals

### Reduce Cognitive Fatigue
The page must no longer feel:
- endless
- dense
- oppressive
- mechanically stacked

The user should perceive:
- breathing room
- narrative flow
- progressive comprehension
- intentional pacing

---

## 3.2 Increase Scannability

Within 3–5 seconds of entering any section, users must understand:
- what this section is about
- what matters most
- what is optional
- where to focus attention

---

## 3.3 Mobile-First Narrative

The canonical experience is mobile vertical reading.

Desktop is an enhancement layer.

Never design:
- desktop-first grids compressed into mobile
- multi-column technical reading on narrow screens
- dense horizontal scanning systems

---

## 3.4 Editorial Cadence

The page must alternate rhythmically between:

- dense systems
- narrative breathing
- technical frameworks
- reflective transitions
- execution mechanics

Avoid continuous uninterrupted density.

---

# 4. Narrative Topology

The page should structurally feel like:

```text
INTRODUCTION
↓
CONTEXT
↓
TENSION
↓
DECOMPOSITION
↓
SYSTEMIZATION
↓
EXECUTION
↓
SYNTHESIS
↓
CONCLUSION
````

Each major section transition must feel intentional.

Never allow:

* arbitrary stacking
* monotonous section rhythm
* visually identical sections back-to-back

---

# 5. Density Classification System

Before refactoring, classify every section.

---

## 5.1 LOW DENSITY

Characteristics:

* short paragraphs
* manifesto statements
* transitions
* quotes
* emotional framing
* conceptual openings

Layout Rules:

* more whitespace
* larger typography
* narrow content width
* minimal UI chrome

---

## 5.2 MEDIUM DENSITY

Characteristics:

* explanatory narrative
* contextual analysis
* commentary
* storytelling
* architectural explanation

Layout Rules:

* standard reading width
* moderate spacing rhythm
* balanced hierarchy

---

## 5.3 HIGH DENSITY

Characteristics:

* frameworks
* matrixes
* playbooks
* technical enumerations
* execution systems
* process structures
* operational models

Layout Rules:

* stronger grouping
* explicit hierarchy
* structural segmentation
* visual boundaries
* optional progressive disclosure

---

# 6. Vertical Rhythm System

Implement a global spacing architecture.

---

## 6.1 Root Spacing Scale

```css
:root {
  --space-1: clamp(0.5rem, 0.4rem + 0.2vw, 0.75rem);
  --space-2: clamp(1rem, 0.8rem + 0.3vw, 1.25rem);
  --space-3: clamp(1.5rem, 1.2rem + 0.5vw, 2rem);
  --space-4: clamp(2rem, 1.8rem + 0.8vw, 3rem);
  --space-5: clamp(3rem, 2.5rem + 1vw, 5rem);
  --space-6: clamp(5rem, 4rem + 2vw, 8rem);
}
```

---

## 6.2 Rhythm Rules

### Internal spacing

Spacing INSIDE modules should remain compact and cohesive.

### External spacing

Spacing BETWEEN semantic modules must be significantly larger.

Target perception:

* clear section boundaries
* cognitive reset points
* narrative pacing

---

## 6.3 Cadence Constraints

Avoid:

* more than 5 uninterrupted paragraphs
* more than 3 consecutive card systems
* more than 2 dense frameworks without narrative interruption

Mandatory:

* breathing space insertion
* editorial separators
* cadence resets

---

# 7. Fluid Typography System

Implement a fully fluid typographic architecture.

---

# 7.1 Typography Rules

ALL typography must use:

* `clamp()`
* fluid scaling
* optical consistency

Never use:

* fixed pixel typography
* abrupt responsive jumps

---

# 7.2 Reading Width

Narrative text must never exceed:

```css
max-width: 65ch;
```

Preferred ranges:

* 58ch–65ch narrative
* 45ch manifesto/lead blocks

---

# 7.3 Hierarchy System

Differentiate clearly between:

| Type              | Visual Weight |
| ----------------- | ------------- |
| Hero Headlines    | Maximum       |
| Section Headlines | Strong        |
| Core Insights     | Elevated      |
| Narrative Body    | Neutral       |
| Technical Details | Subdued       |
| Labels/Meta       | Minimal       |

---

# 7.4 Lead Paragraphs

Narrative sections must style the first paragraph as editorial lead copy.

Requirements:

* larger font size
* slightly stronger weight
* improved spacing
* enhanced readability

Never over-stylize.

---

# 8. Cognitive Chunking

Break dense sections into cognitively digestible units.

---

# 8.1 Chunking Rules

High-density content must be segmented using:

* spacing
* grouping
* visual rhythm
* semantic wrappers
* section dividers

Avoid:

* uninterrupted dense walls
* continuous card repetition
* large monolithic text structures

---

# 8.2 Structural Alternation

Preferred rhythm:

```text
Narrative
↓
Framework
↓
Breathing Space
↓
Insight
↓
Execution
```

Avoid:

```text
Cards
↓
Cards
↓
Cards
↓
Cards
```

---

# 9. Progressive Disclosure System

Used ONLY for:

* auxiliary technical details
* repetitive enumerations
* long operational lists
* implementation-heavy sections

NEVER collapse:

* narrative openings
* key insights
* manifesto content
* conclusions

---

# 9.1 Disclosure Mechanics

Preferred methods:

* CSS fade masks
* expandable sections
* lightweight disclosure toggles

Avoid:

* modal interactions
* hidden essential content
* aggressive truncation

---

# 9.2 Fade Mask Pattern

Example:

```css
mask-image: linear-gradient(
  to bottom,
  rgba(0,0,0,1) 70%,
  rgba(0,0,0,0) 100%
);
```

---

# 10. Mobile Layout Architecture

The mobile experience is the primary design target.

---

# 10.1 Grid Collapse Rules

At mobile widths:

* collapse multi-column systems
* prioritize vertical flow
* preserve readability over density

Preferred:

```css
grid-template-columns: 1fr;
```

---

# 10.2 Horizontal Scroll Governance

Horizontal snap scrolling is allowed ONLY for:

* homogeneous card systems
* repetitive frameworks
* ≤ 6 items

NEVER use horizontal scrolling for:

* narrative reading
* long-form content
* explanatory systems

---

# 10.3 Touch Rhythm

Maintain:

* large touch spacing
* clear boundaries
* predictable stacking
* strong vertical rhythm

Avoid:

* compressed cards
* edge collisions
* text cramping

---

# 11. Semantic Card Architecture

Prevent infinite-card fatigue.

Differentiate card systems semantically.

---

# 11.1 Insight Cards

Characteristics:

* airy
* typographic
* quote-like
* reflective

Should feel:

* editorial
* contemplative

---

# 11.2 Framework Cards

Characteristics:

* structured
* organized
* systematic

Should feel:

* operational
* precise
* scannable

---

# 11.3 Constraint / Warning Cards

Characteristics:

* bounded
* distinct
* visually separated

Use:

* structural borders
* spacing differentiation
* stronger containment

---

# 11.4 Execution Cards

Characteristics:

* terminal-like
* dense
* implementation-oriented

Should feel:

* technical
* precise
* operational

Distinct from narrative content.

---

# 12. Layout Governance Rules

Prevent entropy and overengineering.

---

# 12.1 Complexity Limits

Maximum allowed:

* 3 primary grid systems
* 2 card archetypes per section
* 1 dominant rhythm system per viewport

---

# 12.2 Structural Discipline

Prefer:

* reusable layout archetypes
* modular consistency
* predictable rhythm

Avoid:

* one-off layouts
* unique section mechanics
* nested complexity

---

# 12.3 Wrapper Discipline

Do not introduce:

* unnecessary containers
* deep nesting
* redundant abstractions

Every wrapper must improve:

* readability
* grouping
* cadence
* responsiveness

---

# 13. Visual Entropy Reduction

Reduce competing visual signals aggressively.

Prioritize:

* consistency
* predictability
* structural rhythm
* modular clarity

Avoid:

* excessive variation
* visual novelty for its own sake
* decorative complexity

The interface should feel:

* mature
* composed
* intentional

---

# 14. Motion Governance

Motion is secondary and minimal.

Allowed:

* soft fades
* subtle reveal
* atmospheric transitions
* restrained hover states

Forbidden:

* parallax
* exaggerated stagger
* marketing animations
* motion-heavy interactions

Motion should feel:

* editorial
* cinematic
* calm
* sparse

---

# 15. Accessibility Requirements

Maintain:

* semantic HTML
* keyboard accessibility
* readable contrast structure
* predictable focus states
* accessible disclosure interactions

Do not:

* hide critical content
* rely solely on hover
* create inaccessible collapsed systems

---

# 16. Performance Constraints

The refactor must remain lightweight.

Avoid:

* large JS frameworks
* layout thrashing
* animation-heavy systems
* excessive DOM complexity

Prefer:

* CSS-first solutions
* semantic HTML
* minimal JS

---

# 17. Final Quality Targets

The final experience should feel:

* editorial
* cinematic
* calm
* premium
* highly readable
* cognitively organized
* intentional
* structurally elegant

The user should experience:

* momentum
* clarity
* pacing
* comprehension
* narrative progression

NOT:

* fatigue
* compression
* chaos
* repetition
* endless scrolling density

```
