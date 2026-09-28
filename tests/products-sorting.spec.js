import { test, expect } from '../fixtures/fixtures';

test.describe('Check Sorting Products', () => {

    test('Sort products by name Z to A', async ({ productsPage }) => {

        await productsPage.page.goto('/inventory.html');

        await productsPage.selectOption('za');

        const names = await productsPage.productNames.allTextContents();
        const expectedNames = [...names].sort().reverse();
        expect(names).toEqual(expectedNames);
    })

    test('Sort products by name A to Z', async ({ productsPage }) => {

    await productsPage.page.goto('/inventory.html');

    await productsPage.selectOption('az');


    const names = await productsPage.productNames.allTextContents();
    const expectedNames = [...names].sort();
    expect(names).toEqual(expectedNames);
})

    test('Sort products by price Low to High', async ({ productsPage }) => {

        await productsPage.page.goto('/inventory.html');

        await productsPage.selectOption('lohi');

        const prices = await productsPage.productPrices.allTextContents();

        const numericPrices = prices.map(price =>
            parseFloat(price.replace('$', ''))
        );

        const expectedPrices = [...numericPrices].sort((a, b) => a - b);

        expect(numericPrices).toEqual(expectedPrices);
    });

    test('Sort products by price High to Low', async ({ productsPage }) => {

        await productsPage.page.goto('/inventory.html');

        await productsPage.selectOption('hilo');

        const prices = await productsPage.productPrices.allTextContents();

        const numericPrices = prices.map(price =>
            parseFloat(price.replace('$', ''))
        );

        const expectedPrices = [...numericPrices].sort((a, b) => b - a);

        expect(numericPrices).toEqual(expectedPrices);
    });
});