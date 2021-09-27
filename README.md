# DNAnexus UI Test

This test was written for UI assignment for candidates.

## Assignment
Use your preferred test automation framework to automate the scenario: Go to your favourite Czech
e-shop (e.g. Alza), navigate to the TVs category and add the two most expensive TVs to the shopping
cart. Provide code from implementation.

### Expected outputs:
- Executable solution (preferably delivered in Git repository)
- Use good automation practice (e.g. assertions, documentation, ...)

#### If you don’t know where to start:
- Resources for Cypress:
    - https://docs.cypress.io/guides/getting-started/writing-your-first-test
    - https://docs.cypress.io/guides/core-concepts/introduction-to-cypress
- Resources for selenium:
    - https://www.selenium.dev/documentation/guidelines

## Documentation
This GitHub consists of one test `addExpensiveTVsToBasketE2E.test.ts` inside the `cypress/integration` folder. It will navigate to the `TV` category on a site `https://czc.cz` and sorts it by the highest price and then add the two most expensive items to the basket.
As I couldn't create my own database with known values it is assumed the following:
1. The page has at least 27 TV in its the category (for checking if the page successfully loads everything)
2. The second item on a page cannot be added to the basket and the script will move on to the third
3. The price sum of both items in a basket is "4 339 980 Kč".

This cannot be solved since I don't have access to a web page with deterministic data and I need to hope that it won't be changed on the production web.

## Assertions
The script will check the following:
1. All items which will be clicked by the script are visible
2. Web redirection
3. Items are loading after order query
4. Basket number raising and not empty
5. Basket containing sum of the most expensive items