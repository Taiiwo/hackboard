var selector = '#deck ul';
var selectedEvent;
var eb = new EventLoader;
var query = $_GET('q');
if (query) {
  eb.search(query);
}

$(document).on('eventChanged', function(e, data, status){
  // data.events is all the events that match the search.
  selectedEvent = data.events[0];
  // iterate through and load all the plugins in pluginIndex.json
  var plugins = new PluginLoader(selector);
  $(selector).empty();
  plugins.load("../pluginIndex.json", function(plugin, selector){
    Polymer.Base.importHref(plugin.location, function() {
      $(selector).append($('<li/>')
        .attr('id', 'plugin-' + plugin.name)
        .css('width', plugin.x * 290 + (plugin.x - 1) * 15)
        .attr('data-ss-colspan', plugin.x)
        .css('height',plugin.y * 290 + (plugin.y - 1) * 15)
        .addClass('card')
        .append(
          $('<'+ plugin.name +'/>')
        )
      );
    }, function() {
      console.log("error")
    });
  });
});

$( document ).on('pluginReady', function(e, event){
  reloadGrid(selector);
});

$('.search-input #input').keyup(function (e) {
  if (e.keyCode == 13) {
    var q = $('.search-input #input').val();
    eb.search(q);
    window.history.pushState('', '', location.pathname + "?q=" + q);
    $('.search-input #input').blur();
  }
});

function reloadGrid(selector){
  var options = {
    minColumns: 2,
    gutterX: 15,
    gutterY: 15,
    handle: "header",
    centerWhileDragging: false,
    animationSpeed: 300
  };

  $(selector).shapeshift(options);
}

function $_GET(q,s) {
  s = s ? s : window.location.search;
  var re = new RegExp('&'+q+'(?:=([^&]*))?(?=&|$)','i');
  return (s=s.replace(/^\?/,'&').match(re)) ? (typeof s[1] == 'undefined' ? '' : decodeURIComponent(s[1])) : undefined;
}
