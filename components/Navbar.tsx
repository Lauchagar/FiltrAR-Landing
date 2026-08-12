'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const WA_LINK =
  'https://wa.me/5491151267426?text=Hola!%20Quiero%20solicitar%20el%20cat%C3%A1logo%20de%20precios%20mayoristas'

const WA_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const href = (anchor: string) => isHome ? anchor : `/${anchor}`

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-scrolled' : ''
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="/" className="flex items-center">
              <Image
                src="/logo_nuevo.png"
                alt="FiltrAR"
                width={120}
                height={48}
                className="h-10 w-auto object-contain"
                priority
              />
            </a>

            <div className="hidden md:flex items-center gap-8">
              <a href={href('#combos')} className="text-sm text-stone-400 hover:text-brand-400 transition-colors">
                Combos
              </a>
              <a href="/catalogo" className="text-sm text-stone-400 hover:text-brand-400 transition-colors">
                Catálogo
              </a>
              <a href={href('#como-funciona')} className="text-sm text-stone-400 hover:text-brand-400 transition-colors">
                Cómo funciona
              </a>
              <a href={href('#contacto')} className="text-sm text-stone-400 hover:text-brand-400 transition-colors">
                Contacto
              </a>
              <a href="/nosotros" className="text-sm text-stone-400 hover:text-brand-400 transition-colors">
                Nosotros
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-400 hover:bg-brand-500 text-surface-950 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-brand-400/20"
              >
                {WA_ICON}
                Pedir catálogo
              </a>
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-white p-2"
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mobile-menu fixed inset-y-0 right-0 w-72 bg-surface-800 z-50 md:hidden shadow-2xl ${menuOpen ? 'open' : ''
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-surface-600">
          <img src="/logo_nuevo.png" alt="FiltrAR" className="h-8 w-auto object-contain" />
          <button onClick={closeMenu} className="text-white p-2" aria-label="Cerrar menú">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col p-6 gap-6">
          {[
            { h: href('#combos'), label: 'Combos' },
            { h: '/catalogo', label: 'Catálogo' },
            { h: href('#como-funciona'), label: 'Cómo funciona' },
            { h: href('#contacto'), label: 'Contacto' },
            { h: '/nosotros', label: 'Nosotros' },
          ].map(({ h, label }) => (
            <a
              key={h}
              href={h}
              onClick={closeMenu}
              className="text-lg text-stone-300 hover:text-brand-400 transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="inline-flex items-center justify-center gap-2 bg-brand-400 hover:bg-brand-500 text-surface-950 font-semibold px-5 py-3 rounded-lg transition-all mt-2"
          >
            {WA_ICON}
            Pedir Precio
          </a>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  )
}
