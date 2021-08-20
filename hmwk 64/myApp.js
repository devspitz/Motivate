window.myApp = window.myApp || {}; 

window.myApp.utils = (function(theModule) {
  'use strict';

    const days = ['Mon', 'Tues', 'Wed'];
  
    theModule.getDayName = (index) => days[index - 1];
    theModule.getDayNumber = (dayName) => days.findIndex(d => d.toLowerCase() === dayName.toLowerCase()) + 1;
 
    return theModule;
   
}(window.myApp.utils || {})); 