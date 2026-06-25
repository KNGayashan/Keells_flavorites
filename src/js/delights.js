// product mapping

import { products, dishes } from "./constants.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "bootstrap";

const moreDelightsProducts = products.moredelights;
const thaiDishes = dishes.Thaidishitems;

// Import dish items for different cuisines
const japaneseDishes = dishes.Japanesedishitems;
const indonesianDishes = dishes.Indonesiandishitems;
const chineseDishes = dishes.ChinesedishItems;

// product mapping

const desktopOutputDiv = document.getElementById(
	"thai_innerpage_product_card_container"
);
const mobileOutputDiv = document.getElementById(
	"thai_innerpage_product_card_container_mobile"
);

function renderMoreDelightsProducts() {
	// Desktop version (existing grid layout)
	const productCardsHTML = moreDelightsProducts
		.map(
			(product) => `
		<div class="product_card">
			<div class="product_card_inner">
				<div class="product_img">
					<img src="${product.filepath}" alt="${product.subtitle}" class="product-image">
				</div>
				<div class="product_details">
					<h3 class="product_title">${product.title}</h3>
					<p class="product_desc">${product.subtitle}</p>
				</div>
			</div>
		</div>
	`
		)
		.join("");

	if (desktopOutputDiv) {
		desktopOutputDiv.innerHTML = productCardsHTML;
	}
}

function renderMobileMoreDelightsProducts() {
	// Mobile version (centered carousel layout)
	const mobileProductCardsHTML = moreDelightsProducts
		.map(
			(product, index) => `
		<div class="mobile_product_card ${index === 0 ? "active" : ""
				}" data-index="${index}">
			<div class="mobile_product_card_inner">
				<div class="mobile_product_img">
					<img src="${product.filepath}" alt="${product.subtitle
				}" class="mobile-product-image">
				</div>
				<div class="mobile_product_details">
					<h3 class="mobile_product_title">${product.title}</h3>
					<p class="mobile_product_desc">${product.subtitle}</p>
				</div>
			</div>
		</div>
	`
		)
		.join("");

	// Create carousel indicators
	const indicatorsHTML = moreDelightsProducts
		.map(
			(_, index) => `
		<div class="carousel_indicator ${index === 0 ? "active" : ""
				}" data-index="${index}"></div>
	`
		)
		.join("");

	// Mobile carousel wrapper with centered layout
	const mobileCarouselHTML = `
		<div class="mobile_product_carousel">
			<div class="mobile_product_slider">
				${mobileProductCardsHTML}
			</div>
			<div class="carousel_indicators">
				${indicatorsHTML}
			</div>
		</div>
	`;

	// Insert the mobile carousel into the mobile container
	if (mobileOutputDiv) {
		mobileOutputDiv.innerHTML = mobileCarouselHTML;
	
	}
}

function renderJapaneseDishes() {
	const desktopDishContainer = document.getElementById(
		"japanese_dish_cards_container"
	);
	const mobileDishContainer = document.getElementById(
		"japanese_mobile_carousel_track"
	);

	// Desktop rendering
	if (desktopDishContainer) {
		desktopDishContainer.innerHTML = japaneseDishes
			.map((dish, index) => {
				const isReversed = (index + 1) % 2 === 0;
				const cardClass = isReversed
					? "dish_card_reversed"
					: "dish_card_normal";
				
				// Check if videopath exists and is not empty
				const hasVideo = dish.videopath && dish.videopath.trim() !== "";
				const videoButtonClass = hasVideo ? "dish_btn btn_orange" : "dish_btn btn_orange d-none";

				return `
		<div class="dish_card ${cardClass}">
			<div class="dish_image_container">
				<img src="${dish.filepath}" alt="${dish.title}" class="dish_image" />
			</div>
			<div class="dish_details">
				<span class="dish_method">${dish.method}</span>
				<h3 class="dish_title">${dish.title}</h3>
				<div class="dish_attributes">
					<div class="history-progress one">
						<div class="progress-circle">
							<svg class="progress-ring" viewBox="0 0 120 120">
								<circle class="progress-ring-bg" cx="60" cy="60" r="50"></circle>
								<circle class="progress-ring-fill spice-progress" cx="60" cy="60" r="50" 
										data-spice-level="${dish.spiceLevel || 50}"></circle>
							</svg>
							<div class="progress-text">
								<img src="./assets/images/spice.png" alt="" class="progress-img">
							</div>
						</div>
						<div class="progress-label">
							<h3 class="label-line-1">Spice</h3>
							<h3>Level</h3>
						</div>
					</div>

					<div class="history-progress two">
						<div class="progress-circle">
							<svg class="progress-ring" viewBox="0 0 120 120">
								<circle class="progress-ring-bg" cx="60" cy="60" r="50"></circle>
								<circle class="progress-ring-fill fullness-progress" cx="60" cy="60" r="50"
										data-fullness-level="${dish.fullnessLevel || 50}"></circle>
							</svg>
							<div class="progress-text">
								<img src="./assets/images/full.png" alt="" class="progress-img">
							</div>
						</div>
						<div class="progress-label">
							<h3 class="label-line-1">Fullness</h3>
							<h3>Level</h3>
						</div>
					</div>
				</div> 
				<p class="dish_description">${dish.description}</p>
				<div class="dish_buttons">
					<button class="dish_btn btn_green recipe-btn" data-dish-id="${dish.title
						.toLowerCase()
						.replace(/\s+/g, "-")}">
						Quick Recipe
					</button>
					<button class="${videoButtonClass}" data-video-url="${dish.videopath}" data-video-title="${dish.title}" data-platform="youtube">
						Watch Now
						<img src="./assets/images/icons/video.svg" alt="" />
					</button>
				</div>
			</div>
		</div>
	`;
			})
			.join("");
	}

	// Enhanced Mobile rendering with centered carousel
	if (mobileDishContainer) {
		// Create mobile dish cards HTML
		const mobileDishCardsHTML = japaneseDishes
			.map(
				(dish, index) => `
			
		`
			)
			.join("");

		// Create carousel indicators
		const indicatorsHTML = japaneseDishes
			.map(
				(_, index) => `
			<div class="mobile_dish_carousel_indicator ${index === 0 ? "active" : ""
					}" data-index="${index}"></div>
		`
			)
			.join("");

		const mobileDishCarouselHTML = `
			<div class="mobile_dish_carousel">
				<div class="mobile_dish_slider">
					${mobileDishCardsHTML}
				</div>
				<div class="mobile_dish_carousel_indicators">
					${indicatorsHTML}
				</div>
			</div>
		`;

		mobileDishContainer.innerHTML = mobileDishCarouselHTML;
		setTimeout(() => {
			initializeMobileDishCarouselForSection(mobileDishContainer);
		}, 100);
	}
}

