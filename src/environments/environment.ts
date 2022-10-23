// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'mcq-examanation',
    appId: '1:434248016962:web:63e5e1156d3380b1a079db',
    storageBucket: 'mcq-examanation.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyBGxCLP-ZC6zF-6KWZPSWNhVTe8rPMRPEs',
    authDomain: 'mcq-examanation.firebaseapp.com',
    messagingSenderId: '434248016962',
  },
  appLanguages: [
    { code: 'en', display: 'English' },
    { code: 'ar', display: 'Arabic' },
    { code: 'tr', display: 'Turkish' },
  ],
  defaultLang: 'en',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
