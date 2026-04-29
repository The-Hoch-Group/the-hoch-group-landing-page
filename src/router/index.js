import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SubsidiaryView from '@/views/SubsidiaryView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/properties', name: 'properties', component: SubsidiaryView, props: { id: 'properties' } },
  { path: '/build',      name: 'build',      component: SubsidiaryView, props: { id: 'build' } },
  { path: '/interior',   name: 'interior',   component: SubsidiaryView, props: { id: 'interior' } },
  { path: '/projects',   name: 'projects',   component: SubsidiaryView, props: { id: 'projects' } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    return { top: 0 }
  }
})

export default router