function renderIndonesianDishes() {
	const desktopDishContainer = document.getElementById(
		"indonesian_dish_cards_container"
	);
	const mobileDishContainer = document.getElementById(
		"indonesian_mobile_carousel_track"
	);

	// Desktop rendering
	if (desktopDishContainer) {
		desktopDishContainer.innerHTML = indonesianDishes
			.map((dish, index) => {
				const isReversed = (index + 1) % 2 === 0;
				const cardClass = isReversed
					? "dish_card_reversed"
					: "dish_card_normal";

				// Check if videopath exists and is not empty
				const hasVideo = dish.videopath && dish.videopath.trim() !== "";
				const videoButtonClass = hasVideo ? "dish_btn btn_orange" : "dish_btn btn_orange d-none";

				return `
		<div class="dish_card ${cardClass}">
			<div class="dish_image_container">
				<img src="${dish.filepath}" alt="${dish.title}" class="dish_image" />
			</div>
			<div class="dish_details">
				<span class="dish_method">${dish.method}</span>
				<h3 class="dish_title">${dish.title}</h3>
				<div class="dish_attributes">
						<div class="history-progress one">
							<div class="progress-circle">
								<svg class="progress-ring" viewBox="0 0 120 120">
									<circle class="progress-ring-bg" cx="60" cy="60" r="50"></circle>
									<circle class="progress-ring-fill spice-progress" cx="60" cy="60" r="50" 
											data-spice-level="${dish.spiceLevel || 50}"></circle>
								</svg>
								<div class="progress-text">
									<img src="./assets/images/spice.png" alt="" class="progress-img">
								</div>
							</div>
							<div class="progress-label">
								<h3 class="label-line-1">Spice</h3>
								<h3>Level</h3>
							</div>
						</div>

						<div class="history-progress two">
							<div class="progress-circle">
								<svg class="progress-ring" viewBox="0 0 120 120">
									<circle class="progress-ring-bg" cx="60" cy="60" r="50"></circle>
									<circle class="progress-ring-fill fullness-progress" cx="60" cy="60" r="50"
											data-fullness-level="${dish.fullnessLevel || 50}"></circle>
								</svg>
								<div class="progress-text">
									<img src="./assets/images/full.png" alt="" class="progress-img">
								</div>
							</div>
							<div class="progress-label">
								<h3 class="label-line-1">Fullness</h3>
								<h3>Level</h3>
							</div>
						</div>
						</div> 
				<p class="dish_description">${dish.description}</p>
				<div class="dish_buttons">
					<button class="dish_btn btn_green recipe-btn" data-dish-id="${dish.title
						.toLowerCase()
						.replace(/\s+/g, "-")}">
						Quick Recipe
					</button>
					<button class="${videoButtonClass}" data-video-url="${dish.videopath}" data-video-title="${dish.title}" data-platform="youtube">
						Watch Now
						<img src="./assets/images/icons/video.svg" alt="" />
					</button>
				</div>
			</div>
		</div>
	`;
			})
			.join("");
	}

	// Enhanced Mobile rendering with centered carousel
	if (mobileDishContainer) {
		// Create mobile dish cards HTML
		const mobileDishCardsHTML = indonesianDishes
			.map(
				(dish, index) => `
			
		`
			)
			.join("");

		// Create carousel indicators
		const indicatorsHTML = indonesianDishes
			.map(
				(_, index) => `
			<div class="mobile_dish_carousel_indicator ${index === 0 ? "active" : ""
					}" data-index="${index}"></div>
		`
			)
			.join("");

		// Mobile carousel wrapper with centered layout
		const mobileDishCarouselHTML = `
			<div class="mobile_dish_carousel">
				<div class="mobile_dish_slider">
					${mobileDishCardsHTML}
				</div>
				<div class="mobile_dish_carousel_indicators">
					${indicatorsHTML}
				</div>
			</div>
		`;

		// Insert the mobile carousel into the container
		mobileDishContainer.innerHTML = mobileDishCarouselHTML;
		// Initialize carousel for this specific section
		setTimeout(() => {
			initializeMobileDishCarouselForSection(mobileDishContainer);
		}, 100);
	}
}


