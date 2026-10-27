const { chromium } = require('/home/Papi_Leo/.npm-global/lib/node_modules/@playwright/mcp/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

async function recordRentaTools() {
  const tmpDir = path.join(__dirname, '../public/videos/tmp_rentatools');
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

  // Mock API routes to ensure 100% deterministic, ultra-smooth execution
  const mockTools = [
    {
      id: 'tool-001',
      name: 'Excavadora Hidráulica CAT 320D',
      brand: 'Caterpillar',
      model: '320D-2024',
      category: { id: 1, name: 'Maquinaria Pesada' },
      dailyPrice: 850000,
      weeklyPrice: 5100000,
      monthlyPrice: 18500000,
      status: 'AVAILABLE',
      imageUrl: 'assets/cat320.png',
      location: { latitude: 4.6723, longitude: -74.0562, city: 'Bogotá Norte' },
      providerName: 'Gecolsa Maquinaria',
      specifications: { peso: '22 Ton', potencia: '148 HP', capacidadBalde: '1.2 m³' }
    },
    {
      id: 'tool-002',
      name: 'Retroexcavadora JCB 3CX Eco',
      brand: 'JCB',
      model: '3CX Turbo',
      category: { id: 1, name: 'Maquinaria Pesada' },
      dailyPrice: 420000,
      weeklyPrice: 2520000,
      monthlyPrice: 9200000,
      status: 'AVAILABLE',
      imageUrl: 'assets/jcb3cx.png',
      location: { latitude: 4.6289, longitude: -74.0934, city: 'Bogotá Centro' },
      providerName: 'Maquinaria Andina',
      specifications: { peso: '8.1 Ton', potencia: '92 HP', profundidad: '4.24 m' }
    },
    {
      id: 'tool-003',
      name: 'Mini-Cargador Bobcat S550',
      brand: 'Bobcat',
      model: 'S550 Serie M',
      category: { id: 2, name: 'Carga & Movimiento' },
      dailyPrice: 280000,
      weeklyPrice: 1680000,
      monthlyPrice: 6200000,
      status: 'AVAILABLE',
      imageUrl: 'assets/bobcat.png',
      location: { latitude: 4.6097, longitude: -74.0817, city: 'Bogotá Sur' },
      providerName: 'Equipos & Obras SAS',
      specifications: { peso: '2.8 Ton', cargaNominal: '895 kg', potencia: '61 HP' }
    },
    {
      id: 'tool-004',
      name: 'Rodillo Compactador Dynapac CA250',
      brand: 'Dynapac',
      model: 'CA250D',
      category: { id: 3, name: 'Compactación' },
      dailyPrice: 520000,
      weeklyPrice: 3120000,
      monthlyPrice: 11500000,
      status: 'AVAILABLE',
      imageUrl: 'assets/dynapac.png',
      location: { latitude: 4.6982, longitude: -74.0411, city: 'Bogotá Autonorte' },
      providerName: 'Rentals Colombia',
      specifications: { peso: '11 Ton', anchoTambor: '2.13 m', frecuencia: '33 Hz' }
    }
  ];

  await page.route('**/api/v1/tools/public', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockTools)
    });
  });

  await page.route('**/api/v1/tools/categories', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Maquinaria Pesada', count: 12 },
        { id: 2, name: 'Carga & Movimiento', count: 8 },
        { id: 3, name: 'Compactación', count: 5 }
      ])
    });
  });

  await page.route('**/api/v1/auth/login', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.fake_token_jwt',
        user: {
          id: 'usr-admin-01',
          name: 'Leonardo Hernández',
          role: 'ROLE_ADMIN',
          company: 'RentaTools Core'
        }
      })
    });
  });

  await page.route('**/api/v1/auth/me', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'usr-admin-01',
        name: 'Leonardo Hernández',
        role: 'ROLE_ADMIN',
        company: 'RentaTools Core'
      })
    });
  });

  await page.route('**/api/v1/rentals/**', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        available: true,
        success: true,
        rentalId: 'REN-2026-904',
        message: 'Reserva procesada con éxito'
      })
    });
  });

  // Kinetic caption helper with pointer-events: none
  async function setCaption(tag, title, desc, delayMs = 3000) {
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
          padding: 12px 26px;
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

  console.log('Navigating to RentaTools PRO on port 3030...');
  await page.goto('http://localhost:3030/', { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  // 1. Hero & Value Proposition
  await setCaption('RENTATOOLS PRO', 'Marketplace de Maquinaria Pesada & Equipos', 'Java 21, Spring Boot 3.4, Arquitectura Hexagonal DDD & PostgreSQL');
  await page.waitForTimeout(1000);

  // 2. Interactive Map (Leaflet.js)
  await setCaption('GEOLOCALIZACIÓN EN VIVO', 'Búsqueda de Equipos por Radio de Obra', 'Integración con Leaflet.js para geocodificación y cálculo de cobertura logística');
  await page.evaluate(() => {
    const mapBtn = Array.from(document.querySelectorAll('a, button')).find(el => el.innerText.includes('Mapa en Vivo') || el.innerText.includes('Catálogo'));
    if (mapBtn) mapBtn.click();
  });
  await page.waitForTimeout(1500);

  // Scroll smoothly down to the map
  await page.evaluate(() => {
    const mapEl = document.getElementById('map') || document.querySelector('.map-container') || document.querySelector('section');
    if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await page.waitForTimeout(2500);

  // 3. Machinery Catalog & Availability
  await setCaption('CATÁLOGO & ESPECIFICACIONES', 'Inventario Técnico con Estado en Tiempo Real', 'Maquinaria pesada, capacidades mecánicas, potencia y tarifas escalonadas');
  await page.evaluate(() => {
    window.scrollBy({ top: 450, behavior: 'smooth' });
  });
  await page.waitForTimeout(2500);

  // 4. Modal de Autenticación & Control de Acceso RBAC
  await setCaption('CONTROL DE ACCESO RBAC', 'Módulos para Cliente, Proveedor & Administrador', 'Autenticación stateless basada en roles con Spring Security y tokens JWT');
  await page.evaluate(() => {
    const btn = document.querySelector('button.btn-primary') || Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Iniciar'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(2000);

  // Click Admin General demo pill
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Admin General'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(1000);

  // Submit login
  await page.evaluate(() => {
    const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Entrar al Sistema'));
    if (submitBtn) submitBtn.click();
  });
  await page.waitForTimeout(2000);

  // 5. Business Value & Architecture
  await setCaption('FACTURACIÓN & AUDITORÍA', 'Generación de Factura PDF & Eventos WebSockets', 'Contratos DDD desacoplados, eventos STOMP en tiempo real y persistencia en 4FN', 3000);

  // Final Close
  const videoPath = await page.video().path();
  await context.close();
  await browser.close();

  console.log('Video saved raw at:', videoPath);

  const targetMp4 = path.join(__dirname, '../public/videos/rentatools_demo.mp4');
  console.log('Transcoding to MP4 with ffmpeg...');
  execSync(`ffmpeg -y -i "${videoPath}" -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -movflags +faststart "${targetMp4}"`, { stdio: 'inherit' });

  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('RentaTools Demo video generated successfully:', targetMp4);
}

recordRentaTools().catch(err => {
  console.error('Error recording RentaTools:', err);
  process.exit(1);
});
