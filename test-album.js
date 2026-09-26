const { chromium } = require('playwright');

(async () => {
  // slowMo rakha hai taaki aap aaram se animation dekh sakein
  const browser = await chromium.launch({ headless: false, slowMo: 800 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Action timeout ko 60 seconds kar diya taaki scroll karne par timeout na aaye
  page.setDefaultTimeout(60000);

  console.log("Navigating to site...");
  await page.goto('http://127.0.0.1:5500/my-journey.html', { waitUntil: 'domcontentloaded' });

  // 1. Cover element ke load hone ka wait
  console.log("Waiting for book cover...");
  await page.waitForSelector('#book-front-cover', { state: 'visible' });

  // Book cover click karke open karna
  console.log("Opening book...");
  await page.click('#book-front-cover');
  await page.waitForTimeout(1500); // 3D flip animation complete hone ka wait
  await page.screenshot({ path: 'step1-book-opened.png' });

  // 2. Add memory slot click karna
  console.log("Clicking add memory slot...");
  await page.waitForSelector('#open-add-slot-btn', { state: 'visible' });
  await page.click('#open-add-slot-btn');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'step2-modal-open.png' });

  // 3. Modal close karna
  console.log("Closing modal...");
  await page.click('#close-add-btn');
  await page.waitForTimeout(500);

  // 4. Close book button click karna
  console.log("Closing book...");
  await page.click('#btn-close-album');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'step3-book-closed.png' });

  console.log("All steps executed successfully!");

  // Browser ko turant band hone se rokne ke liye (taaki aap final UI dekh sakein)
  await page.waitForTimeout(4000);

  await browser.close();
})();