// shared-renderers.js - Reusable rendering functions for all cuisine pages

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import "slick-carousel";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


// Function to auto-detect platform from URL
function detectPlatform(url) {
    if (!url) return null;
    
    // Convert to lowercase for easier matching
    const lowerUrl = url.toLowerCase();
    
    // Check for YouTube
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
        return 'youtube';
    }
    
    // Check for TikTok
    if (lowerUrl.includes('tiktok.com') || lowerUrl.includes('vm.tiktok.com') || lowerUrl.includes('vt.tiktok.com')) {
        return 'tiktok';
    }
    
    // Add more platforms as needed
    if (lowerUrl.includes('vimeo.com')) {
        return 'vimeo';
    }
    
    return null;
}

// Function to convert URL to embeddable format (only for YouTube and Vimeo)
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
    
    if (platform === 'vimeo') {
        // Extract Vimeo video ID
        const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    
    // For TikTok and others, return original URL
    return url;
}

// Function to open TikTok in a new popup window
function openTikTokPopup(url, title) {
    const popupWidth = 400;
    const popupHeight = 600;
    const left = (screen.width - popupWidth) / 2;
    const top = (screen.height - popupHeight) / 2;
    
    const popup = window.open(
        url,
        'tiktokPopup',
        `width=${popupWidth},height=${popupHeight},left=${left},top=${top},scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,directories=no,status=no`
    );
    
    if (popup) {
        popup.focus();
        console.log(`Opened TikTok video "${title}" in popup`);
    } else {
        // Fallback if popup is blocked
        console.warn('Popup blocked, opening in new tab');
        window.open(url, '_blank');
    }
}

// Updated openVideoModal function with TikTok handling
window.openVideoModal = function(videoUrl, videoTitle, platform) {
    if (!videoUrl) return; // Don't open modal if no video URL
    
    // Auto-detect platform if not provided
    const detectedPlatform = platform || detectPlatform(videoUrl);
    
    // Handle TikTok videos differently - open in popup instead of modal
    if (detectedPlatform === 'tiktok') {
        openTikTokPopup(videoUrl, videoTitle);
        return;
    }
    
    // For YouTube and other embeddable platforms, use the modal
    const videoModal = document.getElementById('innerpage_videoModal');
    const videoIframe = document.getElementById('videoIframe');
    
    if (!videoModal || !videoIframe) {
        console.warn('Video modal elements not found');
        return;
    }
    
    const embedUrl = getEmbedUrl(videoUrl, detectedPlatform);
    
    // Set iframe attributes based on platform
    if (detectedPlatform === 'youtube') {
        // YouTube embeds
        videoIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        videoIframe.setAttribute('allowfullscreen', 'true');
        videoIframe.style.width = '100%';
        videoIframe.style.height = '100%';
        videoIframe.style.border = 'none';
    } else if (detectedPlatform === 'vimeo') {
        // Vimeo embeds
        videoIframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
        videoIframe.setAttribute('allowfullscreen', 'true');
        videoIframe.style.width = '100%';
        videoIframe.style.height = '100%';
        videoIframe.style.border = 'none';
    }
    
    // Set the iframe source
    videoIframe.src = embedUrl;
    
    // Show the modal
    videoModal.style.display = 'flex';
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    console.log(`Opening ${detectedPlatform} video in modal:`, embedUrl);
};

/**
 * Generic function to render products for any cuisine
 * @param {Array} cuisineProducts - Array of products for the cuisine
 * @param {string} cuisineName - Name of the cuisine for logging
 */
