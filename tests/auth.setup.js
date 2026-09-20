import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/Login.page';
import { sunnyUser } from '../data/testData';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToPage();

    await loginPage.loginToSystem(
        sunnyUser.userName,
        sunnyUser.password
    );

    await expect(page).toHaveURL(/inventory/);

    await page.context().storageState({
        path: '.auth/user.json'
    });
});