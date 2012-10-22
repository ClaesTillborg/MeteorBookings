Template.eventbooking.showFinishBookingDialog = function() {
	return Session.get("showFinishBookingDialog") ? true : false;
};

//Returns all categories sorted by name
Template.eventbooking.categories = function () {
	return Categories.find({}, {sort: {name: 1}});
};
//Returns the total amount of events
Template.eventbooking.totalNumberOfEvents = function () {
	return Events.find({}).count();
};
//Returns the amount of events related to a category
Template.eventbooking.numberOfEvents = function () {
	return Events.find({category: this.name}).count();
};
//Checks if a category is selected
Template.eventbooking.isSelectedCategory = function () {
  return Session.get("selectedCategory") || false;
};

Template.eventbooking.categoryClass = function () {
  return Session.equals("selectedCategory", this.name) ? "category active" : "category";
};
//Checks if an event is selected
Template.eventbooking.isSelectedEvent = function () {
  return Session.get("selectedEvent") || false;
};

Template.eventbooking.selectedCategory = function () {
  return Categories.findOne(Session.get("selectedCategory"));
};

Template.eventbooking.selectedEvent = function () {
  return Events.findOne(Session.get("selectedEvent"));
};

Template.eventPage.rendered = function() {
	var count = this.find(".ticketsLeft").innerHTML;
	if (count === 0 ) {

	};
};

Template.eventlist.event = function () {
  if (Session.get("query")) {
    return Events.find({"name": {"$regex": Session.get("query")}}, {sort: {date: 1, name: 1}});
  };
	return Events.find({category: Session.get("selectedCategory")}, {sort: {date: 1, name: 1}});
};

Template.eventPage.event = function() {
  return Events.findOne(Session.get("selectedEvent"));
};

Template.finishBookingDialog.data = function() {
	return Session.get("showFinishBookingDialog");
};


//--------------------------------------------------Helpers----------------------------------------------------->
Handlebars.registerHelper('formatDate', function(date) {
	var date = new Date(date);
	months = new Array("Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December");
	days = new Array("söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag");
	var month = months[date.getMonth()];
	var dayName = days[date.getDay()];
	var ret = dayName + " " + date.getDate() + " " + month + " " + date.getFullYear();
	return new Handlebars.SafeString(ret);

});

Handlebars.registerHelper("bookingSection", function(obj) {
	var ticketsLeft = obj.total_tickets - (obj.tickets_booked + obj.tickets_locked);
	var ret = 'Biljetter kvar: <span class="ticketsLeft">' + ticketsLeft + '</span>';
	var count = 0;
	
	if (!Meteor.user()) {
		ret += '<p><strong>Logga in för att boka</strong></p>';
		return new Handlebars.SafeString(ret)
	};

	if (ticketsLeft > 0) {
		ret += '<label for="select_' + obj._id + '">Antal biljetter</label>';
		ret += '<select id="select_' + obj._id + '">';
		if (ticketsLeft > 10) {
			count = 10;
		}
		else {
			count = ticketsLeft;
		};
		for (var i = 1; i <= count; i++) {
				ret += '<option value="' + i + '">' + i + '</option>';
		};
		ret += '</select>';
		ret += '<input class="setBooking" type="button" name="setBooking" value="Boka">';
	}
	else {
		ret += '<span class="soldOut">Inga biljetter kvar!</span>';
	};
	
	return new Handlebars.SafeString(ret);
});