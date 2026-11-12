import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { useLanguage } from '../context/LanguageContext'
import {
  VERT_PLANETA,
  FRAG_MAGMA,
  VERT_ATMOS,
  FRAG_ATMOS,
  texturaBrillo,
  texturaEstrella
} from './espacio/compartido'

// Intro "Big Bang" en 3D (three.js):
// 0) Espacio en reposo con un aviso; empieza al hacer clic o presionar una tecla.
// 1) Dos mundos de magma (violeta y azul) entran desde los lados ya girando
//    uno alrededor del otro, en una espiral que se cierra cada vez más rápido.
// 2) Giran sobre su eje mientras orbitan.
// 3) Al tocarse la cámara se aleja de golpe: todo se comprime hacia el centro.
// 4) Estallan como dos supernovas que crecen poco a poco, y un destello nace en
//    el centro y crece hasta cubrir la pantalla.
// 5) El destello se desvanece poco a poco y deja ver el portafolio.
// Solo se muestra en la primera visita de la sesión y se puede saltar.

const SEEN_KEY = 'intro-visto'
// En false la intro se muestra en cada recarga (útil para revisarla)
const SOLO_UNA_VEZ = true
const T_IMPACT = 5.4
// Compresión tras el contacto y luego la explosión
const T_COMPRIME = 1.5
// Fracción de T_COMPRIME que tarda en contraerse; el resto se queda comprimido
const CONTRAE = 0.45
const T_EXPLOSION = T_IMPACT + T_COMPRIME
// El destello empieza DESTELLO_INICIO s después de la explosión y cubre la
// pantalla en T_DESTELLO s; ahí termina la escena
const DESTELLO_INICIO = 0.05
const T_DESTELLO = 1.4
const T_END = T_EXPLOSION + DESTELLO_INICIO + T_DESTELLO
const FADE_MS = 1600
const MAX_MS = 12000

const R_PLANETA = 1.25
// Velocidad angular de la espiral: empieza en W0 y sube hasta W1 en el choque
const W0 = 3.0
const W1 = 22.0
const N_PARTICULAS = 2600
// Campo de visión normal y apertura extra en la compresión (zoom out de todo)
const FOV_BASE = 40
const FOV_COMPRIME = 34

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const easeIn = (t) => t * t * t
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const rnd = (a, b) => a + Math.random() * (b - a)

function yaVisto() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

function marcarVisto() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    /* almacenamiento bloqueado: no pasa nada */
  }
}

// Tejido del espacio-tiempo: se hunde bajo cada planeta y forma brazos en espiral
// que giran con la órbita; tras el choque una onda lo recorre y se aplana.
const VERT_TELA = /* glsl */ `
uniform vec2 uA;
uniform vec2 uB;
uniform float uMA;
uniform float uMB;
uniform float uFase;
uniform float uAmp;
uniform float uExpl;
varying vec3 vWorld;
varying vec3 vNormal;
varying vec2 vP;
varying float vOla;
float ola(vec2 p){
  float r = length(p);
  // Tras el choque la espiral sigue girando y se apaga despacio
  float calma = uExpl > 0.0 ? exp(-uExpl * 0.6) : 1.0;
  float espiral = sin(2.0 * (atan(p.y, p.x) - uFase) + r * 1.5) * uAmp * smoothstep(0.6, 3.5, r) * exp(-r * 0.08);
  float choque = 0.0;
  if (uExpl > 0.0) {
    float frente = r - uExpl * 7.0;
    choque = sin(frente * 2.2) * exp(-frente * frente * 0.35) * 1.1 * exp(-uExpl * 0.5);
  }
  return espiral * calma + choque;
}
float altura(vec2 xy){
  vec2 p = vec2(xy.x, -xy.y);
  float calma = uExpl > 0.0 ? exp(-uExpl * 2.5) : 1.0;
  float pozos = -uMA / sqrt(dot(p - uA, p - uA) + 0.7) - uMB / sqrt(dot(p - uB, p - uB) + 0.5);
  return pozos * calma + ola(p);
}
void main(){
  vec2 xy = position.xy;
  float h = altura(xy);
  // Normal analítica por diferencias finitas (sin facetas)
  const float e = 0.04;
  float hx = altura(xy + vec2(e, 0.0));
  float hy = altura(xy + vec2(0.0, e));
  vec3 n = normalize(vec3(-(hx - h) / e, -(hy - h) / e, 1.0));
  vNormal = normalize(mat3(modelMatrix) * n);
  vP = vec2(xy.x, -xy.y);
  vOla = ola(vP);
  vec4 w = modelMatrix * vec4(xy, h, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`
