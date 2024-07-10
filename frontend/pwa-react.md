## PWA React
PWA or Progressive Web App is a web application that provides user experience similar to native apps. It is installable and can work in offline thru service worker and Workbox.

## PWA in Webpack 5
We will be using the guide from official website of webpack: https://webpack.js.org/guides/progressive-web-application

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) First, Install Workbox Webpack Plugin

    npm install workbox-webpack-plugin --save-dev

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Next, lets update webpack.config.js

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

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Lastly, lets register Service Worker inside of your application entrypoint:
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
