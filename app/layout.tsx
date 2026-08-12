import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import JsonLd from '@/components/JsonLd'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const BASE_URL = 'https://filtrargentina.cloud'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'FiltrAR | Bombillas para Mate por Mayor — Directo de Fábrica',
    template: '%s | FiltrAR Bombillas',
  },
  description:
    'Venta mayorista de bombillas para mate en Argentina. Acero inoxidable 304 de primera calidad. Precios directos de fábrica para distribuidores y comercios. Pedido mínimo 50 unidades. Envíos a todo el país.',
  keywords: [
    'bombillas por mayor',
    'bombillas para mate mayoristas',
    'FiltrAR bombillas',
    'venta mayorista bombillas',
    'bombillas acero inoxidable',
    'bombillas mate Argentina',
    'distribuidora bombillas',
    'bombillas precio fabrica',
    'bombillas surtidas por mayor',
    'filtrargentina',
  ],
  authors: [{ name: 'FiltrAR' }],
  creator: 'FiltrAR',
  publisher: 'FiltrAR',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: BASE_URL,
    siteName: 'FiltrAR Bombillas',
    title: 'FiltrAR | Bombillas para Mate por Mayor — Directo de Fábrica',
    description:
      'Venta mayorista de bombillas para mate en Argentina. Acero inoxidable 304 de primera calidad. Precios directos de fábrica. Pedido mínimo 50 unidades.',
    images: [
      {
        url: '/hero.webp',
        width: 1200,
        height: 630,
        alt: 'FiltrAR — Bombillas para mate por mayor en Argentina',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FiltrAR | Bombillas para Mate por Mayor',
    description:
      'Venta mayorista de bombillas para mate. Acero inoxidable 304. Directo de fábrica. Envíos a todo el país.',
    images: ['/hero.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-AR" className="scroll-smooth">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <JsonLd />
        {children}
      </body>
    </html>
  )
}
