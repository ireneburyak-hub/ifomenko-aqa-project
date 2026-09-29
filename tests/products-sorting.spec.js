import { test, expect } from '../fixtures/fixtures';

test.describe('Check Sorting Products', () => {

    test('Sort products by name Z to A', async ({ productsPage }) => {

        await test.step('Open Products page', async () => {
            await productsPage.page.goto('/inventory.html');
        });

        await test.step('Select sorting by name Z to A', async () => {
            await productsPage.selectOption('za');
        });

        await test.step('Verify products are sorted by name Z to A', async () => {
            const names = await productsPage.productNames.allTextContents();
            const expectedNames = [...names].sort().reverse();
            expect(names).toEqual(expectedNames);
        });
    });

    test('Sort products by name A to Z', async ({ productsPage }) => {

        await test.step('Open Products page', async () => {
            await productsPage.page.goto('/inventory.html');
        });

        await test.step('Select sorting by name A to Z', async () => {
            await productsPage.selectOption('az');
        });

        await test.step('Verify products are sorted by name A to Z', async () => {
            const names = await productsPage.productNames.allTextContents();
            const expectedNames = [...names].sort();
            expect(names).toEqual(expectedNames);
        });
    });

    test('Sort products by price Low to High', async ({ productsPage }) => {

        await test.step('Open Products page', async () => {
            await productsPage.page.goto('/inventory.html');
        });

        await test.step('Select sorting by price Low to High', async () => {
            await productsPage.selectOption('lohi');
        });

        await test.step('Verify products are sorted by price Low to High', async () => {
            const prices = await productsPage.productPrices.allTextContents();

            const numericPrices = prices.map(price =>
                parseFloat(price.replace('$', ''))
            );

            const expectedPrices = [...numericPrices].sort((a, b) => a - b);

            expect(numericPrices).toEqual(expectedPrices);
        });
    });

    test('Sort products by price High to Low', async ({ productsPage }) => {

        await test.step('Open Products page', async () => {
            await productsPage.page.goto('/inventory.html');
        });

        await test.step('Select sorting by price High to Low', async () => {
            await productsPage.selectOption('hilo');
        });

        await test.step('Verify products are sorted by price High to Low', async () => {
            const prices = await productsPage.productPrices.allTextContents();

            const numericPrices = prices.map(price =>
                parseFloat(price.replace('$', ''))
            );

            const expectedPrices = [...numericPrices].sort((a, b) => b - a);

            expect(numericPrices).toEqual(expectedPrices);
        });
    });
});