<template>
  <div class="marquee-wrap">
    <div class="marquee">
      <span v-for="(item, i) in items" :key="i" class="marquee-item">{{ item }}</span>
    </div>
  </div>
</template>

<script setup>
import { marqueeItems as items } from '@/data/index.js'
</script>
