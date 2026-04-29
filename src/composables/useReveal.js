import { onMounted, onUnmounted } from 'vue'

export function useReveal(selector = '.reveal', delay = 200) {
  let observer = null

  const init = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    setTimeout(() => {
      document.querySelectorAll(selector).forEach((el) => observer.observe(el))
    }, delay)
  }

  onMounted(init)
  onUnmounted(() => observer && observer.disconnect())

  return { reinit: init }
}
