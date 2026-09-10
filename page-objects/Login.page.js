export class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginLogo = page.locator('.login_logo');
        this.userNameField = page.locator('[id="user-name"]');
        this.passwordField = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.asseptedUserNames = page.locator('[id="login_credentials"]');
        this.errorMessageLockedOut = page.locator('[data-test="error"]')
    }
    async navigateToPage() {
        await this.page.goto('/')
    }

    async loginToSystem(email, password){
        await this.userNameField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click()
    }
}

