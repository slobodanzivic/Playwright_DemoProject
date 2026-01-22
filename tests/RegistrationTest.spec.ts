import{test,expect,Page}from"@playwright/test";
import { HomePage } from "../pages/HomePage";
import{TestConfig}from"../test.config"; 
import { RegistrationPage } from "../pages/RegistrationPage";
import { RandomDataProvider } from "../utils/randomDataProvider";
import { RegistrationConfirmationPage } from "../pages/RegistrationConfirmationPage";

//Declare variables
let testConfig:TestConfig;
let homePage:HomePage;
let registrationPage:RegistrationPage;
let registrationConfirmationPage:RegistrationConfirmationPage;


test.beforeEach(async({page})=>{
    //Initialize variables
    testConfig = new TestConfig();
    homePage=new HomePage(page);
    registrationPage=new RegistrationPage(page);
    registrationConfirmationPage=new RegistrationConfirmationPage(page);
    await page.goto(testConfig.appUrl);
})

test.afterEach(async({page})=>{
    await page.waitForTimeout(3000);
    await page.close();
})


test('Register to the application',async({page})=>{ 

    // Add further registration steps here
    await homePage.clickOnMyAccount();
    await homePage.clickOnRegister();

    await registrationPage.clickOnFirstNameInput();
    await registrationPage.enterFirstName(RandomDataProvider.getRandomFirstName());

    await registrationPage.clickOnLastNameInput();
    await registrationPage.enterLastName(RandomDataProvider.getRandomLastName());

    await registrationPage.clickOnEmailInput();
    await registrationPage.enterEmailAddress(RandomDataProvider.getRandomEmail());

    await registrationPage.clickOnTelephoneInput();
    await registrationPage.enterTelephone(RandomDataProvider.getRandomTelephone());

    await registrationPage.clickOnPasswordInput();
    await registrationPage.enterPassword(RandomDataProvider.getRandomPassword());
    const passwordText = await registrationPage.getPasswordInputText();

    await registrationPage.clickOnConfirmPasswordInput();
    await registrationPage.enterConfirmPassword(passwordText);

    await registrationPage.selectNewsletter(false);
    await registrationPage.acceptPrivacyPolicy();

    await registrationPage.clickContinue();

    await page.waitForTimeout(5000);

    //Assertion to verify successful registration 
    const confirmationMessageText = await registrationConfirmationPage.getConfirmationMessageText();
    expect(confirmationMessageText).toBe("Your Account Has Been Created!_________++++++");

})



