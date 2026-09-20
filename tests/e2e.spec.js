import { test, expect } from '@playwright/test';
import {ProductsPage} from "../page-objects/Products.page";
import {ProductDetails} from "../page-objects/ProductDetails.page";
import {BasketPage} from "../page-objects/Basket.page";
import {CheckoutUserDataPage} from "../page-objects/CheckoutUserData.page";
import {CheckoutOverviewPage} from "../page-objects/CheckoutOverview.page";
import {FinishOrderPage} from "../page-objects/FinishOrder.page";
import {checkoutDetails} from "../data/testData";

test.describe('E2E Order and Payment Flow', () => {
    test('Complete order with two products', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const productDetailsPage = new ProductDetails(page);
        const basketPage = new BasketPage(page);
        const checkoutUserDataPage = new CheckoutUserDataPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const finishOrderPage = new FinishOrderPage(page);

        await page.goto('/inventory.html');

        // Save product data to compare it throughout the checkout flow
        const productsInfo = await productsPage.getProductInfo();

        await test.step('Add Backpack to cart', async () => {
            await productsPage.selectAddToCart();
        });

        await test.step('Check cart contains 1 item', async () => {
            await expect(productsPage.cartCount).toHaveText('1');
        });

        await test.step('Navigate to Bike Light details', async () => {
            await productsPage.selectBikeLightLink();
        });

        const detailsInfo = await productDetailsPage.getBikeLightInfo();

        await test.step('Compare Bike Light with Products page', async () => {
            expect(detailsInfo.name).toBe(productsInfo.secondProduct.name);
            expect(detailsInfo.price).toBe(productsInfo.secondProduct.price);
        });

        await test.step('Add Bike Light to cart', async () => {
            await productDetailsPage.addToCart();
        });

        await test.step('Check cart contains 2 items', async () => {
            await expect(productsPage.cartCount).toHaveText('2');
        });

        await test.step('Return to Products', async () => {
            await productDetailsPage.backToProducts();
        });

        await test.step('Navigate to Cart', async () => {
            await productsPage.goToCart();
        });

        const basketInfo = await basketPage.getProductInBasketInfo();

        // Verify that product data remains unchanged after adding products to the cart
        await test.step('Compare cart products with Products page', async () => {
            expect(basketInfo.firstProductInCart.name)
                .toBe(productsInfo.firstProduct.name);
            expect(basketInfo.firstProductInCart.price)
                .toBe(productsInfo.firstProduct.price);
            expect(basketInfo.secondProductInCart.name)
                .toBe(productsInfo.secondProduct.name);
            expect(basketInfo.secondProductInCart.price)
                .toBe(productsInfo.secondProduct.price);
        });

        await test.step('Check cart contains 2 items', async () => {
            await expect(basketPage.cartCount).toHaveText('2');
        });

        await test.step('Navigate to Checkout', async () => {
            await basketPage.checkout();
        });

        await test.step('Check Checkout page title', async () => {
            await expect(checkoutUserDataPage.title)
                .toHaveText('Checkout: Your Information');
        });

        await test.step('Fill checkout details', async () => {
            await checkoutUserDataPage.fillCheckoutDetails(
                checkoutDetails.firstName,
                checkoutDetails.lastName,
                checkoutDetails.postalCode
            );
        });

        await test.step('Navigate to Checkout Overview', async () => {
            await checkoutUserDataPage.continue();
        });

        await test.step('Check Checkout Overview page title', async () => {
            await expect(checkoutOverviewPage.title)
                .toHaveText('Checkout: Overview');
        });

        const checkoutProductInfo =
            await checkoutOverviewPage.getProductInCheckoutInfo();

        await test.step('Compare checkout products with Products page', async () => {
            expect(checkoutProductInfo.firstProductInCheckout.name)
                .toBe(productsInfo.firstProduct.name);
            expect(checkoutProductInfo.firstProductInCheckout.price)
                .toBe(productsInfo.firstProduct.price);
            expect(checkoutProductInfo.secondProductInCheckout.name)
                .toBe(productsInfo.secondProduct.name);
            expect(checkoutProductInfo.secondProductInCheckout.price)
                .toBe(productsInfo.secondProduct.price);
        });

        await test.step('Check payment and shipping information', async () => {
            await expect(checkoutOverviewPage.paymentInfo)
                .toHaveText('Payment Information:');

            await expect(checkoutOverviewPage.paymentValue)
                .toHaveText(/SauceCard #\d+/);

            await expect(checkoutOverviewPage.shippingInfo)
                .toHaveText('Shipping Information:');

            await expect(checkoutOverviewPage.shippingValue)
                .toHaveText('Free Pony Express Delivery!');
        });

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

        // Validate the checkout calculations independently from the UI values
        await test.step('Check Item Total', async () => {
            const expectedItemTotal = backpackPrice + bikeLightPrice;
            expect(itemTotal).toBeCloseTo(expectedItemTotal, 2);
        });

        await test.step('Check Tax percentage', async () => {
            const taxPercentage = (tax / itemTotal) * 100;
            expect(taxPercentage).toBeCloseTo(8, 2);
        });

        await test.step('Check Total', async () => {
            const expectedTotal = itemTotal + tax;
            expect(total).toBeCloseTo(expectedTotal, 2);
        });

        await test.step('Finish Checkout', async () => {
            await checkoutOverviewPage.finishCheckout();
        });

        await test.step('Check order completion message', async () => {
            await expect(finishOrderPage.title)
                .toHaveText('Checkout: Complete!');

            console.log(await finishOrderPage.message.count());

            await expect(finishOrderPage.message)
                .toHaveText('Thank you for your order!');
        });

        await test.step('Download order PDF', async () => {
            const downloadPromise = page.waitForEvent('download');
            await finishOrderPage.generatePDF();
            const download = await downloadPromise;
            expect(download.suggestedFilename())
                .toMatch(/\.pdf$/);
        });

        await test.step('Return to Home page', async () => {
            await finishOrderPage.backToHome();

            await expect(productsPage.pageTitle)
                .toHaveText('Products');
        });
    });
});





