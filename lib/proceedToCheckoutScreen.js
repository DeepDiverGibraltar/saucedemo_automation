let Page = require('./homeScreen');
const locator = require('../utils/locator');
//const fake = require('../utils/fakeData');

//const fakeNameKeyword = fake.nameKeyword;
const checkoutButtonClass = locator.checkoutButtonSelectorClass;
const firstNameId = locator.firstNameSelectorId;
const lastNameId = locator.lastNameSelectorId;
const zipPostalCodeId = locator.zipPostalCodeSelectorId;
const shoppingCartId = locator.shopingCartSelectorId;
const continueButtonClass = locator.continueButtonSelectorClass;
const finishButtonClass = locator.finishButtonSelectorClass;

let firstName, lastName, zipPostalCode, continueBuyButton, shoppingCart, checkoutButton, resultStat;


Page.prototype.reachProceedCheckoutScreen = async function() {
    await this.addToShoppingCart();
    shoppingCart = await this.findById(shoppingCartId);
    await shoppingCart.click();

    checkoutButton = await this.findByClass(checkoutButtonClass);
    await checkoutButton.click();

    resultStat = await this.findByClass(continueButtonClass);

    return await this.driver.wait(async function () {
       return await resultStat.getAttribute('value');
    }, 5000);
};


Page.prototype.checkoutYourInfomation = async function () {
    await this.reachProceedCheckoutScreen();
    
    firstName = await this.findById(firstNameId);
    lastName = await this.findById(lastNameId);
    zipPostalCode = await this.findById(zipPostalCodeId);
    continueBuyButton = await this.findByClass(continueButtonClass);


    const result = await this.driver.wait(async function () {
        const firstNameEnabled = await firstName.isEnabled();
        const lastNameEnabled = await lastName.isEnabled();
        const zipPostalCodeEnabled = await zipPostalCode.isEnabled();
        const continueBuyButtonText = await continueBuyButton.getAttribute('value');

        return {
            inputFirstNameEnabled: firstNameEnabled,
            inputLastNameEnabled: lastNameEnabled,
            zipPostEnabled: zipPostalCodeEnabled,
            continueBtnText: continueBuyButtonText
        }
    }, 5000);
    return result;
};

Page.prototype.addNamesZipPostClickContinueBtn = async function() {
    await this.checkoutYourInfomation();
    await this.write(firstName, 'Marcus');
    await this.write(lastName, 'Cruz');
    await this.write(zipPostalCode, '11300');
    await continueBuyButton.click();
    resultStat = await this.findByClass(finishButtonClass);

    return await this.driver.wait(async function () {
        return await resultStat.getText();
    }, 5000);
};


module.exports = Page;