const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
require('chromedriver');

async function scrape() {
  let driver = await new Builder().forBrowser('chrome').build();

  await driver.get('https://dominospizza.lt/lt/vilnius/promo/');

  var dealCards = await driver.findElements(By.css(".promo-card__content"));
  
  for(let deal of dealCards) {
    const image = await deal.findElement(By.css('img')).getAttribute('src');
    const title = await deal.findElement(By.css('.card-title')).getText();
    const description = await deal.findElement(By.css('.card-text')).getText();

    //...
  }

  driver.quit();
}