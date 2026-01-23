import{test, expect, Page} from "@playwright/test"
import { HomePage } from "../pages/HomePage";   
import { TestConfig } from "../test.config";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { afterEach } from "node:test";

test.describe("Search Functionality Test Suite",()=>{

    let homePage:HomePage;
    let testConfig:TestConfig;
    let searchResultsPage: SearchResultsPage;


    test.beforeEach(async({page})=>{
        testConfig=new TestConfig();
        homePage=new HomePage(page);
        searchResultsPage=new SearchResultsPage(page);
        
        await page.goto("https://tutorialsninja.com/demo/");
    });


    test.afterEach(async({page})=>{
      
        await page.waitForTimeout(3000);
        await page.close();
    });


    test("Search Product Test: Searching for monitor",async({page})=>{

        await homePage.searchProduct(testConfig.monitorProductName);
        expect (await searchResultsPage.getSearchResultsHeaderText()).toContain(testConfig.monitorProductName);
        console.log(`Search results header contains product name: ${testConfig.monitorProductName}`);

    })

    test("Search Product Test: Searching for camera",async({page})=>{

        await homePage.searchProduct(testConfig.cameraProductName);
        expect (await searchResultsPage.getSearchResultsHeaderText()).toContain(testConfig.cameraProductName);
        console.log(`Search results header contains product name: ${testConfig.cameraProductName}`);
        await page.waitForTimeout(3000);

    })

    test("Search Product Test: Searching for tablet",async({page})=>{

        await homePage.searchProduct(testConfig.tabletProductName);
        expect (await searchResultsPage.getSearchResultsHeaderText()).toContain(testConfig.tabletProductName);
        console.log(`Search results header contains product name: ${testConfig.tabletProductName}`);    
    })

    test("Search Product Test: Search with empty input",async({page})=>{

        await homePage.searchProduct(testConfig.emtyProductName);
        expect (await searchResultsPage.getConfirmationMessageText()).toContain("There is no product that matches the search criteria.");
        console.log(`Search results header contains text: 'There is no product that matches the search criteria.'`);    
    })
});
