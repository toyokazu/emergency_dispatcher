import _ from 'lodash';
//import * as geolib from 'geolib';
//import { getDistance } from 'geolib';
import getDistance from 'geolib/es/getDistance';
import json from './teams.json';


//function component() {
//  const element = document.createElement('div');

//  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//  return element;
//}

// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/emergency_dispatcher/sw.js');
  });
}

// SRID = 4612 # JGD2000
// #SRID = 4326 # WGS84
// # radius of the earth (m)
// R = 6370997.0
//function haversine(loc1, loc2) {
//  const r = 6370997.0;
//  const dlon = loc2.longitude - loc1.longitude;
//  const dlat = loc2.latitude - loc1.latitude;
//  const a = Math.sin(dlat / 2.0) * Math.sin(dlat / 2.0) + Math.cos(loc1.latitude) * Math.cos(loc2.latitude) * Math.sin(dlon / 2.0) * Math.sin(dlon / 2.0);
//  const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
//  return r * c;
//}

//document.body.appendChild(component());

function listTeams(teams, currPosition) {
  const list = document.createElement('ol');
  teams.forEach( function(team) {
    let elem = document.createElement('li');
    let link = document.createElement('a');
    link.id = 'link:' + team.name;
    link.className = 'candidates';
    link.href = 'tel:' + team.tel;
    link.onclick = function() { registerCall(team.name, team.tel, JSON.stringify(currPosition)); };
    link.innerHTML = team.name;
    elem.appendChild(link);
    list.appendChild(elem);
    //list.appendChild(document.createElement('li').appendChild(link));
  });
  return list;
}


// The following codes refers to the sample code published in the following URI
// https://developer.mozilla.org/ja/docs/Web/API/Geolocation/Using_geolocation
window.findTeams = function findTeams() {
  const candidatesFrame = document.getElementById("candidates_frame");

  if (!navigator.geolocation){
    candidatesFrame.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    candidatesFrame.appendChild(listTeams(json.teams), null);
    return;
  }

  function success(position) {
    const currPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }

    //console.log(currPosition);
    //console.log(getDistance(currPosition, currPosition));

    candidatesFrame.appendChild(listTeams(json.teams.sort(function(a,b) {
      return (getDistance(a.location, currPosition) - getDistance(b.location, currPosition));
    }), currPosition));
  }

  function error() {
    candidatesFrame.innerHTML = "<p>Unable to retrieve your location</p>";
    candidatesFrame.appendChild(listTeams(json.teams), null);
  }

  candidatesFrame.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

window.registerCall = function registerCall(teamName, teamTel, currPosition) {
  const call = document.createElement('div');
  call.innerHTML = '<p>Team: ' + teamName + ', TeamTel: ' + teamTel + ', ' + currPosition + '</p>';
  document.body.appendChild(call);
}
