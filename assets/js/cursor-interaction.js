/**
 * Cursor Interaction Effects
 * Creates interactive background elements that respond to cursor movement
 */

(function() {
	'use strict';

	let mouseX = 0;
	let mouseY = 0;
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;

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

		// Particles for interactive effect
		const particles = [];
		const particleCount = 50;

		class Particle {
			constructor() {
				this.x = Math.random() * windowWidth;
				this.y = Math.random() * windowHeight;
				this.size = Math.random() * 2 + 1;
				this.speedX = (Math.random() - 0.5) * 0.5;
				this.speedY = (Math.random() - 0.5) * 0.5;
				this.opacity = Math.random() * 0.3 + 0.1;
			}

			update() {
				this.x += this.speedX;
				this.y += this.speedY;

				// Wrap around edges
				if (this.x > windowWidth) this.x = 0;
				if (this.x < 0) this.x = windowWidth;
				if (this.y > windowHeight) this.y = 0;
				if (this.y < 0) this.y = windowHeight;

				// React to cursor proximity
				const dx = mouseX - this.x;
				const dy = mouseY - this.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				const maxDistance = 200;

				if (distance < maxDistance) {
					const force = (maxDistance - distance) / maxDistance;
					this.x -= (dx / distance) * force * 2;
					this.y -= (dy / distance) * force * 2;
				}
			}

			draw() {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(30, 159, 215, ${this.opacity})`;
				ctx.fill();
			}
		}

		// Initialize particles
		for (let i = 0; i < particleCount; i++) {
			particles.push(new Particle());
		}

		// Animation loop
		function animate() {
			ctx.clearRect(0, 0, windowWidth, windowHeight);

			particles.forEach(particle => {
				particle.update();
				particle.draw();
			});

			// Draw connections between nearby particles
			particles.forEach((particle, i) => {
				particles.slice(i + 1).forEach(otherParticle => {
					const dx = particle.x - otherParticle.x;
					const dy = particle.y - otherParticle.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < 150) {
						ctx.beginPath();
						ctx.moveTo(particle.x, particle.y);
						ctx.lineTo(otherParticle.x, otherParticle.y);
						ctx.strokeStyle = `rgba(30, 159, 215, ${0.1 * (1 - distance / 150)})`;
						ctx.lineWidth = 0.5;
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

	// Parallax effect for background gradient
	function parallaxBackground() {
		const body = document.body;
		document.addEventListener('mousemove', (e) => {
			const x = (e.clientX / windowWidth) * 100;
			const y = (e.clientY / windowHeight) * 100;
			
			body.style.backgroundPosition = `${x}% ${y}%`;
		});
	}

	// Smooth cursor follower
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

		document.addEventListener('mousemove', (e) => {
			cursorX = e.clientX;
			cursorY = e.clientY;
		});

		function animateCursor() {
			// Smooth follow effect
			dotX += (cursorX - dotX) * 0.15;
			dotY += (cursorY - dotY) * 0.15;

			cursor.style.left = cursorX + 'px';
			cursor.style.top = cursorY + 'px';
			cursorDot.style.left = dotX + 'px';
			cursorDot.style.top = dotY + 'px';

			requestAnimationFrame(animateCursor);
		}

		// Start animation after a brief delay to ensure elements are ready
		setTimeout(() => {
			animateCursor();
			document.body.classList.add('custom-cursor-active');
		}, 100);

		// Add hover effects on interactive elements
		const interactiveElements = document.querySelectorAll('a, button, .cs-card, .cs-btn-primary, .cs-btn-secondary, input, textarea, [contenteditable]');
		interactiveElements.forEach(el => {
			el.addEventListener('mouseenter', () => {
				cursor.classList.add('cs-cursor-hover');
			});
			el.addEventListener('mouseleave', () => {
				cursor.classList.remove('cs-cursor-hover');
			});
		});
	}

	// Initialize on DOM ready
	function init() {
		// Respect reduced motion preference
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		// Check if mouse is available (desktop)
		if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
			document.addEventListener('mousemove', trackMouse);
			
			// Create interactive background
			createInteractiveBackground();
			
			// Add parallax effect
			parallaxBackground();
			
			// Create custom cursor (this will add the class itself)
			createCursorFollower();
		}
	}

	// Wait for DOM
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

