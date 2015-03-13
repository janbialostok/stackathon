Template.nav.events({
  	"submit #searchForm": function (event){
  		event.preventDefault();
  		Session.set("viewing", event.target.searchInput.value);
      Session.set("seeRequests", false);
      Session.set("openChat", false);
      Meteor.call("openChat", Meteor.userId(), "offline");
  		event.target.searchInput.value = "";
  		return false;
  	},
  	"click #profileButton": function(){
  		Session.set("viewing", Meteor.user().username);
      Session.set("seeRequests", false);
      Session.set("openChat", false);
      Meteor.call("openChat", Meteor.user().username, "offline");
  	},
    "click #requests": function(){
      Session.set("seeRequests", true);
      Session.set("openChat", false);
      Meteor.call("openChat", Meteor.user().username, "offline");
    },
    "click #chatButton": function(){
      Session.set("openChat", true);
      Meteor.call("openChat", Meteor.user().username, "online");
    }
  });

Template.nav.helpers({
  requestsTotal: function(){
    var found = UserProfiles.find({}).fetch();
    if (found[0].uid === Meteor.userId()){
      Session.set("fRequests", found[0].requests.length);
      Session.set("fRequestObjs", found[0].requests);
      Session.set("completedRequests", found[0].completedRequests);
    } 
    return Session.get("fRequests");
  }
});