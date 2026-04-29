<template>
  <section class="section services-section" id="services">
    <div class="services-inner">

      <div class="reveal">
        <span class="section-label">Our Approach</span>
        <blockquote class="services-quote">
          "Motivated by a shared aim to provide <span>outstanding properties</span>
          and first-rate services — across every frontier."
        </blockquote>
        <p class="services-body">From initial concept through final finishes, HOCH Group brings integrated expertise across every phase of the built environment — ensuring seamless delivery and uncompromised quality at every touchpoint.</p>
      </div>

      <div class="reveal reveal-delay-2">
        <span class="section-label">Core Capabilities</span>
        <h2 class="section-title" style="margin-bottom:2rem">What We <em>Deliver</em></h2>
        <div class="services-grid">
          <div v-for="s in services" :key="s.title" class="service-item">
            <div class="service-item-title">{{ s.title }}</div>
            <p class="service-item-text">{{ s.text }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { services } from '@/data/index.js'
import { useReveal } from '@/composables/useReveal.js'
useReveal('#services .reveal', 250)
</script>

<style scoped>
.services-section { background: var(--dark); }
.services-inner {
  max-width: 1400px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 2fr;
  gap: 6rem; align-items: start;
}
.services-quote {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.4rem, 2.5vw, 2.1rem);
  font-weight: 300; font-style: italic;
  color: var(--cream); line-height: 1.6;
  border-left: 0.5px solid var(--gold);
  padding-left: 2rem; margin-bottom: 2.5rem;
}
.services-quote span { color: var(--gold); }
.services-body { font-size: 0.8rem; font-weight: 300; line-height: 1.9; color: rgba(232,224,204,0.5); }
.services-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  border: 0.5px solid rgba(201,168,76,0.1);
}
.service-item {
  padding: 1.8rem;
  border-bottom: 0.5px solid rgba(201,168,76,0.1);
  border-right: 0.5px solid rgba(201,168,76,0.1);
  transition: background 0.3s;
}
.service-item:hover { background: rgba(201,168,76,0.03); }
.service-item:nth-child(2n) { border-right: none; }
.service-item:nth-last-child(-n+2) { border-bottom: none; }
.service-item-title { font-size: 0.62rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.6rem; }
.service-item-text { font-size: 0.78rem; font-weight: 300; line-height: 1.8; color: rgba(232,224,204,0.52); }

@media (max-width: 1100px) { .services-inner { grid-template-columns: 1fr; gap: 3rem; } }
@media (max-width: 768px) {
  .services-grid { grid-template-columns: 1fr; }
  .service-item { border-right: none !important; }
}
</style>
