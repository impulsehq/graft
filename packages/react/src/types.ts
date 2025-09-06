import { ReactNode } from 'react'
import { EmbedConfig as BaseEmbedConfig } from '@impulse/embed-js'

export interface ImpulseEmbedProps
  extends Omit<BaseEmbedConfig, 'container' | 'trigger'> {
  /** additional CSS class name for the container */
  className?: string
  /** inline styles for the container */
  style?: React.CSSProperties
  /** children to render inside popup trigger */
  children?: ReactNode
}

export interface ImpulseInlineEmbedProps
  extends Omit<ImpulseEmbedProps, 'mode' | 'children'> {
  mode?: never
  children?: never
}

export interface ImpulsePopupEmbedProps
  extends Omit<ImpulseEmbedProps, 'mode'> {
  mode?: never
  /** content for the trigger button/element */
  children: ReactNode
  /** custom trigger element type */
  triggerAs?: keyof JSX.IntrinsicElements
  /** props to pass to the trigger element */
  triggerProps?: Record<string, any>
}
