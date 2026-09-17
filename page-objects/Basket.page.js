export class BasketPage {
    constructor(page) {
        this.page = page;
        this.backpackInBasket = page.locator('.cart_item').filter({
            hasText: 'Sauce Labs Backpack'
        });
        this.backpackName = this.backpackInBasket.locator('[data-test="inventory-item-name"]');
        this.backpackPrice = this.backpackInBasket.locator('[data-test="inventory-item-price"]');
        this.bikeLightInBasket = page.locator('.cart_item').filter({
            hasText: 'Sauce Labs Bike Light'
        });
        this.bikeLightName = this.bikeLightInBasket.locator('[data-test="inventory-item-name"]');
        this.bikeLightPrice = this.bikeLightInBasket.locator('[data-test="inventory-item-price"]');
        this.cartCount = this.page.locator('[data-test="shopping-cart-badge"]');
        this.cartButton = this.page.locator('[data-test="shopping-cart-link"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async getProductInBasketInfo() {
        return {
            firstProductInCart: {
                name: await this.backpackName.innerText(),
                price: await this.backpackPrice.innerText()
            },
            secondProductInCart: {
                name: await this.bikeLightName.innerText(),
                price: await this.bikeLightPrice.innerText()
            }
        }
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

}