// const express = require("express");
// const puppeteer = require('puppeteer');
// const router = express.Router();

// // router.get('/', async (req, res, next) => {
// //   try {
// //     const browser = await puppeteer.launch();
// //     const page = await browser.newPage();

// //     // USD to UZS
// //     await page.goto('https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=UZS');
// //     const usdToUzs = await getExchangeRate(page);

// //     // EUR to UZS
// //     await page.goto('https://www.xe.com/currencyconverter/convert/?Amount=1&From=EUR&To=UZS');
// //     const eurToUzs = await getExchangeRate(page);

// //     // RUB to UZS
// //     await page.goto('https://www.xe.com/currencyconverter/convert/?Amount=1&From=RUB&To=UZS');
// //     const rubToUzs = await getExchangeRate(page);

// //     await browser.close();

// //     res.json({ usd_uzs: usdToUzs, eur_uzs: eurToUzs, rub_uzs: rubToUzs });
// //   } catch (error) {
// //     res.json({ error: 'Xatolik yuz berdi' });
// //   }
// // });

// // async function getExchangeRate(page) {
// //   const xpathExpression = '//*[@id="__next"]/div[3]/div[2]/section/div[2]/div/main/div/div[2]/div[1]/p[2]/text()[1]';
// //   const elements = await page.$x(xpathExpression);

// //   if (elements.length > 0) {
// //     const text = await page.evaluate(element => element.textContent, elements[0]);
// //     return text;
// //   } else {
// //     return 'Ma\'lumot topilmadi';
// //   }
// // }

// const axios = require('axios');
// const cheerio = require('cheerio');


// router.get('/', async (req, res) => {
//   try {
//     const urls = [
//       'https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=UZS',
//       'https://www.xe.com/currencyconverter/convert/?Amount=1&From=EUR&To=UZS',
//       'https://www.xe.com/currencyconverter/convert/?Amount=1&From=RUB&To=UZS',
//     ];

//     const exchangeRates = {};

//     for (const url of urls) {
//       const response = await axios.get(url);
//       const html = response.data;
//       const $ = cheerio.load(html);

//       // XPath orqali ma'lumot olish
//       const rate = $('p:contains("1 USD =")').text(); // XPath izlash, o'zgartiring kerakli ifoda bo'lsa

//       // Keyingi URL uchun exchangeRates obyektiga qo'shish
//       exchangeRates[url] = rate;
//     }

//     res.json(exchangeRates);
//   } catch (error) {
//     res.json({ error: 'Xatolik yuz berdi' });
//   }
// });





// module.exports = router;