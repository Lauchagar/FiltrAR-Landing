import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { fetchProductos, toPublico, type ProductoPublico } from '@/lib/baserow'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import CatalogoCalculadora from '@/components/CatalogoCalculadora'

export const revalidate = 60

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

export default async function CatalogoPage() {
  let productos: ProductoPublico[] = []
  let error = false

  try {
    const raw = await fetchProductos()
    productos = raw.map(toPublico)
  } catch {
    error = true
  }

  const imagenes = Object.fromEntries(productos.map((p) => [p.id, getImagenProducto(p.id)]))

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-stone-500 hover:text-brand-400 text-sm transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al inicio
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold">
              Catálogo de{' '}
              <span className="text-brand-400">Bombillas</span>
            </h1>
            <p className="text-stone-400 text-lg mt-3 max-w-xl">
              Sumá las unidades que quieras de cada modelo. Mínimo 100 unidades en total para hacer el pedido.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-brand-400" />
              <span className="text-stone-500 text-sm">
                {productos.length} modelo{productos.length !== 1 ? 's' : ''} disponibles
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-medium">No se pudo cargar el catálogo.</p>
              <p className="text-stone-500 text-sm mt-1">Intentá de nuevo en unos segundos.</p>
            </div>
          )}

          {/* Grilla interactiva */}
          {!error && productos.length > 0 && (
            <CatalogoCalculadora productos={productos} imagenes={imagenes} />
          )}

          {!error && productos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-500 text-lg">No hay productos en el catálogo.</p>
            </div>
          )}

        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
