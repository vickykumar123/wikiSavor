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

describe("Test for navbar", () => {
  test("the header has correct text", async () => {
    const headerText = await page.$eval("a[href='/']", (el) => el.innerText);
    expect(headerText).toBe("wikiSavor");
  });

  test("login button is visible", async () => {
    const buttonText = await page.$eval(
      ".desktop-nav button",
      (el) => el.innerText
    );
    expect(buttonText).toBe("Log In");
  });
});

test("hero image is rendered", async () => {
  const image = await page.$eval(".hero-img", (el) => el.src);
  await page.waitForSelector(".hero-img");
  expect(image).toMatch(/hero\.png/);
});
