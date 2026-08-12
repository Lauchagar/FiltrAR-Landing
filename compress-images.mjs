// compress-images.mjs
// Comprime el hero y todas las imágenes de productos usando sharp.
// Hace backup de los originales en public/_originals/ antes de reemplazar.

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC = path.join(__dirname, 'public')
const OUT_DIR = path.join(PUBLIC, '_compressed') // carpeta de salida — no toca los originales

// ── Configuración ────────────────────────────────────────────────────────────
// quality: 1-100. 75-80 es el punto dulce calidad/peso.
// width: redimensiona si la imagen es más ancha (null = no redimensionar)
const TARGETS = [
  {
    src: path.join(PUBLIC, 'hero.webp'),
    dest: path.join(OUT_DIR, 'hero.webp'),
    quality: 75,
    width: 1400,   // el hero se muestra a max ~700px en desktop × 2x DPR
    label: 'hero.webp',
  },
]

// Agrega todas las imágenes de productos
const productosDir = path.join(PUBLIC, 'productos')
for (const carpeta of fs.readdirSync(productosDir)) {
  const dir = path.join(productosDir, carpeta)
  if (!fs.statSync(dir).isDirectory()) continue
  for (const file of fs.readdirSync(dir)) {
    if (!/\.(webp|jpg|jpeg|png)$/i.test(file)) continue
    const fullPath = path.join(dir, file)
    TARGETS.push({
      src: fullPath,
      dest: path.join(OUT_DIR, 'productos', carpeta, file),
      quality: 78,
      width: 900,   // las cards se muestran a max ~450px × 2x DPR
      label: path.join('productos', carpeta, file),
    })
  }
}

// ── Utilidades ───────────────────────────────────────────────────────────────
function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`
}

// ── Main ─────────────────────────────────────────────────────────────────────
let totalAntes = 0
let totalDespues = 0

// Crea la carpeta de salida
fs.mkdirSync(OUT_DIR, { recursive: true })

console.log('\n🖼️  Comprimiendo imágenes...\n')
console.log('─'.repeat(70))
console.log(`${'Archivo'.padEnd(40)} ${'Antes'.padStart(9)} ${'Después'.padStart(9)} ${'Ahorro'.padStart(8)}`)
console.log('─'.repeat(70))

for (const target of TARGETS) {
  const sizeBefore = fs.statSync(target.src).size
  totalAntes += sizeBefore

  // Crea subcarpeta de destino si no existe
  fs.mkdirSync(path.dirname(target.dest), { recursive: true })

  try {
    // Procesamiento con sharp
    const pipeline = sharp(target.src, { failOnError: false })

    if (target.width) {
      pipeline.resize(target.width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
    }

    const ext = path.extname(target.src).toLowerCase()
    if (ext === '.webp') {
      pipeline.webp({ quality: target.quality, effort: 4 })
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline.jpeg({ quality: target.quality, mozjpeg: true })
    } else if (ext === '.png') {
      pipeline.png({ quality: target.quality, compressionLevel: 9 })
    }

    // Escribe directamente al destino (evita rename que falla en Windows con archivos bloqueados)
    const buffer = await pipeline.toBuffer()
    fs.writeFileSync(target.dest, buffer)

    const sizeAfter = fs.statSync(target.dest).size
    totalDespues += sizeAfter

    const ahorro = ((1 - sizeAfter / sizeBefore) * 100).toFixed(0)
    const emoji = Number(ahorro) >= 80 ? '🟢' : Number(ahorro) >= 50 ? '🟡' : '🔴'
    console.log(
      `${emoji} ${target.label.padEnd(38)} ${formatKB(sizeBefore).padStart(9)} ${formatKB(sizeAfter).padStart(9)} ${`-${ahorro}%`.padStart(8)}`
    )
  } catch (err) {
    totalDespues += sizeBefore // cuenta el original si falló
    console.log(`❌ ${target.label.padEnd(38)} ${formatKB(sizeBefore).padStart(9)} ${'(error)'.padStart(9)} ${'—'.padStart(8)}  ${err.message}`)
  }
}

console.log('─'.repeat(70))
console.log(
  `${'TOTAL'.padEnd(40)} ${formatKB(totalAntes).padStart(9)} ${formatKB(totalDespues).padStart(9)} ${`-${((1 - totalDespues / totalAntes) * 100).toFixed(0)}%`.padStart(8)}`
)
console.log('\n✅ Listo. Imágenes comprimidas en public/_compressed/')
console.log('   Revisalas y cuando estés conforme copiá el contenido a public/ reemplazando los originales.\n')
