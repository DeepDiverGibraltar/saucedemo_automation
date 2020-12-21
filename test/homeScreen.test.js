const { describe, it, after, before } = require('mocha');
const Page = require('../lib/homeScreen');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function products() {
    try {
        describe ('the user successfully adds a new product to cart', async function () {
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


            it ('the user can reach home screen after successful login', async () => {
                const result2 = await page.findProductDetailsAndButton();
                expect(result2.titleEnabled).to.equal(true);
                expect(result2.descriptionEnabled).to.equal(true);
                expect(result2.priceEnabled).to.equal(true);
                expect(result2.buttonAddText).to.include('ADD TO CART');
            });

            it ('the user can add a product to the shopping cart', async () => {
                const result = await page.addToShoppingCart();
                expect(result.bubbleEnabled).to.equal(true);
                expect(result.removeButtonText).to.include('REMOVE');
            });

            it ('the user can remove a product from the shopping cart', async () => {
                const result1 = await page.removeFromShoppingCart();
                expect(result1).to.include('ADD TO CART');
            });

            it ('the user can view product details after clicking on a product name', async () => {
                const result1 = await page.viewProductDetails();
                expect(result1).to.include('Back');
            });

            
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();