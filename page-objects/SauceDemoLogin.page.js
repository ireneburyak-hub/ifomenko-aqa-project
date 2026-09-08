import {expect} from "@playwright/test";

export class SauceDemoLoginPage {
    constructor(page) {
        this.page = page;
        this.loginLogo = page.locator('.login_logo');
        this.userNameField = page.locator('[id="user-name"]');
        this.passwordField = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.asseptedUserNames = page.locator('[id="login_credentials"]');
    }
    async navigateToPage() {
        await this.page.goto('https://www.saucedemo.com/')
    }
    async checkDataOnPage() {
        await expect(this.loginLogo).toHaveText('Swag Labs');
        await expect(this.userNameField).toHaveAttribute('placeholder', 'Username');
        await expect(this.passwordField).toHaveAttribute('placeholder', 'Password');
        await expect(this.loginButton).toHaveText('Login');
        await expect(this.asseptedUserNames).toContainText('standard_user');
        await expect(this.asseptedUserNames).toContainText('locked_out_user');
        await expect(this.asseptedUserNames).toContainText('problem_user');
        await expect(this.asseptedUserNames).toContainText('performance_glitch_user');
        await expect(this.asseptedUserNames).toContainText('error_user');
        await expect(this.asseptedUserNames).toContainText('visual_user');
    }

    async loginToSystem(email, password){
        await this.userNameField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click()
    }
}

