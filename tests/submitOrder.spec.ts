import { test } from "../fixtures";


const validLogin = {
    username: process.env.USER_EMAIL!,
    password: process.env.USER_PASSWORD!
}

const paymentInfo = {
    firstName: 'Michal',
    lastName: 'Warunek',
    zip: '11222'
}

const receipt = {
    itemName: 'Sauce Labs Backpack',
    paymentInformation: 'SauceCard #31337',
    shippingInformation: 'Free Pony Express Delivery!',
    totalPrice: 'Total: $32.39'
}
const message = 'Thank you for your order!';
const title = 'Products';

test.describe("Submit order", () => {
    test.beforeEach(async ({page, loginPage }) => {
        await page.goto("/");
        await loginPage.login(validLogin);
    })
    test("should submit order correctly", async ({productsPage, cartPage, checkoutPage}) => {
        await productsPage.addToCart(productsPage.productLocator);
        await productsPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.fillPaymentInfo(paymentInfo);
        await checkoutPage.clickContinue();
        await checkoutPage.validateOverviewTitle();
        await checkoutPage.validateCheckoutOverview(receipt);
        await checkoutPage.clickFinish();
        await checkoutPage.validateThankYouPage(message);
        await checkoutPage.clickBackHome();
        await productsPage.validatePageTitle(productsPage.pageTitle);
    });
})