export function renderProducts(cuisineProducts, cuisineName = "Unknown") {
  // Check if products exist
  if (!cuisineProducts || cuisineProducts.length === 0) {
    console.warn(`No ${cuisineName} products found`);
    return;
  }

  const desktopContainer = document.querySelector(
    ".innerpage_product_card_container"
  );
  const mobileContainer = document.querySelector(
    ".innerpage_product_card_container_mobile .mobile_product_slider"
  );

  if (!desktopContainer) {
    console.warn("Desktop product container not found");
    return;
  }

  if (!mobileContainer) {
    console.warn(
      "Mobile product container not found - will render desktop only"
    );
  }

  // Add loading state
  desktopContainer.innerHTML = '<div class="loading">Loading products...</div>';
  if (mobileContainer) {
    mobileContainer.innerHTML =
      '<div class="loading">Loading products...</div>';
  }

  // Clear after a short delay
  setTimeout(() => {
    desktopContainer.innerHTML = "";
    if (mobileContainer) {
      mobileContainer.innerHTML = "";
    }

    // Render products
    cuisineProducts.forEach((product, index) => {
      // Validate product data
      if (!product.filepath || !product.title || !product.subtitle) {
        console.warn("Invalid product data:", product);
        return;
      }

      // Desktop card
      const productCard = document.createElement("div");
      productCard.className = "product_card";
      productCard.setAttribute("data-product-index", index);
      productCard.style.animationDelay = `${index * 0.1}s`;

      productCard.innerHTML = `
        <div class="product_card_inner">
          <div class="product_img">
            <img src="${product.filepath}" 
                 alt="${product.title}" 
                 loading="lazy"
                 onerror="this.src='./assets/images/placeholder-product.jpg'">
          </div>
          <div class="product_details">
            <h3 class="product_title">${product.title}</h3>
            <p class="product_desc">${product.subtitle}</p>
          </div>
        </div>
      `;

      desktopContainer.appendChild(productCard);

      // Mobile card (only if mobile container exists)
      if (mobileContainer) {
        const mobileProductCard = document.createElement("div");
        mobileProductCard.className = "mobile_product_card";
        mobileProductCard.setAttribute("data-product-index", index);
        mobileProductCard.style.animationDelay = `${index * 0.1}s`;

        mobileProductCard.innerHTML = `
          <div class="mobile_product_card_inner">
            <div class="product_img">
              <img src="${product.filepath}" 
                   alt="${product.title}" 
                   loading="lazy"
                   onerror="this.src='./assets/images/placeholder-product.jpg'">
            </div>
            <div class="product_details">
              <h3 class="product_title">${product.title}</h3>
              <p class="product_desc">${product.subtitle}</p>
            </div>
          </div>
        `;

        mobileContainer.appendChild(mobileProductCard);
      }
    });

    // Reinitialize slick carousel (only if mobile container exists)
    if (mobileContainer) {
      setTimeout(() => {
        const $mobileSlider = $(mobileContainer);
        if (
          $.fn.slick &&
          !$mobileSlider.parent().hasClass("slick-initialized")
        ) {
          $mobileSlider.slick({
            dots: true,
            infinite: true,
            centerMode: true,
            centerPadding: "60px",
            slidesToShow: 1,
            adaptiveHeight: true,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  arrows: false,
                  centerMode: true,
                  centerPadding: "40px",
                  slidesToShow: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  arrows: false,
                  centerMode: true,
                  centerPadding: "30px",
                  slidesToShow: 1,
                },
              },
            ],
          });
        }
      }, 200);
    }

    // Animate in the cards
    gsap.fromTo(
      ".product_card, .mobile_product_card",
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }
    );

    console.log(
      `Rendered ${cuisineProducts.length} ${cuisineName} products successfully`
    );
  }, 300);
}

