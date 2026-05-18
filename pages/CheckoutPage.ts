import { expect, Page, Locator } from "@playwright/test";

interface PaymentDetails {
    firstName: string;
    lastName: string;
    zip: string;
  }

  const pageTitle = {
    overview:'Checkout: Overview',
  } as const;


export class CheckoutPage {
    private readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zipCode: Locator;
    readonly continueButton: Locator;
    readonly overviewTitle: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByTestId('firstName');
        this.lastName = page.getByTestId('lastName');
        this.zipCode = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.overviewTitle = page.getByTestId('secondary-header');
        this.errorMessage = page.getByTestId('error');
    }

    async fillFirstName(name: string): Promise<void> {
        await this.firstName.fill(name);
    }
    async fillLastName(surname: string): Promise<void> {
        await this.lastName.fill(surname);
    }
    async fillZipCode(zip: string): Promise <void> {
        await this.zipCode.fill(zip);
    }
     async clickContinue(): Promise <void> {
        await this.continueButton.click();
    }
    async fillPaymentInfo(paymentInfo: PaymentDetails): Promise <void> {
        await this.fillFirstName(paymentInfo.firstName);
        await this.fillLastName(paymentInfo.lastName);
        await this.fillZipCode(paymentInfo.zip);
    }
    async validateOverviewTitle(): Promise <void> {
        await expect(this.overviewTitle).toHaveText(pageTitle.overview);
    }
    async validateErrorMessage(errorMessage: string): Promise <void> {
        await expect(this.errorMessage).toHaveText(errorMessage);
    }

}