/*
	Publishes the collections
 */
Meteor.publish("events", function(){
	return Events.find({});
});

Meteor.publish("categories", function() {
	return Categories.find({});
});

Meteor.publish("posts", function() {
	return Posts.find({});
});