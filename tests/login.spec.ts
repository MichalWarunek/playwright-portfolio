import { expect, test } from "../fixtures";
import userData from "../test-data/user-data.json";

const validLogin = {
  username: process.env.USER_EMAIL!,
  password: process.env.USER_PASSWORD!,
  title: "Products",
};

test.describe("Login test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to Products page on valid credentials", async ({loginPage, allure}) => {
    await allure.story("Successful login with valid credentials");
    await loginPage.fill(validLogin);
    await loginPage.clickLogin();
    await loginPage.validate(validLogin);
  });

  test("should display error message on invalid credentials", async ({loginPage, allure}) => {
    await allure.story("Showing error message for login with invalid credentials");
    await loginPage.fill(userData.invalidLogin);
    await loginPage.clickLogin();
    await loginPage.validate(userData.invalidLogin);
  });

  test("should display error message on missing username", async ({loginPage, allure}) => {
    await allure.story("Showing error message for login with missing username");
    await loginPage.fill(userData.missingUsernameLogin);
    await loginPage.clickLogin();
    await loginPage.validate(userData.missingUsernameLogin);
  });

  test("should display error message on missing password", async ({loginPage, allure}) => {
    await allure.story("Showing error message for login with missing password");
    await loginPage.fill(userData.missingPasswordLogin);
    await loginPage.clickLogin();
    await loginPage.validate(userData.missingPasswordLogin);
  });
});
