import { useEffect, useRef, useCallback } from 'react'
import { ImpulseEmbed, EmbedConfig, EmbedInstance } from '@impulse/embed-js'

export const useImpulseEmbed = (
  config: Omit<EmbedConfig, 'container' | 'trigger'>
) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const embedRef = useRef<EmbedInstance | null>(null)

  const createInlineEmbed = useCallback(() => {
    if (!containerRef.current) return

    // clean up existing embed
    if (embedRef.current) {
      embedRef.current.destroy()
    }

    // create new embed
    embedRef.current = new ImpulseEmbed({
      ...config,
      mode: 'inline',
      container: containerRef.current,
    })
  }, [config])

  const createPopupEmbed = useCallback(() => {
    if (!triggerRef.current) return

    // clean up existing embed
    if (embedRef.current) {
      embedRef.current.destroy()
    }

    // create new embed
    embedRef.current = new ImpulseEmbed({
      ...config,
      mode: 'popup',
      trigger: triggerRef.current,
    })
  }, [config])

  const open = useCallback(() => {
    if (embedRef.current) {
      embedRef.current.open()
    }
  }, [])

  const close = useCallback(() => {
    if (embedRef.current) {
      embedRef.current.close()
    }
  }, [])

  const reload = useCallback(() => {
    if (embedRef.current) {
      embedRef.current.reload()
    }
  }, [])

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (embedRef.current) {
        embedRef.current.destroy()
      }
    }
  }, [])

  return {
    containerRef,
    triggerRef,
    embedInstance: embedRef.current,
    createInlineEmbed,
    createPopupEmbed,
    open,
    close,
    reload,
    destroyEmbed: useCallback(() => {
      if (embedRef.current) {
        embedRef.current.destroy();
        embedRef.current = null; // Clear the ref after destroying
      }
    }, []),
  }
}
