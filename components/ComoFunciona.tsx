const pasos = [
  {
    n: '1',
    titulo: 'Pedí el catálogo',
    texto: 'Contactanos por WhatsApp y recibí la lista de precios actual en el instante.',
  },
  {
    n: '2',
    titulo: 'Armá tu pedido',
    texto: 'Elegí los modelos (mínimo 100 u. surtidos) y coordinemos el pago.',
  },
  {
    n: '3',
    titulo: 'Recibí en tu local',
    texto: (
      <>
        Despachamos en 24hs hábiles. Tu pedido llega en aproximadamente{' '}
        <strong className="text-white">1 semana</strong> a cualquier punto del país.
      </>
    ),
  },
]

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-800/80 border border-surface-600/50 rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold">¿Cómo hacer tu pedido?</h2>
            <p className="text-stone-500 mt-3 text-lg">Proceso simple y directo, pensado para mayoristas.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
            {pasos.map(({ n, titulo, texto }) => (
              <div key={n} className="text-center">
                <div className="step-number w-14 h-14 rounded-full flex items-center justify-center text-surface-950 text-xl font-black mx-auto mb-5 shadow-lg shadow-brand-400/20">
                  {n}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{titulo}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
