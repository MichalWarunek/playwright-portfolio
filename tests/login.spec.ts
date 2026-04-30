import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

const validLogin = {
  username: process.env.USER_EMAIL!,
  password: process.env.USER_PASSWORD!,
  title: "Products",
};

const invalidLogin = {
  username: "blah",
  password: "blah",
  errorMessage:
    "Epic sadface: Username and password do not match any user in this service",
};

const missingUsernameLogin = {
  password: "blah",
  errorMessage: "Epic sadface: Username is required",
};

const missingPasswordLogin = {
  username: "blah",
  errorMessage: "Epic sadface: Password is required",
};

test.describe("Login test", () => {
  let loginPage!: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
  });

  test("should navigate to Products page on valid credentials", async () => {
    await loginPage.fill(validLogin);
    await loginPage.clickLogin();
    await loginPage.validate(validLogin);
  });

  test("should display error message on invalid credentials", async () => {
    await loginPage.fill(invalidLogin);
    await loginPage.clickLogin();
    await loginPage.validate(invalidLogin);
  });

  test("should display error message on missing username", async () => {
    await loginPage.fill(missingUsernameLogin);
    await loginPage.clickLogin();
    await loginPage.validate(missingUsernameLogin);
  });

  test("should display error message on missing password", async () => {
    await loginPage.fill(missingPasswordLogin);
    await loginPage.clickLogin();
    await loginPage.validate(missingPasswordLogin);
  });
});
