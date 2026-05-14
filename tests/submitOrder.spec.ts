import { test } from "../fixtures";


const validLogin = {
  username: process.env.USER_EMAIL!,
  password: process.env.USER_PASSWORD!,
};

const paymentInfo = {
  firstName: 'Michal',
};

test.describe("Submit Order", () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto("/");
    await loginPage.login(validLogin);
  });

  test("should submit order correctly", async ({productsPage, cartPage, checkoutPage}) => {
    await productsPage.addToCart(productsPage.productLocator);
    await productsPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillFirstName(paymentInfo.firstName);
  });
});
