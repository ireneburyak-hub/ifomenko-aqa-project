import { test, expect } from '@playwright/test';
import {ProductsPage} from "../page-objects/Products.page";
import {ProductDetails} from "../page-objects/ProductDetails.page";

test.describe('E2E Check Order and Payments', () => {
    test('Add products to Cart and Pay', async ({page}) => {

        const productsPage = new ProductsPage(page);
        const productDetailsPage = new ProductDetails(page);

        await page.goto('/inventory.html');

        await test.step('Add backpack to cart', async () => {
            await productsPage.selectAddToCart();
        })

        await test.step('Check count of basket is 1', async () => {
            await expect(productsPage.cartCount).toHaveText('1')
        })

        const productsInfo = (await productsPage.getProductInfo()).secondProduct;

        await test.step('Navigate to bike light details page', async () => {
            await productsPage.selectBikeLightLink();
        });

        const detailsInfo = await productDetailsPage.getBikeLightInfo();

        await test.step('Compare info from products and details', async () => {
            expect(detailsInfo.name).toBe(productsInfo.name);
            expect(detailsInfo.price).toBe(productsInfo.price);
        });

        await test.step('Add bike light to the cart', async () => {
            await productDetailsPage.addToCart()
        })

        await test.step('Check count of basket is 2', async () => {
            await expect(productsPage.cartCount).toHaveText('2')
        })

        await test.step('Test return back to the Products', async () => {
            await productDetailsPage.backToProducts()
        })

        await test.step('Navigate to Cart', async () => {
            await productsPage.goToCart()
        })


        //check Basket page
        //checkout - checkout info
        //check total price and that the same clothes are there
        //finish - check finish page
        //check Back Home
        // check generated PDF order

    })
})





