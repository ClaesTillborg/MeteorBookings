/*
	Publishes the collections
 */
/*
Meteor.publish("events", function(category){
  return Events.find({category: category});
});*/

Meteor.publish("events", function(){
  return Events.find({});
});
/*
Meteor.publish("eventCount", function(){
  return Events.find({}, {fields: {category: 1}});
});
 */
Meteor.publish("categories", function() {
	return Categories.find({});
});

Meteor.publish("userData", function() {
  return Meteor.users.find({_id: this.userId}, {fields: {emails: 1}});
});