// Updated renderChineseDishes function
function renderChineseDishes() {
	const desktopDishContainer = document.getElementById(
		"chinese_dish_cards_container"
	);
	const mobileDishContainer = document.getElementById(
		"chinese_mobile_carousel_track"
	);

	// Desktop rendering
	if (desktopDishContainer) {
		desktopDishContainer.innerHTML = chineseDishes
			.map((dish, index) => {
				const isReversed = (index + 1) % 2 === 0;
				const cardClass = isReversed
					? "dish_card_reversed"
					: "dish_card_normal";

				// Check if videopath exists and is not empty
				const hasVideo = dish.videopath && dish.videopath.trim() !== "";
				const videoButtonClass = hasVideo ? "dish_btn btn_orange" : "dish_btn btn_orange d-none";

				return `
		<div class="dish_card ${cardClass}">
			<div class="dish_image_container">
				<img src="${dish.filepath}" alt="${dish.title}" class="dish_image" />
			</div>
			<div class="dish_details">
				<span class="dish_method">${dish.method}</span>
				<h3 class="dish_title">${dish.title}</h3>
				<div class="dish_attributes">
						<div class="history-progress one">
							<div class="progress-circle">
								<svg class="progress-ring" viewBox="0 0 120 120">
									<circle class="progress-ring-bg" cx="60" cy="60" r="50"></circle>
									<circle class="progress-ring-fill spice-progress" cx="60" cy="60" r="50" 
											data-spice-level="${dish.spiceLevel || 50}"></circle>
								</svg>
								<div class="progress-text">
									<img src="./assets/images/spice.png" alt="" class="progress-img">
								</div>
							</div>
							<div class="progress-label">
								<h3 class="label-line-1">Spice</h3>
								<h3>Level</h3>
							</div>
						</div>

						<div class="history-progress two">
							<div class="progress-circle">
								<svg class="progress-ring" viewBox="0 0 120 120">
									<circle class="progress-ring-bg" cx="60" cy="60" r="50"></circle>
									<circle class="progress-ring-fill fullness-progress" cx="60" cy="60" r="50"
											data-fullness-level="${dish.fullnessLevel || 50}"></circle>
								</svg>
								<div class="progress-text">
									<img src="./assets/images/full.png" alt="" class="progress-img">
								</div>
							</div>
							<div class="progress-label">
								<h3 class="label-line-1">Fullness</h3>
								<h3>Level</h3>
							</div>
						</div>
						</div> 
				<p class="dish_description">${dish.description}</p>
				<div class="dish_buttons">
					<button class="dish_btn btn_green recipe-btn" data-dish-id="${dish.title
						.toLowerCase()
						.replace(/\s+/g, "-")}">
						Quick Recipe
					</button>
					<button class="${videoButtonClass}" data-video-url="${dish.videopath}" data-video-title="${dish.title}" data-platform="youtube">
						Watch Now
						<img src="./assets/images/icons/video.svg" alt="" />
					</button>
				</div>
			</div>
		</div>
	`;
			})
			.join("");
	}

	// Enhanced Mobile rendering with centered carousel
	if (mobileDishContainer) {
		// Create mobile dish cards HTML
		const mobileDishCardsHTML = chineseDishes
			.map(
				(dish, index) => `
			
		`
			)
			.join("");

		// Create carousel indicators
		const indicatorsHTML = chineseDishes
			.map(
				(_, index) => `
			<div class="mobile_dish_carousel_indicator ${index === 0 ? "active" : ""
					}" data-index="${index}"></div>
		`
			)
			.join("");

		// Mobile carousel wrapper with centered layout
		const mobileDishCarouselHTML = `
			<div class="mobile_dish_carousel">
				<div class="mobile_dish_slider">
					${mobileDishCardsHTML}
				</div>
				<div class="mobile_dish_carousel_indicators">
					${indicatorsHTML}
				</div>
			</div>
		`;

		// Insert the mobile carousel into the container
		mobileDishContainer.innerHTML = mobileDishCarouselHTML;
		// Initialize carousel for this specific section
		setTimeout(() => {
			initializeMobileDishCarouselForSection(mobileDishContainer);
		}, 100);
	}
}

// Updated renderModalContent function to handle subIngredients
function renderModalContent(dish) {
	const modal = document.getElementById("recipeModal");
	if (!modal) {
		console.log("Modal not found!");
		return;
	}

	const modalContent = modal.querySelector(".recipie_content");
	if (!modalContent) {
		console.log("Modal content not found!");
		return;
	}

	console.log("Updating modal content for:", dish.title); // Debug log

	// Set background image using CSS custom property
	const recipeWrapper = modal.querySelector(".recipe-wrapper");
	if (recipeWrapper) {
		recipeWrapper.style.setProperty("--dish-image", `url(${dish.filepath})`);
	}

	// Update modal content
	const titleElement = modalContent.querySelector(".recipie_popup_head_title");
	const ingredientsElement = modalContent.querySelector(
		".recipie_popup_ingredients"
	);
	const stepsElement = modalContent.querySelector(
		".recipie_popup_steps_section"
	);

	if (titleElement) {
		titleElement.textContent = dish.title;
		console.log("Title updated:", dish.title);
	} else {
		console.log("Title element not found!");
	}

	if (ingredientsElement) {
		let ingredientsHTML = '<div class="ingredients-list">';
		
		// Create main ingredients paragraph
		const mainIngredients = dish.Ingredients.map(ingredient => ingredient.name).join(', ');
		ingredientsHTML += `<p>${mainIngredients}</p>`;
		
		// Check if dish has Sauce array and add it
		if (dish.Sauce && Array.isArray(dish.Sauce)) {
			const sauceIngredients = dish.Sauce.join(', ');
			ingredientsHTML += `<p><strong>Sauce:</strong> ${sauceIngredients}</p>`;
		}
		
		ingredientsHTML += '</div>';
		ingredientsElement.innerHTML = ingredientsHTML;
		
		console.log("Ingredients updated:", dish.Ingredients.length, "items");
	} else {
		console.log("Ingredients element not found!");
	}

	if (stepsElement) {
		stepsElement.innerHTML = `
			
			<ol>
				${dish.steps.map((step) => `<li>${step.title}</li>`).join("")}
			</ol>
		`;
		console.log("Steps updated:", dish.steps.length, "steps");
	} else {
		console.log("Steps element not found!");
	}

	console.log("Modal content updated for:", dish.title); // Debug log
}

// Initialize mobile carousel functionality
// function initializeMobileCarousel() {
// 	const carouselTrack = document.querySelector(".mobile_carousel_track");
// 	const dots = document.querySelectorAll(".mobile_carousel_dot");
// 	const cards = document.querySelectorAll(".mobile_dish_card");

// 	if (!carouselTrack || !dots.length || !cards.length) return;

// 	let currentSlide = 0;
// 	const totalSlides = cards.length;

// 	// Set up carousel track
// 	carouselTrack.style.display = "flex";
// 	carouselTrack.style.transition = "transform 0.3s ease";

// 	// Function to update carousel position
// 	function updateCarousel() {
// 		const translateX = -currentSlide * 100;
// 		carouselTrack.style.transform = `translateX(${translateX}%)`;

// 		// Update active dot
// 		dots.forEach((dot, index) => {
// 			dot.classList.toggle("active", index === currentSlide);
// 		});
// 	}

// 	// Dot click handlers
// 	dots.forEach((dot, index) => {
// 		dot.addEventListener("click", () => {
// 			currentSlide = index;
// 			updateCarousel();
// 		});
// 	});

// 	// Touch/swipe functionality
// 	let startX = 0;
// 	let startY = 0;
// 	let isDragging = false;

