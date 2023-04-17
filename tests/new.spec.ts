import {test, expect} from '@playwright/test';
import {ENGINE_STATUS, SEAT_STATUS, VEHICLE_TYPE} from "../lib/vehicle";


test('Validate New Vehicle defaults', async ({page, baseURL}) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('/new')

    if (page.context().browser()!.browserType().name().toLowerCase().startsWith("firefox"))
        await expect(page).toHaveURL(baseURL as string + '/new/')
    else
        await expect(page).toHaveURL(baseURL as string + '/new')

    await expect(page.locator('h3')).toContainText('Create a new vehicle')

    const vehicleType = await page.locator('select[name="vehicleType"]')
    await expect(await vehicleType.inputValue()).toBe(VEHICLE_TYPE.COUPE)

    const mileage = await page.getByTestId("mileage")
    await expect(await mileage.inputValue()).toBe("0")

    const wheels = await page.getByTestId("wheels")
    await expect(await wheels.inputValue()).toBe("4")

    const doors = await page.getByTestId("doors")
    await expect(await doors.inputValue()).toBe("4")

    const engineStatus = await page.locator('select[name="engineStatus"]')
    await expect(await engineStatus.inputValue()).toBe(ENGINE_STATUS.WORKS)

    await expect(page.locator('select[name="seatStatus"]')).toHaveCount(0)

})

test('Validate Motorcycle defaults', async ({page}) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('/new')
    await page.getByTestId('vehicleType').selectOption(VEHICLE_TYPE.MOTORCYCLE)

    const mileage = await page.getByTestId("mileage")
    await expect(await mileage.inputValue()).toBe("0")

    const wheels = await page.getByTestId("wheels")
    await expect(await wheels.inputValue()).toBe("2")

    const engineStatus = await page.locator('select[name="engineStatus"]')
    await expect(await engineStatus.inputValue()).toBe(ENGINE_STATUS.WORKS)

    const seatStatus = await page.locator('select[name="seatStatus"]')
    await expect(await seatStatus.inputValue()).toBe(SEAT_STATUS.WORKS)

    await expect(page.locator('select[name="doors"]')).toHaveCount(0)
})

test('Validate Sedan defaults', async ({page}) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('/new')
    await page.getByTestId('vehicleType').selectOption(VEHICLE_TYPE.SEDAN)

    const vehicleType = await page.locator('select[name="vehicleType"]')
    await expect(await vehicleType.inputValue()).toBe(VEHICLE_TYPE.SEDAN)

    const mileage = await page.getByTestId("mileage")
    await expect(await mileage.inputValue()).toBe("0")

    const wheels = await page.getByTestId("wheels")
    await expect(await wheels.inputValue()).toBe("4")

    const doors = await page.getByTestId("doors")
    await expect(await doors.inputValue()).toBe("4")

    const engineStatus = await page.locator('select[name="engineStatus"]')
    await expect(await engineStatus.inputValue()).toBe(ENGINE_STATUS.WORKS)

    await expect(page.locator('select[name="seatStatus"]')).toHaveCount(0)

})

test('Test adding motorcycle', async ({page, baseURL}) => {
    await page.goto('/new')
    // const FileDatabase = require('../lib/fileDatabase')
    // let fileDatabase = new FileDatabase();
    // let vehicles = fileDatabase.all()

    await page.getByTestId('vehicleType').selectOption(VEHICLE_TYPE.MOTORCYCLE)
    await page.getByTestId('nickname').fill("harley")
    await page.getByTestId('mileage').fill("1000")
    await page.getByTestId('engineStatus').selectOption(ENGINE_STATUS.FIXABLE)
    await page.getByTestId('seatStatus').selectOption(SEAT_STATUS.JUNK)
    await page.getByRole('button', {name: "Submit"}).click()

    await expect(page).toHaveURL(baseURL as string)
    await expect(page.getByTestId('vehicle-3')).toHaveCount(1)


    // let motorcycle = fileDatabase.find(vehicles.length + 1)
    // await expect(motorcycle).toHaveCount(1)
})
