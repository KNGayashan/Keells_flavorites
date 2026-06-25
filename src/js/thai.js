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
const renderthaiProducts = () => renderProducts(products.thai, 'thai');
const renderthaiDishes = () => renderDishes(dishes.Thaidishitems, 'thai');

// Initialize modal handlers for Indian dishes
const initthaiModalHandlers = () => {
  initializeModalHandlers(dishes.Thaidishitems, 'thai', renderModalContent);
};

// Initialize the page
initializePage(renderthaiProducts, renderthaiDishes, initthaiModalHandlers);