import { expect, Page, Locator } from "@playwright/test";

export interface CartPageInfo {
    title?: string;
}

export const cartData = {
    title: 'Your Cart'
} as const;

export class CartPage {
  
  private readonly page: Page;
  readonly titleLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleLabel = page.getByTestId('title');
  }
  async validate(data: CartPageInfo = cartData): Promise<void> {
     await expect(this.titleLabel).toHaveText(cartData.title);

}
}