// Enhanced dish rendering to handle TikTok videos properly
export function renderDishes(cuisineDishes, cuisineName = "Unknown") {
  if (!cuisineDishes || cuisineDishes.length === 0) {
    console.warn(`No ${cuisineName} dishes found`);
    return;
  }

  const desktopContainer = document.querySelector(".dish_cards_container");
  const mobileContainer = document.querySelector(".mobile_dish_slider");

  if (!desktopContainer) {
    console.warn("Desktop dish container not found");
    return;
  }

  if (!mobileContainer) {
    console.warn("Mobile dish container not found - will render desktop only");
  }

  // Clear existing content
  desktopContainer.innerHTML = "";
  if (mobileContainer) {
    mobileContainer.innerHTML = "";
  }

  // Render desktop dishes
  cuisineDishes.forEach((dish, index) => {
    // Create desktop dish card
    const dishCard = document.createElement("div");
    dishCard.className = "dish_card";
    dishCard.setAttribute("data-dish-index", index);
    dishCard.style.animationDelay = `${index * 0.1}s`;

    // Generate dish ID for recipe button
    const dishId = dish.title.toLowerCase().replace(/\s+/g, "");
    
    // Detect platform for video button styling and text
    const videoPlatform = detectPlatform(dish.videopath);
    const videoButtonText = videoPlatform === 'tiktok' ? 'View on TikTok' : 'Watch Now';
    const videoButtonIcon = videoPlatform === 'tiktok' ? 
        '<img src="./assets/images/icons/tiktok.svg" alt="" />' : 
        '<img src="./assets/images/icons/video.svg" alt="" />';

    dishCard.innerHTML = `
      <div class="dish_image_container">
        <img
          src="${dish.filepath}"
          alt="${dish.title}"
          class="dish_image"
          loading="lazy"
          onerror="this.src='./assets/images/placeholder-dish.jpg'"
        />
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
          <button
            class="mobile_dish_btn dish_btn btn_green recipe-btn"
            data-dish-id="${dishId}"
            data-cuisine="${cuisineName.toLowerCase()}"
          >
            Quick Recipe
          </button>
          <button 
            class="dish_btn btn_orange ${dish.videopath ? '' : 'd-none'} ${videoPlatform === 'tiktok' ? 'tiktok-btn' : 'youtube-btn'}"
            onclick="openVideoModal('${dish.videopath}', '${dish.title}', '${videoPlatform}')"
          >
            Watch Now
            <img src="./assets/images/icons/video.svg" alt="" />
          </button>
        </div>
      </div>
    `;

    desktopContainer.appendChild(dishCard);

    // Create mobile dish card (only if mobile container exists)
    if (mobileContainer) {
      const mobileDishCard = document.createElement("div");
      mobileDishCard.className = "mobile_dish_card";
      mobileDishCard.setAttribute("data-dish-index", index);

      mobileDishCard.innerHTML = `
        <!-- Mobile dish card content with same video handling -->
      `;

      mobileContainer.appendChild(mobileDishCard);
    }
  });
  // Reinitialize slick carousel for mobile (only if mobile container exists)
  if (mobileContainer) {
    setTimeout(() => {
      const $mobileSlider = $(mobileContainer);
      if ($.fn.slick && !$mobileSlider.hasClass("slick-initialized")) {
        $mobileSlider.slick({
          dots: true,
          infinite: true,
          centerMode: true,
          centerPadding: "60px",
          slidesToShow: 1,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: "40px",
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: "40px",
                slidesToShow: 1,
              },
            },
          ],
        });
      }
    }, 200);
  }

  // Animate in the dish cards
  gsap.fromTo(
    ".dish_card, .mobile_dish_card",
    {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      onComplete: () => {
        // Setup scroll-triggered progress ring animations after dish cards are visible
        setupScrollTriggeredProgressAnimations(cuisineDishes);
      }
    }
  );

  console.log(
    `Rendered ${cuisineDishes.length} ${cuisineName} dishes successfully`
  );
}

/**
 * Setup animations for progress rings using Intersection Observer and Owl Carousel events
 * @param {Array} cuisineDishes - Array of dishes for the cuisine
 */
