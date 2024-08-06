#### Installation

    npm i workbox-window

#### Usage

    import { registerServiceWorker, unregisterServiceWorker } from '@hooks/useWorkbox';
    
    ...
    
    // your index.ts/index.tsx
    root.render(
      <App>
        <div id="pwa-waiting-banner" className='hidden p-1 bg-slate-900 md:bg-opacity-40 text-center w-[100vw] absolute top-0 left-0 '>
          <div className="flex items-center justify-center">
            <div>Looks like you are viewing <span className='text-red-400'>outdated</span> version of my portfolio.
            <span className='underline mx-1 text-yellow-500' role='button' onClick={unregisterServiceWorker}>Click here</span>to reload the page.
            </div>
          </div>
        </div>
      </App>
    )
    
    registerServiceWorker({
      onLoad: true,
      successMessage: "Great! Service worker for caching has been enabled.",
      path: "/service-worker.js",
      actionForWaitingState: () => {
        document.getElementById("pwa-waiting-banner")?.classList.remove("hidden")
      }
    })
