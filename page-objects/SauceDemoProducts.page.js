export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
    }

    async checkLoginSuccessful() {
        await expect(this.pageTitle).toHaveText('Products');
    }
}