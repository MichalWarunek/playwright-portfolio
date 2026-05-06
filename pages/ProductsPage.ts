import { expect, Page, Locator } from "@playwright/test";


export const CART_BUTTON_TEXT = {
  add: 'Add to cart',
  remove: 'Remove',
} as const;


export class ProductsPage {
  
  private readonly page: Page;
  readonly productLocator: Locator;
  readonly removeLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productLocator = page.getByTestId("add-to-cart-sauce-labs-backpack");
    this.removeLocator = page.getByTestId("remove-sauce-labs-backpack");
  }


  async addToCart(): Promise<void> {
    await this.productLocator.click();
    
  }
  async removeFromCart(): Promise<void> {
    await this.removeLocator.click();
  }
  async validateAddButtonText(): Promise<void> {
    await expect(this.productLocator).toHaveText(CART_BUTTON_TEXT.add);
}
async validateRemoveButtonText(): Promise<void> {
  await expect(this.removeLocator).toHaveText(CART_BUTTON_TEXT.remove);
}
}