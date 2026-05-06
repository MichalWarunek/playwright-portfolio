import { test } from "../fixtures";

const validLogin = {
  username: process.env.USER_EMAIL!,
  password: process.env.USER_PASSWORD!,
  title: "Products",
};


test.describe("Add to cart test", () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto("/");
    await loginPage.login(validLogin);
  });

  test("should add product to cart", async ({productsPage}) => {
    await productsPage.addToCart();
    await productsPage.validateRemoveButtonText();
  });
  
  test("should remove product from cart", async ({productsPage}) => {
    await productsPage.addToCart();
    await productsPage.validateRemoveButtonText();
    await productsPage.removeFromCart();
    await productsPage.validateAddButtonText();
  });
});
