import { test } from "../fixtures";

const validLogin = {
  username: process.env.USER_EMAIL!,
  password: process.env.USER_PASSWORD!,
};

const product = {
  names: ['Sauce Labs Backpack', 'Sauce Labs Bike Light'],
  price: '$29.99',
  quantity: '1'
};

test.describe("Add to cart test", () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto("/");
    await loginPage.login(validLogin);
  });

  test("should add product to cart", async ({productsPage, cartPage}) => {
    await productsPage.addToCart(productsPage.productLocator);
    await productsPage.validateRemoveButtonText(productsPage.removeLocator);
    await productsPage.validateAddToCart(product.quantity);
    await productsPage.goToCart();
    await cartPage.validate();
    await cartPage.validateItems(product.quantity);
    await cartPage.validateInventoryName(product.names[0]);
    await cartPage.validatePrice(product.price);
  });
  
  test("should remove product from cart", async ({productsPage, cartPage}) => {
    await productsPage.addToCart(productsPage.productLocator);
    await productsPage.validateRemoveButtonText(productsPage.removeLocator);
    await productsPage.validateAddToCart('1');
    await productsPage.goToCart();
    await cartPage.validate();
    await cartPage.validateItems(product.quantity);
    await cartPage.validateInventoryName(product.names[0]);
    await cartPage.validatePrice(product.price);
    await cartPage.clickContinueShopping();
    await productsPage.removeFromCart(productsPage.removeLocator);
    await productsPage.validateAddButtonText(productsPage.productLocator);
    await productsPage.validateRemoveFromCart();
  });

  test("should add two products to cart and remove one", async ({productsPage}) => {
    await productsPage.addToCart(productsPage.productLocator);
    await productsPage.validateRemoveButtonText(productsPage.removeLocator);
    await productsPage.validateAddToCart('1');
    await productsPage.addToCart(productsPage.secondProductLocator);
    await productsPage.validateRemoveButtonText(productsPage.removeSecondProductLocator);
    await productsPage.validateAddToCart('2');
    await productsPage.removeFromCart(productsPage.removeLocator);
    await productsPage.validateAddButtonText(productsPage.productLocator);
    await productsPage.validateAddToCart('1');
  });
});
