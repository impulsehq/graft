# Impulse CRM Embed Packages

Powerful embed scripts and npm packages for integrating Impulse CRM booking and forms into any website or application. Supports both vanilla JavaScript and React implementations with inline and popup display modes.

## 📦 Packages

- **[@impulse/embed-js](./packages/vanilla/)** - Vanilla JavaScript embed library
- **[@impulse/embed-react](./packages/react/)** - React components and hooks

## 🚀 Quick Start

### Vanilla JavaScript

#### CDN (Quick Setup)

```html
<!-- Include the script -->
<script src="https://cdn.jsdelivr.net/npm/@impulse/embed-js@latest/dist/index.js"></script>

<!-- Auto-initialization with data attributes -->
<button
  data-impulse-url="https://your-crm.com/booking/abc123"
  data-impulse-mode="popup"
  data-impulse-trigger="self"
>
  Book Appointment
</button>

<!-- Or inline embed -->
<div id="booking-container"></div>
<script>
  new ImpulseEmbed({
    url: 'https://your-crm.com/booking/abc123',
    mode: 'inline',
    container: '#booking-container',
  })
</script>
```

#### NPM Installation

```bash
npm install @impulse/embed-js
```

```javascript
import { ImpulseEmbed } from '@impulse/embed-js'

// Popup mode
const popupEmbed = new ImpulseEmbed({
  url: 'https://your-crm.com/booking/abc123',
  mode: 'popup',
  trigger: '#book-button',
})

// Inline mode
const inlineEmbed = new ImpulseEmbed({
  url: 'https://your-crm.com/forms/contact',
  mode: 'inline',
  container: '#form-container',
  height: '600px',
})
```

### React

#### Installation

```bash
npm install @impulse/embed-react
```

#### Basic Usage

```jsx
import {
  ImpulseEmbed,
  ImpulseInlineEmbed,
  ImpulsePopupEmbed,
} from '@impulse/embed-react'

// Universal component (auto-detects mode)
function App() {
  return (
    <div>
      {/* Inline embed */}
      <ImpulseEmbed
        url="https://your-crm.com/booking/abc123"
        height="600px"
        onSubmit={(data) => console.log('Submitted:', data)}
      />

      {/* Popup embed */}
      <ImpulseEmbed url="https://your-crm.com/forms/contact">
        <button className="btn btn-primary">Open Contact Form</button>
      </ImpulseEmbed>
    </div>
  )
}
```

#### Advanced Hook Usage

```jsx
import { useImpulseEmbed } from '@impulse/embed-react'

function CustomBooking() {
  const { containerRef, createInlineEmbed, reload } = useImpulseEmbed({
    url: 'https://your-crm.com/booking/service',
    mode: 'inline',
    onSubmit: (data) => {
      // Custom submission handling
      analytics.track('booking_completed', data)
    },
  })

  useEffect(() => {
    createInlineEmbed()
  }, [createInlineEmbed])

  return (
    <div>
      <button onClick={reload}>Refresh Form</button>
      <div ref={containerRef} />
    </div>
  )
}
```

## 🎯 Features

### Display Modes

- **Inline**: Embeds directly in your page content
- **Popup**: Opens in a modal overlay when triggered

### Supported Triggers

- Buttons, links, or any clickable element
- Custom trigger elements in React
- Auto-initialization from script tags

### Customization

- Custom dimensions (width/height)
- Custom CSS styling
- URL parameters and query strings
- Event callbacks (onLoad, onSubmit, onClose)

### Communication

- Bi-directional messaging between embed and parent page
- Form submission callbacks with data
- Auto-resize support for dynamic content
- Close/cancel event handling

## 📖 Documentation

### Configuration Options

| Option      | Type                     | Description                                | Default   |
| ----------- | ------------------------ | ------------------------------------------ | --------- |
| `url`       | `string`                 | **Required.** The URL of your booking/form | -         |
| `mode`      | `'inline' \| 'popup'`    | **Required.** Display mode                 | -         |
| `container` | `string \| HTMLElement`  | Container for inline mode                  | -         |
| `trigger`   | `string \| HTMLElement`  | Trigger element for popup mode             | -         |
| `width`     | `string`                 | CSS width value                            | `'100%'`  |
| `height`    | `string`                 | CSS height value                           | `'600px'` |
| `customCSS` | `string`                 | Additional CSS for iframe                  | -         |
| `params`    | `Record<string, string>` | URL parameters to pass                     | -         |
| `onLoad`    | `() => void`             | Callback when embed loads                  | -         |
| `onSubmit`  | `(data: any) => void`    | Callback when form is submitted            | -         |
| `onClose`   | `() => void`             | Callback when popup closes                 | -         |

### Methods

| Method        | Description                   |
| ------------- | ----------------------------- |
| `open()`      | Open popup (popup mode only)  |
| `close()`     | Close popup (popup mode only) |
| `reload()`    | Reload the embed content      |
| `destroy()`   | Clean up and remove embed     |
| `getIframe()` | Get the iframe element        |

### Events

The embed communicates with the parent page through `postMessage`:

```javascript
// Listen for form submissions
window.addEventListener('message', (event) => {
  if (event.data.type === 'impulse:form:submit') {
    console.log('Form data:', event.data.data)
    // Handle successful submission
  }
})
```

Available event types:

- `impulse:form:submit` - Form was submitted
- `impulse:form:close` - User requested to close
- `impulse:form:resize` - Content height changed

## 🎨 Styling

### Default Styles

The embed includes tasteful default styles for popup overlays, close buttons, and containers. All styles use the `impulse-` prefix to avoid conflicts.

### Custom Styling

```css
/* Customize popup overlay */
.impulse-popup-overlay {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Customize popup container */
.impulse-popup-container {
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Customize close button */
.impulse-popup-close {
  background: rgba(255, 255, 255, 0.9);
  color: #374151;
}
```

### React Styling

```jsx
<ImpulseEmbed
  url="https://your-crm.com/booking"
  className="my-custom-class"
  style={{ borderRadius: '12px' }}
  customCSS="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
/>
```

## 🔧 Examples

See the [examples](./examples/) directory for complete working examples:

- [Vanilla JavaScript Inline](./examples/vanilla-inline.html)
- [Vanilla JavaScript Popup](./examples/vanilla-popup.html)
- [React Components](./examples/react-example.tsx)

## 📦 Development

### Prerequisites

- Node.js 16+
- npm 7+

### Setup

```bash
# Clone and install dependencies
git clone https://github.com/impulse/embeds.git
cd embeds
npm install

# Build all packages
npm run build

# Development mode with watch
npm run dev
```

### Project Structure

```
embeds/
├── packages/
│   ├── vanilla/          # Vanilla JS package
│   └── react/            # React package
├── examples/             # Usage examples
└── docs/                 # Documentation
```

### Building

```bash
# Build all packages
npm run build

# Build specific package
cd packages/vanilla && npm run build
cd packages/react && npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@impulse-crm.com
- 📖 Documentation: https://docs.impulse-crm.com/embeds
- 🐛 Issues: https://github.com/impulse/embeds/issues

---

Made with ❤️ by the Impulse CRM team
