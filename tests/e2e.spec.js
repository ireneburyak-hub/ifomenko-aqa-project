import { test, expect } from '@playwright/test';
import {LoginPage} from "../page-objects/Login.page";
import {ProductsPage} from "../page-objects/Products.page";
import {sunnyUser, lockedUser} from '../data/testData'

test('Sunny Day - Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await test.step( 'Go to login page', async () => {
        await loginPage.navigateToPage();
    })

    await test.step( 'Verify elements on login page', async () => {
        await expect(loginPage.loginLogo).toHaveText('Swag Labs');
        await expect(loginPage.userNameField).toHaveAttribute('placeholder', 'Username');
        await expect(loginPage.passwordField).toHaveAttribute('placeholder', 'Password');
        await expect(loginPage.loginButton).toHaveText('Login');
        await expect(loginPage.asseptedUserNames).toContainText('standard_user');
    })

    await test.step( 'Login to the system', async () => {
        await loginPage.loginToSystem(sunnyUser.userName, sunnyUser.password);
    })

    await test.step( 'Verify Products page opened', async () => {
        await expect(productsPage.pageTitle).toHaveText('Products');
    })

});

test('Rainy Day - Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step( 'Go to login page', async () => {
        await loginPage.navigateToPage();
    })

    await test.step( 'Login to the system', async () => {
        await loginPage.loginToSystem(lockedUser.userName, lockedUser.password);
    })

    await test.step( 'Verify error message', async () => {
        await expect(loginPage.errorMessageLockedOut).toHaveText(/locked out/i);
    })

});




