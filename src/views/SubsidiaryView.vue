<template>
  <div class="sub-detail" v-if="sub">

    <!-- Hero Banner -->
    <div class="sub-hero">
      <div class="sub-hero-pattern" />
      <div class="sub-hero-radial" />
      <div class="sub-hero-monogram">{{ sub.monogram }}</div>
      <div class="sub-hero-content">
        <span class="sub-hero-num">{{ sub.num }} / 04 — HOCH GROUP SUBSIDIARY</span>
        <h1 class="sub-hero-title">{{ sub.name }}</h1>
        <h2 class="sub-hero-sub">{{ sub.sub }}</h2>
        <p class="sub-hero-desc">{{ sub.fullDesc }}</p>
      </div>
    </div>

    <!-- Focus + Info -->
    <div class="sub-content-bg">
      <div class="sub-content-inner">

        <div class="reveal">
          <button class="sub-back" @click="goBack">Back to Hoch Group</button>
          <span class="section-label">Areas of Focus</span>
          <div class="focus-list">
            <div class="focus-item" v-for="(f, i) in sub.focuses" :key="i">
              <span class="focus-num">0{{ i + 1 }}</span>
              <span class="focus-text">{{ f }}</span>
            </div>
          </div>
        </div>

        <div class="reveal reveal-delay-2">
          <span class="section-label">At a Glance</span>
          <div class="info-box">
            <div class="info-row">
              <div class="info-label">Sector</div>
              <div class="info-val">{{ sub.sector }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Coverage</div>
              <div class="info-val">{{ sub.coverage }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Part of</div>
              <div class="info-val">HOCH Group</div>
            </div>
            <div class="info-row">
              <div class="info-label">Tags</div>
              <div class="sub-card-tags" style="margin-top:0.5rem">
                <span v-for="tag in sub.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Other subsidiaries -->
    <div class="other-section">
      <div class="other-inner">
        <span class="section-label reveal">Other Companies</span>
        <h2 class="section-title reveal" style="margin-bottom:2.5rem">Explore the <em>Rest of the Group</em></h2>
        <div class="other-grid">
          <button
            v-for="(s, i) in others"
            :key="s.id"
            class="sub-card reveal"
            :class="'reveal-delay-' + (i + 1)"
            @click="visitOther(s.id)"
          >
            <div class="sub-card-bg">{{ s.num }}</div>
            <div class="sub-card-num">{{ s.num }} / 04</div>
            <div class="sub-card-name">{{ s.name }}</div>
            <div class="sub-card-sub">{{ s.sub }}</div>
            <p class="sub-card-desc">{{ s.description }}</p>
            <div class="sub-card-link">Visit HOCH {{ s.sub }}</div>
          </button>
        </div>
      </div>
    </div>

    <!-- CTA bar -->
    <div class="sub-cta-bar reveal">
      <p class="sub-cta-title">Ready to work with HOCH {{ sub.sub }}?</p>
      <p class="sub-cta-desc">Our team is ready to discuss your requirements.</p>
      <button class="btn-primary" @click="$emit('open-modal')">Send an Enquiry</button>
    </div>

  </div>

  <!-- 404 fallback -->
  <div v-else class="not-found">
    <p>Company not found.</p>
    <button class="btn-ghost" style="margin-top:2rem" @click="goBack">Return Home</button>
  </div>
</template>

<script setup>
import { computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { subsidiaries } from '@/data/index.js'
import { useReveal } from '@/composables/useReveal.js'

defineEmits(['open-modal'])

const route  = useRoute()
const router = useRouter()

const sub    = computed(() => subsidiaries.find(s => s.id === route.params.id || s.id === route.name))
const others = computed(() => subsidiaries.filter(s => s.id !== (sub.value?.id)))

const { reinit } = useReveal('.sub-detail .reveal', 200)

watch(() => route.params.id, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  nextTick(() => {
    document.querySelectorAll('.sub-detail .reveal').forEach(el => el.classList.remove('visible'))
    setTimeout(reinit, 120)
  })
})

function goBack() {
  router.push('/')
  nextTick(() => setTimeout(() => {
    document.getElementById('subsidiaries')?.scrollIntoView({ behavior: 'smooth' })
  }, 150))
}

function visitOther(id) {
  router.push('/' + id)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.sub-detail { padding-top: 5rem; }

/* ── Hero ── */
.sub-hero {
  min-height: 60vh; position: relative;
  display: flex; align-items: flex-end;
  padding: 5rem 4rem; overflow: hidden;
  background: var(--dark);
}
.sub-hero-pattern {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px);
  background-size: 50px 50px;
}
.sub-hero-radial {
  position: absolute; top: 50%; left: 30%;
  transform: translate(-50%, -50%);
  width: 600px; height: 600px;
  background: radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%);
  pointer-events: none;
}
.sub-hero-monogram {
  position: absolute; top: 50%; right: 4rem;
  transform: translateY(-50%);
  font-family: 'Cinzel', serif; font-size: 18rem;
  font-weight: 600; color: rgba(201,168,76,0.04);
  line-height: 1; pointer-events: none; user-select: none;
}
.sub-hero-content { position: relative; z-index: 2; max-width: 800px; }
.sub-hero-num { font-family: 'Cormorant Garamond', serif; font-size: 0.7rem; color: rgba(201,168,76,0.5); letter-spacing: 0.3em; margin-bottom: 1.2rem; display: block; }
.sub-hero-title { font-family: 'Cinzel', serif; font-size: clamp(3rem, 7vw, 6rem); font-weight: 400; letter-spacing: 0.15em; color: var(--cream); line-height: 1; }
.sub-hero-sub { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.3rem, 3vw, 2.5rem); font-style: italic; color: var(--gold); margin: 0.5rem 0 2rem; }
.sub-hero-desc { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 300; line-height: 1.9; color: var(--cream-dim); max-width: 580px; }

