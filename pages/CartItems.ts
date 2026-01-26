import { Page, Locator } from "@playwright/test";

export class CartItems {
  private readonly page: Page;

  // Locators
  private readonly cartProductName: Locator;
  private readonly cartProductQuantity: Locator;
  private readonly xButton: Locator;
  private readonly priceInCart: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;
    this.cartProductName = page.locator('td[class="text-left"] a');
    this.cartProductQuantity = page.locator("tbody tr td:nth-child(3)");
    this.xButton = page.locator('button[class="btn btn-danger btn-xs"]');
    this.priceInCart = page.locator('tbody tr td:nth-child(4)')
  }


  //click on X button to remove item from cart
  async clickOnXButton() {
    await this.xButton.click();
  }
  //Get product name from cart
  async getNameInCart(): Promise<string> {
    return (await this.cartProductName.textContent()) || "";
  }

  //Get quantity value from cart
  async getQuantityInCart(): Promise<string> {
    return (await this.cartProductQuantity.textContent()) || "";
  }

  //Get price value from cart
  async getPriceInCart(): Promise<string> {
    return (await this.priceInCart.textContent()) || "";
  }

  // Get all product names from the cart
  async getAllCartProductNames(): Promise<string[]> {
    return await this.page.locator('td[class="text-left"] a').allTextContents();
  }


}