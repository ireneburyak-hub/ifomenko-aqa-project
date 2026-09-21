export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.backpack = page.locator('.inventory_item').filter({
            hasText: 'Sauce Labs Backpack'
        });
        this.backpackName = this.backpack.locator('[data-test="inventory-item-name"]');
        this.backpackPrice = this.backpack.locator('[data-test="inventory-item-price"]');
        this.backpackAddToCart = this.backpack.getByRole('button', {
            name: 'Add to cart'
        });
        this.bikeLight = page.locator('.inventory_item').filter({
            hasText: 'Sauce Labs Bike Light'
        });
        this.bikeLightName = this.bikeLight.locator('[data-test="inventory-item-name"]');
        this.bikeLightPrice = this.bikeLight.locator('[data-test="inventory-item-price"]');
        this.bikeLightLink = this.bikeLight.locator('[data-test="item-0-title-link"]');
        this.cartCount = this.page.locator('[data-test="shopping-cart-badge"]');
        this.cartButton = this.page.locator('[data-test="shopping-cart-link"]');
        this.sideBarMenu = page.getByRole('button', { name: 'Open Menu' });
        this.logoutFromSideBar = this.page.locator('[data-test="logout-sidebar-link"]');
    }

    async selectAddToCart() {
        await this.backpackAddToCart.click()
    }

    async selectBikeLightLink() {
        await this.bikeLightLink.click()

    }

    async getProductInfo(){
        return {
            firstProduct:{
                name: await this.backpackName.innerText(),
                price: await this.backpackPrice.innerText()
            },
            secondProduct:{
                name: await this.bikeLightName.innerText(),
                price: await this.bikeLightPrice.innerText()
            }
        }

    }

    async goToCart(){
        await this.cartButton.click()
    }

    async openSideBarMenu(){
        await this.sideBarMenu.click()
    }

    async selectLogoutFromSideBarMenu(){
        await this.logoutFromSideBar.click()
    }

}