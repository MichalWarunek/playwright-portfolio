import { expect, Page, Locator } from "@playwright/test";


const CART_BUTTON_TEXT = {
  add: 'Add to cart',
  remove: 'Remove',
} as const;



export class ProductsPage {
  
  private readonly page: Page;
  readonly productLocator: Locator;
  readonly removeLocator: Locator;
  readonly secondProductLocator: Locator;
  readonly removeSecondProductLocator: Locator;
  readonly cart: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productLocator = page.getByTestId("add-to-cart-sauce-labs-backpack");
    this.removeLocator = page.getByTestId("remove-sauce-labs-backpack");
    this.secondProductLocator = page.getByTestId("add-to-cart-sauce-labs-bike-light");
    this.removeSecondProductLocator = page.getByTestId("remove-sauce-labs-bike-light");
    this.cart = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
  }


  async addToCart(product: Locator): Promise<void> {
    await product.click();
    
  }
  async removeFromCart(product: Locator): Promise<void> {
    await product.click();
  }
  async goToCart(): Promise<void> {
    await this.cart.click();
  }
  
  async validateAddButtonText(product: Locator): Promise<void> {
    await expect(product).toHaveText(CART_BUTTON_TEXT.add);
    
}
async validateRemoveButtonText(product: Locator): Promise<void> {
  await expect(product).toHaveText(CART_BUTTON_TEXT.remove);
  
}
async validateAddToCart(numberOfProducts: string): Promise<void> {
  await expect(this.cartBadge).toBeVisible();
  await expect(this.cartBadge).toHaveText(numberOfProducts);
}
async validateRemoveFromCart(): Promise<void> {
  await expect(this.cartBadge).toBeHidden();
}
}