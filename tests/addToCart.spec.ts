import { test } from "../fixtures";
import productData from "../test-data/product-data.json";

  const validLogin = {
    username: process.env.USER_EMAIL!,
    password: process.env.USER_PASSWORD!,
  };


  test.describe("Add to cart test", () => {
    test.beforeEach(async ({ page, loginPage }) => {
      await page.goto("/");
      await loginPage.login(validLogin);
    });

    test("should add product to cart", async ({productsPage, cartPage, allure}) => {
      await allure.story("Successful adding product to cart");
      await productsPage.addToCart(productData.product.backpack.id);
      await productsPage.validateRemoveButtonText(productData.product.backpack.id);
      await productsPage.validateAddToCart('1');
      await productsPage.goToCart();
      await cartPage.validate();
      await cartPage.validateCartInventory(productData.screenshots.cartOneProduct);
      await cartPage.validateItems('1');
      await cartPage.validateInventoryName(productData.product.backpack.name);
      await cartPage.validatePrice(productData.product.backpack.price);
    });
    
    test("should remove product from cart", async ({productsPage, cartPage, allure}) => {
      await allure.story("Successful removing product from cart");
      await productsPage.addToCart(productData.product.backpack.id);
      await productsPage.validateRemoveButtonText(productData.product.backpack.id);
      await productsPage.validateAddToCart('1');
      await productsPage.goToCart();
      await cartPage.validate();
      await cartPage.validateCartInventory(productData.screenshots.cartOneProduct);
      await cartPage.validateItems('1');
      await cartPage.validateInventoryName(productData.product.backpack.name);
      await cartPage.validatePrice(productData.product.backpack.price);
      await cartPage.clickContinueShopping();
      await productsPage.removeFromCart(productData.product.backpack.id);
      await productsPage.validateAddButtonText(productData.product.backpack.id);
      await productsPage.validateRemoveFromCart();
      await productsPage.goToCart();
      await cartPage.validateCartInventory(productData.screenshots.cartEmpty);
      
    });

    test("should add two products to cart and remove one", async ({productsPage, cartPage, allure}) => {
      await allure.story("Successful adding and removing product from cart");
      await productsPage.addToCart(productData.product.backpack.id);
      await productsPage.validateRemoveButtonText(productData.product.backpack.id);
      await productsPage.validateAddToCart('1');
      await productsPage.addToCart(productData.product.bikeLight.id);
      await productsPage.validateRemoveButtonText(productData.product.bikeLight.id);
      await productsPage.validateAddToCart('2');
      await productsPage.goToCart();
      await cartPage.validateCartInventory(productData.screenshots.cartTwoProducts);
      await cartPage.clickContinueShopping();
      await productsPage.removeFromCart(productData.product.backpack.id);
      await productsPage.validateAddButtonText(productData.product.backpack.id);
      await productsPage.validateAddToCart('1');
    });
  });
