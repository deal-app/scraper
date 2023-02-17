const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const axios = require('axios');
require('chromedriver');

async function scrape() {
  let driver = await new Builder().forBrowser('chrome').build();

  await driver.get('https://dodopizza.lt/vilnius/bonusactions');

  var dealCards = await driver.findElements(By.css("article"));
  
  for(let deal of dealCards) {
    const image = await deal.findElement(By.css('.image')).getAttribute('src');
    const title = await deal.findElement(By.css('.title')).getText();
    const description = await deal.findElement(By.css('.description')).getText();
    
    const data = {
      image: image,
      name: title,
      description: description,
      price: '3gay',
      restaurantID: 1
    };

    axios.post('http://localhost:3000/api/meal-deals/', data)
      .catch(error => {
        console.log(error)
      })
  }

  driver.quit();
}

scrape()