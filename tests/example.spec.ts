import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

test('verify cart is empty', async ({ page }) => {
   await page.goto('https://rahulshettyacademy.com/seleniumPractise/');
   await page.locator('.cart-icon').click();


await expect(
  page.locator('.cart-preview.active .empty-cart h2')
).toHaveText('You cart is empty!');

});

test('verify adding products to cart', async ({ page }) => {
   
  const productName = 'Brocolli';
const productPrice = '120';

  await page.goto('https://rahulshettyacademy.com/seleniumPractise/');
  await page.locator('.product').filter({ hasText: 'Brocolli' }).getByRole('button').click();
   await page.locator('.cart-icon').click();

// validate product name in cart
const cartItem = page.locator('.cart-preview.active').locator('li').filter({ hasText: productName });
await expect(cartItem).toContainText(productName);

// validate price in cart
await expect(cartItem).toContainText(productPrice);
await page.getByRole('button', { name: /proceed to checkout/i }).click();

const cartRow = page.locator('.cartTable tr').filter({ hasText: productName });

await expect(cartRow).toContainText(productName);
await expect(cartRow).toContainText(productPrice);
const totalAmount = await page.locator('.totAmt').textContent();
console.log('Total Amount:', totalAmount);

expect(totalAmount).not.toBeNull();
await expect(page.locator('.totAmt')).toHaveText('120');
await page.getByRole('button', { name: /place order/i }).click();
await page.locator('select').selectOption('India');
await page.locator('.chkAgree').check();
await page.getByRole('button', { name: /proceed/i }).click();
await expect(page.locator('.wrapperTwo')).toHaveText("Thank you, your order has been placed successfully  You'll be redirected to Home page shortly!!");


});


