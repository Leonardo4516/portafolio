const { chromium } = require('/home/Papi_Leo/.npm-global/lib/node_modules/@playwright/mcp/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

async function recordAcme() {
  const tmpDir = path.join(__dirname, '../public/videos/tmp_acme');
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

  // Helper to update kinetic caption
  async function setCaption(tag, title, desc, delayMs = 2800) {
    await page.evaluate(({ tag, title, desc }) => {
      let el = document.getElementById('demo-caption-overlay');
      if (!el) {
        el = document.createElement('div');
        el.id = 'demo-caption-overlay';
        el.style.cssText = `
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(10, 10, 14, 0.94);
          border: 1px solid rgba(255, 26, 64, 0.6);
          box-shadow: 0 12px 36px rgba(0,0,0,0.8), 0 0 20px rgba(255, 26, 64, 0.25);
          border-radius: 10px;
          padding: 12px 24px;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          z-index: 9999999;
          pointer-events: none;
          display: flex;
          align-items: center;
          gap: 14px;
          backdrop-filter: blur(16px);
          max-width: 90%;
          box-sizing: border-box;
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        `;
        const style = document.createElement('style');
        style.textContent = `
          @keyframes slideUp {
            from { opacity: 0; transform: translate(-50%, 15px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }
        `;
        document.head.appendChild(style);
        document.body.appendChild(el);
      }
      el.innerHTML = `
        <div style="width: 10px; height: 10px; border-radius: 50%; background: #ff1a40; box-shadow: 0 0 10px #ff1a40; flex-shrink: 0;"></div>
        <div>
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #ff1a40; font-weight: 700; margin-bottom: 2px;">${tag}</div>
          <div style="font-size: 14px; font-weight: 600; color: #ffffff;">${title} <span style="font-weight: 400; color: #a1a1aa; font-size: 13px;">— ${desc}</span></div>
        </div>
      `;
    }, { tag, title, desc });

    if (delayMs > 0) {
      await page.waitForTimeout(delayMs);
    }
  }

  console.log('Navigating to Acme Bank...');
  await page.goto('https://auto-gestion-bancaria-acme.netlify.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await setCaption('ACME BANK', 'Portal Transaccional de Autogestión', 'Vanilla JS (ES6+) con Web Components nativos y 0 dependencias');

  // Navigate to Registration
  await setCaption('MÓDULO DE REGISTRO', 'Apertura de Cuenta Digital', 'Validación estricta de formulario y emisión instantánea de cuenta');
  await page.click('a[href*="registro"]', { force: true });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Fill Registration Form
  await page.selectOption('#rTipoId', 'CC');
  await page.fill('#rNumId', '1098765432');
  await page.fill('#rNombres', 'Leonardo');
  await page.fill('#rApellidos', 'Hernandez');
  await page.selectOption('#rGenero', 'M');
  await page.fill('#rTelefono', '3157894561');
  await page.fill('#rCorreo', 'leonardo@ingenieria.dev');
  await page.fill('#rDireccion', 'Cra 27 # 45-12');
  await page.fill('#rCiudad', 'Bucaramanga');
  await page.fill('#rPassword', 'segura123');
  await page.waitForTimeout(800);

  // Submit Registration
  await page.click('#regForm button[type="submit"]', { force: true });
  await page.waitForTimeout(1500);

  await setCaption('PERSISTENCIA LOCAL', 'Cuenta Bancaria Generada con Éxito', 'Persistencia segura en Web Storage API y generación atómica');
  await page.waitForTimeout(1500);

  // Return to Login
  await page.click('#panelResumen a, a[href*="index"]', { force: true });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);

  // Perform Login
  await setCaption('AUTENTICACIÓN', 'Validación de Sesión & Credenciales', 'Control de acceso con sessionStorage y expiración controlada');
  await page.selectOption('#tipoId', 'CC');
  await page.fill('#numId', '1098765432');
  await page.fill('#password', 'segura123');
  await page.waitForTimeout(600);
  await page.click('#loginForm button[type="submit"]');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);

  // On Dashboard
  await setCaption('PANEL FINANCIERO', 'Dashboard Central de Cliente', 'Resumen en vivo de saldos, titularidad y estado de cuenta');
  await page.waitForTimeout(1800);

  // Make a Deposit (Consignación)
  await setCaption('OPERACIONES FINANCIERAS', 'Consignación Inmediata de Fondos', 'Cálculo atómico de balance y registro de auditoría');
  const consignarBtn = await page.$('.nav-btn[data-panel="consignacion"]');
  if (consignarBtn) {
    await consignarBtn.click();
    await page.waitForTimeout(800);
    await page.fill('#valorConsig', '1500000');
    await page.waitForTimeout(600);
    await page.click('#formConsig button[type="submit"]');
    await page.waitForTimeout(1500);
  }

  // Make a Withdrawal (Retiro)
  await setCaption('CONTROL DE RIESGO', 'Retiro de Efectivo con Validación', 'Prevención de sobregiro y deducción en tiempo real');
  const retiroBtn = await page.$('.nav-btn[data-panel="retiro"]');
  if (retiroBtn) {
    await retiroBtn.click();
    await page.waitForTimeout(800);
    await page.fill('#valorRetiro', '350000');
    await page.waitForTimeout(600);
    await page.click('#formRetiro button[type="submit"]');
    await page.waitForTimeout(1500);
  }

  // Check Transaction History (Extracto)
  await setCaption('EXTRACTO & AUDITORÍA', 'Historial Dinámico de Transacciones', 'Trazabilidad completa con fecha, concepto, referencia y saldo resultante');
  const txBtn = await page.$('.nav-btn[data-panel="transacciones"]');
  if (txBtn) {
    await txBtn.click();
    await page.waitForTimeout(2000);
  }

  // Certificado Bancario
  await setCaption('DOCUMENTO OFICIAL', 'Generación de Certificado Bancario', 'Emisión digital instantánea con fecha oficial y sello ACME');
  const certBtn = await page.$('.nav-btn[data-panel="certificado"]');
  if (certBtn) {
    await certBtn.click();
    await page.waitForTimeout(2200);
  }

  // Back to Account Summary
  const resumenBtn = await page.$('.nav-btn[data-panel="resumenCuenta"]');
  if (resumenBtn) {
    await resumenBtn.click();
    await page.waitForTimeout(1500);
  }

  await setCaption('CIERRE DE FLUJO', 'Ingeniería Robusta Frontend', '0 librerías pesadas • Alto rendimiento y compatibilidad universal', 2000);

  // Close context to finish video
  const videoPath = await page.video().path();
  await context.close();
  await browser.close();

  console.log('Video saved raw at:', videoPath);

  // Convert to high-quality compressed MP4 with faststart
  const targetMp4 = path.join(__dirname, '../public/videos/acme_bank_demo.mp4');
  console.log('Transcoding to MP4 with ffmpeg...');
  execSync(`ffmpeg -y -i "${videoPath}" -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -movflags +faststart "${targetMp4}"`, { stdio: 'inherit' });

  // Cleanup tmp dir
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('Done! Final output:', targetMp4);
}

recordAcme().catch(err => {
  console.error('Error recording Acme Bank:', err);
  process.exit(1);
});
