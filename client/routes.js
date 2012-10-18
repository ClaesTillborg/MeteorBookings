var myRoutes = Backbone.Router.extend({
  
  routes: {
    "":                         "start",
    ":category":                "category",     // #category
    ":category/:eventId":       "event"         // #event
  },
//creating the sessions that will be used.
  start: function() {
    console.log("Creating both sessions");
    Session.set("selectedEvent", null);
    Session.set("selectedCategory", null);
  },
//Setting the selected category and resets the event session.
  category: function(categoryName) {
    console.log("Setting the selected category");
    Session.set("selectedEvent", null);
    Session.set("selectedCategory", categoryName);
  },
//Setting the selected event.
  event: function(category, eventId) {
    console.log("setting selected event!");
    Session.set("selectedEvent", eventId); 
  },

  setStart: function() {
    this.navigate("");
  },

  setEvent: function(category, eventId) {
    console.log("setEvent");
    this.navigate(category + "/" + eventId);
  },

  setCategory: function(categoryName) {
    console.log("setCategory");
    this.navigate(categoryName);
  }
});


Router = new myRoutes();

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});