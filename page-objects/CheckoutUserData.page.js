export class CheckoutUserDataPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]')
        this.firstNameField = page.locator('[data-test="firstName"]')
        this.lastNameField = page.locator('[data-test="lastName"]')
        this.postalCodeField = page.locator('[data-test="postalCode"]')
        this.continueButton = page.locator('[data-test="continue"]')
    }

    async fillCheckoutDetails(firstName, lastName, postalCode) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);
    }

    async continue(){
        await this.continueButton.click()
    }
}