const { chromium } = require('/home/Papi_Leo/.npm-global/lib/node_modules/@playwright/mcp/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

async function recordTelemedicina() {
  const tmpDir = path.join(__dirname, '../public/videos/tmp_telemedicina');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: tmpDir,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  const htmlPath = path.join(__dirname, 'telemedicina_showcase.html');

  console.log('Loading Telemedicina showcase HTML...');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  console.log('Running Telemedicina showcase animation...');
  await page.evaluate(async () => {
    await window.runTelemedicinaShowcase();
  });
  await page.waitForTimeout(1200);

  const videoPath = await page.video().path();
  await context.close();
  await browser.close();

  console.log('Raw video saved at:', videoPath);

  const targetMp4 = path.join(__dirname, '../public/videos/telemedicina_demo.mp4');
  console.log('Transcoding to MP4 with ffmpeg...');
  execSync(`ffmpeg -y -i "${videoPath}" -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -movflags +faststart "${targetMp4}"`, { stdio: 'inherit' });

  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('Telemedicina Demo video generated successfully:', targetMp4);
}

recordTelemedicina().catch(err => {
  console.error('Error generating Telemedicina demo:', err);
  process.exit(1);
});
