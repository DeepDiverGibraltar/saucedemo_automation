const { describe, it, after, before } = require('mocha');
const Page = require('../lib/checkoutOverviewScreen');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function products() {
    try {
        describe ('the user can successfully complete purchase', async function () {
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


            it ('the user can reach checkout overview screen', async () => {
                const result = await page.checkoutOverviewScreenElements();
                expect(result.cartQuantityEnabledFlag).to.equal(true);
                expect(result.itemDescriptionEnabledFlag).to.equal(true);
                expect(result.itemTotalEnabledFlag).to.equal(true);
                expect(result.taxEnabledFlag).to.equal(true);
                expect(result.totalPriceEnabledFlag).to.equal(true);
                expect(result.finishButtonLabel).to.include('FINISH');
            });

            it ('the user can complete checkout', async () => {
                const result = await page.completeCheckout();
                expect(result).to.include('THANK YOU FOR YOUR ORDER');
            });

            
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();