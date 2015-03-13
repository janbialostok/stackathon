Template.body.helpers({
    userProfile: function() {
    	var viewing = Session.get("viewing");
    	if (viewing){
			  Meteor.subscribe("profiles", viewing);
    		return UserProfiles.find({});
    	}
    	else{
	    	Meteor.subscribe("profiles", Meteor.user().username);
            var profile = UserProfiles.find({}).fetch();
            console.log(profile[0]._id);
            Session.set("userProfileId", profile[0]._id);
	    	return UserProfiles.find({});
    	}
    },
    emptyViewHelper: function(){
    	if (Session.get("viewing")) return true;
    	else return false;
    },
    isUser: function(){
      return UserProfiles.find({}).fetch()[0].uid === Meteor.userId();
    },
    seeRequests: function(){
        return Session.get("seeRequests");
    },
    openChat: function(){
        return Session.get("openChat");
    },
    contact: function(){
        return Session.get("connectRequest");
    },
    connected: function(){
        Meteor.subscribe("activeChat", Meteor.user().username);
        var currentChat = Messages.find({}).fetch()[0];
        Session.set("connectMsg", currentChat);
        // var chatting = "";
        // currentChat.user.forEach(function (user){
        //     if (user !== Meteor.user().username) chatting += user;
        // });
        // Session.set("chattingWith", chatting);
        return Messages.find({});
    },
    stream: function(){
        var streamId = Session.get("connectMsg")._id;
        if (streamId){
            Meteor.subscribe("stream", streamId);
            Session.set("stream", Streams.find({}).fetch()[0]);
            return Streams.find({});
        }
    }
});