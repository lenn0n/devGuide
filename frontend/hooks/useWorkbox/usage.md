#### Installation

    npm i workbox-window

Note: You might need to install workbox plugins

#### Usage
    // your index.ts/index.tsx
    
    import { registerServiceWorker, unregisterServiceWorker } from '@hooks/useWorkbox';
    
    ...
    
    root.render(
      <App></App>
    )

    ...
    
    registerServiceWorker({
      onLoad: true,
      successMessage: "Great! Service worker for caching has been enabled.",
      path: "/service-worker.js",
      actionForWaitingState: () => {
        document.getElementById("pwa-waiting-banner")?.classList.remove("hidden")
      },
      actionForControllingState: () => { 
        window.location.reload()
      }
    })
