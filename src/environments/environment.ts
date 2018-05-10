// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA2u8zLv4_UvAwYhAW4tMe8Ovws5TgPVso',
    authDomain: 'aks-udemy-shop.firebaseapp.com',
    databaseURL: 'https://aks-udemy-shop.firebaseio.com',
    projectId: 'aks-udemy-shop',
    storageBucket: 'aks-udemy-shop.appspot.com',
    messagingSenderId: '432022531922'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
