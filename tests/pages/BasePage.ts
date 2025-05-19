import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage class serves as the foundation for all page objects
 * It contains common methods and utilities that can be used across all pages
 */
export class BasePage {
  readonly page: Page;
  // Static timestamp for the current test run - will be shared across all instances
  private static currentRunTimestamp: string;

  /**
   * Constructor for the BasePage
   * @param page - Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
    // Initialize the timestamp for this test run if not already set
    if (!BasePage.currentRunTimestamp) {
      BasePage.currentRunTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
    }
  }

  /**
   * Navigate to a specific URL
   * @param url - The URL to navigate to
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get element by selector
   * @param selector - CSS selector
   * @returns Locator for the element
   */
  getElement(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Fill text in an input field
   * @param selector - CSS selector for the input field
   * @param text - Text to fill
   */
  async fillText(selector: string, text: string): Promise<void> {
    await this.getElement(selector).fill(text);
  }

  /**
   * Click on an element
   * @param selector - CSS selector for the element
   */
  async clickElement(selector: string): Promise<void> {
    await this.getElement(selector).click();
  }

  /**
   * Check if element is visible
   * @param selector - CSS selector for the element
   * @returns Promise resolving to boolean indicating visibility
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.getElement(selector).isVisible();
  }

  /**
   * Wait for element to be visible
   * @param selector - CSS selector for the element
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForElementVisible(selector: string, timeout?: number): Promise<void> {
    await this.getElement(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Get text from an element
   * @param selector - CSS selector for the element
   * @returns Promise resolving to element's text content
   */
  async getElementText(selector: string): Promise<string> {
    return await this.getElement(selector).textContent() || '';
  }

  /**
   * Take a screenshot with standardized naming and organization
   * @param testId - Test identifier (e.g., 'CONTACT-01')
   * @param step - Step description (e.g., 'form-filled', 'after-submit')
   * @param status - Test status ('pass' or 'fail')
   * @param additionalInfo - Optional additional information to include in filename
   */
  async takeScreenshot(testId: string, step: string, status: 'pass' | 'fail', additionalInfo?: string): Promise<void> {
    // Use the shared timestamp for this test run
    const timestamp = BasePage.currentRunTimestamp;
    
    // Format the filename: testId_step_additionalInfo (no timestamp in filename)
    const filename = additionalInfo 
      ? `${testId}_${step}_${additionalInfo}` 
      : `${testId}_${step}`;
      
    // Set up file system access
    const fs = require('fs');
    const path = require('path');
    
    // Create screenshots directory if it doesn't exist
    const screenshotsDir = './screenshots';
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }
    
    // Create status directory if it doesn't exist (pass/fail)
    const statusDir = path.join(screenshotsDir, status);
    if (!fs.existsSync(statusDir)) {
      fs.mkdirSync(statusDir);
    }
    
    // Create timestamp directory for this test run inside the status directory
    const timestampDir = path.join(statusDir, timestamp);
    if (!fs.existsSync(timestampDir)) {
      fs.mkdirSync(timestampDir);
    }
    
    // Take the screenshot
    const screenshotPath = path.join(timestampDir, `${filename}.png`);
    console.log(`Screenshot captured: ${status}/${timestamp}/${filename}.png`);
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
  }
  
  /**
   * Take a screenshot of the current step regardless of status
   * @param testId - Test identifier
   * @param step - Step description
   */
  async screenshotStep(testId: string, step: string): Promise<void> {
    await this.takeScreenshot(testId, step, 'pass');
  }
  
  /**
   * Take a screenshot of a successful test
   * @param testId - Test identifier
   * @param step - Step description
   */
  async screenshotSuccess(testId: string, step: string): Promise<void> {
    await this.takeScreenshot(testId, step, 'pass', 'success');
  }
  
  /**
   * Take a screenshot of a failed test
   * @param testId - Test identifier
   * @param step - Step description
   * @param error - Optional error information
   */
  async screenshotFailure(testId: string, step: string, error?: any): Promise<void> {
    const errorInfo = error ? `error-${error.toString().substring(0, 20).replace(/[^a-zA-Z0-9]/g, '-')}` : 'failure';
    await this.takeScreenshot(testId, step, 'fail', errorInfo);
  }
}
