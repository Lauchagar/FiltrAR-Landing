/**
 * JSON-LD structured data for Google rich results.
 * Renders a LocalBusiness + WebSite schema invisible to users but readable by crawlers.
 */
export default function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://filtrargentina.cloud/#organization',
        name: 'FiltrAR',
        alternateName: 'FiltrAR Bombillas',
        url: 'https://filtrargentina.cloud',
        logo: {
          '@type': 'ImageObject',
          url: 'https://filtrargentina.cloud/logo_nuevo.webp',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+54-9-11-5126-7426',
          contactType: 'sales',
          email: 'filtrargentinabombillas@gmail.com',
          availableLanguage: 'Spanish',
          areaServed: 'AR',
        },
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://filtrargentina.cloud/#website',
        url: 'https://filtrargentina.cloud',
        name: 'FiltrAR | Bombillas por Mayor',
        description:
          'Venta mayorista de bombillas para mate. Precios directos de fábrica para distribuidores y comercios de toda Argentina.',
        publisher: { '@id': 'https://filtrargentina.cloud/#organization' },
        inLanguage: 'es-AR',
      },
      {
        '@type': 'Store',
        '@id': 'https://filtrargentina.cloud/#store',
        name: 'FiltrAR — Bombillas Mayoristas',
        description:
          'Fábrica y distribuidora mayorista de bombillas para mate. Acero inoxidable 304 de primera calidad. Pedido mínimo 50 unidades. Envíos a todo el país.',
        url: 'https://filtrargentina.cloud',
        telephone: '+54-9-11-5126-7426',
        email: 'filtrargentinabombillas@gmail.com',
        priceRange: '$$',
        image: 'https://filtrargentina.cloud/hero.webp',
        areaServed: {
          '@type': 'Country',
          name: 'Argentina',
        },
        hasMap: '',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
        makesOffer: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Bombillas para mate mayoristas',
              description:
                'Bombillas de acero inoxidable 304 para mate, venta por mayor desde 50 unidades. Varios modelos disponibles.',
              brand: {
                '@type': 'Brand',
                name: 'FiltrAR',
              },
              material: 'Acero inoxidable 304',
              category: 'Bombillas para mate',
            },
            eligibleQuantity: {
              '@type': 'QuantitativeValue',
              minValue: 50,
              unitCode: 'C62',
            },
            seller: { '@id': 'https://filtrargentina.cloud/#organization' },
            areaServed: {
              '@type': 'Country',
              name: 'Argentina',
            },
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
