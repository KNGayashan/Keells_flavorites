# Keells Food Cuisine - Modern Web Application

A modern web application for Keells Food Cuisine featuring responsive design, smooth animations, and optimized webpack build. This project showcases various global cuisines with beautiful animations and mobile-responsive layout.

## Features

- **Modern JavaScript**: ES6+ features with Babel transpilation
- **SASS Styling**: Organized CSS with variables and nested rules
- **Bootstrap Integration**: Responsive UI components and grid system
- **Webpack Configuration**: Optimized build setup with:
  - Code splitting
  - Asset optimization (images, fonts)
  - Hot module replacement
  - Development server
- **jQuery Integration**: For DOM manipulation and smooth scrolling
- **Scroll Animations**: Intersection Observer API for smooth reveal animations
- **Responsive Design**: Mobile-first approach with breakpoints
- **Development Tools**: Source maps, bundle analyzer, and compression

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
├── src/
│   ├── assets/             # Static assets (images, fonts)
│   │   ├── fonts/          # Custom fonts
│   │   └── images/         # Images and SVGs
│   ├── js/
│   │   └── index.js        # Main application entry with scroll animations
│   ├── styles/
│   │   ├── _variables.scss  # SASS variables for colors and fonts
│   │   ├── keells-main.scss # Main Keells styles
│   │   └── main.scss       # Entry point for styles
│   └── index.html          # HTML template
├── webpack.config.js       # Webpack configuration
└── package.json           # Project dependencies
```

## Development

- Development server runs on `http://localhost:3006`
- Hot module replacement is enabled
- Source maps are available in development mode

## Production Build

The production build includes:

- Minified and optimized assets
- Code splitting for better performance
- Gzipped bundles
- Source maps for debugging
- **Relative paths** for deployment flexibility (works in subdirectories)

## Deployment

The built files in the `dist/` folder can be deployed to any web server:

1. **Root domain deployment:** Copy `dist/` contents to web server root
2. **Subdirectory deployment:** Copy `dist/` contents to any subdirectory
3. **Static hosting:** Compatible with GitHub Pages, Netlify, Vercel, etc.

All asset paths are relative (`./`) ensuring compatibility with various deployment scenarios.

## License

ISC License
