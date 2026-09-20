export class ProductDetails {
    constructor(page) {
        this.page = page;
        this.productName = page.locator('.inventory_details_name');
        this.productPrice = page.locator('.inventory_details_price');
        this.addToCartButton= page.locator('[data-test="add-to-cart"]');
        this.backToProductButton= page.locator('[data-test="back-to-products"]');
    }

    async addToCart(){
        await this.addToCartButton.click();
    }
    async getBikeLightInfo() {
        console.log('Product names count:', await this.productName.count());
        console.log('Product prices count:', await this.productPrice.count());

        return {
            name: await this.productName.innerText(),
            price: await this.productPrice.innerText()
        };
    }

    async backToProducts() {
        await this.backToProductButton.click();
    }
}