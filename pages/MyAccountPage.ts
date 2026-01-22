import{Page, Locator} from "@playwright/test"

export class MyAccountPage{

    private readonly page:Page;

    //Locators
    private readonly MyAccountLocator:Locator;
    private readonly LogoutLinkLocator:Locator;

    //Constructor
    constructor(page:Page)      
    {
        this.page=page;
        this.MyAccountLocator=page.locator('h2:nth-child(1)');
        this.LogoutLinkLocator=page.locator("li[class='dropdown open'] li:nth-child(5) a:nth-child(1)");

    }

    //Verify My Account page is displayed
    async isMyAccountPageExists() 
    {
        const pageTitle:String=await this.page.title();
        console.log("My Account Page Title: " + pageTitle);

        if(pageTitle.includes("My Account"))
        {
            return true;
        }
        return false;
    }

    //Get My Account page heading text
    async getMyAccountPageHeadingText():Promise<string>
    {
        return await this.MyAccountLocator.textContent() || "";
    }

    //Click on Logout link
    async clickOnLogoutLink():Promise<void>
    {
        await this.LogoutLinkLocator.click();
    }   
    

}