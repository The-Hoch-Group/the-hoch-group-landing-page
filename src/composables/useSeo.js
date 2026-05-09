import { useHead } from '@unhead/vue'
import { computed, isRef } from 'vue'
import { BASE_URL } from '@/data/seo.js'

export function useSeo(opts) {
  // opts can be a plain object or a computed/ref
  const o = isRef(opts) ? opts : computed(() => opts)

  useHead({
    title: computed(() => o.value.title),
    meta: computed(() => [
      { name: 'description',      content: o.value.description },
      { name: 'keywords',         content: o.value.keywords || '' },
      { name: 'robots',           content: o.value.robots || 'index, follow' },
      // Open Graph
      { property: 'og:title',       content: o.value.title },
      { property: 'og:description', content: o.value.description },
      { property: 'og:url',         content: o.value.canonical || BASE_URL },
      { property: 'og:image',       content: o.value.ogImage || BASE_URL + '/og-image.jpg' },
      { property: 'og:type',        content: 'website' },
      { property: 'og:site_name',   content: 'HOCH Group' },
      // Twitter
      { name: 'twitter:card',        content: 'summary_large_image' },
      { name: 'twitter:title',       content: o.value.title },
      { name: 'twitter:description', content: o.value.description },
      { name: 'twitter:image',       content: o.value.ogImage || BASE_URL + '/og-image.jpg' },
    ]),
    link: computed(() => [
      { rel: 'canonical', href: o.value.canonical || BASE_URL },
    ]),
    script: computed(() => {
      if (!o.value.jsonLd) return []
      return [{ type: 'application/ld+json', innerHTML: JSON.stringify(o.value.jsonLd) }]
    })
  })
}