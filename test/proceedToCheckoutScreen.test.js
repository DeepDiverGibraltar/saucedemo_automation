const { describe, it, after, before } = require('mocha');
const Page = require('../lib/proceedToCheckoutScreen');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function products() {
    try {
        describe ('the user can successfully proceed to check out', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit('https://www.saucedemo.com/');
            })


            afterEach (async () => {
                await page.quit();
            });


            it ('the user can reach proceed to checkout screen', async () => {
                const result = await page.reachProceedCheckoutScreen();
                expect(result).to.include('CONTINUE');
            });

            it ('the user sees all elements on proceed to checkout screen', async () => {
                const result = await page.checkoutYourInfomation();
                expect(result.inputFirstNameEnabled).to.equal(true);
                expect(result.inputLastNameEnabled).to.equal(true);
                expect(result.zipPostEnabled).to.equal(true);
                expect(result.continueBtnText).to.include('CONTINUE');
            });

            it ('the user can proceed to checkout after introducing his names and postal code', async () => {
                const result = await page.addNamesZipPostClickContinueBtn();
                expect(result).to.include('FINISH');
            });
            
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();