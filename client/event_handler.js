Template.eventbooking.events({
  	'click .category': function () {
    Session.set("selectedCategory", this.name);
  }
});