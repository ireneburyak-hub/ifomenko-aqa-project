import { test, expect } from '@playwright/test';
import {ProductsPage} from "../page-objects/Products.page";

test.describe('E2E Check Order and Payments', () => {
    test('Add products to Cart and Pay', async ({page}) => {


        const productsPage = new ProductsPage(page);

        console.log(await page.context().cookies());

        await page.goto('/inventory.html');
        console.log(page.url());

        await page.pause();

        await test.step('Add backpack to cart', async () => {
            await productsPage.selectAddToCart();
        })

        await test.step('Check count of basket is 1', async () => {
            await expect(productsPage.basketCount).toHaveText('1')
        })

        //check Basket page
        //checkout - checkout info
        //check total price and that the same clothes are there
        //finish - check finish page
        //check Back Home
        // check generated PDF order

    })
})





