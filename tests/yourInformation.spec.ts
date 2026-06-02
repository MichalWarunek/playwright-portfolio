import { test } from "../fixtures";
import userData from "../test-data/user-data.json";

const validLogin = {
  username: process.env.USER_EMAIL!,
  password: process.env.USER_PASSWORD!,
};

const itemLocator = 'sauce-labs-backpack';


test.describe("Your Information Step", () => {
  test.beforeEach(async ({ page, loginPage, productsPage, cartPage }) => {
    await page.goto("/");
    await loginPage.login(validLogin);
    await productsPage.addToCart(itemLocator);
    await productsPage.goToCart();
    await cartPage.clickCheckout();
  });

  test("should process your information step correctly", async ({checkoutPage}) => {
    await checkoutPage.fillPaymentInfo(userData.paymentInfo.valid);
    await checkoutPage.clickContinue();
    await checkoutPage.validateOverviewTitle();
  });
  
  test("should show first name error message", async ({checkoutPage}) => {
    await checkoutPage.fillPaymentInfo(userData.paymentInfo.noFirst);
    await checkoutPage.clickContinue();
    await checkoutPage.validateErrorMessage(userData.paymentInfo.noFirst.errorMessage);
  });

  test("should show last name error message", async ({checkoutPage}) => {
    await checkoutPage.fillPaymentInfo(userData.paymentInfo.noLast)
    await checkoutPage.clickContinue();
    await checkoutPage.validateErrorMessage(userData.paymentInfo.noLast.errorMessage);
  });

  test("should show postal code error message", async ({checkoutPage}) => {
    await checkoutPage.fillPaymentInfo(userData.paymentInfo.noZip);
    await checkoutPage.clickContinue();
    await checkoutPage.validateErrorMessage(userData.paymentInfo.noZip.errorMessage);
  });

});
