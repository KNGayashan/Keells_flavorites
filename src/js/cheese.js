// indian.js - Highly simplified using shared utilities
import "slick-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products, dishes } from "./constants.js";
import "bootstrap";
import $ from "jquery";


// Import shared functions
import { renderProducts, renderDishes, renderModalContent } from './shared-renderers.js';
import { initializeModalHandlers, initializePage } from './shared-utils.js';

// Expose jQuery globally
window.$ = $;
window.jQuery = $;

// Cuisine-specific render functions
const rendercheeseProducts = () => renderProducts(products.cheese, 'Cheese');
const rendercheeseDishes = () => renderDishes(dishes.Cheesedishitems, 'Cheese');

// Initialize modal handlers for Indian dishes
const initcheeseModalHandlers = () => {
  initializeModalHandlers(dishes.Cheesedishitems, 'Cheese', renderModalContent);
};

// Initialize the page
initializePage(rendercheeseProducts, rendercheeseDishes, initcheeseModalHandlers);