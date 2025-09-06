# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added

- Initial release of Impulse CRM embed packages
- `@impulse/embed-js` - Vanilla JavaScript embed library
- `@impulse/embed-react` - React components and hooks
- Support for inline and popup display modes
- Auto-initialization from script tag data attributes
- Comprehensive documentation and examples
- TypeScript support with full type definitions
- Event communication between embed and parent page
- Customizable styling and CSS overrides
- URL parameter passing and query string support
- Build system with Rollup for multiple output formats (UMD, ES, CommonJS)
- Cross-browser compatibility (Chrome 80+, Firefox 74+, Safari 13.1+)

### Features

- **Vanilla JavaScript Package (`@impulse/embed-js`)**:

  - Zero dependencies
  - Multiple initialization methods (programmatic, auto-init)
  - UMD, ES Module, and CommonJS builds
  - iframe-based embedding with security isolation
  - Popup modal with overlay and animations
  - Inline embedding with auto-resize support
  - Event callbacks for load, submit, and close events
  - Cross-origin messaging for bi-directional communication

- **React Package (`@impulse/embed-react`)**:

  - Built on top of vanilla JS core
  - Universal `ImpulseEmbed` component with mode auto-detection
  - Dedicated `ImpulseInlineEmbed` and `ImpulsePopupEmbed` components
  - `useImpulseEmbed` hook for advanced custom implementations
  - TypeScript support with proper prop types
  - Custom trigger elements with flexible styling
  - Integration examples for Next.js, Gatsby, and other frameworks

- **Developer Experience**:
  - Monorepo structure with workspace support
  - Comprehensive examples and documentation
  - TypeScript definitions included
  - ESLint and Prettier configuration
  - Rollup build system with source maps
  - NPM publishing workflow
  - Browser compatibility testing
