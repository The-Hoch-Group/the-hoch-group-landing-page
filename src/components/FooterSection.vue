<template>
  <footer class="footer">
    <div class="footer-inner">
      <div>
        <div class="footer-brand">HOCH GROUP</div>
        <p class="footer-tagline">"Excellence Across Every Frontier."</p>
        <p class="footer-desc">A premium holding company headquartered in Accra, Ghana — building, developing, and delivering world-class outcomes across four integrated subsidiaries.</p>
      </div>

      <div>
        <div class="footer-col-title">Subsidiaries</div>
        <ul class="footer-links">
          <li><span @click="goSub('properties')">HOCH Properties</span></li>
          <li><span @click="goSub('build')">HOCH Build</span></li>
          <li><span @click="goSub('interior')">HOCH Interior</span></li>
          <li><span @click="goSub('projects')">HOCH Projects</span></li>
        </ul>
      </div>

      <div>
        <div class="footer-col-title">Services</div>
        <ul class="footer-links">
          <li><span @click="scrollTo('services')">Real Estate</span></li>
          <li><span @click="scrollTo('services')">Construction Supply</span></li>
          <li><span @click="scrollTo('services')">Interior Finishing</span></li>
          <li><span @click="scrollTo('services')">Project Management</span></li>
          <li><span @click="scrollTo('services')">Consultancy</span></li>
        </ul>
      </div>

      <div>
        <div class="footer-col-title">Company</div>
        <ul class="footer-links">
          <li><span @click="scrollTo('about')">About the Group</span></li>
          <li><span @click="scrollTo('subsidiaries')">Our Companies</span></li>
          <li><span @click="$emit('open-modal')">Careers</span></li>
          <li><span @click="$emit('open-modal')">News & Projects</span></li>
          <li><span @click="scrollTo('contact')">Contact</span></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-copy">© 2025 Hoch Group. All rights reserved. Accra, Ghana.</p>
      <p class="footer-domain">thehochgroup.com</p>
    </div>
  </footer>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { nextTick } from 'vue'

defineEmits(['open-modal'])
const router = useRouter()
const route = useRoute()

function scrollTo(id) {
  if (route.path !== '/') {
    router.push('/').then(() => nextTick(() => setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 150)))
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function goSub(id) {
  router.push('/' + id)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer {
  background: var(--dark-card);
  border-top: 0.5px solid rgba(201,168,76,0.12);
  padding: 3.5rem 4rem 2rem;
}
.footer-inner {
  max-width: 1400px; margin: 0 auto;
  display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 3rem; margin-bottom: 2.5rem;
}
.footer-brand { font-family: 'Cinzel', serif; font-size: 1rem; letter-spacing: 0.3em; color: var(--gold); margin-bottom: 0.8rem; }
.footer-tagline { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 0.9rem; color: rgba(232,224,204,0.4); line-height: 1.7; margin-bottom: 1.5rem; }
.footer-desc { font-size: 0.65rem; color: rgba(232,224,204,0.22); letter-spacing: 0.06em; line-height: 1.9; }
.footer-col-title { font-size: 0.52rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold-dim); margin-bottom: 1.2rem; }
.footer-links { list-style: none; }
.footer-links li { margin-bottom: 0.65rem; }
.footer-links span {
  font-size: 0.75rem; font-weight: 300;
  color: rgba(232,224,204,0.42);
  cursor: pointer; transition: color 0.3s; letter-spacing: 0.04em;
}
.footer-links span:hover { color: var(--gold); }
.footer-bottom {
  max-width: 1400px; margin: 0 auto;
  padding-top: 1.5rem;
  border-top: 0.5px solid rgba(201,168,76,0.08);
  display: flex; justify-content: space-between; align-items: center;
}
.footer-copy { font-size: 0.58rem; letter-spacing: 0.12em; color: rgba(232,224,204,0.22); }
.footer-domain { font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.2em; color: rgba(201,168,76,0.28); }

@media (max-width: 1100px) { .footer-inner { grid-template-columns: 1fr 1fr; } }
@media (max-width: 768px) {
  .footer { padding: 3rem 1.5rem 2rem; }
  .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
  .footer-bottom { flex-direction: column; gap: 0.8rem; text-align: center; }
}
</style>
