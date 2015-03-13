Template.contactsList.helpers({
	friends: function(){
		Meteor.subscribe("friends", Meteor.user().username);
		var friends = UserProfiles.find({}).fetch();
		var onlineFriends = [];
		var offlineFriends = [];
		friends.forEach(function (friend){
			if (friend.status == "online" && friend.username !== Meteor.user().username) onlineFriends.push(friend);
			if (friend.status == "offline" && friend.username !== Meteor.user().username) offlineFriends.push(friend);
		});
		Session.set("onlineFriends", onlineFriends);
		Session.set("offlineFriends", offlineFriends);
		return friends;
	},
	online: function(){
		return Session.get("onlineFriends");
	},
	offline: function(){
		return Session.get("offlineFriends");
	}
});

Template.contactsOnline.helpers({
	contacts: function() {
		return Session.get("onlineFriends");
	}
});

Template.contactsOnline.events({
	"click button": function (event){
		var username = event.target.value;
		console.log(username);
		Session.set("connectRequest", username);
		Meteor.call("connect", username, Meteor.user().username);
	}
})

Template.contactsOffline.helpers({
	contacts: function() {
		return Session.get("offlineFriends");
	}
});

Template.chatView.helpers({
	contact: function (){
		return Session.get("connectRequest");
	},
	chat: function(){
		console.log(Session.get("connectMsg"));
		return Session.get("connectMsg");
	}
});

Template.chatView.events({
	"click #profile": function() {
		Meteor.call("disconnect", Session.get("connectRequest"), Meteor.user().username);
		Session.set("connectRequest", undefined);
	},
	"click #chat": function() {

	},
	"submit form": function(event){
		event.preventDefault();
		var text = event.target.text.value;
		console.log(text);
		Meteor.call("addToChat", text, Meteor.user().username);
		return false;
	}
});