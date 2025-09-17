import React, { useState, useEffect } from 'react';
import {
  ImpulseEmbed,
  ImpulseInlineEmbed,
  ImpulsePopupEmbed,
  useImpulseEmbed
} from '@impulse/embed-react';

// example 1: universal component (auto-detects mode)
export const UniversalEmbedExample: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Universal Embed Component</h2>

      {/* inline mode (no children) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Inline Embed</h3>
        <ImpulseEmbed
          url="https://your-crm.com/booking/abc123"
          mode="inline"
          height="600px"
          params={{ theme: 'light', source: 'react-app' }}
          onLoad={() => console.log('Inline embed loaded')}
          onSubmit={(data) => console.log('Form submitted:', data)}
          className="border rounded-lg overflow-hidden"
        />
      </div>

      {/* popup mode (with children) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Popup Embed</h3>
        <ImpulseEmbed
          url="https://your-crm.com/forms/contact"
          width="800px"
          mode='inline'
          height="600px"
          onSubmit={(data) => alert('Thank you for your submission!')}
          className="btn btn-primary"
        >
          Open Contact Form
        </ImpulseEmbed>
      </div>
    </div>
  );
};

// example 2: specific components
export const SpecificComponentsExample: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Specific Components</h2>

      {/* using specific inline component */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Inline Component</h3>
        <ImpulseInlineEmbed
          url="https://your-crm.com/booking/consultation"
          height="700px"
          params={{ service: 'consultation' }}
          style={{
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden'
          }}
        />
      </div>

      {/* using specific popup component */}
      <div className="flex gap-4">
        <ImpulsePopupEmbed
          url="https://your-crm.com/booking/demo"
          triggerAs="button"
          triggerProps={{
            className: 'btn btn-blue',
            type: 'button'
          }}
        >
          Schedule Demo
        </ImpulsePopupEmbed>

        <ImpulsePopupEmbed
          url="https://your-crm.com/forms/quote"
          triggerAs="a"
          triggerProps={{
            className: 'btn btn-outline',
            href: '#'
          }}
        >
          Get Quote
        </ImpulsePopupEmbed>
      </div>
    </div>
  );
};

// example 3: advanced usage with hooks
export const AdvancedHookExample: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');

  const {
    containerRef,
    embedInstance,
    createInlineEmbed,
    reload
  } = useImpulseEmbed({
    url: `https://your-crm.com/booking/${selectedService}`,
    mode: 'inline',
    height: '600px',
    params: {
      service: selectedService,
      customization: 'advanced'
    },
    onLoad: () => console.log(`${selectedService} embed loaded`),
    onSubmit: (data) => {
      console.log('Advanced form submission:', data);
      // Custom analytics tracking
    }
  });

  const services = [
    { id: 'consultation', name: 'Free Consultation' },
    { id: 'premium-service', name: 'Premium Service' },
    { id: 'enterprise', name: 'Enterprise Solution' }
  ];

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  // recreate embed when service changes
  useEffect(() => {
    if (selectedService) {
      createInlineEmbed();
    }
  }, [selectedService, createInlineEmbed]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Advanced Hook Usage</h2>

      <div>
        <h3 className="text-lg font-semibold mb-4">Select a Service</h3>
        <div className="flex gap-2 mb-6">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceChange(service.id)}
              className={`btn ${selectedService === service.id ? 'btn-primary' : 'btn-outline'}`}
            >
              {service.name}
            </button>
          ))}
        </div>

        {selectedService && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Booking Form: {selectedService}</h4>
              <button
                onClick={reload}
                className="btn btn-sm btn-outline"
                disabled={!embedInstance}
              >
                Reload Form
              </button>
            </div>

            <div
              ref={containerRef}
              className="border-2 border-gray-200 rounded-lg overflow-hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// example 4: full application example
export const ImpulseEmbedApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('universal');

  const tabs = [
    { id: 'universal', label: 'Universal Component', component: UniversalEmbedExample },
    { id: 'specific', label: 'Specific Components', component: SpecificComponentsExample },
    { id: 'advanced', label: 'Advanced Hooks', component: AdvancedHookExample }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Impulse React Embed Examples</h1>

      {/* tab navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* tab content */}
      <div>
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
            <tab.component />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpulseEmbedApp;
