import { test, expect } from "@playwright/test";
import { logger } from "../configLogger";

test.describe("check difference elements", () => {
    test.skip("Check title name in catalog page", async ({ page }) => {
        await page.goto("https://catalog.onliner.by/");
        const title = page.locator(
            "#container > div > div > div > div > div.catalog-navigation.catalog-navigation_opened > div.catalog-navigation__title",
        );
        await expect(title).toHaveText("КаталогВсе суперцены!");
    });

    test.skip("Check: checkbox 'Prime' is checked on mobile page", async ({ page }) => {
        await page.goto("https://catalog.onliner.by/mobile");
        const checkbox = page.locator(
            "#schema-filter > div.schema-filter__bonus > div:nth-child(1) > label.schema-filter__bonus-item.schema-filter__bonus-item_primary > div.i-checkbox",
        );
        await checkbox.click();
        await expect(checkbox).toBeChecked();
    });

    test.skip("Check: filter Minimum price", async ({ page }) => {
        await page.goto("https://catalog.onliner.by/console");
        const FiletMaxPriceValue500 = page.locator(
            "#schema-filter > div:nth-child(7) > div:nth-child(3) > div.schema-filter__facet > div > div:nth-child(2) > input",
        );
        await FiletMaxPriceValue500.fill("500");
        await page.locator('a[class="schema-order__link"]').click();
        await page.locator("#schema-order > div.schema-order__popover > div > div:nth-child(3)").click();

        const expectedConsole = page.locator(
            "#schema-products > div:nth-child(2) > div > div.schema-product__part.schema-product__part_2 > div.schema-product__part.schema-product__part_4 > div.schema-product__title > a > span",
        );

        await expect(expectedConsole).toHaveText("Игровая приставка Nintendo Game & Watch Super Mario Bros.");
    });
});
test.describe("test for cart", () => {
    test("Check: add items to cart", async ({ page }) => {
        logger.info("INFO");
        await page.goto("https://catalog.onliner.by/console/sony/playstation5");
        const addConsoleToCart = page.locator(
            "#container > div > div > div > div > div.catalog-content.js-scrolling-area > div.product.product_details.b-offers.js-product > main > div > div > aside > div:nth-child(1) > div.product-aside__offers > div.product-aside__offers-list > div.product-aside__offers-item.product-aside__offers-item_primary > div.product-aside__control.product-aside__control_condensed-additional > a.button-style.button-style_base-alter.button-style_primary.product-aside__button.product-aside__button_narrow.product-aside__button_cart.button-style_expletive",
        );
        await addConsoleToCart.click();
        await page.locator("#userbar > div:nth-child(2) > div > a").click({ force: true, timeout: 5000 });
        const expectedConsoleToCart = page.locator(
            "#container > div.cart-content > div > div > div > div > div.cart-form__body > div > div.cart-form__offers > div > div > div.cart-form__offers-item.cart-form__offers-item_secondary > div > div.cart-form__offers-part.cart-form__offers-part_data > div.cart-form__description.cart-form__description_primary.cart-form__description_base-alter.cart-form__description_font-weight_semibold.cart-form__description_condensed-other > a",
        );
        await expect(expectedConsoleToCart).toHaveText("Игровая приставка Sony PlayStation 5");
    });

    test("Check: delete items from cart", async ({ page }) => {
        await page.goto("https://catalog.onliner.by/console/sony/playstation5");
        const addConsoleToCart = page.locator(
            "#container > div > div > div > div > div.catalog-content.js-scrolling-area > div.product.product_details.b-offers.js-product > main > div > div > aside > div:nth-child(1) > div.product-aside__offers > div.product-aside__offers-list > div.product-aside__offers-item.product-aside__offers-item_primary > div.product-aside__control.product-aside__control_condensed-additional > a.button-style.button-style_base-alter.button-style_primary.product-aside__button.product-aside__button_narrow.product-aside__button_cart.button-style_expletive",
        );
        await addConsoleToCart.click();
        await page.locator("#userbar > div:nth-child(2) > div > a").click({ force: true, timeout: 5000 });
        const expectedConsoleToCart = page.locator(
            "#container > div.cart-content > div > div > div > div > div.cart-form__body > div > div.cart-form__offers > div > div > div.cart-form__offers-item.cart-form__offers-item_secondary > div > div.cart-form__offers-part.cart-form__offers-part_data > div.cart-form__description.cart-form__description_primary.cart-form__description_base-alter.cart-form__description_font-weight_semibold.cart-form__description_condensed-other > a",
        );

        await expect(expectedConsoleToCart).toHaveText("Игровая приставка Sony PlayStation 5", { timeout: 5000 });
        logger.error("check error message");
        const removeItemFromCart1 = page.locator("[class='cart-form__control']").first();
        await removeItemFromCart1.click({ force: true, timeout: 30000 });
        const removeItemFromCart2 = page.locator(
            "[class='cart-form__link cart-form__link_other cart-form__link_small']:nth-child(2)",
        );
        logger.debug("check step");
        await removeItemFromCart2.click({ timeout: 3000 });
        const expectedResultEmptyCart = page.locator('[class="cart-message__title cart-message__title_big"]');
        await expect(expectedResultEmptyCart).toHaveText("Ваша корзина пуста");
    });
});
