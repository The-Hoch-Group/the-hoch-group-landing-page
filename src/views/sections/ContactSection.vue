<template>
  <section class="section contact-section" id="contact">
    <div class="contact-inner reveal">
      <span class="section-label">Get in Touch</span>
      <h2 class="section-title">Let's Build<br><em>Something Great Together</em></h2>
      <div class="ornament-line" style="justify-content:center">
        <span class="ornament-label">Hoch Group — Accra, Ghana</span>
      </div>
      <p class="contact-body">Whether you're an investor, developer, institution, or individual with a vision — our team is ready to listen, advise, and deliver. Reach out and let's begin.</p>

      <div class="contact-actions">
        <button class="btn-primary" @click="$emit('open-modal')">Send an Enquiry</button>
        <a class="btn-ghost" href="tel:+233592763541">Call Us</a>
      </div>

      <div class="contact-details">
        <div class="contact-detail">
          <div class="contact-detail-label">Email</div>
          <div class="contact-detail-val">
            <a class="contact-link" href="mailto:info@thehochgroup.com">info@thehochgroup.com</a>
          </div>
        </div>
        <div class="contact-detail">
          <div class="contact-detail-label">Location</div>
          <div class="contact-detail-val">Accra, Ghana</div>
        </div>
        <div class="contact-detail">
          <div class="contact-detail-label">Domain</div>
          <div class="contact-detail-val">thehochgroup.com</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useReveal } from '@/composables/useReveal.js'
defineEmits(['open-modal'])
useReveal('#contact .reveal', 200)
</script>

<style scoped>
.contact-section { background: var(--black); text-align: center; }
.contact-inner { max-width: 700px; margin: 0 auto; }
.contact-body { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 300; line-height: 1.9; color: var(--cream-dim); margin-bottom: 3rem; }
.contact-actions { display: flex; gap: 1.2rem; justify-content: center; flex-wrap: wrap; margin-bottom: 4rem; }
.contact-details { display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap; }
.contact-detail-label { font-size: 0.52rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold-dim); margin-bottom: 0.4rem; }
.contact-detail-val { font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; color: var(--cream-dim); }
.contact-link { color: var(--cream-dim); text-decoration: none; transition: color 0.3s; }
.contact-link:hover { color: var(--gold); }
@media (max-width: 768px) { .contact-details { gap: 2rem; } }
</style>
