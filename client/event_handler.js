Template.eventbooking.events({
  'click .category': function() {
    Router.setCategory(this.name);
    //Session.set("selectedCategory", this.name);
  },

  'click .header': function() {
    Router.setStart();
  },

  'focus #searchBox': function() {
    console.log("Start searching!!!");
  },

  'blur #searchBox': function() {
    Session.set("query", false);
  },

  'keyup #searchBox': function() {
    var query = document.getElementById("searchBox").value;
    Session.set("query", query);
  }
});

Template.eventlist.events({
  'click .eventLink': function() {
    Router.setEvent(this.category, this._id);
    //Session.set("selectedEvent", );
  },
  
  'click .setBooking': function() {
  	//Get number of tickets to book and update the collection object.
    var numberBooked = parseInt(document.getElementById("select_" + this._id).value);
    Events.update({_id: this._id}, {$inc: {tickets_booked: numberBooked}});
  }
});




