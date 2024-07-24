## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Google FCM Push Notification with Hooks

Firebase Cloud Messaging (FCM) is a free, cross-platform messaging solution that allows users to send and receive notifications on Android, iOS, and the web.
FCM is built on Google Play Services and is the successor to Google Cloud Messaging (GCM).

## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Install Firebase

    npm i firebase


  ## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Login to Google Firebase Console
    - Create Project
    - Project settings > General > Your apps > Web 
    - Generate Firebase config
    - Generate VAPID key pair. You will be using this in getToken() instance of FCM

  ## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Create a config file 'firebaseConfig.js' from the previous config. In my case, I will put this in a folder named 'firebase'
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


  ## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Create firebase service worker, name it by 'firebase-messaging-sw.js' (IMPORTANT) and put it in your public folder

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

  ## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Create a hook file, eg. /hooks/useNotification.ts

    import { getToken } from "firebase/messaging";
    import { messaging } from "PATH_TO/firebaseConfig"
    
    let onPermissionChange: NodeJS.Timeout, firebaseNotifyRetry = 0
    
    type NotifProps = {
      title: string,
      icon?: string,
      body: string
    }
    
    export const registerServiceWorker = (config: { path: string, onLoad: boolean, successMessage?: string, errorMessage?: string }) => {
      if ('serviceWorker' in navigator) {
    
        const register = () => {
          return navigator.serviceWorker.register(config.path).then(registration => {
            console.log(config.successMessage || 'SW registered on page load: ', registration);
          }).catch(registrationError => {
            console.log(config.errorMessage || 'SW registration failed: ', registrationError);
          });
        }
    
        if (config.onLoad) window.addEventListener('load', () => { register() });
        else register()
      }
    }
    
    const useNotification = () => {
    
      const notify = async (content: NotifProps) => {
        return await requestNotificationAPI().then((permission) => {
          if (permission) notifyGuest(content)
        })
      }
    
      const requestFirebaseNotify = async () => {
        return await requestNotificationAPI().then(async (permission) => {
          if (permission) {
            try {
              const token = await getToken(messaging, {
                vapidKey: process.env.VAPID_KEY,
              });
              return token
            } catch (error) {
              if (firebaseNotifyRetry < 1) {
                setTimeout(async () => {
                  firebaseNotifyRetry += 1;
                  return await requestFirebaseNotify()
                }, 2000);
              }
            }
          }
        })
      }
    
    
      const requestNotificationAPI = async () => {
        if ('Notification' in window) {
          if (Notification.permission === 'granted') return true
          else {
            return await Notification.requestPermission().then(async () => {
              return await watchPermissionChanges()
            })
          }
        }
      }
    
      const watchPermissionChanges = () => {
        return onPermissionChange = setInterval(() => {
          if (Notification.permission === 'granted') {
            clearInterval(onPermissionChange)
            return true
          }
        }, 1000)
      }
    
      const notifyGuest = async (data: NotifProps) => {
        navigator.serviceWorker.register('service-worker.js');
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification(
            data.title,
            {
              icon: data.icon,
              body: data.body
            }
          );
        });
      }
    
      return {
        notify,
        requestFirebaseNotify,
        requestNotificationAPI
      }
    
    }
    
    export default useNotification


  ## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Usage
  Just call the function requestFirebaseNotify() and it will now receive push messages from FCM.

      import useNotification from "@hooks/useNotification"
      ...
    
      const { requestFirebaseNotify } = useNotification()
    
      useEffect(() => {
        subscribeFirebasePushNotification()
      }, [])
    
      const subscribeFirebasePushNotification = async () => {
        const token = await requestFirebaseNotify()
        if (token) {
          console.log("Hi developer! This log is intended. Your FCM key:", { fcm: token }, 'You can use this to test push notification. -Lennon')
        }
      }


  
  ## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) If you are having some issues in typescript mixing, update tsconfig.json and allow JS.

    "allowJs": true,
    "checkJs": false,
  
