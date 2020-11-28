/*
Name: Aaron Gedz
Course: ICT 4510 - Adv Web Design
Date: 8/19/2020
Description: This script is to call the map box API and return a style. 
The script starts on page load by adding an event listener for when the DOM content is loaded. 
After that the map is created by calling leaflet and setting it to “mapid” in the webpage, 
the coordinates are set and the initial zoom level is set to 15. 
A few more attributes are set and then everything is added back to the original local variable “mymap”.
*/

document.addEventListener('DOMContentLoaded', function () {

    var mymap = L.map('mapid').setView([39.678121, -104.961753], 15);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWFyb25nZWR6IiwiYSI6ImNrZDk2cHRhZDM3b3kyeW15bnp3NHllMWoifQ.EIe4gBqC0RhivZEfaALXSw', {
        maxZoom: 20,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);

    L.marker([39.678121, -104.961753]).addTo(mymap);

});