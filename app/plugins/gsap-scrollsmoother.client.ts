import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) {
    return
  }

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

  let smoother: ScrollSmoother | null = null

  const cleanup = () => {
    if (smoother) {
      smoother.kill()
      smoother = null
    }

    //ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    ScrollTrigger.refresh()
  }

  const init = () => {
    //cleanup()

    const wrapper = document.getElementById('smooth-wrapper')
    const content = document.getElementById('smooth-content')

    if (!wrapper || !content) {
      return
    }

    smoother = ScrollSmoother.create({
      wrapper,
      content,
      smooth: 1,
      normalizeScroll: true,
      effects: true,
      ignoreMobileResize: true,
    })

    ScrollTrigger.refresh()
  }

  nuxtApp.hook('page:start', () => {
    //cleanup()
  })

  nuxtApp.hook('page:finish', () => {
    window.setTimeout(() => {
      init()
    }, 0)
  })

  nuxtApp.hook('app:mounted', () => {
    window.setTimeout(() => {
      init()
    }, 0)
  })
})
