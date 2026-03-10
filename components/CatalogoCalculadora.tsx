'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import type { ProductoPublico } from '@/lib/baserow'
import PriceModal, { type ItemActualizado } from './PriceModal'

const MIN_UNIDADES = 100
const WA_NUMBER = '5491112345678'

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

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

interface Props {
  productos: ProductoPublico[]
  imagenes: Record<number, string>
}

export default function CatalogoCalculadora({ productos, imagenes }: Props) {
  const [cantidades, setCantidades] = useState<Record<number, number>>(
    () => Object.fromEntries(productos.map((p) => [p.id, 0]))
  )
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [modalItems, setModalItems] = useState<ItemActualizado[] | null>(null)
  const [productosActuales, setProductosActuales] = useState(productos)
  const [staticInView, setStaticInView] = useState(false)
  const staticBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = staticBarRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setStaticInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const totalUnidades = useMemo(
    () => Object.values(cantidades).reduce((a, b) => a + b, 0),
    [cantidades]
  )
  const totalPrecio = useMemo(
    () => productosActuales.reduce((acc, p) => acc + (cantidades[p.id] ?? 0) * p.precio, 0),
    [productosActuales, cantidades]
  )
  const progreso = Math.min((totalUnidades / MIN_UNIDADES) * 100, 100)
  const faltanUnidades = Math.max(MIN_UNIDADES - totalUnidades, 0)
  const pedidoValido = totalUnidades >= MIN_UNIDADES

  const cambiarCantidad = useCallback((id: number, valor: number) => {
    setCantidades((prev) => ({ ...prev, [id]: Math.max(0, valor) }))
  }, [])

  const handlePedir = async () => {
    setEnviando(true)
    setError(null)

    const items = productosActuales
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
        window.open(buildWhatsAppURL(productosActuales, cantidades), '_blank')
      } else {
        setModalItems(data.itemsActualizados)
      }
    } catch {
      setError('Error de red. Intentá de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  const handleAceptarNuevoPrecio = (itemsActualizados: ItemActualizado[]) => {
    const actualizados = productosActuales.map((p) => {
      const actualizado = itemsActualizados.find((i) => i.id === p.id)
      return actualizado ? { ...p, precio: actualizado.precioReal } : p
    })
    setProductosActuales(actualizados)
    setModalItems(null)
    window.open(buildWhatsAppURL(actualizados, cantidades), '_blank')
  }

  const showFixed = totalUnidades > 0 && !staticInView

  const barraContenido = (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-6">
        <div>
          <p className="text-stone-500 text-xs">Total estimado</p>
          <p className="text-2xl font-black text-white leading-tight">{formatARS(totalPrecio)}</p>
        </div>
        <div className="hidden sm:block h-10 w-px bg-surface-600/60" />
        <div className="hidden sm:block">
          <p className={`text-sm font-medium ${pedidoValido ? 'text-brand-400' : 'text-stone-400'}`}>
            {pedidoValido
              ? `✓ ${totalUnidades} unidades — listo para pedir`
              : `Faltan ${faltanUnidades} u. para el mínimo de ${MIN_UNIDADES}`}
          </p>
          <p className="text-stone-600 text-xs mt-0.5">Precio confirmado por el vendedor vía WhatsApp</p>
        </div>
      </div>

      <button
        onClick={handlePedir}
        disabled={!pedidoValido || enviando}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1fb855] disabled:bg-surface-600 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-[#25D366]/25"
      >
        {enviando ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Verificando…
          </>
        ) : (
          <>
            {WA_ICON}
            Pedir por WhatsApp
          </>
        )}
      </button>
    </div>
  )

  const barraProgreso = (
    <div className="h-1 bg-surface-700 rounded-full overflow-hidden mb-4">
      <div
        className={`h-full transition-all duration-500 rounded-full ${pedidoValido ? 'bg-brand-400' : 'bg-brand-600'}`}
        style={{ width: `${progreso}%` }}
      />
    </div>
  )

  return (
    <>
      {/* Grilla de productos */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosActuales.map((p) => {
          const cantidad = cantidades[p.id] ?? 0
          const imagen = imagenes[p.id]
          return (
            <div
              key={p.id}
              className={`group bg-surface-800/60 border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${
                cantidad > 0
                  ? 'border-brand-400/60 shadow-lg shadow-brand-400/10'
                  : 'border-surface-600/50 hover:border-surface-500/60'
              }`}
            >
              {/* Imagen */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-900/20 to-surface-700">
                <Image
                  src={imagen}
                  alt={p.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900/70 via-transparent to-transparent" />
                {cantidad > 0 && (
                  <div className="absolute top-3 right-3 bg-brand-400 text-surface-950 text-xs font-bold px-2.5 py-1 rounded-full">
                    {cantidad} u.
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white leading-tight">{p.nombre}</h3>
                  <p className="text-stone-500 text-sm mt-1.5 leading-relaxed line-clamp-2">
                    {p.descripcion}
                  </p>
                </div>

                {/* Precio + contador */}
                <div className="pt-3 border-t border-surface-600/40 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-brand-400 font-bold text-lg leading-tight">
                      {formatARS(p.precio)}
                      <span className="text-stone-500 text-xs font-normal ml-1">/ u.</span>
                    </p>
                    {cantidad > 0 && (
                      <p className="text-stone-500 text-xs mt-0.5">
                        = {formatARS(cantidad * p.precio)}
                      </p>
                    )}
                  </div>

                  {/* Contador +/- */}
                  <div className="flex items-center border border-surface-600/60 rounded-xl overflow-hidden shrink-0">
                    <button
                      onClick={() => cambiarCantidad(p.id, cantidad - 1)}
                      disabled={cantidad === 0}
                      className="w-9 h-9 flex items-center justify-center text-stone-400 hover:text-white hover:bg-surface-700/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-lg"
                      aria-label={`Restar ${p.nombre}`}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={0}
                      value={cantidad}
                      onChange={(e) => cambiarCantidad(p.id, parseInt(e.target.value) || 0)}
                      className="w-12 h-9 text-center bg-surface-700/40 text-white font-bold text-sm border-x border-surface-600/60 focus:outline-none focus:bg-surface-700"
                      aria-label={`Cantidad de ${p.nombre}`}
                    />
                    <button
                      onClick={() => cambiarCantidad(p.id, cantidad + 1)}
                      className="w-9 h-9 flex items-center justify-center text-stone-400 hover:text-white hover:bg-surface-700/60 transition-all font-bold text-lg"
                      aria-label={`Sumar ${p.nombre}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Resumen estático al final del grid — siempre renderizado para el observer */}
      <div
        ref={staticBarRef}
        className={`mt-8 bg-surface-800/80 border border-surface-600/50 rounded-2xl p-5 transition-all duration-300 ${
          totalUnidades > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {barraProgreso}
        {barraContenido}
      </div>

      {/* Barra fija — visible cuando hay unidades Y el resumen estático no está en pantalla */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
          showFixed ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="h-1 bg-surface-700">
          <div
            className={`h-full transition-all duration-500 ${pedidoValido ? 'bg-brand-400' : 'bg-brand-600'}`}
            style={{ width: `${progreso}%` }}
          />
        </div>
        <div className="bg-surface-800/95 backdrop-blur-md border-t border-surface-600/60 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            {barraContenido}
          </div>
        </div>
      </div>

      {/* Modal */}
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
