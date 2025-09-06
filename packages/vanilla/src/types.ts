export interface EmbedConfig {
  /** the URL of the booking/form to embed */
  url: string
  /** container element or selector for inline embeds */
  container?: string | HTMLElement
  /** trigger element or selector for popup embeds */
  trigger?: string | HTMLElement
  /** display mode: 'inline' or 'popup' */
  mode: 'inline' | 'popup'
  /** width of the embed (CSS value) */
  width?: string
  /** height of the embed (CSS value) */
  height?: string
  /** custom CSS for the iframe */
  customCSS?: string
  /** callback when embed is loaded */
  onLoad?: () => void
  /** callback when embed is closed (popup mode) */
  onClose?: () => void
  /** callback when form is submitted */
  onSubmit?: (data: any) => void
  /** additional query parameters to pass to the embed */
  params?: Record<string, string>
}

export interface PopupOptions {
  /** whether to show close button */
  showCloseButton?: boolean
  /** whether clicking overlay closes popup */
  closeOnOverlayClick?: boolean
  /** custom CSS for the popup overlay */
  overlayCSS?: string
  /** custom CSS for the popup container */
  popupCSS?: string
}

export interface EmbedInstance {
  /** open the embed (for popup mode) */
  open: () => void
  /** close the embed (for popup mode) */
  close: () => void
  /** destroy the embed and clean up */
  destroy: () => void
  /** reload the embed content */
  reload: () => void
  /** get the iframe element */
  getIframe: () => HTMLIFrameElement | null
}
