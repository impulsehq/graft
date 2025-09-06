import { ImpulseEmbed } from './embed'
import { EmbedConfig, EmbedInstance, PopupOptions } from './types'

// export types
export type { EmbedConfig, EmbedInstance, PopupOptions }

// export main class
export { ImpulseEmbed }

// convenience function for creating embeds
export function createEmbed(config: EmbedConfig): EmbedInstance {
  return new ImpulseEmbed(config)
}

// auto-initialization from script tag data attributes
function autoInit(): void {
  // look for script tag with data attributes
  const scripts = document.querySelectorAll('script[data-impulse-url]')

  scripts.forEach((script) => {
    const element = script as HTMLScriptElement

    const config: EmbedConfig = {
      url: element.dataset.impulseUrl!,
      mode: (element.dataset.impulseMode as 'inline' | 'popup') || 'inline',
      container: element.dataset.impulseContainer,
      trigger: element.dataset.impulseTrigger,
      width: element.dataset.impulseWidth,
      height: element.dataset.impulseHeight,
    }

    // parse additional parameters
    if (element.dataset.impulseParams) {
      try {
        config.params = JSON.parse(element.dataset.impulseParams)
      } catch (e) {
        console.warn('ImpulseEmbed: Invalid params JSON', e)
      }
    }

    // create embed instance
    try {
      createEmbed(config)
    } catch (error) {
      console.error('ImpulseEmbed auto-init failed:', error)
    }
  })
}

// auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInit)
} else {
  autoInit()
}

// global namespace for UMD build
if (typeof window !== 'undefined') {
  ;(window as any).ImpulseEmbed = ImpulseEmbed
  ;(window as any).createImpulseEmbed = createEmbed
}

// default export for convenience
export default ImpulseEmbed
