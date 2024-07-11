## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) PWA React
PWA or Progressive Web App is a web application that provides user experience similar to native apps. It is installable and can work in offline thru service worker and Workbox.

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Setup
Create a **manifest.json** in your public directory. Make sure the path of icon is **correct**. This wont work if one is missing.

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

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Working with Webpack 5
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