// 	carouselTrack.addEventListener("touchstart", (e) => {
// 		startX = e.touches[0].clientX;
// 		startY = e.touches[0].clientY;
// 		isDragging = true;
// 	});

// 	carouselTrack.addEventListener("touchmove", (e) => {
// 		if (!isDragging) return;
// 		e.preventDefault();
// 	});

// 	carouselTrack.addEventListener("touchend", (e) => {
// 		if (!isDragging) return;

// 		const endX = e.changedTouches[0].clientX;
// 		const endY = e.changedTouches[0].clientY;
// 		const diffX = startX - endX;
// 		const diffY = startY - endY;

// 		// Only handle horizontal swipes
// 		if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
// 			if (diffX > 0 && currentSlide < totalSlides - 1) {
// 				// Swipe left - next slide
// 				currentSlide++;
// 			} else if (diffX < 0 && currentSlide > 0) {
// 				// Swipe right - previous slide
// 				currentSlide--;
// 			}
// 			updateCarousel();
// 		}

// 		isDragging = false;
// 	});

// 	// Initialize first slide
// 	updateCarousel();
// }

// Render modal content dynamically
// function renderModalContent(dish) {
// 	const modal = document.getElementById("recipeModal");
// 	if (!modal) {
// 		console.log("Modal not found!");
// 		return;
// 	}

// 	const modalContent = modal.querySelector(".recipie_content");
// 	if (!modalContent) {
// 		console.log("Modal content not found!");
// 		return;
// 	}

// 	console.log("Updating modal content for:", dish.title); // Debug log

// 	// Set background image using CSS custom property
// 	const recipeWrapper = modal.querySelector(".recipe-wrapper");
// 	if (recipeWrapper) {
// 		recipeWrapper.style.setProperty("--dish-image", `url(${dish.filepath})`);
// 	}

// 	// Update modal content
// 	const titleElement = modalContent.querySelector(".recipie_popup_head_title");
// 	const ingredientsElement = modalContent.querySelector(
// 		".recipie_popup_ingredients"
// 	);
// 	const stepsElement = modalContent.querySelector(
// 		".recipie_popup_steps_section"
// 	);

// 	if (titleElement) {
// 		titleElement.textContent = dish.title;
// 		console.log("Title updated:", dish.title);
// 	} else {
// 		console.log("Title element not found!");
// 	}

// 	if (ingredientsElement) {
// 		ingredientsElement.innerHTML = `<p>${dish.Ingredients.map(
// 			(ingredient) => ingredient.name
// 		).join(", ")}</p>`;
// 		console.log("Ingredients updated:", dish.Ingredients.length, "items");
// 	} else {
// 		console.log("Ingredients element not found!");
// 	}

// 	if (stepsElement) {
// 		stepsElement.innerHTML = `
// 			<div class="recipie_popup_steps_title">Preparation Steps</div>
// 			<ol>
// 				${dish.steps.map((step) => `<li>${step.title}</li>`).join("")}
// 			</ol>
// 		`;
// 		console.log("Steps updated:", dish.steps.length, "steps");
// 	} else {
// 		console.log("Steps element not found!");
// 	}

// 	console.log("Modal content updated for:", dish.title); // Debug log
// }





// Header Animation System (same as main page)
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
			{ y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
		);

		this.setupScrollTrigger();
		this.setupScrollListener();
	}

	setupScrollTrigger() {
		// Header background change on scroll
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.create({
			trigger: "body",
			start: "top -80",
			end: "bottom bottom",
			onEnter: () => {
				this.header.classList.add("header-scrolled");
				this.updateHeaderOnScroll(true);
			},
			onLeaveBack: () => {
				this.header.classList.remove("header-scrolled");
				this.updateHeaderOnScroll(false);
			},
		});
	}

	updateHeaderOnScroll(isScrolled) {
		const logo = this.header.querySelector(".header-logo-innerpage");
		const navLinks = this.header.querySelectorAll(".nav-link");
		const isMobile = window.innerWidth <= 991;

		if (isScrolled) {
			// Add scrolled styling
			this.header.classList.add("header-scrolled-styling");

			// Change logo to green (desktop only) or keep white (mobile)
			if (logo) {
				if (isMobile) {
					// Keep white logo on mobile
					logo.src = "./assets/images/keells-logo-footer-mobile.png";
				} else {
					// Change to green logo on desktop
					logo.src = "./assets/images/keells-logo-green.png";
				}
			}

			// Change navigation text colors
			navLinks.forEach((link) => {
				link.classList.add("nav-link-scrolled");
			});
		} else {
			// Remove scrolled styling
			this.header.classList.remove("header-scrolled-styling");

			// Change logo back to white
			if (logo) {
				logo.src = "./assets/images/keells-logo-footer-mobile.png";
			}

			// Remove navigation text color changes
			navLinks.forEach((link) => {
				link.classList.remove("nav-link-scrolled");
			});
		}
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

		// Handle window resize for logo changes
		window.addEventListener("resize", () => {
			const isScrolled = this.header.classList.contains(
				"header-scrolled-styling"
			);
			if (isScrolled) {
				this.updateHeaderOnScroll(true);
			}
		});
	}
}

// Mobile Menu Functionality
function initializeMobileMenu() {
	const navbarToggler = document.querySelector(".navbar-toggler");
	const navbarCollapse = document.querySelector(".navbar-collapse");

	if (!navbarToggler || !navbarCollapse) return;

	// Function to close the navbar
	function closeNavbar() {
		if (navbarCollapse.classList.contains("show")) {
			navbarToggler.click(); // Trigger the toggle to close
		}
	}

	// Close navbar when clicking outside
	document.addEventListener("click", (event) => {
		// Check if the clicked element is outside the navbar
		const navbar = document.querySelector(".navbar");
		if (
			navbar &&
			!navbar.contains(event.target) &&
			navbarCollapse.classList.contains("show")
		) {
			closeNavbar();
		}
	});

	// Optional: Close navbar when clicking on nav links (for smooth UX on mobile)
	const navLinks = document.querySelectorAll(".nav-link");
	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			closeNavbar();
		});
	});
}

