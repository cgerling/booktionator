# Booktionator

:notebook_with_decorative_cover: Book trading platform powered by Angular 2 and Firebase Tools.

## Setup

If you already have the angular-cli and firebase-tools installed jump to step 4.

1. You will need of angular-cli `npm -g install @angular/cli`
2. And maybe the firebase-tools(to test things locally) `npm -g install firebase-tools`
4. Clone the repository `git clone https://github.com/calvingerling/booktionator.git`
5. Go to directory `cd booktionator/`
6. Install the dependencies of main project `npm install`
  * Install the dependencies of Cloud Functions `cd functions/ && npm install`
7. To check if everything runs ok just `npm run build`

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
