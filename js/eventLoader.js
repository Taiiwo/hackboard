function EventLoader(){
  this.data = [];
  this.status = "";
  this.db = new Firebase("https://hackboard.firebaseio.com/events");
  var self = this;
  this.search = function(term){
    $.getJSON(
      "https://www.eventbriteapi.com/v3/events/search/",
      {
        categories: '102',
        q: term,
        token: "R5KWMVH7GMWKCTBS6CQH"
      },
      function(data, status){
        self.data = data;
        $(document).trigger("eventSearchComplete", this.data);
        self.logData(self.data);
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
        self.data = {events: [data]};
        $(document).trigger("eventSearchComplete", this.data);
        self.logData(self.data);
      }
    ).fail(function() {
      document.querySelector("app-router").go('/404')
    })
  }
  this.selectEvent = function(index){
    var selectedEventRef = this.db.child(this.data.events[index].id);
    selectedEventRef.on('value', function(data){
      self.selectedEvent = data.val();
      $(document).trigger('eventSelected', self.selectedEvent);
    });
  }
  this.logData = function(data) {
    for (var index in data.events){
      var event = data.events[index];
      var obj= {};
      obj[event.id.toString()] = event;
      this.db.update(obj);
    }
  }
}
