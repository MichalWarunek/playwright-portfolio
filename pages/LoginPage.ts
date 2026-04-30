import { expect, Page, Locator } from "@playwright/test";

export interface LoginInfo {
  username?: string;
  password?: string;
  title?: string;
  errorMessage?: string;
}

export class LoginPage {
  private readonly page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly titleLabel: Locator;
  readonly errorMessageText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.titleLabel = page.getByTestId("title");
    this.errorMessageText = page.getByTestId("error");
  }

  async setUsername(userName: string): Promise<void> {
    await this.usernameInput.fill(userName);
  }
  async setPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async fill(data: LoginInfo): Promise<void> {
    if (data.username) await this.setUsername(data.username);
    if (data.password) await this.setPassword(data.password);
  }

  async validate(data: LoginInfo): Promise<void> {
    if (data.title) await expect(this.titleLabel).toHaveText(data.title);
    if (data.errorMessage)
      await expect(this.errorMessageText).toHaveText(data.errorMessage);
  }
}
