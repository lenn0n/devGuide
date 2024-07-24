## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Google FCM Push Notification with Hooks

Firebase Cloud Messaging (FCM) is a free, cross-platform messaging solution that allows users to send and receive notifications on Android, iOS, and the web.
FCM is built on Google Play Services and is the successor to Google Cloud Messaging (GCM).

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Install Firebase

    npm i firebase


  ## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Login to Google Firebase Console
    - Create Project
    - Generate Firebase config
    - Project settings > General > Your apps > Web App
    - Download firebase config
    - Create VAPID key pair

  ## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Create a config file 'firebaseConfig.js'. Replace the env values.

    import { initializeApp } from "firebase/app";
    import { getMessaging } from "firebase/messaging";
    
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    // Messaging service
    export const messaging = getMessaging(app)


  ## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Create firebase service worker, name it by 'firebase-messaging-sw.js' (IMPORTANT) and put it in your public folder.

    // Scripts for firebase and firebase messaging
    importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
    importScripts(
      "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
    );
    
    // Initialize the Firebase app in the service worker
    // "Default" Firebase configuration (prevents errors)
    const defaultConfig = {
      apiKey: true,
      projectId: true,
      messagingSenderId: true,
      appId: true,
    };

    // Replace values from your firebaseConfig.js
    // Yes, you are correct but it is safe to expose them here according to accepted answers on Stackoverflow.
    // Remember, this is a service worker and will always public.
    // If you really want to hide data, encrypt this using bcrypt.
    const firebaseConfig = {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ,
      appId: "",
      measurementId: "",
    };
    
    firebase.initializeApp(firebaseConfig);
    
    // Retrieve firebase messaging
    const messaging = firebase.messaging();
    
    messaging.onBackgroundMessage((payload) => {
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
      };
    
      self.registration.showNotification(notificationTitle, notificationOptions);
    });

  
