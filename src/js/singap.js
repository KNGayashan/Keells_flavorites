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
const renderSingapProducts = () => renderProducts(products.singaporean, 'singaporean');
const renderSingapDishes = () => renderDishes(dishes.Singaporeandishitems, 'singaporean');

// Initialize modal handlers for Indian dishes
const initSingapModalHandlers = () => {
  initializeModalHandlers(dishes.Singaporeandishitems, 'singaporean', renderModalContent);
};

// Initialize the page
initializePage(renderSingapProducts, renderSingapDishes, initSingapModalHandlers);