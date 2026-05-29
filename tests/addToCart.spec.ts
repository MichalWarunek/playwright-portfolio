import { test } from "../fixtures";

const validLogin = {
  username: process.env.USER_EMAIL!,
  password: process.env.USER_PASSWORD!,
};

const product = {
  backpack: {id: 'sauce-labs-backpack', name: 'Sauce Labs Backpack', price: '$29.99' },
  bikeLight: { id: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light', price: '$9.99' }
};

test.describe("Add to cart test", () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto("/");
    await loginPage.login(validLogin);
  });

  test("should add product to cart", async ({productsPage, cartPage}) => {
    await productsPage.addToCart(product.backpack.id);
    await productsPage.validateRemoveButtonText(product.backpack.id);
    await productsPage.validateAddToCart('1');
    await productsPage.goToCart();
    await cartPage.validate();
    await cartPage.validateCartInventory();
    await cartPage.validateItems('1');
    await cartPage.validateInventoryName(product.backpack.name);
    await cartPage.validatePrice(product.backpack.price);
  });
  
  test("should remove product from cart", async ({productsPage, cartPage}) => {
    await productsPage.addToCart(product.backpack.id);
    await productsPage.validateRemoveButtonText(product.backpack.id);
    await productsPage.validateAddToCart('1');
    await productsPage.goToCart();
    await cartPage.validate();
    await cartPage.validateItems('1');
    await cartPage.validateInventoryName(product.backpack.name);
    await cartPage.validatePrice(product.backpack.price);
    await cartPage.clickContinueShopping();
    await productsPage.removeFromCart(product.backpack.id);
    await productsPage.validateAddButtonText(product.backpack.id);
    await productsPage.validateRemoveFromCart();
    await productsPage.goToCart();
    
  });

  test("should add two products to cart and remove one", async ({productsPage}) => {
    await productsPage.addToCart(product.backpack.id);
    await productsPage.validateRemoveButtonText(product.backpack.id);
    await productsPage.validateAddToCart('1');
    await productsPage.addToCart(product.bikeLight.id);
    await productsPage.validateRemoveButtonText(product.bikeLight.id);
    await productsPage.validateAddToCart('2');
    await productsPage.removeFromCart(product.backpack.id);
    await productsPage.validateAddButtonText(product.backpack.id);
    await productsPage.validateAddToCart('1');
  });
});
