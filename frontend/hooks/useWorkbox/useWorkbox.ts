import { Workbox } from "workbox-window";

type ConfigProps = {
  path: string,
  onLoad: boolean,
  successMessage?: string,
  errorMessage?: string,
  actionForWaitingState?: Function,
  actionForControllingState?: Function
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

      wb.addEventListener('controlling', event => {
        // This will only trigger if there is newly installed service worker.
        if (typeof config.actionForControllingState === 'function') {
          config.actionForControllingState()
        }
      });

      wb.addEventListener('waiting', event => {
        // This will only trigger if self.SkipWaiting is not declared in your service worker.
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

export const unregisterServiceWorker = async () => {
  return navigator.serviceWorker.getRegistrations().then(function (registrations) {
    if (!registrations.length) {
      console.log('No serviceWorker registrations found.')
      return
    }
    for (let registration of registrations) {
      registration.unregister()
    }
  })
}
