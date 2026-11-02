import $ from "jquery";
import "bootstrap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Parallax Effects System
class ParallaxEffects {
	constructor() {
		this.init();
	}

	init() {
		// Refresh ScrollTrigger when content loads - with state preservation
		ScrollTrigger.refresh();

		// Background parallax effects
		this.setupBackgroundParallax();

		// Image parallax effects
		this.setupImageParallax();

		// Text parallax effects
		this.setupTextParallax();

		// Pattern parallax effects
		this.setupPatternParallax();

		// Mobile pattern parallax
		this.setupMobilePatternParallax();
	}

	setupBackgroundParallax() {
		// Hero background patterns parallax
		const heroPattern = document.querySelector(".hero-pattern");
		if (heroPattern) {
			gsap.to(".hero-pattern .herobg", {
				y: "20%",
				ease: "none",
				scrollTrigger: {
					trigger: ".hero-section",
					start: "top bottom",
					end: "bottom top",
					scrub: 1,
					invalidateOnRefresh: true,
				},
			});

			gsap.to(".hero-pattern .herobg_left", {
				y: "15%",
				x: "-10%",
				ease: "none",
				scrollTrigger: {
					trigger: ".hero-section",
					start: "top bottom",
					end: "bottom top",
					scrub: 1.5,
					invalidateOnRefresh: true,
				},
			});
		}

		// Content hub background parallax
		gsap.to(".contenthub-pattern img", {
			y: "30%",
			ease: "none",
			scrollTrigger: {
				trigger: ".contenthub-section",
				start: "top bottom",
				end: "bottom top",
				scrub: 2,
				invalidateOnRefresh: true,
			},
		});

		// Hero section background parallax effects
		gsap.to(".hero_section .bg_images_wrapper .desktop_images .dish_desktop", {
			y: "-15%",
			ease: "none",
			scrollTrigger: {
				trigger: ".hero_section",
				start: "top bottom",
				end: "bottom top",
				scrub: 1.5,
				invalidateOnRefresh: true,
			},
		});

		// Mobile hero section parallax
		gsap.to(".hero_section .mobile_images .mobile_top_branch", {
			y: "-8%",
			x: "-3%",
			ease: "none",
			scrollTrigger: {
				trigger: ".hero_section",
				start: "top bottom",
				end: "bottom top",
				scrub: 1.5,
				invalidateOnRefresh: true,
			},
		});
	}

