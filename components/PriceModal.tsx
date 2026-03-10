'use client'

import { useEffect } from 'react'

export interface ItemActualizado {
  id: number
  nombre: string
  cantidad: number
  precioVisto: number
  precioReal: number
}

interface PriceModalProps {
  items: ItemActualizado[]
  onAceptar: (itemsActualizados: ItemActualizado[]) => void
  onCancelar: () => void
}

function formatARS(n: number) {
  return n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}

export default function PriceModal({ items, onAceptar, onCancelar }: PriceModalProps) {
  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const totalAnterior = items.reduce((acc, i) => acc + i.cantidad * i.precioVisto, 0)
  const totalNuevo    = items.reduce((acc, i) => acc + i.cantidad * i.precioReal,  0)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancelar}
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-surface-800 border border-surface-600/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Los precios cambiaron</h2>
            <p className="text-stone-400 text-sm mt-1">
              Algunos precios se actualizaron mientras armabas tu pedido. Revisá los cambios antes de continuar.
            </p>
          </div>
        </div>

        {/* Tabla de diferencias */}
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-surface-700/60 border border-surface-600/40 rounded-xl p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-white text-sm font-semibold">{item.nombre}</span>
                <span className="text-stone-500 text-xs">{item.cantidad} u.</span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-sm">
                <span className="text-stone-500 line-through">{formatARS(item.precioVisto)} c/u</span>
                <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="text-amber-400 font-semibold">{formatARS(item.precioReal)} c/u</span>
              </div>
            </div>
          ))}
        </div>

        {/* Totales */}
        <div className="bg-surface-700/40 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
          <div className="text-center">
            <p className="text-stone-500 text-xs mb-1">Total anterior</p>
            <p className="text-stone-400 text-base font-semibold line-through">{formatARS(totalAnterior)}</p>
          </div>
          <svg className="w-5 h-5 text-stone-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div className="text-center">
            <p className="text-stone-500 text-xs mb-1">Nuevo total</p>
            <p className="text-brand-400 text-lg font-black">{formatARS(totalNuevo)}</p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancelar}
            className="flex-1 border border-surface-600 hover:border-stone-500 text-stone-400 hover:text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={() => onAceptar(items)}
            className="flex-1 bg-brand-400 hover:bg-brand-500 text-surface-950 font-bold px-5 py-3 rounded-xl transition-all text-sm hover:shadow-lg hover:shadow-brand-400/25"
          >
            Aceptar nuevo precio y pedir por WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
