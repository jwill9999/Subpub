var mustache = require('mustache');
var jquery = require('jquery');
var events = require('./events.js').events;


module.exports.stats = (function(Mustache, $, events){
  var people = 0;  
  //cache
  var $stats = $('#statsModule');
  var $template = $('#stats-template').html();
  events.on("peopleChanged", setPeople);
  _render();
  
  function _render(){
    $stats.html(Mustache.render($template, {people: people}));
    events.on("peopleChanged", setPeople);
  }
  
  function setPeople(newPeople ){
    people = newPeople;
    _render();
  }

 
  
})(mustache, jquery,events);