import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mate Wholesale — Bombillas por Mayor | Fábrica Argentina',
  description:
    'Venta mayorista de bombillas para mate. Precios directos de fábrica para distribuidores y comercios. Pedido mínimo 100 unidades. Envíos a todo el país.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-AR" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
