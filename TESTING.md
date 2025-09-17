# Local Testing Instructions for Impulse Embed Examples

This document outlines the step-by-step process to set up and test the Impulse Embed examples locally.

## Step 1: Install Dependencies

Navigate to the root of your project and install all dependencies. This will install dependencies for the root workspace and all sub-packages (`react` and `vanilla`).

```bash
npm install
```

## Step 2: Build the Packages

Navigate to each package directory (`packages/react` and `packages/vanilla`) and run their respective build scripts. This will compile the source code and generate the necessary output files in the `dist` directories.

```bash
cd packages/react
npm run build
cd ../vanilla
npm run build
cd ../../ # Go back to the root directory
```

## Step 3: Test Vanilla JS Examples

The `vanilla-inline.html` and `vanilla-popup.html` files located in the `examples/` directory can be tested by serving them with a simple local web server. This ensures that relative paths for script imports are resolved correctly.

1.  **Install a simple HTTP server (if you don't have one):**
    You can use `http-server` from npm:
    ```bash
    npm install -g http-server
    ```
2.  **Start the server from the project root:**
    Execute the following command in your terminal from the root directory of the project:
    ```bash
    http-server
    ```
3.  **Open the HTML files in your browser:**
    After starting the server, open your web browser and navigate to the following URLs:
    *   `http://localhost:8080/examples/vanilla-inline.html`
    *   `http://localhost:8080/examples/vanilla-popup.html`

    (Note: The port might be different if 8080 is already in use. The `http-server` command will output the exact URL and port it's using.)

## Step 4: Test React Example

The `react-example.tsx` component requires a React development environment to run. Since there isn't a pre-configured React project in the `examples` directory, you'll need to integrate this component into an existing or a newly created React application.

Here's how to set up a new React project and test the example:

1.  **Set up a new React project (e.g., using Vite):**
    If you don't have an existing React project, you can quickly create one using a tool like Vite. Run these commands from a directory *outside* of the `graft` project (e.g., in your Desktop):
    ```bash
    npm create vite@latest my-react-app -- --template react-ts
    cd my-react-app
    npm install
    ```
2.  **Copy the example component:**
    Copy the content of `graft/examples/react-example.tsx` into a new file within your newly created React project. For example, create `my-react-app/src/ImpulseEmbedApp.tsx` and paste the content there.
3.  **Install Impulse Embed React package in your new project:**
    Navigate into your new React project directory (`my-react-app`) and install the necessary dependencies:
    ```bash
    npm install @impulse/embed-react @impulse/embed-js
    ```
4.  **Integrate into your React app:**
    Modify your main React application component (e.g., `my-react-app/src/App.tsx`) to render the `ImpulseEmbedApp` component.

    ```typescript
    // my-react-app/src/App.tsx
    import React from 'react';
    import { ImpulseEmbedApp } from './ImpulseEmbedApp'; // Adjust path as needed

    function App() {
      return (
        <div className="App">
          <ImpulseEmbedApp />
        </div>
      );
    }

    export default App;
    ```
5.  **Start the React development server:**
    From your new React project directory (`my-react-app`), start the development server:
    ```bash
    npm run dev
    ```
    This will typically open the React application in your browser (e.g., `http://localhost:5173`).
