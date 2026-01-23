import {Page, Locator} from "@playwright/test"

export class SearchResultsPage{
    
    
    private readonly page:Page;

    //Locators
    private readonly searchResultsHeader:Locator;
    private readonly confirmationMessage:Locator;   

    //Constructor
    constructor(page:Page){
        this.page=page;
        this.searchResultsHeader=page.locator('div#content h1');
        this.confirmationMessage=page.locator('//p[contains(text(),"There is no product that matches the search criteria.")]');
    }

    //Get Search Results Header Text
    async getSearchResultsHeaderText():Promise<string>{
        return await this.searchResultsHeader.textContent() || "";
    }   
    
    //Get Confirmation Message Text
    async getConfirmationMessageText():Promise<string>{
        return await this.confirmationMessage.textContent() || "";
    }

}