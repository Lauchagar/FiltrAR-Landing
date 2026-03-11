'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ProductoPublico } from '@/lib/baserow'
import PriceModal, { type ItemActualizado } from './PriceModal'

const MIN_UNIDADES = 100
const WA_NUMBER = '5491151267426'

function formatARS(n: number) {
  return n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}

function buildWhatsAppURL(
  productos: ProductoPublico[],
  cantidades: Record<number, number>
): string {
  const lineas = productos
    .filter((p) => (cantidades[p.id] ?? 0) > 0)
    .map((p) => `- ${cantidades[p.id]}x ${p.nombre} (${formatARS(p.precio)} c/u)`)

  const total = productos.reduce(
    (acc, p) => acc + (cantidades[p.id] ?? 0) * p.precio,
    0
  )

  const texto = [
    'Hola! Quiero hacer el siguiente pedido mayorista:',
    '',
    ...lineas,
    '',
    `TOTAL ESTIMADO: ${formatARS(total)}`,
  ].join('\n')

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(texto)}`
}

// ─── Skeleton de carga ───────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-surface-800/60 border border-surface-600/40 rounded-2xl p-5 animate-pulse">
      <div className="h-4 bg-surface-600/60 rounded w-2/3 mb-3" />
      <div className="h-3 bg-surface-600/40 rounded w-full mb-4" />
      <div className="flex items-center justify-between">
        <div className="h-5 bg-surface-600/60 rounded w-24" />
        <div className="h-10 bg-surface-600/40 rounded-xl w-28" />
      </div>
    </div>
  )
}

export default function CombosCalculadora() {
  const [productos, setProductos]     = useState<ProductoPublico[]>([])
  const [cantidades, setCantidades]   = useState<Record<number, number>>({})
  const [cargando, setCargando]       = useState(true)
  const [error, setError]             = useState<string | null>(null)
  const [enviando, setEnviando]       = useState(false)
  const [modalItems, setModalItems]   = useState<ItemActualizado[] | null>(null)

  // Fetch del catálogo al montar
  useEffect(() => {
    fetch('/api/precios')
      .then((r) => {
        if (!r.ok) throw new Error('No se pudo cargar el catálogo.')
        return r.json()
      })
      .then((data: ProductoPublico[]) => {
        setProductos(data)
        const init: Record<number, number> = {}
        data.forEach((p) => { init[p.id] = 0 })
        setCantidades(init)
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setCargando(false))
  }, [])

  // Totales calculados en tiempo real
  const totalUnidades = useMemo(
    () => Object.values(cantidades).reduce((a, b) => a + b, 0),
    [cantidades]
  )
  const totalPrecio = useMemo(
    () => productos.reduce((acc, p) => acc + (cantidades[p.id] ?? 0) * p.precio, 0),
    [productos, cantidades]
  )
  const progreso = Math.min((totalUnidades / MIN_UNIDADES) * 100, 100)
  const faltanUnidades = Math.max(MIN_UNIDADES - totalUnidades, 0)
  const pedidoValido = totalUnidades >= MIN_UNIDADES

  const cambiarCantidad = useCallback((id: number, valor: number) => {
    setCantidades((prev) => ({ ...prev, [id]: Math.max(0, valor) }))
  }, [])

  // Verificar precios y redirigir a WhatsApp
  const handlePedir = async () => {
    setEnviando(true)
    setError(null)

    const items = productos
      .filter((p) => (cantidades[p.id] ?? 0) > 0)
      .map((p) => ({
        id: p.id,
        nombre: p.nombre,
        cantidad: cantidades[p.id],
        precioVisto: p.precio,
      }))

    try {
      const res = await fetch('/api/verificar-precio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Error al verificar el pedido.')
        return
      }

      if (data.ok) {
        // Precios coinciden → ir directo a WhatsApp
        window.open(buildWhatsAppURL(productos, cantidades), '_blank')
      } else {
        // Hay diferencias → mostrar modal
        setModalItems(data.itemsActualizados)
      }
    } catch {
      setError('Error de red. Intentá de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  // Cuando el usuario acepta el nuevo precio en el modal
  const handleAceptarNuevoPrecio = (itemsActualizados: ItemActualizado[]) => {
    // Actualizar precios locales para construir el mensaje correcto
    const productosActualizados = productos.map((p) => {
      const actualizado = itemsActualizados.find((i) => i.id === p.id)
      return actualizado ? { ...p, precio: actualizado.precioReal } : p
    })
    setProductos(productosActualizados)
    setModalItems(null)
    window.open(buildWhatsAppURL(productosActualizados, cantidades), '_blank')
  }

  return (
    <>
      <section id="calculadora" className="py-20 lg:py-28 border-t border-surface-700/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Armá tu pedido</h2>
            <p className="text-stone-500 mt-3 text-lg">
              Seleccioná la cantidad de cada modelo y calculá el total de tu pedido.
            </p>
          </div>

          {/* Error global */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Productos */}
          <div className="space-y-4 mb-8">
            {cargando
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              : productos.map((p) => (
                  <div
                    key={p.id}
                    className="bg-surface-800/60 border border-surface-600/40 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold text-base">{p.nombre}</h3>
                      </div>
                      <p className="text-stone-500 text-sm leading-relaxed">{p.descripcion}</p>
                      <p className="text-brand-400 font-bold text-sm mt-2">
                        {formatARS(p.precio)} c/u
                        {(cantidades[p.id] ?? 0) > 0 && (
                          <span className="text-stone-500 font-normal ml-2">
                            = {formatARS((cantidades[p.id] ?? 0) * p.precio)}
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Contador +/- */}
                    <div className="flex items-center gap-0 border border-surface-600/60 rounded-xl overflow-hidden shrink-0">
                      <button
                        onClick={() => cambiarCantidad(p.id, (cantidades[p.id] ?? 0) - 1)}
                        disabled={(cantidades[p.id] ?? 0) === 0}
                        className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-white hover:bg-surface-700/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-lg font-bold"
                        aria-label={`Restar ${p.nombre}`}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={0}
                        value={cantidades[p.id] ?? 0}
                        onChange={(e) => cambiarCantidad(p.id, parseInt(e.target.value) || 0)}
                        className="w-14 h-10 text-center bg-surface-700/40 text-white font-bold text-sm border-x border-surface-600/60 focus:outline-none focus:bg-surface-700"
                        aria-label={`Cantidad de ${p.nombre}`}
                      />
                      <button
                        onClick={() => cambiarCantidad(p.id, (cantidades[p.id] ?? 0) + 1)}
                        className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-white hover:bg-surface-700/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-lg font-bold"
                        aria-label={`Sumar ${p.nombre}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
          </div>

          {/* Barra de progreso */}
          {!cargando && (
            <div className="bg-surface-800/60 border border-surface-600/40 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-stone-400">
                  {pedidoValido
                    ? '✓ Pedido mínimo alcanzado'
                    : `Faltan ${faltanUnidades} unidades para el mínimo`}
                </span>
                <span className="text-sm font-bold text-white">{totalUnidades} / {MIN_UNIDADES} u.</span>
              </div>
              <div className="h-2 bg-surface-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full progress-bar ${
                    pedidoValido ? 'bg-brand-400' : 'bg-brand-600'
                  }`}
                  style={{ width: `${progreso}%` }}
                />
              </div>
            </div>
          )}

          {/* Resumen y CTA */}
          {!cargando && (
            <div className="bg-surface-800/80 border border-surface-600/50 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-stone-400 text-sm">Total estimado</p>
                <p className="text-3xl font-black text-white mt-1">{formatARS(totalPrecio)}</p>
                <p className="text-stone-600 text-xs mt-1">
                  Precio final confirmado por el vendedor vía WhatsApp
                </p>
              </div>
              <button
                onClick={handlePedir}
                disabled={!pedidoValido || enviando}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1fb855] disabled:bg-surface-600 disabled:cursor-not-allowed text-white font-bold text-base px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-[#25D366]/25 hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {enviando ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Verificando precios…
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Pedir por WhatsApp
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Modal de discrepancia de precios */}
      {modalItems && (
        <PriceModal
          items={modalItems}
          onAceptar={handleAceptarNuevoPrecio}
          onCancelar={() => setModalItems(null)}
        />
      )}
    </>
  )
}
