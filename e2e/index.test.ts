import { test, expect } from '@playwright/test';

test('测试页面是否正常渲染', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const res = await page.evaluate(async () => {
    const pageContent = document.body.innerText;
    return pageContent.includes('That');
  });
  expect(res).toBe(true);
});
