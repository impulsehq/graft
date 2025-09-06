import { EmbedConfig, EmbedInstance, PopupOptions } from './types'
import {
  getElement,
  generateId,
  buildEmbedUrl,
  createIframe,
  addGlobalStyles,
} from './utils'

export class ImpulseEmbed implements EmbedInstance {
  private config: EmbedConfig
  private iframe: HTMLIFrameElement | null = null
  private popupOverlay: HTMLElement | null = null
  private container: HTMLElement | null = null
  private trigger: HTMLElement | null = null
  private embedId: string
  private isDestroyed = false

  constructor(config: EmbedConfig) {
    this.config = { ...config }
    this.embedId = generateId()

    // validate configuration
    this.validateConfig()

    // add global styles
    addGlobalStyles()

    // initialize based on mode
    this.init()
  }

  private validateConfig(): void {
    if (!this.config.url) {
      throw new Error('ImpulseEmbed: url is required')
    }

    if (this.config.mode === 'inline' && !this.config.container) {
      throw new Error('ImpulseEmbed: container is required for inline mode')
    }

    if (this.config.mode === 'popup' && !this.config.trigger) {
      throw new Error('ImpulseEmbed: trigger is required for popup mode')
    }
  }

  private init(): void {
    if (this.config.mode === 'inline') {
      this.initInline()
    } else {
      this.initPopup()
    }

    // setup message listener for iframe communication
    this.setupMessageListener()
  }

  private initInline(): void {
    this.container = getElement(this.config.container!)
    if (!this.container) {
      throw new Error('ImpulseEmbed: container element not found')
    }

    this.container.classList.add('impulse-inline-container')
    this.createAndAppendIframe(this.container)
  }

  private initPopup(): void {
    this.trigger = getElement(this.config.trigger!)
    if (!this.trigger) {
      throw new Error('ImpulseEmbed: trigger element not found')
    }

    // add click listener to trigger
    this.trigger.addEventListener('click', this.handleTriggerClick.bind(this))
    this.trigger.style.cursor = 'pointer'
  }

  private handleTriggerClick = (event: Event): void => {
    event.preventDefault()
    this.open()
  }

  private createAndAppendIframe(parent: HTMLElement): void {
    const embedUrl = buildEmbedUrl(this.config.url, this.config.params)

    this.iframe = createIframe(embedUrl, {
      width: this.config.width,
      height: this.config.height,
      customCSS: this.config.customCSS,
      onLoad: this.config.onLoad,
    })

    this.iframe.id = this.embedId
    parent.appendChild(this.iframe)
  }

  private createPopupOverlay(): HTMLElement {
    const overlay = document.createElement('div')
    overlay.className = 'impulse-popup-overlay'
    overlay.id = `${this.embedId}-overlay`

    const container = document.createElement('div')
    container.className = 'impulse-popup-container'

    // apply custom popup styles if provided
    if (this.config.customCSS) {
      container.style.cssText += this.config.customCSS
    }

    // create close button
    const closeButton = document.createElement('button')
    closeButton.className = 'impulse-popup-close'
    closeButton.onclick = () => this.close()

    container.appendChild(closeButton)

    // create iframe for popup
    this.createAndAppendIframe(container)

    overlay.appendChild(container)

    // close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.close()
      }
    })

    // close on escape key
    document.addEventListener('keydown', this.handleEscapeKey)

    return overlay
  }

  private handleEscapeKey = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.popupOverlay) {
      this.close()
    }
  }

  private setupMessageListener(): void {
    window.addEventListener('message', this.handleMessage.bind(this))
  }

  private handleMessage(event: MessageEvent): void {
    // only listen to messages from our iframe
    if (!this.iframe || event.source !== this.iframe.contentWindow) {
      return
    }

    const { type, data } = event.data

    switch (type) {
      case 'impulse:form:submit':
        if (this.config.onSubmit) {
          this.config.onSubmit(data)
        }
        break
      case 'impulse:form:close':
        if (this.config.mode === 'popup') {
          this.close()
        }
        break
      case 'impulse:form:resize':
        if (this.config.mode === 'inline' && this.iframe) {
          this.iframe.style.height = `${data.height}px`
        }
        break
    }
  }

  // public api methods
  public open(): void {
    if (this.isDestroyed || this.config.mode !== 'popup') {
      return
    }

    if (!this.popupOverlay) {
      this.popupOverlay = this.createPopupOverlay()
      document.body.appendChild(this.popupOverlay)
    }

    // prevent body scroll
    document.body.style.overflow = 'hidden'

    // show popup with animation
    requestAnimationFrame(() => {
      this.popupOverlay!.classList.add('visible')
    })
  }

  public close(): void {
    if (this.isDestroyed || !this.popupOverlay) {
      return
    }

    // hide popup with animation
    this.popupOverlay.classList.remove('visible')

    // remove from DOM after animation
    setTimeout(() => {
      if (this.popupOverlay && this.popupOverlay.parentNode) {
        this.popupOverlay.parentNode.removeChild(this.popupOverlay)
        this.popupOverlay = null
      }

      // restore body scroll
      document.body.style.overflow = ''

      if (this.config.onClose) {
        this.config.onClose()
      }
    }, 300)

    // clean up iframe
    this.iframe = null
  }

  public reload(): void {
    if (this.isDestroyed || !this.iframe) {
      return
    }

    const embedUrl = buildEmbedUrl(this.config.url, this.config.params)
    this.iframe.src = embedUrl
  }

  public destroy(): void {
    if (this.isDestroyed) {
      return
    }

    this.isDestroyed = true

    // clean up popup
    if (this.config.mode === 'popup') {
      this.close()

      if (this.trigger) {
        this.trigger.removeEventListener('click', this.handleTriggerClick)
        this.trigger.style.cursor = ''
      }
    }

    // clean up inline
    if (
      this.config.mode === 'inline' &&
      this.iframe &&
      this.iframe.parentNode
    ) {
      this.iframe.parentNode.removeChild(this.iframe)
    }

    // remove event listeners
    document.removeEventListener('keydown', this.handleEscapeKey)
    window.removeEventListener('message', this.handleMessage)

    // clear references
    this.iframe = null
    this.container = null
    this.trigger = null
    this.popupOverlay = null
  }

  public getIframe(): HTMLIFrameElement | null {
    return this.iframe
  }
}
