/**
 * Auto-detect and add chapter numbers to story content
 * Extracts exact chapter numbers from heading text and structures content properly
 */

(function() {
	'use strict';

	function extractChapterNumber(text) {
		if (!text) return null;
		
		// Try various patterns to find the chapter number
		// Pattern 1: "Chapter 1", "Chapter 2", etc. (case insensitive)
		let match = text.match(/chapter\s+(\d+)/i);
		if (match) {
			return parseInt(match[1], 10);
		}
		
		// Pattern 2: "Chapter 1 - Title" or "Chapter 1: Title"
		match = text.match(/chapter\s+(\d+)\s*[-–—:]/i);
		if (match) {
			return parseInt(match[1], 10);
		}
		
		// Pattern 3: Starts with number "1 - Title" or "1: Title"
		match = text.match(/^(\d+)\s*[-–—:]/);
		if (match) {
			return parseInt(match[1], 10);
		}
		
		return null;
	}

	function addChapterNumbers() {
		// Detect if we're on a single story page
		// WordPress adds various body classes: single-story, single-post-type-story, post-type-story, etc.
		const bodyClasses = document.body.className.split(' ');
		const isStoryPage = bodyClasses.some(cls => 
			cls.includes('story') && (cls.includes('single') || cls.includes('post-type'))
		) || window.location.pathname.includes('/story/');
		
		// Also check if the script is loaded (which only happens on story pages)
		// And check for the story content wrapper
		const storyContent = document.querySelector('.cs-story-content .wp-block-post-content');
		if (!storyContent && !isStoryPage) {
			return;
		}
		
		// If we have story content, proceed (script is only enqueued on story pages anyway)
		if (!storyContent) {
			return;
		}

		// Find all h2 headings in the content (not already inside a .cs-chapter)
		const headings = Array.from(storyContent.querySelectorAll('h2')).filter(h2 => {
			return !h2.classList.contains('cs-chapter-number') && 
			       !h2.closest('.cs-chapter');
		});

		if (headings.length === 0) {
			return;
		}

		headings.forEach((heading) => {
			const text = heading.textContent.trim();
			const chapterNumber = extractChapterNumber(text);
			
			// Only process if we found a valid chapter number
			if (chapterNumber === null) {
				return;
			}

			// Skip if already wrapped in a chapter structure
			if (heading.closest('.cs-chapter')) {
				return;
			}

			// Extract chapter title (everything after "Chapter X - " or "Chapter X: ")
			let chapterTitle = text;
			const titleMatch = text.match(/chapter\s+\d+\s*[-–—:]\s*(.+)/i);
			if (titleMatch && titleMatch[1]) {
				chapterTitle = titleMatch[1].trim();
			}

			// Store reference to parent and collect following elements before modifying DOM
			const parent = heading.parentNode;
			const followingElements = [];
			
			// Collect all following siblings until next H2
			let nextSibling = heading.nextSibling;
			while (nextSibling) {
				if (nextSibling.nodeType === 1 && nextSibling.tagName === 'H2') {
					break;
				}
				const temp = nextSibling.nextSibling;
				followingElements.push(nextSibling);
				nextSibling = temp;
			}
			
			// Create chapter wrapper
			const chapterWrapper = document.createElement('div');
			chapterWrapper.className = 'cs-chapter cs-chapter-auto';
			
			// Create background number element with the exact chapter number
			const chapterNumberEl = document.createElement('h2');
			chapterNumberEl.className = 'cs-chapter-number';
			chapterNumberEl.textContent = chapterNumber;
			chapterNumberEl.setAttribute('aria-hidden', 'true');
			
			// Create content wrapper
			const chapterContent = document.createElement('div');
			chapterContent.className = 'cs-chapter-content';
			
			// Create chapter label
			const chapterLabel = document.createElement('p');
			chapterLabel.className = 'cs-chapter-label';
			chapterLabel.textContent = `CHAPTER ${chapterNumber}`;
			
			// Create chapter title heading
			const newHeading = document.createElement('h2');
			newHeading.className = 'cs-chapter-title';
			newHeading.textContent = chapterTitle;
			
			// Insert structure before the heading
			parent.insertBefore(chapterWrapper, heading);
			chapterWrapper.appendChild(chapterNumberEl);
			chapterWrapper.appendChild(chapterContent);
			
			// Add label and new heading to content
			chapterContent.appendChild(chapterLabel);
			chapterContent.appendChild(newHeading);
			
			// Remove old heading
			heading.remove();
			
			// Move all collected elements into chapter-content
			followingElements.forEach(element => {
				if (element.nodeType === 1) {
					chapterContent.appendChild(element);
				}
			});
		});
	}

	/**
	 * Auto-structure story content: personas, quotes, pain points, metrics
	 */
	function structureStoryContent() {
		const storyContent = document.querySelector('.cs-story-content .wp-block-post-content');
		if (!storyContent) {
			return;
		}

		// Remove duplicate excerpts/titles
		const excerptBlocks = storyContent.querySelectorAll('.wp-block-post-excerpt');
		excerptBlocks.forEach(block => block.remove());

		// Structure persona sections (H3 with em dash or hyphen)
		const personaHeadings = Array.from(storyContent.querySelectorAll('h3')).filter(h3 => {
			if (h3.closest('.cs-persona-card')) return false;
			const text = h3.textContent.trim();
			return /^[A-Z][a-z]+\s*[–—\-]/.test(text);
		});

		personaHeadings.forEach(heading => {
			// Collect all content for this persona
			const parent = heading.parentNode;
			const personaElements = [];
			
			// Find the heading first
			personaElements.push({ type: 'heading', element: heading });
			
			// Collect following siblings until next H2 or H3 persona
			let nextSibling = heading.nextSibling;
			while (nextSibling) {
				if (nextSibling.nodeType === 1) {
					// Stop at next persona or chapter
					if (nextSibling.tagName === 'H2') {
						break;
					}
					if (nextSibling.tagName === 'H3' && /^[A-Z][a-z]+\s*[–—\-]/.test(nextSibling.textContent.trim())) {
						break;
					}
					personaElements.push({ type: 'content', element: nextSibling });
				}
				nextSibling = nextSibling.nextSibling;
			}

			// Create persona card structure
			const personaCard = document.createElement('div');
			personaCard.className = 'cs-persona-card cs-card-plain';
			
			const cardContent = document.createElement('div');
			cardContent.className = 'cs-persona-content';
			
			// Process heading: split name/role
			const headingText = heading.textContent.trim();
			const nameRoleMatch = headingText.match(/^([A-Z][a-z]+)\s*[–—\-]\s*(.+)$/);
			
			if (nameRoleMatch) {
				const name = nameRoleMatch[1];
				const role = nameRoleMatch[2];
				heading.innerHTML = `${name} – <em>${role}</em>`;
			}
			cardContent.appendChild(heading);

			// Process content in order: Quote, Pain Points, Narrative
			let quoteEl = null;
			let painPointsLabel = null;
			let painPointsList = null;
			const narrativeParagraphs = [];

			personaElements.forEach(item => {
				if (item.type === 'heading') return;
				
				const element = item.element;
				const tagName = element.tagName;
				const text = element.textContent.trim();
				const html = element.innerHTML || '';

				// Check for Quote (can be "**Quote:** "text" or just "text")
				if (tagName === 'P' && !quoteEl) {
					if (/^\*\*Quote:\*\*\s*/.test(text) || /Quote:\s*"/i.test(text)) {
						// Extract quote text
						const quoteMatch = text.match(/Quote:\s*"([^"]+)"/i) || text.match(/"([^"]+)"/);
						if (quoteMatch && quoteMatch[1]) {
							quoteEl = document.createElement('p');
							quoteEl.className = 'cs-quote';
							quoteEl.textContent = quoteMatch[1];
							cardContent.appendChild(quoteEl);
							return;
						}
					} else if (/^"[^"]+"$/.test(text) && text.length < 200 && !text.includes('**')) {
						// Standalone quote
						quoteEl = element;
						element.className = 'cs-quote';
						cardContent.appendChild(element);
						return;
					}
				}

				// Check for Pain Points label
				if (tagName === 'P' && /^Pain\s+Points?:?\s*$/i.test(text)) {
					painPointsLabel = element;
					element.className = 'cs-pain-points-label';
					cardContent.appendChild(element);
					return;
				}

				// Check for Pain Points list
				if ((tagName === 'UL' || tagName === 'OL') && painPointsLabel) {
					painPointsList = element;
					element.className = 'cs-pain-points-list';
					cardContent.appendChild(element);
					return;
				}

				// Everything else is narrative text
				if (tagName === 'P' && text.length > 50) {
					element.className = 'cs-body-text';
					narrativeParagraphs.push(element);
				}
			});

			// Add narrative paragraphs
			narrativeParagraphs.forEach(p => cardContent.appendChild(p));

			// Insert persona card before original heading
			parent.insertBefore(personaCard, heading);
			personaCard.appendChild(cardContent);

			// Remove processed elements from their original location
			personaElements.forEach(item => {
				if (item.type === 'content' && item.element.parentNode === parent) {
					// Element was moved, parent will be different now
					// This is handled by appendChild which moves the element
				}
			});
		});

		// Style standalone quotes that weren't in persona cards
		storyContent.querySelectorAll('p').forEach(paragraph => {
			if (paragraph.closest('.cs-persona-card')) return;
			if (paragraph.classList.contains('cs-quote')) return;
			
			const text = paragraph.textContent.trim();
			if (/^"[^"]+"$/.test(text) && text.length < 200) {
				paragraph.className = (paragraph.className + ' cs-quote').trim();
			}
		});

		// Style pain points sections outside personas
		storyContent.querySelectorAll('p').forEach(paragraph => {
			if (paragraph.closest('.cs-persona-card')) return;
			const text = paragraph.textContent.trim();
			if (/^Pain\s+Points?:?\s*$/i.test(text)) {
				paragraph.className = (paragraph.className + ' cs-pain-points-label').trim();
				const nextSibling = paragraph.nextElementSibling;
				if (nextSibling && (nextSibling.tagName === 'UL' || nextSibling.tagName === 'OL')) {
					nextSibling.className = (nextSibling.className + ' cs-pain-points-list').trim();
				}
			}
		});

		// Style metrics
		storyContent.querySelectorAll('p').forEach(element => {
			if (element.closest('.cs-persona-card')) return;
			const text = element.textContent.trim();
			const html = element.innerHTML || '';
			
			// Pattern: "**Task Success Rate:** 62% → 94%" or "Task Success Rate: 62% → 94%"
			if ((/\d+%\s*[→→]/.test(text) || /\d+\s*[→→]\s*\d+%/.test(text)) && /:\s*/.test(text)) {
				if (/^\*\*([^*]+)\*\*:\s*(.+)/.test(text) || /^([^:]+):\s*(.+)/.test(text)) {
					const match = text.match(/^\*\*([^*]+)\*\*:\s*(.+)/) || text.match(/^([^:]+):\s*(.+)/);
					if (match) {
						const label = match[1].trim();
						const value = match[2].trim();
						element.className = (element.className + ' cs-metric-item').trim();
						element.innerHTML = `<strong class="cs-metric-label-inline">${label}:</strong> <span class="cs-metric-value-inline">${value}</span>`;
					}
				}
			}
		});

		// Style body text paragraphs
		storyContent.querySelectorAll('.cs-chapter-content p').forEach(p => {
			if (p.classList.contains('cs-quote') || 
			    p.classList.contains('cs-pain-points-label') ||
			    p.classList.contains('cs-metric-item') ||
			    p.closest('.cs-persona-card')) {
				return;
			}
			if (!p.className.includes('cs-body-text')) {
				p.className = (p.className + ' cs-body-text').trim();
			}
		});
	}

	// Run structure functions in correct order
	function runAllStructure() {
		addChapterNumbers();
		setTimeout(() => {
			structureStoryContent();
		}, 100);
	}

	// Initialize
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', runAllStructure);
	} else {
		runAllStructure();
	}

	if (typeof wp !== 'undefined' && wp.domReady) {
		wp.domReady(runAllStructure);
	}

	// Re-run if content is dynamically loaded
	const observer = new MutationObserver(function(mutations) {
		let shouldRerun = false;
		mutations.forEach(function(mutation) {
			if (mutation.addedNodes.length > 0) {
				shouldRerun = true;
			}
		});
		if (shouldRerun) {
			setTimeout(runAllStructure, 200);
		}
	});

	if (document.body) {
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	}
})();
