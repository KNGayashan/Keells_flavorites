import "bootstrap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dishes } from "./constants";

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

// Initialize when document is ready
document.addEventListener("DOMContentLoaded", function () {
  // Initialize header animations
  new HeaderAnimations();

  // Initialize mobile menu functionality
  initializeMobileMenu();
});

// Video gallery functionality for Food Hub
class FoodHubVideoGallery {
  constructor(dishes) {
    this.dishes = dishes;
    this.currentFilter = "all";
    this.init();
  }

  init() {
    // Render all videos by default
    this.renderVideos("all");

    // Add event listeners to tab buttons
    this.addTabEventListeners();

    // Add event listener for video modal
    this.addModalEventListeners();
  }

  // Get all videos from all categories
  getAllVideos() {
    const allVideos = [];

    Object.keys(this.dishes).forEach((category) => {
      this.dishes[category].forEach((dish) => {
        if (dish.videopath && dish.videopath.trim() !== "") {
          allVideos.push({
            ...dish,
            category: category
          });
        }
      });
    });

    return allVideos;
  }

  // Get videos by category
  getVideosByCategory(categories) {
    const videos = [];

    categories.forEach((category) => {
      if (this.dishes[category]) {
        this.dishes[category].forEach((dish) => {
          if (dish.videopath && dish.videopath.trim() !== "") {
            videos.push({
              ...dish,
              category: category
            });
          }
        });
      }
    });

    return videos;
  }

