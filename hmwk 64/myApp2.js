window.myApp = window.myApp || {};

window.myApp.util= (function (theModule) {
  'use strict';
   theModule.isStringEqual = (stringA, stringB) =>  stringA.toUpperCase() === stringB.toUpperCase();
  
    return theModule;
  }(window.myApp.util || {});