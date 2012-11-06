Template.eventbooking.events({
  'click .header': function() {
    Router.setStart();
  },
});

Template.eventlist.events({
  'click .setBooking': function(event, template) {
    SetBooking(this, template.find("select#" + this._id).value);
  }
});

Template.eventPage.events({
  'click .setBooking': function(event, template) {
    SetBooking(this, template.find("select#" + this._id).value);
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

SetBooking = function(obj, selectValue) {
  //Get number of tickets to book and update the collection object.
  if(Session.get("showFinishBookingDialog")){
    alert("Avsluta aktuell bokning innan du fortsätter med andra evenemangsbokningar.");
    return false
  }
  var tickets = { eventId: obj._id, amount: parseInt(selectValue)};
  Meteor.call("lock", tickets);
  Session.set("showFinishBookingDialog", tickets);  
}