// export components
export { ImpulseEmbed } from './components/impulse-embed'
export { ImpulseInlineEmbed } from './components/impulse-inline-embed'
export { ImpulsePopupEmbed } from './components/impulse-popup-embed'

// export hooks
export { useImpulseEmbed } from './hooks/use-impulse-embed'

// export types
export type {
  ImpulseEmbedProps,
  ImpulseInlineEmbedProps,
  ImpulsePopupEmbedProps,
} from './types'

// re-export types from vanilla package for convenience
export type {
  EmbedConfig,
  EmbedInstance,
  PopupOptions,
} from '@impulse/embed-js'

// default export
export { ImpulseEmbed as default } from './components/impulse-embed'
