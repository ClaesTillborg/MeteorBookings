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

//Begin by inserting categories if none exist
if ( Categories.find({}).count() === 0 ) {
  var default_data = [];
  console.log("inserting default categories!");
  default_data = [
    { "name" : "Musik" },
    { "name" : "Festival" },
    { "name" : "Sport" }
  ];
  for (var i = default_data.length - 1; i >= 0; i--) {
    Categories.insert(default_data[i]);
  };
};
//Begin by inserting events if none exist
if ( Events.find({}).count() === 0 ) {
  var default_data = [];
  console.log("inserting default events!");
  default_data = [
  {
    "category" : "Sport",
    "name" : "Mjällby AIF - Kalmar FF", 
    "description" : "Fotboll", 
    "date" : new Date(),
    "location" : "Hällevik, Sölvesborg",
    "total_tickets" : 3000,
    "tickets_locked" : 0,
    "tickets_booked" : 0
  },
  {
    "category" : "Sport",
    "name" : "AIK - Djurgården", 
    "description" : "Fotboll", 
    "date" : new Date(),
    "location" : "Råsunda, Stockholm",
    "total_tickets" : 4000,
    "tickets_locked" : 0,
    "tickets_booked" : 0
  },
  {
    "category" : "Sport",
    "name" : "HV71 - MODO", 
    "description" : "Hockey", 
    "date" : new Date(),
    "location" : "Kinnarps arena, Jönköping",
    "total_tickets" : 4000,
    "tickets_locked" : 0,
    "tickets_booked" : 0
  },
  {
    "category" : "Sport",
    "name" : "Västrafrölunda - Brynäs", 
    "description" : "Hockey", 
    "date" : new Date(),
    "location" : "Scandinavium, Göteborg",
    "total_tickets" : 4000,
    "tickets_locked" : 0,
    "tickets_booked" : 0
  },
  {
    "category" : "Festival",
    "name" : "Swedenrock", 
    "description" : "Rockfestival", 
    "date" : new Date(),
    "location" : "Norje, Sölvesborg",
    "total_tickets" : 20000,
    "tickets_locked" : 0,
    "tickets_booked" : 0
  },
  {
    "category" : "Festival",
    "name" : "Peace and love", 
    "description" : "Popfestival", 
    "date" : new Date(),
    "location" : "Bårlänge",
    "total_tickets" : 20000,
    "tickets_locked" : 0,
    "tickets_booked" : 0
  },
  {
    "category" : "Musik",
    "name" : "Ironmaiden", 
    "description" : "Konsert", 
    "date" : new Date(),
    "location" : "Friends arena, Stockholm",
    "total_tickets" : 20000,
    "tickets_locked" : 0,
    "tickets_booked" : 0
  },
  {
    "category" : "Musik",
    "name" : "Sabaton", 
    "description" : "Konsert", 
    "date" : new Date(),
    "location" : "Palace, Kalmar",
    "total_tickets" : 500,
    "tickets_locked" : 0,
    "tickets_booked" : 0
  },
  {
    "category" : "Musik",
    "name" : "Stonesour", 
    "description" : "Konsert", 
    "date" : new Date(),
    "location" : "Annexet, Stockholm",
    "total_tickets" : 500,
    "tickets_locked" : 0,
    "tickets_booked" : 0
  }
  ];
  for (var i = default_data.length - 1; i >= 0; i--) {
    Events.insert(default_data[i]);
  };
};

/*
Category : {
  "Name" : "string"
};

"Event" : {
    "category" : string,
    "name" : string, 
    "description" : string, 
    "date" : new Date(),
    "location" : string,
    "total_tickets" : int,
    "tickets_locked" : 0,
    "tickets_booked" : 0
  };
*/