const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

let driver;
async function scrape() {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://www.plusplusplus.lt/naujienos/Naujienos/menesio-optimistas');

  const button = await driver.wait(until.elementLocated(By.css('.btn-popup-1')), 20000);
  await button.click();

  const image = await driver.findElement(By.css('.post-image')).findElement(By.css('img')).getAttribute('src');

  //price nuscrapina is bold text elemento. Padariau, kad scrapintu pati pirma skaiciu, nes bentjau siuo
  //metu pats pirmas skaicius esantis websaite yra dabartinio menesio, tai nebent keistu website, viskas
  //veikia, tolimesni skaiciai paboldinti yra praejusiu dvieju menesiu.
  const boldTextElements = await driver.findElement(By.css('.post-content')).findElements(By.css('b'))
  let numberPrinted = false;
  for (let i = 0; i < boldTextElements.length; i++) {
    const boldText = await boldTextElements[i].getText();
    //console.log(`Bold text #${i + 1}: ${boldText}`); //cia visas paboldintas tekstas jei prireiks
    const numbersOnly = boldText.replace(/[^0-9]/g, '');
    if(numbersOnly.length>0 && !numberPrinted){
        console.log('Price in cents: ' + numbersOnly);
        numberPrinted = true;
        break;
    }
  }
  console.log('The image URL is: ' + image);
}

scrape()
  .catch((err) => console.error(err))
  .finally(() => driver.quit());