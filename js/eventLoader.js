function EventLoader(){
  this.events = [];
  this.status = "";
  this.search = function(term){
    $.getJSON(
      "https://www.eventbriteapi.com/v3/events/search/",
      {
        categories: '102',
        q: term,
        token: "R5KWMVH7GMWKCTBS6CQH"
      },
      function(data, status){
        this.events = data;
        this.status = status;
        $(document).trigger("eventChanged", this.events, this.status);
      }
    );
  }
  this.searchID = function(id){
    $.getJSON(
      "https://www.eventbriteapi.com/v3/events/" + id + '/',
      {
        token: "R5KWMVH7GMWKCTBS6CQH"
      },
      function(data, status){
        this.events = {events: [data]};
        this.status = status;
        $(document).trigger("eventChanged", this.events, this.status);
      }
    ).fail(function() {
      document.querySelector("app-router").go('/404')
    })
  }
}
