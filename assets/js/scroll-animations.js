/**
 * Award-Winning Scroll Animations
 * Inspired by Awwwards-winning websites
 * Smooth reveal animations, parallax effects, and scroll progress
 */

(function() {
	'use strict';

	const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	
	if (isReducedMotion) {
		return; // Skip all animations for accessibility
	}

	// Scroll Progress Indicator
	function createScrollProgress() {
		const progressBar = document.createElement('div');
		progressBar.className = 'cs-scroll-progress';
		progressBar.setAttribute('role', 'progressbar');
		progressBar.setAttribute('aria-label', 'Reading progress');
		progressBar.setAttribute('aria-valuemin', '0');
		progressBar.setAttribute('aria-valuemax', '100');
		progressBar.setAttribute('aria-valuenow', '0');
		document.body.appendChild(progressBar);

		function updateProgress() {
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
			
			progressBar.style.width = Math.min(scrollPercent, 100) + '%';
			progressBar.setAttribute('aria-valuenow', Math.round(scrollPercent));
		}

		window.addEventListener('scroll', updateProgress, { passive: true });
		updateProgress();
	}

	// Intersection Observer for Reveal Animations
	function initRevealAnimations() {
		const observerOptions = {
			root: null,
			rootMargin: '0px 0px -100px 0px',
			threshold: 0.1
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('cs-revealed');
					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		// Observe chapters
		document.querySelectorAll('.cs-chapter, .cs-chapter-auto').forEach(el => {
			el.classList.add('cs-reveal-target');
			observer.observe(el);
		});

		// Observe cards
		document.querySelectorAll('.cs-card, .cs-card-plain').forEach(el => {
			el.classList.add('cs-reveal-target');
			observer.observe(el);
		});

		// Observe metrics
		document.querySelectorAll('.cs-metric').forEach(el => {
			el.classList.add('cs-reveal-target');
			observer.observe(el);
		});

		// Observe timeline items
		document.querySelectorAll('.cs-timeline-item').forEach(el => {
			el.classList.add('cs-reveal-target');
			observer.observe(el);
		});

		// Observe hero
		const hero = document.querySelector('.cs-hero');
		if (hero) {
			hero.classList.add('cs-reveal-target', 'cs-revealed'); // Reveal immediately
		}

		// Observe headings for text reveal
		document.querySelectorAll('.cs-chapter-title, .cs-hero-title').forEach((heading, index) => {
			heading.classList.add('cs-text-reveal');
			heading.style.animationDelay = `${index * 0.1}s`;
			observer.observe(heading);
		});
	}

	// Parallax Effect for Chapter Numbers
	function initParallaxNumbers() {
		const chapterNumbers = document.querySelectorAll('.cs-chapter-number');
		
		if (chapterNumbers.length === 0) return;

		function updateParallax() {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			
			chapterNumbers.forEach(number => {
				const rect = number.getBoundingClientRect();
				const elementTop = rect.top + scrollTop;
				const windowHeight = window.innerHeight;
				const scrollPercent = (scrollTop + windowHeight - elementTop) / (windowHeight * 2);
				
				if (scrollPercent > 0 && scrollPercent < 1) {
					const parallaxOffset = (scrollPercent - 0.5) * 40; // Max 20px movement
					number.style.transform = `translateY(${parallaxOffset}px)`;
				}
			});
		}

		window.addEventListener('scroll', updateParallax, { passive: true });
		updateParallax();
	}

	// Stagger Animation for Cards
	function initStaggerCards() {
		const cardContainers = document.querySelectorAll('.cs-chapter-grid, .cs-card-row');
		
		cardContainers.forEach(container => {
			const cards = container.querySelectorAll('.cs-card, .cs-card-plain');
			
			cards.forEach((card, index) => {
				card.style.animationDelay = `${index * 0.1}s`;
				card.classList.add('cs-stagger-card');
			});
		});
	}

	// Smooth Scroll Behavior
	function initSmoothScroll() {
		// Enhance native smooth scroll with custom easing
		document.documentElement.style.scrollBehavior = 'smooth';
		
		// Add smooth scroll to anchor links
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function(e) {
				const href = this.getAttribute('href');
				if (href === '#' || href === '#main-content') return;
				
				const target = document.querySelector(href);
				if (target) {
					e.preventDefault();
					target.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
			});
		});
	}

	// Text Reveal Animation Helper
	function revealText(element) {
		if (!element || element.classList.contains('cs-text-revealed')) return;
		
		element.classList.add('cs-text-revealed');
		
		// Split text into spans for letter animation (optional, can be heavy)
		// For now, just use CSS animation
	}

	// Initialize on DOM ready
	function init() {
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', init);
			return;
		}

		// Initialize all features
		createScrollProgress();
		initRevealAnimations();
		initParallaxNumbers();
		initStaggerCards();
		initSmoothScroll();

		// Re-run for dynamically loaded content
		setTimeout(() => {
			initRevealAnimations();
			initStaggerCards();
		}, 500);
	}

	// Watch for dynamically added content
	if ('MutationObserver' in window) {
		const contentObserver = new MutationObserver(() => {
			setTimeout(() => {
				initRevealAnimations();
				initStaggerCards();
			}, 100);
		});

		const mainContent = document.querySelector('main, .cs-shell');
		if (mainContent) {
			contentObserver.observe(mainContent, {
				childList: true,
				subtree: true
			});
		}
	}

	init();
})();

