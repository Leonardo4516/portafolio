import * as THREE from 'three'

// Shaders y texturas compartidos entre la intro y el fondo espacial del portafolio

// Ruido simplex 3D (Ashima Arts / Stefan Gustavson, licencia MIT) + fbm
export const RUIDO = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p){
  float v=0.0;float a=0.5;
  for(int i=0;i<5;i++){v+=a*snoise(p);p*=2.02;a*=0.5;}
  return v;
}
vec3 lin(vec3 c){return pow(c,vec3(2.2));}
`

export const VERT_PLANETA = /* glsl */ `
varying vec3 vObj;
varying vec3 vNormal;
varying vec3 vWorld;
void main(){
  vObj = normalize(position);
  vNormal = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`

// Magma: corteza oscura con grietas incandescentes que laten (paleta por uniforms)
const UNIFORMS_MAGMA = /* glsl */ `
uniform vec3 uLuz;
uniform float uTiempo;
uniform float uCalor;
uniform vec3 uSemilla;
uniform vec3 uCorteza1;
uniform vec3 uCorteza2;
uniform vec3 uBrillo1;
uniform vec3 uBrillo2;
uniform vec3 uBorde;
varying vec3 vObj;
varying vec3 vNormal;
varying vec3 vWorld;
${RUIDO}
`
// Desplazamiento del dominio (q - p) y relieve base: no cambian con el tiempo
const CAMPO_MAGMA = /* glsl */ `
vec4 campoMagma(vec3 p){
  vec3 desvio = 0.35 * vec3(fbm(p + 1.7), fbm(p + 9.2), fbm(p + 4.4));
  return vec4(desvio, fbm((p + desvio) * 1.3));
}
`
// Grietas animadas e iluminación, a partir de q y base
const COLOR_MAGMA = /* glsl */ `
  // El ruido puede pasarse apenas de ±1: sin el max, pow recibe una base negativa,
  // da NaN y el bloom lo esparce en rectángulos negros por la pantalla
  float ridge = max(1.0 - abs(snoise(q * 2.4 + uTiempo * 0.05)), 0.0);
  float grietas = pow(ridge, 10.0) + 0.5 * pow(max(1.0 - abs(snoise(q * 5.0)), 0.0), 14.0);
  float pulso = 0.85 + 0.15 * sin(uTiempo * 2.0 + base * 6.0);

  vec3 corteza = mix(uCorteza1, uCorteza2, smoothstep(-0.4, 0.5, base));
  vec3 brillo = mix(uBrillo1, uBrillo2, clamp(grietas, 0.0, 1.0));

  vec3 N = normalize(vNormal);
  vec3 V = normalize(cameraPosition - vWorld);
  float dif = max(dot(N, uLuz), 0.0);
  float fres = pow(clamp(1.0 - dot(N, V), 0.0, 1.0), 3.0);

  vec3 col = corteza * (0.2 + 1.3 * dif);
  col += brillo * grietas * 2.1 * pulso * uCalor;
  col += uBorde * fres * (0.1 + 0.6 * dif);
  gl_FragColor = vec4(col, 1.0);
`
export const FRAG_MAGMA = /* glsl */ `
${UNIFORMS_MAGMA}
${CAMPO_MAGMA}
void main(){
  vec3 p = vObj * 1.6 + uSemilla;
  vec4 campo = campoMagma(p);
  vec3 q = p + campo.xyz;
  float base = campo.w;
${COLOR_MAGMA}
}
`

// Variante para el fondo: la parte fija (20 de las 22 evaluaciones de ruido) se lee
// de una textura horneada una vez; por píxel solo quedan las grietas animadas
const VERT_PLANETA_HORNEADO = /* glsl */ `
varying vec3 vObj;
varying vec3 vNormal;
varying vec3 vWorld;
varying vec2 vUv;
void main(){
  vObj = normalize(position);
  vNormal = normalize(mat3(modelMatrix) * normal);
  vUv = uv;
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`
const FRAG_MAGMA_HORNEADO = /* glsl */ `
${UNIFORMS_MAGMA}
uniform sampler2D uCampo;
varying vec2 vUv;
void main(){
  vec3 p = vObj * 1.6 + uSemilla;
  vec4 campo = texture2D(uCampo, vUv);
  vec3 q = p + campo.xyz;
  float base = campo.w;
${COLOR_MAGMA}
}
`
// Hornea el campo en las coordenadas uv de la esfera (misma convención que SphereGeometry)
const VERT_HORNEO = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`
const FRAG_HORNEO = /* glsl */ `
uniform vec3 uSemilla;
varying vec2 vUv;
${RUIDO}
${CAMPO_MAGMA}
void main(){
  float u = vUv.x * 6.28318530718;
  float v = (1.0 - vUv.y) * 3.14159265359;
  vec3 dir = vec3(-cos(u) * sin(v), cos(v), sin(u) * sin(v));
  gl_FragColor = campoMagma(dir * 1.6 + uSemilla);
}
`
function hornearCampoMagma(renderer, semilla) {
  const rt = new THREE.WebGLRenderTarget(1024, 512, { type: THREE.HalfFloatType, depthBuffer: false })
  rt.texture.wrapS = THREE.RepeatWrapping
  const geo = new THREE.PlaneGeometry(2, 2)
  const mat = new THREE.ShaderMaterial({ uniforms: { uSemilla: { value: semilla } }, vertexShader: VERT_HORNEO, fragmentShader: FRAG_HORNEO })
  const escena = new THREE.Scene()
  escena.add(new THREE.Mesh(geo, mat))
  const previo = renderer.getRenderTarget()
  renderer.setRenderTarget(rt)
  renderer.render(escena, new THREE.Camera())
  renderer.setRenderTarget(previo)
  geo.dispose()
  mat.dispose()
  return rt
}

// Atmósfera: halo con efecto fresnel en una esfera algo mayor (cara trasera)
export const VERT_ATMOS = /* glsl */ `
varying vec3 vNormal;
varying vec3 vWorld;
void main(){
  vNormal = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`
export const FRAG_ATMOS = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uLuz;
uniform float uFuerza;
varying vec3 vNormal;
varying vec3 vWorld;
void main(){
  vec3 N = normalize(vNormal);
  vec3 V = normalize(cameraPosition - vWorld);
  // Cara trasera: 0 en el borde exterior, máximo junto al contorno del planeta
  float borde = pow(smoothstep(0.0, 0.6, -dot(N, V)), 2.0);
  float lado = 0.3 + 0.7 * clamp(dot(N, uLuz) * 0.5 + 0.5, 0.0, 1.0);
  gl_FragColor = vec4(uColor * borde * lado * uFuerza, 1.0);
}
`

export function texturaBrillo() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.2, 'rgba(240,230,255,0.85)')
  grad.addColorStop(0.5, 'rgba(166,107,255,0.25)')
  grad.addColorStop(1, 'rgba(166,107,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 128, 128)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function texturaEstrella() {
  const c = document.createElement('canvas')
  c.width = c.height = 32
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.3, 'rgba(255,255,255,0.5)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 32, 32)
  return new THREE.CanvasTexture(c)
}

// Paletas de magma (en sRGB) usadas por los planetas
const srgb = (r, g, b) => new THREE.Color().setRGB(r, g, b, THREE.SRGBColorSpace)
export const PALETAS_MAGMA = {
  morado: {
    corteza: [srgb(0.06, 0.03, 0.11), srgb(0.32, 0.17, 0.48)],
    brillo: [srgb(0.62, 0.25, 1.0), srgb(1.0, 0.78, 1.0)],
    borde: srgb(0.72, 0.5, 1.0),
    atmosfera: '#a66bff'
  },
  azul: {
    corteza: [srgb(0.02, 0.05, 0.13), srgb(0.12, 0.25, 0.52)],
    brillo: [srgb(0.2, 0.5, 1.0), srgb(0.78, 0.93, 1.0)],
    borde: srgb(0.5, 0.72, 1.0),
    atmosfera: '#4a8cff'
  }
}

// Planeta de magma con atmósfera; devuelve el grupo y cómo actualizarlo/liberarlo.
// Con `renderer`, la parte fija del magma se hornea en una textura (mucho más barato)
export function crearPlanetaMagma({ radio, paleta, semilla = [0, 0, 0], luz, fuerzaAtmos = 1.6, calor = 1, renderer }) {
  const p = PALETAS_MAGMA[paleta]
  const geo = new THREE.SphereGeometry(1, 64, 64)
  const vSemilla = new THREE.Vector3(...semilla)
  const campo = renderer ? hornearCampoMagma(renderer, vSemilla) : null
  const uniforms = {
    uLuz: { value: luz },
    uTiempo: { value: 0 },
    uCalor: { value: calor },
    uSemilla: { value: vSemilla },
    uCampo: { value: campo?.texture ?? null },
    uCorteza1: { value: p.corteza[0] },
    uCorteza2: { value: p.corteza[1] },
    uBrillo1: { value: p.brillo[0] },
    uBrillo2: { value: p.brillo[1] },
    uBorde: { value: p.borde }
  }
  const matCuerpo = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: campo ? VERT_PLANETA_HORNEADO : VERT_PLANETA,
    fragmentShader: campo ? FRAG_MAGMA_HORNEADO : FRAG_MAGMA
  })
  const matAtmos = new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(p.atmosfera) }, uLuz: { value: luz }, uFuerza: { value: fuerzaAtmos } },
    vertexShader: VERT_ATMOS,
    fragmentShader: FRAG_ATMOS,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  })
  const grupo = new THREE.Group()
  const cuerpo = new THREE.Mesh(geo, matCuerpo)
  cuerpo.scale.setScalar(radio)
  const atmos = new THREE.Mesh(geo, matAtmos)
  atmos.scale.setScalar(radio * 1.15)
  grupo.add(cuerpo, atmos)
  return {
    grupo,
    cuerpo,
    uniforms,
    liberar: () => {
      geo.dispose()
      matCuerpo.dispose()
      matAtmos.dispose()
      campo?.dispose()
    }
  }
}
