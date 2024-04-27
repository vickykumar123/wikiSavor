import {beforeAll, describe, expect, test} from "@jest/globals";

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

describe.only("searching with vaild input", () => {
  beforeAll(async () => {
    await page.type("input[name='searchQuery']", "bangalore");
    await page.click(".search-button");
  });
  test("search bar is visible", async () => {
    await page.waitForSelector(".search-button");
    const searchButton = await page.$eval(
      ".search-button",
      (el) => el.innerHTML
    );
    expect(searchButton).toBe("Search");
  });
  test("location change is visible", async () => {
    await page.waitForSelector(".change-location", {visible: true});

    const changeLocation = await page.$eval(".change-location", (el) =>
      el.innerText.trim()
    );

    expect(changeLocation).toBe("Change Location");
  });
  test("go to restaurant detail page", async () => {
    await page.click(".order-now");
    await page.waitForSelector(".menu", {visible: true});
    const menuText = await page.$eval(".menu", (el) => el.innerHTML);
    expect(menuText).toBe("Menu");
  });
  test("checkout button visible", async () => {
    await page.waitForSelector(".chekout-without-login", {visible: true});
    const menuText = await page.$eval(
      ".chekout-without-login",
      (el) => el.innerHTML
    );
    expect(menuText).toBe("Login to check out");
  });
});
