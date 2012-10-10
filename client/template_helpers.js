Template.modal.isModalActive = function() {
	return Session.equals("isModalActive", true);
};

/*
Kod som körs när modal-templaten är renderad så man fejdar in divven när allt i den
 */
Template.modal.rendered = function() {
      $('div.modal-box').hide().fadeIn('slow');
};

Template.eventbooking.categories = function () {
	return Categories.find({}, {sort: {name: 1}});
};

Template.eventbooking.totalNumberOfEvents = function () {
	return Events.find({}).count();
};

Template.eventbooking.numberOfEvents = function () {
	return Events.find({category: this.name}).count();
};

Template.eventbooking.isSelectedCategory = function () {
  return Session.get("selectedCategory") || false;
};

Template.eventbooking.categoryClass = function () {
  return Session.equals("selectedCategory", this.name) ? "category active" : "category";
};

Template.eventbooking.isSelectedEvent = function () {
  return Session.get("selectedEvent") || false;
};

Template.eventbooking.selectedCategory = function () {
  return Categories.findOne(Session.get("selectedCategory"));
};

Template.eventbooking.selectedEvent = function () {
  return Events.findOne(Session.get("selectedEvent"));
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
	var ticketsLeft = obj.total_tickets - obj.tickets_booked;
	var ret = '<span>Biljetter kvar: ' + ticketsLeft + '</span>';
	var count = 0;

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