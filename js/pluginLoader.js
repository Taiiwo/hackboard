function PluginLoader(selector){
  // a version of this object used to call methods globally
  var self = this;
  this.load = function(pluginFileUrl, successHandler){
    this.loadSuccess = successHandler;
    // get index.json
    $.getJSON(
      pluginFileUrl,
      {},
      this.pluginListHandler
    );
  }
  this.pluginListHandler = function(pluginList) {
    this.pluginList = pluginList;
    $(document).on('eventChanged', function(e, data, status){
      for (var i in pluginList){
        var plugin = pluginList[i];
        var runPlugin = true;
        for (var i in plugin.deps){
          try{
            if(!eval(plugin.deps[i])){
              runPlugin = false;
              break;
            }
          }
          catch (err){
            runPlugin = false;
            console.log(err);
            break;
          }
        }
        if (runPlugin){
          self.runPlugin(plugin);
        }
      }
    });
  }
  this.runPlugin = function(plugin){
    // this is just here for flexibility.
    /*
    if (typeof this.loadSuccess == "undefined"){
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
    }*/
    if (typeof this.loadSuccess != "undefined"){
      this.loadSuccess(plugin, selector);
    }
  }
}
