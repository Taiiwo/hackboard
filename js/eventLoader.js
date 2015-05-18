function EventLoader(){
  this.search = function(term){
    $.getJSON(
      "https://www.eventbriteapi.com/v3/events/search/",
      {
        q: term,
        popular: true,
        token: "R5KWMVH7GMWKCTBS6CQH"
      },
      function(data, status){
        $( document ).trigger("eventChanged", data, status);
      }
    );
  }
}
