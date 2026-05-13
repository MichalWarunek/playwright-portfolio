import { expect, Page, Locator } from "@playwright/test";


export class CartPage {
  
  private readonly page: Page;
  readonly titleLabel: Locator;
  readonly itemsCounter: Locator;
  readonly inventoryName: Locator;
  readonly inventoryPrice: Locator;
  private readonly EXPECTED_TITLE = 'Your Cart';

  constructor(page: Page) {
    this.page = page;
    this.titleLabel = page.getByTestId('title');
    this.itemsCounter = page.getByTestId('item-quantity');
    this.inventoryName = page.getByTestId('inventory-item-name');
    this.inventoryPrice = page.getByTestId('inventory-item-price');
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
}