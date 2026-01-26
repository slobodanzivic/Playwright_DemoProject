import { th } from "@faker-js/faker";
import{Page,Locator} from "@playwright/test"

export class HomePage{

    private readonly page:Page;

    //Locators
    private readonly myAccountLink:Locator;
    private readonly registerLink:Locator;
    private readonly loginLink:Locator;
    private readonly searchBox:Locator; 
    private readonly searchButton:Locator;  
    private readonly cartButton:Locator;


    //Constructor
    constructor(page:Page){
        this.page=page;
        this.myAccountLink=page.locator('a[title="My Account"] span[class="hidden-xs hidden-sm hidden-md"]');
        this.registerLink=page.locator('a[href="https://tutorialsninja.com/demo/index.php?route=account/register"]');
        this.loginLink=page.locator('a[href="https://tutorialsninja.com/demo/index.php?route=account/login"]');
        this.searchBox=page.locator('input[placeholder="Search"]');
        this.searchButton=page.locator('button[class="btn btn-default btn-lg"]');
        this.cartButton=page.locator('#cart');
    }

    async isHomePageExists() {
        const pageTitle:String=await this.page.title();
        if(pageTitle)
        {
            return true;
        }
        return false;
    }

    //Click on My Account link
    async clickOnMyAccount (){
        try
        {
            await this.myAccountLink.click();

        }
        
        catch (error)
        
        {
        console.log(`Exeption occured while clicking on 'My Account': ${error}`)
        throw error;
        }
    }

    //Click on Register link
    async clickOnRegister(){

        try
        {
            await this.registerLink.click();
        }
        catch(error)
        {
            console.log(`Expetion occured while clicking on 'Register': ${error}`)
            throw error;
        }
    }

    //Click on Login link
    async clickOnLogin(){

    try
    {
        await this.loginLink.click();
    }
    catch(error)
    {
        console.log(`Exeption occured while clicking on 'Login': ${error}`)
        throw error;
    }

}

//Click on Search Box, enter product name and click on Search Button
async searchProduct(productName:string){    
    try
    {
        await this.searchBox.click();
        await this.searchBox.fill(productName);
        await this.searchButton.click();
    }   
    catch(error)
    {
        console.log(`Exeption occured while searching for product '${productName}': ${error}`)
        throw error;
    }   
}

//Click on Cart Button
async clickOnCartButton(){
    try
    {
        await this.cartButton.click();
    }
    catch(error)
    {
        console.log(`Exeption occured while clicking on 'Cart' button: ${error}`)
        throw error;
    }
}
}

