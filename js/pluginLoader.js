function PluginLoader(selector){
  this.selector = selector;
  this.runPlugins = [];
  this.plugins = [];
  var self = this;
  this.load = function(pluginIndexUrl){
    // get index.json
    $.getJSON(
      pluginIndexUrl,
      {},
      this.pluginIndexLoaded
    );
  }
  this.pluginIndexLoaded = function(data, status){
    // we got the index. Store it for use later
    self.plugins = data;
  }
  this.prep = function() {
    this.runPlugins = [];
    // do the plugin deps
    for (var a in this.plugins){
      var plugin = this.plugins[a];
      var runPlugin = true;
      for (var i in plugin.deps){
        try{
          if(!eval(plugin.deps[i])){// if dep is false
            runPlugin = false;
            break;
          }
        }
        catch (err){// if dep errors
          runPlugin = false;
          console.log(err);
          break;
        }
      }
      if (runPlugin){// add all the valid plugins to an array
        this.runPlugins.push(plugin);
      }
    }
    $( document ).trigger("pluginsReady", this.runPlugins);
  }
  this.placeRunPlugins = function () {
    // clear the deck
    $(this.selector).empty();
    for (var b in this.runPlugins){
      var plugin = this.runPlugins[b];
      // import the plugin's polymer element
      Polymer.Base.importHref(plugin.location)
      // once it's imported, add it to the page.
      $(self.selector).append($('<li/>')
        .attr('id', 'plugin-' + plugin.name)
        .css('width', plugin.x * 290 + (plugin.x - 1) * 15)
        .attr('data-ss-colspan', plugin.x)
        .css('height',plugin.y * 290 + (plugin.y - 1) * 15)
        .addClass('card')
        .append(
          $('<'+ plugin.name +'/>')
        )
      );
    }
    setTimeout(function(){
      $( document ).trigger("pluginsOnPage");
    }, 200);
  }
}
