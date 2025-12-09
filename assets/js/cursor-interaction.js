/**
 * Enhanced Cursor Interaction Effects
 * Premium mouse interactions inspired by award-winning web design
 */

(function() {
	'use strict';

	let mouseX = 0;
	let mouseY = 0;
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;
	let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


	// Create interactive background canvas
	function createInteractiveBackground() {
		const canvas = document.createElement('canvas');
		canvas.id = 'cs-interactive-bg';
		canvas.className = 'cs-interactive-bg';
		document.body.appendChild(canvas);

		const ctx = canvas.getContext('2d');
		
		function resizeCanvas() {
			windowWidth = window.innerWidth;
			windowHeight = window.innerHeight;
			canvas.width = windowWidth;
			canvas.height = windowHeight;
		}

		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);

		// Enhanced particles for interactive effect
		const particles = [];
		const particleCount = 60;

		class Particle {
			constructor() {
				this.x = Math.random() * windowWidth;
				this.y = Math.random() * windowHeight;
				this.size = Math.random() * 1.5 + 0.5;
				this.speedX = (Math.random() - 0.5) * 0.3;
				this.speedY = (Math.random() - 0.5) * 0.3;
				this.opacity = Math.random() * 0.2 + 0.1;
				this.baseOpacity = this.opacity;
				this.hue = 200; // Base blue hue
			}

			update() {
				this.x += this.speedX;
				this.y += this.speedY;

				// Wrap around edges
				if (this.x > windowWidth) this.x = 0;
				if (this.x < 0) this.x = windowWidth;
				if (this.y > windowHeight) this.y = 0;
				if (this.y < 0) this.y = windowHeight;

				// Enhanced reaction to cursor proximity
				const dx = mouseX - this.x;
				const dy = mouseY - this.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				const maxDistance = 250;

				if (distance < maxDistance) {
					const force = (maxDistance - distance) / maxDistance;
					this.x -= (dx / distance) * force * 3;
					this.y -= (dy / distance) * force * 3;
					
					// Increase opacity and size when near cursor
					this.opacity = Math.min(this.baseOpacity * 3, 0.6);
					this.currentSize = this.size * (1 + force * 0.5);
				} else {
					this.opacity += (this.baseOpacity - this.opacity) * 0.1;
					this.currentSize = this.size;
				}
			}

			draw() {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.currentSize || this.size, 0, Math.PI * 2);
				ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
				ctx.fill();
			}
		}

		// Initialize particles
		for (let i = 0; i < particleCount; i++) {
			particles.push(new Particle());
		}

		// Animation loop
		function animate() {
			if (isReducedMotion) return;
			
			ctx.clearRect(0, 0, windowWidth, windowHeight);

			particles.forEach(particle => {
				particle.update();
				particle.draw();
			});

			// Enhanced connections between nearby particles
			particles.forEach((particle, i) => {
				particles.slice(i + 1).forEach(otherParticle => {
					const dx = particle.x - otherParticle.x;
					const dy = particle.y - otherParticle.y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					const maxDistance = 150;

					if (distance < maxDistance) {
						// Calculate opacity based on distance and cursor proximity
						const cursorDistance = Math.sqrt(
							Math.pow(mouseX - (particle.x + otherParticle.x) / 2, 2) +
							Math.pow(mouseY - (particle.y + otherParticle.y) / 2, 2)
						);
						const cursorInfluence = Math.max(0, 1 - cursorDistance / 300);
						const baseOpacity = 0.1 * (1 - distance / maxDistance);
						const opacity = Math.min(baseOpacity + cursorInfluence * 0.2, 0.4);
						
						ctx.beginPath();
						ctx.moveTo(particle.x, particle.y);
						ctx.lineTo(otherParticle.x, otherParticle.y);
						ctx.strokeStyle = `hsla(200, 70%, 60%, ${opacity})`;
						ctx.lineWidth = 0.5 + cursorInfluence * 0.5;
						ctx.stroke();
					}
				});
			});

			requestAnimationFrame(animate);
		}

		animate();
	}

	// Track mouse movement
	function trackMouse(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}

	// Enhanced parallax effect for background gradient
	function parallaxBackground() {
		const body = document.body;
		let targetX = 50;
		let targetY = 50;
		let currentX = 50;
		let currentY = 50;
		
		document.addEventListener('mousemove', (e) => {
			targetX = 50 + ((e.clientX / windowWidth) - 0.5) * 10;
			targetY = 50 + ((e.clientY / windowHeight) - 0.5) * 10;
		});
		
		function animate() {
			if (isReducedMotion) return;
			
			currentX += (targetX - currentX) * 0.05;
			currentY += (targetY - currentY) * 0.05;
			
			body.style.backgroundPosition = `${currentX}% ${currentY}%`;
			requestAnimationFrame(animate);
		}
		
		animate();
	}

	// Enhanced cursor follower with multiple states
	function createCursorFollower() {
		const cursor = document.createElement('div');
		cursor.className = 'cs-cursor';
		document.body.appendChild(cursor);

		const cursorDot = document.createElement('div');
		cursorDot.className = 'cs-cursor-dot';
		document.body.appendChild(cursorDot);

		let cursorX = 0;
		let cursorY = 0;
		let dotX = 0;
		let dotY = 0;
		let cursorWidth = 20;
		let cursorHeight = 20;

		document.addEventListener('mousemove', (e) => {
			cursorX = e.clientX;
			cursorY = e.clientY;
		});

		function animateCursor() {
			if (isReducedMotion) return;
			
			// Smooth follow effect with easing
			const lerpFactor = 0.15;
			const dotLerpFactor = 0.3;
			
			dotX += (cursorX - dotX) * dotLerpFactor;
			dotY += (cursorY - dotY) * dotLerpFactor;

			cursor.style.left = cursorX + 'px';
			cursor.style.top = cursorY + 'px';
			cursorDot.style.left = dotX + 'px';
			cursorDot.style.top = dotY + 'px';

			// Smooth cursor size transitions
			const targetWidth = cursor.classList.contains('cs-cursor-hover') ? 40 : 20;
			const targetHeight = cursor.classList.contains('cs-cursor-hover') ? 40 : 20;
			cursorWidth += (targetWidth - cursorWidth) * 0.2;
			cursorHeight += (targetHeight - cursorHeight) * 0.2;
			cursor.style.width = cursorWidth + 'px';
			cursor.style.height = cursorHeight + 'px';

			requestAnimationFrame(animateCursor);
		}

		// Start animation after a brief delay
		setTimeout(() => {
			if (!isReducedMotion) {
				animateCursor();
				document.body.classList.add('custom-cursor-active');
				cursor.style.opacity = '1';
				cursorDot.style.opacity = '1';
			}
		}, 100);

		// Enhanced hover effects on interactive elements
		const interactiveElements = document.querySelectorAll('a, button, .cs-card, .cs-card-plain, .cs-btn-primary, .cs-btn-secondary, .cs-persona-card, .cs-chip, input, textarea, [contenteditable], [role="button"]');
		interactiveElements.forEach(el => {
			el.addEventListener('mouseenter', () => {
				cursor.classList.add('cs-cursor-hover');
				
				// Special cursor state for links
				if (el.tagName === 'A' || el.getAttribute('role') === 'button') {
					cursor.classList.add('cs-cursor-link');
				}
				
				// Special cursor state for buttons
				if (el.classList.contains('cs-btn-primary') || el.classList.contains('cs-btn-secondary')) {
					cursor.classList.add('cs-cursor-button');
				}
			});
			
			el.addEventListener('mouseleave', () => {
				cursor.classList.remove('cs-cursor-hover', 'cs-cursor-link', 'cs-cursor-button');
			});
		});
	}

	// No interactive element movement effects - just cursor and particles
	function initInteractiveElements() {
		// All movement effects removed - keeping only cursor and particle system
	}

	// Initialize everything
	function init() {
		// Respect reduced motion preference
		if (isReducedMotion) {
			return;
		}

		// Check if mouse is available (desktop)
		if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
			document.addEventListener('mousemove', trackMouse);
			
			// Create interactive background
			createInteractiveBackground();
			
			// Add parallax effect
			parallaxBackground();
			
			// Create custom cursor
			createCursorFollower();
		}

		// Listen for changes in reduced motion preference
		window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
			isReducedMotion = e.matches;
			if (isReducedMotion) {
				document.body.classList.remove('custom-cursor-active');
			}
		});
	}

	// Wait for DOM
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