	setupImageParallax() {
		// Hero image parallax
		gsap.to(".hero-img", {
			y: "-15%",
			scale: 1.1,
			ease: "none",
			scrollTrigger: {
				trigger: ".hero-section",
				start: "top bottom",
				end: "bottom top",
				scrub: 1,
				invalidateOnRefresh: true,
			},
		});

		// Mobile hero image parallax
		gsap.to(".hero-img-mobile", {
			y: "-10%",
			ease: "none",
			scrollTrigger: {
				trigger: ".hero-section-mobile",
				start: "top bottom",
				end: "bottom top",
				scrub: 1,
				invalidateOnRefresh: true,
			},
		});

		// Cuisine images parallax
		const cuisineImages = [
			".indian-section .cuisine-img",
			".italian-section .cuisine-img2",
			".thai-section .cuisine-img",
			".korean-section .cuisine-img",
			".specialtycheese-section .cuisine-img2",
		];

		cuisineImages.forEach((selector, index) => {
			const element = document.querySelector(selector);
			if (element) {
				// Special handling for singaporean and specialty cheese sections
				let yMovement;
				if (
					selector.includes("singaporean") ||
					selector.includes("specialtycheese")
				) {
					yMovement = "12%"; // Always move down
				} else {
					yMovement = index % 2 === 0 ? "-12%" : "12%";
				}

				gsap.to(selector, {
					y: yMovement,
					scale: 1.05,
					ease: "none",
					scrollTrigger: {
						trigger: element.closest(".cuisine-section"),
						start: "top bottom",
						end: "bottom top",
						scrub: 1.2,
						invalidateOnRefresh: true,
					},
				});
			}
		});

		// Mobile cuisine images parallax
		const mobileCuisineImages = [
			".cuisine-img-india-mobile",
			".cuisine-img-italian-mobile",
			".cuisine-img-thai-mobile",
			".cuisine-img-sing-mobile",
			".cuisine-img-korea-mobile",
			".cuisine-img-cheese-mobile",
		];

		mobileCuisineImages.forEach((selector, index) => {
			const element = document.querySelector(selector);
			if (element) {
				// Special handling for singaporean and specialty cheese mobile sections
				let yMovement;
				if (selector.includes("sing") || selector.includes("cheese")) {
					yMovement = "8%"; // Always move down
				} else {
					yMovement = index % 2 === 0 ? "-8%" : "8%";
				}

				gsap.to(selector, {
					y: yMovement,
					ease: "none",
					scrollTrigger: {
						trigger: selector,
						start: "top bottom",
						end: "bottom top",
						scrub: 1,
						invalidateOnRefresh: true,
					},
				});
			}
		});

		// Other cuisine images parallax
		gsap.to(".other-cuisine-img", {
			y: "-10%",
			stagger: 0.2,
			ease: "none",
			scrollTrigger: {
				trigger: ".moredelights-section",
				start: "top bottom",
				end: "bottom top",
				scrub: 1,
				invalidateOnRefresh: true,
			},
		});

		// Other mobile cuisine images
		gsap.to(".cuisine-img-other-left-mobile, .cuisine-img-other-right-mobile", {
			y: "-8%",
			stagger: 0.1,
			ease: "none",
			scrollTrigger: {
				trigger: ".moredelights-section",
				start: "top bottom",
				end: "bottom top",
				scrub: 1,
				invalidateOnRefresh: true,
			},
		});
	}

