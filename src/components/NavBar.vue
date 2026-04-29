<template>
  <nav class="navbar" :class="{ scrolled }">
    <a class="nav-logo" @click="goHome" tabindex="0" @keydown.enter="goHome">
      HOCH <span>GROUP</span>
    </a>

    <!-- Desktop links -->
    <ul class="nav-links">
      <template v-if="isHome">
        <li><a class="nav-link" :class="{ active: activeSection === 'about' }"        @click="scrollTo('about')">About</a></li>
        <li><a class="nav-link" :class="{ active: activeSection === 'subsidiaries' }" @click="scrollTo('subsidiaries')">Subsidiaries</a></li>
        <li><a class="nav-link" :class="{ active: activeSection === 'services' }"     @click="scrollTo('services')">Services</a></li>
        <li><a class="nav-link" :class="{ active: activeSection === 'contact' }"      @click="scrollTo('contact')">Contact</a></li>
      </template>
      <template v-else>
        <li><a class="nav-link" @click="goHome">← Back to Group</a></li>
        <li><a class="nav-link" @click="scrollTo('subsidiaries')">All Companies</a></li>
      </template>
    </ul>

    <button class="nav-cta" @click="$emit('open-modal')">Enquire</button>

    <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
      <span /><span /><span />
    </button>
  </nav>

  <!-- Mobile overlay -->
  <div class="mobile-menu" :class="{ open: menuOpen }">
    <template v-if="isHome">
      <a class="nav-link" @click="scrollTo('about')">About</a>
      <a class="nav-link" @click="scrollTo('subsidiaries')">Subsidiaries</a>
      <a class="nav-link" @click="scrollTo('services')">Services</a>
      <a class="nav-link" @click="scrollTo('contact')">Contact</a>
    </template>
    <template v-else>
      <a class="nav-link" @click="goHome">← Back to Group</a>
      <a class="nav-link" @click="scrollTo('subsidiaries')">All Companies</a>
    </template>
    <button class="nav-cta" @click="mobileEnquire">Enquire</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const emit = defineEmits(['open-modal'])
const router = useRouter()
const route  = useRoute()

const scrolled     = ref(false)
const menuOpen     = ref(false)
const activeSection = ref('hero')

const isHome = computed(() => route.path === '/')

/* ── scroll shrink ── */
const onScroll = () => { scrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

/* ── active-section tracker ── */
let sectionObserver = null
function setupObserver() {
  sectionObserver?.disconnect()
  sectionObserver = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) activeSection.value = e.target.id }),
    { threshold: 0.3 }
  )
  ;['about', 'subsidiaries', 'services', 'contact'].forEach(id => {
    const el = document.getElementById(id)
    if (el) sectionObserver.observe(el)
  })
}
onMounted(() => setTimeout(setupObserver, 500))
onUnmounted(() => sectionObserver?.disconnect())
watch(() => route.path, () => { if (route.path === '/') setTimeout(setupObserver, 600) })

/* ── navigation helpers ── */
function scrollTo(id) {
  menuOpen.value = false
  if (route.path !== '/') {
    router.push('/').then(() => nextTick(() => setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 150)))
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function goHome() {
  menuOpen.value = false
  router.push('/')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function mobileEnquire() {
  menuOpen.value = false
  emit('open-modal')
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 4rem;
  background: rgba(6,6,5,0.9);
  backdrop-filter: blur(14px);
  border-bottom: 0.5px solid rgba(201,168,76,0.15);
  transition: padding 0.3s ease;
}
.navbar.scrolled { padding: 0.85rem 4rem; }

.nav-logo {
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  letter-spacing: 0.35em;
  color: var(--gold);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}
.nav-logo span { color: var(--cream); font-weight: 400; }

.nav-links { display: flex; gap: 2.5rem; list-style: none; align-items: center; }

.nav-link {
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--cream-dim);
  text-decoration: none;
  cursor: pointer;
  padding: 0.3rem 0;
  border-bottom: 0.5px solid transparent;
  transition: var(--transition);
}
.nav-link:hover, .nav-link.active { color: var(--gold); border-bottom-color: var(--gold); }

.nav-cta {
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  border: 0.5px solid var(--gold-dim);
  padding: 0.55rem 1.4rem;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  transition: var(--transition);
}
.nav-cta:hover { background: var(--gold); color: var(--black); }

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 4px;
  background: none;
  border: none;
}
.hamburger span { display: block; width: 22px; height: 1px; background: var(--gold); transition: var(--transition); }
.hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }

.mobile-menu {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 199;
  background: rgba(6,6,5,0.98);
  backdrop-filter: blur(20px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
}
.mobile-menu.open { display: flex; }
.mobile-menu .nav-link { font-size: 1rem; letter-spacing: 0.3em; }
.mobile-menu .nav-cta { font-size: 0.8rem; margin-top: 1rem; }

@media (max-width: 768px) {
  .navbar { padding: 1.1rem 1.5rem !important; }
  .nav-links { display: none; }
  .nav-cta { display: none; }
  .hamburger { display: flex; }
}
</style>
