import {afterAll, beforeAll, expect, test} from "@jest/globals";

import puppeteer from "puppeteer";

let browser, page;
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.goto("http://localhost:5173");
});

afterAll(async () => {
  await browser.close();
});

test("the header has correct text", async () => {
  const headerText = await page.$eval("a[href='/']", (el) => el.innerText);
  expect(headerText).toBe("wikiSavor");
});
