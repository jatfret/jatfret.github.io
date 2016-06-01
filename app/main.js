'use strict'
var component = require('./component.js');
var aBtn = document.getElementById('aClick');

aBtn.addEventListener('click', function(event){
	alert(event.type);
	
}, false)
