import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Fábrica de Bombillas desde 2001',
  description:
    'Conocé la historia de FiltrAR: empresa familiar argentina con más de 20 años de trayectoria fabricando y comercializando bombillas para mate de acero inoxidable 304.',
  alternates: {
    canonical: 'https://filtrargentina.cloud/nosotros',
  },
  openGraph: {
    title: 'Sobre Nosotros | FiltrAR — Pasión por el Mate e Industria Argentina',
    description:
      'Empresa familiar con más de 20 años fabricando bombillas para mate de alta calidad. Conocé nuestra historia y compromiso con el país.',
    url: 'https://filtrargentina.cloud/nosotros',
  },
}

const WA_PRECIOS =
  'https://wa.me/5491151267426?text=Hola!%20Quiero%20conocer%20m%C3%A1s%20sobre%20sus%20productos%20y%20solicitar%20el%20cat%C3%A1logo%20mayorista'

const PILARES = [
  {
    titulo: 'Pasión por el Mate',
    descripcion:
      'El mate es el latido de nuestra cultura, una pasión que se transmite sorbo a sorbo. Diseñamos cada bombilla para honrar esta tradición ancestral.',
    icon: (
      <svg className="w-7 h-7 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84 51.39 51.39 0 0 0-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
      </svg>
    ),
  },
  {
    titulo: 'Industria Argentina',
    descripcion:
      'Somos una empresa comprometida con el desarrollo local, generando empleo y fortaleciendo la producción dentro de nuestro país.',
    icon: (
      <svg className="w-7 h-7 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-9h1.5m-1.5 3h1.5m-1.5 3h1.5M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    titulo: 'Compromiso con la Calidad',
    descripcion:
      'Utilizamos acero inoxidable 304 de primera calidad que nos permite crear productos excepcionales, higiénicos y extremadamente duraderos.',
    icon: (
      <svg className="w-7 h-7 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    titulo: 'Diseño Funcional',
    descripcion:
      'Filtro avanzado diseñado para adaptarse a todos los tipos de yerba, incluso a las de molienda fina, garantizando una experiencia de mate limpia y fluida.',
    icon: (
      <svg className="w-7 h-7 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.5H5.25A2.25 2.25 0 0 0 3 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 17.25V6.75a2.25 2.25 0 0 0-2.25-2.25Z" />
      </svg>
    ),
  },
]

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        {/* Header Hero */}
        <section className="relative py-12 lg:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-stone-500 hover:text-brand-400 text-sm transition-colors mb-6"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver al inicio
              </Link>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-400/10 border border-brand-400/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Desde el 2001 &middot; Más de 20 años de historia
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                Pasión por el mate, <span className="text-brand-400 italic">compromiso</span> con la calidad.
              </h1>
              <p className="text-stone-400 text-lg sm:text-xl mt-6 leading-relaxed">
                En cada sorbo de mate se encuentra el alma de la cultura argentina: un ritual compartido que une generaciones y fortalece la tradición. Nuestras bombillas reflejan la esencia de un país que vive y respira mate.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-y border-surface-700/50 bg-surface-800/40 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl sm:text-4xl font-black text-brand-400">+20</p>
                <p className="text-stone-400 text-xs sm:text-sm font-medium mt-1">Años de Trayectoria</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-white">2001</p>
                <p className="text-stone-400 text-xs sm:text-sm font-medium mt-1">Año de Fundación</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-brand-400">100%</p>
                <p className="text-stone-400 text-xs sm:text-sm font-medium mt-1">Industria Argentina</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-white">304</p>
                <p className="text-stone-400 text-xs sm:text-sm font-medium mt-1">Acero Inoxidable</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pilares / Valores */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold">Nuestros Pilares</h2>
              <p className="text-stone-400 mt-3 text-base sm:text-lg">
                Lo que nos define como fábrica y guía cada uno de nuestros procesos.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PILARES.map(({ titulo, descripcion, icon }) => (
                <div
                  key={titulo}
                  className="bg-surface-800/40 border border-surface-600/40 rounded-2xl p-6 flex flex-col items-start card-glow transition-all"
                >
                  <div className="w-14 h-14 bg-brand-400/10 rounded-2xl flex items-center justify-center mb-5">
                    {icon}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{titulo}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Historia & Misión Narrative */}
        <section className="py-12 border-t border-surface-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-400/10 text-brand-400 text-xs font-semibold uppercase tracking-wider">
                  Nuestra Historia
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Sobre Nosotros
                </h2>
                <p className="text-stone-400 leading-relaxed">
                  Somos una <strong className="text-white">empresa familiar con más de 20 años de trayectoria</strong>, dedicada a la fabricación de productos regionales de alta calidad desde el año 2001. Nos encargamos de la comercialización de nuestros productos, con el firme compromiso de llevar lo mejor de nuestra tradición a cada rincón del país.
                </p>
                <p className="text-stone-400 leading-relaxed">
                  A lo largo de los años, nos hemos enfocado en crear productos que no solo cumplen con los más altos estándares de calidad, sino que también reflejan el espíritu y la esencia de nuestra cultura. Buscamos ofrecer a negocios y emprendimientos soluciones confiables y de excelencia, para que puedan disfrutar de lo mejor del mercado.
                </p>
              </div>

              <div className="bg-gradient-to-br from-surface-800/90 to-surface-900 border border-surface-600/50 rounded-3xl p-8 sm:p-10 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-400/10 text-brand-400 text-xs font-semibold uppercase tracking-wider">
                  Nuestra Misión
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Mantener viva una costumbre tan nuestra
                </h3>
                <p className="text-stone-300 leading-relaxed">
                  Nuestra misión es continuar fomentando la tradición del mate, un símbolo que nos representa a todos los argentinos, y fortalecer el vínculo con nuestra tierra a través de productos que mantienen viva esta costumbre.
                </p>
                <p className="text-stone-300 leading-relaxed font-medium">
                  Creemos firmemente que cada mate compartido es una conexión con nuestras raíces, y nos enorgullece ser parte de ese legado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Mayoristas */}
        <section className="mt-16 sm:mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-950/80 via-surface-800 to-surface-800 border border-brand-400/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              ¿Tenés un comercio o querés emprender?
            </h2>
            <p className="text-stone-400 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
              Sumate a los cientos de distribuidores y locales que confían en nuestras bombillas en todo el país. Mínimo de compra accesible desde 50 unidades surtidas.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href={WA_PRECIOS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-brand-400 hover:bg-brand-500 text-surface-950 font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg shadow-brand-400/20"
              >
                Contactar por WhatsApp
              </a>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 border border-stone-600 hover:border-brand-400/50 text-white font-semibold px-7 py-4 rounded-xl transition-all hover:bg-brand-400/5 text-base"
              >
                Ver Catálogo de Productos
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
