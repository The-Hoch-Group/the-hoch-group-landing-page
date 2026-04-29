<template>
  <section class="section about-section" id="about">
    <div class="about-inner">

      <!-- Visual column -->
      <div class="about-visual reveal">
        <div class="about-accent" />
        <div class="about-frame">
          <div class="about-frame-inner">
            <div class="about-monogram">HG</div>
          </div>
          <div class="about-stat-grid">
            <div class="about-stat"><div class="about-stat-num">4</div><div class="about-stat-label">Subsidiaries</div></div>
            <div class="about-stat"><div class="about-stat-num">1</div><div class="about-stat-label">Vision</div></div>
            <div class="about-stat"><div class="about-stat-num">∞</div><div class="about-stat-label">Potential</div></div>
            <div class="about-stat"><div class="about-stat-num">GH</div><div class="about-stat-label">Based in Africa</div></div>
          </div>
        </div>
      </div>

      <!-- Text column -->
      <div class="about-text reveal reveal-delay-2">
        <span class="section-label">Who We Are</span>
        <h2 class="section-title">Built on Precision.<br><em>Driven by Excellence.</em></h2>
        <div class="ornament-line"><span class="ornament-label">Est. Hoch Group</span></div>

        <p><strong>HOCH Group</strong> is a premier multi-sector holding company headquartered in Accra, Ghana, operating at the intersection of real estate, construction, interior design, and project management.</p>
        <p>Our four integrated subsidiaries are designed to serve every dimension of the built environment — from land acquisition and estate development, through construction supply and infrastructure, to premium finishing and institutional project delivery.</p>
        <p>We do not merely build properties. We craft legacies — spaces that stand as testaments to <strong>craft, vision, and enduring value</strong>.</p>

        <div class="about-pillars">
          <div class="pillar"><div class="pillar-dot" /><span class="pillar-text">Integrity in every project</span></div>
          <div class="pillar"><div class="pillar-dot" /><span class="pillar-text">Pan-African ambition</span></div>
          <div class="pillar"><div class="pillar-dot" /><span class="pillar-text">World-class partnerships</span></div>
          <div class="pillar"><div class="pillar-dot" /><span class="pillar-text">Luxury at every level</span></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useReveal } from '@/composables/useReveal.js'
useReveal('#about .reveal')
</script>

<style scoped>
.about-section { background: var(--dark); }
.about-inner {
  max-width: 1400px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 5rem; align-items: center;
}
.about-visual { position: relative; }
.about-accent { position: absolute; top: -1rem; right: -1rem; width: 80px; height: 80px; border-top: 1px solid var(--gold-dim); border-right: 1px solid var(--gold-dim); }
.about-frame {
  width: 100%; aspect-ratio: 3/4;
  background: var(--dark-card);
  border: 0.5px solid rgba(201,168,76,0.2);
  position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.about-frame-inner {
  position: absolute; inset: 1.5rem;
  border: 0.5px solid rgba(201,168,76,0.1);
  display: flex; align-items: center; justify-content: center;
}
.about-monogram { font-family: 'Cinzel', serif; font-size: 7rem; font-weight: 400; color: rgba(201,168,76,0.08); letter-spacing: 0.1em; user-select: none; }
.about-stat-grid {
  position: absolute; bottom: 2rem; left: 2rem; right: 2rem;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 0.5px; background: rgba(201,168,76,0.1);
}
.about-stat { background: rgba(14,13,10,0.95); padding: 1.2rem; text-align: center; }
.about-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 400; color: var(--gold); line-height: 1; margin-bottom: 0.3rem; }
.about-stat-label { font-size: 0.52rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(232,224,204,0.45); }
.about-text p { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 300; line-height: 1.9; color: var(--cream-dim); margin-bottom: 1.5rem; }
.about-text p strong { color: var(--gold); font-weight: 400; }
.about-pillars { margin-top: 2.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
.pillar { display: flex; align-items: flex-start; gap: 0.8rem; }
.pillar-dot { width: 4px; height: 4px; background: var(--gold); margin-top: 0.4rem; flex-shrink: 0; }
.pillar-text { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--cream-dim); line-height: 1.6; }

@media (max-width: 1100px) {
  .about-inner { grid-template-columns: 1fr; }
  .about-visual { display: none; }
}
</style>
