  import { expect, Page, Locator } from "@playwright/test";


  export class CartPage {
    
    private readonly page: Page;
    readonly titleLabel: Locator;
    readonly itemsCounter: Locator;
    readonly inventoryName: Locator;
    readonly inventoryPrice: Locator;
    readonly continueButton: Locator;
    readonly checkoutButton: Locator;
    readonly cartInventory: Locator;
    private readonly EXPECTED_TITLE = 'Your Cart';

    constructor(page: Page) {
      this.page = page;
      this.titleLabel = page.getByTestId('title');
      this.itemsCounter = page.getByTestId('item-quantity');
      this.inventoryName = page.getByTestId('inventory-item-name');
      this.inventoryPrice = page.getByTestId('inventory-item-price');
      this.continueButton = page.getByTestId('continue-shopping');
      this.checkoutButton = page.getByTestId('checkout');
      this.cartInventory = page.getByTestId('cart-list');
    }

  async clickContinueShopping(): Promise<void> {
  await this.continueButton.click();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async validate(): Promise<void> {
    await expect(this.titleLabel).toHaveText(this.EXPECTED_TITLE);
  }

  async validateItems (itemsQuantity: string): Promise<void> {
    await expect(this.itemsCounter).toHaveText(itemsQuantity);
  }

  async validateInventoryName (itemNames: string): Promise<void> {
    await expect(this.inventoryName).toHaveText(itemNames);
  }

  async validatePrice (price: string): Promise<void> {
    await expect(this.inventoryPrice).toHaveText(price);
  }

  async validateCartInventory(screenshotName: string): Promise <void> {
    await expect(this.cartInventory).toHaveScreenshot(screenshotName);
  }
  }
