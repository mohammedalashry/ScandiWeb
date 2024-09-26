const { test, expect } = require('@playwright/test');

test('should add product and redirect to product list', async ({ page }) => {
  await page.goto('http://4.246.141.53/add-product'); 

  await page.fill('input[name="sku"]', 'SKU12345'); 
  await page.fill('input[name="name"]', 'NameTest000'); 
  await page.fill('input[name="price"]', '99.99'); 
  await page.selectOption('select[name="type"]', 'DVD'); 
  await page.fill('input[name="size"]', '700');  

  // Step 3: Submit the form
  await page.click('text=Save');  // Click the Save button

  // Step 4: Wait for navigation after clicking Save
  await page.waitForNavigation();

  // Step 5: Verify that the Product List is visible
  await expect(page.getByText('Product List')).toBeVisible({ timeout: 10000 });

  // Step 6: Verify that the product name is visible in the list
  await expect(page.getByText('NameTest000')).toBeVisible({ timeout: 10000 });
});
