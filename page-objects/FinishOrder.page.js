export class FinishOrderPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.message = page.locator('.complete-header');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
        this.generatePDFButton = page.locator('[data-test="generate-pdf-order"]');
    }

    async generatePDF() {
        await this.generatePDFButton.click();
    }

    async backToHome(){
        await this.backHomeButton.click();
    }


}