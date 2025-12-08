# CivicSignals – A WordPress Storytelling System for Public Sector Digital Modernization

A modern block theme showcasing how WordPress can power digital transformation in government and public sector organizations. Built with Full Site Editing, custom content models, and storytelling patterns designed for content editors.

---

## Description

**CivicSignals** is a WordPress block theme that demonstrates enterprise-level WordPress development for the public sector. The theme provides a complete storytelling system where federal agencies can document their digital modernization journeys—from problem discovery through measurable impact.

This project serves as a portfolio piece to demonstrate alignment with enterprise and public sector WordPress work, showcasing:

- **Block theme architecture** for modern WordPress development
- **Custom content modeling** for complex storytelling needs
- **Accessible design patterns** meeting WCAG 2.1 AA standards
- **Content editor workflows** optimized for non-technical teams
- **Public sector focus** with government-appropriate design and functionality

---

## Key Features

### Block Theme Architecture
- Full Site Editing (FSE) support
- `theme.json` configuration for global styles and settings
- Block templates and template parts
- Block patterns for reusable content components

### Custom Content Model
- **Custom Post Type: `story`**
  - Supports title, editor, excerpt, thumbnail, custom fields, revisions
  - Public with archive support
  - REST API enabled for headless possibilities

- **Custom Taxonomies:**
  - `audience` (non-hierarchical): citizen, content-editor, leadership
  - `theme` (hierarchical): accessibility, performance, modernization, governance
  - Both fully REST API enabled

### Storytelling Patterns
Pre-built block patterns for content editors:
- **Chapter Introduction** — Hero sections with overline, heading, and narrative
- **Persona Scene** — Two-column layouts featuring user personas and quotes
- **Impact Metrics** — Before/after KPI cards showcasing measurable results

### Scrollytelling Home Page
A narrative-driven front page featuring:
- Chapter-based storytelling structure
- Hero sections with gradient backgrounds
- Character introductions
- Discovery & audit timeline
- Dynamic story showcase via query loops
- Impact metrics visualization
- Accessibility highlights
- Call-to-action sections

### Accessibility & Performance
- Semantic HTML structure with proper heading hierarchy
- ARIA landmarks and labels
- Keyboard navigation support
- WCAG 2.1 AA color contrast compliance
- Responsive design patterns
- Optimized block markup for performance

---

## Tech Stack

- **WordPress:** 6.0+ (Full Site Editing required)
- **PHP:** 7.4+
- **Block Editor:** Gutenberg (native WordPress blocks)
- **Theme Type:** Block theme (theme.json-based)
- **No Build Process:** Pure WordPress, no compilation required

---

## Installation

### 1. Install the Theme

1. Upload the `civicsignals` folder to your WordPress installation:
   ```
   wp-content/themes/civicsignals/
   ```

2. Or, if using WP-CLI:
   ```bash
   wp theme install /path/to/civicsignals --activate
   ```

### 2. Activate the Theme

1. Navigate to **Appearance → Themes** in WordPress admin
2. Find "CivicSignals" and click **Activate**

### 3. Initial Setup

1. **Create Stories:**
   - Navigate to **Stories → Add New**
   - The custom post type will be available immediately after activation

2. **Set Up Taxonomies:**
   - While editing a Story, you'll see **Audiences** and **Themes** in the right sidebar
   - Add terms like "citizen", "content-editor" (Audiences) and "accessibility", "performance" (Themes)

3. **Customize Templates:**
   - Go to **Appearance → Editor** to customize templates using the Site Editor
   - Templates are fully editable: `templates/front-page.html`, `templates/single-story.html`, etc.

---

## Content Editor Workflow

### Creating a Story

1. **Navigate to Stories → Add New**

2. **Enter Story Details:**
   - **Title:** Enter the story title (e.g., "Modernizing the Benefits Portal")
   - **Excerpt:** Write a short subtitle/summary (appears below the title on single story pages)
   - **Featured Image:** Upload a hero image for the story

