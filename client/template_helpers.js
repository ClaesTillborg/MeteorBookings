
Template.eventbooking.category = function () {
	return Categories.find({}, {sort: {name: 1}});
};
Template.eventbooking.numberOfEvents = function () {
	return Events.find({category: this.name}).count();
};

Template.eventbooking.isSelectedCategory = function () {
  return Session.get("selectedCategory") || false;
};

Template.eventbooking.selectedCategory = function () {
	return Categories.findOne(Session.get("selectedCategory"));
};
Template.eventlist.event = function () {
	return Events.find({category: Session.get("selectedCategory")}, {sort: {date: 1}});
};