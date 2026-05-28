import { test } from "../fixtures";


const validLogin = {
  username: process.env.USER_EMAIL!,
  password: process.env.USER_PASSWORD!,
};

const paymentInfo = {
  valid:   { firstName: 'Michal', lastName: 'Warunek', zip: '11222' },
  noFirst: { firstName: '',       lastName: 'Warunek', zip: '11222' },
  noLast:  { firstName: 'Michal', lastName: '',        zip: '11222' },
  noZip:   { firstName: 'Michal', lastName: 'Warunek', zip: ''      },
};

const itemLocator = 'sauce-labs-backpack';

const errorMessage = {
  firstName: 'Error: First Name is required',
  lastName: 'Error: Last Name is required',
  zip: 'Error: Postal Code is required'
}

test.describe("Your Information Step", () => {
  test.beforeEach(async ({ page, loginPage, productsPage, cartPage }) => {
    await page.goto("/");
    await loginPage.login(validLogin);
    await productsPage.addToCart(itemLocator);
    await productsPage.goToCart();
    await cartPage.clickCheckout();
  });

  test("should process your information step correctly", async ({checkoutPage}) => {
    await checkoutPage.fillPaymentInfo(paymentInfo.valid);
    await checkoutPage.clickContinue();
    await checkoutPage.validateOverviewTitle();
  });
  
  test("should show first name error message", async ({checkoutPage}) => {
    await checkoutPage.fillPaymentInfo(paymentInfo.noFirst);
    await checkoutPage.clickContinue();
    await checkoutPage.validateErrorMessage(errorMessage.firstName);
  });

  test("should show last name error message", async ({checkoutPage}) => {
    await checkoutPage.fillPaymentInfo(paymentInfo.noLast)
    await checkoutPage.clickContinue();
    await checkoutPage.validateErrorMessage(errorMessage.lastName);
  });

  test("should show postal code error message", async ({checkoutPage}) => {
    await checkoutPage.fillPaymentInfo(paymentInfo.noZip);
    await checkoutPage.clickContinue();
    await checkoutPage.validateErrorMessage(errorMessage.zip);
  });

});
