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

test("search is rendered correctly", async () => {
  const searchText = await page.$eval(".search-h1", (el) => el.innerHTML);
  expect(searchText).toBe("Tuck into takeway today 🥳");
});