3. **Assign Taxonomies:**
   - **Audiences:** Select relevant audiences (e.g., "citizen", "content-editor")
   - **Themes:** Select topics/themes (e.g., "accessibility", "modernization")

4. **Build the Story Content:**
   - In the editor, click the **+ (Inserter)** button
   - Navigate to pattern categories:
     - **CivicSignals Chapters** — for chapter introduction patterns
     - **CivicSignals Scenes** — for persona scenes and impact metrics
   - Insert patterns as needed:
     - Start with "Chapter Introduction" for your opening
     - Add "Persona Scene" patterns to introduce user personas
     - Use "Impact Metrics" to showcase before/after results
   - Customize the pattern content directly in the editor

5. **Preview & Publish:**
   - Use **Preview** to see how the story looks
   - Click **Publish** when ready

### Using Block Patterns

Patterns are reusable content blocks that maintain consistent design:

- **To insert:** Click **+ → Patterns → CivicSignals Chapters** (or **Scenes**)
- **To customize:** Click on any pattern block and edit text directly
- **To modify:** All patterns use standard WordPress blocks and can be fully customized

---

## Why This Project for Lone Rock Point?

This project directly aligns with Lone Rock Point's core focus areas:

### Enterprise / Public Sector WordPress
- Demonstrates understanding of government website requirements
- Showcases custom content modeling for complex organizational needs
- Reflects awareness of public sector constraints and opportunities

### Digital Storytelling Systems
- Provides a complete storytelling framework with custom post types and taxonomies
- Offers reusable patterns that enable content editors to build narratives without code
- Includes scrollytelling homepage demonstrating narrative-driven design

### Block Themes + Gutenberg
- Built entirely as a modern block theme using Full Site Editing
- Leverages `theme.json` for global styles and design tokens
- Showcases advanced block pattern development for content teams
- Demonstrates understanding of the WordPress block editor ecosystem

### Accessibility and Performance
- Implements WCAG 2.1 AA standards throughout
- Uses semantic HTML and proper ARIA landmarks
- Optimized block markup for performance
- Keyboard navigation and screen reader considerations built-in

### Portfolio Demonstration
This theme serves as a tangible example of:
- Modern WordPress development practices
- Understanding of public sector digital needs
- Ability to create maintainable, editor-friendly solutions
- Technical competency with block themes and Full Site Editing

---

## File Structure

```
civicsignals/
├── style.css                 # Theme header and metadata
├── functions.php             # Theme setup and includes
├── theme.json                # Global styles and settings
├── templates/                # Block templates
│   ├── index.html
│   ├── front-page.html       # Scrollytelling homepage
│   └── single-story.html     # Story single template
├── parts/                    # Template parts
│   ├── header.html
│   └── footer.html
├── patterns/                 # Block patterns (if any)
├── inc/                      # PHP includes
│   ├── post-types.php        # Story CPT registration
│   ├── taxonomies.php        # Audience & Theme taxonomies
│   └── block-patterns.php    # Pattern registrations
└── assets/                   # Static assets
    └── js/
        └── accessibility.js  # Accessibility enhancements
```

---

## Development Notes

### Customization Points

- **Colors & Typography:** Edit `theme.json` under `settings.color.palette` and `settings.typography.fontSizes`
- **Templates:** All templates are in `templates/` and fully editable via Site Editor
- **Patterns:** Modify patterns in `inc/block-patterns.php` or via Site Editor
- **Related Stories:** The query filter in `functions.php` finds stories sharing theme terms

### Extending the Theme

- Add new block patterns in `inc/block-patterns.php`
- Create additional templates in `templates/` following block template format
- Customize query loops using the `query_loop_block_query_vars` filter
- Add template parts in `parts/` and reference them with `wp:template-part`

---

## License

GNU General Public License v2 or later

---

## Credits

**Theme:** CivicSignals  
**Author:** Paul Miranda  
**Purpose:** Portfolio project for Lone Rock Point  
**Focus:** Enterprise WordPress, Public Sector, Block Themes, Accessibility

---

## Questions?

For questions about this theme or WordPress development inquiries, contact Lone Rock Point.

