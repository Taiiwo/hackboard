var eventData;
function EventLoader(){
  this.search = function(term, callback){
    $.getJSON(
      "https://www.eventbriteapi.com/v3/events/search/",
      {
        q: term,
        token: "R5KWMVH7GMWKCTBS6CQH"
      },
      function(data, status){
        eventData = data;
        callback(data, status);
      }
    );
  }
}
