/*
  Server methods
 */
Meteor.methods({
  lock: function(tickets) {
    console.log("locking tickets");
    Events.update({_id: tickets.eventId}, {$inc: {tickets_locked: tickets.amount}});
  },
  unLock: function(tickets) {
    console.log("unlocking tickets");
    Events.update({_id: tickets.eventId}, {$inc: {tickets_locked: -tickets.amount}});
  },
  book: function(tickets) { 
    console.log("doBooking!");  
    Events.update({_id: tickets.eventId}, {$inc: {tickets_booked: tickets.amount, tickets_locked: -tickets.amount}});
    
    Meteor.setTimeout(function() {
      Session.set("showFinishBookingDialog", false);
      console.log("remove booking");
      Events.update({_id: tickets.eventId}, {$inc: {tickets_booked: -tickets.amount}});
    }, 2000);
  },
  unBook: function(tickets) {
    Events.update({_id: tickets.eventId}, {$inc: {tickets_booked: -tickets.amount}});
  }
}); 


/*

Exemple of setup funktions

var server_password = 'supersecret';
Meteor.methods({
  update: function(selector, updates, multi, passcode) {
    var show = Shows.findOne(selector.show_id);
    if(show && passcode && (passcode === show.secret)) {
      return Slides.update(selector, updates, multi);
    }
  },
  insert: function(attributes, passcode) {
    var secret = Shows.findOne(attributes.show_id).secret;
    if(passcode && passcode === secret) {
      return Slides.insert(attributes);
    }
  },
  remove: function(selector, passcode) {
    var secret = Shows.findOne(selector.show_id).secret;
    if(passcode && passcode === secret) {
      return Slides.remove(selector);
    }
  },
  // -- Methods for Slideshows -- //
  updateShow: function(show_id, updates, passcode) {
    var show = Shows.findOne(show_id);
    if(show && passcode && (passcode === show.secret)) {
      Shows.update({_id: show_id}, updates);
    }
  },
  newShow: function(code) {
    var show_id = Shows.insert({title: 'Double click to edit', body: "I'm sorry, there isn't a tutorial yet", created_at: Date.now(), secret: code});
    return show_id;
  },
  removeShow: function(show_id, passcode) {
    var secret = Shows.findOne(show_id).secret;
    if(passcode && passcode === secret) {
      Shows.remove({_id: show_id});
      Slides.remove({show_id: show_id});
    }
  },

  confirmSecret: function(show_id, client_secret) {
    var show = Shows.findOne(show_id);
    if(show && show.secret === client_secret) {
      return true;
    } else {
      return false;
    }
  },
  generateSecret: function() {
    var a = animals[Math.floor(Math.random()*num_animals)];
    var c = colors[Math.floor(Math.random()*num_colors)];
    return c+'-'+a;
  }
});
Meteor.startup(function() {
  Meteor.default_server.method_handlers['/slides/insert'] = function () {};
  Meteor.default_server.method_handlers['/slides/update'] = function () {};
  Meteor.default_server.method_handlers['/slides/remove'] = function () {};
  Meteor.default_server.method_handlers['/shows/insert'] = function () {};
  Meteor.default_server.method_handlers['/shows/update'] = function () {};
  Meteor.default_server.method_handlers['/shows/remove'] = function () {};
});
*/



//============================================================================
//Feching default data from defaultData.js if none exists

//Begin by inserting categories if none exist
if ( Categories.find({}).count() === 0 ) {
  console.log("inserting default categories!");
  for (var i = defaultCategories.length - 1; i >= 0; i--) {
    Categories.insert(defaultCategories[i]);
  };
};
//Begin by inserting events if none exist
if ( Events.find({}).count() === 0 ) {
  console.log("inserting default events!");
  for (var i = defaultEvents.length - 1; i >= 0; i--) {
    Events.insert(defaultEvents[i]);
  };
};