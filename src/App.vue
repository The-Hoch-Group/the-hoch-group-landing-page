<template>
  <NavBar @open-modal="openModal" />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" @open-modal="openModal" />
    </transition>
  </router-view>

  <FooterSection @open-modal="openModal" />

  <EnquireModal v-model="modalOpen" :prefill="modalPrefill" />
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import EnquireModal from '@/components/EnquireModal.vue'

const modalOpen = ref(false)
const modalPrefill = ref('General')

function openModal(type = 'General') {
  modalPrefill.value = type
  modalOpen.value = true
}
</script>
