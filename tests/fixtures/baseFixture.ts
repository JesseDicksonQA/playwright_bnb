import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TestReporter } from '../utils/TestReporter';

/**
 * Custom fixture type that extends Playwright's fixtures
 * This provides strongly-typed access to our page objects and utilities
 */
export type TestFixtures = {
  homePage: HomePage;
  testReporter: TestReporter;
};

/**
 * Extended test with custom fixtures
 * This makes it easy to access page objects and utilities in tests
 */
export const test = base.extend<TestFixtures>({
  // Define the homePage fixture
  homePage: async ({ page }, use) => {
    // Create a new HomePage instance
    const homePage = new HomePage(page);
    
    // Navigate to the home page before each test
    await homePage.navigateToHomePage();
    
    // Provide the homepage to the test
    await use(homePage);
  },
  
  // Define the testReporter fixture
  testReporter: async ({}, use) => {
    // Get the singleton instance of the TestReporter
    const reporter = TestReporter.getInstance();
    
    // Provide the reporter to the test
    await use(reporter);
  },
});

// Export expect from the base test
export { expect } from '@playwright/test';
