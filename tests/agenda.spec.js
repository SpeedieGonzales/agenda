import { test, expect } from '@playwright/test';


test.describe('Agenda App Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://speediegonzales.github.io/agenda/'); 
  });

  test('should add a new agenda item', async ({ page }) => {
    await page.fill('#agenda-input', 'Test Agenda Item');
    await page.click('.add-button');
    const agendaItem = await page.locator('.agenda-item');
    await expect(agendaItem).toContainText('Test Agenda Item');
  });

  test('should mark agenda item as done', async ({ page }) => {
    await page.fill('#agenda-input', 'Test Agenda Item');
    await page.click('.add-button');
    await page.click('.done-button');
    const doneItem = await page.locator('.agenda-item.completed');
    await expect(doneItem).toContainText('Test Agenda Item');
    const agendaText = await doneItem.locator('span');
    await expect(agendaText).toHaveClass(/stripedThrough/);
  });

  test('should remove agenda item', async ({ page }) => {
    await page.fill('#agenda-input', 'Test Agenda Item');
    await page.click('.add-button');
    await page.click('.remove-button');
    const agendaList = await page.locator('#agenda-list');
    await expect(agendaList.locator('.agenda-item')).toHaveCount(0);
  });

});
