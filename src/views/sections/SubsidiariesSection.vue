<template>
  <section class="section" id="subsidiaries" style="background: var(--black)">

    <div class="subs-header reveal">
      <span class="section-label">Our Companies</span>
      <h2 class="section-title">The <em>Four Pillars</em> of Hoch Group</h2>
      <p class="subs-intro">Each subsidiary is a world-class operation in its own right — together, they form an unrivalled ecosystem for building and investment.</p>
    </div>

    <div class="subs-grid">
      <button
        v-for="(s, i) in subs"
        :key="s.id"
        class="sub-card reveal"
        :class="'reveal-delay-' + (i + 1)"
        @click="visit(s.id)"
        :aria-label="'Open ' + s.name + ' ' + s.sub"
      >
        <div class="sub-card-bg">{{ s.num }}</div>
        <div class="sub-card-num">{{ s.num }} / 04</div>
        <div class="sub-card-icon">
          <svg viewBox="0 0 24 24">
            <path :d="s.iconPath" />
          </svg>
        </div>
        <div class="sub-card-name">{{ s.name }}</div>
        <div class="sub-card-sub">{{ s.sub }}</div>
        <p class="sub-card-desc">{{ s.description }}</p>
        <div class="sub-card-tags">
          <span v-for="tag in s.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <div class="sub-card-link">Visit HOCH {{ s.sub }}</div>
      </button>
    </div>

  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { subsidiaries as subs } from '@/data/index.js'
import { useReveal } from '@/composables/useReveal.js'

useReveal('#subsidiaries .reveal', 250)

const router = useRouter()
function visit(id) {
  router.push('/' + id)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.subs-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
}
.subs-intro {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem; font-weight: 300;
  color: rgba(232,224,204,0.5); line-height: 1.8;
}
.subs-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 1px; background: rgba(201,168,76,0.12);
  max-width: 1400px; margin: 0 auto;
}
@media (max-width: 1100px) { .subs-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px)  { .subs-grid { grid-template-columns: 1fr; } }
</style>