	setupTextParallax() {
		// Hero text elements - only apply parallax after reveal animation
		gsap.to(".hero-title", {
			y: "20%",
			ease: "none",
			scrollTrigger: {
				trigger: ".hero-section",
				start: "top bottom",
				end: "bottom top",
				scrub: 2,
				invalidateOnRefresh: true,
				onEnter: () => {
					// Only apply parallax if element is already visible
					const element = document.querySelector(".hero-title");
					if (element && element.style.opacity !== "0") {
						gsap.set(element, { clearProps: "none" });
					}
				},
			},
		});

		gsap.to(".hero-subtitle", {
			y: "15%",
			ease: "none",
			scrollTrigger: {
				trigger: ".hero-section",
				start: "top bottom",
				end: "bottom top",
				scrub: 1.5,
				invalidateOnRefresh: true,
				onEnter: () => {
					const element = document.querySelector(".hero-subtitle");
					if (element && element.style.opacity !== "0") {
						gsap.set(element, { clearProps: "none" });
					}
				},
			},
		});

		gsap.to(".hero-description", {
			y: "10%",
			ease: "none",
			scrollTrigger: {
				trigger: ".hero-section",
				start: "top bottom",
				end: "bottom top",
				scrub: 1,
				invalidateOnRefresh: true,
				onEnter: () => {
					const element = document.querySelector(".hero-description");
					if (element && element.style.opacity !== "0") {
						gsap.set(element, { clearProps: "none" });
					}
				},
			},
		});

		// Mobile hero text elements - only apply parallax after reveal animation
		gsap.to(".hero-title-mobile", {
			y: "15%",
			ease: "none",
			scrollTrigger: {
				trigger: ".hero-section-mobile",
				start: "top bottom",
				end: "bottom top",
				scrub: 1.5,
				invalidateOnRefresh: true,
				onEnter: () => {
					const element = document.querySelector(".hero-title-mobile");
					if (element && element.style.opacity !== "0") {
						gsap.set(element, { clearProps: "none" });
					}
				},
			},
		});

		gsap.to(".hero-subtitle-mobile", {
			y: "12%",
			ease: "none",
			scrollTrigger: {
				trigger: ".hero-section-mobile",
				start: "top bottom",
				end: "bottom top",
				scrub: 1.2,
				invalidateOnRefresh: true,
				onEnter: () => {
					const element = document.querySelector(".hero-subtitle-mobile");
					if (element && element.style.opacity !== "0") {
						gsap.set(element, { clearProps: "none" });
					}
				},
			},
		});

		// Cuisine titles parallax with alternating directions
		const cuisineSections = [
			".indian-section",
			".italian-section",
			".thai-section",
			".korean-section",
			".specialtycheese-section",
		];

		cuisineSections.forEach((selector, index) => {
			const section = document.querySelector(selector);
			if (section) {
				const isEven = index % 2 === 0;

				gsap.to(`${selector} .cuisine-title`, {
					y: isEven ? "8%" : "-8%",
					ease: "none",
					scrollTrigger: {
						trigger: selector,
						start: "top bottom",
						end: "bottom top",
						scrub: 1.5,
						invalidateOnRefresh: true,
					},
				});

				gsap.to(`${selector} .cuisine-subtitle`, {
					y: isEven ? "5%" : "-5%",
					ease: "none",
					scrollTrigger: {
						trigger: selector,
						start: "top bottom",
						end: "bottom top",
						scrub: 1.2,
						invalidateOnRefresh: true,
					},
				});
			}
		});

		// Content hub text parallax
		gsap.to(".contenthub-title", {
			y: "20%",
			ease: "none",
			scrollTrigger: {
				trigger: ".contenthub-section",
				start: "top bottom",
				end: "bottom top",
				scrub: 2,
				invalidateOnRefresh: true,
			},
		});

		// Hero section text parallax effects
		gsap.to(".hero_section .title .highlight_text", {
			y: "15%",
			ease: "none",
			scrollTrigger: {
				trigger: ".hero_section",
				start: "top bottom",
				end: "bottom top",
				scrub: 1.8,
				invalidateOnRefresh: true,
			},
		});

		gsap.to(".hero_section .title .text", {
			y: "10%",
			x: "5%",
			ease: "none",
			scrollTrigger: {
				trigger: ".hero_section",
				start: "top bottom",
				end: "bottom top",
				scrub: 1.5,
				invalidateOnRefresh: true,
			},
		});

		gsap.to(".hero_section .description", {
			y: "8%",
			ease: "none",
			scrollTrigger: {
				trigger: ".hero_section",
				start: "top bottom",
				end: "bottom top",
				scrub: 1.2,
				invalidateOnRefresh: true,
			},
		});

		gsap.to(".hero_section .action_wrapper", {
			y: "5%",
			ease: "none",
			scrollTrigger: {
				trigger: ".hero_section",
				start: "top bottom",
				end: "bottom top",
				scrub: 1,
				invalidateOnRefresh: true,
			},
		});
	}

	setupPatternParallax() {
		// Line art patterns parallax
		const lineartPatterns = document.querySelectorAll(".lineart-pattern img");

		lineartPatterns.forEach((pattern, index) => {
			const section =
				pattern.closest(".cuisine-section") || pattern.closest("section");
			if (section) {
				gsap.to(pattern, {
					y: index % 2 === 0 ? "25%" : "-25%",
					rotation: index % 2 === 0 ? 2 : -2,
					ease: "none",
					scrollTrigger: {
						trigger: section,
						start: "top bottom",
						end: "bottom top",
						scrub: 2,
						invalidateOnRefresh: true,
					},
				});
			}
		});
	}

	setupMobilePatternParallax() {
		// Mobile hero patterns
		const mobilePatterns = [
			{
				selector: ".mobilebg-pattern1",
				movement: { y: "20%", x: "5%", rotation: 1 },
			},
			{
				selector: ".mobilebg-pattern2",
				movement: { y: "-15%", x: "-8%", rotation: -1 },
			},
			{
				selector: ".mobilebg-pattern3",
				movement: { y: "10%", x: "3%", rotation: 0.5 },
			},
		];

		mobilePatterns.forEach(({ selector, movement }) => {
			const element = document.querySelector(selector);
			if (element) {
				gsap.to(selector, {
					...movement,
					ease: "none",
					scrollTrigger: {
						trigger: ".hero-section-mobile",
						start: "top bottom",
						end: "bottom top",
						scrub: 1.5,
						invalidateOnRefresh: true,
					},
				});
			}
		});
	}
}

