<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="modal-overlay" @click.self="close" role="dialog" aria-modal="true">
        <div class="modal-box">
          <button class="modal-close" @click="close" aria-label="Close">&times;</button>

          <!-- Form -->
          <template v-if="!submitted">
            <p class="modal-eyebrow">Get in Touch</p>
            <h2 class="modal-title">Send an Enquiry</h2>
            <p class="modal-subtitle">Our team will respond within one business day.</p>
            <div class="modal-divider" />

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input class="form-input" :class="{ error: errors.name }" v-model="form.name"
                  placeholder="Your full name" type="text" />
                <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
              </div>
              <div class="form-group">
                <label class="form-label">Email Address *</label>
                <input class="form-input" :class="{ error: errors.email }" v-model="form.email"
                  placeholder="you@example.com" type="email" />
                <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input class="form-input" v-model="form.phone" placeholder="+233 ..." type="tel" />
              </div>
              <div class="form-group">
                <label class="form-label">Company / Organisation</label>
                <input class="form-input" v-model="form.company" placeholder="Optional" type="text" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Enquiry Type</label>
              <select class="form-select" v-model="form.type">
                <option>General</option>
                <option>HOCH Properties</option>
                <option>HOCH Build</option>
                <option>HOCH Interior</option>
                <option>HOCH Projects</option>
                <option>Partnership</option>
                <option>Careers</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Your Message *</label>
              <textarea class="form-textarea" :class="{ error: errors.message }" v-model="form.message"
                placeholder="Tell us about your project, requirements, or how we can help..." />
              <span v-if="errors.message" class="form-error">{{ errors.message }}</span>
            </div>

            <!-- Server-level error banner -->
            <div v-if="serverError" class="server-error">
              {{ serverError }}
            </div>

            <button class="btn-primary modal-submit" @click="submit" :disabled="submitting">
              <span v-if="submitting" class="submit-inner">
                <span class="spinner" /> Sending…
              </span>
              <span v-else>Submit Enquiry</span>
            </button>
          </template>

          <!-- Success -->
          <div v-else class="success-state">
            <div class="success-icon">◆</div>
            <h3 class="success-title">Enquiry Received</h3>
            <p class="success-msg">
              Thank you, {{ firstName }}. A member of the HOCH Group team will be in touch
              with you shortly. A confirmation has been sent to {{ form.email }}.
            </p>
            <button class="btn-ghost" style="margin-top:2rem" @click="close">Close</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  prefill: { type: String, default: 'General' }
})
const emit = defineEmits(['update:modelValue'])

const form = reactive({
  name: '', email: '', phone: '', company: '', type: 'General', message: ''
})
const errors = reactive({})
const submitted = ref(false)
const submitting = ref(false)
const serverError = ref('')

const firstName = computed(() => form.name.split(' ')[0])

watch(() => props.prefill, (v) => { if (v) form.type = v })
watch(() => props.modelValue, (v) => { if (!v) reset() })

function reset() {
  setTimeout(() => {
    submitted.value = false
    serverError.value = ''
    Object.keys(form).forEach(k => (form[k] = k === 'type' ? 'General' : ''))
    Object.keys(errors).forEach(k => delete errors[k])
  }, 300)
}

function close() {
  emit('update:modelValue', false)
}

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
    errors.email = 'Enter a valid email'
  if (!form.message.trim()) errors.message = 'Please tell us about your enquiry'
  return !Object.keys(errors).length
}

async function submit() {
  if (!validate()) return

  submitting.value = true
  serverError.value = ''

  try {
    const res = await fetch('/api/enquire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form }),
    })

    const data = await res.json()

    if (!res.ok) {
      // Surface the server's error message (validation, SMTP failure, etc.)
      serverError.value = data.error || 'Something went wrong. Please try again.'
      return
    }

    submitted.value = true

  } catch {
    serverError.value = 'Network error — please check your connection and try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(6, 6, 5, 0.92);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-box {
  background: var(--dark-card);
  border: 0.5px solid rgba(201, 168, 76, 0.2);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 3rem;
  position: relative;
  animation: slideUp 0.3s ease;
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: var(--gold-dim);
  font-size: 1.4rem;
  cursor: pointer;
  transition: color 0.3s;
  line-height: 1;
}

.modal-close:hover {
  color: var(--gold);
}

.modal-eyebrow {
  font-size: 0.58rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.8rem;
}

.modal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 300;
  color: var(--cream);
  margin-bottom: 0.5rem;
}

.modal-subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1rem;
  color: rgba(232, 224, 204, 0.45);
  margin-bottom: 2.5rem;
}

.modal-divider {
  height: 0.5px;
  background: rgba(201, 168, 76, 0.15);
  margin-bottom: 2.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.form-label {
  font-size: 0.58rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold-dim);
}

.form-input,
.form-select,
.form-textarea {
  background: rgba(201, 168, 76, 0.04);
  border: 0.5px solid rgba(201, 168, 76, 0.2);
  color: var(--cream);
  font-family: 'Jost', sans-serif;
  font-size: 0.82rem;
  font-weight: 300;
  padding: 0.8rem 1rem;
  outline: none;
  transition: border-color 0.3s;
  width: 100%;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: var(--gold);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(232, 224, 204, 0.2);
}

.form-select option {
  background: var(--dark);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-input.error,
.form-textarea.error {
  border-color: #c94c4c;
}

.form-error {
  font-size: 0.58rem;
  color: #c97a7a;
  letter-spacing: 0.1em;
}

/* Server error banner */
.server-error {
  background: rgba(201, 76, 76, 0.08);
  border: 0.5px solid rgba(201, 76, 76, 0.35);
  color: #c97a7a;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  line-height: 1.6;
  padding: 0.85rem 1rem;
  margin-bottom: 1rem;
}

.modal-submit {
  width: 100%;
  margin-top: 1.5rem;
}

/* Spinner inside button */
.submit-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1.5px solid rgba(6, 6, 5, 0.35);
  border-top-color: var(--black);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

/* Success state */
.success-state {
  text-align: center;
  padding: 3rem 0;
}

.success-icon {
  font-size: 2.5rem;
  color: var(--gold);
  margin-bottom: 1.5rem;
}

.success-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--cream);
  margin-bottom: 0.8rem;
}

.success-msg {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1rem;
  color: rgba(232, 224, 204, 0.5);
  line-height: 1.8;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 600px) {
  .modal-box {
    padding: 2rem 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>