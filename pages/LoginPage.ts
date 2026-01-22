import{Page, Locator,} from "@playwright/test"

export class LoginPage{

    private readonly page:Page;

    //Locators
    private readonly emailInput:Locator;
    private readonly passwordInput:Locator;
    private readonly loginButton:Locator;   


    //Constructor
    constructor(page:Page)
    
    {
        this.page=page;
        this.emailInput=page.locator('input[name="email"]');
        this.passwordInput=page.locator('input[name="password"]');
        this.loginButton=page.locator('input[value="Login"]');
    }

    //Click on Email input box
    async clickOnEmailInput()
    {
        await this.emailInput.click();
    }


    //Enter email address
    async enterEmailAddress(email:string)
    {
        await this.emailInput.fill(email);
    
    }

    //Click on Password input box
    async clickOnPasswordInput()
    {
        await this.passwordInput.click();
    }

    //Enter password
    async enterPassword(password:string)
    {
        await this.passwordInput.fill(password);
    }

    //Click on Login button
    async clickOnLoginButton()
    {
        await this.loginButton.click();
    }

    async  getLoginErrorMessageText():Promise<string>{
        const errorMessageLocator=this.page.locator('.alert.alert-danger.alert-dismissible');
        return await errorMessageLocator.textContent() || "";
    }

}

