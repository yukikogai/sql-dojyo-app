import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'screenshots');

async function main() {
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ args: ['--force-color-profile=srgb'] });

  // ダークモード + SQL入力中
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const editor = page.locator('.cm-content').first();
  if (await editor.isVisible()) {
    await editor.click();
    await page.keyboard.press('Meta+a');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('SELECT name, department FROM employees;');
    await page.waitForTimeout(300);
  }

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'screenshot.png') });
  console.log('✓ screenshot.png');

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
