// shared-utils.js - Common utilities shared across all cuisine pages

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Modal Management Functions
 */
export function openRecipeModal() {
  const modal = document.getElementById("recipeModal");
  if (modal) {
    console.log("Opening modal...");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    setTimeout(() => {
      modal.style.opacity = "1";
      modal.classList.add("show");
    }, 10);
  }
}

export function closeRecipeModal() {
  const modal = document.getElementById("recipeModal");
  if (modal) {
    console.log("Closing modal...");
    modal.style.opacity = "0";
    modal.classList.remove("show");
    document.body.style.overflow = "";
    document.body.classList.remove("modal-open");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
}

/**
 * Generic Modal Handler Initializer
 * @param {Object} dishData - The dish data object (e.g., dishes.Indiandishitems)
 * @param {string} cuisineName - Name of the cuisine (e.g., 'indian')
 * @param {Function} renderModalContent - Function to render modal content
 */
export function initializeModalHandlers(dishData, cuisineName, renderModalContent) {
  const modal = document.getElementById("recipeModal");
  const closeButton = modal?.querySelector(".recipie_popup_head img");

  // Event delegation for both desktop and mobile recipe buttons
  document.addEventListener("click", (e) => {
    const button = e.target.closest(".recipe-btn");
    if (button) {
      const cuisine = button.getAttribute("data-cuisine");
      
      // Only handle dishes for the current cuisine
      if (cuisine === cuisineName.toLowerCase()) {
        console.log(
          "Recipe button clicked:",
          button.classList.contains("mobile_dish_btn") ? "Mobile" : "Desktop"
        );
        const dishId = button.getAttribute("data-dish-id");
        console.log("Dish ID:", dishId);
        if (dishId) {
          // Find dish by matching the generated ID
          const dish = dishData.find(
            (d) => d.title.toLowerCase().replace(/\s+/g, "") === dishId
          );
          console.log("Found dish:", dish);
          if (dish) {
            renderModalContent(dish);
          } else {
            console.warn("No dish found for dishId:", dishId);
          }
        } else {
          console.warn("No data-dish-id attribute found on button");
        }
        openRecipeModal();
      }
    }
  });

  // Close modal on close button click
  if (closeButton) {
    closeButton.addEventListener("click", closeRecipeModal);
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

/**
 * Header Animation System - Reusable across all pages
 */
export class HeaderAnimations {
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
      }
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
            ease: "power2.out"
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
            ease: "power2.out"
          });
        }
      } else {
        // Always show header when at top of page
        if (this.header.classList.contains("header-hidden")) {
          this.header.classList.remove("header-hidden");
          gsap.to(this.header, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
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

/**
 * Mobile Menu Functionality - Reusable across all pages
 */
export function initializeMobileMenu() {
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

/**
 * Generic page initialization function
 * @param {Function} renderProductsFunc - Function to render products
 * @param {Function} renderDishesFunc - Function to render dishes
 * @param {Function} initModalHandlersFunc - Function to initialize modal handlers
 */
export function initializePage(renderProductsFunc, renderDishesFunc, initModalHandlersFunc) {
  // Render products when the page loads
  window.addEventListener("load", () => {
    renderProductsFunc();
    renderDishesFunc();
    setTimeout(() => {
      initModalHandlersFunc();
    }, 100);
  });

  // Initialize when document is ready
  document.addEventListener("DOMContentLoaded", function () {
    // Initialize header animations
    new HeaderAnimations();

    // Initialize mobile menu functionality
    initializeMobileMenu();
    
    // Render products and dishes if not already rendered
    if (document.querySelector('.innerpage_product_card_container') && 
        document.querySelector('.mobile_product_slider') &&
        document.querySelectorAll('.product_card').length === 0) {
      renderProductsFunc();
    }
    
    if (document.querySelector('.dish_cards_container') && 
        document.querySelector('.mobile_dish_slider') &&
        document.querySelectorAll('.dish_card').length === 0) {
      renderDishesFunc();
    }
  });
}