import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import { fetchProductos, toPublico, ProductoPublico } from '@/lib/baserow'

const DESTACADOS_IDS = [1, 3, 5]
const IMAGEN_FALLBACK = '/productos/P001/chata17.webp'

function getImagenProducto(id: number): string {
  const carpeta = `P${String(id).padStart(3, '0')}`
  const dirPath = path.join(process.cwd(), 'public', 'productos', carpeta)
  try {
    const archivos = fs.readdirSync(dirPath).filter((f) => !f.startsWith('.'))
    if (archivos.length > 0) return `/productos/${carpeta}/${archivos[0]}`
  } catch {
    // carpeta no existe
  }
  return IMAGEN_FALLBACK
}

export default async function ModelosDestacados() {
  let destacados: ProductoPublico[] = []

  try {
    const raw = await fetchProductos()
    const todos = raw.map(toPublico)
    destacados = DESTACADOS_IDS
      .map((id) => todos.find((p) => p.id === id))
      .filter((p): p is ProductoPublico => p !== undefined)
  } catch {
    // Si falla, se renderiza vacío sin romper la página
  }

  if (destacados.length === 0) return null

  return (
    <section id="catalogo" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Modelos Destacados</h2>
            <p className="text-stone-500 mt-2">Los más elegidos por los clientes.</p>
          </div>
          <a
            href="/catalogo"
            className="text-brand-400 hover:text-brand-300 text-sm font-semibold flex items-center gap-1 transition-colors shrink-0"
          >
            Ver catálogo completo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destacados.map((producto) => {
              const imagen = getImagenProducto(producto.id)
            const waText = encodeURIComponent(
              `Hola! Me interesa la bombilla ${producto.nombre}. ¿Cuál es el precio por mayor?`
            )
            return (
              <div
                key={producto.id}
                className="product-card group bg-surface-800/60 border border-surface-600/50 rounded-2xl overflow-hidden card-glow transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-900/30 to-surface-800">
                  <Image
                    src={imagen}
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{producto.nombre}</h3>
                    <a
                      href={`https://wa.me/5491112345678?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-400 text-xs font-semibold hover:text-brand-300 transition-colors"
                    >
                      Cotizar →
                    </a>
                  </div>
                  <p className="text-stone-500 text-sm mt-2 leading-relaxed">{producto.descripcion}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/catalogo"
            className="inline-flex items-center gap-2 bg-brand-400 hover:bg-brand-500 text-surface-950 font-bold text-sm px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-400/25 hover:-translate-y-0.5 mb-6"
          >
            Ver catálogo completo y armar pedido
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-stone-500 text-sm">
            Tenemos <strong className="text-white">{destacados.length > 0 ? '6 modelos disponibles' : 'varios modelos'}</strong>. Pedí el catálogo completo
            y elegí los que mejor se vendan en tu zona.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 bg-surface-800/60 border border-surface-600/40 text-stone-500 text-xs px-4 py-2 rounded-full">
            <svg className="w-3.5 h-3.5 text-brand-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Todos los modelos son fabricados en{' '}
            <span className="text-stone-300 font-medium mx-1">acero inoxidable 304</span> apto alimentario
          </div>
        </div>
      </div>
    </section>
  )
}