// Header Animation System
class HeaderAnimations {
	constructor() {
		this.header = document.querySelector("header");
		this.lastScrollY = 0;
		this.scrollThreshold = 50;
		this.scrollDirection = "up";
		this.init();
	}

	init() {
		if (!this.header) return;

		// Initial header animation on page load
		gsap.fromTo(
			this.header,
			{ y: -100, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: "power2.out" }
		);

		// Scroll-based header behavior
		this.setupScrollTrigger();
		this.setupScrollListener();
	}

	setupScrollTrigger() {
		// Header background change on scroll
		ScrollTrigger.create({
			trigger: "body",
			start: "top -80",
			end: "bottom bottom",
			onEnter: () => this.header.classList.add("header-scrolled"),
			onLeaveBack: () => this.header.classList.remove("header-scrolled"),
		});
	}

	setupScrollListener() {
		let ticking = false;

		const updateHeader = () => {
			const currentScrollY = window.scrollY;
			const scrollDifference = currentScrollY - this.lastScrollY;

			// Determine scroll direction
			if (scrollDifference > 5) {
				this.scrollDirection = "down";
			} else if (scrollDifference < -5) {
				this.scrollDirection = "up";
			}

			// Only act if we've scrolled past the threshold
			if (currentScrollY > this.scrollThreshold) {
				// Hide header when scrolling down
				if (
					this.scrollDirection === "down" &&
					!this.header.classList.contains("header-hidden")
				) {
					this.header.classList.add("header-hidden");
					gsap.to(this.header, {
						y: -100,
						duration: 0.3,
						ease: "power2.out",
					});
				}
				// Show header when scrolling up
				else if (
					this.scrollDirection === "up" &&
					this.header.classList.contains("header-hidden")
				) {
					this.header.classList.remove("header-hidden");
					gsap.to(this.header, {
						y: 0,
						duration: 0.3,
						ease: "power2.out",
					});
				}
			} else {
				// Always show header when at top of page
				if (this.header.classList.contains("header-hidden")) {
					this.header.classList.remove("header-hidden");
					gsap.to(this.header, {
						y: 0,
						duration: 0.3,
						ease: "power2.out",
					});
				}
			}

			this.lastScrollY = currentScrollY;
			ticking = false;
		};

		const requestTick = () => {
			if (!ticking) {
				requestAnimationFrame(updateHeader);
				ticking = true;
			}
		};

		window.addEventListener("scroll", requestTick, { passive: true });
	}
}

// Enhanced Scroll Animation System
class ScrollAnimations {
	constructor() {
		this.animatedElements = [];
		this.init();
	}

	init() {
		// Setup scroll-triggered animations
		this.setupRevealAnimations();
		this.setupStaggerAnimations();
		this.setupScaleAnimations();
	}

	setupRevealAnimations() {
		// Hero elements reveal - use once: true to prevent reversal
		gsap.fromTo(
			".hero-left",
			{ opacity: 0, x: -100 },
			{
				opacity: 1,
				x: 0,
				duration: 1.2,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".hero-left",
					start: "top 80%",
					once: true,
				},
			}
		);

		gsap.fromTo(
			".hero-right",
			{ opacity: 0, x: 100 },
			{
				opacity: 1,
				x: 0,
				duration: 1.2,
				ease: "power2.out",
				delay: 0.3,
				scrollTrigger: {
					trigger: ".hero-right",
					start: "top 80%",
					once: true,
				},
			}
		);

