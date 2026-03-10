import { NextRequest, NextResponse } from 'next/server'
import { fetchProductos } from '@/lib/baserow'

interface ItemPedido {
  id: number
  nombre: string
  cantidad: number
  precioVisto: number
}

interface ItemActualizado extends ItemPedido {
  precioReal: number
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const items: ItemPedido[] = body?.items

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'El body debe contener un array "items" con al menos un elemento.' },
        { status: 400 }
      )
    }

    // Fetch fresco — sin caché para garantizar precios del instante exacto
    const productos = await fetchProductos()
    const mapaPrecios = new Map(productos.map((p) => [p.id, Number(p.Precio_Venta)]))

    const itemsDesactualizados: ItemActualizado[] = []

    for (const item of items) {
      const precioReal = mapaPrecios.get(item.id)

      if (precioReal === undefined) {
        return NextResponse.json(
          { error: `El producto con id ${item.id} ya no existe en el catálogo.` },
          { status: 409 }
        )
      }

      if (precioReal !== item.precioVisto) {
        itemsDesactualizados.push({
          ...item,
          precioReal,
        })
      }
    }

    if (itemsDesactualizados.length > 0) {
      return NextResponse.json({
        ok: false,
        mensaje: 'Algunos precios cambiaron desde que cargaste el catálogo.',
        itemsActualizados: itemsDesactualizados,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[/api/verificar-precio]', error)
    return NextResponse.json(
      { error: 'Error interno al verificar el precio.' },
      { status: 500 }
    )
  }
}
