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
    var pluginListLength = pluginList.length - 1;
    for (var a in pluginList){
      var plugin = pluginList[a];
      var runPlugin = true;
      for (var i in plugin.deps){
        try{
          if(!eval(plugin.deps[i])){
            runPlugin = false;
            pluginListLength--;
            break;
          }
        }
        catch (err){
          runPlugin = false;
          pluginListLength--;
          console.log(err);
          break;
        }
      }
      if ( a >= pluginListLength){
        self.runPlugin(plugin, true, runPlugin );
      }
      else {
        self.runPlugin(plugin, false, runPlugin);
      }
    }
  }
  this.runPlugin = function(plugin, isLast, runPlugin){
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
    if (typeof this.loadSuccess != "undefined" && runPlugin){
      this.loadSuccess(plugin, selector);
    }
    if (isLast){
      setTimeout(function() {
        $( document ).trigger("pluginReady", selectedEvent);
      }, 500);
    }
  }
}
