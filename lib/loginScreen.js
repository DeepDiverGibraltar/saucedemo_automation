let Page = require('./basePage');
const locator = require('../utils/locator');

const usernameInputId = locator.usernameInputSelectorId;
const passwordInputId = locator.passwordInputSelectorId;
const loginButtonId = locator.loginButtonSelectorId;
const shoppingCartId = locator.shopingCartSelectorId;
const logoutSidebarId = locator.logoutSidebarSelectorId;
const burgerMenuClass = locator.burgerMenuSelectorClass;
const logoutSidebarMenuClass = locator.logoutSidebarMenuSelectorClass;

let usernameInput, passwordInput, loginButton, resultStat, logoutSidebarMenu, logoutSidebar, burgerMenu;

Page.prototype.findUsernamePasswordAndButton = async function () {
    usernameInput = await this.findById(usernameInputId);
    passwordInput = await this.findById(passwordInputId);
    loginButton = await this.findById(loginButtonId);

   const result = await this.driver.wait(async function () {
        const usernameInputEnableFlag = await usernameInput.isEnabled();
        const passwordInputEnableFlag = await passwordInput.isEnabled();
        const loginButtonText = await loginButton.getAttribute('value');

        return {
            inputUsernameEnabled: usernameInputEnableFlag,
            inputPasswordEnabled: passwordInputEnableFlag,
            buttonText: loginButtonText
        }
    }, 5000);
    return result;
};

Page.prototype.submitCredentialsAndGetResult = async function() {
    await this.findUsernamePasswordAndButton();
    await this.write(usernameInput, 'standard_user');
    await this.write(passwordInput, 'secret_sauce');
    await loginButton.click();
    resultStat = await this.findById(shoppingCartId);

    return await this.driver.wait(async function () {
        return await resultStat.isEnabled();
    }, 5000);
};

Page.prototype.logoutApp = async function() {
    await this.submitCredentialsAndGetResult();

    burgerMenu = await this.findByClass(burgerMenuClass);
    await burgerMenu.click();

    logoutSidebarMenu = await this.findByClass(logoutSidebarMenuClass);
    logoutSidebarMenu.click();

    logoutSidebar = await this.findById(logoutSidebarId);
    logoutSidebar.click();

    resultStat = await this.findById(loginButtonId);
    return await this.driver.wait(async function () {
        return await resultStat.isEnabled();   
    }, 6000);
    
};


module.exports = Page;