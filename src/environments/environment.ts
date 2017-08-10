// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBRbJsGQlASaHn9rQhkmYpkMqZ9rJ3FMrM',
    authDomain: 'booktionator.firebaseapp.com',
    databaseURL: 'https://booktionator.firebaseio.com',
    projectId: 'booktionator',
    storageBucket: 'booktionator.appspot.com'
  },
  googleBooks: {
    apiKey: 'AIzaSyBT1K_Wh7dHuYRZhHryLeRsIQS-yOF4oxc',
    url: 'https://content.googleapis.com/books/v1'
  }
};
