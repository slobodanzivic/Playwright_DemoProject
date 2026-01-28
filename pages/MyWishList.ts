import{Page, Locator} from '@playwright/test';

export class MyWishListPage {
    private readonly page: Page;

    // Locators
    private readonly wishListTable: Locator;
    private readonly productName: Locator;
    private readonly removeButton: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.wishListTable = page.locator('table[class="table table-bordered table-hover"]');
        this.productName = page.locator('table.table tbody tr td:nth-child(2) a');
        this.removeButton = page.locator('a[data-original-title="Remove"]');
    }

    //Get text from product name in Wish List
    async getProductNameText(): Promise<string> {
        return await this.productName.textContent() || "";
    }

    //Click on Remove button to remove product from Wish List
    async clickOnRemoveButton(): Promise<void> {
        await this.removeButton.click();
    }

}