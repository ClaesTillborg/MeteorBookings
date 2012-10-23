/*
	Subscribes to the collections
 */
Meteor.subscribe("events");
Meteor.subscribe("categories");
Meteor.subscribe("userData");

//Meteor.subscribe("eventCount");
/*
Meteor.autosubscribe(function () {
  Meteor.subscribe("events", Session.get("selectedCategory"));
});*/