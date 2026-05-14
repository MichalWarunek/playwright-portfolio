import { expect, Page, Locator } from "@playwright/test";

export class CheckoutPage {
    private readonly page: Page;
    readonly firstName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByTestId('firstName');
    }

    async fillFirstName(name: string): Promise<void> {
        await this.firstName.fill(name);
    }


}