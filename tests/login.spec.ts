import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test.describe('Login test', () => {

 const validLogin = {
        username: process.env.USER_EMAIL!,
        password: process.env.USER_PASSWORD!,
        title: 'Products'
    }

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
      });

test('login to page using valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.fill(validLogin);
  await loginPage.clickLogin();
  await loginPage.validate(validLogin);
});
});