function setupScrollTriggeredProgressAnimations(cuisineDishes) {
  // Function to calculate stroke-dashoffset based on percentage
  function calculateStrokeDashOffset(percentage) {
    const radius = 50; // Circle radius from SVG
    const circumference = 2 * Math.PI * radius; // ≈ 314.16
    return circumference - (percentage / 100) * circumference;
  }

  // Function to animate a single progress ring
  function animateProgressRing(element, percentage, delay = 0) {
    if (!element) {
      console.warn('Progress ring element not found');
      return;
    }
    
    const circumference = 2 * Math.PI * 50;
    const offset = calculateStrokeDashOffset(percentage);
    
    // Set initial styles
    element.style.strokeDasharray = `${circumference} ${circumference}`;
    element.style.strokeDashoffset = circumference;
    element.style.transition = 'none';
    
    // Animate with GSAP
    gsap.to(element, {
      strokeDashoffset: offset,
      duration: 1.5,
      delay: delay,
      ease: "power2.out"
    });
  }

  // Function to animate all progress circles in a card
  function animateCardProgressCircles(card) {
    const spiceProgressCircles = card.querySelectorAll('.spice-progress');
    const fullnessProgressCircles = card.querySelectorAll('.fullness-progress');
    
    spiceProgressCircles.forEach(circle => {
      const spiceLevel = parseInt(circle.getAttribute('data-spice-level') || '50');
      animateProgressRing(circle, spiceLevel, 0.1);
    });
    
    fullnessProgressCircles.forEach(circle => {
      const fullnessLevel = parseInt(circle.getAttribute('data-fullness-level') || '50');
      animateProgressRing(circle, fullnessLevel, 0.3);
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

  // Create Intersection Observer for desktop and mobile cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCardProgressCircles(entry.target);
      } else {
        resetCardProgressCircles(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.2 // Trigger when 20% of the card is visible
  });

  // Observe desktop and mobile dish cards
  cuisineDishes.forEach((dish, index) => {
    const dishCard = document.querySelector(`[data-dish-index="${index}"]`);
    if (dishCard) {
      observer.observe(dishCard);
    }

    const mobileDishCard = document.querySelector(`.mobile_dish_card[data-dish-index="${index}"]`);
    if (mobileDishCard) {
      const mobileDishCardInner = mobileDishCard.querySelector('.mobile_dish_card_inner');
      if (mobileDishCardInner) {
        observer.observe(mobileDishCardInner);
      }
    }
  });

  // Observe Owl Carousel items
  const owlCarouselItems = document.querySelectorAll('.owl-carousel .item .mobile_dish_card_inner');
  owlCarouselItems.forEach(item => {
    observer.observe(item);
  });

  // Handle Owl Carousel slide changes
  if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
    $('.owl-carousel').on('changed.owl.carousel', function(event) {
      // Get the current active item
      const currentItems = document.querySelectorAll('.owl-carousel .owl-item.active .mobile_dish_card_inner');
      currentItems.forEach(item => {
        animateCardProgressCircles(item);
      });
    });
  }

  // Observe dynamically added content
  const contentObserver = new MutationObserver((mutations) => {
    let shouldReObserve = false;
    
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.classList?.contains('dish_card') || 
              node.classList?.contains('mobile_dish_card_inner') ||
              node.querySelector?.('.dish_card, .mobile_dish_card_inner')) {
            shouldReObserve = true;
          }
        }
      });
    });
    
    if (shouldReObserve) {
      setTimeout(() => {
        const dishCards = document.querySelectorAll('.dish_card');
        const mobileDishCards = document.querySelectorAll('.mobile_dish_card_inner');
        const owlItems = document.querySelectorAll('.owl-carousel .item .mobile_dish_card_inner');
        
        dishCards.forEach(card => observer.observe(card));
        mobileDishCards.forEach(card => observer.observe(card));
        owlItems.forEach(item => observer.observe(item));
      }, 100);
    }
  });

  // Observe main containers
  const containers = document.querySelectorAll('.dish_cards_container, .mobile_dish_slider');
  containers.forEach(container => {
    contentObserver.observe(container, {
      childList: true,
      subtree: true
    });
  });

  console.log('Progress circle animations initialized for scroll and carousel');
}

/**
 * Animate a single progress ring
 * @param {HTMLElement} element - Progress ring element
 * @param {number} percentage - Target percentage (0-100)
 * @param {number} delay - Animation delay in seconds
 */
function animateProgressRing(element, percentage, delay = 0) {
  if (!element) {
    console.warn('Progress ring element not found');
    return;
  }
  
  const circumference = 2 * Math.PI * 50; // radius = 50
  const offset = circumference - (percentage / 100) * circumference;
  
  // Set initial styles
  element.style.strokeDasharray = `${circumference} ${circumference}`;
  element.style.strokeDashoffset = circumference;
  element.style.transition = 'none';
  
  // Animate with GSAP for smooth effect
  gsap.to(element, {
    strokeDashoffset: offset,
    duration: 1.5,
    delay: delay,
    ease: "power2.out"
  });
}

