
import { getToken } from "firebase/messaging";
import { messaging } from "../messaging/firebaseConfig" // optional FCM

let onPermissionChange: NodeJS.Timeout, firebaseNotifyRetry = 0

type NotifProps = {
  title: string,
  icon?: string,
  body: string
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
              const token = await getToken(messaging, {
                vapidKey: process.env.VAPID_KEY,
              });
              console.log("Hi developer! This log is intended. Your FCM key:", { fcm: token }, 'You can use this to test push notification. -Lennon')
            }, 500);
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

  const checkIfNotificationIsGranted = (): boolean =>{
    if ('Notification' in window) {
      return Notification.permission === 'granted'
    } else {
      return false
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
