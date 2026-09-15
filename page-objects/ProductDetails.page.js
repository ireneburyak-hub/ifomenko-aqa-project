export class ProductDetails {
    constructor(page) {
        this.page = page;
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.addToCartButton= page.locator('[data-test="add-to-cart"]');
        this.backToProductButton= page.locator('[data-test="back-to-products"]');
    }

    async addToCart(){
        await this.addToCartButton.click();
    }
    async getBikeLightInfo() {
        return {
            name: await this.productName.innerText(),
            price: await this.productPrice.innerText()
        };
    }

    async backToProducts() {
        await this.backToProductButton.click();
    }
}