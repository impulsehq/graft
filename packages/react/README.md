# @impulse/embed-react

React components and hooks for Impulse CRM booking and forms embeds. Built on top of `@impulse/embed-js`.

## 🚀 Installation

```bash
npm install @impulse/embed-react
```

**Peer Dependencies:**

- React 16.8+
- ReactDOM 16.8+

## 📖 Components

### ImpulseEmbed (Universal)

Auto-detects mode based on whether children are provided:

```jsx
import { ImpulseEmbed } from '@impulse/embed-react';

// Inline mode (no children)
<ImpulseEmbed
  url="https://your-crm.com/booking/abc123"
  height="600px"
  onSubmit={(data) => console.log('Submitted:', data)}
/>

// Popup mode (with children)
<ImpulseEmbed url="https://your-crm.com/forms/contact">
  <button className="btn btn-primary">Contact Us</button>
</ImpulseEmbed>
```

### ImpulseInlineEmbed

Dedicated inline component:

```jsx
import { ImpulseInlineEmbed } from '@impulse/embed-react'

;<ImpulseInlineEmbed
  url="https://your-crm.com/booking/consultation"
  height="700px"
  className="border rounded-lg"
  style={{ maxWidth: '800px' }}
  params={{ service: 'consultation', theme: 'light' }}
  onLoad={() => console.log('Form loaded')}
  onSubmit={(data) => {
    console.log('Booking data:', data)
    // Custom analytics
    analytics.track('booking_completed', data)
  }}
/>
```

### ImpulsePopupEmbed

Dedicated popup component with custom trigger elements:

```jsx
import { ImpulsePopupEmbed } from '@impulse/embed-react';

// Button trigger
<ImpulsePopupEmbed
  url="https://your-crm.com/booking/demo"
  triggerAs="button"
  triggerProps={{
    className: 'btn btn-lg btn-primary',
    type: 'button'
  }}
>
  Schedule Demo
</ImpulsePopupEmbed>

// Link trigger
<ImpulsePopupEmbed
  url="https://your-crm.com/forms/quote"
  triggerAs="a"
  triggerProps={{
    className: 'text-blue-600 hover:underline',
    href: '#'
  }}
>
  Get Free Quote
</ImpulsePopupEmbed>

// Custom div trigger
<ImpulsePopupEmbed
  url="https://your-crm.com/booking/service"
  triggerAs="div"
  triggerProps={{
    className: 'cursor-pointer p-4 border rounded-lg hover:bg-gray-50',
    role: 'button',
    tabIndex: 0
  }}
>
  <div className="flex items-center space-x-3">
    <CalendarIcon className="w-6 h-6" />
    <span>Book Service</span>
  </div>
</ImpulsePopupEmbed>
```

## 🎣 Hooks

### useImpulseEmbed

Advanced hook for custom implementations:

```jsx
import { useImpulseEmbed } from '@impulse/embed-react'

function CustomBookingForm() {
  const [selectedService, setSelectedService] = useState('')

  const {
    containerRef,
    embedInstance,
    createInlineEmbed,
    reload,
    open,
    close,
  } = useImpulseEmbed({
    url: `https://your-crm.com/booking/${selectedService}`,
    mode: 'inline',
    height: '600px',
    params: {
      service: selectedService,
      source: 'react-app',
    },
    onLoad: () => console.log(`${selectedService} loaded`),
    onSubmit: (data) => {
      // Custom submission logic
      handleBookingSubmit(data)

      // Show success message
      toast.success('Booking confirmed!')

      // Track conversion
      analytics.track('booking_completed', {
        service: selectedService,
        value: data.amount,
      })
    },
  })

  // Recreate embed when service changes
  useEffect(() => {
    if (selectedService) {
      createInlineEmbed()
    }
  }, [selectedService, createInlineEmbed])

  return (
    <div>
      <ServiceSelector value={selectedService} onChange={setSelectedService} />

      {selectedService && (
        <div className="mt-6">
          <div className="flex justify-between mb-4">
            <h3>Book {selectedService}</h3>
            <button onClick={reload} className="btn btn-sm">
              Refresh
            </button>
          </div>
          <div ref={containerRef} className="border rounded-lg" />
        </div>
      )}
    </div>
  )
}
```

## 🎯 Advanced Examples

### Dynamic Service Booking

```jsx
function ServiceBooking() {
  const services = [
    { id: 'consultation', name: 'Free Consultation', duration: '30 min' },
    { id: 'audit', name: 'Website Audit', duration: '60 min' },
    { id: 'strategy', name: 'Strategy Session', duration: '90 min' },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {services.map((service) => (
        <div key={service.id} className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold">{service.name}</h3>
          <p className="text-gray-600 mb-4">{service.duration}</p>

          <ImpulsePopupEmbed
            url={`https://your-crm.com/booking/${service.id}`}
            params={{ service: service.id }}
            className="w-full btn btn-primary"
            onSubmit={(data) => {
              // Service-specific handling
              handleServiceBooked(service.id, data)
            }}
          >
            Book {service.name}
          </ImpulsePopupEmbed>
        </div>
      ))}
    </div>
  )
}
```

### Multi-step Booking Flow

```jsx
function MultiStepBooking() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')

  const { containerRef, createInlineEmbed } = useImpulseEmbed({
    url: `https://your-crm.com/booking/${selectedService}`,
    mode: 'inline',
    params: {
      step: currentStep.toString(),
      service: selectedService,
    },
    onSubmit: (data) => {
      if (data.nextStep) {
        setCurrentStep(data.nextStep)
      } else {
        // Booking complete
        handleBookingComplete(data)
      }
    },
  })

  useEffect(() => {
    if (selectedService && currentStep > 1) {
      createInlineEmbed()
    }
  }, [selectedService, currentStep, createInlineEmbed])

  return (
    <div>
      <ProgressBar currentStep={currentStep} totalSteps={3} />

      {currentStep === 1 && <ServiceSelector onSelect={setSelectedService} />}

      {currentStep > 1 && <div ref={containerRef} className="mt-6" />}
    </div>
  )
}
```

### Conditional Rendering

```jsx
function ConditionalEmbed() {
  const { user, isAuthenticated } = useAuth()
  const [showEmbed, setShowEmbed] = useState(false)

  if (!isAuthenticated) {
    return <LoginPrompt />
  }

  return (
    <div>
      {!showEmbed ? (
        <button onClick={() => setShowEmbed(true)} className="btn btn-primary">
          Start Booking Process
        </button>
      ) : (
        <ImpulseInlineEmbed
          url="https://your-crm.com/booking/premium"
          params={{
            user_id: user.id,
            user_email: user.email,
            user_name: user.name,
          }}
          onSubmit={(data) => {
            // Handle booking completion
            setShowEmbed(false)
            showSuccessMessage(data)
          }}
        />
      )}
    </div>
  )
}
```

## 🎨 Styling with CSS-in-JS

### Styled Components

```jsx
import styled from 'styled-components'
import { ImpulseEmbed } from '@impulse/embed-react'

