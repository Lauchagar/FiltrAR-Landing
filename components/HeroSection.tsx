const WA_PRECIOS =
  'https://wa.me/5491151267426?text=Hola!%20Quiero%20solicitar%20la%20lista%20de%20precios%20mayoristas'

const WA_ICON_SM = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 hero-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              Equipá tu local con las{' '}
              <span className="text-brand-400 italic">mejores bombillas</span>{' '}
              del mercado.
            </h1>

            <p className="text-stone-400 text-lg sm:text-xl leading-relaxed max-w-xl">
              Venta directa de fábrica para distribuidores y comercios. Alta calidad en acero inoxidable
              304 de primera calidad.{' '}
              <strong className="text-white font-semibold">Pedido mínimo 100 unidades.</strong>
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={WA_PRECIOS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-brand-400 hover:bg-brand-500 text-surface-950 font-bold px-7 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-brand-400/25 hover:-translate-y-0.5 text-base"
              >
                {WA_ICON_SM}
                Solicitar catálogo
              </a>
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 border border-stone-600 hover:border-brand-400/50 text-white font-semibold px-7 py-4 rounded-xl transition-all hover:bg-brand-400/5 text-base"
              >
                Ver Catálogo
              </a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-400/20 via-transparent to-brand-700/10 rounded-3xl blur-2xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src='/productos/hero.jpeg'
                alt="Mate argentino con bombilla de acero inoxidable"
                className="relative w-full h-auto rounded-2xl object-cover shadow-2xl shadow-black/50"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="grid sm:grid-cols-3 gap-4 mt-16 lg:mt-24 pb-12">
          {[
            {
              icon: (
                <svg className="w-6 h-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              ),
              title: 'Envíos a todo el país',
              sub: 'Entrega en aproximadamente 1 semana',
            },
            {
              icon: (
                <svg className="w-6 h-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              ),
              title: 'Stock permanente',
              sub: 'Sin demoras en tu producción',
            },
            {
              icon: (
                <svg className="w-6 h-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              ),
              title: 'Alta rentabilidad',
              sub: 'Márgenes garantizados',
            },
          ].map(({ icon, title, sub }) => (
            <div
              key={title}
              className="flex items-center gap-4 bg-surface-800/60 border border-surface-600/50 rounded-2xl p-5 card-glow transition-all"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-brand-400/10 rounded-xl flex items-center justify-center">
                {icon}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{title}</p>
                <p className="text-stone-500 text-xs mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
