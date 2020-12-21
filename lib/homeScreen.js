let Page = require('./loginScreen');

const locator = require('../utils/locator');

const titleNameClass = locator.titleNameSelectorClass;
const descriptionClass = locator.descriptionSelectorClass;
const priceClass = locator.priceSelectorClass;
const buttonAddToCartClass = locator.buttonAddToCartSelectorClass;
const shoppingCartBubbleClass = locator.shoppingCartBubbleSelectorClass;
const buttonRemoveFromCartClass = locator.buttonRemoveFromCartSelectorClass;
const detailsBackButtonClass = locator.detailsBackButtonSelectorClass;

let titleName, description, price, buttonAddToCart, removeButton, shoppingCartBubble, resultStat;

Page.prototype.findProductDetailsAndButton = async function () {
    await this.submitCredentialsAndGetResult();
    titleName = await this.findByClass(titleNameClass);
    description = await this.findByClass(descriptionClass);
    price  = await this.findByClass(priceClass);
    buttonAddToCart = await this.findByClass(buttonAddToCartClass);

    const result = await this.driver.wait(async function () {
       const titleNameEnableFlag = await titleName.isEnabled();
       const descriptionEnableFlag = await description.isEnabled();
       const priceEnableFlag = await price.isEnabled();
       const buttonAddToCartText = await buttonAddToCart.getText();

        return {
            titleEnabled: titleNameEnableFlag,
            descriptionEnabled: descriptionEnableFlag,
            priceEnabled: priceEnableFlag,
            buttonAddText: buttonAddToCartText
        }
    }, 5000);
    return result;
};

Page.prototype.addToShoppingCart = async function() {
    await this.findProductDetailsAndButton();
    await buttonAddToCart.click();
    
    removeButton = await this.findByClass(buttonRemoveFromCartClass);
    shoppingCartBubble = await this.findByClass(shoppingCartBubbleClass);

    const result = await this.driver.wait(async function () {
        const bubbleEnableFlag = await shoppingCartBubble.isEnabled();
        const removeFromCartButtonText = await removeButton.getText();

         return {
            bubbleEnabled: bubbleEnableFlag,
            removeButtonText: removeFromCartButtonText
        }
    }, 5000);
    return result;
};


Page.prototype.removeFromShoppingCart = async function() {
    await this.addToShoppingCart();
    await removeButton.click();

    resultStat = await this.findByClass(buttonAddToCartClass);

    return await this.driver.wait(async function () {
        return await resultStat.getText();
    }, 5000);
};

Page.prototype.viewProductDetails = async function() {
    await this.findProductDetailsAndButton();
    await titleName.click();

    resultStat = await this.findByClass(detailsBackButtonClass);

    return await this.driver.wait(async function () {
        return await resultStat.getText();
    }, 5000);
};

module.exports = Page;