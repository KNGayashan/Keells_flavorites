// indonesian.js - Highly simplified using shared utilities

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
const renderIndonesianProducts = () => renderProducts(products.indonesian, 'Indonesian');
const renderIndonesianDishes = () => renderDishes(dishes.Indonesiandishitems, 'Indonesian');

// Initialize modal handlers for Indonesian dishes
const initIndonesianModalHandlers = () => {
  initializeModalHandlers(dishes.Indonesiandishitems, 'indonesian', renderModalContent);
};

// Initialize the page
initializePage(renderIndonesianDishes, initIndonesianModalHandlers);