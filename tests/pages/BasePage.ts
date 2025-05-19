import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage class serves as the foundation for all page objects
 * It contains common methods and utilities that can be used across all pages
 */
export class BasePage {
  readonly page: Page;

  /**
   * Constructor for the BasePage
   * @param page - Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
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
   * Take a screenshot
   * @param name - Name for the screenshot file
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `./screenshots/${name}.png` });
  }
}
