export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.backpackInCheckout = page.locator('.cart_item').filter({
            hasText: 'Sauce Labs Backpack'
        });
        this.backpackName = this.backpackInCheckout.locator('[data-test="inventory-item-name"]');
        this.backpackPrice = this.backpackInCheckout.locator('[data-test="inventory-item-price"]');
        this.bikeLightInCheckout = page.locator('.cart_item').filter({
            hasText: 'Sauce Labs Bike Light'
        });
        this.bikeLightName = this.bikeLightInCheckout.locator('[data-test="inventory-item-name"]');
        this.bikeLightPrice = this.bikeLightInCheckout.locator('[data-test="inventory-item-price"]');
        this.paymentInfo = page.locator('[data-test="payment-info-label"]');
        this.paymentValue = page.locator('[data-test="payment-info-value"]');
        this.shippingInfo = page.locator('[data-test="shipping-info-label"]');
        this.shippingValue = page.locator('[data-test="shipping-info-value"]');
        this.totalPrice = page.locator('[data-test="subtotal-label"]');
        this.taxPrice = page.locator('[data-test="tax-label"]');
        this.totalPriceWithTax = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    async getProductInCheckoutInfo() {
        return {
            firstProductInCheckout: {
                name: await this.backpackName.innerText(),
                price: await this.backpackPrice.innerText()
            },
            secondProductInCheckout: {
                name: await this.bikeLightName.innerText(),
                price: await this.bikeLightPrice.innerText()
            }
        }
    }
    async getCheckoutSummary() {
        return {
            itemTotal: await this.totalPrice.innerText(),
            tax: await this.taxPrice.innerText(),
            total: await this.totalPriceWithTax.innerText()
        };
    }

    async finishCheckout() {
        await this.finishButton.click();
    }


}