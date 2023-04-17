
import { test, expect } from '@playwright/test';
import {ENGINE_STATUS, SEAT_STATUS, VEHICLE_TYPE} from "../lib/vehicle";



test('Validate settings on the first vehicle (Motorcycle)', async ({ page, baseURL }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/1')
  if(page.context().browser()!.browserType().name().toLowerCase().startsWith("firefox"))
    await expect(page).toHaveURL(baseURL as string + '/1/')
  else
    await expect(page).toHaveURL(baseURL as string + '/1')
  await expect(page.locator('h3')).toContainText('Change a vehicle here')

  const vehicleType = await page.locator('select[name="vehicleType"]')
  await expect(await vehicleType.inputValue()).toBe(VEHICLE_TYPE.MOTORCYCLE)

  const nickname = await page.getByTestId("nickname")
  await expect(await nickname.inputValue()).toBe("harley")

  const mileage = await page.getByTestId("mileage")
  await expect(await mileage.inputValue()).toBe("10000")

  const wheels = await page.getByTestId("wheels")
  await expect(await wheels.inputValue()).toBe("2")

  const seatStatus = await page.getByTestId("seatStatus")
  await expect(await seatStatus.inputValue()).toBe(SEAT_STATUS.WORKS)

  const engineStatus = await page.locator('select[name="engineStatus"]')
  await expect(await engineStatus.inputValue()).toBe(ENGINE_STATUS.FIXABLE)

  await expect(page.locator('select[name="doors"]')).toHaveCount(0)

})

test('Change Motorcycle to Coupe', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/1')
  await page.getByTestId('vehicleType').selectOption(VEHICLE_TYPE.COUPE)

  const nickname = await page.getByTestId("nickname")
  await expect(await nickname.inputValue()).toBe("")

  const mileage = await page.getByTestId("mileage")
  await expect(await mileage.inputValue()).toBe("0")

  const wheels = await page.getByTestId("wheels")
  await expect(await wheels.inputValue()).toBe("4")

  const engineStatus = await page.locator('select[name="engineStatus"]')
  await expect(await engineStatus.inputValue()).toBe(ENGINE_STATUS.WORKS)

  const doors = await page.getByTestId("doors")
  await expect(await doors.inputValue()).toBe("2")

  await expect(page.locator('select[name="seatStatus"]')).toHaveCount(0)
})