/**
 * Generic function to render modal content for any dish
 * @param {Object} dish - Dish object with recipe data
 */
export function renderModalContent(dish) {
  const modal = document.getElementById("recipeModal");
  const recipeContent = modal?.querySelector(".recipie_content");
  const recipePopup = modal?.querySelector(".recipie_popup");

  if (!recipeContent) {
    console.warn("Recipe content container not found");
    return;
  }

  // Set background image for the popup
  if (recipePopup && dish.filepath) {
    recipePopup.style.backgroundImage = `url('${dish.filepath}')`;
    recipePopup.style.backgroundSize = "60% auto";
    recipePopup.style.backgroundPosition = "right center";
    recipePopup.style.backgroundRepeat = "no-repeat";
    recipePopup.style.opacity = "1";
    recipePopup.style.position = "relative";

    // Add an overlay to ensure content readability
    const existingOverlay = recipePopup.querySelector(".modal-bg-overlay");
    if (!existingOverlay) {
      const overlay = document.createElement("div");
      overlay.className = "modal-bg-overlay";
      overlay.style.position = "absolute";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.right = "0";
      overlay.style.bottom = "0";
      overlay.style.backgroundColor = "rgba(255, 255, 255, 0.85)";
      overlay.style.zIndex = "1";
      recipePopup.insertBefore(overlay, recipePopup.firstChild);
    }

    // Ensure content is above the overlay
    const recipeWrapper = recipePopup.querySelector(".recipe-wrapper");
    if (recipeWrapper) {
      recipeWrapper.style.position = "relative";
      recipeWrapper.style.zIndex = "2";
    }
  }

  // Update modal content with dish data
  const dishTitle = recipeContent.querySelector(".recipie_popup_head_title");
  const ingredientsContainer = recipeContent.querySelector(
    ".recipie_popup_ingredients p"
  );
  const stepsContainer = recipeContent.querySelector(
    ".recipie_popup_steps_section ol"
  );

  if (dishTitle) {
    dishTitle.textContent = dish.title;
  }

  // Render ingredients
  if (ingredientsContainer && dish.Ingredients) {
    const ingredientsList = dish.Ingredients.map(
      (ingredient) => ingredient.name
    ).join(", ");
    ingredientsContainer.textContent = ingredientsList;
  }

  // Render steps with improved handling of substeps
  if (stepsContainer && dish.steps) {
    stepsContainer.innerHTML = "";
    
    dish.steps.forEach((step, index) => {
      const listItem = document.createElement("li");
      
      // Create the main step content
      let stepHTML = `<div class="step-content">`;
      
      // Add step title/description
      if (step.title) {
        stepHTML += `<div class="step-title">${step.title}</div>`;
      } else if (step.description) {
        stepHTML += `<div class="step-description">${step.description}</div>`;
      } else if (typeof step === 'string') {
        stepHTML += `<div class="step-text">${step}</div>`;
      }
      
      // Add substeps if they exist
      if (step.substeps && Array.isArray(step.substeps) && step.substeps.length > 0) {
        stepHTML += `<ul class="substeps">`;
        step.substeps.forEach(substep => {
          stepHTML += `<li>${substep}</li>`;
        });
        stepHTML += `</ul>`;
      }
      
      stepHTML += `</div>`;
      listItem.innerHTML = stepHTML;
      
      stepsContainer.appendChild(listItem);
    });
    
    // Add CSS styles directly to ensure proper formatting
    const style = document.createElement('style');
    style.textContent = `
      .recipie_popup_steps_section ol {
        counter-reset: step-counter;
        padding-left: 0;
        list-style: none;
      }
      
      .recipie_popup_steps_section ol > li {
        counter-increment: step-counter;
        list-style: none;
        margin-bottom: 15px;
        position: relative;
        padding-left: 30px;
        display: flex;
      }
      
      .recipie_popup_steps_section ol > li::before {
        content: counter(step-counter) ".";
        position: absolute;
        left: 0;
        top: 0;
        font-weight: bold;
        color: #333;
        
      }
      
      .step-content {
        margin-left: 0;
      }
      
      .step-title, .step-description, .step-text {
        margin-bottom: 8px;
        line-height: 1.5;
      }
      
      .substeps {
        margin: 8px 0 0 0;
        padding-left: 20px;
        list-style: none !important;
        counter-reset: none !important;
      }
      
      .substeps li {
        list-style-type: disc !important;
        list-style: disc !important;
        margin-bottom: 4px;
        line-height: 1.4;
        position: relative;
        padding-left: 0 !important;
        counter-increment: none !important;
      }
      
      .substeps li::before {
        content: "• " !important;
        position: static !important;
        font-weight: normal !important;
        color: #666 !important;
      }
      
      .substeps li::marker {
        content: none !important;
      }
    `;
    
    // Remove existing style if present and add new one
    const existingStyle = document.querySelector('#recipe-steps-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    style.id = 'recipe-steps-style';
    document.head.appendChild(style);
  }

  console.log(`Modal content updated for ${dish.title}`);
}

/**
 * DEPRECATED: Use setupScrollTriggeredProgressAnimations instead
 * Animate progress rings for dish cards
 * @param {Object} dish - Dish object with spiceLevel and fullnessLevel
 * @param {number} dishIndex - Index of the dish for targeting specific elements
 */
export function animateProgressRings(dish, dishIndex = 0) {
  console.warn('animateProgressRings is deprecated. Progress rings now animate on scroll automatically.');
  
  // Legacy support - trigger immediate animation
  const dishCard = document.querySelector(`[data-dish-index="${dishIndex}"]`);
  if (!dishCard) {
    console.warn(`Dish card with index ${dishIndex} not found`);
    return;
  }

  const spiceProgress = dishCard.querySelector('.spice-progress');
  const fullnessProgress = dishCard.querySelector('.fullness-progress');
  
  const spiceLevel = dish.spiceLevel || 50;
  const fullnessLevel = dish.fullnessLevel || 50;
  
  if (spiceProgress) {
    animateProgressRing(spiceProgress, spiceLevel, dishIndex * 0.1);
  }
  
  if (fullnessProgress) {
    animateProgressRing(fullnessProgress, fullnessLevel, (dishIndex * 0.1) + 0.2);
  }
}

// Video Modal Handler Function
function initVideoModal() {
    const videoModal = document.getElementById('innerpage_videoModal');
    const videoIframe = document.getElementById('videoIframe');
    const closeBtn = document.getElementById('modalCloseBtn');
    
    // Function to close modal
    function closeVideoModal() {
        // Hide the modal
        videoModal.style.display = 'none';
        
        // Stop video by clearing iframe source
        videoIframe.src = '';
        
        // Restore body scrolling
        document.body.style.overflow = 'auto';
    }
    
    // Add click event listeners to all video cards (desktop)
    const desktopVideoCards = document.querySelectorAll('.inner_video_card');
    desktopVideoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video-url');
            const videoTitle = this.getAttribute('data-video-title');
            const platform = this.getAttribute('data-platform');
            
            if (videoUrl) {
                window.openVideoModal(videoUrl, videoTitle, platform);
            }
        });
    });
    
    // Add click event listeners to all video cards (mobile)
    const mobileVideoCards = document.querySelectorAll('.inner_video_card_mobile');
    mobileVideoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video-url');
            const videoTitle = this.getAttribute('data-video-title');
            const platform = this.getAttribute('data-platform');
            
            if (videoUrl) {
                window.openVideoModal(videoUrl, videoTitle, platform);
            }
        });
    });
    
    // Close modal when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }
    
    // Close modal when clicking outside the video content
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal && videoModal.style.display === 'flex') {
            closeVideoModal();
        }
    });
}

// Initialize the video modal functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', initVideoModal);

// Alternative initialization if you're using jQuery (since I see you have it in your HTML)
$(document).ready(function() {
    initVideoModal();
});


