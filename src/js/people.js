var mustache = require('mustache');
var jquery = require('jquery');
var events = require('./events').events;

module.exports.people = (function (Mustache, $, events) {
    var people = ['Will', 'Steve'];

    //cache DOM
    var $el = $('#peopleModule');
    var $button = $el.find('button');
    var $input = $el.find('input');
    var $ul = $el.find('ul');
    var template = $el.find('#people-template').html();

    //bind events
    $button.on('click', addPerson);
    $ul.delegate('i.del', 'click', deletePerson);

    // on document load render and emit people.length
    document.addEventListener("DOMContentLoaded", function (event) {
        _render();
        events.emit('peopleChanged', people.length);
    });

    // render function
    function _render() {
        events.emit("peopleChanged", people.length);
        $ul.html(Mustache.render(template, {
            people: people
        }));
    }

    // add people to persons array and render
    function addPerson(value) {
        var name = (typeof value === "string") ? value : $input.val();
        people.push(name);
        _render();
        $input.val('');
    }

    // remove people from persons array and render
    function deletePerson(event) {
        var i;
        if (typeof event === "number") {
            i = event;
        } else {
            var $remove = $(event.target).closest('li');
            i = $ul.find('li').index($remove);
        }
        people.splice(i, 1);
        _render();
    }

    return {
        addPerson,
        deletePerson
    };

})(mustache, jquery, events);