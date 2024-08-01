#### Usage

    import useNotification from "@hooks/useNotification"
    ...
    const { notify, checkIfNotificationIsGranted, requestFirebaseNotify } = useNotification()
    ...
    
    // For Normal Notification
    notify({
      title: "Hi there! I'm glad you stopped by. ",
      icon: 'https://avatars.githubusercontent.com/u/45531522?v=4&size=64',
      body: "This website supports PWA. Install it like a native app and browse even when offline."
    })
    
    // For Google FCM
    const token = await requestFirebaseNotify()
    if (token) {
      console.log("Hi developer! This log is intended. Your FCM key:", { fcm: token }, 'You can use this to test push notification. -Lennon')
    }
