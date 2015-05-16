function PluginLoader(selector, successHandler){
  // a version of this object used to call methods globally
  var self = this;
  this.load = function(pluginFileUrl){
    $.getJSON(
      pluginFileUrl,
      {},
      this.pluginListHandler
    );
  }
  this.pluginListHandler = function(pluginList) {
    this.pluginList = pluginList;
    for (var i in pluginList){
      var plugin = pluginList[i];
      $.ajax({
        url: plugin.location,
        context: self,
        success: function(code, status){
          plugin.html = code;
          this.runPlugin(plugin);
        }
      });
    }
  }
  this.runPlugin = function(plugin){
    // create a container
    $(selector).append($('<div/>')
      .attr('id', 'plugin' + plugin.name)
      .addClass('card')
    );
    // make container into a shadow DOM
    var shadow = $(selector + ' #plugin' + plugin.name)[0].createShadowRoot();
    // add all the things to the shadow dom.
    $(shadow).append(
      $('<div/>').html(plugin.html)
    );
    if (typeof successHandler != "undefined"){
      successHandler();
    }
  }
}
