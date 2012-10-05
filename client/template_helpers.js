Template.eventbooking.categories = function () {
	return Categories.find({}, {sort: {name: 1}});
};

Template.eventbooking.totalNumberOfEvents = function () {
	return Events.find({}).count();
};

Template.eventbooking.numberOfEvents = function () {
	return Events.find({category: this.name}).count();
};

Template.eventbooking.isSelectedCategory = function () {
  return Session.get("selectedCategory") || false;
};

Template.eventbooking.categoryClass = function () {
  return Session.equals("selectedCategory", this.name) ? "category active" : "category";
};

Template.eventbooking.isSelectedEvent = function () {
  return Session.get("selectedEvent") || false;
};

Template.eventbooking.selectedCategory = function () {
  return Categories.findOne(Session.get("selectedCategory"));
};

Template.eventbooking.selectedEvent = function () {
  return Events.findOne(Session.get("selectedEvent"));
};

Template.eventlist.event = function () {
	return Events.find({category: Session.get("selectedCategory")}, {sort: {date: 1, name: 1}});
};

Template.eventPage.event = function() {
  return Events.findOne(Session.get("selectedEvent"));
}

Template.eventlist.ticketsLeft = function() {
  var event = Events.findOne(this._id);
  var tickets_left = event.total_tickets - event.tickets_booked;
  return tickets_left;
};