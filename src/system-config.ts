/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  "materialize-css": "vendor/materialize-css",
  "materialize": "vendor/angular2-materialize",
  "angular2-materialize": "vendor/angular2-materialize",
  "c3": "vendor/c3",
  "d3": "vendor/d3"
};

/** User packages configuration. */
const packages: any = {
  "materialize-css": {
    "main": "dist/js/materialize"
   },
   "materialize": {
    "main": "dist/materialize-directive",
    "defaultExtension": "js"
   }, 
   "c3" : {"main" : "c3", "defaultExtension": "js"},
   "d3" : {"main" : "d3", "defaultExtension": "js"}
};



////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ 
  defaultJSExtensions: true,
  map, 
  packages 
});
