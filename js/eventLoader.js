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
        $(document).trigger("eventSearchComplete", self.data);
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
        $(document).trigger("eventIDRecognised", self.data);
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
      for (var i in event) {
        if (event[i] == null) {
          delete event[i];
        }
      }
      var ref = this.db.child(event.id.toString());
      ref.update(event);
    }
  }
  this.editEvent = function(data){
    var ref = this.db.child(this.selectedEvent.id.toString());
    data = JSON.parse(data);
    ref.update(data);
  }
  this.isJson = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
}
