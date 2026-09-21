import { test, expect } from '@playwright/test';
import {LoginPage} from "../page-objects/Login.page";
import {ProductsPage} from "../page-objects/Products.page";
import {sunnyUser, lockedUser, wrongUser} from '../data/testData'

test.describe('Login functionality', () => {

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

    test('Rainy Day - Login as locked user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step( 'Go to login page', async () => {
            await loginPage.navigateToPage();
        })

        await test.step( 'Login to the system as locked user', async () => {
            await loginPage.loginToSystem(lockedUser.userName, lockedUser.password);
        })

        await test.step( 'Verify error message', async () => {
            await expect(loginPage.errorMessageLockedOut).toHaveText(/locked out/i);
        })

    });

    test('Rainy Day - Login with wrong credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step( 'Go to login page', async () => {
            await loginPage.navigateToPage();
        })

        await test.step( 'Login to the system with incorrect credentials', async () => {
            await loginPage.loginToSystem(wrongUser.userName, wrongUser.password);
        })

        await test.step( 'Verify error message', async () => {
            await expect(loginPage.errorMessageLockedOut).toHaveText(/do not match any user/i);
        })

    });

    test('Sunny Day - Login and Logout', async ({page}) => {

        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        await test.step( 'Go to login page', async () => {
            await loginPage.navigateToPage();
        })

        await test.step( 'Login to the system', async () => {
            await loginPage.loginToSystem(sunnyUser.userName, sunnyUser.password);
        })

        await test.step( 'Verify Products page opened', async () => {
            await expect(productsPage.pageTitle).toHaveText('Products');
        })

        await test.step('Logout from the system', async () => {
            await productsPage.openSideBarMenu()
            await productsPage.selectLogoutFromSideBarMenu()
        })

        await test.step('Check user is on Login page', async () => {
            await expect(loginPage.loginLogo).toHaveText('Swag Labs')
        })

    })

})