import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
import { DataProvider } from "../utils/dataProvider";


const jsonPath = "testdata/logindata.json";
const jsonTestdata = DataProvider.getDataFromJson(jsonPath);



for (const data of jsonTestdata) {

    test(`Login test with data from JSON file: ${data.testName}` , async ({ page }) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const myAccountPage = new MyAccountPage(page);
        const testConfig = new TestConfig();

        await page.goto(testConfig.appUrl);
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();

        await loginPage.clickOnEmailInput();
        await loginPage.enterEmailAddress(data.email);

        await loginPage.clickOnPasswordInput();
        await loginPage.enterPassword(data.password);

        await page.waitForTimeout(2000);
        await loginPage.clickOnLoginButton();

        await page.waitForTimeout(3000);

        if (data.expected.toLowerCase() === "success") {
            const myAccountHeadingText = await myAccountPage.getMyAccountPageHeadingText();
            expect(myAccountHeadingText).toBe("My Account");

        }
        else {
            const errorMessage = await loginPage.getLoginErrorMessageText();
            expect
            (
                errorMessage === "Warning: No match for E-Mail Address and/or Password." ||
                errorMessage === "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."
            ).toBeTruthy();
        }

    })
}

