export const BASE_URL = 'https://www.thehochgroup.com'

export const homeSeo = {
  title: 'HOCH Group | Luxury Real Estate & Construction in Ghana',
  description: 'HOCH Group is Ghana\'s premier holding company for real estate development, construction supply, interior finishing, and project management in Accra and across West Africa.',
  keywords: 'HOCH Group, real estate Ghana, luxury apartments Accra, property developers Ghana, construction company Ghana, real estate investment Ghana',
  canonical: BASE_URL + '/',
  ogImage: BASE_URL + '/og-image.jpg',
}

export const subsidiarySeo = {
  properties: {
    title: 'HOCH Properties | Luxury Apartments & Real Estate in Accra, Ghana',
    description: 'HOCH Properties offers premium land acquisition, estate development, and property sales in Accra, Ghana. Explore luxury apartments, homes, and commercial real estate.',
    keywords: 'HOCH Properties, luxury apartments Accra, houses for sale Accra, property developers Ghana, real estate developers Accra, apartments for rent Accra, real estate investment Ghana',
    canonical: BASE_URL + '/properties',
    ogImage: BASE_URL + '/og-properties.jpg',
    schema: {
      type: 'RealEstateAgent',
      name: 'HOCH Properties',
      description: 'Premium real estate development and property sales in Accra, Ghana.',
    }
  },
  build: {
    title: 'HOCH Build | Construction Supply & Materials in Ghana',
    description: 'HOCH Build supplies premium construction materials including PVC pipes, drainage systems, and electrical accessories to developers and contractors across Ghana.',
    keywords: 'HOCH Build, construction company Ghana, building contractors Ghana, construction materials Ghana, PVC pipes Ghana, infrastructure Ghana',
    canonical: BASE_URL + '/build',
    ogImage: BASE_URL + '/og-build.jpg',
    schema: {
      type: 'ConstructionCompany',
      name: 'HOCH Build',
      description: 'Premium construction supply and infrastructure materials in Ghana.',
    }
  },
  interior: {
    title: 'HOCH Interior | Premium Interior Design & Finishing in Ghana',
    description: 'HOCH Interior delivers luxury interior finishing and decoration for residential, hotel, and commercial spaces in Ghana. Expert 3D design and premium materials.',
    keywords: 'HOCH Interior, interior design Ghana, interior finishing Accra, luxury interiors Ghana, hotel interior design Ghana, home decoration Ghana',
    canonical: BASE_URL + '/interior',
    ogImage: BASE_URL + '/og-interior.jpg',
    schema: {
      type: 'HomeAndConstructionBusiness',
      name: 'HOCH Interior',
      description: 'Premium interior finishing and design services in Ghana.',
    }
  },
  projects: {
    title: 'HOCH Projects | Government Tenders & Project Management in Ghana',
    description: 'HOCH Projects manages end-to-end project execution, government tenders, institutional contracts, and large-scale procurement in Ghana and West Africa.',
    keywords: 'HOCH Projects, project management Ghana, government tenders Ghana, construction projects Accra, procurement Ghana, institutional contracts Ghana',
    canonical: BASE_URL + '/projects',
    ogImage: BASE_URL + '/og-projects.jpg',
    schema: {
      type: 'ProfessionalService',
      name: 'HOCH Projects',
      description: 'Project execution and procurement management in Ghana.',
    }
  }
}