const FRAG_TELA = /* glsl */ `
uniform vec2 uA;
uniform vec2 uB;
uniform vec3 uColA;
uniform vec3 uColB;
uniform float uOpac;
varying vec3 vWorld;
varying vec3 vNormal;
varying vec2 vP;
varying float vOla;
vec3 lin(vec3 c){return pow(c,vec3(2.2));}
void main(){
  vec3 N = normalize(vNormal);
  vec3 V = normalize(cameraPosition - vWorld);
  vec3 L = normalize(vec3(-0.3, 1.0, 0.5));
  float dif = max(dot(N, L), 0.0);
  float esp = pow(max(dot(reflect(-L, N), V), 0.0), 30.0);
  float fres = pow(clamp(1.0 - dot(N, V), 0.0, 1.0), 2.0);
  float cresta = smoothstep(0.0, 0.5, vOla);
  // Sin reflejos puntuales en el fondo de los pozos
  esp *= (1.0 - exp(-dot(vP - uA, vP - uA) * 0.6)) * (1.0 - exp(-dot(vP - uB, vP - uB) * 0.8));

  vec3 col = mix(lin(vec3(0.0, 0.01, 0.03)), lin(vec3(0.02, 0.12, 0.25)), dif * dif);
  col += lin(vec3(0.35, 0.8, 1.0)) * (esp * 0.45 + cresta * 0.3);
  col += lin(vec3(0.15, 0.45, 0.85)) * fres * 0.2;
  // Reflejo del brillo de cada planeta sobre el tejido
  col += uColA * exp(-dot(vP - uA, vP - uA) * 0.2) * 0.6;
  col += uColB * exp(-dot(vP - uB, vP - uB) * 0.28) * 0.6;

  float r = length(vP);
  // Translúcido: se ven las estrellas a través y las crestas de las ondas resaltan más
  float alfa = pow(smoothstep(10.5, 2.5, r), 1.5) * uOpac * (0.24 + 0.3 * cresta + 0.18 * fres);
  gl_FragColor = vec4(col, alfa);
}
`

// Partículas de la explosión con tamaño y color propios
const VERT_PART = /* glsl */ `
attribute float aTam;
attribute vec3 aColor;
uniform float uPixel;
varying vec3 vColor;
void main(){
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aTam * uPixel / -mv.z;
  gl_Position = projectionMatrix * mv;
}
`
const FRAG_PART = /* glsl */ `
uniform float uAlfa;
varying vec3 vColor;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vColor * a * uAlfa * 1.6, 1.0);
}
`

