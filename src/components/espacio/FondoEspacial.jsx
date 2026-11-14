import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { RUIDO, texturaBrillo, texturaEstrella, crearPlanetaMagma } from './compartido'

// Fondo espacial del portafolio: la cámara viaja hacia el fondo a medida que se
// hace scroll y cada sección tiene su "estación" con un objeto propio:
//   inicio       → el remanente del choque de la intro (estrella con disco)
//   sobre-mi     → planeta de magma violeta
//   stack        → planeta azul con anillo
//   proyectos    → galaxia espiral
//   metodologia  → dos estrellas que orbitan (eco de la intro)
//   contacto     → horizonte de un planeta gigante
// Entre estaciones hay nebulosas y un campo de estrellas con profundidad.

const SECCIONES = ['inicio', 'sobre-mi', 'stack', 'proyectos', 'metodologia', 'contacto']
const ESPACIO = 40 // distancia en z entre estaciones
const FOV = 55

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

// Nivel "bajo" para móviles, equipos con pocos núcleos o memoria, y GPU integrada.
// En ese caso el fondo se dibuja con menos partículas, sin bloom y a 30 cuadros por segundo
function esEquipoBajo(renderer) {
  if (window.innerWidth < 768) return true
  if ((navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4) return true
  const gl = renderer.getContext()
  const ext = gl.getExtension('WEBGL_debug_renderer_info')
  const gpu = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : ''
  return /Intel|Mali|Adreno|Apple GPU|Radeon (\d{3}M|Graphics|Vega)/i.test(gpu)
}
const rnd = (a, b) => a + Math.random() * (b - a)
const zEstacion = (i) => -i * ESPACIO

// Puntos con tamaño y color propios (disco, anillo, galaxia)
const VERT_PUNTOS = /* glsl */ `
attribute float aTam;
attribute vec3 aColor;
uniform float uPixel;
varying vec3 vColor;
varying float vCerca;
void main(){
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  // Los puntos que pasan muy cerca de la cámara se desvanecen (no se ven manchas grandes)
  vCerca = smoothstep(3.0, 12.0, -mv.z);
  float tam = aTam * uPixel / -mv.z;
  // Mínimo de 2 px: los puntos más chicos saltaban de píxel en píxel y titilaban
  // al mover la cámara; su brillo se reduce en proporción al área agregada
  float visible = max(tam, 2.0);
  vCerca *= min(1.0, (tam * tam) / (visible * visible));
  gl_PointSize = min(visible, 20.0);
  gl_Position = projectionMatrix * mv;
}
`
const FRAG_PUNTOS = /* glsl */ `
uniform float uOpac;
varying vec3 vColor;
varying float vCerca;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vColor * a * uOpac * vCerca, 1.0);
}
`

// Estrellas de fondo: mismo tamaño que un PointsMaterial con atenuación, pero
// con el mismo mínimo de 2 px y compensación de brillo para que no titilen
const VERT_ESTRELLAS = /* glsl */ `
attribute vec3 aColor;
uniform float uTam;
uniform float uEscala;
varying vec3 vColor;
varying float vAlfa;
void main(){
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float tam = uTam * uEscala / -mv.z;
  float visible = max(tam, 2.0);
  vAlfa = min(1.0, (tam * tam) / (visible * visible));
  gl_PointSize = visible;
  gl_Position = projectionMatrix * mv;
}
`
const FRAG_ESTRELLAS = /* glsl */ `
uniform sampler2D uMapa;
uniform float uOpac;
varying vec3 vColor;
varying float vAlfa;
void main(){
  gl_FragColor = vec4(vColor, texture2D(uMapa, gl_PointCoord).a * uOpac * vAlfa);
}
`

// Nebulosa: nubes de ruido en un plano grande, con bordes que se desvanecen
const VERT_NEBULOSA = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`
const FRAG_NEBULOSA = /* glsl */ `
uniform vec3 uC1;
uniform vec3 uC2;
uniform float uT;
uniform float uOpac;
uniform vec2 uSemilla;
varying vec2 vUv;
${RUIDO}
void main(){
  vec2 p = (vUv - 0.5) * vec2(3.2, 1.8) + uSemilla;
  float n = fbm(vec3(p * 1.1, uT * 0.015));
  float n2 = fbm(vec3(p * 2.4 + n, uT * 0.02 + 5.0));
  float mascara = smoothstep(0.5, 0.05, length((vUv - 0.5) * vec2(1.0, 1.25)));
  float d = smoothstep(-0.05, 0.75, n + 0.45 * n2) * mascara;
  vec3 col = mix(uC1, uC2, smoothstep(-0.3, 0.6, n2)) * d * uOpac;
  gl_FragColor = vec4(col, 1.0);
}
`

// Genera una nube de puntos a partir de una función que coloca cada uno
function crearPuntos(cantidad, colocar, uPixel, opacidad = 1) {
  const pos = new Float32Array(cantidad * 3)
  const col = new Float32Array(cantidad * 3)
  const tam = new Float32Array(cantidad)
  const v = new THREE.Vector3()
  const c = new THREE.Color()
  for (let i = 0; i < cantidad; i++) {
    tam[i] = colocar(i, v, c)
    pos.set([v.x, v.y, v.z], i * 3)
    col.set([c.r, c.g, c.b], i * 3)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
  geo.setAttribute('aTam', new THREE.BufferAttribute(tam, 1))
  const mat = new THREE.ShaderMaterial({
    uniforms: { uPixel, uOpac: { value: opacidad } },
    vertexShader: VERT_PUNTOS,
    fragmentShader: FRAG_PUNTOS,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  })
  return new THREE.Points(geo, mat)
}

export default function FondoEspacial({ activo = true }) {
  const montajeRef = useRef(null)
  const activoRef = useRef(activo)
  activoRef.current = activo

  useEffect(() => {
    const montaje = montajeRef.current
    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer
    try {
      // Sin antialias: la escena pasa por el posprocesado en un render target sin
      // multimuestreo, así que el del canvas nunca llegaba a la pantalla
      renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' })
    } catch {
      return // sin WebGL queda el fondo negro
    }
    // Equipos con menos recursos: se usan menos píxeles y menos partículas
    const bajo = esEquipoBajo(renderer)
    const factorPart = bajo ? 0.5 : 1
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, bajo ? 1 : 1.5))
    renderer.setClearColor(0x000000, 1)
    montaje.appendChild(renderer.domElement)

    const escena = new THREE.Scene()
    const camara = new THREE.PerspectiveCamera(FOV, 1, 0.1, 400)
    const luz = new THREE.Vector3(-0.7, 0.4, 0.6).normalize()
    const uPixel = { value: 600 }
    const uEscala = { value: 400 } // escala de tamaño de PointsMaterial: media altura en píxeles
    const liberar = []
    const actualizar = [] // funciones (t) => void para animar cada objeto

    const colMorado = new THREE.Color('#a66bff')
    const colAzul = new THREE.Color('#4a8cff')
    const colBlanco = new THREE.Color('#f2ecff')

    // Estrellas repartidas a lo largo de todo el recorrido (dan la sensación de viaje)
    const texEstrella = texturaEstrella()
    const zFinal = zEstacion(SECCIONES.length - 1) - 120
    const tonos = ['#ffffff', '#ffffff', '#cfe0ff', '#e6d8ff', '#fff2dc'].map((c) => new THREE.Color(c))
    const crearCapaEstrellas = (cantidad, tam, opacidad) => {
      const pos = new Float32Array(cantidad * 3)
      const col = new Float32Array(cantidad * 3)
      for (let i = 0; i < cantidad; i++) {
        // Fuera de un cilindro alrededor del recorrido de la cámara
        const ang = Math.random() * Math.PI * 2
        const r = rnd(9, 90)
        pos.set([Math.cos(ang) * r, Math.sin(ang) * r * 0.7, rnd(zFinal, 30)], i * 3)
        const c = tonos[Math.floor(Math.random() * tonos.length)]
        const b = rnd(0.4, 1)
        col.set([c.r * b, c.g * b, c.b * b], i * 3)
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
      const mat = new THREE.ShaderMaterial({
        uniforms: { uTam: { value: tam }, uEscala, uMapa: { value: texEstrella }, uOpac: { value: opacidad } },
        vertexShader: VERT_ESTRELLAS,
        fragmentShader: FRAG_ESTRELLAS,
        transparent: true,
        depthWrite: false
      })
      liberar.push(() => {
        geo.dispose()
        mat.dispose()
      })
      const capa = new THREE.Points(geo, mat)
      capa.renderOrder = -2
      return capa
    }
    escena.add(crearCapaEstrellas(Math.round(11000 * factorPart), 0.35, 0.85), crearCapaEstrellas(500, 0.5, 1))
    liberar.push(() => texEstrella.dispose())

    // Nebulosas de fondo, alternando lados.
    // Su shader de ruido es muy caro a pantalla completa (~40 ms por cuadro), así que
    // se dibuja una sola vez en una textura y el plano solo la muestra. (Refrescarla
    // por franjas dejaba cortes horizontales entre franjas de distinto instante.)
    // El movimiento lo da una deriva suave del plano.
    const geoNebulosa = new THREE.PlaneGeometry(1, 1)
    liberar.push(() => geoNebulosa.dispose())
    const camaraHorneado = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1)
    camaraHorneado.position.z = 0.5
    const escenaHorneado = new THREE.Scene()
    const quadHorneado = new THREE.Mesh(geoNebulosa)
    escenaHorneado.add(quadHorneado)
    const TEX_ANCHO = bajo ? 1024 : 1536
    const TEX_ALTO = Math.round(TEX_ANCHO * 0.5625)
    const nebulosas = [
      { x: -40, y: 10, z: -90, ancho: 150, c1: '#3b1d6e', c2: '#a66bff', semilla: [0.0, 0.0] },
      { x: 45, y: -12, z: -150, ancho: 170, c1: '#0f2a66', c2: '#4a8cff', semilla: [3.1, 1.7] },
      { x: -35, y: -5, z: -215, ancho: 160, c1: '#2a1450', c2: '#7d5cff', semilla: [7.2, 4.4] },
      { x: 40, y: 14, z: -275, ancho: 180, c1: '#10305e', c2: '#9d6bff', semilla: [1.9, 8.3] }
    ].map((n) => {
      const matRuido = new THREE.ShaderMaterial({
        uniforms: {
          uC1: { value: new THREE.Color(n.c1) },
          uC2: { value: new THREE.Color(n.c2) },
          uT: { value: 0 },
          uOpac: { value: 1 },
          uSemilla: { value: new THREE.Vector2(...n.semilla) }
        },
        vertexShader: VERT_NEBULOSA,
        fragmentShader: FRAG_NEBULOSA
      })
      // Media precisión para que los degradados oscuros no se vean en escalones
      const rt = new THREE.WebGLRenderTarget(TEX_ANCHO, TEX_ALTO, {
        type: THREE.HalfFloatType,
        depthBuffer: false
      })
      const mat = new THREE.MeshBasicMaterial({
        map: rt.texture,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        opacity: 0.55
      })
      const plano = new THREE.Mesh(geoNebulosa, mat)
      plano.scale.set(n.ancho, n.ancho * 0.56, 1)
      plano.position.set(n.x, n.y, n.z)
      plano.renderOrder = -1
      escena.add(plano)
      liberar.push(() => {
        mat.dispose()
        rt.dispose()
      })
      return { matRuido, rt, mat, plano, z: n.z }
    })

    // Dibuja la textura de cada nebulosa una vez; ya no hace falta el material de ruido
    nebulosas.forEach((n) => {
      quadHorneado.material = n.matRuido
      renderer.setRenderTarget(n.rt)
      renderer.render(escenaHorneado, camaraHorneado)
      n.matRuido.dispose()
    })
    renderer.setRenderTarget(null)

    actualizar.push((t) => {
      nebulosas.forEach((n, i) => {
        // Se desvanece al acercarse para que la cámara nunca atraviese el borde del plano
        const distancia = camara.position.z - n.z
        n.mat.opacity = 0.55 * THREE.MathUtils.smoothstep(distancia, 12, 45)
        n.plano.visible = n.mat.opacity > 0.001
        n.plano.rotation.z = Math.sin(t * 0.03 + i * 1.7) * 0.05
      })
    })

    const texBrillo = texturaBrillo()
    liberar.push(() => texBrillo.dispose())
    const crearResplandor = (color, escala, opacidad = 1) => {
      const mat = new THREE.SpriteMaterial({
        map: texBrillo,
        color: new THREE.Color(color),
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        opacity: opacidad
      })
      const s = new THREE.Sprite(mat)
      s.scale.setScalar(escala)
      liberar.push(() => mat.dispose())
      return s
    }
    const agregarPuntos = (puntos) => {
      liberar.push(() => {
        puntos.geometry.dispose()
        puntos.material.dispose()
      })
      return puntos
    }

    // Cada estación vive en su propio grupo, que solo aparece cuando la cámara se
    // acerca a esa sección (así no se ven objetos lejanos detrás del texto)
    const estaciones = SECCIONES.map(() => {
      const g = new THREE.Group()
      escena.add(g)
      return g
    })

    // 0) Remanente del choque: estrella nueva con disco de acreción en espiral
    {
      const grupo = new THREE.Group()
      grupo.position.set(12, 1.5, zEstacion(0) - 26)
      grupo.scale.setScalar(0.85)
      const disco = new THREE.Group()
      disco.rotation.set(1.15, 0, 0.35)
      disco.add(
        agregarPuntos(
          crearPuntos(Math.round(9000 * factorPart), (i, v, c) => {
            const brazo = i % 2
            const r = 1.2 + Math.pow(Math.random(), 1.4) * 9
            const ang = brazo * Math.PI + r * 0.55 + rnd(-0.35, 0.35)
            v.set(Math.cos(ang) * r, rnd(-0.12, 0.12) * (1 + r * 0.05), Math.sin(ang) * r)
            c.copy(colBlanco).lerp(brazo ? colAzul : colMorado, clamp((r - 1.2) / 5))
            return rnd(0.05, 0.16)
          }, uPixel)
        )
      )
      grupo.add(disco, crearResplandor('#ffffff', 7), crearResplandor('#b48cff', 16, 0.6))
      estaciones[0].add(grupo)
      actualizar.push((t) => (disco.rotation.y = -t * 0.12))
    }

    // 1) Planeta de magma violeta
    {
      const p = crearPlanetaMagma({ radio: 3.2, paleta: 'morado', semilla: [2, 5, 1], luz, renderer })
      p.grupo.position.set(-9, -1.5, zEstacion(1) - 22)
      estaciones[1].add(p.grupo)
      liberar.push(p.liberar)
      actualizar.push((t) => {
        p.uniforms.uTiempo.value = t
        p.cuerpo.rotation.y = t * 0.08
      })
    }

    // 2) Planeta azul con anillo de partículas
    {
      const p = crearPlanetaMagma({ radio: 2.3, paleta: 'azul', semilla: [4, 1, 7], luz, renderer })
      const grupo = new THREE.Group()
      grupo.position.set(9, 1, zEstacion(2) - 22)
      const anillo = agregarPuntos(
        crearPuntos(Math.round(5000 * factorPart), (i, v, c) => {
          const r = rnd(3.3, 5.6)
          const ang = Math.random() * Math.PI * 2
          v.set(Math.cos(ang) * r, rnd(-0.05, 0.05), Math.sin(ang) * r)
          c.copy(colAzul).lerp(colBlanco, Math.random() * 0.6).multiplyScalar(rnd(0.4, 1))
          return rnd(0.04, 0.1)
        }, uPixel)
      )
      const inclinacion = new THREE.Group()
      inclinacion.rotation.set(0.45, 0, -0.3)
      inclinacion.add(p.grupo, anillo)
      grupo.add(inclinacion)
      estaciones[2].add(grupo)
      liberar.push(p.liberar)
      actualizar.push((t) => {
        p.uniforms.uTiempo.value = t
        p.cuerpo.rotation.y = t * 0.1
        anillo.rotation.y = t * 0.05
      })
    }

    // 3) Galaxia espiral
    {
      const galaxia = agregarPuntos(
        crearPuntos(Math.round(15000 * factorPart), (i, v, c) => {
          const brazos = 3
          const brazo = i % brazos
          const r = Math.pow(Math.random(), 1.8) * 13 + 0.2
          const ang = (brazo / brazos) * Math.PI * 2 + r * 0.42
          const dispersion = (0.3 + r * 0.06) * Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? -1 : 1)
          v.set(Math.cos(ang) * r + dispersion, rnd(-0.25, 0.25) * Math.exp(-r * 0.15), Math.sin(ang) * r + dispersion)
          c.set('#fff1e0').lerp(brazo === 1 ? colAzul : colMorado, clamp(r / 7))
          return rnd(0.06, 0.2)
        }, uPixel)
      )
      const grupo = new THREE.Group()
      grupo.position.set(-12, 0, zEstacion(3) - 26)
      grupo.rotation.set(1.0, 0, -0.4)
      grupo.add(galaxia, crearResplandor('#ffe9d6', 6, 0.9))
      estaciones[3].add(grupo)
      actualizar.push((t) => (galaxia.rotation.y = t * 0.04))
    }

    // 4) Dos estrellas que orbitan (eco de la intro)
    {
      const grupo = new THREE.Group()
      grupo.position.set(11, 3.5, zEstacion(4) - 22)
      grupo.rotation.set(0.35, 0, 0.15)
      const a = crearPlanetaMagma({ radio: 0.9, paleta: 'morado', semilla: [1, 1, 1], luz, renderer, calor: 1.8 })
      const b = crearPlanetaMagma({ radio: 0.9, paleta: 'azul', semilla: [6, 2, 3], luz, renderer, calor: 1.8 })
      grupo.add(a.grupo, b.grupo, crearResplandor('#9d8bff', 9, 0.35))
      estaciones[4].add(grupo)
      liberar.push(a.liberar, b.liberar)
      actualizar.push((t) => {
        const ang = t * 0.9
        a.grupo.position.set(Math.cos(ang) * 2.2, 0, Math.sin(ang) * 2.2)
        b.grupo.position.set(-Math.cos(ang) * 2.2, 0, -Math.sin(ang) * 2.2)
        a.uniforms.uTiempo.value = t
        b.uniforms.uTiempo.value = t
      })
    }

    // 5) Horizonte de un planeta gigante, al llegar a contacto.
    // Sube a medida que se baja por la última sección, para quedar siempre por
    // debajo del formulario (subida: 0 al entrar en contacto, 1 al final de la página)
    const horizonte = { subida: 0 }
    {
      const p = crearPlanetaMagma({ radio: 30, paleta: 'azul', semilla: [9, 3, 5], luz: new THREE.Vector3(0, 1, 0.3).normalize(), renderer, fuerzaAtmos: 2.2, calor: 0.7 })
      p.grupo.position.set(0, -43, zEstacion(5) - 30)
      estaciones[5].add(p.grupo)
      liberar.push(p.liberar)
      actualizar.push((t) => {
        p.uniforms.uTiempo.value = t
        p.cuerpo.rotation.y = t * 0.02
        p.grupo.position.y = -43 - 7 * (1 - horizonte.subida)
      })
    }

    estaciones.forEach((g) =>
      g.children.forEach((hijo) => {
        hijo.userData.escala = hijo.scale.x
        hijo.userData.x = hijo.position.x
      })
    )

    // Posprocesado (sin bloom en móvil para ahorrar batería)
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(escena, camara))
    if (!bajo) composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.75, 0.45, 0.55))
    composer.addPass(new OutputPass())

    // Los shaders de las estaciones se compilan ya, no la primera vez que aparecen
    // (si no, al llegar a cada sección el scroll se trababa mientras compilaba)
    renderer.compile(escena, camara)

    // Progreso del scroll medido en secciones (0 = inicio, 5 = contacto)
    let anclas = []
    let maxScroll = 1
    const medirAnclas = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      anclas = SECCIONES.map((id) => {
        const el = document.getElementById(id)
        if (!el) return null
        return Math.min(maxScroll, el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.2)
      }).filter((a) => a !== null)
      anclas[0] = 0
    }
    const progresoScroll = () => {
      const y = window.scrollY
      for (let i = anclas.length - 1; i >= 0; i--) {
        if (y >= anclas[i]) {
          if (i === anclas.length - 1) return i
          // Mientras se lee la sección la cámara se queda en su objeto; viaja al
          // siguiente solo en el último tramo, cuando ya entra la sección nueva
          const tramo = anclas[i + 1] - anclas[i]
          const viaje = Math.min(tramo, window.innerHeight * 0.9)
          return i + (viaje > 0 ? clamp((y - (anclas[i + 1] - viaje)) / viaje) : 1)
        }
      }
      return 0
    }

    const ajustar = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      composer.setSize(w, h)
      camara.aspect = w / h
      camara.updateProjectionMatrix()
      uPixel.value = (h * renderer.getPixelRatio()) / (2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)))
      uEscala.value = (h * renderer.getPixelRatio()) / 2
      medirAnclas()
    }
    ajustar()
    window.addEventListener('resize', ajustar)
    // El contenido cambia de alto (imágenes, idioma): se vuelven a medir las anclas
    const observador = new ResizeObserver(medirAnclas)
    observador.observe(document.body)

    // Parallax suave con el mouse
    const mouse = { x: 0, y: 0 }
    // En reposo (sin scroll ni mouse) se dibuja a la mitad de cuadros: las
    // rotaciones son tan lentas que no se nota y la GPU trabaja la mitad
    let ultimaActividad = 0
    const alActuar = () => (ultimaActividad = performance.now())
    const alMover = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
      alActuar()
    }
    window.addEventListener('pointermove', alMover, { passive: true })
    window.addEventListener('scroll', alActuar, { passive: true })

    let s = progresoScroll()
    const cam = { x: 0, y: 0 }
    let raf = 0
    let anterior = 0
    let saltar = false
    const objetivo = new THREE.Vector3()

    const intervalo = bajo ? 1000 / 30 : 0
    let ultimoCuadro = 0
    const frame = (ahora) => {
      raf = requestAnimationFrame(frame)
      if (!activoRef.current) return
      if (ahora - ultimoCuadro < intervalo) return
      ultimoCuadro = ahora
      const destino = progresoScroll()
      // Solo baja a medio ritmo cuando la cámara ya terminó de deslizarse
      if (ahora - ultimaActividad > 1500 && Math.abs(destino - s) < 0.002) {
        saltar = !saltar
        if (saltar) return
      }
      const dt = anterior ? Math.min(0.05, (ahora - anterior) / 1000) : 0.016
      anterior = ahora
      const t = reducirMovimiento ? 0 : ahora / 1000

      // La cámara sigue al scroll con suavizado
      s += (destino - s) * (1 - Math.exp(-dt * 3.5))
      const ultima = anclas[anclas.length - 1] ?? maxScroll
      const subida = clamp((window.scrollY - ultima) / Math.max(1, maxScroll - ultima))
      horizonte.subida += (subida - horizonte.subida) * (1 - Math.exp(-dt * 3.5))
      cam.x += (mouse.x * 1.2 - cam.x) * (1 - Math.exp(-dt * 2))
      cam.y += (-mouse.y * 0.7 - cam.y) * (1 - Math.exp(-dt * 2))
      camara.position.set(cam.x, cam.y, -s * ESPACIO)
      objetivo.set(cam.x * 0.4, cam.y * 0.4, -s * ESPACIO - 30)
      camara.lookAt(objetivo)

      // Cada estación crece al acercarse y se encoge cuando ya quedó atrás
      estaciones.forEach((g, i) => {
        const d = s - i
        // El planeta gigante de contacto sube desde abajo al centro: aparece más tarde
        // para no quedar detrás del texto de metodología
        const [desde, hasta] = i === SECCIONES.length - 1 ? [-0.55, -0.15] : [-1.25, -0.6]
        const f = THREE.MathUtils.smoothstep(d, desde, hasta) * (1 - THREE.MathUtils.smoothstep(d, 0.9, 1.6))
        g.visible = f > 0.002
        // Cada grupo escala alrededor de su propio centro
        // Mientras está lejos, el objeto se corre hacia el borde de su lado: así entra
        // desde afuera y no pasa por el centro, detrás del texto de la sección actual
        const lejos = Math.max(0, -d)
        g.children.forEach((hijo) => {
          hijo.scale.setScalar((hijo.userData.escala ?? 1) * Math.max(f, 0.002))
          hijo.position.x = hijo.userData.x * (1 + 5 * lejos)
        })
      })

      actualizar.forEach((fn) => fn(t))
      composer.render(dt)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      observador.disconnect()
      window.removeEventListener('scroll', alActuar)
      window.removeEventListener('resize', ajustar)
      window.removeEventListener('pointermove', alMover)
      liberar.forEach((fn) => fn())
      composer.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={montajeRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />
}
