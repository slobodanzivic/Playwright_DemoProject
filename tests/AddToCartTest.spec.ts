/**
 * Test Description: Add to Cart Test to verify adding a product to the shopping cart
 *
 * Test Steps:
 * 1. Navigate to the application URL
 * 2. Enter "iPhone" in the Search box
 * 3. Click on the Search button
 * 4. Click on the name of the product "iPhone"
 * 5. Change quantity from 1 to "2" in the input field Qty
 * 6. Click on the button Add to Cart
 * 7. Verify if this message appears "Success: You have added iPhone to your shopping cart!"
 * 8. Click on the Cart button in the upper right corner
 * 9. Verify name of product and quantity
 */

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { CartItems } from "../pages/CartItems";
import { TestConfig } from "../test.config";

test.describe("Add to Cart Test Suite", () => {

  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;
  let productPage: ProductPage;
  let cartItems: CartItems;
  let testConfig: TestConfig

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    productPage = new ProductPage(page);
    cartItems = new CartItems(page);
    testConfig = new TestConfig();
    await page.goto("https://tutorialsninja.com/demo/");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Add iPhone to shopping cart", async ({ page }) => {
    // Step 2: Enter "iPhone" in the Search box
    await homePage.searchProduct(testConfig.mobileProductName);

    // Step 4: Click on the name of the product "iPhone"
    await searchResultsPage.getProductTitleText();
    await page.locator('a:has-text("iPhone")').click();

    // Step 5: Change quantity from 1 to "2" in the input field Qty
    await productPage.changeQuantity(testConfig.productQuantity);
    await page.waitForTimeout(2000);

    // Step 6: Click on the button Add to Cart
    await productPage.clickAddToCart();
    await page.waitForTimeout(3000);

    // Step 7: Verify if this message appears "Success: You have added iPhone to your shopping cart!"
    const successMessage = await productPage.getSuccessMessage();
    expect(successMessage).toContain("Success: You have added iPhone to your shopping cart!");

    // Step 8: Click on the Cart button in the upper right corner
    await homePage.clickOnCartButton();

    // Step 9: Verify name of product and quantity
    const cartProductName = await cartItems.getCartProductName();
    const cartProductQuantity = await cartItems.getCartProductQuantity();

    expect(cartProductName).toContain("iPhone");
    expect(cartProductQuantity).toContain("2");

    await cartItems.clickOnXButton();

  
  });

  test("Add MacBook to shopping cart", async ({ page }) => {

    await homePage.searchProduct(testConfig.laptopProductName);

    await searchResultsPage.getProductTitleText();
    await page.locator('a:has-text("MacBook")').click();

    await productPage.changeQuantity(testConfig.productQuantity);
    await page.waitForTimeout(2000);

    await productPage.clickAddToCart();
    await page.waitForTimeout(3000);

    const successMessage = await productPage.getSuccessMessage();
    expect(successMessage).toContain("Success: You have added MacBook Air to your shopping cart!");
    
    await homePage.clickOnCartButton();

    const cartProductName = await cartItems.getCartProductName();
    const cartProductQuantity = await cartItems.getCartProductQuantity();
    expect(cartProductName).toContain("MacBook Air");
    expect(cartProductQuantity).toContain("2");


    await cartItems.clickOnXButton();

  });

  
});