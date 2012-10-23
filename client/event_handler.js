Template.eventbooking.events({
  'click .category': function() {
    //Router.setCategory(this.name);
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
    //Router.setEvent(this.category, this._id);
    //Session.set("selectedEvent", );
  },
  
  'click .setBooking': function(event, template) {
  	//Get number of tickets to book and update the collection object.
    //var numberBooked = parseInt(document.getElementById("select_" + this._id).value);
    if(Session.get("showFinishBookingDialog")){
      alert("Avsluta aktuell bokning innan du fortsätter med andra evenemangsbokningar.");
      return false
    }
    var tickets = { eventId: this._id, amount: parseInt(template.find("select").value)};
    Meteor.call("lock", tickets);
    Session.set("showFinishBookingDialog", tickets);
  }
});

Template.eventPage.events({
  'click .setBooking': function(event, template) {
    //Get number of tickets to book and update the collection object.
    //var numberBooked = parseInt(document.getElementById("select_" + this._id).value);
    if(Session.get("showFinishBookingDialog")){
      alert("Avsluta aktuell bokning innan du fortsätter med andra evenemangsbokningar.");
      return false
    }
    var tickets = { eventId: this._id, amount: parseInt(template.find("select").value)};
    Meteor.call("lock", tickets);
    Session.set("showFinishBookingDialog", tickets);
  }
});

Template.finishBookingDialog.events({
  'click .book': function() {
    // lägg till bokningen på användaren alternativt lägg till användaren på biljetten
    Meteor.call("book", this);
    Session.set("showFinishBookingDialog", false);
  },
  'click .abort': function() {
    Meteor.call("unLock", this);
    Session.set("showFinishBookingDialog", false);
  }
});



