import { Locator, Page } from "@playwright/test";

export class locatorsAndElementsPage {
    readonly page: Page;
    readonly addConsoleToCart: Locator;

    readonly basketEl: Locator;

    readonly cartCloseBtn: Locator;
    constructor(page: Page) {
        this.page = page;
        this.addConsoleToCart = page.locator('[class*="button-style button-style_base-alter"]').first();
        this.basketEl = page.locator("[class='cart-form__control']").first();
        this.cartCloseBtn = page
            .locator("[class='cart-form__link cart-form__link_other cart-form__link_small']:nth-child(2)")
            .first();
    }

    async clickElementAddConsoleToCart() {
        await this.addConsoleToCart.click({ force: true, timeout: 3000 });
    }

    async clickToBasketEl() {
        await this.basketEl.click({ force: true, timeout: 3000 });
    }

    async clickToCartCloseBtn() {
        await this.cartCloseBtn.click({ force: true, timeout: 3000 });
    }
}