// Render products when the page loads
window.addEventListener("load", () => {
	renderMoreDelightsProducts(); // Desktop version
	renderMobileMoreDelightsProducts(); // Mobile version
	//renderThaiDishes(); // Render dishes dynamically
	renderJapaneseDishes();
	renderIndonesianDishes();
	renderChineseDishes();

	// Initialize header animations
	new HeaderAnimations();

	// Initialize mobile menu functionality
	initializeMobileMenu();

	// Initialize modal buttons after content is rendered
	setTimeout(() => {
		initializeModalHandlers();

		const videoModalHandler = initVideoModal();

		window.videoModalHandler = videoModalHandler;
	}, 100);

	
});

// dish mobile

// Enhanced Mobile Dish Carousel functionality for specific section
function initializeMobileDishCarouselForSection(container) {
	const slider = container.querySelector(".mobile_dish_slider");
	const cards = container.querySelectorAll(".mobile_dish_card");
	const indicators = container.querySelectorAll(
		".mobile_dish_carousel_indicator"
	);

	if (!slider || !cards.length || !indicators.length) return;

	let currentIndex = 0;
	let startX = 0;
	let currentX = 0;
	let isDragging = false;

	// Calculate card dimensions and spacing
	function getCardDimensions() {
		const containerWidth = slider.offsetWidth;
		const cardWidth = Math.min(320, containerWidth * 0.75); // 75% of container or max 320px
		const cardSpacing = 20; // Space between cards
		return { cardWidth, cardSpacing, containerWidth };
	}

	// Update carousel position with centered layout
	function updateCarousel(index, smooth = true) {
		// Remove active class from all cards and indicators
		cards.forEach((card, i) => {
			card.classList.remove("active", "prev", "next");

			// Add position classes for styling
			if (i === index) {
				card.classList.add("active");
			} else if (i === index - 1) {
				card.classList.add("prev");
			} else if (i === index + 1) {
				card.classList.add("next");
			}
		});

		indicators.forEach((indicator) => indicator.classList.remove("active"));

		// Add active class to current indicator
		if (indicators[index]) indicators[index].classList.add("active");

		// Calculate transform for centered layout
		const { cardWidth, cardSpacing } = getCardDimensions();
		const totalCardWidth = cardWidth + cardSpacing;
		const centerOffset = (slider.offsetWidth - cardWidth) / 2;
		const translateX = centerOffset - index * totalCardWidth;

		// Apply transform with smooth transition
		slider.style.transition = smooth
			? "transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)"
			: "none";
		slider.style.transform = `translateX(${translateX}px)`;

		currentIndex = index;
	}

	// Indicator click handlers
	indicators.forEach((indicator, index) => {
		indicator.addEventListener("click", () => {
			updateCarousel(index);
		});
	});

	// Touch/swipe functionality
	slider.addEventListener("touchstart", (e) => {
		startX = e.touches[0].clientX;
		isDragging = true;
		slider.style.transition = "none";
	});

	slider.addEventListener("touchmove", (e) => {
		if (!isDragging) return;

		e.preventDefault(); // Prevent scrolling
		currentX = e.touches[0].clientX;
		const diffX = currentX - startX;

		// Calculate current transform and add drag offset
		const { cardWidth, cardSpacing } = getCardDimensions();
		const totalCardWidth = cardWidth + cardSpacing;
		const centerOffset = (slider.offsetWidth - cardWidth) / 2;
		const baseTranslateX = centerOffset - currentIndex * totalCardWidth;
		const newTranslateX = baseTranslateX + diffX;

		slider.style.transform = `translateX(${newTranslateX}px)`;
	});

	slider.addEventListener("touchend", (e) => {
		if (!isDragging) return;

		isDragging = false;
		const diffX = currentX - startX;
		const threshold = 50; // Minimum swipe distance

		if (Math.abs(diffX) > threshold) {
			if (diffX > 0 && currentIndex > 0) {
				// Swipe right - previous slide
				currentIndex--;
			} else if (diffX < 0 && currentIndex < cards.length - 1) {
				// Swipe left - next slide
				currentIndex++;
			}
		}

		updateCarousel(currentIndex);
	});

	// Initialize first slide
	updateCarousel(0);
}

