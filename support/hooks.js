const { After, Before, AfterAll } = require('cucumber');
const scope = require('./scope');

Before(async () => {
  // You can clean up database models here
  scope.browser = await scope.driver.launch({ headless: true, slowMo: 5 });
});

After(async () => {
  // Here we check if a scenario has instantiated a browser and a current page
  if (scope.browser && scope.currentPage) {
    // if it has, find all the cookies, and delete them
    const cookies = await scope.currentPage.cookies();
    if (cookies && cookies.length > 0) {
      await scope.currentPage.deleteCookie(...cookies);
    }
    // close the web page down
    await scope.currentPage.close();
    // wipe the context's currentPage value
    scope.currentPage = null;
  }
});

AfterAll(async () => {
  // If there is a browser window open, then close it
  if (scope.browser) await scope.browser.close();
});