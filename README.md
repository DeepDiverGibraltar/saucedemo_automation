x# Automated Testing With Node.js And Selenium Webdriver 

UI and Functionl test on top of NodeJS and Selenuim WebDriver

## Code Task Functionality Overview

Consider this Demo virtual shop created for testing purposes:

Please explore the below test [https://www.saucedemo.com/]

In this shop, users are able to perform the following actions:

1. Login
2. Add/Delete products to the shopping cart
3. View product’s details by 

clicking on the product’s name
4. Check out the shopping cart ( no payment information required)
5. Logout

The main screens of this webshop are the following:

**A. Login Screen**
* In order to access the site, the user should fill the form with the appropriate credentials: 
* Usernames: **standard_user**
* Password: **secret_sauce**

**B. Home Screen**
* After the successful login, this screen will be displayed showing different products with the following information:

    **Name,** with link to the detailed product view
    **Description**
    **Price**
    **"Add to cart"** button
    
**C. Proceed to checkout Screen:**
    As the webshop is a for testing purposes, the checkout does not require any payment method, the minimum requirement is the fulfillment of the following fields(no restrictions in field type or format):

    *First Name
    * Last Name
    * Zip/Postal Code

**D. Checkout Overview Screen**
    In case of successful fulfillment of the fields in **Proceed to checkout Screen** and
    clicking “Continue”, the user will see **“Checkout Overview”** Screen, with the
    following information:

    * Description of the selected products and related quantity
    * Total products in the shopping cart
    * Tax applied
    * Total price
    
**E. Checkout Complete**
    If the user decides to confirm the purchase, the **“Checkout Complete”** screen will be
    displayed with the message: **“Thank you for your order”**

## Test cases
1. **(Test automation)** - **Provide a runnable automation testsuite** for the following
    user flow:

    * Login into the website
    * Select a product
    * Add to cart
    * Proceed to checkout
    * Confirm checkout
    * Logout (left side menu)

2. **(Bug report)** - Write an example of a **Bug Report**, explaining the unexpected
behaviour of the **“Home Screen”**, once logged in using the following credentials:

* Usernames: **problem_user**
* Password: **secret_sauce**


## Prerequisites
1. Clone the repository
```bash
git clone [https://github.com/DeepDiverGibraltar/saucedemo_automation.git]
```
2. Install Node.js
3. Download/clone this repository and cd into it
4. Install all the dependencies


## Install dependencies

```bash
npm i chai@4.1.2 chai-as-promised@7.1.1 chromedriver@2.41.0 faker@4.1.0 mocha@5.2.0 mochawesome@3.0.3 selenium-webdriver@4.0.0-alpha.1 --save-dev --unsafe-perm=true --allow-root
```

## Usage
1. The following steps will help you run tests:
```bash
npm test
```
