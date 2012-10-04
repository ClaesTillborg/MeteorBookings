var myRoutes = Backbone.Router.extend({
  
  routes: {

    "category/:query":    "category",    // #category
    "event/:query":       "event"       // #event
  },

  category: function(categoryName) {
    console.log("category route!");
    Session.set("selectedEvent", false); 
    Session.set("selectedCategory", categoryName);
  },

  event: function(eventId) {
    console.log("chaning categor");
    Session.set("selectedCategory", "");
    console.log(Session.get("selectedCategory"));
    Session.set("selectedEvent", eventId); 
  },

  setEvent: function(eventId) {
    console.log("setEvent");
    this.navigate("event/" + eventId);
  },

  setCategory: function(categoryName) {
    console.log("setCategory");
    this.navigate("category/" + categoryName);
  }
});


Router = new myRoutes();

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});