export default function Intro({ onComplete, onRevelar }) {
  const montajeRef = useRef(null)
  const destelloRef = useRef(null)
  const [fading, setFading] = useState(false)
  const [visible, setVisible] = useState(true)
  const finished = useRef(false)
  const arrancarRef = useRef(null)
  const [esperando, setEsperando] = useState(true)
  const { t: textos } = useLanguage()

  const reducirMovimiento =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const terminar = () => {
    if (finished.current) return
    finished.current = true
    marcarVisto()
    setFading(true)
    onRevelar?.()
    setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, FADE_MS)
  }

  useEffect(() => {
    if ((SOLO_UNA_VEZ && yaVisto()) || reducirMovimiento) {
      finished.current = true
      marcarVisto()
      setVisible(false)
      onComplete?.()
      return
    }

    const montaje = montajeRef.current
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    } catch {
      // Sin WebGL: se salta la intro
      terminar()
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 1)
    montaje.appendChild(renderer.domElement)

    const escena = new THREE.Scene()
    const camara = new THREE.PerspectiveCamera(FOV_BASE, 1, 0.1, 200)
    let distancia = 11
    let orbitaInicial = 9

    const luz = new THREE.Vector3(-0.85, 0.35, 0.4).normalize()

    // Estrellas: muchas pequeñas y unas pocas grandes, con tonos blancos, azules y lilas
    const texEstrella = texturaEstrella()
    const tonosEstrella = ['#ffffff', '#ffffff', '#cfe0ff', '#e6d8ff', '#fff2dc'].map((c) => new THREE.Color(c))
    const crearEstrellas = (cantidad, tam, opacidad) => {
      const pos = new Float32Array(cantidad * 3)
      const col = new Float32Array(cantidad * 3)
      for (let i = 0; i < cantidad; i++) {
        const v = new THREE.Vector3().randomDirection().multiplyScalar(rnd(40, 80))
        pos.set([v.x, v.y, v.z], i * 3)
        const c = tonosEstrella[Math.floor(Math.random() * tonosEstrella.length)]
        const luz = rnd(0.4, 1)
        col.set([c.r * luz, c.g * luz, c.b * luz], i * 3)
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
      const mat = new THREE.PointsMaterial({
        size: tam,
        sizeAttenuation: true,
        map: texEstrella,
        vertexColors: true,
        transparent: true,
        opacity: opacidad,
        depthWrite: false
      })
      const capa = new THREE.Points(geo, mat)
      // Se dibujan primero para que se vean a través del tejido translúcido
      capa.renderOrder = -1
      return capa
    }
    const estrellas = new THREE.Group()
    estrellas.add(crearEstrellas(6000, 0.26, 0.85), crearEstrellas(260, 0.6, 1))
    escena.add(estrellas)

    // Plano de la órbita inclinado para que se vea la profundidad
    const sistema = new THREE.Group()
    sistema.rotation.x = 0.55
    sistema.rotation.z = -0.12
    escena.add(sistema)

    const geoPlaneta = new THREE.SphereGeometry(1, 96, 96)
    // Misma textura de magma para los dos, cada uno con su paleta (colores en sRGB)
    const srgb = (r, g, b) => new THREE.Color().setRGB(r, g, b, THREE.SRGBColorSpace)
    const uniformsMagma = (semilla, c1, c2, b1, b2, borde) => ({
      uLuz: { value: luz },
      uTiempo: { value: 0 },
      uCalor: { value: 1 },
      uSemilla: { value: new THREE.Vector3(...semilla) },
      uCorteza1: { value: c1 },
      uCorteza2: { value: c2 },
      uBrillo1: { value: b1 },
      uBrillo2: { value: b2 },
      uBorde: { value: borde }
    })
    const uMorado = uniformsMagma(
      [0, 0, 0],
      srgb(0.06, 0.03, 0.11), srgb(0.32, 0.17, 0.48),
      srgb(0.62, 0.25, 1.0), srgb(1.0, 0.78, 1.0),
      srgb(0.72, 0.5, 1.0)
    )
    const uAzul = uniformsMagma(
      [7.3, 2.1, 4.8],
      srgb(0.02, 0.05, 0.13), srgb(0.12, 0.25, 0.52),
      srgb(0.2, 0.5, 1.0), srgb(0.78, 0.93, 1.0),
      srgb(0.5, 0.72, 1.0)
    )
    const matMorado = new THREE.ShaderMaterial({ uniforms: uMorado, vertexShader: VERT_PLANETA, fragmentShader: FRAG_MAGMA })
    const matAzul = new THREE.ShaderMaterial({ uniforms: uAzul, vertexShader: VERT_PLANETA, fragmentShader: FRAG_MAGMA })

    const crearAtmosfera = (color, fuerza) =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(color) }, uLuz: { value: luz }, uFuerza: { value: fuerza } },
        vertexShader: VERT_ATMOS,
        fragmentShader: FRAG_ATMOS,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
      })
    const matAtmosMorado = crearAtmosfera('#a66bff', 2.1)
    const matAtmosAzul = crearAtmosfera('#4a8cff', 2.3)

    const morado = new THREE.Group()
    const moradoCuerpo = new THREE.Mesh(geoPlaneta, matMorado)
    moradoCuerpo.scale.setScalar(R_PLANETA)
    moradoCuerpo.rotation.z = 0.4
    const moradoAtmos = new THREE.Mesh(geoPlaneta, matAtmosMorado)
    moradoAtmos.scale.setScalar(R_PLANETA * 1.14)
    morado.add(moradoCuerpo, moradoAtmos)

    const azul = new THREE.Group()
    const azulCuerpo = new THREE.Mesh(geoPlaneta, matAzul)
    azulCuerpo.scale.setScalar(R_PLANETA)
    azulCuerpo.rotation.z = -0.35
    const azulAtmos = new THREE.Mesh(geoPlaneta, matAtmosAzul)
    azulAtmos.scale.setScalar(R_PLANETA * 1.15)
    azul.add(azulCuerpo, azulAtmos)
    sistema.add(morado, azul)

    const geoTela = new THREE.PlaneGeometry(36, 36, 300, 300)
    const uTela = {
      uA: { value: new THREE.Vector2() },
      uB: { value: new THREE.Vector2() },
      uMA: { value: 1.7 },
      uMB: { value: 1.2 },
      uFase: { value: 0 },
      uAmp: { value: 0 },
      uExpl: { value: -1 },
      uColA: { value: new THREE.Color('#a66bff') },
      uColB: { value: new THREE.Color('#4a8cff') },
      uOpac: { value: 1 }
    }
    const matTela = new THREE.ShaderMaterial({
      uniforms: uTela,
      vertexShader: VERT_TELA,
      fragmentShader: FRAG_TELA,
      transparent: true,
      side: THREE.DoubleSide
    })
    const tela = new THREE.Mesh(geoTela, matTela)
    tela.rotation.x = -Math.PI / 2
    tela.position.y = -0.5
    sistema.add(tela)

    // Explosión: núcleo brillante, onda de choque y partículas
    const texBrillo = texturaBrillo()
    const matNucleo = new THREE.SpriteMaterial({
      map: texBrillo,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      opacity: 0
    })
    const nucleo = new THREE.Sprite(matNucleo)
    nucleo.scale.setScalar(0.01)
    escena.add(nucleo)
    // Una supernova por planeta, cada una con su color
    const crearSupernova = (color) => {
      const mat = new THREE.SpriteMaterial({
        map: texBrillo,
        color: new THREE.Color(color).multiplyScalar(0.9),
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        opacity: 0
      })
      const sprite = new THREE.Sprite(mat)
      sprite.scale.setScalar(0.01)
      escena.add(sprite)
      return sprite
    }
    const novaMorada = crearSupernova('#a66bff')
    const novaAzul = crearSupernova('#4a8cff')

    const geoOnda = new THREE.RingGeometry(0.985, 1, 160)
    const matOnda = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#a66bff').multiplyScalar(2.2),
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      opacity: 0
    })
    const onda = new THREE.Mesh(geoOnda, matOnda)
    onda.rotation.x = -Math.PI / 2
    sistema.add(onda)
    const matOnda2 = matOnda.clone()
    matOnda2.color = new THREE.Color('#4a8cff').multiplyScalar(2.2)
    const onda2 = new THREE.Mesh(geoOnda, matOnda2)
    onda2.rotation.x = -Math.PI / 2 + 0.5
    onda2.rotation.y = 0.6
    sistema.add(onda2)

    const posPart = new Float32Array(N_PARTICULAS * 3)
    const velPart = new Float32Array(N_PARTICULAS * 3)
    const colPart = new Float32Array(N_PARTICULAS * 3)
    const tamPart = new Float32Array(N_PARTICULAS)
    const ladoPart = new Float32Array(N_PARTICULAS) // -1 morada, 1 azul, 0 centro
    const colMorado = new THREE.Color('#a66bff')
    const colAzul = new THREE.Color('#4a8cff')
    const blanco = new THREE.Color('#f2ecff')
    for (let i = 0; i < N_PARTICULAS; i++) {
      const d = new THREE.Vector3().randomDirection()
      d.y *= 0.45 // la materia sale sobre todo en el plano de la órbita
      const v = Math.pow(Math.random(), 0.6) * rnd(2, 11)
      velPart.set([d.x * v, d.y * v, d.z * v], i * 3)
      const tono = Math.random()
      const c = tono < 0.45 ? colMorado : tono < 0.85 ? colAzul : blanco
      ladoPart[i] = tono < 0.45 ? -1 : tono < 0.85 ? 1 : 0
      colPart.set([c.r, c.g, c.b], i * 3)
      tamPart[i] = Math.random() < 0.05 ? rnd(0.18, 0.3) : rnd(0.04, 0.14)
    }
    const geoPart = new THREE.BufferGeometry()
    geoPart.setAttribute('position', new THREE.BufferAttribute(posPart, 3))
    geoPart.setAttribute('aColor', new THREE.BufferAttribute(colPart, 3))
    geoPart.setAttribute('aTam', new THREE.BufferAttribute(tamPart, 1))
    const uPart = { uAlfa: { value: 1 }, uPixel: { value: 600 } }
    const matPart = new THREE.ShaderMaterial({
      uniforms: uPart,
      vertexShader: VERT_PART,
      fragmentShader: FRAG_PART,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    })
    const particulas = new THREE.Points(geoPart, matPart)
    particulas.visible = false
    sistema.add(particulas)

    // Posprocesado: bloom para el brillo de la morado, las atmósferas y la explosión
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(escena, camara))
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.85, 0.4, 0.6)
    composer.addPass(bloom)
    composer.addPass(new OutputPass())

    let altoPx = 1
    // Cambia el campo de visión; las partículas mantienen su tamaño en pantalla
    const ponerFov = (fov) => {
      camara.fov = fov
      camara.updateProjectionMatrix()
      uPart.uPixel.value = altoPx / (2 * Math.tan(THREE.MathUtils.degToRad(fov / 2)))
    }

    const ajustar = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const aspecto = w / h
      renderer.setSize(w, h)
      composer.setSize(w, h)
      camara.aspect = aspecto
      // En pantallas verticales la cámara se aleja para que quepa la órbita
      const tanMedio = Math.tan(THREE.MathUtils.degToRad(FOV_BASE / 2))
      altoPx = h * renderer.getPixelRatio()
      distancia = Math.max(11, 5.2 / (tanMedio * aspecto))
      ponerFov(camara.fov)
      // La espiral empieza con los planetas justo fuera de la pantalla
      orbitaInicial = distancia * 1.08 * tanMedio * aspecto + R_PLANETA * 2.6
    }
    ajustar()
    window.addEventListener('resize', ajustar)

    let explotado = false
    let raf = 0
    let inicio = 0
    let anterior = 0
    const centro = new THREE.Vector3()

    const explotar = () => {
      explotado = true
      morado.visible = false
      azul.visible = false
      particulas.visible = true
      posPart.fill(0)
    }

    // Hasta que la persona interactúa la escena se queda en t = 0 (solo estrellas)
    let seguro = 0
    arrancarRef.current = () => {
      if (inicio) return
      inicio = performance.now()
      seguro = setTimeout(terminar, MAX_MS)
      setEsperando(false)
    }

    const frame = (ahora) => {
      if (!anterior) anterior = ahora
      const t = inicio ? Math.max(0, (ahora - inicio) / 1000) : 0
      const dt = Math.min(0.05, (ahora - anterior) / 1000)
      anterior = ahora

      uMorado.uTiempo.value = t
      uAzul.uTiempo.value = t
      estrellas.rotation.y = ahora * 0.00001

      // Cámara: se acerca despacio y tiembla en el impacto
      const acercamiento = easeInOut(clamp(t / T_IMPACT))
      const z = distancia * (1.08 - 0.16 * acercamiento)
      let sx = 0
      let sy = 0
      if (t > T_EXPLOSION) {
        const fuerza = Math.max(0, 1 - (t - T_EXPLOSION) / 0.9) * 0.2
        sx = (Math.random() - 0.5) * fuerza
        sy = (Math.random() - 0.5) * fuerza
      }
      camara.position.set(sx, 0.6 + sy, z)
      camara.lookAt(centro)

      if (t < T_IMPACT) {
        // Espiral continua sin pausas: el radio se cierra y la velocidad angular
        // crece de W0 a W1 (theta es la integral de omega en el tiempo)
        const prog = clamp(t / T_IMPACT)
        const theta = T_IMPACT * (W0 * prog + ((W1 - W0) * prog * prog * prog) / 3)
        const rColision = R_PLANETA
        const rOrbita = rColision + (orbitaInicial - rColision) * Math.pow(1 - prog, 2)

        const dx = Math.cos(theta) * rOrbita
        const dz = Math.sin(theta) * rOrbita * 0.6
        morado.position.set(-dx, 0, -dz)
        azul.position.set(dx, 0, dz)
        uTela.uA.value.set(-dx, -dz)
        uTela.uB.value.set(dx, dz)
        uTela.uFase.value = theta
        uTela.uAmp.value = 0.12 + 0.55 * prog * prog
        // El tejido aparece poco a poco cuando ya están cerca
        uTela.uOpac.value = easeInOut(clamp((prog - 0.3) / 0.45))

        moradoCuerpo.rotation.y = t * 0.35
        azulCuerpo.rotation.y = t * 0.55
        // El magma se calienta a medida que se acercan
        uMorado.uCalor.value = 1 + prog * prog * 0.9
        uAzul.uCalor.value = uMorado.uCalor.value

      } else if (t < T_EXPLOSION) {
        // Compresión: los planetas se funden en el centro, se encogen y se
        // calientan; el tejido se hunde y la imagen entera se contrae
        const x = (t - T_IMPACT) / T_COMPRIME
        const c = easeIn(clamp(x / CONTRAE))
        // Mientras se mantiene comprimido, el punto de luz late cada vez más rápido
        const espera = clamp((x - CONTRAE) / (1 - CONTRAE))
        const latido = espera * 0.25 * Math.sin(espera * espera * 40)
        const theta = T_IMPACT * (W0 + (W1 - W0) / 3) + W1 * (t - T_IMPACT)
        const rOrbita = R_PLANETA * (1 - c)
        const dx = Math.cos(theta) * rOrbita
        const dz = Math.sin(theta) * rOrbita * 0.6
        morado.position.set(-dx, 0, -dz)
        azul.position.set(dx, 0, dz)
        morado.scale.setScalar(1 - 0.7 * c)
        azul.scale.setScalar(1 - 0.7 * c)
        uMorado.uCalor.value = 1.9 + 2.5 * c
        uAzul.uCalor.value = uMorado.uCalor.value
        uTela.uA.value.set(-dx, -dz)
        uTela.uB.value.set(dx, dz)
        uTela.uFase.value = theta
        uTela.uMA.value = 1.7 * (1 - 0.6 * c)
        uTela.uMB.value = 1.2 * (1 - 0.6 * c)
        ponerFov(FOV_BASE + FOV_COMPRIME * c + 8 * espera)
        // Brillo del núcleo que se forma
        nucleo.scale.setScalar(0.5 + 2.5 * c + latido * 3 + espera * 1.2)
        matNucleo.opacity = c
      } else {
        if (!explotado) explotar()
        const e = t - T_EXPLOSION
        uTela.uExpl.value = e
        // La espiral sigue girando a la velocidad final de la órbita
        uTela.uFase.value = T_IMPACT * (W0 + (W1 - W0) / 3) + W1 * (t - T_IMPACT)

        // Rebote: la cámara vuelve de golpe, se pasa un poco (zoom in) y se asienta
        const vuelta = Math.exp(-e * 9)
        ponerFov(FOV_BASE + (FOV_COMPRIME + 8) * vuelta - 7 * (1 - vuelta) * Math.exp(-e * 1.5))

        // Dos supernovas que crecen poco a poco, cada una desde su lado
        const crecer = 1 - Math.exp(-e * 1.1)
        const separar = 0.4 + 2.6 * crecer
        novaMorada.position.set(-separar, 0.05, 0)
        novaAzul.position.set(separar, -0.05, 0)
        novaMorada.scale.setScalar(1 + 13 * crecer)
        novaAzul.scale.setScalar(1 + 13 * crecer)
        novaMorada.material.opacity = clamp(e / 0.2)
        novaAzul.material.opacity = clamp(e / 0.2)
        // Núcleo blanco en el centro, que también crece
        // El núcleo blanco se apaga pronto para que se distingan las dos supernovas
        nucleo.scale.setScalar(3 + 3 * crecer)
        matNucleo.opacity = Math.exp(-e * 3)

        // Ondas de choque
        const ondaProg = easeOut(clamp(e / 1.8))
        onda.scale.setScalar(0.5 + ondaProg * 14)
        matOnda.opacity = clamp(1 - e / 1.8) * 0.9
        onda2.scale.setScalar(0.5 + easeOut(clamp(e / 2.2)) * 10)
        matOnda2.opacity = clamp(1 - e / 2.2) * 0.7

        // Partículas con frenado exponencial (posición exacta en función del tiempo)
        const recorrido = (0.75 * (1 - Math.exp(-1.1 * e))) / 1.1
        for (let i = 0; i < N_PARTICULAS; i++) {
          const k = i * 3
          posPart[k] = ladoPart[i] * separar + velPart[k] * recorrido
          posPart[k + 1] = velPart[k + 1] * recorrido
          posPart[k + 2] = velPart[k + 2] * recorrido
        }
        geoPart.attributes.position.needsUpdate = true
        uPart.uAlfa.value = clamp(1 - (e - 1.2) / 2)

        // Destello: nace en el centro del choque y crece hasta cubrir la pantalla
        if (destelloRef.current) {
          const escala = Math.pow(clamp((e - DESTELLO_INICIO) / T_DESTELLO), 1.6)
          destelloRef.current.style.transform = `translate(-50%, -50%) scale(${escala})`
        }
      }

      composer.render(dt)

      if (t < T_END) {
        raf = requestAnimationFrame(frame)
      } else {
        terminar()
      }
    }

    raf = requestAnimationFrame(frame)

    const alTeclear = () => arrancarRef.current?.()
    window.addEventListener('keydown', alTeclear)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(seguro)
      window.removeEventListener('resize', ajustar)
      window.removeEventListener('keydown', alTeclear)
      estrellas.children.forEach((capa) => {
        capa.geometry.dispose()
        capa.material.dispose()
      })
      texEstrella.dispose()
      geoPlaneta.dispose()
      matMorado.dispose()
      matAzul.dispose()
      matAtmosMorado.dispose()
      matAtmosAzul.dispose()
      texBrillo.dispose()
      matNucleo.dispose()
      novaMorada.material.dispose()
      novaAzul.material.dispose()
      geoOnda.dispose()
      matOnda.dispose()
      matOnda2.dispose()
      geoPart.dispose()
      geoTela.dispose()
      matTela.dispose()
      matPart.dispose()
      composer.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: FADE_MS / 1000, ease: 'easeInOut' }}
      onPointerDown={() => arrancarRef.current?.()}
      style={{ cursor: esperando ? 'pointer' : 'default' }}
    >
      <div ref={montajeRef} className="absolute inset-0" />
      <div
        ref={destelloRef}
        className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
        style={{
          width: 'max(300vw, 300vh)',
          height: 'max(300vw, 300vh)',
          transform: 'translate(-50%, -50%) scale(0)',
          background: 'radial-gradient(circle, #ffffff 0%, #ffffff 45%, rgba(240,236,255,0.9) 55%, rgba(240,236,255,0) 70%)'
        }}
      />

      <AnimatePresence>
        {esperando && (
          <motion.p
            key="aviso"
            className="absolute inset-x-0 bottom-[22%] px-6 text-center font-mono text-base sm:text-lg tracking-wide text-neutral-100 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.35, 1, 0.35] }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {textos.intro.start}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={terminar}
        className="absolute bottom-6 right-6 z-10 px-4 py-2 rounded-lg border border-violet-400/40 bg-black/60 text-violet-300 font-mono text-xs tracking-wide hover:border-violet-300 transition-colors cursor-pointer"
      >
        {textos.intro.skip}
      </button>
    </motion.div>
  )
}
