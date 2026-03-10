const ventajas = [
  {
    titulo: 'Precio de Fábrica',
    texto: 'Sin intermediarios. Comprás directo al fabricante y maximizás tu ganancia.',
    icon: (
      <svg className="w-7 h-7 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    titulo: 'Calidad Garantizada',
    texto: 'Acero inoxidable 304 y alpaca de primera. Cero devoluciones de tus clientes.',
    icon: (
      <svg className="w-7 h-7 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    titulo: 'Envíos a Todo el País',
    texto: (
      <>
        Coordinamos con transportes y expresos de tu confianza. Recibí tu mercadería en{' '}
        <strong className="text-white">aproximadamente 1 semana</strong>.
      </>
    ),
    icon: (
      <svg className="w-7 h-7 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
  {
    titulo: 'Mínimos Accesibles y Surtidos',
    texto: 'Compra mínima de solo 100 unidades que podés surtir con los modelos más vendidos a tu elección.',
    icon: (
      <svg className="w-7 h-7 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
]

export default function VentajasMayoristas() {
  return (
    <section className="py-20 lg:py-28 border-t border-surface-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold">¿Por qué elegirnos?</h2>
          <p className="text-stone-500 mt-3 text-lg">
            Somos fábrica. Eso significa mejores precios y márgenes para vos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ventajas.map(({ titulo, texto, icon }) => (
            <div
              key={titulo}
              className="bg-surface-800/40 border border-surface-600/30 rounded-2xl p-6 text-center card-glow transition-all"
            >
              <div className="w-14 h-14 bg-brand-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {icon}
              </div>
              <h3 className="font-bold text-white mb-2">{titulo}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