  // Determine video platform (YouTube or TikTok)
  getVideoPlatform(url) {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube";
    } else if (url.includes("tiktok.com")) {
      return "tiktok";
    }
    return "unknown";
  }

  // Extract YouTube video ID from URL
  getYouTubeVideoId(url) {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  // Extract TikTok video ID from URL
  getTikTokVideoId(url) {
    const regex =
      /(?:tiktok\.com\/.*\/video\/|tiktok\.com\/@[^\/]+\/video\/)([0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  // Generate video thumbnail URL
  getVideoThumbnail(videoUrl) {
    const platform = this.getVideoPlatform(videoUrl);

    if (platform === "youtube") {
      const videoId = this.getYouTubeVideoId(videoUrl);
      return videoId
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : "";
    } else if (platform === "tiktok") {
      // For TikTok, try to get thumbnail from TikTok's oembed API or use placeholder
      const videoId = this.getTikTokVideoId(videoUrl);
      // You can implement TikTok thumbnail fetching here if needed
      // For now, using a generic video thumbnail
      return "./assets/images/icons/video-thumbnail.png";
    }

    return "./assets/images/icons/video.svg";
  }

  // Generate embed URL for videos
  getEmbedUrl(videoUrl) {
    const platform = this.getVideoPlatform(videoUrl);

    if (platform === "youtube") {
      const videoId = this.getYouTubeVideoId(videoUrl);
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
        : null;
    } else if (platform === "tiktok") {
      // Clean TikTok URL for embedding
      const cleanUrl = videoUrl.split("?")[0]; // Remove query parameters
      return `https://www.tiktok.com/embed/v2/${this.getTikTokVideoId(
        videoUrl
      )}`;
    }

    return null;
  }

  // Render videos based on filter
  renderVideos(filter) {
    const imageGrid = document.getElementById("image_grid");
    if (!imageGrid) return;

    let videos = [];

    switch (filter) {
      case "india":
        videos = this.getVideosByCategory(["Indiandishitems"]);
        break;
      case "italian":
        videos = this.getVideosByCategory(["Italiandishitems"]);
        break;
      case "thai":
        videos = this.getVideosByCategory(["Thaidishitems"]);
        break;
      case "korean":
        videos = this.getVideosByCategory(["Koreandishitems"]);
        break;
      case "singaporean":
        videos = this.getVideosByCategory(["Singaporeandishitems"]);
        break;
      case "cheese":
        videos = this.getVideosByCategory(["Cheesedishitems"]);
        break;
      case "otherdeli":
        videos = this.getVideosByCategory([
          "Japanesedishitems",
          "Indonesiandishitems",
          "ChinesedishItems"
        ]);
        break;
      default:
        videos = this.getAllVideos();
    }

    // Clear existing content
    imageGrid.innerHTML = "";

    // Check if videos exist
    if (videos.length === 0) {
      // Display "No Videos Found" message
      const noVideosMessage = document.createElement("div");
      noVideosMessage.className = "col-12 text-center";
      noVideosMessage.innerHTML = `
        <div style="padding: 60px 20px; color: #666; font-size: 18px;">
          No Videos Found
        </div>
      `;
      imageGrid.appendChild(noVideosMessage);
    } else {
      // Render video cards
      videos.forEach((video) => {
        const videoCard = this.createVideoCard(video);
        imageGrid.appendChild(videoCard);
      });
    }

    this.currentFilter = filter;
  }

  // Create individual video card element
  createVideoCard(video) {
    const col = document.createElement("div");
    col.className = "col-md-4 col-lg-3";

    const platform = this.getVideoPlatform(video.videopath);
    const thumbnailUrl = this.getVideoThumbnail(video.videopath);

    // Add platform indicator to the card
    const platformClass =
      platform === "tiktok" ? "tiktok-card" : "youtube-card";

    col.innerHTML = `
      <div class="video_card ${platformClass}" data-video-url="${
      video.videopath
    }" data-video-title="${video.title}" data-platform="${platform}">
        <div class="video_thumbnail">

          ${
            platform === "tiktok"
              ? `<img src="${video.filepath}" alt="${video.title}" onerror="this.src='./assets/images/icons/video.svg'">`
              : `<img src="${thumbnailUrl}" alt="${video.title}" onerror="this.src='./assets/images/icons/video.svg'">`
          }
          
        </div>
        <div class="video_overlay">
          <div class="play_button">
            <img src="./assets/images/icons/play.svg" alt="Play">
          </div>
        </div>
        <div class="video_info">
          <h4>${video.title}</h4>
        </div>
      </div>
    `;

    return col;
  }

  // Add event listeners to tab buttons
  addTabEventListeners() {
    const tabButtons = [
      { id: "food_hub_desktop_tab_btn_all", filter: "all" },
      { id: "food_hub_desktop_tab_btn_india", filter: "india" },
      { id: "food_hub_desktop_tab_btn_italian", filter: "italian" },
      { id: "food_hub_desktop_tab_btn_thai", filter: "thai" },
      { id: "food_hub_desktop_tab_btn_korean", filter: "korean" },
      { id: "food_hub_desktop_tab_btn_singaporean", filter: "singaporean" },
      { id: "food_hub_desktop_tab_btn_cheese", filter: "cheese" },
      { id: "food_hub_desktop_tab_btn_otherdeli", filter: "otherdeli" }
    ];

    tabButtons.forEach(({ id, filter }) => {
      const button = document.getElementById(id);
      if (button) {
        button.addEventListener("click", (e) => {
          e.preventDefault();

          // Remove active class from all tabs
          document.querySelectorAll(".tab").forEach((tab) => {
            tab.classList.remove("active");
          });

          // Add active class to clicked tab
          button.classList.add("active");

          // Render filtered videos
          this.renderVideos(filter);
        });
      }
    });

    // Set default active tab (first one)
    const firstTab = document.getElementById("food_hub_desktop_tab_btn_all");
    if (firstTab) {
      firstTab.classList.add("active");
    }
  }

  // Add modal event listeners

  addModalEventListeners() {
    // Add click event to video cards (using event delegation)
    document.addEventListener("click", (e) => {
      const videoCard = e.target.closest(".video_card");
      if (videoCard) {
        const videoUrl = videoCard.getAttribute("data-video-url");
        const videoTitle = videoCard.getAttribute("data-video-title");
        const platform = videoCard.getAttribute("data-platform");

        if (videoUrl) {
          this.openVideoModal(videoUrl, videoTitle, platform);
        }
      }
    });

    // Close modal when clicking the close button
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", () => {
        this.closeVideoModal();
      });
    }

    // Close modal when clicking outside
    const modal = document.getElementById("videoModal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.closeVideoModal();
        }
      });
    }

    // Close modal on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeVideoModal();
      }
    });
  }

  // Open video modal
  openVideoModal(videoUrl, title, platform) {
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("videoIframe");

    if (modal && iframe) {
      let embedUrl = null;

      if (platform === "youtube") {
        // Handle YouTube videos
        const videoId = this.getYouTubeVideoId(videoUrl);
        if (videoId) {
          embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        }
      } else if (platform === "tiktok") {
        // Handle TikTok videos
        const videoId = this.getTikTokVideoId(videoUrl);
        if (videoId) {
          // TikTok embed URL
          embedUrl = `https://www.tiktok.com/embed/v2/${videoId}?lang=en-US`;
        } else {
          // Fallback: try to load the original URL in iframe (may not work due to CORS)
          embedUrl = videoUrl;
        }
      }

      if (embedUrl) {
        iframe.src = embedUrl;

        // Show modal
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Prevent background scrolling
      } else {
        // Fallback: open in new tab if embedding fails
        window.open(videoUrl, "_blank");
      }
    }
  }

  // Close video modal
  closeVideoModal() {
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("videoIframe");

    if (modal && iframe) {
      modal.style.display = "none";
      iframe.src = ""; // Stop video playback
      document.body.style.overflow = "auto"; // Restore scrolling
    }
  }
}

