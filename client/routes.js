var myRoutes = Backbone.Router.extend({
  
  routes: {
    "":                         "start",
    ":category":                "category",     // #category
    ":category/:eventId":       "event"         // #event
  },
//creating the sessions that will be used.
  start: function() {
    Session.set("selectedEvent", null);
    Session.set("selectedCategory", null);
  },
//Setting the selected category and resets the event session.
  category: function(categoryName) {
    Session.set("selectedEvent", null);
    Session.set("selectedCategory", categoryName);
  },
//Setting the selected event.
  event: function(category, eventId) {
    Session.set("selectedEvent", eventId); 
  },

  setStart: function() {
    this.navigate("");
  },

  setEvent: function(category, eventId) {
    this.navigate(category + "/" + eventId);
  },

  setCategory: function(categoryName) {
    this.history.navigate(categoryName);
  }
});


Router = new myRoutes();

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});


// All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
    // Get the absolute anchor href.
    var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
    // Get the absolute root.
    var root = location.protocol + "//" + location.host;

    // Ensure the root is part of the anchor href, meaning it's relative.
    if (href.prop.slice(0, root.length) === root) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.  The fragment is sliced from the root.
      Backbone.history.navigate(href.attr, true);
    }
  });