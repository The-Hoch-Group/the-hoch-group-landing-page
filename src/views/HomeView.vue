<template>
  <div>
    <HeroSection />
    <MarqueeBar />
    <AboutSection />
    <SubsidiariesSection />
    <ServicesSection />
    <ContactSection @open-modal="$emit('open-modal')" />
  </div>
</template>

<script setup>
import HeroSection        from './sections/HeroSection.vue'
import MarqueeBar         from './sections/MarqueeBar.vue'
import AboutSection       from './sections/AboutSection.vue'
import SubsidiariesSection from './sections/SubsidiariesSection.vue'
import ServicesSection    from './sections/ServicesSection.vue'
import ContactSection     from './sections/ContactSection.vue'

defineEmits(['open-modal'])
</script>