// Initialize the video gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Make sure dishes object is available
  if (typeof dishes !== "undefined") {
    window.foodHubGallery = new FoodHubVideoGallery(dishes);
  } else {
    console.error(
      "Dishes data not found. Make sure the dishes object is loaded before this script."
    );
  }
});

// Additional CSS for platform badges (add this to your CSS file)
const additionalStyles = `
.video_card {
  position: relative;
}

.video_thumbnail {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.video_thumbnail img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.video_card:hover .video_thumbnail img {
  transform: scale(1.05);
}

/* Special styling for TikTok thumbnails if needed */
.tiktok-card .video_thumbnail {
  background: rgba(0, 0, 0, 0.5);
  padding: 2px;
}

.tiktok-card .video_thumbnail img {
  border-radius: 6px;
  padding: 0 calc(2px + (50 - 2) * ((100vw - 320px) / (1920 - 320)));
}
`;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = additionalStyles;
document.head.appendChild(styleSheet);

// mobile tab controller

// Food Hub Mobile Tab Controller
function initializeFoodHubTabs() {
  // Define tab groups and their configurations
  const tabGroups = [
    {
      // First row: India & Italian
      tabs: [
        "food_hub_mobile_tab_btn_india",
        "food_hub_mobile_tab_btn_italian"
      ],
      videos: ["indian_video", "italian_video"],
      defaultTab: "food_hub_mobile_tab_btn_india",
      defaultVideo: "indian_video"
    },
    {
      // Second row: Thai & Korean
      tabs: ["food_hub_mobile_tab_btn_thai", "food_hub_mobile_tab_btn_korean"],
      videos: ["thai_video", "korean_video"],
      defaultTab: "food_hub_mobile_tab_btn_thai",
      defaultVideo: "thai_video"
    },
    {
      // Third row: Singaporean & Other Delights
      tabs: [
        "food_hub_mobile_tab_btn_singaporean",
        "food_hub_mobile_tab_btn_otherdeli"
      ],
      videos: ["singaporean_video", "otherdeli_video"],
      defaultTab: "food_hub_mobile_tab_btn_singaporean",
      defaultVideo: "singaporean_video"
    }
  ];

  // Add CSS styles for active tab state
  const style = document.createElement("style");
  style.textContent = `
    .tab.active {
      color: red !important;
      text-decoration: underline;
    }
    .video_content {
      display: none;
    }
    .video_content.active {
      display: block;
    }
  `;
  document.head.appendChild(style);

  // Function to handle tab switching within a group
  function switchTab(tabId, videoClass, tabGroup) {
    // Remove active class from all tabs in this group
    tabGroup.tabs.forEach((tab) => {
      const tabElement = document.getElementById(tab);
      if (tabElement) {
        tabElement.classList.remove("active");
      }
    });

    // Hide all videos in this group
    tabGroup.videos.forEach((video) => {
      const videoElements = document.querySelectorAll(`.${video}`);
      videoElements.forEach((el) => el.classList.remove("active"));
    });

    // Activate clicked tab
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
      activeTab.classList.add("active");
    }

    // Show corresponding video
    const activeVideos = document.querySelectorAll(`.${videoClass}`);
    activeVideos.forEach((el) => el.classList.add("active"));
  }

  // Initialize each tab group
  tabGroups.forEach((group) => {
    // Set up click event listeners for each tab in the group
    group.tabs.forEach((tabId, index) => {
      const tabElement = document.getElementById(tabId);
      if (tabElement) {
        tabElement.addEventListener("click", () => {
          switchTab(tabId, group.videos[index], group);
        });
      }
    });

    // Set default active states
    setTimeout(() => {
      switchTab(group.defaultTab, group.defaultVideo, group);
    }, 100);
  });

  console.log("Food Hub Mobile Tabs initialized successfully!");
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeFoodHubTabs);
} else {
  initializeFoodHubTabs();
}

// Export for manual initialization if needed
window.initializeFoodHubTabs = initializeFoodHubTabs;
