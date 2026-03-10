import { NextResponse } from 'next/server'
import { fetchProductos, toPublico } from '@/lib/baserow'

// Revalidar la caché cada 60 segundos (ISR en Vercel)
export const revalidate = 60

export async function GET() {
  try {
    const productos = await fetchProductos()
    // Mapear a ProductoPublico: Costo_Proveedor y Margen_Ganancia nunca salen
    const publicos = productos.map(toPublico)

    return NextResponse.json(publicos)
  } catch (error) {
    console.error('[/api/precios]', error)
    return NextResponse.json(
      { error: 'No se pudo obtener el catálogo. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