// Enhanced Mobile Dish Carousel functionality (similar to product carousel)
function initializeMobileDishCarousel() {
	const slider = document.querySelector(".mobile_dish_slider");
	const cards = document.querySelectorAll(".mobile_dish_card");
	const indicators = document.querySelectorAll(
		".mobile_dish_carousel_indicator"
	);

	if (!slider || !cards.length || !indicators.length) return;

	let currentIndex = 0;
	let startX = 0;
	let currentX = 0;
	let isDragging = false;

	// Calculate card dimensions and spacing
	function getCardDimensions() {
		const containerWidth = slider.offsetWidth;
		const cardWidth = Math.min(320, containerWidth * 0.75); // 75% of container or max 320px
		const cardSpacing = 20; // Space between cards
		return { cardWidth, cardSpacing, containerWidth };
	}

	// Update carousel position with centered layout
	function updateCarousel(index, smooth = true) {
		// Remove active class from all cards and indicators
		cards.forEach((card, i) => {
			card.classList.remove("active", "prev", "next");

			// Add position classes for styling
			if (i === index) {
				card.classList.add("active");
			} else if (i === index - 1) {
				card.classList.add("prev");
			} else if (i === index + 1) {
				card.classList.add("next");
			}
		});

		indicators.forEach((indicator) => indicator.classList.remove("active"));

		// Add active class to current indicator
		if (indicators[index]) indicators[index].classList.add("active");

		// Calculate transform for centered layout
		const { cardWidth, cardSpacing } = getCardDimensions();
		const totalCardWidth = cardWidth + cardSpacing;
		const centerOffset = (slider.offsetWidth - cardWidth) / 2;
		const translateX = centerOffset - index * totalCardWidth;

		// Apply transform with smooth transition
		slider.style.transition = smooth
			? "transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)"
			: "none";
		slider.style.transform = `translateX(${translateX}px)`;

		currentIndex = index;
	}

	// Indicator click handlers
	indicators.forEach((indicator, index) => {
		indicator.addEventListener("click", () => {
			updateCarousel(index);
			resetAutoPlay();
		});
	});

	// Touch/swipe functionality
	slider.addEventListener("touchstart", (e) => {
		startX = e.touches[0].clientX;
		isDragging = true;
		stopAutoPlay();
		slider.style.transition = "none";
	});

	slider.addEventListener("touchmove", (e) => {
		if (!isDragging) return;

		e.preventDefault(); // Prevent scrolling
		currentX = e.touches[0].clientX;
		const diffX = currentX - startX;

		// Calculate current transform and add drag offset
		const { cardWidth, cardSpacing } = getCardDimensions();
		const totalCardWidth = cardWidth + cardSpacing;
		const centerOffset = (slider.offsetWidth - cardWidth) / 2;
		const baseTranslateX = centerOffset - currentIndex * totalCardWidth;
		const newTranslateX = baseTranslateX + diffX;

		slider.style.transform = `translateX(${newTranslateX}px)`;
	});

	slider.addEventListener("touchend", (e) => {
		if (!isDragging) return;

		isDragging = false;
		const diffX = currentX - startX;
		const threshold = 50; // Minimum swipe distance

		if (Math.abs(diffX) > threshold) {
			if (diffX > 0 && currentIndex > 0) {
				// Swipe right - go to previous
				updateCarousel(currentIndex - 1);
			} else if (diffX < 0 && currentIndex < cards.length - 1) {
				// Swipe left - go to next
				updateCarousel(currentIndex + 1);
			} else {
				// Snap back to current
				updateCarousel(currentIndex);
			}
		} else {
			// Snap back to current
			updateCarousel(currentIndex);
		}

		resetAutoPlay();
	});

	// Mouse/pointer events for desktop testing
	let isMouseDragging = false;
	let mouseStartX = 0;

	slider.addEventListener("mousedown", (e) => {
		mouseStartX = e.clientX;
		isMouseDragging = true;
		stopAutoPlay();
		slider.style.transition = "none";
		slider.style.cursor = "grabbing";
		e.preventDefault();
	});

	document.addEventListener("mousemove", (e) => {
		if (!isMouseDragging) return;

		const diffX = e.clientX - mouseStartX;
		const { cardWidth, cardSpacing } = getCardDimensions();
		const totalCardWidth = cardWidth + cardSpacing;
		const centerOffset = (slider.offsetWidth - cardWidth) / 2;
		const baseTranslateX = centerOffset - currentIndex * totalCardWidth;
		const newTranslateX = baseTranslateX + diffX;

		slider.style.transform = `translateX(${newTranslateX}px)`;
	});

	document.addEventListener("mouseup", (e) => {
		if (!isMouseDragging) return;

		isMouseDragging = false;
		slider.style.cursor = "grab";

		const diffX = e.clientX - mouseStartX;
		const threshold = 50;

		if (Math.abs(diffX) > threshold) {
			if (diffX > 0 && currentIndex > 0) {
				updateCarousel(currentIndex - 1);
			} else if (diffX < 0 && currentIndex < cards.length - 1) {
				updateCarousel(currentIndex + 1);
			} else {
				updateCarousel(currentIndex);
			}
		} else {
			updateCarousel(currentIndex);
		}

		resetAutoPlay();
	});

	// Handle window resize
	window.addEventListener("resize", () => {
		updateCarousel(currentIndex, false);
	});

	// Auto-play functionality
	let autoPlayInterval;

	function startAutoPlay() {
		autoPlayInterval = setInterval(() => {
			const nextIndex = (currentIndex + 1) % cards.length;
			updateCarousel(nextIndex);
		}, 12000); // Change slide every 12 seconds
	}

	function stopAutoPlay() {
		clearInterval(autoPlayInterval);
	}

	function resetAutoPlay() {
		stopAutoPlay();
		// Resume auto-play after 5 seconds of inactivity
		setTimeout(startAutoPlay, 5000);
	}

	// Initialize carousel
	updateCarousel(0, false);

	// Start auto-play
	startAutoPlay();

	// Pause auto-play on hover (for desktop)
	slider.addEventListener("mouseenter", stopAutoPlay);
	slider.addEventListener("mouseleave", resetAutoPlay);

	// Pause auto-play when recipe buttons are clicked
	const recipeButtons = slider.querySelectorAll(".recipe-btn");
	recipeButtons.forEach((button) => {
		button.addEventListener("mousedown", stopAutoPlay);
		button.addEventListener("touchstart", stopAutoPlay);
		button.addEventListener("click", () => {
			// Keep auto-play stopped for longer when recipe button is clicked
			stopAutoPlay();
			setTimeout(() => {
				resetAutoPlay();
			}, 10000); // Resume after 10 seconds when recipe button is clicked
		});
	});
}

// popup button functions
function initializeModalHandlers() {
	const modal = document.getElementById("recipeModal");
	const openButtons = document.querySelectorAll(".recipe-btn");
	const closeButton = modal?.querySelector(".recipie_popup_head img");

	console.log("Modal found:", modal); // Debug log
	console.log("Open buttons found:", openButtons.length); // Debug log
	console.log("Close button found:", closeButton); // Debug log

	// Function to open modal
	function openRecipeModal() {
		if (modal) {
			console.log("Opening modal..."); // Debug log
			modal.style.display = "flex";
			document.body.style.overflow = "hidden";
			document.body.classList.add("modal-open");
			// Add a small delay to trigger the animation
			setTimeout(() => {
				modal.style.opacity = "1";
				modal.classList.add("show");
			}, 10);
		}
	}

	// Function to close modal
	function closeRecipeModal() {
		if (modal) {
			console.log("Closing modal..."); // Debug log
			modal.style.opacity = "0";
			modal.classList.remove("show");
			document.body.style.overflow = "";
			document.body.classList.remove("modal-open");
			// Wait for the fade out animation before hiding
			setTimeout(() => {
				modal.style.display = "none";
			}, 300);
		}
	}

	// Open modal on button click
	openButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			console.log("Recipe button clicked"); // Debug log
			const dishId = e.target.getAttribute("data-dish-id");
			console.log("Dish ID:", dishId); // Debug log
			if (dishId) {
				// Search through all dish arrays to find the matching dish
				let dish = thaiDishes.find(
					(d) => d.title.toLowerCase().replace(/\s+/g, "-") === dishId
				);
				if (!dish)
					dish = japaneseDishes.find(
						(d) => d.title.toLowerCase().replace(/\s+/g, "-") === dishId
					);
				if (!dish)
					dish = indonesianDishes.find(
						(d) => d.title.toLowerCase().replace(/\s+/g, "-") === dishId
					);
				if (!dish)
					dish = chineseDishes.find(
						(d) => d.title.toLowerCase().replace(/\s+/g, "-") === dishId
					);

				console.log("Found dish:", dish); // Debug log
				if (dish) {
					renderModalContent(dish);
				}
			}
			openRecipeModal();
		});
	});

	// Close modal on close button (image) click
	if (closeButton) {
		closeButton.addEventListener("click", closeRecipeModal);
		// Add cursor pointer style to indicate it's clickable
		closeButton.style.cursor = "pointer";
	}

	// Close modal when clicking outside
	modal.addEventListener("click", function (event) {
		if (event.target === modal) {
			closeRecipeModal();
		}
	});

	// Close modal on Escape key press
	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			closeRecipeModal();
		}
	});

	// Prevent modal from closing when clicking inside the modal content
	const modalContent = modal.querySelector(".recipie_popup");
	if (modalContent) {
		modalContent.addEventListener("click", function (event) {
			event.stopPropagation();
		});
	}
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
	// Render products
	renderMoreDelightsProducts();
	renderMobileMoreDelightsProducts();

	// Render dishes for all cuisines
	//renderThaiDishes();
	renderJapaneseDishes();
	renderIndonesianDishes();
	renderChineseDishes();

	// Initialize recipe modal functionality
	initializeModalHandlers();
});


