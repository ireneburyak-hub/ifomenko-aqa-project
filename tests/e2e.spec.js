import { test, expect } from '@playwright/test';
import {SauceDemoLoginPage} from "../page-objects/SauceDemoLogin.page";
import {SauceDemoProductsPage} from "../page-objects/SauceDemoProducts.page";
import {sunnyUser} from '../data/testData'

test.setTimeout(50*1000)
test('Sunny Day - Login', async ({ page }) => {
    const sauceDemoLoginPage = new SauceDemoLoginPage(page);
    const sauceDemoProductsPage = new SauceDemoProductsPage(page);
    await sauceDemoLoginPage.navigateToPage();
    await sauceDemoLoginPage.checkDataOnPage();
    await sauceDemoLoginPage.loginToSystem(sunnyUser.userName, sunnyUser.password);
    await sauceDemoProductsPage.checkLoginSuccessful();
});



