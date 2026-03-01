import { expect, test } from "@playwright/test";
test("Swag username",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    // await page.locator('#username');
   await expect (page.locator('#user-name')).toBeVisible(); //locating with ID
   await expect (page.getByPlaceholder('password')).toBeVisible(); // with placeholder
   await expect (page.locator('[data-test="login-button"]')).toBeVisible();// with data-test
});
