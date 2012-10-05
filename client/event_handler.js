Template.eventbooking.events({
  'click .category': function() {
    Router.setCategory(this.name);
    //Session.set("selectedCategory", this.name);
  },
  'click .header': function() {
    Router.setStart();
  }
});

Template.eventlist.events({
  'click .eventLink': function() {
    Router.setEvent(this.category, this._id);
    //Session.set("selectedEvent", );
  },
  'click .setBooking': function() {
    Events.update({_id: this._id}, {$inc: {tickets_booked: 1}});
  }
});




