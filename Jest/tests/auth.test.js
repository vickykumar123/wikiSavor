import {afterAll, beforeAll, describe, expect, test} from "@jest/globals";

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

test("redirect to auth0 page", async () => {
  await page.click(".desktop-nav button");
  await page.waitForNavigation();
  const url = await page.url();
  expect(url).toMatch(/dev-ihrt720ptxhm7n17\.us\.auth0\.com/);
});
