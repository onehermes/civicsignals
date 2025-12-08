/**
 * CivicSignals Accessibility Enhancements
 * 
 * Additional JavaScript for accessibility improvements
 */

(function() {
	'use strict';

	// Skip link functionality
	const skipLink = document.querySelector('.skip-link');
	if (skipLink) {
		skipLink.addEventListener('click', function(e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.setAttribute('tabindex', '-1');
				target.focus();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				// Remove tabindex after focus to avoid tabbing to it again
				setTimeout(() => {
					target.removeAttribute('tabindex');
				}, 1000);
			}
		});
	}

	// Add ARIA labels to navigation links if missing
	const navLinks = document.querySelectorAll('nav a');
	navLinks.forEach(function(link) {
		if (!link.getAttribute('aria-label') && link.textContent.trim()) {
			// Only add if there's no existing aria-label
			const text = link.textContent.trim();
			link.setAttribute('aria-label', 'Navigate to ' + text);
		}
	});

	// Keyboard navigation enhancement for cover blocks
	const coverBlocks = document.querySelectorAll('.wp-block-cover');
	coverBlocks.forEach(function(cover) {
		// Ensure cover blocks are keyboard navigable
		if (cover.querySelector('a, button')) {
			cover.setAttribute('role', 'region');
			const title = cover.querySelector('h1, h2, h3, h4, h5, h6');
			if (title && !cover.getAttribute('aria-labelledby')) {
				const id = title.id || 'cover-' + Math.random().toString(36).substr(2, 9);
				title.id = id;
				cover.setAttribute('aria-labelledby', id);
			}
		}
	});

	// Improve focus visibility for interactive elements
	const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
	interactiveElements.forEach(function(element) {
		element.addEventListener('focus', function() {
			this.style.outline = '2px solid var(--wp--preset--color--accent)';
			this.style.outlineOffset = '2px';
		});
		element.addEventListener('blur', function() {
			this.style.outline = '';
			this.style.outlineOffset = '';
		});
	});

	// Announce dynamic content changes to screen readers
	if ('MutationObserver' in window) {
		const observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.type === 'childList' && mutation.addedNodes.length) {
					// Check if new content was added that should be announced
					mutation.addedNodes.forEach(function(node) {
						if (node.nodeType === 1 && node.hasAttribute('data-announce')) {
							const announcement = node.getAttribute('data-announce');
							announceToScreenReader(announcement);
						}
					});
				}
			});
		});

		// Observe the main content area
		const mainContent = document.querySelector('main, #main-content');
		if (mainContent) {
			observer.observe(mainContent, {
				childList: true,
				subtree: true
			});
		}
	}

	/**
	 * Announce message to screen readers
	 */
	function announceToScreenReader(message) {
		const announcement = document.createElement('div');
		announcement.setAttribute('role', 'status');
		announcement.setAttribute('aria-live', 'polite');
		announcement.setAttribute('aria-atomic', 'true');
		announcement.className = 'screen-reader-text';
		announcement.style.position = 'absolute';
		announcement.style.left = '-10000px';
		announcement.style.width = '1px';
		announcement.style.height = '1px';
		announcement.style.overflow = 'hidden';
		announcement.textContent = message;
		
		document.body.appendChild(announcement);
		
		setTimeout(function() {
			document.body.removeChild(announcement);
		}, 1000);
	}

	// Improve heading structure navigation
	const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
	headings.forEach(function(heading) {
		if (!heading.id) {
			// Generate ID from text content for anchor links
			const id = heading.textContent.trim()
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-+|-+$/g, '');
			if (id) {
				heading.id = id;
			}
		}
	});

})();

