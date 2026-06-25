// indian.js - Highly simplified using shared utilities

import { products, dishes } from "./constants.js";
import "bootstrap";
import $ from "jquery";
import "slick-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import shared functions
import { renderProducts, renderDishes, renderModalContent } from './shared-renderers.js';
import { initializeModalHandlers, initializePage } from './shared-utils.js';

// Expose jQuery globally
window.$ = $;
window.jQuery = $;

// Cuisine-specific render functions
const renderitalianProducts = () => renderProducts(products.italian, 'italian');
const renderitalianDishes = () => renderDishes(dishes.Italiandishitems, 'italian');

// Initialize modal handlers for Indian dishes
const initItalianModalHandlers = () => {
  initializeModalHandlers(dishes.Italiandishitems, 'italian', renderModalContent);
};

// Initialize the page
initializePage(renderitalianProducts, renderitalianDishes, initItalianModalHandlers);