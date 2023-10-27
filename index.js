// Import packages
const express = require("express");
const puppeteer = require('puppeteer');
const home = require("./routes/home");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/home", home);

app.get('/getExchangeRates', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // USD to UZS
    await page.goto('https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=UZS');
    const usdToUzs = await getExchangeRate(page);

    // EUR to UZS
    await page.goto('https://www.xe.com/currencyconverter/convert/?Amount=1&From=EUR&To=UZS');
    const eurToUzs = await getExchangeRate(page);

    // RUB to UZS
    await page.goto('https://www.xe.com/currencyconverter/convert/?Amount=1&From=RUB&To=UZS');
    const rubToUzs = await getExchangeRate(page);

    await browser.close();

    res.json({ usd_uzs: usdToUzs, eur_uzs: eurToUzs, rub_uzs: rubToUzs });
  } catch (error) {
    res.json({ error: 'Xatolik yuz berdi' });
  }
});

async function getExchangeRate(page) {
  const xpathExpression = '//*[@id="__next"]/div[3]/div[2]/section/div[2]/div/main/div/div[2]/div[1]/p[2]/text()[1]';
  const elements = await page.$x(xpathExpression);

  if (elements.length > 0) {
    const text = await page.evaluate(element => element.textContent, elements[0]);
    return text;
  } else {
    return 'Ma\'lumot topilmadi';
  }
}

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
