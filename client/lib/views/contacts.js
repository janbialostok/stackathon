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
		return Session.get("chattingWith");
	},
	chat: function(){
		console.log(Session.get("connectMsg"));
		return Session.get("connectMsg");
	},
	stream: function(){
		console.log(Session.get("connectMsg")._id);
		Meteor.subscribe("stream", Session.get("connectMsg")._id);
		return Streams.find({});
	}
});

Template.chatView.events({
	"click #profile": function() {
		Meteor.call("disconnect", Session.get("connectRequest"), Meteor.user().username, Session.get("connectMsg")._id);
		Session.set("connectRequest", undefined);
	},
	"click #chat": function(event) {
		var chatting = Messages.find({}).fetch()[0];
		var comm = new Icecomm('k/J5M7YZPAHdjib87Cubf7pPm4pyUtuCN8kxbexjCEV0PZZkKK');
		comm.connect(chatting._id);
		Meteor.call("openStream", chatting._id, chatting.users[0], chatting.users[1]);
		comm.on('connected', function (options){
			document.getElementById('chatView').appendChild(options.video);
			event.target.disabled = true;
		});
		comm.on('local', function (options){
			localVideo.src = options.stream;
		});
		comm.on('disconnect', function (options){
			document.getElementById(options.callerID).remove();
			event.target.disabled = false;
		});
	},
	"submit form": function(event){
		event.preventDefault();
		var text = event.target.text.value;
		//console.log(text);
		Meteor.call("addToChat", text, Meteor.user().username);
		event.target.text.value = "";
		return false;
	},
	"click #stream": function (event){
		var comm = new Icecomm('k/J5M7YZPAHdjib87Cubf7pPm4pyUtuCN8kxbexjCEV0PZZkKK');
		console.log("Stream ID", Session.get("connectMsg")._id);
		comm.connect(Session.get("connectMsg")._id);
		console.log(comm);
		comm.on('connected', function (options){
			document.getElementById('chatView').appendChild(options.video);
			event.target.disabled = true;
		});
		comm.on('local', function (options){
			localVideo.src = options.stream;
		});
		comm.on('disconnect', function (options){
			document.getElementById(options.callerID).remove();
			Meteor.call("closeStream", streamId);
			event.target.disabled = false;
		});
	}
});