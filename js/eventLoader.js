function EventLoader(){
  this.events = [];
  this.status = "";
  this.search = function(term){
    $.getJSON(
      "https://www.eventbriteapi.com/v3/events/search/",
      {
        q: term,
        token: "R5KWMVH7GMWKCTBS6CQH"
      },
      function(data, status){
        this.events = data;
        this.status = status;
        $( document ).trigger("eventChanged", this.events, this.status);
      },
      function (){
        this.events = data;
        this.status = status;
        $( document ).trigger("eventChanged", this.events, this.status);
      }
    );
  }
}
