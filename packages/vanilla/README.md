# @impulse/embed-js

Vanilla JavaScript embed library for Impulse CRM booking and forms. No dependencies, works in any environment.

## 🚀 Installation

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@impulse/embed-js@latest/dist/index.js"></script>
```

### NPM

```bash
npm install @impulse/embed-js
```

## 📖 Usage

### ES Modules

```javascript
import { ImpulseEmbed, createEmbed } from '@impulse/embed-js'

const embed = new ImpulseEmbed({
  url: 'https://your-crm.com/booking/abc123',
  mode: 'popup',
  trigger: '#book-button',
})
```

### CommonJS

```javascript
const { ImpulseEmbed } = require('@impulse/embed-js')
```

### UMD (Browser Global)

```html
<script src="https://cdn.jsdelivr.net/npm/@impulse/embed-js@latest/dist/index.js"></script>
<script>
  const embed = new ImpulseEmbed({
    /* config */
  })
  // or
  const embed = createImpulseEmbed({
    /* config */
  })
</script>
```

### Auto-initialization

```html
<!-- Popup mode -->
<button id="booking-btn">Book Now</button>
<script
  src="https://cdn.jsdelivr.net/npm/@impulse/embed-js@latest/dist/index.js"
  data-impulse-url="https://your-crm.com/booking/abc123"
  data-impulse-mode="popup"
  data-impulse-trigger="#booking-btn"
></script>

<!-- Inline mode -->
<div id="booking-container"></div>
<script
  src="https://cdn.jsdelivr.net/npm/@impulse/embed-js@latest/dist/index.js"
  data-impulse-url="https://your-crm.com/booking/abc123"
  data-impulse-mode="inline"
  data-impulse-container="#booking-container"
  data-impulse-height="600px"
></script>
```

## 🎯 Examples

### Inline Embed

```javascript
const inlineEmbed = new ImpulseEmbed({
  url: 'https://your-crm.com/booking/service-a',
  mode: 'inline',
  container: '#booking-container',
  height: '700px',
  params: {
    theme: 'dark',
    prefill_name: 'John Doe',
  },
  onLoad: () => console.log('Booking form loaded'),
  onSubmit: (data) => {
    console.log('Booking submitted:', data)
    // Track conversion
    gtag('event', 'booking_completed', { value: data.amount })
  },
})
```

### Popup Embed

```javascript
const popupEmbed = new ImpulseEmbed({
  url: 'https://your-crm.com/forms/contact',
  mode: 'popup',
  trigger: '.contact-buttons',
  width: '800px',
  height: '600px',
  onClose: () => console.log('Contact form closed'),
  onSubmit: (data) => {
    alert('Thank you for contacting us!')
    // Close popup after submission
    popupEmbed.close()
  },
})
```

### Multiple Embeds

```javascript
// Different services with same trigger pattern
document.querySelectorAll('[data-service]').forEach((button) => {
  const service = button.dataset.service

  new ImpulseEmbed({
    url: `https://your-crm.com/booking/${service}`,
    mode: 'popup',
    trigger: button,
    params: { service, source: 'website' },
  })
})
```

## 🔧 API Reference

### Constructor Options

```typescript
interface EmbedConfig {
  url: string // Required: Booking/form URL
  mode: 'inline' | 'popup' // Required: Display mode
  container?: string | HTMLElement // Required for inline mode
  trigger?: string | HTMLElement // Required for popup mode
  width?: string // CSS width (default: '100%')
  height?: string // CSS height (default: '600px')
  customCSS?: string // Additional iframe styles
  params?: Record<string, string> // URL parameters
  onLoad?: () => void // Load callback
  onSubmit?: (data: any) => void // Submit callback
  onClose?: () => void // Close callback (popup only)
}
```

### Instance Methods

```javascript
const embed = new ImpulseEmbed(config)

embed.open() // Open popup (popup mode only)
embed.close() // Close popup (popup mode only)
embed.reload() // Reload embed content
embed.destroy() // Clean up and remove
embed.getIframe() // Get iframe element
```

### Events

Listen for iframe messages:

```javascript
window.addEventListener('message', (event) => {
  switch (event.data.type) {
    case 'impulse:form:submit':
      console.log('Form submitted:', event.data.data)
      break
    case 'impulse:form:close':
      console.log('Close requested')
      break
    case 'impulse:form:resize':
      console.log('New height:', event.data.data.height)
      break
  }
})
```

## 🎨 Styling

The library includes default styles that can be customized:

```css
/* Popup overlay */
.impulse-popup-overlay {
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
}

/* Popup container */
.impulse-popup-container {
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Close button */
.impulse-popup-close {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
}

/* Inline container */
.impulse-inline-container {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
```

## 📦 Browser Support

- Chrome/Edge 80+
- Firefox 74+
- Safari 13.1+
- iOS Safari 13.4+
- Android Chrome 80+

## 🔧 TypeScript

Full TypeScript support included:

```typescript
import { ImpulseEmbed, EmbedConfig, EmbedInstance } from '@impulse/embed-js'

const config: EmbedConfig = {
  url: 'https://your-crm.com/booking/abc123',
  mode: 'popup',
  trigger: '#booking-btn',
}

const embed: EmbedInstance = new ImpulseEmbed(config)
```
