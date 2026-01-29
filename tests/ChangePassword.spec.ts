import { test, expect } from '@playwright/test';
import { MyAccountPage } from '../pages/MyAccountPage';
import { ChangePassword } from '../pages/ChangePassword';
import { LoginPage } from '../pages/LoginPage';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';

test.describe('Change Password Tests', () => {

    let myAccountPage: MyAccountPage;
    let changePassword: ChangePassword;
    let loginPage: LoginPage;
    let testConfig: TestConfig;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        myAccountPage = new MyAccountPage(page);
        changePassword = new ChangePassword(page);
        loginPage = new LoginPage(page);
        testConfig = new TestConfig();
        homePage = new HomePage(page);
        await page.goto(testConfig.appUrl);

    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(2000);
        await page.close();
    });

    test('Change Password with valid data @master', async ({ page }) => {
        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        await loginPage.enterEmailAddress(testConfig.email);
        await loginPage.enterPassword(testConfig.password);
        await loginPage.clickOnLoginButton();

        //Navigate to Change Password page
        await myAccountPage.clickOnChangePasswordLink();

        //Change password
        await changePassword.enterNewPassword(testConfig.newPassword);
        await changePassword.enterConfirmPassword(testConfig.confirmPassword);
        await changePassword.clickOnContinueButton();
        const successMessage = await myAccountPage.getSuccessMessageText();
        expect(successMessage).toContain("Success: Your password has been successfully updated.");

        //Logout after password change
        await homePage.clickOnMyAccount();
        await myAccountPage.clickOnLogoutLink();

        //Try to login with new password
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        await loginPage.enterEmailAddress(testConfig.email);
        await loginPage.enterPassword(testConfig.newPassword);
        await loginPage.clickOnLoginButton();
        const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPageDisplayed).toBeTruthy();

        //Return an original password to keep test idempotent
        await myAccountPage.clickOnChangePasswordLink();
        await changePassword.enterNewPassword(testConfig.password);
        await changePassword.enterConfirmPassword(testConfig.password);
        await changePassword.clickOnContinueButton();
        const successMessageAfterReset = await myAccountPage.getSuccessMessageText();
        expect(successMessageAfterReset).toContain("Success: Your password has been successfully updated.");

    });

    test('Try to Change Password with short password @master', async ({ page }) => {

        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();

        //Enter valid credentials
        await loginPage.enterEmailAddress(testConfig.email);
        await loginPage.enterPassword(testConfig.password);
        await loginPage.clickOnLoginButton();

        //Navigate to Change Password page
        await myAccountPage.clickOnChangePasswordLink();

        //Change password with short password
        await changePassword.enterNewPassword(testConfig.shortPassword);
        await changePassword.enterConfirmPassword(testConfig.shortPassword);
        await changePassword.clickOnContinueButton();

        //Verify validation message for short password
        const passwordValidationErrorMessage = await changePassword.getPasswordValidationErrorMessage();
        expect(passwordValidationErrorMessage).toContain("Password must be between 4 and 20 characters!");

    });

    test('Try to Change Password with long password @master', async ({ page }) => {

        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();  

        //Enter valid credentials
        await loginPage.enterEmailAddress(testConfig.email);
        await loginPage.enterPassword(testConfig.password);
        await loginPage.clickOnLoginButton();   

        //Navigate to Change Password page
        await myAccountPage.clickOnChangePasswordLink();

        //Change password with long password
        await changePassword.enterNewPassword(testConfig.longPassword);
        await changePassword.enterConfirmPassword(testConfig.longPassword);
        await changePassword.clickOnContinueButton();

        //It is possible to set long password (more then 20 characters), so the success message is verified
        const successMessage = await myAccountPage.getSuccessMessageText();
        expect(successMessage).toContain("Success: Your password has been successfully updated.");
        

        //Logout after password change
        await homePage.clickOnMyAccount();
        await myAccountPage.clickOnLogoutLink();

        //Try to login with new password
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        await loginPage.enterEmailAddress(testConfig.email);
        await loginPage.enterPassword(testConfig.longPassword);
        await loginPage.clickOnLoginButton();
        const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPageDisplayed).toBeTruthy();

        //Return an original password to keep test idempotent
        await myAccountPage.clickOnChangePasswordLink();
        await changePassword.enterNewPassword(testConfig.password);
        await changePassword.enterConfirmPassword(testConfig.password);
        await changePassword.clickOnContinueButton();
        const successMessageAfterReset = await myAccountPage.getSuccessMessageText();
        expect(successMessageAfterReset).toContain("Success: Your password has been successfully updated.");
        

    });

    test('Try to Change password wih minimum length password @master', async ({ page }) => {

        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();

        //Enter valid credentials
        await loginPage.enterEmailAddress(testConfig.email);
        await loginPage.enterPassword(testConfig.password);
        await loginPage.clickOnLoginButton();   

        //Navigate to Change Password page
        await myAccountPage.clickOnChangePasswordLink();

        //Change password with minimum length password
        await changePassword.enterNewPassword(testConfig.minLengthPassword);
        await changePassword.enterConfirmPassword(testConfig.minLengthPassword);
        await changePassword.clickOnContinueButton();

        //Verify success message
        const successMessage = await myAccountPage.getSuccessMessageText();
        expect(successMessage).toContain("Success: Your password has been successfully updated.");

        //Logout after password change
        await homePage.clickOnMyAccount();
        await myAccountPage.clickOnLogoutLink();

        //Try to login with new password
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        await loginPage.enterEmailAddress(testConfig.email);
        await loginPage.enterPassword(testConfig.minLengthPassword);
        await loginPage.clickOnLoginButton();
        const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPageDisplayed).toBeTruthy();


        //Return an original password to keep test idempotent
        await myAccountPage.clickOnChangePasswordLink();
        await changePassword.enterNewPassword(testConfig.password);
        await changePassword.enterConfirmPassword(testConfig.password);
        await changePassword.clickOnContinueButton();
        const successMessageAfterReset = await myAccountPage.getSuccessMessageText();
        expect(successMessageAfterReset).toContain("Success: Your password has been successfully updated.");

    });

    test('Try to Change password wih maximum length password @master', async ({ page }) => {
        
        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();

        //Enter valid credentials
        await loginPage.enterEmailAddress(testConfig.email);
        await loginPage.enterPassword(testConfig.password);
        await loginPage.clickOnLoginButton();

        //Navigate to Change Password page
        await myAccountPage.clickOnChangePasswordLink();

        //Change password with maximum length password
        await changePassword.enterNewPassword(testConfig.maxLengthPassword);
        await changePassword.enterConfirmPassword(testConfig.maxLengthPassword);
        await changePassword.clickOnContinueButton();

        //Verify success message
        const successMessage = await myAccountPage.getSuccessMessageText();
        expect(successMessage).toContain("Success: Your password has been successfully updated.");


        //Logout after password change
        await homePage.clickOnMyAccount();
        await myAccountPage.clickOnLogoutLink();

        //Try to login with new password
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        await loginPage.enterEmailAddress(testConfig.email);
        await loginPage.enterPassword(testConfig.maxLengthPassword);
        await loginPage.clickOnLoginButton();
        const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPageDisplayed).toBeTruthy();

        //Return an original password to keep test idempotent
        await myAccountPage.clickOnChangePasswordLink();
        await changePassword.enterNewPassword(testConfig.password);
        await changePassword.enterConfirmPassword(testConfig.password);
        await changePassword.clickOnContinueButton();
        const successMessageAfterReset = await myAccountPage.getSuccessMessageText();
        expect(successMessageAfterReset).toContain("Success: Your password has been successfully updated.");

});

    test('Try to Change Password with mismatched confirm password @master', async ({ page }) => {

        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();

        //Enter valid credentials
        await loginPage.enterEmailAddress(testConfig.email);
        await loginPage.enterPassword(testConfig.password);
        await loginPage.clickOnLoginButton();

        //Navigate to Change Password page
        await myAccountPage.clickOnChangePasswordLink();

        //Change password with mismatched confirm password
        await changePassword.enterNewPassword(testConfig.newPassword);
        await changePassword.enterConfirmPassword(testConfig.mismatchedConfirmPassword); 
        await changePassword.clickOnContinueButton();

        //Verify validation message for mismatched confirm password
        const confirmPasswordValidationErrorMessage = await changePassword.getConfirmPasswordValidationErrorMessage();
        expect(confirmPasswordValidationErrorMessage).toContain("Password confirmation does not match password!");

    });

});