		// New hero section animations (hero_section)
		gsap.fromTo(
			".hero_section .title .highlight_text",
			{ opacity: 0, y: 50, scale: 0.8 },
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 1.5,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".hero_section .title",
					start: "top 80%",
					once: true,
				},
			}
		);

		gsap.fromTo(
			".hero_section .title .text",
			{ opacity: 0, y: 50, x: 50 },
			{
				opacity: 1,
				y: 0,
				x: 0,
				duration: 1.5,
				ease: "power3.out",
				delay: 0.3,
				scrollTrigger: {
					trigger: ".hero_section .title",
					start: "top 80%",
					once: true,
				},
			}
		);

		gsap.fromTo(
			".hero_section .description",
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				duration: 1.2,
				ease: "power2.out",
				delay: 0.6,
				scrollTrigger: {
					trigger: ".hero_section .description",
					start: "top 80%",
					once: true,
				},
			}
		);

		gsap.fromTo(
			".hero_section .action_wrapper",
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				duration: 1.2,
				ease: "power2.out",
				delay: 0.9,
				scrollTrigger: {
					trigger: ".hero_section .action_wrapper",
					start: "top 80%",
					once: true,
				},
			}
		);

		// Background images animation
		gsap.fromTo(
			".hero_section .bg_images_wrapper .desktop_images .dish_desktop",
			{ opacity: 0, scale: 0.5, rotation: 0 },
			{
				opacity: 1,
				scale: 1,
				rotation: 360,
				duration: 2,
				ease: "power2.out",
				delay: 0.5,
				scrollTrigger: {
					trigger: ".hero_section .bg_images_wrapper",
					start: "top 80%",
					once: true,
					onComplete: () => {
						// Add class to enable CSS rotation animation
						const dishElement = document.querySelector(
							".hero_section .bg_images_wrapper .desktop_images .dish_desktop"
						);
						if (dishElement) {
							dishElement.classList.add("rotating");
						}
					},
				},
			}
		);

		gsap.fromTo(
			".hero_section .bg_images_wrapper .desktop_images .bg_right_img",
			{ opacity: 0, x: 100, y: 50 },
			{
				opacity: 1,
				x: 0,
				y: 0,
				duration: 1.5,
				ease: "power2.out",
				delay: 0.8,
				scrollTrigger: {
					trigger: ".hero_section .bg_images_wrapper",
					start: "top 80%",
					once: true,
				},
			}
		);

		gsap.fromTo(
			".hero_section .bg_images_wrapper .desktop_images .bg_left_img",
			{ opacity: 0, x: -100, y: 50 },
			{
				opacity: 1,
				x: 0,
				y: 0,
				duration: 1.5,
				ease: "power2.out",
				delay: 1.1,
				scrollTrigger: {
					trigger: ".hero_section .bg_images_wrapper",
					start: "top 80%",
					once: true,
				},
			}
		);

		// Mobile hero elements
		const mobileHeroElements = [
			".hero-title-mobile",
			".hero-subtitle-mobile",
			".hero-description-mobile",
			".hero-img-mobile",
		];

		mobileHeroElements.forEach((selector, index) => {
			gsap.fromTo(
				selector,
				{ opacity: 0, y: 50 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power2.out",
					delay: index * 0.2,
					scrollTrigger: {
						trigger: selector,
						start: "top 85%",
						once: true,
					},
				}
			);
		});

		// Mobile hero section animations (hero_section mobile)
		gsap.fromTo(
			".hero_section .mobile_images .mobile_top_branch",
			{ opacity: 0, y: -50, x: -30 },
			{
				opacity: 0.6,
				y: 0,
				x: 0,
				duration: 1.5,
				ease: "power2.out",
				delay: 0.8,
				scrollTrigger: {
					trigger: ".hero_section .mobile_images",
					start: "top 80%",
					once: true,
				},
			}
		);

		gsap.fromTo(
			".hero_section .mobile_images .bg_mobile_bottom",
			{ opacity: 0, y: 50 },
			{
				opacity: 1,
				y: 0,
				duration: 1.2,
				ease: "power2.out",
				delay: 1.1,
				scrollTrigger: {
					trigger: ".hero_section .mobile_images",
					start: "top 80%",
					once: true,
				},
			}
		);
	}

	setupStaggerAnimations() {
		// Cuisine sections with alternating animations
		const cuisineSections = [
			{ selector: ".indian-section", direction: "left" },
			{ selector: ".italian-section", direction: "right" },
			{ selector: ".thai-section", direction: "left" },
			{ selector: ".korean-section", direction: "right" },
			{ selector: ".specialtycheese-section", direction: "left" },
		];

		cuisineSections.forEach(({ selector, direction }) => {
			const section = document.querySelector(selector);
			if (section) {
				const isLeft = direction === "left";

				// Text animation
				gsap.fromTo(
					`${selector} .cuisine-left`,
					{
						opacity: 0,
						x: isLeft ? -80 : 80,
						y: 30,
					},
					{
						opacity: 1,
						x: 0,
						y: 0,
						duration: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: `${selector} .cuisine-left`,
							start: "top 75%",
							once: true,
						},
					}
				);

				// Image animation
				gsap.fromTo(
					`${selector} .cuisine-right`,
					{
						opacity: 0,
						x: isLeft ? 80 : -80,
						scale: 0.8,
					},
					{
						opacity: 1,
						x: 0,
						scale: 1,
						duration: 1.2,
						ease: "power2.out",
						delay: 0.3,
						scrollTrigger: {
							trigger: `${selector} .cuisine-right`,
							start: "top 75%",
							once: true,
						},
					}
				);
			}
		});

		// More delights section
		const moreDelightsElements = [
			".moredelights-section .cuisine-title",
			".moredelights-section .cuisine-subtitle",
			".moredelights-section .cuisine-description",
			".moredelights-section .btn-cuisine",
		];

		moreDelightsElements.forEach((selector, index) => {
			gsap.fromTo(
				selector,
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power2.out",
					delay: index * 0.15,
					scrollTrigger: {
						trigger: selector,
						start: "top 80%",
						once: true,
					},
				}
			);
		});

		// More delights images stagger
		gsap.fromTo(
			".moredelights-section .other-cuisine-img",
			{ opacity: 0, y: 60, scale: 0.8 },
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 1,
				ease: "power2.out",
				stagger: 0.2,
				scrollTrigger: {
					trigger: ".moredelights-section .cuisine-right",
					start: "top 75%",
					once: true,
				},
			}
		);
	}

	setupScaleAnimations() {
		// Content hub with scale effect
		gsap.fromTo(
			".contenthub-section",
			{ scale: 0.9, opacity: 0.7 },
			{
				scale: 1,
				opacity: 1,
				duration: 1.5,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".contenthub-section",
					start: "top 80%",
					once: true,
				},
			}
		);

		// Button hover effects with GSAP
		const buttons = document.querySelectorAll(".btn-cuisine, .contenthub-btn");
		buttons.forEach((button) => {
			button.addEventListener("mouseenter", () => {
				gsap.to(button, {
					scale: 1.05,
					duration: 0.3,
					ease: "power2.out",
				});
			});

			button.addEventListener("mouseleave", () => {
				gsap.to(button, {
					scale: 1,
					duration: 0.3,
					ease: "power2.out",
				});
			});
		});

		// Hero button scroll down animation
		this.setupHeroButtonAnimation();
	}

	setupHeroButtonAnimation() {
		const heroButton = document.querySelector(".btn-hero");
		const heroButtonIcon = document.querySelector(".scroll-down-icon");

		if (heroButton && heroButtonIcon) {
			// Infinite bouncing animation for the down arrow
			gsap.to(heroButtonIcon, {
				y: 8,
				duration: 1.2,
				ease: "power2.inOut",
				yoyo: true,
				repeat: -1,
			});

			// Subtle pulsing effect for the entire button
			gsap.to(heroButton, {
				scale: 1.02,
				duration: 2,
				ease: "power1.inOut",
				yoyo: true,
				repeat: -1,
			});

			// Enhanced hover effects for hero button
			heroButton.addEventListener("mouseenter", () => {
				gsap.to(heroButton, {
					scale: 1.08,
					duration: 0.3,
					ease: "power2.out",
					overwrite: true,
				});

				// Faster bounce on hover
				gsap.to(heroButtonIcon, {
					y: 12,
					duration: 0.6,
					ease: "power2.inOut",
					yoyo: true,
					repeat: -1,
					overwrite: true,
				});
			});

			heroButton.addEventListener("mouseleave", () => {
				// Return to normal pulsing
				gsap.to(heroButton, {
					scale: 1.02,
					duration: 2,
					ease: "power1.inOut",
					yoyo: true,
					repeat: -1,
					overwrite: true,
				});

				// Return to normal bounce
				gsap.to(heroButtonIcon, {
					y: 8,
					duration: 1.2,
					ease: "power2.inOut",
					yoyo: true,
					repeat: -1,
					overwrite: true,
				});
			});
		}
	}
}

