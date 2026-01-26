import { Page, Locator } from "@playwright/test";

export class CartItems {
  private readonly page: Page;

  // Locators
  private readonly cartProductName: Locator;
  private readonly cartProductQuantity: Locator;
  private readonly xButton: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;
    this.cartProductName = page.locator('td[class="text-left"] a');
    this.cartProductQuantity = page.locator("//td[normalize-space()='x2']");
    this.xButton = page.locator('button[class="btn btn-danger btn-xs"]');
  }

  // Get product name from the cart
  async getCartProductName(): Promise<string> {
    return (await this.cartProductName.textContent()) || "";
  }

  // Get product quantity from the cart
  async getCartProductQuantity(): Promise<string> {
    return (await this.cartProductQuantity.textContent()) || "";
  }

  //click on X button to remove item from cart
  async clickOnXButton() {
    await this.xButton.click();
  }
}