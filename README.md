# Little Lemon Restaurant 🍋

A modern, responsive restaurant website for Little Lemon - a family-owned Mediterranean restaurant in Chicago. Built with React, this application features a complete table booking system with form validation, error handling, and accessibility features.

![React](https://img.shields.io/badge/React-19.2.3-blue.svg)
![React Router](https://img.shields.io/badge/React%20Router-6.30.2-red.svg)
![Tests](https://img.shields.io/badge/Tests-43%20passing-green.svg)

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Key Features Explained](#key-features-explained)
- [Testing](#testing)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Homepage** with hero section, specials, testimonials, and about section
- **Table Reservation System** with:
  - Date picker with validation (prevents past dates)
  - Dynamic time slot availability based on selected date
  - Guest number validation (1-10 guests)
  - Occasion selection (Birthday/Anniversary)
  - Real-time form validation with error messages
  - Loading states during submission
  - Comprehensive error handling
- **Booking Confirmation Page**
- **Responsive Design** that works on mobile, tablet, and desktop
- **Accessibility Features** with ARIA labels and semantic HTML
- **React Router** for client-side navigation
- **Comprehensive Test Suite** with 43 passing tests

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

## 📦 Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/sushiqiren/littleLemon
   cd littleLemon
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   
   This will install all required packages including:
   - React 19.2.3
   - React Router DOM 6.30.2
   - Testing libraries
   - And other dependencies

3. **Verify installation**:
   ```bash
   npm list --depth=0
   ```
   You should see all packages listed without errors.

## 🚀 Running the Application

### Development Mode

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Access the application**:
   - The app will automatically open in your default browser
   - If not, navigate to [http://localhost:3000](http://localhost:3000)

3. **Development features**:
   - Hot reload: Changes to code automatically refresh the browser
   - Error overlay: Compilation errors appear in the browser
   - Console warnings: Check browser console for any warnings

### What to Expect

- **Homepage** displays at root path `/`
- **Reservations page** accessible via navigation menu or at `/reservations`
- **Confirmation page** appears at `/booking-confirmed` after successful booking

## 🧪 Running Tests

### Run All Tests Once

```bash
npm test -- --watchAll=false
```

### Run Tests in Watch Mode (Interactive)

```bash
npm test
```

In watch mode, press:
- `a` to run all tests
- `f` to run only failed tests
- `q` to quit
- `p` to filter by filename
- `t` to filter by test name

### Run Tests with Coverage

```bash
npm test -- --watchAll=false --coverage
```

This generates a coverage report showing:
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

### Test Suite Overview

The project includes **43 comprehensive tests** covering:

- **BookingForm tests** (28 tests)
  - Static text rendering
  - Form submission
  - HTML5 validation attributes
  - JavaScript validation (valid/invalid states)
  - Edge cases and error handling
  
- **BookingPage tests** (13 tests)
  - Reducer functions (initializeTimes, updateTimes)
  - Date change behavior
  - API error handling
  - Fallback behaviors
  
- **BookingFlow test** (1 test)
  - Full integration flow from form submission to confirmation
  
- **App test** (1 test)
  - Basic render test

## 📁 Project Structure

```
little-lemon/
├── public/
│   ├── index.html          # HTML template
│   ├── api.js              # Mock API for booking times and submission
│   ├── manifest.json       # PWA manifest
│   └── Assets/             # Images and icons
│       └── icons_assets/
├── src/
│   ├── App.js              # Main app component with routing
│   ├── App.css             # Global styles
│   ├── Header.js           # Header with navigation
│   ├── Nav.js              # Navigation menu
│   ├── Main.js             # Homepage content
│   ├── Footer.js           # Footer component
│   ├── BookingPage.js      # Booking page container with state management
│   ├── BookingForm.js      # Booking form with validation
│   ├── ConfirmedBooking.js # Success confirmation page
│   ├── *.test.js           # Test files
│   └── index.js            # App entry point
├── package.json            # Project dependencies and scripts
└── README.md              # This file
```

## 🎯 Key Features Explained

### Table Reservation System

#### Form Validation

The booking form includes both **HTML5** and **JavaScript** validation:

**HTML5 Validation:**
- `required` attributes on all fields
- `min` date attribute to prevent past dates
- `min="1"` and `max="10"` for guest number
- `type="date"` and `type="number"` for appropriate inputs

**JavaScript Validation:**
- Real-time validation as user types
- Custom error messages for each field
- Visual feedback (red error text, aria-invalid attributes)
- Submit button disabled when form invalid
- Prevents invalid date selection

#### Error Handling

Comprehensive error handling for:
- **API failures**: Fallback times provided when API unavailable
- **Empty states**: Clear messages when no times available
- **Network issues**: User-friendly error messages
- **Invalid data**: Validation before submission
- **Submission failures**: Retry options with clear error messages

#### Accessibility

- **ARIA labels** on all interactive elements
- **aria-invalid** and **aria-describedby** for form validation
- **role="alert"** for error messages
- **Semantic HTML** throughout
- **Keyboard navigation** support

### Dynamic Time Slots

The application uses a mock API (`public/api.js`) that:
- Generates available times based on selected date
- Uses seeded random number generator for consistency
- Validates input data
- Always returns at least some available times

## 🧪 Testing

### Test Philosophy

Tests cover:
1. **Component rendering**: Ensure all elements display correctly
2. **User interactions**: Form filling, button clicks, navigation
3. **Validation logic**: Both valid and invalid states
4. **Error scenarios**: API failures, empty states, edge cases
5. **Integration**: Full booking flow from start to finish

### Example Test Commands

```bash
# Run specific test file
npm test -- BookingForm.test.js --watchAll=false

# Run tests matching pattern
npm test -- --testNamePattern="validation" --watchAll=false

# Run tests with verbose output
npm test -- --verbose --watchAll=false
```

## 📦 Building for Production

### Create Production Build

```bash
npm run build
```

This command:
- Creates optimized production build in `build/` folder
- Minifies JavaScript and CSS
- Adds hash to filenames for cache busting
- Optimizes images and assets
- Generates source maps

### Serve Production Build Locally

1. Install a static server:
   ```bash
   npm install -g serve
   ```

2. Serve the build:
   ```bash
   serve -s build
   ```

3. Open [http://localhost:3000](http://localhost:3000)

### Deploy

The production build can be deployed to:
- **Netlify**: Drag and drop `build/` folder
- **Vercel**: Connect repository and deploy
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload `build/` folder to S3 bucket
- **Any static hosting service**

## 🔍 Troubleshooting

### Port Already in Use

If port 3000 is already in use:
```bash
# Windows
set PORT=3001 && npm start

# macOS/Linux
PORT=3001 npm start
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tests Failing

```bash
# Clear Jest cache
npm test -- --clearCache

# Run tests without cache
npm test -- --no-cache --watchAll=false
```

### Browser Not Opening

Manually navigate to [http://localhost:3000](http://localhost:3000)

Or set browser environment variable:
```bash
# Windows
set BROWSER=chrome && npm start

# macOS/Linux
BROWSER=chrome npm start
```

### Slow Performance

```bash
# Clear Create React App cache
rm -rf node_modules/.cache
npm start
```

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
⚠️ **Warning**: This is a one-way operation!

Ejects from Create React App, giving you full control over configuration files.

## 📚 Learn More

### Documentation

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [React Router documentation](https://reactrouter.com/)
- [Testing Library documentation](https://testing-library.com/docs/react-testing-library/intro/)

### Key Concepts

- **React Hooks**: useState, useReducer, useEffect, useNavigate
- **React Router**: BrowserRouter, Routes, Route, Link
- **Form Handling**: Controlled components, validation
- **Testing**: Unit tests, integration tests, test coverage

## 📝 License

This project is private and intended for educational purposes.

## 👥 Contributing

This is a personal project. If you'd like to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Icons and images from Little Lemon brand assets
- React Router for routing solution
- Testing Library for comprehensive testing

---

**Need Help?** Check the [Troubleshooting](#troubleshooting) section or review test files for usage examples.
