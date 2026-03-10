// ──────────────────────────────────────────────────────────────────────
// Tipos de la tabla Baserow (columnas exactas del negocio)
// ──────────────────────────────────────────────────────────────────────

/** Fila completa tal como la devuelve la API de Baserow */
export interface ProductoBaserow {
  id: number
  Nombre_Modelo: string
  Descripcion_Comercial: string
  Costo_Proveedor: number   // ⚠️ NUNCA exponer al frontend
  Precio_Venta: string | number
  Margen_Ganancia: number   // ⚠️ NUNCA exponer al frontend
}

/** Subconjunto seguro para exponer al browser */
export interface ProductoPublico {
  id: number
  nombre: string
  descripcion: string
  precio: number
}

/** Respuesta paginada de Baserow */
interface BaserowResponse {
  count: number
  results: ProductoBaserow[]
}

// ──────────────────────────────────────────────────────────────────────
// Función central de fetch — solo para uso en Server (API routes)
// ──────────────────────────────────────────────────────────────────────

/**
 * Trae todos los productos desde Baserow usando las variables de entorno
 * del servidor. Nunca llamar desde un Client Component.
 */
export async function fetchProductos(): Promise<ProductoBaserow[]> {
  const token = process.env.BASEROW_TOKEN
  const tableId = process.env.BASEROW_TABLE_ID

  if (!token || !tableId) {
    throw new Error('Faltan variables de entorno: BASEROW_TOKEN o BASEROW_TABLE_ID')
  }

  const url = `https://api.baserow.io/api/database/rows/table/${tableId}/?user_field_names=true&size=200`

  const res = await fetch(url, {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Error Baserow ${res.status}: ${await res.text()}`)
  }

  const data: BaserowResponse = await res.json()
  return data.results
}

// ──────────────────────────────────────────────────────────────────────
// Mapper: ProductoBaserow → ProductoPublico
// ──────────────────────────────────────────────────────────────────────

export function toPublico(p: ProductoBaserow): ProductoPublico {
  return {
    id: p.id,
    nombre: p.Nombre_Modelo,
    descripcion: p.Descripcion_Comercial,
    precio: Number(p.Precio_Venta),
  }
}
