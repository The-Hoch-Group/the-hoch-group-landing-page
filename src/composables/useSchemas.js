import { BASE_URL } from '@/data/seo.js'

const NAP = {
  addressLocality: 'Accra',
  addressRegion: 'Greater Accra',
  addressCountry: 'GH',
  postalCode: 'GA-000',
  streetAddress: 'Accra, Ghana'
}

const CONTACT = {
  telephone: '+233-000-000-000',
  email: 'info@thehochgroup.com',
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': BASE_URL + '/#organization',
    name: 'HOCH Group',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: BASE_URL + '/logo.png',
      width: 300,
      height: 100
    },
    description: 'Ghana\'s premier multi-sector holding company for real estate, construction, interior design, and project management.',
    address: { '@type': 'PostalAddress', ...NAP },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.telephone,
      email: CONTACT.email,
      contactType: 'customer service',
      availableLanguage: 'English'
    },
    areaServed: [
      { '@type': 'Country', name: 'Ghana' },
      { '@type': 'AdministrativeArea', name: 'West Africa' }
    ],
    sameAs: [
      'https://www.linkedin.com/company/hoch-group',
      'https://www.instagram.com/hochgroup'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'HOCH Group Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Real Estate Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Construction Supply' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Finishing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Project Management' } },
      ]
    },
    subOrganization: [
      { '@type': 'Organization', name: 'HOCH Properties', url: BASE_URL + '/properties' },
      { '@type': 'Organization', name: 'HOCH Build',      url: BASE_URL + '/build' },
      { '@type': 'Organization', name: 'HOCH Interior',   url: BASE_URL + '/interior' },
      { '@type': 'Organization', name: 'HOCH Projects',   url: BASE_URL + '/projects' },
    ]
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RealEstateAgent'],
    '@id': BASE_URL + '/#localbusiness',
    name: 'HOCH Group',
    image: BASE_URL + '/og-image.jpg',
    url: BASE_URL,
    telephone: CONTACT.telephone,
    email: CONTACT.email,
    address: { '@type': 'PostalAddress', ...NAP },
    geo: { '@type': 'GeoCoordinates', latitude: 5.6037, longitude: -0.1870 },
    openingHours: 'Mo-Fr 08:00-17:00',
    priceRange: '$$$$',
    currenciesAccepted: 'GHS, USD',
    paymentAccepted: 'Cash, Bank Transfer',
    areaServed: 'Accra, Ghana',
    hasMap: 'https://maps.google.com/?q=Accra,Ghana',
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': BASE_URL + '/#website',
    url: BASE_URL,
    name: 'HOCH Group',
    description: 'Premium real estate and construction group headquartered in Accra, Ghana.',
    publisher: { '@id': BASE_URL + '/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: BASE_URL + '/?s={search_term_string}' },
      'query-input': 'required name=search_term_string'
    }
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  }
}

export function serviceSchema(name, description, url, serviceType) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    serviceType,
    provider: { '@id': BASE_URL + '/#organization' },
    areaServed: { '@type': 'Country', name: 'Ghana' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      servicePhone: '+233-000-000-000'
    }
  }
}