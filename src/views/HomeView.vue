<template>
  <div>
    <HeroSection />
    <MarqueeBar />
    <AboutSection />
    <SubsidiariesSection />
    <ServicesSection />
    <ContactSection @open-modal="$emit('open-modal')" />
  </div>
</template>

<script setup>
import HeroSection         from './sections/HeroSection.vue'
import MarqueeBar          from './sections/MarqueeBar.vue'
import AboutSection        from './sections/AboutSection.vue'
import SubsidiariesSection from './sections/SubsidiariesSection.vue'
import ServicesSection     from './sections/ServicesSection.vue'
import ContactSection      from './sections/ContactSection.vue'

import { useSeo }    from '@/composables/useSeo.js'
import { organizationSchema, localBusinessSchema, websiteSchema, faqSchema } from '@/composables/useSchemas.js'
import { homeSeo }   from '@/data/seo.js'

defineEmits(['open-modal'])

// Inject page-level SEO
useSeo({
  ...homeSeo,
  jsonLd: [
    organizationSchema(),
    localBusinessSchema(),
    websiteSchema(),
    faqSchema([
      {
        question: 'What does HOCH Group do?',
        answer: 'HOCH Group is a Ghana-based holding company with four subsidiaries: HOCH Properties (real estate), HOCH Build (construction supply), HOCH Interior (finishing), and HOCH Projects (project management).'
      },
      {
        question: 'Where is HOCH Group located?',
        answer: 'HOCH Group is headquartered in Accra, Ghana, and serves clients across West Africa.'
      },
      {
        question: 'Does HOCH Group sell luxury apartments in Accra?',
        answer: 'Yes. HOCH Properties, a subsidiary of HOCH Group, specialises in luxury residential and commercial real estate development and sales in Accra, Ghana.'
      },
      {
        question: 'How can I contact HOCH Group?',
        answer: 'You can reach HOCH Group via email at info@thehochgroup.com or visit thehochgroup.com to submit an enquiry.'
      }
    ])
  ]
})
</script>