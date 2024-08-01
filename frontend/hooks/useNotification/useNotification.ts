
import { getToken } from "firebase/messaging";
import { messaging } from "../messaging/firebaseConfig"

type NotifProps = {
  title: string,
  icon?: string,
  body: string
}

let FCMTimeout: NodeJS.Timeout, FCMRetry: number = 0

const useNotification = () => {

  const requestFirebaseNotify = async () => {
    return await requestNotificationAPI().then(async (permission) => {
      if (permission) {
        try {
          const token = await getToken(messaging, {
            vapidKey: process.env.VAPID_KEY,
          });
          return token
        } catch (error) {
          if (FCMRetry < 1) {
            FCMTimeout = setTimeout(async () => {
              FCMRetry += 1;
              const token = await getToken(messaging, {
                vapidKey: process.env.VAPID_KEY,
              });
              console.log(
                "Hi developer! This log is intended. Your FCM key:",
                { fcm: token },
                'You can use this to test push notification. -Lennon'
              )
            }, 500);
          } 
          else clearTimeout(FCMTimeout)
        }
      }
    })
  }

  const requestNotificationAPI = async () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') return true
      else {
        return await Notification.requestPermission().then(async () => {
          return checkIfNotificationIsGranted()
        })
      }
    }
    else return false
  }

  const checkIfNotificationIsGranted = (): boolean => {
    if ('Notification' in window) {
      return Notification.permission === 'granted'
    }
    else return false
  }

  const notify = async (content: NotifProps) => {
    return await requestNotificationAPI().then((permission) => {
      if (permission) showPushNotification(content)
    })
  }

  const showPushNotification = async (data: NotifProps) => {
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
    requestNotificationAPI,
    checkIfNotificationIsGranted
  }
}

export default useNotification