const StyledEmbedContainer = styled.div`
  .impulse-popup-overlay {
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
  }

  .impulse-popup-container {
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`

function StyledBooking() {
  return (
    <StyledEmbedContainer>
      <ImpulseEmbed url="https://your-crm.com/booking">
        <button>Book Appointment</button>
      </ImpulseEmbed>
    </StyledEmbedContainer>
  )
}
```

### Emotion

```jsx
import { css } from '@emotion/react'
import { ImpulseEmbed } from '@impulse/embed-react'

const embedStyles = css`
  border: 2px solid #3b82f6;
  border-radius: 12px;
  overflow: hidden;

  &:hover {
    box-shadow: 0 10px 25px -3px rgba(59, 130, 246, 0.1);
  }
`

function EmotionBooking() {
  return <ImpulseEmbed url="https://your-crm.com/booking" css={embedStyles} />
}
```

## 🔧 TypeScript

Full TypeScript support:

```tsx
import {
  ImpulseEmbed,
  ImpulseInlineEmbedProps,
  ImpulsePopupEmbedProps,
  useImpulseEmbed,
} from '@impulse/embed-react'

interface BookingFormProps {
  serviceId: string
  onComplete: (data: BookingData) => void
}

const BookingForm: React.FC<BookingFormProps> = ({ serviceId, onComplete }) => {
  const embedProps: ImpulseInlineEmbedProps = {
    url: `https://your-crm.com/booking/${serviceId}`,
    height: '600px',
    params: { service: serviceId },
    onSubmit: onComplete,
  }

  return <ImpulseEmbed {...embedProps} />
}
```

## 📦 Props Reference

### Common Props

```typescript
interface BaseProps {
  url: string // Required: Booking/form URL
  width?: string // CSS width
  height?: string // CSS height
  customCSS?: string // Additional iframe styles
  params?: Record<string, string> // URL parameters
  onLoad?: () => void // Load callback
  onSubmit?: (data: any) => void // Submit callback
  onClose?: () => void // Close callback
  className?: string // CSS class
  style?: React.CSSProperties // Inline styles
}
```

### Popup-Specific Props

```typescript
interface PopupProps extends BaseProps {
  children: React.ReactNode // Required: Trigger content
  triggerAs?: keyof JSX.IntrinsicElements // Trigger element type
  triggerProps?: Record<string, any> // Props for trigger element
}
```

## 🔧 Migration from Vanilla JS

Converting vanilla JS implementations to React:

```javascript
// Vanilla JS
const embed = new ImpulseEmbed({
  url: 'https://your-crm.com/booking',
  mode: 'popup',
  trigger: '#book-btn',
})
```

```jsx
// React
<ImpulseEmbed url="https://your-crm.com/booking">
  <button id="book-btn">Book Now</button>
</ImpulseEmbed>
```

## 🤝 Integration Examples

### Next.js

```jsx
// pages/booking.js
import dynamic from 'next/dynamic'

const ImpulseEmbed = dynamic(
  () => import('@impulse/embed-react').then((mod) => mod.ImpulseEmbed),
  { ssr: false }
)

export default function BookingPage() {
  return (
    <div>
      <h1>Book an Appointment</h1>
      <ImpulseEmbed url="https://your-crm.com/booking/service" />
    </div>
  )
}
```

### Gatsby

```jsx
// src/components/BookingForm.js
import React from 'react'
import { ImpulseEmbed } from '@impulse/embed-react'

const BookingForm = () => {
  if (typeof window === 'undefined') {
    return <div>Loading booking form...</div>
  }

  return (
    <ImpulseEmbed url="https://your-crm.com/booking">
      <button className="btn">Book Appointment</button>
    </ImpulseEmbed>
  )
}

export default BookingForm
```
