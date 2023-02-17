const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const axios = require('axios')
require('chromedriver');

async function scrape() {
  let driver = await new Builder().forBrowser('chrome').build();

  await driver.get('https://dominospizza.lt/lt/vilnius/promo/');

  var button = await driver.findElement(By.css(".CookieAccept"))    
  button.click()

  var dealCards = await driver.findElements(By.css(".promo-card__content"));
  
  for(let deal of dealCards) {
    const image = await deal.findElement(By.css('img')).getAttribute('src');
    const title = await deal.findElement(By.css('.card-title')).getText();
    const description = await deal.findElement(By.css('.card-text')).getText();

    const data = {
      image: image,
      name: title,
      description: description,
      price: '3gay',
      restaurantID: 2
    };

    axios.post('http://localhost:3000/api/meal-deals/', data)
      .catch(error => {
        console.log(error)
      })
  }

  driver.quit();
}

scrape()