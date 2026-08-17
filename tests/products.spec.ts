import { test } from "../fixtures";
import productData from "../test-data/product-data.json";

const validLogin = {
  username: process.env.USER_EMAIL!,
  password: process.env.USER_PASSWORD!,
  title: "Products",
};

test.describe("Products test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("should handle missing product assets gracefully without breaking UI", async ({loginPage, productsPage}) => {
    await productsPage.mockImageFailure();
    await loginPage.fill(validLogin);
    await loginPage.clickLogin();
    await productsPage.validateLoadingImages(productData.product.backpack.img);
  });
});