/* ── Focus + Info ── */
.sub-content-bg { background: var(--dark); border-top: 0.5px solid rgba(201,168,76,0.08); }
.sub-content-inner {
  max-width: 1400px; margin: 0 auto;
  padding: 5rem 4rem;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 5rem; align-items: start;
}
.sub-back {
  display: inline-flex; align-items: center; gap: 0.7rem;
  font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--gold-dim); cursor: pointer;
  background: none; border: none; margin-bottom: 2.5rem;
  transition: var(--transition);
}
.sub-back:hover { color: var(--gold); gap: 1.1rem; }
.sub-back::before { content: '←'; font-size: 0.85rem; }
.focus-item {
  display: flex; align-items: flex-start; gap: 1.2rem;
  padding: 1.2rem 0;
  border-bottom: 0.5px solid rgba(201,168,76,0.1);
  transition: var(--transition);
}
.focus-item:last-child { border-bottom: none; }
.focus-item:hover .focus-num { color: var(--gold); }
.focus-num { font-family: 'Cormorant Garamond', serif; font-size: 0.75rem; color: rgba(201,168,76,0.4); letter-spacing: 0.15em; flex-shrink: 0; margin-top: 0.1rem; transition: color 0.3s; }
.focus-text { font-size: 0.85rem; font-weight: 300; color: var(--cream-dim); letter-spacing: 0.06em; line-height: 1.7; }
.info-box {
  background: var(--dark-card);
  border: 0.5px solid rgba(201,168,76,0.15);
  padding: 2.5rem;
}
.info-row { margin-bottom: 2rem; }
.info-row:last-child { margin-bottom: 0; }
.info-label { font-size: 0.55rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold-dim); margin-bottom: 0.5rem; }
.info-val { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: var(--cream); line-height: 1.6; }

/* ── Other subsidiaries ── */
.other-section { background: var(--black); padding: 5rem 4rem; }
.other-inner { max-width: 1400px; margin: 0 auto; }
.other-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1px; background: rgba(201,168,76,0.12);
}

/* ── CTA bar ── */
.sub-cta-bar {
  background: var(--dark);
  border-top: 0.5px solid rgba(201,168,76,0.1);
  padding: 4rem;
  text-align: center;
}
.sub-cta-title { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300; color: var(--cream); margin-bottom: 1rem; }
.sub-cta-desc { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1rem; color: rgba(232,224,204,0.45); margin-bottom: 2rem; }

.not-found { padding: 10rem 4rem; text-align: center; color: var(--gold-dim); }

@media (max-width: 1100px) { .sub-content-inner { grid-template-columns: 1fr; gap: 3rem; } }
@media (max-width: 768px) {
  .sub-hero { padding: 3rem 1.5rem; }
  .sub-hero-monogram { display: none; }
  .sub-content-inner { padding: 3rem 1.5rem; }
  .other-section { padding: 3rem 1.5rem; }
  .other-grid { grid-template-columns: 1fr; }
  .sub-cta-bar { padding: 3rem 1.5rem; }
}
</style>
