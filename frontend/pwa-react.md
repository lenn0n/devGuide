## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) PWA React
PWA or Progressive Web App is a web application that provides user experience similar to native apps. It can be installed and work in offline thru service worker and Workbox.

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) App Installable
Create a **manifest.json** in your public directory. Make sure the path of icon is **correct** or else this wont work.

    {
      "short_name": "lenn0n.xyz",
      "name": "Lennon Benedict Jansuy",
      "icons": [
        {
          "src": "favicon.ico",
          "sizes": "64x64 32x32 24x24 16x16",
          "type": "image/x-icon"
        },
        {
          "src": "android-chrome-192x192.png",
          "type": "image/png",
          "sizes": "192x192"
        },
        {
          "src": "android-chrome-512x512.png",
          "type": "image/png",
          "sizes": "512x512"
        }
      ],
      "start_url": ".",
      "display": "standalone",
      "theme_color": "#330867",
      "background_color": "#330867"
    }

Finally, insert this into your HTML file. Your application will now have install button feature.

    <link rel="manifest" href="manifest.json">

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Working with Webpack 5 and GenerateSW
We will be using the guide from official website of webpack: https://webpack.js.org/guides/progressive-web-application

### First, Install Workbox Webpack Plugin

    npm install workbox-webpack-plugin --save-dev

### Next, lets update webpack.config.js

     const WorkboxPlugin = require('workbox-webpack-plugin');
     
      ...
      
       plugins: [
         ...,
         new WorkboxPlugin.GenerateSW({
           clientsClaim: true,
           skipWaiting: true,
         }),
      ],

This will generate service-worker.js upon build (webpack build).

### Lastly, lets register Service Worker inside of your application entrypoint:
     index.js:
     
     if ('serviceWorker' in navigator) {
       window.addEventListener('load', () => {
         navigator.serviceWorker.register('/service-worker.js').then(registration => {
           console.log('SW registered: ', registration);
         }).catch(registrationError => {
           console.log('SW registration failed: ', registrationError);
         });
       });
     }



## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Working with NextJS 14
We will be using the guide from official node package: https://www.npmjs.com/package/next-pwa

### Install next-pwa

    npm i next-pwa

### Update next.config.mjs (v14)

    import withPWAInit from "next-pwa";
    
    const withPWA = withPWAInit({
      dest: "public",
      disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
      register: true, // Register the PWA service worker
      skipWaiting: true, // Skip waiting for service worker activation
    });
    
    export default withPWA({
      // Your Next.js config
      reactStrictMode: true, // Enable React strict mode for improved error handling
      swcMinify: true,      // Enable SWC minification for improved performance
      compiler: {
        removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
      }
    });

### Next.config.js (v13 below)

    const withPWA = require("@ducanh2912/next-pwa").default({
      dest: "public",
    });
    
    module.exports = withPWA({
      // Your Next.js config
    });

### Update metadata in layout

    export const metadata: Metadata = {
      title: "Anything",
      description: "Web Application",
      generator: "Next.js",
      manifest: "/manifest.json"
    };

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Using Template
You can use template when you start a new project in ReactJS with PWA option

    npx create-react-app my-app --template cra-template-pwa


## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Working with Webpack 5 and InjectManifest
We will be using *workbox-window* and *workbox-precaching*.

### First, Install Workbox Webpack Plugins
    npm install workbox-webpack-plugin workbox-window workbox-precaching --save-dev


### Next, lets update webpack.config.js

     const WorkboxPlugin = require('workbox-webpack-plugin');
     
      ...
      
       plugins: [
         ...,
          new WorkboxPlugin.InjectManifest({
          swSrc: "./src/workbox/service-worker.js",
          swDest: "service-worker.js",
          exclude: [''],
        }),
      ],

### Next, create a file in /src/workbox/service-worker.js and insert:

    import { precacheAndRoute } from 'workbox-precaching';
    
    precacheAndRoute(self.__WB_MANIFEST);

### Create useWorkbox Hook:

    import { Workbox } from "workbox-window";
    
    type ConfigProps = {
      path: string,
      onLoad: boolean,
      successMessage?: string,
      errorMessage?: string,
      actionForWaitingState?: Function
    }
    export const registerServiceWorker = (config: ConfigProps) => {
      if ('serviceWorker' in navigator) {
    
        const register = () => {
          const wb = new Workbox(config.path);
    
          wb.addEventListener('activated', event => {
            // `event.isUpdate` will be true if another version of the service
            // worker was controlling the page when this version was registered.
            if (!event.isUpdate) {
              console.log('Service worker activated for the first time!');
            }
    
            // Get the current page URL + all resources the page loaded.
            const urlsToCache = [
              location.href,
              ...performance.getEntriesByType('resource').map(r => r.name),
            ];
    
            // Send that list of URLs to your router in the service worker.
            wb.messageSW({
              type: 'CACHE_URLS',
              payload: { urlsToCache },
            });
          });
    
          wb.addEventListener('waiting', event => {
            wb.messageSkipWaiting();
            if (typeof config.actionForWaitingState === 'function') {
              config.actionForWaitingState()
            }
          });
    
          wb.addEventListener('message', event => {
            if (event.data.type === 'CACHE_UPDATED') {
              const { updatedURL } = event.data.payload;
              console.log(`A newer version of ${updatedURL} is available!`);
            }
          });
    
          return wb.register()
        }
    
        if (config.onLoad) window.addEventListener('load', () => { register() });
        else register()
      }
    }
    
    export const unregisterServiceWorker = () => {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        if (!registrations.length) {
          console.log('No serviceWorker registrations found.')
          return
        }
        for (let registration of registrations) {
          registration.unregister()
        }
      }).then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 100);
      })
    }

### Finally, insert this in your index.tsx file

    import { registerServiceWorker, unregisterServiceWorker } from '@hooks/useWorkbox';
    
    ...
    
    
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
