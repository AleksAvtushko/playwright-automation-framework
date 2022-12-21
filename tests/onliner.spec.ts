import { test, expect } from "@playwright/test";
import { logger } from "../configLogger";
import { locatorsAndElementsPage } from "./locatorsAndElementsPage";

test.describe("check difference elements", () => {
    test("Check title name in catalog page", async ({ page }) => {
        await page.goto("https://catalog.onliner.by/");
        const title = page.locator(
            "#container > div > div > div > div > div.catalog-navigation.catalog-navigation_opened > div.catalog-navigation__title",
        );
        await expect(title).toHaveText("КаталогВсе суперцены!");
    });

    test("Check: checkbox 'Prime' is checked on mobile page", async ({ page }) => {
        await page.goto("https://catalog.onliner.by/mobile");
        const checkbox = page.locator("[class=i-checkbox]").first();
        await checkbox.click();
        await expect(checkbox).toBeChecked();
    });

    test("Check: filter Minimum price", async ({ page }) => {
        await page.goto("https://catalog.onliner.by/console");
        const FiletMaxPriceValue500 = page.locator(
            "#schema-filter > div:nth-child(7) > div:nth-child(3) > div.schema-filter__facet > div > div:nth-child(2) > input",
        );
        await FiletMaxPriceValue500.fill("500");
        await page.locator('a[class="schema-order__link"]').click();
        await page.locator("#schema-order > div.schema-order__popover > div > div:nth-child(3)").click();

        const expectedConsole = page.locator("[class=js-product-title-link]").first();

        await expect(expectedConsole).toHaveText("Игровая приставка Nintendo Game & Watch Super Mario Bros.");
    });
});

test.describe("test for cart", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://catalog.onliner.by/console/sony/playstation5");
    });

    test("Check: add items to cart", async ({ page }) => {
        logger.info("INFO");
        const locAndElem = new locatorsAndElementsPage(page);
        await locAndElem.addConsoleToCart;
        await locAndElem.clickElementAddConsoleToCart();
        await page.locator("#userbar > div:nth-child(2) > div > a").click({ force: true, timeout: 3000 });
        const expectedConsoleToCart = page.locator(
            '[class="cart-form__link cart-form__link_primary cart-form__link_base-alter"]:nth-child(1)',
        );

        await expect(expectedConsoleToCart).toHaveText("Игровая приставка Sony PlayStation 5", { timeout: 2000 });
    });

    test("Check: delete items from cart", async ({ page }) => {
        const locAndElem = new locatorsAndElementsPage(page);
        await locAndElem.addConsoleToCart;
        await locAndElem.clickElementAddConsoleToCart();
        await page.locator("#userbar > div:nth-child(2) > div > a").click({ force: true });
        logger.error("check error message");
        await locAndElem.basketEl;
        await page.hover("[class='cart-form__control']");
        await locAndElem.clickToBasketEl();
        await locAndElem.cartCloseBtn;
        logger.debug("check step");
        await locAndElem.clickToCartCloseBtn();
        const expectedResultEmptyCart = page.locator('[class="cart-message__title cart-message__title_big"]');
        await expect(expectedResultEmptyCart).toHaveText("Ваша корзина пуста");
    });
});
