import { expect, Page, Locator } from "@playwright/test";

interface PaymentDetails {
    firstName: string;
    lastName: string;
    zip: string;
  }

interface ReceiptDetails {
    itemName: string;
    paymentInformation: string;
    shippingInformation: string;
    totalPrice: string;
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
    readonly itemName: Locator;
    readonly paymentInformation: Locator;
    readonly shippingInformation: Locator;
    readonly totalPrice: Locator;
    readonly finishButton: Locator;
    readonly thankYouMessage: Locator;
    readonly backButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByTestId('firstName');
        this.lastName = page.getByTestId('lastName');
        this.zipCode = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.overviewTitle = page.getByTestId('secondary-header');
        this.errorMessage = page.getByTestId('error');
        this.itemName = page.getByTestId('inventory-item-name');
        this.paymentInformation = page.getByTestId('payment-info-value');
        this.shippingInformation = page.getByTestId('shipping-info-value');
        this.totalPrice = page.getByTestId('total-label');
        this.finishButton = page.getByTestId('finish');
        this.thankYouMessage = page.getByTestId('complete-header');
        this.backButton = page.getByTestId('back-to-products');
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
    async clickFinish(): Promise <void> {
        await this.finishButton.click();
    }
    async clickBackHome(): Promise <void> {
        await this.backButton.click();
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
    async validateItemName (itemName: string): Promise <void> {
        await expect (this.itemName).toHaveText(itemName);
    }
    async validatePaymentInformation (paymentInformation: string): Promise <void> {
        await expect (this.paymentInformation).toHaveText(paymentInformation);
    }
    async validateShippingInformation (shippingInformation: string): Promise <void> {
        await expect (this.shippingInformation).toHaveText(shippingInformation);
    }
    async validateTotalPrice (totalPrice: string): Promise <void> {
        await expect (this.totalPrice).toHaveText(totalPrice);
    }
    async validateCheckoutOverview (receipt: ReceiptDetails): Promise <void> {
            await this.validateItemName(receipt.itemName);
            await this.validatePaymentInformation(receipt.paymentInformation);
            await this.validateShippingInformation(receipt.shippingInformation);
            await this.validateTotalPrice(receipt.totalPrice);
    }
    async validateThankYouPage (message: string): Promise <void> {
        await expect (this.thankYouMessage).toHaveText(message);
    }

}