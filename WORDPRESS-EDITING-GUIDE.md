# WordPress Editing Guide for CivicSignals

This guide explains how to edit **everything** in the CivicSignals theme using WordPress admin interface.

## ✅ What's Fully Editable in WordPress

### 1. **Front Page Template** (Appearance → Editor → Templates → Front Page)
- ✅ **Hero Section** - Edit heading, subtitle, buttons
- ✅ **All Chapters** - Edit chapter labels, titles, content
- ✅ **Metrics** - Edit metric values and labels
- ✅ **Persona Cards** - Edit all persona content
- ✅ **Timeline Items** - Edit timeline labels and descriptions
- ✅ **Query Loops** - Configure which stories to display
- ✅ **All Text Content** - Everything is editable via blocks

**How to Edit:**
1. Go to **Appearance → Editor** (Full Site Editor)
2. Click **Templates → Front Page**
3. Click any text or block to edit
4. Use the block sidebar to change styling, colors, spacing
5. Click **Save** when done

### 2. **Template Parts** (Appearance → Editor → Patterns → Template Parts)

#### Header (`parts/header.html`)
- ✅ Site title
- ✅ Navigation menu (create/edit in **Appearance → Menus**)
- ✅ Header CTA button

**How to Edit:**
1. Go to **Appearance → Editor → Patterns → Template Parts → Header**
2. Click any element to edit
3. To edit menu: **Appearance → Menus**

#### Footer (`parts/footer.html`)
- ✅ Footer text
- ✅ Footer links (GitHub, Demo Story, credits)

**How to Edit:**
1. Go to **Appearance → Editor → Patterns → Template Parts → Footer**
2. Click any text or link to edit

### 3. **Story Posts** (Stories → Add New / Edit)
- ✅ Story title
- ✅ Story excerpt (used as hero subtitle)
- ✅ Story content (use block editor)
- ✅ Featured image
- ✅ Audience taxonomy
- ✅ Theme taxonomy
- ✅ Full block editor - add any blocks, patterns, etc.

**How to Edit:**
1. Go to **Stories → Add New** or **Stories → All Stories**
2. Edit title, excerpt, content in the block editor
3. Set featured image in the right sidebar
4. Assign Audiences and Themes in the right sidebar
5. Use block patterns from **+ → Patterns → CivicSignals Chapters/Scenes**

### 4. **Block Patterns** (Available in Block Inserter)
Three pre-built patterns available:
- ✅ **Chapter Introduction** - For chapter sections
- ✅ **Persona Scene** - For user personas with quotes
- ✅ **Impact Metrics** - For before/after metrics

**How to Use:**
1. Click **+ (Inserter)** in the block editor
2. Go to **Patterns → CivicSignals Chapters** or **CivicSignals Scenes**
3. Click a pattern to insert
4. Customize the content

### 5. **Global Styles** (Appearance → Editor → Styles)
- ✅ Colors - Edit the entire color palette
- ✅ Typography - Change fonts, sizes, weights
- ✅ Spacing - Adjust spacing scale
- ✅ Layout - Change content width, spacing

**How to Edit:**
1. Go to **Appearance → Editor → Styles**
2. Click **Colors**, **Typography**, etc.
3. Make changes and click **Save**

### 6. **Navigation Menus** (Appearance → Menus)
- ✅ Primary menu items
- ✅ Menu structure

**How to Edit:**
1. Go to **Appearance → Menus**
2. Create or edit the Primary menu
3. Add pages, stories, custom links
4. Assign to "Primary Menu" location

### 7. **Archive Templates**
- ✅ **Story Archive** (`templates/archive-story.html`)
- ✅ **Theme Archive** (`templates/taxonomy-theme.html`)
- ✅ **Audience Archive** (`templates/taxonomy-audience.html`)

**How to Edit:**
1. Go to **Appearance → Editor → Templates**
2. Find and edit the template you want

### 8. **Single Story Template** (`templates/single-story.html`)
- ✅ Hero section (title, excerpt, taxonomy chips)
- ✅ Story content area
- ✅ Related stories query configuration

**How to Edit:**
1. Go to **Appearance → Editor → Templates → Single Story**
2. Edit the template structure
3. Configure query blocks in the sidebar

## 🎨 Editing Best Practices

### Using the Block Editor
- All content uses WordPress blocks - click any block to edit
- Use block patterns for consistent styling
- Use the block sidebar (right panel) for styling options
- Use the **+** button to add new blocks or patterns

### Using Full Site Editor
- **Appearance → Editor** gives access to all templates
- Templates provide structure; all content is editable
- Save changes frequently
- Use **View** to preview changes

### Content Editing Workflow
1. **Stories**: Create/edit in **Stories** admin
2. **Patterns**: Use pre-built patterns for consistency
3. **Templates**: Adjust structure in **Appearance → Editor**
4. **Styles**: Customize globally in **Appearance → Editor → Styles**

## 🔧 Advanced Editing

### Custom CSS (Optional)
- Go to **Appearance → Customize → Additional CSS**
- Add custom CSS overrides
- Or edit `style.css` directly (not recommended for non-developers)

### Adding Custom Blocks
- Install block plugins from **Plugins → Add New**
- Custom blocks will appear in the block inserter

### Modifying Patterns (Developers)
- Edit files in `/patterns/` directory
- Patterns are PHP-registered in `inc/block-patterns.php`

## 📝 Quick Reference

| What to Edit | Where to Go |
|-------------|-------------|
| Front page content | Appearance → Editor → Templates → Front Page |
| Header/Footer | Appearance → Editor → Patterns → Template Parts |
| Story content | Stories → Add New/Edit |
| Global colors/fonts | Appearance → Editor → Styles |
| Navigation menu | Appearance → Menus |
| Block patterns | Block Inserter (+) → Patterns |
| Story archives | Appearance → Editor → Templates → Archive Story |

## ✅ Verification Checklist

After installation, verify:
- [ ] Can edit front page in Site Editor
- [ ] Can create/edit stories in Stories admin
- [ ] Can assign audiences and themes to stories
- [ ] Block patterns appear in block inserter
- [ ] Header/footer editable in Template Parts
- [ ] Navigation menu editable in Menus
- [ ] Global styles editable in Styles panel
- [ ] All templates accessible in Editor → Templates

## 🆘 Troubleshooting

**Can't see Site Editor?**
- Ensure WordPress 6.0+ is installed
- Theme must be activated
- User must have editor permissions

**Patterns not showing?**
- Clear browser cache
- Check that theme is fully activated
- Verify `inc/block-patterns.php` is loaded

**Changes not appearing?**
- Clear cache (if using caching plugin)
- Hard refresh browser (Ctrl+F5 / Cmd+Shift+R)
- Check if changes were saved

---

**Remember:** Everything in CivicSignals is built with WordPress blocks, which means everything is editable through the WordPress admin interface. No code editing required!

