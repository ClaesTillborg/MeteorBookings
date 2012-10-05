var myRoutes = Backbone.Router.extend({
  
  routes: {
    "":             "start",    
    ":category":    "category",    // #category
    ":category/:eventId":       "event"       // #event
  },

  start: function() {
    Session.set("selectedEvent", null);
    Session.set("selectedCategory", null);
  },

  category: function(categoryName) {
    console.log("category route!");
    Session.set("selectedEvent", null);
    Session.set("selectedCategory", categoryName);
  },

  event: function(category, eventId) {
    console.log(category);
    Session.set("selectedCategory", null); 
    console.log(Session.get("selectedCategory"));
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