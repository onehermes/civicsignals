/**
 * Auto-detect and add chapter numbers to story content
 * Extracts exact chapter numbers from heading text (e.g., "Chapter 1" → 1, "Chapter 2" → 2)
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
		
		// Pattern 4: Roman numerals "Chapter I", "Chapter II", etc.
		const romanPatterns = {
			'i': 1, 'ii': 2, 'iii': 3, 'iv': 4, 'v': 5,
			'vi': 6, 'vii': 7, 'viii': 8, 'ix': 9, 'x': 10
		};
		match = text.match(/chapter\s+([ivx]+)/i);
		if (match && romanPatterns[match[1].toLowerCase()]) {
			return romanPatterns[match[1].toLowerCase()];
		}
		
		return null;
	}

	function addChapterNumbers() {
		// Only run on single story pages
		if (!document.body.classList.contains('single-story') && 
		    !document.body.classList.contains('post-type-story')) {
			return;
		}

		const storyContent = document.querySelector('.cs-story-content .wp-block-post-content');
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
			
			// Insert structure before the heading
			heading.parentNode.insertBefore(chapterWrapper, heading);
			chapterWrapper.appendChild(chapterNumberEl);
			chapterWrapper.appendChild(chapterContent);
			
			// Move heading into chapter-content
			chapterContent.appendChild(heading);
			
			// Move all following siblings until we hit another h2 or reach the end
			let nextSibling = heading.nextSibling;
			while (nextSibling) {
				const temp = nextSibling.nextSibling;
				
				// Stop if we hit another h2 heading
				if (nextSibling.nodeType === 1 && nextSibling.tagName === 'H2') {
					break;
				}
				
				// Move this element into chapter-content
				if (nextSibling.nodeType === 1) {
					chapterContent.appendChild(nextSibling);
				}
				
				nextSibling = temp;
			}
		});
	}

	// Initialize on DOM ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', addChapterNumbers);
	} else {
		addChapterNumbers();
	}

	// Also run after editor updates (for frontend preview)
	if (typeof wp !== 'undefined' && wp.domReady) {
		wp.domReady(addChapterNumbers);
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
			setTimeout(addChapterNumbers, 100);
		}
	});

	if (document.body) {
		observer.observe(document.body, {
			childList: true,
			subtree: true
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

		// Structure persona sections (H3 with em dash or hyphen)
		const personaHeadings = Array.from(storyContent.querySelectorAll('h3')).filter(h3 => {
			const text = h3.textContent.trim();
			return /^[A-Z][a-z]+\s*[–—\-]/.test(text);
		});

		personaHeadings.forEach(heading => {
			if (heading.closest('.cs-persona-card')) {
				return; // Already structured
			}

			// Find following content until next H2 or H3
			const personaCard = document.createElement('div');
			personaCard.className = 'cs-persona-card cs-card-plain';
			
			const cardContent = document.createElement('div');
			cardContent.className = 'cs-persona-content';
			
			personaCard.appendChild(cardContent);
			
			heading.parentNode.insertBefore(personaCard, heading);
			cardContent.appendChild(heading);
			
			let nextSibling = heading.nextSibling;
			while (nextSibling) {
				const temp = nextSibling.nextSibling;
				if (nextSibling.nodeType === 1) {
					if (nextSibling.tagName === 'H2' || nextSibling.tagName === 'H3') {
						break;
					}
					cardContent.appendChild(nextSibling);
				}
				nextSibling = temp;
			}
		});

		// Style quotes
		storyContent.querySelectorAll('p').forEach(paragraph => {
			const text = paragraph.textContent.trim();
			
			// Detect quote pattern: "Quote:" or text starting with quote mark
			if (/^Quote:\s*/i.test(text) || /^"[^"]+"/.test(text) || (text.startsWith('"') && text.length > 20)) {
				// Check if it's a quote label vs actual quote
				if (/^Quote:\s*"([^"]+)"?/i.test(text)) {
					// Extract just the quote text
					const match = text.match(/^Quote:\s*"([^"]+)"?/i);
					if (match && match[1]) {
						paragraph.textContent = match[1];
						paragraph.className = (paragraph.className + ' cs-quote').trim();
					}
				} else if (/^"[^"]+"$/.test(text) || (text.startsWith('"') && text.length < 200)) {
					paragraph.className = (paragraph.className + ' cs-quote').trim();
				}
			}
		});

		// Style pain points sections
		storyContent.querySelectorAll('p').forEach(paragraph => {
			const text = paragraph.textContent.trim();
			if (/^Pain\s+Points?:?\s*$/i.test(text)) {
				paragraph.className = (paragraph.className + ' cs-pain-points-label').trim();
				
				// Style the following list
				let nextSibling = paragraph.nextElementSibling;
				if (nextSibling && (nextSibling.tagName === 'UL' || nextSibling.tagName === 'OL')) {
					nextSibling.className = (nextSibling.className + ' cs-pain-points-list').trim();
				}
			}
		});

		// Style metrics (bold text with arrows or percentage changes)
		storyContent.querySelectorAll('p, h3, h4').forEach(element => {
			const text = element.textContent.trim();
			const html = element.innerHTML;
			
			// Pattern: "Task Success Rate:** 62% → 94%" or similar
			if (/→|→|%|%/.test(text) && (/\d+%/.test(text) || /\d+\s*[→→]/.test(text))) {
				if (element.tagName === 'P' && /^(.*?):\s*(\d+.*)/.test(text)) {
					const match = text.match(/^(\*\*)?([^*]+?)(\*\*)?:\s*(.+)/);
					if (match) {
						const label = match[2].trim();
						const value = match[4].trim();
						
						if (!element.classList.contains('cs-metric-item')) {
							element.className = (element.className + ' cs-metric-item').trim();
							element.innerHTML = `<strong class="cs-metric-label-inline">${label}:</strong> <span class="cs-metric-value-inline">${value}</span>`;
						}
					}
				}
			}
		});

		// Improve paragraph spacing
		storyContent.querySelectorAll('.cs-chapter-content p, .cs-story-content p').forEach(p => {
			if (!p.classList.contains('cs-quote') && 
			    !p.classList.contains('cs-pain-points-label') &&
			    !p.classList.contains('cs-metric-item') &&
			    !p.closest('.cs-persona-card')) {
				if (!p.className.includes('cs-body-text')) {
					p.className = (p.className + ' cs-body-text').trim();
				}
			}
		});
	}

	// Run structure function after chapter numbers
	function runAllStructure() {
		addChapterNumbers();
		setTimeout(structureStoryContent, 50);
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
})();