// video section popup


// Video Modal Handler Function
function initVideoModal() {
	const videoModal = document.getElementById('innerpage_videoModal');
	const videoIframe = document.getElementById('videoIframe');
	const closeBtn = document.getElementById('modalCloseBtn');

	// Function to convert YouTube URL to embeddable format
	function getEmbedUrl(url, platform) {
		if (platform === 'youtube') {
			// Handle different YouTube URL formats
			let videoId = '';

			// YouTube Shorts format: https://www.youtube.com/shorts/VIDEO_ID
			if (url.includes('/shorts/')) {
				videoId = url.split('/shorts/')[1].split('?')[0];
			}
			// Regular YouTube format: https://www.youtube.com/watch?v=VIDEO_ID
			else if (url.includes('watch?v=')) {
				videoId = url.split('watch?v=')[1].split('&')[0];
			}
			// Short YouTube format: https://youtu.be/VIDEO_ID
			else if (url.includes('youtu.be/')) {
				videoId = url.split('youtu.be/')[1].split('?')[0];
			}

			return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
		}

		// Add other platforms as needed
		return url;
	}

	// Function to open modal with video
	function openVideoModal(videoUrl, videoTitle, platform) {
		const embedUrl = getEmbedUrl(videoUrl, platform);

		// Set the iframe source
		videoIframe.src = embedUrl;

		// Show the modal
		videoModal.style.display = 'flex';

		// Prevent body scrolling
		document.body.style.overflow = 'hidden';
	}

	// Function to close modal
	function closeVideoModal() {
		// Hide the modal
		videoModal.style.display = 'none';

		// Stop video by clearing iframe source
		videoIframe.src = '';

		// Restore body scrolling
		document.body.style.overflow = 'auto';
	}

	function addVideoButtonListeners() {
		// Existing video cards
		const desktopVideoCards = document.querySelectorAll('.inner_video_card');
		desktopVideoCards.forEach(card => {
			card.addEventListener('click', function () {
				const videoUrl = this.getAttribute('data-video-url');
				const videoTitle = this.getAttribute('data-video-title');
				const platform = this.getAttribute('data-platform');

				if (videoUrl) {
					openVideoModal(videoUrl, videoTitle, platform);
				}
			});
		});

		const mobileVideoCards = document.querySelectorAll('.inner_video_card_mobile');
		mobileVideoCards.forEach(card => {
			card.addEventListener('click', function () {
				const videoUrl = this.getAttribute('data-video-url');
				const videoTitle = this.getAttribute('data-video-title');
				const platform = this.getAttribute('data-platform');

				if (videoUrl) {
					openVideoModal(videoUrl, videoTitle, platform);
				}
			});
		});

		// New: Add listeners for dish card video buttons
		const dishVideoButtons = document.querySelectorAll('.dish_btn.btn_orange:not(.d-none), .mobile_dish_btn.btn_orange:not(.d-none)');
		dishVideoButtons.forEach(button => {
			button.addEventListener('click', function (e) {
				e.preventDefault(); // Prevent any default button behavior
				
				const videoUrl = this.getAttribute('data-video-url');
				const videoTitle = this.getAttribute('data-video-title');
				const platform = this.getAttribute('data-platform') || 'youtube';

				if (videoUrl && videoUrl.trim() !== '') {
					openVideoModal(videoUrl, videoTitle, platform);
				}
			});
		});
	}

	// Close modal when close button is clicked
	if (closeBtn) {
		closeBtn.addEventListener('click', closeVideoModal);
	}

	// Close modal when clicking outside the video content
	if (videoModal) {
		videoModal.addEventListener('click', function (e) {
			if (e.target === videoModal) {
				closeVideoModal();
			}
		});
	}

	// Close modal when pressing Escape key
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && videoModal && videoModal.style.display === 'flex') {
			closeVideoModal();
		}
	});

	addVideoButtonListeners();

	return {
		addVideoButtonListeners
	};
}

// Initialize the video modal functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', initVideoModal);

// Alternative initialization if you're using jQuery (since I see you have it in your HTML)
$(document).ready(function () {
	initVideoModal();
});


