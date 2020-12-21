const { describe, it, after, before } = require('mocha');
const Page = require('../lib/loginScreen');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function login() {
    try {
        describe ('the user successfully login to the swag labs page ', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit('https://www.saucedemo.com/');
            });


            afterEach (async () => {
                await page.quit();
            });


            it ('the user successfully launches the app', async () => {
                const result = await page.findUsernamePasswordAndButton();
                expect(result.inputUsernameEnabled).to.equal(true);
                expect(result.inputPasswordEnabled).to.equal(true);
                expect(result.buttonText).to.include('LOGIN');
            });

            it ('the user enters valid credentials and clicks login button', async () => {

                const result1 = await page.submitCredentialsAndGetResult();
                expect(result1).to.equal(true);
            });

            it ('the user can logout successfully', async () => {
                const result = await page.logoutApp();
                expect(result).to.equal(true);        
            });

            
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();