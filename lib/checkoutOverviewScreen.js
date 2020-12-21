let Page = require('./proceedToCheckoutScreen');
const locator = require('../utils/locator');

const cartQuantityClass = locator.cartQuantitySelectorClass;
const itemDescriptionClass = locator.itemDescriptionSelectorClass;
const itemTotalClass = locator.itemTotalSelectorClass;
const taxClass = locator.taxSelectorClass;
const totalPriceClass = locator.totalPriceSelectorClass;
const finishButtonClass = locator.finishButtonSelectorClass;
const purchaseConfirmationClass = locator.purchaseConfirmationSelectorClass;

let cartQuantity, itemDescription, itemTotal, tax, totalPrice, finButton, resultStat;

Page.prototype.checkoutOverviewScreenElements = async function () {

    await this.addNamesZipPostClickContinueBtn();

    cartQuantity = await this.findByClass(cartQuantityClass);
    itemDescription = await this.findByClass(itemDescriptionClass);
    itemTotal = await this.findByClass(itemTotalClass);
    tax = await this.findByClass(taxClass);
    totalPrice = await this.findByClass(totalPriceClass);
    finButton = await this.findByClass(finishButtonClass);

    const result = await this.driver.wait(async function () {
        const cartQuantityEnabled = await cartQuantity.isEnabled();
        const itemDescriptionEnabled = await itemDescription.isEnabled();
        const itemTotalEnabled = await itemTotal.isEnabled();
        const taxEnabled = await tax.isEnabled();
        const totalPriceEnabled = await totalPrice.isEnabled();
        const finishBtnText = await finButton.getText();

        return {
            cartQuantityEnabledFlag: cartQuantityEnabled,
            itemDescriptionEnabledFlag: itemDescriptionEnabled,
            itemTotalEnabledFlag: itemTotalEnabled,
            taxEnabledFlag: taxEnabled,
            totalPriceEnabledFlag: totalPriceEnabled,
            finishButtonLabel: finishBtnText
        }
    }, 5000);
    return result;
};

Page.prototype.completeCheckout = async function() {
    
    await this.checkoutOverviewScreenElements();
    finButton = await this.findByClass(finishButtonClass);
    await finButton.click();
    
    resultStat = await this.findByClass(purchaseConfirmationClass);
    return await this.driver.wait(async function () {
        return await resultStat.getText();
    }, 5000);
};

module.exports = Page;