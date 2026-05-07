<template>
  <section class="hero">
    <video class="hero-video" autoplay muted loop playsinline>
      <source src="https://res.cloudinary.com/degd6ahfu/video/upload/v1778117184/ESP_NIght_Shot_oymgfc.mp4" type="video/mp4">
    </video>
    <div class="hero-grid" />
    <div class="hero-radial" />
    <div class="hero-corner tl" />
    <div class="hero-corner tr" />
    <div class="hero-corner bl" />
    <div class="hero-corner br" />

    <div class="hero-content">
      <p class="hero-eyebrow">Accra · Africa · Excellence</p>
      <h1 class="hero-title"><span class="gold">HOCH</span> GROUP</h1>
      <div class="hero-rule">
        <div class="hero-rule-line" />
        <div class="hero-rule-diamond" />
        <div class="hero-rule-line" />
      </div>
      <p class="hero-subtitle">
        A constellation of premium enterprises united by one uncompromising commitment —
        to build, develop, and deliver at the highest standard.
      </p>
      <div class="hero-actions">
        <button class="btn-primary" @click="goSubsidiaries">Explore Our Companies</button>
        <button class="btn-ghost"   @click="goAbout">Our Story</button>
      </div>
    </div>

    <div class="hero-scroll" @click="goAbout" role="button" tabindex="0" @keydown.enter="goAbout">
      <div class="hero-scroll-line" />
      Scroll
    </div>
  </section>
</template>

<script setup>
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
const goAbout       = () => scrollTo('about')
const goSubsidiaries = () => scrollTo('subsidiaries')
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  background: var(--black);
}
.hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  z-index: 1;
}
.hero-radial {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 800px; height: 800px;
  background: radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
  filter: drop-shadow(20px 20px 20px black) invert(15%);
}
.hero-corner { position: absolute; width: 100px; height: 100px; pointer-events: none; z-index: 1; }
.hero-corner.tl { top: 7rem; left: 4rem; border-top: 0.5px solid rgba(201,168,76,0.3); border-left: 0.5px solid rgba(201,168,76,0.3); }
.hero-corner.tr { top: 7rem; right: 4rem; border-top: 0.5px solid rgba(201,168,76,0.3); border-right: 0.5px solid rgba(201,168,76,0.3); }
.hero-corner.bl { bottom: 4rem; left: 4rem; border-bottom: 0.5px solid rgba(201,168,76,0.3); border-left: 0.5px solid rgba(201,168,76,0.3); }
.hero-corner.br { bottom: 4rem; right: 4rem; border-bottom: 0.5px solid rgba(201,168,76,0.3); border-right: 0.5px solid rgba(201,168,76,0.3); }

.hero-content {
  text-align: center; z-index: 2; padding: 2rem;
  animation: fadeUp 1.1s ease forwards;
}
.hero-eyebrow { font-size: 0.62rem; letter-spacing: 0.42em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.8rem; opacity: 0.85; }
.hero-title { font-family: 'Cinzel', serif; font-size: clamp(3.5rem, 9vw, 7.5rem); font-weight: 400; letter-spacing: 0.15em; color: var(--cream); line-height: 1; }
.hero-title .gold { color: var(--gold); }
.hero-rule { display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 1.8rem auto; }
.hero-rule-line { flex: 1; max-width: 100px; height: 0.5px; background: var(--gold-dim); opacity: 0.6; }
.hero-rule-diamond { width: 6px; height: 6px; background: var(--gold); transform: rotate(45deg); }
.hero-subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-weight: 300; font-style: italic;
  color: var(--cream-dim); letter-spacing: 0.05em;
  max-width: 520px; margin: 0 auto 3rem; line-height: 1.8;
}
.hero-actions { display: flex; gap: 1.2rem; justify-content: center; flex-wrap: wrap; }
.hero-scroll {
  position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  color: rgba(201,168,76,0.5); font-size: 0.52rem; letter-spacing: 0.3em;
  text-transform: uppercase; animation: scrollPulse 2s ease-in-out infinite; cursor: pointer;
  z-index: 2;
}
.hero-scroll-line { width: 0.5px; height: 40px; background: linear-gradient(to bottom, rgba(201,168,76,0.5), transparent); }

@media (max-width: 768px) { .hero-corner { display: none; } }
</style>
