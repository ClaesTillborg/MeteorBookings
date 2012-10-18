/*
	Publishes the collections
 */
Meteor.publish("events", function(){
	return Events.find({});
});

Meteor.publish("categories", function() {
	return Categories.find({});
});