
Template.eventbooking.category = function () {
	return Categories.find({});
};
Template.eventbooking.numberOfEvents = function () {
	return Events.find({category: this.name}).count();
};