import { test, expect } from '@playwright/test';
import {ProductsPage} from "../page-objects/Products.page";
import {ProductDetails} from "../page-objects/ProductDetails.page";
import {BasketPage} from "../page-objects/Basket.page";
import {CheckoutUserDataPage} from "../page-objects/CheckoutUserData.page";
import {CheckoutOverviewPage} from "../page-objects/CheckoutOverview.page";
import {checkoutDetails} from "../data/testData";

test.describe('E2E Check Order and Payments', () => {
    test('Add products to Cart and Pay', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const productDetailsPage = new ProductDetails(page);
        const basketPage = new BasketPage(page);
        const checkoutUserDataPage = new CheckoutUserDataPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);

        await page.goto('/inventory.html');

        // remember products data from Products
        const productsInfo = await productsPage.getProductInfo();

        await test.step('Add backpack to cart', async () => {
            await productsPage.selectAddToCart();
        });

        await test.step('Check count of basket is 1', async () => {
            await expect(productsPage.cartCount).toHaveText('1');
        });

        await test.step('Navigate to bike light details page', async () => {
            await productsPage.selectBikeLightLink();
        });

        const detailsInfo = await productDetailsPage.getBikeLightInfo();

        await test.step('Compare bike light info from products and details', async () => {
            expect(detailsInfo.name).toBe(productsInfo.secondProduct.name);
            expect(detailsInfo.price).toBe(productsInfo.secondProduct.price);
        });

        await test.step('Add bike light to the cart', async () => {
            await productDetailsPage.addToCart();
        });

        await test.step('Check count of basket is 2', async () => {
            await expect(productsPage.cartCount).toHaveText('2');
        });

        await test.step('Return back to Products', async () => {
            await productDetailsPage.backToProducts();
        });

        await test.step('Navigate to Cart', async () => {
            await productsPage.goToCart();
        });

        const basketInfo = await basketPage.getProductInBasketInfo();

        await test.step('Compare products in basket with Products page', async () => {
            expect(basketInfo.firstProductInCart.name)
                .toBe(productsInfo.firstProduct.name);

            expect(basketInfo.firstProductInCart.price)
                .toBe(productsInfo.firstProduct.price);

            expect(basketInfo.secondProductInCart.name)
                .toBe(productsInfo.secondProduct.name);

            expect(basketInfo.secondProductInCart.price)
                .toBe(productsInfo.secondProduct.price);
        });

        await test.step('Check count of basket on Basket page is 2', async () => {
            await expect(basketPage.cartCount).toHaveText('2');
        })

        await test.step('Navigate to Checkout page', async () => {
            await basketPage.checkout()
        })

        await test.step('Check title of Checkout Page', async () => {
            await expect(checkoutUserDataPage.title).toHaveText('Checkout: Your Information');
        })

        await test.step('Fill checkout details', async () => {
            await checkoutUserDataPage.fillCheckoutDetails(checkoutDetails.firstName,
                checkoutDetails.lastName, checkoutDetails.postalCode);
        })

        await test.step('Navigate to Checkout Overview page', async () => {
            await checkoutUserDataPage.continue()
        })

        await test.step('Check title of Checkout Overview page', async () => {
            await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');
        })

        const checkoutProductInfo = await checkoutOverviewPage.getProductInCheckoutInfo()

        await test.step('Compare products in Checkout with Products page', async () => {
            expect(checkoutProductInfo.firstProductInCheckout.name)
                .toBe(productsInfo.firstProduct.name);

            expect(checkoutProductInfo.firstProductInCheckout.price)
                .toBe(productsInfo.firstProduct.price);

            expect(checkoutProductInfo.secondProductInCheckout.name)
                .toBe(productsInfo.secondProduct.name);

            expect(checkoutProductInfo.secondProductInCheckout.price)
                .toBe(productsInfo.secondProduct.price);
        });

        await test.step('Check payment info and shipping info present', async () => {
            await expect(checkoutOverviewPage.paymentInfo).toHaveText('Payment Information:');
            await expect(checkoutOverviewPage.paymentValue).toHaveText(/SauceCard #\d+/)
            await expect(checkoutOverviewPage.shippingInfo).toHaveText('Shipping Information:');
            await expect(checkoutOverviewPage.shippingValue).toHaveText('Free Pony Express Delivery!')
        })

        const checkoutInfo = await checkoutOverviewPage.getCheckoutSummary();

        const backpackPrice = parseFloat(
            productsInfo.firstProduct.price.replace('$', '')
        );

        const bikeLightPrice = parseFloat(
            productsInfo.secondProduct.price.replace('$', '')
        );

        const itemTotal = parseFloat(
            checkoutInfo.itemTotal.replace('Item total: $', '')
        );

        const tax = parseFloat(
            checkoutInfo.tax.replace('Tax: $', '')
        );

        const total = parseFloat(
            checkoutInfo.total.replace('Total: $', '')
        );

        await test.step('Check Item Total', async () => {
            const expectedItemTotal = backpackPrice + bikeLightPrice;
            expect(itemTotal).toBeCloseTo(expectedItemTotal, 2);
        });

        await test.step('Check Tax', async () => {
            const taxPercentage = (tax / itemTotal) * 100;

            expect(taxPercentage).toBeCloseTo(8, 2);
        });

        await test.step('Check Total', async () => {
            const expectedTotal = itemTotal + tax;

            expect(total).toBeCloseTo(expectedTotal, 2);
        });

        await test.step('Finish Checkout', async () => {
            await checkoutOverviewPage.finishCheckout()
        })




    });
});



//check Basket page
//checkout - checkout info
//check total price and that the same clothes are there
//finish - check finish page
//check Back Home
// check generated PDF order





