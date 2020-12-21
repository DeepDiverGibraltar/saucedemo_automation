let Page = require('./checkoutOverviewScreen');
const locator = require('../utils/locator');

const purchaseConfirmationClass = locator.purchaseConfirmationSelectorClass;

let purchaseConfirmationMessage, resultStat;

Page.prototype.checkoutFinishedMessage = async function() {
    await this.completeCheckout();
    purchaseConfirmationMessage = await this.findByClass(purchaseConfirmationClass);
 
    return await this.driver.wait(async function() {
        return await purchaseConfirmationMessage.getText();
    }, 5000);
};

module.exports = Page;