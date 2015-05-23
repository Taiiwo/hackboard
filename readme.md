# HackBoard
It's a dashboard for hack events, built for Cloudjam.

##### How to make a Plugin

1) Build your plugin, using the code below as a boilerplate.

``` html
<link rel="import" href="../../components/components.html">

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
    // This is where you write JavaScript that is relevant to this component.
    // Refer here if you are stuck: https://www.polymer-project.org/0.9/
  })
</script>
```
2) Add your plugin details to pluginIndex.json

``` json
,
{
  "name":"plugin-name",
  "location":"../plugins/pluginFile.html",
  "x": 1,
  "y": 1
}
```
