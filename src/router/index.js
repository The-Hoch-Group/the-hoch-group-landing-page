import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SubsidiaryView from '@/views/SubsidiaryView.vue'

const routes = [
  { path: '/',            name: 'home',       component: HomeView },
  { path: '/properties',  name: 'properties', component: SubsidiaryView },
  { path: '/build',       name: 'build',      component: SubsidiaryView },
  { path: '/interior',    name: 'interior',   component: SubsidiaryView },
  { path: '/projects',    name: 'projects',   component: SubsidiaryView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    return { top: 0 }
  }
})

export default router