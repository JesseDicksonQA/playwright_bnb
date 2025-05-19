# Playwright Automation Framework

## Overview
This project is a professional Playwright automation test framework that demonstrates how to test web applications using a Page Object Model design pattern. The framework is set up to test the contact form on the [Automation in Testing](https://automationintesting.online/) website.

## Features
- TypeScript implementation for type safety
- Page Object Model (POM) design pattern
- Detailed test reporting and tracking
- GitHub Actions CI/CD integration
- Cross-browser testing
- Enhanced screenshot functionality for both passed and failed tests
- Data-driven test approach

## Project Structure
```
├── .github/workflows   # GitHub Actions workflow configurations
├── tests/              # Test directory
│   ├── pages/          # Page Object Models
│   ├── fixtures/       # Test fixtures
│   ├── utils/          # Utility functions and helpers
│   ├── data/           # Test data
│   └── *.spec.ts       # Test specifications
├── playwright.config.ts # Playwright configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies and scripts
```

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/JesseDicksonQA/playwright_bnb.git
   cd playwright_bnb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npm run install:browsers
   ```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (with browser visible)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### View HTML test report
```bash
npm run report
```

## CI/CD Integration
This project includes GitHub Actions workflow that automatically runs tests on every push to the `main` or `master` branch and on pull requests to these branches.

## Key Components

### BasePage.ts
Provides common functionality for all page objects, such as navigation, element interaction, waiting for elements, and screenshot capture utilities.

### HomePage.ts
Implements the home page functionality, particularly focusing on the contact form at the bottom of the page.

## Screenshot Organization
The framework captures screenshots at various stages of test execution for both passed and failed tests. Screenshots are organized for easy access and debugging:

- **Top-level organization**: Screenshots are separated into `/pass` and `/fail` directories based on test status
- **Test run organization**: Within each status directory, screenshots are further organized by timestamp folders (e.g., `2025-05-19T22-41-53-955Z`) to keep all screenshots from a single test run together
- **Screenshot naming**: Each screenshot is named using a convention of `TestID_Step_AdditionalInfo.png` for clear identification of test context

Examples of screenshot capture points:
- Before filling out the form
- After filling out the form
- After form submission
- When validation errors occur
- Final test state

### TestReporter.ts
Tracks test executions, pass/fail rates, and provides detailed reporting of test results.

### Data-Driven Testing
Test data is separated into its own files to enable easy maintenance and extension of test scenarios.

## Extending the Framework

1. Add new page objects in the `tests/pages` directory
2. Create new test data in the `tests/data` directory
3. Add new test specifications in the `tests` directory

## Best Practices Implemented

- Code organization using the Page Object Model
- Type safety with TypeScript
- Detailed comments and documentation
- Separation of concerns (pages, fixtures, utils, data)
- Advanced reporting and test tracking
- CI/CD integration
- Cross-browser testing capability
