import { expect, Page, Locator } from "@playwright/test";


const CART_BUTTON_TEXT = {
  add: 'Add to cart',
  remove: 'Remove',
} as const;

const TITLE = 'Products';


export class ProductsPage {
  
  private readonly page: Page;
  readonly cart: Locator;
  readonly cartBadge: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cart = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.pageTitle = page.getByTestId("title");
  }

  async addToCart(productName: string): Promise<void> {
    await this.page.getByTestId(`add-to-cart-${productName}`).click();
  }

  async removeFromCart(productName: string): Promise<void> {
    await this.page.getByTestId(`remove-${productName}`).click();
  }
  async goToCart(): Promise<void> {
    await this.cart.click();
  }
  
  async validateAddButtonText(productName: string): Promise<void> {
    await expect(this.page.getByTestId(`add-to-cart-${productName}`)).toHaveText(CART_BUTTON_TEXT.add);
    
}
  async validateLoadingImages(productImage: string): Promise<void> {
    const image = this.page.getByTestId(productImage);
    await expect(image).toBeVisible();
    const isLoaded = await image.evaluate((img) => (img as HTMLImageElement).naturalWidth > 0);
    expect(isLoaded).toBe(false);
}
async validateRemoveButtonText(productName: string): Promise<void> {
  await expect(this.page.getByTestId(`remove-${productName}`)).toHaveText(CART_BUTTON_TEXT.remove);
  
}
async validateAddToCart(numberOfProducts: string): Promise<void> {
  await expect(this.cartBadge).toBeVisible();
  await expect(this.cartBadge).toHaveText(numberOfProducts);
}
async validateRemoveFromCart(): Promise<void> {
  await expect(this.cartBadge).toBeHidden();
}
async validatePageTitle(): Promise<void> {
  await expect(this.pageTitle).toHaveText(TITLE);
}
async mockImageFailure(): Promise<void> {
  await this.page.route('**/*.{png,jpg,jpeg}', async (route) => {
    await route.fulfill({
      status: 404,
      body: 'Not Found',
    });
  });
}
}