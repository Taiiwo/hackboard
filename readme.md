# HackBoard
It's a dashboard for hack events, built for Cloudjam.

## How to make a Plugin

#### 1) Build your plugin, using the code below as a boilerplate.
You're going to want to create your plugin file. Remember it's location. You'll use that in step 2. Replace "my-plugin" with your plugin name on line 3 *and* 22, also, remember this for step 2. Here you can basically put the meat of your plugin. Type the required styles, HTML, and JavaScript into the marked slots. The JavaScript has to be placed here as otherwise it will be executed before your elements have been put on the page. Styles will not affect other plugins or the page itself. If your plugin would not load correctly if not for the existence of some possibly unattainable variable, please use the 'deps' section of the plugin index to make sure this plugin doesn't get loaded.

``` html
<dom-module id="my-plugin"> <!-- Plugins must have a dash in the name! -->

  <style>
    /*

    All of your styles go in here. Styling web components can work differently to other styles, so refer to this guide if you run into a problem: https://www.polymer-project.org/0.9/docs/devguide/styling.html

    */
  </style>

  <template>
    <plugin-template>
      <!-- All of your plugin HTML goes in here! -->
    </plugin-template>
  </template>
</dom-module>

<script>
  Polymer({
    is: 'my-plugin', // Plugin name once more
    attached: function(){
      // This is where you write JavaScript that is relevant to this component.
      // Refer here for reference: https://www.polymer-project.org/0.9/
    }
  });
</script>
```
#### 2) Add your plugin details to pluginIndex.json
Add your plugin to the plugin index. You can add it anywhere, it doesn't matter. Make sure you fix your commas. Look up JSON formatting if you're unsure.

``` javascript
,
{
  "name":"plugin-name", // {1}
  "location":"../plugins/pluginFile.html", // {2}
  "x": 1, // {3}
  "y": 1, // {3}
  "deps": [
    "selectedEvent.name != undefined" // {4}
  ]
}
```
{1}: The name of your plugin. It needs a hyphen(-) in it. The same one as in step 1
{2}: The file location of the plugin. You should've probably put it in /plugins/
{3}: This is the grid width and height of your plugin. Note, try to avoid taking up too much space. I recommend only putting one value to 2 if you really need the space.
{4}: This is a list of string of JavaScript. Your plugin will only be shown if all of these return true.
