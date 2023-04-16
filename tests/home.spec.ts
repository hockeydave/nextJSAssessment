
import { test, expect } from '@playwright/test';


test('should navigate to the Home page', async ({ page, baseURL }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/')
  // Find an element with the text 'Home' and click on it
  await page.click('text=Home')
  // The new URL should be "/" (baseURL is used there)
  await expect(page).toHaveURL(baseURL as string)
  // The new page should contain a h1 with "Junkyard Inventory Management"
  await expect(page.locator('h1')).toContainText('Junkyard Inventory Management')
})

test('should navigate to the New page', async ({ page, baseURL }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/')
  await page.getByRole('button', {name: "New Vehicle"}).click()
  await expect(page).toHaveURL(baseURL as string + '/new')
})

test('should navigate to the Edit item page', async ({ page, baseURL }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/')
  // Find an element with the text 'About Page' and click on it
  await page.click('text=edit')
  //await page.getByRole('link', {name: 'edit'}).click
  // The new URL should be "/" (baseURL is used there)
  await expect(page).toHaveURL(baseURL as string + '/1')
  // The new page should contain a h3 with "Change a vehicle here"
  await expect(page.locator('h3')).toContainText('Change a vehicle here')
})