// Progress Circle Animation for Dish Cards
function initializeProgressCircleAnimations() {
  // Function to calculate stroke-dashoffset based on percentage
  function calculateStrokeDashOffset(percentage) {
    const radius = 50; // Circle radius from SVG
    const circumference = 2 * Math.PI * radius; // ≈ 314.16
    return circumference - (percentage / 100) * circumference;
  }

  // Function to animate a single progress circle
  function animateProgressCircle(circle, targetPercentage, duration = 1000) {
    const circumference = 2 * Math.PI * 50; // ≈ 314.16
    const startOffset = circumference; // Start from 0% (full circle)
    const endOffset = calculateStrokeDashOffset(targetPercentage);
    
    // Set initial state
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = startOffset;
    circle.style.transition = 'none';
    
    // Force a reflow to ensure the initial state is applied
    circle.offsetHeight;
    
    // Apply the animation
    circle.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
    circle.style.strokeDashoffset = endOffset;
  }

  // Function to animate all progress circles in a card
  function animateCardProgressCircles(card) {
    const spiceProgressCircles = card.querySelectorAll('.spice-progress');
    const fullnessProgressCircles = card.querySelectorAll('.fullness-progress');
    
    spiceProgressCircles.forEach(circle => {
      const spiceLevel = parseInt(circle.getAttribute('data-spice-level') || '50');
      // Add a small delay for visual effect
      setTimeout(() => {
        animateProgressCircle(circle, spiceLevel, 1200);
      }, 100);
    });
    
    fullnessProgressCircles.forEach(circle => {
      const fullnessLevel = parseInt(circle.getAttribute('data-fullness-level') || '50');
      // Add a slightly larger delay for staggered effect
      setTimeout(() => {
        animateProgressCircle(circle, fullnessLevel, 1200);
      }, 300);
    });
  }

  // Function to reset progress circles to initial state
  function resetCardProgressCircles(card) {
    const progressCircles = card.querySelectorAll('.progress-ring-fill');
    const circumference = 2 * Math.PI * 50;
    
    progressCircles.forEach(circle => {
      circle.style.transition = 'none';
      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = circumference; // Reset to 0%
    });
  }

  // Create Intersection Observer for desktop dish cards
  const desktopObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Card is entering viewport - animate
        animateCardProgressCircles(entry.target);
      } else {
        // Card is leaving viewport - reset for next time
        resetCardProgressCircles(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px', // Trigger when 10% of the card is visible
    threshold: 0.2 // Trigger when 20% of the card is visible
  });

  // Create Intersection Observer for mobile dish cards
  const mobileObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Card is entering viewport - animate
        animateCardProgressCircles(entry.target);
      } else {
        // Card is leaving viewport - reset for next time
        resetCardProgressCircles(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -20% 0px', // Trigger when 20% of the card is visible
    threshold: 0.3 // Trigger when 30% of the card is visible
  });

  // Function to observe cards
  function observeCards() {
    // Observe desktop dish cards
    const desktopDishCards = document.querySelectorAll('.dish_card');
    desktopDishCards.forEach(card => {
      desktopObserver.observe(card);
    });

    // Observe mobile dish cards
    const mobileDishCards = document.querySelectorAll('.mobile_dish_card_inner');
    mobileDishCards.forEach(card => {
      mobileObserver.observe(card);
    });

    // Also observe any existing mobile dish cards in owl carousel items
    const owlCarouselItems = document.querySelectorAll('.owl-carousel .item .mobile_dish_card_inner');
    owlCarouselItems.forEach(card => {
      mobileObserver.observe(card);
    });
  }

  // Initial observation
  observeCards();

  // Re-observe when new content is dynamically added
  const contentObserver = new MutationObserver((mutations) => {
    let shouldReObserve = false;
    
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) { // Element node
          if (node.classList?.contains('dish_card') || 
              node.classList?.contains('mobile_dish_card_inner') ||
              node.querySelector?.('.dish_card, .mobile_dish_card_inner')) {
            shouldReObserve = true;
          }
        }
      });
    });
    
    if (shouldReObserve) {
      // Small delay to ensure DOM is fully updated
      setTimeout(observeCards, 100);
    }
  });

  // Observe the main containers for dynamically added content
  const containers = [
    document.getElementById('japanese_dish_cards_container'),
    document.getElementById('indonesian_dish_cards_container'),
    document.getElementById('chinese_dish_cards_container'),
    document.getElementById('japanese_mobile_carousel_track'),
    document.getElementById('indonesian_mobile_carousel_track'),
    document.getElementById('chinese_mobile_carousel_track')
  ].filter(Boolean);

  containers.forEach(container => {
    contentObserver.observe(container, {
      childList: true,
      subtree: true
    });
  });

  // Handle carousel changes for mobile
  function handleCarouselChange() {
    // When carousel changes, animate visible cards
    setTimeout(() => {
      const activeCards = document.querySelectorAll('.mobile_dish_card.active .mobile_dish_card_inner, .item.active .mobile_dish_card_inner');
      activeCards.forEach(card => {
        animateCardProgressCircles(card);
      });
    }, 100);
  }

  // Listen for carousel events if using Owl Carousel
  if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
    $('.owl-carousel').on('changed.owl.carousel', handleCarouselChange);
  }

  // Manual trigger function for testing
  window.triggerProgressAnimations = function() {
    const allCards = document.querySelectorAll('.dish_card, .mobile_dish_card_inner');
    allCards.forEach(card => {
      animateCardProgressCircles(card);
    });
  };

  console.log('Progress circle animations initialized');
}

// CSS styles for the progress circles (add this to your CSS file)
const progressCircleCSS = `
  .progress-ring-fill {
    stroke-dasharray: 314.16;
    stroke-dashoffset: 314.16;
    transform-origin: center;
    transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0.0, 0.2, 1);
  }
  
  .progress-ring {
    transform: rotate(-90deg);
  }
  
  .progress-ring-bg {
    fill: none;
    stroke: #e0e0e0;
    stroke-width: 4;
  }
  
  .spice-progress {
    stroke: #ff6b35;
    stroke-width: 4;
    fill: none;
  }
  
  .fullness-progress {
    stroke: #4CAF50;
    stroke-width: 4;
    fill: none;
  }
`;

// Inject CSS if it doesn't exist
function injectProgressCircleCSS() {
  const existingStyle = document.getElementById('progress-circle-styles');
  if (!existingStyle) {
    const style = document.createElement('style');
    style.id = 'progress-circle-styles';
    style.textContent = progressCircleCSS;
    document.head.appendChild(style);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    injectProgressCircleCSS();
    initializeProgressCircleAnimations();
  });
} else {
  injectProgressCircleCSS();
  initializeProgressCircleAnimations();
}