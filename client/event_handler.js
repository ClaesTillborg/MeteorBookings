Template.eventbooking.events({
  'click .category': function() {
    Router.setCategory(this.name);
    //Session.set("selectedCategory", this.name);
  },

  'click .header': function() {
    Router.setStart();
  },
/*
  'focus #searchBox': function() {
    console.log("Start searching!!!");
  },

  'blur #searchBox': function() {
    Session.set("query", false);
  },

  'keyup #searchBox': function() {
    var query = document.getElementById("searchBox").value;
    Session.set("query", query);
  },*/
});

Template.eventlist.events({
  'click .eventLink': function() {
    Router.setEvent(this.category, this._id);
    //Session.set("selectedEvent", );
  },
  
  'click .setBooking': function(event, template) {
  	//Get number of tickets to book and update the collection object.
    //var numberBooked = parseInt(document.getElementById("select_" + this._id).value);
    
    var amountOfTickets = template.find("select").value;
    Meteor.call("fooTimer", this._id, amountOfTickets);
    Session.set("showFinishBookingDialog", true);
  }
});

Template.finishBookingDialog.events({
  'click .book': function() {
    // lägg till bokningen på användaren alternativt lägg till användaren på biljetten
    Session.set("showFinishBookingDialog", false);
  },
  'click .close': function() {
    Session.set("showFinishBookingDialog", false);
  }
});



