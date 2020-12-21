const {Builder, By, until} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
o.addArguments('start-fullscreen');
o.addArguments('disable-infobars');
//o.addArguments('headless');
o.setUserPreferences({ credential_enable_service: false });
// We assigned an Anonymous Function in a variable
var Page = function() {
    this.driver = new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();

    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };

    this.quit = async function() {
        return await this.driver.quit();
    };

    this.findById = async function(id) {
        await this.driver.wait(until.elementLocated(By.id(id)), 30000, 'Looking for element');
        return await this.driver.findElement(By.id(id));
    };

    this.findByName = async function(name) {
        await this.driver.wait(until.elementLocated(By.name(name)), 30000, 'Looking for element');
        return await this.driver.findElement(By.name(name));
    };

     this.findByClass = async function(name) {
        await this.driver.wait(until.elementLocated(By.className(name)), 30000, 'Looking for element');
        return await this.driver.findElement(By.className(name));
    };

    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    };
};

module.exports = Page;