// Performance optimization
class PerformanceOptimizer {
	constructor() {
		this.init();
	}

	init() {
		// Reduce motion for users who prefer it
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			gsap.globalTimeline.timeScale(0.5);
			ScrollTrigger.config({
				autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
			});
		}

		// Optimize ScrollTrigger refresh - preserve all animated content visibility
		ScrollTrigger.addEventListener("refreshInit", () => {
			// Store all animated element states before clearing
			const animatedElements = document.querySelectorAll(
				".hero-left, .hero-right, .hero-title-mobile, .hero-subtitle-mobile, .hero-description-mobile, .hero-img-mobile, " +
					".cuisine-left, .cuisine-right, .cuisine-title, .cuisine-subtitle, .cuisine-description, " +
					".cuisine-img, .cuisine-img2, .other-cuisine-img, " +
					".cuisine-img-india-mobile, .cuisine-img-italian-mobile, .cuisine-img-thai-mobile, " +
					".cuisine-img-sing-mobile, .cuisine-img-korea-mobile, .cuisine-img-cheese-mobile, " +
					".cuisine-img-other-left-mobile, .cuisine-img-other-right-mobile, " +
					".moredelights-section .cuisine-title, .moredelights-section .cuisine-subtitle, " +
					".moredelights-section .cuisine-description, .moredelights-section .btn-cuisine, " +
					".contenthub-section"
			);
			const elementStates = {};

			animatedElements.forEach((el, index) => {
				const computedStyle = window.getComputedStyle(el);
				if (parseFloat(computedStyle.opacity) > 0) {
					elementStates[index] = {
						element: el,
						opacity: computedStyle.opacity,
						transform: computedStyle.transform,
						visibility: computedStyle.visibility,
					};
				}
			});

			// Clear parallax properties but preserve animated content visibility
			gsap.set("[data-parallax]", { clearProps: "all" });

			// Restore all animated element visibility after refresh
			Object.values(elementStates).forEach(
				({ element, opacity, transform, visibility }) => {
					if (element && parseFloat(opacity) > 0) {
						gsap.set(element, {
							opacity: 1,
							visibility: visibility,
							clearProps: "none",
						});
					}
				}
			);
		});

