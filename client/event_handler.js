Template.eventbooking.events({
  	'click .category': function () {
      Router.setCategory(this.name);
      //Session.set("selectedCategory", this.name);
  }
});

Template.eventlist.events({
  'click .event': function () {
    Router.setEvent(this._id);
    //Session.set("selectedEvent", );
  }
});