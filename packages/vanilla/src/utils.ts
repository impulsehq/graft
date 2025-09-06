/**
 * utility functions for the embed library
 */

export function getElement(selector: string | HTMLElement): HTMLElement | null {
  if (typeof selector === 'string') {
    return document.querySelector(selector)
  }
  return selector
}

export function generateId(): string {
  return `impulse-embed-${Math.random().toString(36).substr(2, 9)}`
}

export function buildEmbedUrl(
  baseUrl: string,
  params?: Record<string, string>
): string {
  const url = new URL(baseUrl)

  // add embed-specific parameters
  url.searchParams.set('embed', 'true')

  // add custom parameters
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  return url.toString()
}

export function createIframe(
  src: string,
  options: {
    width?: string
    height?: string
    customCSS?: string
    onLoad?: () => void
  }
): HTMLIFrameElement {
  const iframe = document.createElement('iframe')

  iframe.src = src
  iframe.style.border = 'none'
  iframe.style.width = options.width || '100%'
  iframe.style.height = options.height || '600px'
  iframe.allow = 'camera; microphone; geolocation'
  iframe.loading = 'lazy'

  if (options.customCSS) {
    iframe.style.cssText += options.customCSS
  }

  if (options.onLoad) {
    iframe.onload = options.onLoad
  }

  return iframe
}

export function addGlobalStyles(): void {
  const styleId = 'impulse-embed-styles'

  // don't add styles if they already exist
  if (document.getElementById(styleId)) {
    return
  }

  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `
    .impulse-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .impulse-popup-overlay.visible {
      opacity: 1;
      visibility: visible;
    }
    
    .impulse-popup-container {
      position: relative;
      background: white;
      border-radius: 8px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      max-width: 95vw;
      max-height: 95vh;
      overflow: hidden;
      transform: scale(0.9);
      transition: transform 0.3s ease;
    }
    
    .impulse-popup-overlay.visible .impulse-popup-container {
      transform: scale(1);
    }
    
    .impulse-popup-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      cursor: pointer;
      z-index: 1000000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #666;
      transition: background-color 0.2s ease;
    }
    
    .impulse-popup-close:hover {
      background: rgba(0, 0, 0, 0.2);
    }
    
    .impulse-popup-close::before {
      content: "×";
    }
    
    .impulse-inline-container {
      width: 100%;
      overflow: hidden;
    }
  `

  document.head.appendChild(style)
}
