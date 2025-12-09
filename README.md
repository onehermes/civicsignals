<div align="center">

# 🌟 CivicSignals

### A WordPress Storytelling System for Public Sector Digital Modernization

*A modern block theme showcasing how WordPress powers digital transformation in government organizations*

![WordPress](https://img.shields.io/badge/WordPress-6.0+-blue?style=for-the-badge&logo=wordpress)
![PHP](https://img.shields.io/badge/PHP-7.4+-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Block Theme](https://img.shields.io/badge/Block%20Theme-FSE-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-GPL%20v2+-green?style=for-the-badge)
![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-orange?style=for-the-badge)

</div>

---

## 📖 Overview

**CivicSignals** is an enterprise-level WordPress block theme designed specifically for public sector organizations. It transforms complex digital modernization journeys into compelling, accessible narratives that citizens and stakeholders can understand and engage with.

### ✨ What Makes CivicSignals Special

🎯 **Storytelling-First Design** — Chapter-based narrative structure with automatic content formatting  
🎨 **DaVincii-Inspired Aesthetics** — Bold typography, minimal design, large background chapter numbers  
🖱️ **Premium Interactions** — Custom cursor, reactive particle system, smooth parallax effects  
♿ **Accessibility Built-In** — WCAG 2.1 AA compliant with semantic HTML and ARIA support  
📱 **Fully Responsive** — Beautiful on all devices, from mobile to desktop  
⚡ **Performance Optimized** — Pure WordPress, no build process, lightning fast

---

## 🎯 Key Features

### 🏗️ Modern Block Theme Architecture

- ✅ **Full Site Editing (FSE)** — Complete control via Site Editor
- ✅ **theme.json Configuration** — Global styles, colors, typography, spacing
- ✅ **Block Templates & Parts** — Fully customizable template system
- ✅ **Reusable Block Patterns** — Pre-built components for content editors

### 📚 Custom Content Model

**Custom Post Type: `story`**
- Title, editor, excerpt, featured image
- Custom fields and revisions support
- Public archive with REST API enabled
- Automatic chapter number detection and formatting

**Custom Taxonomies:**
- `audience` (non-hierarchical) — Citizen, Content Editor, Leadership
- `theme` (hierarchical) — Accessibility, Performance, Modernization, Governance
- Both fully REST API enabled for headless possibilities

### 🎨 Storytelling Patterns

Pre-built block patterns that content editors can use instantly:

| Pattern | Description |
|---------|-------------|
| **Chapter Introduction** | Hero sections with overline text, large headings, and narrative lede |
| **Persona Scene** | Two-column layouts featuring user personas with quotes and pain points |
| **Impact Metrics** | Before/after KPI cards showcasing measurable transformation results |

### 📖 Automatic Content Structuring

**Smart JavaScript Detection:**
- ✨ Automatically extracts chapter numbers from headings (`Chapter 1` → shows background "1")
- 🎯 Structures personas with quotes, pain points, and narrative
- 📊 Formats metrics with proper typography
- 💬 Styles quotes with elegant borders and emphasis

### 🎭 Scrollytelling Front Page

A narrative-driven homepage experience featuring:

- **Chapter 0: Hero** — Bold statement with gradient background
- **Chapter 1: The Problem** — Metrics strip with key indicators
- **Chapter 2: The People** — Persona cards with real stories
- **Chapter 3: The Journey** — Timeline of discovery and transformation
- **Chapter 4: The System** — How the storytelling framework works
- **Chapter 5: Impact** — Featured stories and query loops
- **Chapter 6: CTA** — Call to action for engagement

### 🎨 Visual Design System

**Color Palette:**
- Deep space blue backgrounds (`#020b1f`)
- Primary teal accents (`#1e9fd7`)
- Warm yellow highlights (`#ffcc4d`)
- High-contrast text for accessibility

**Typography:**
- **Inter** font family for modern, readable text
- Responsive font sizes with clamp() for scalability
- Careful letter-spacing and line-height for optimal readability

**Spacing & Layout:**
- 120px chapter gaps for dramatic separation
- 1120px max-width shell for comfortable reading
- Consistent spacing scale (XS to XXL)

### ♿ Accessibility & Performance

- ✅ Semantic HTML5 structure
- ✅ ARIA landmarks and labels
- ✅ Keyboard navigation support
- ✅ Screen reader optimizations
- ✅ WCAG 2.1 AA color contrast
- ✅ `prefers-reduced-motion` support
- ✅ High contrast mode compatibility
- ✅ Optimized block markup

---

## 🚀 Quick Start

### Installation

**Option 1: Manual Upload**
1. Download or clone this repository
2. Upload the `civicsignals` folder to:
   ```
   wp-content/themes/civicsignals/
   ```
3. Activate in **Appearance → Themes**

**Option 2: WP-CLI**
```bash
wp theme install /path/to/civicsignals --activate
```

### Initial Setup

Upon activation, the theme automatically:
- ✅ Registers the `story` custom post type
- ✅ Creates `audience` and `theme` taxonomies
- ✅ Sets up base taxonomy terms
- ✅ Creates demo content (if none exists)
- ✅ Configures navigation menu

**Manual Steps:**
1. Go to **Stories → Add New** to create your first story
2. Assign **Audiences** and **Themes** in the right sidebar
3. Use block patterns to build your narrative (see Content Editor Workflow below)

---

## 📝 Content Editor Workflow

### Creating Your First Story

#### Step 1: Create Story Post
1. Navigate to **Stories → Add New**
2. Enter a compelling **Title** (e.g., "Modernizing the Benefits Portal")
3. Add an **Excerpt** — this becomes your hero subtitle
4. Upload a **Featured Image** for visual impact

#### Step 2: Assign Categories
- **Audiences:** Who is this story for? (Citizen, Content Editor, Leadership)
- **Themes:** What topic does it cover? (Accessibility, Performance, Modernization, Governance)

#### Step 3: Build Your Narrative

Use the block inserter (`+`) to add patterns:

**For Chapter Headings:**
```
Simply type: "Chapter 1 - The Problem"
JavaScript automatically:
  ✓ Extracts the number (1)
  ✓ Shows large background "1"
  ✓ Formats as proper chapter section
```

**Using Block Patterns:**
1. Click **+ (Inserter)** → **Patterns**
2. Choose **CivicSignals Chapters** or **CivicSignals Scenes**
3. Insert patterns like:
   - **Chapter Introduction** — for section headers
   - **Persona Scene** — for user stories
   - **Impact Metrics** — for results

#### Step 4: Auto-Formatting Magic

Just write naturally — the JavaScript handles:
- **Personas:** "Maria – Working Parent" → styled persona card
- **Quotes:** "I just want..." → elegant quote block
- **Pain Points:** List after "Pain Points:" → formatted list
- **Metrics:** "Task Success: 62% → 94%" → metric card

#### Step 5: Preview & Publish
- Click **Preview** to see the formatted story
- The automatic structuring appears on the frontend
- **Publish** when ready!

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **WordPress** | 6.0+ | Core CMS platform |
| **PHP** | 7.4+ | Server-side logic |
| **Block Editor** | Native Gutenberg | Content editing |
| **Theme Type** | Block Theme (FSE) | Modern theme architecture |
| **CSS** | Custom Properties | Design tokens |
| **JavaScript** | Vanilla ES6+ | Interactive features |

**No Build Process Required** — Pure WordPress, ready to use!

---

## 📁 File Structure

```
civicsignals/
│
├── 📄 style.css              # Theme metadata & global styles
├── 📄 functions.php          # Theme setup & enqueues
├── 📄 theme.json             # Global design tokens & settings
├── 📄 README.md              # This file
│
├── 📁 templates/             # Block templates
│   ├── index.html            # Default template
│   ├── front-page.html       # Scrollytelling homepage
│   └── single-story.html     # Story single page
│
├── 📁 parts/                 # Template parts
│   ├── header.html           # Site header
│   └── footer.html           # Site footer
│
├── 📁 inc/                   # PHP includes
│   ├── post-types.php        # Story CPT registration
│   ├── taxonomies.php        # Audience & Theme taxonomies
│   ├── block-patterns.php    # Pattern registrations
│   └── setup-activate.php    # Auto-setup on activation
│
└── 📁 assets/                # Static assets
    └── js/
        ├── cursor-interaction.js    # Custom cursor & particles
        └── chapter-numbers.js       # Auto-content structuring
```

---

## 🎨 Customization Guide

### Colors & Typography

Edit `theme.json` to customize:

```json
{
  "settings": {
    "color": {
      "palette": [
        {
          "slug": "primary",
          "color": "#1e9fd7",
          "name": "Primary"
        }
        // Add your colors...
      ]
    },
    "typography": {
      "fontFamilies": [
        {
          "fontFamily": "\"Your Font\", sans-serif",
          "slug": "your-font"
        }
      ]
    }
  }
}
```

### Templates

All templates are editable via **Appearance → Editor**:
- Modify block markup directly in the Site Editor
- Changes are saved to database (exportable as template parts)
- Fully visual editing experience

### Patterns

Customize patterns:
- Edit in `inc/block-patterns.php` for code-level changes
- Or modify via Site Editor: **Patterns → Manage patterns**

---

## 🎯 Why CivicSignals for Enterprise WordPress?

### Aligned with Industry Best Practices

✅ **Modern Architecture** — Built with latest WordPress block theme standards  
✅ **Accessibility First** — WCAG 2.1 AA compliance throughout  
✅ **Editor-Friendly** — Non-technical teams can create beautiful content  
✅ **Maintainable Code** — Clean, documented, WordPress-native  
✅ **Performance Optimized** — No build process, fast loading  
✅ **Public Sector Ready** — Government-appropriate design and functionality

### Perfect For

- 🏛️ Federal agencies documenting modernization projects
- 📊 Government programs showcasing impact metrics
- 👥 Public sector teams telling citizen-centered stories
- 🎨 Agencies needing accessible, beautiful web presence
- 📖 Organizations requiring structured content workflows

---

## 🔧 Development

### Extending the Theme

**Add New Patterns:**
```php
// In inc/block-patterns.php
register_block_pattern('civicsignals/your-pattern', [
    'title' => 'Your Pattern Name',
    'content' => '<!-- wp:group ... -->',
]);
```

**Custom Query Filters:**
```php
// In functions.php
add_filter('query_loop_block_query_vars', 'your_custom_filter', 10, 2);
```

**Template Customization:**
- Create new templates in `templates/`
- Add template parts in `parts/`
- Reference with `wp:template-part` block

---

## 📊 Project Alignment

This theme demonstrates:

### Enterprise WordPress Expertise
- Understanding of government website requirements
- Custom content modeling for complex needs
- Public sector constraints and opportunities

### Digital Storytelling Systems
- Complete narrative framework
- Reusable patterns for content teams
- Scrollytelling homepage design

### Block Themes & Gutenberg
- Modern Full Site Editing implementation
- Advanced `theme.json` usage
- Block pattern development expertise

### Accessibility & Performance
- WCAG 2.1 AA standards implementation
- Semantic HTML and ARIA patterns
- Optimized performance strategies

---

## 📄 License

**GNU General Public License v2 or later**

This theme, like WordPress, is licensed under the GPL. Use it freely, modify it, and share it.

---

## 👤 Credits

**Theme:** CivicSignals  
**Author:** Paul Miranda  
**Purpose:** Portfolio demonstration for enterprise WordPress work  
**Focus Areas:** Public Sector, Block Themes, Accessibility, Digital Storytelling

---

## 🤝 Support

For questions or WordPress development inquiries, reach out to Lone Rock Point.

---

<div align="center">

**Built with ❤️ for public sector digital transformation**

*Turning modernization journeys into compelling narratives*

</div>
