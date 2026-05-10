import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)

  gsap.defaults({
    ease: 'power3.out',
    duration: 0.9,
  })

  gsap.config({
    autoSleep: 60,
    nullTargetWarn: false,
  })
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin }
