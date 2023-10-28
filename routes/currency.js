const express = require("express");
const puppeteer = require('puppeteer');
const router = express.Router();

// router.get('/', async (req, res, next) => {
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     // USD to UZS
//     await page.goto('https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=UZS');
//     const usdToUzs = await getExchangeRate(page);

//     // EUR to UZS
//     await page.goto('https://www.xe.com/currencyconverter/convert/?Amount=1&From=EUR&To=UZS');
//     const eurToUzs = await getExchangeRate(page);

//     // RUB to UZS
//     await page.goto('https://www.xe.com/currencyconverter/convert/?Amount=1&From=RUB&To=UZS');
//     const rubToUzs = await getExchangeRate(page);

//     await browser.close();

//     res.json({ usd_uzs: usdToUzs, eur_uzs: eurToUzs, rub_uzs: rubToUzs });
//   } catch (error) {
//     res.json({ error: 'Xatolik yuz berdi' });
//   }
// });

// async function getExchangeRate(page) {
//   const xpathExpression = '//*[@id="__next"]/div[3]/div[2]/section/div[2]/div/main/div/div[2]/div[1]/p[2]/text()[1]';
//   const elements = await page.$x(xpathExpression);

//   if (elements.length > 0) {
//     const text = await page.evaluate(element => element.textContent, elements[0]);
//     return text;
//   } else {
//     return 'Ma\'lumot topilmadi';
//   }
// }

const axios = require('axios');
const cheerio = require('cheerio');


router.get('/', async (req, res) => {
  try {
    const urls = [
      'https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=UZS',
      'https://www.xe.com/currencyconverter/convert/?Amount=1&From=EUR&To=UZS',
      'https://www.xe.com/currencyconverter/convert/?Amount=1&From=RUB&To=UZS',
    ];

    // const exchangeRates = {};
    const exchangeRates = {
      usd_uzs: null,
      eur_uzs: null,
      rub_uzs: null
    };

    for (const url of urls) {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      // XPath orqali ma'lumot olish
      const rate = $('#__next > div:nth-child(3) > div.fluid-container__BaseFluidContainer-sc-qoidzu-0.cXGelU > section > div:nth-child(2) > div > main > div > div:nth-child(2) > div:nth-child(1) > p.result__BigRate-sc-1bsijpp-1.dPdXSB').text().replace("Uzbekistani Sums", "").trim(); // XPath izlash, o'zgartiring kerakli ifoda bo'lsa

      // Keyingi URL uchun exchangeRates obyektiga qo'shish
      // exchangeRates[url] = rate;

      if (url.includes('USD')) {
        exchangeRates.usd_uzs = rate;
      } else if (url.includes('EUR')) {
        exchangeRates.eur_uzs = rate;
      } else if (url.includes('RUB')) {
        exchangeRates.rub_uzs = rate;
      }

    }

    res.json(exchangeRates);
  } catch (error) {
    res.json({ error: 'Xatolik yuz berdi' });
  }
});


// let exchangeRates = {
//   usd_uzs: null,
//   eur_uzs: null,
//   rub_uzs: null,
// };

// async function fetchExchangeRates() {
//   try {
//     const urls = [
//       'https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=UZS',
//       'https://www.xe.com/currencyconverter/convert/?Amount=1&From=EUR&To=UZS',
//       'https://www.xe.com/currencyconverter/convert/?Amount=1&From=RUB&To=UZS',
//     ]
//     for (const url of urls) {
//       const response = await axios.get(url);
//       const html = response.data;
//       const $ = cheerio.load(html);

//       // XPath orqali ma'lumot olish
//       const rate = $('#__next > div:nth-child(3) > div.fluid-container__BaseFluidContainer-sc-qoidzu-0.cXGelU > section > div:nth-child(2) > div > main > div > div:nth-child(2) > div:nth-child(1) > p.result__BigRate-sc-1bsijpp-1.dPdXSB').text().replace("Uzbekistani Sums", "").trim()
//       // XPath izlash, o'zgartiring kerakli ifoda bo'lsa

//       if (url.includes('USD')) {
//         exchangeRates.usd_uzs = rate;
//       } else if (url.includes('EUR')) {
//         exchangeRates.eur_uzs = rate;
//       } else if (url.includes('RUB')) {
//         exchangeRates.rub_uzs = rate;
//       }
//     }
//   } catch (error) {
//     console.error('Xatolik yuz berdi:', error);
//   }
// }

// // Avtomatik yangilash uchun setInterval
// setInterval(fetchExchangeRates, 300000);
// // setInterval(()=>{
// //   console.log("hello");
// // }, 1000); // 5 minut = 300000 millisekund

// router.get('/', (req, res) => {
//   res.json(exchangeRates);
// });

// // Birinchi marta boshlash uchun valyuta kurslarini olish
// fetchExchangeRates();


module.exports = router;