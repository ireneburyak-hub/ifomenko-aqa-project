import { test as base, expect } from '@playwright/test';

import {LoginPage} from "../page-objects/Login.page";
import {ProductsPage} from "../page-objects/Products.page";

export const test = base.extend({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

});

export { expect };