		// Lazy load optimization
		this.setupIntersectionObserver();
	}

	setupIntersectionObserver() {
		const lazyElements = document.querySelectorAll("[data-parallax-lazy]");

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("parallax-active");
						observer.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin: "100px",
			}
		);

		lazyElements.forEach((el) => observer.observe(el));
	}
}

// Initialize when document is ready
$(document).ready(function () {
	console.log("Keells Food Cuisine application loaded with parallax effects");

	// Set initial states for elements to prevent flash - only if not already visible
	const animatedElements = document.querySelectorAll(
		".hero-left, .hero-right, .hero-title-mobile, .hero-subtitle-mobile, .hero-description-mobile, .hero-img-mobile, " +
			".cuisine-left, .cuisine-right, .cuisine-title, .cuisine-subtitle, .cuisine-description, " +
			".cuisine-img, .cuisine-img2, .other-cuisine-img, " +
			".cuisine-img-india-mobile, .cuisine-img-italian-mobile, .cuisine-img-thai-mobile, " +
			".cuisine-img-sing-mobile, .cuisine-img-korea-mobile, .cuisine-img-cheese-mobile, " +
			".cuisine-img-other-left-mobile, .cuisine-img-other-right-mobile, " +
			".moredelights-section .cuisine-title, .moredelights-section .cuisine-subtitle, " +
			".moredelights-section .cuisine-description, .moredelights-section .btn-cuisine, " +
			".contenthub-section"
	);
	animatedElements.forEach((element) => {
		const computedStyle = window.getComputedStyle(element);
		if (parseFloat(computedStyle.opacity) === 0) {
			gsap.set(element, { opacity: 0 });
		}
	});

	// Initialize all systems in proper order
	new HeaderAnimations();
	new ScrollAnimations();
	new ParallaxEffects();
	new PerformanceOptimizer();

	// Smooth scrolling for navigation links
	$('a[href^="#"]').on("click", function (event) {
		const target = $(this.getAttribute("href"));
		if (target.length) {
			event.preventDefault();
			$("html, body").animate(
				{
					scrollTop: target.offset().top - 120,
				},
				800
			);
		}
	});

	// Refresh ScrollTrigger on window resize with proper state management
	let resizeTimer;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			// Store current visibility states before refresh for all animated elements
			const animatedElements = document.querySelectorAll(
				".hero-left, .hero-right, .hero-title-mobile, .hero-subtitle-mobile, .hero-description-mobile, .hero-img-mobile, " +
					".cuisine-left, .cuisine-right, .cuisine-title, .cuisine-subtitle, .cuisine-description, " +
					".cuisine-img, .cuisine-img2, .other-cuisine-img, " +
					".cuisine-img-india-mobile, .cuisine-img-italian-mobile, .cuisine-img-thai-mobile, " +
					".cuisine-img-sing-mobile, .cuisine-img-korea-mobile, .cuisine-img-cheese-mobile, " +
					".cuisine-img-other-left-mobile, .cuisine-img-other-right-mobile, " +
					".moredelights-section .cuisine-title, .moredelights-section .cuisine-subtitle, " +
					".moredelights-section .cuisine-description, .moredelights-section .btn-cuisine, " +
					".contenthub-section"
			);
			const visibilityStates = {};

			animatedElements.forEach((el, index) => {
				const computedStyle = window.getComputedStyle(el);
				if (parseFloat(computedStyle.opacity) > 0) {
					visibilityStates[index] = {
						element: el,
						opacity: computedStyle.opacity,
						transform: computedStyle.transform,
						visibility: computedStyle.visibility,
					};
				}
			});

			// Refresh ScrollTrigger
			ScrollTrigger.refresh();

			// Restore visibility states after refresh
			Object.values(visibilityStates).forEach(
				({ element, opacity, transform, visibility }) => {
					if (element && parseFloat(opacity) > 0) {
						gsap.set(element, {
							opacity: 1,
							visibility: visibility,
							clearProps: "none",
						});
					}
				}
			);
		}, 250);
	});
});

// Auto-close navbar when clicking outside
document.addEventListener("DOMContentLoaded", function () {
	const navbarToggler = document.querySelector(".navbar-toggler");
	const navbarCollapse = document.querySelector(".navbar-collapse");

	// Function to close the navbar
	function closeNavbar() {
		if (navbarCollapse.classList.contains("show")) {
			navbarToggler.click(); // Trigger the toggle to close
		}
	}

	// Listen for clicks on the document
	document.addEventListener("click", function (event) {
		// Check if the clicked element is outside the navbar
		const navbar = document.querySelector(".navbar");

		// If click is outside the navbar and navbar is open, close it
		if (
			!navbar.contains(event.target) &&
			navbarCollapse.classList.contains("show")
		) {
			closeNavbar();
		}
	});

	// Optional: Close navbar when clicking on nav links (for smooth UX on mobile)
	const navLinks = document.querySelectorAll(".nav-link");
	navLinks.forEach(function (link) {
		link.addEventListener("click", function () {
			closeNavbar();
		});
	});
});






