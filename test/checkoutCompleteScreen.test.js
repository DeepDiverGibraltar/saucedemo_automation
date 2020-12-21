const { describe, it, after, before } = require('mocha');
const Page = require('../lib/checkoutCompleteScreen');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function products() {
    try {
        describe ('the user can finalize purchase', async function () {
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


            it ('the user gets confirmation message after completing a purchase ', async () => {
                const result = await page.checkoutFinishedMessage();
                expect(result).to.include('THANK YOU FOR YOUR ORDER');
            });

            
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();