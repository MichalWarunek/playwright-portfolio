import { test } from "../fixtures";
import userData from "../test-data/user-data.json";
import productData from "../test-data/product-data.json";

const validLogin = {
    username: process.env.USER_EMAIL!,
    password: process.env.USER_PASSWORD!
}

const itemLocator = 'sauce-labs-backpack';


test.describe("Submit order", () => {
    test.beforeEach(async ({page, loginPage }) => {
        await page.goto("/");
        await loginPage.login(validLogin);
    })
    test("should submit order correctly", async ({productsPage, cartPage, checkoutPage}) => {
        await productsPage.addToCart(itemLocator);
        await productsPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.fillPaymentInfo(userData.paymentInfo.valid);
        await checkoutPage.clickContinue();
        await checkoutPage.validateOverviewTitle();
        await checkoutPage.validateCheckoutOverview(productData.receipt);
        await checkoutPage.clickFinish();
        await checkoutPage.validateThankYouPage(productData.message);
        await checkoutPage.clickBackHome();
        await productsPage.validatePageTitle();
    });
})