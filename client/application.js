Template.body.helpers({
    userProfile: function() {
    	var viewing = Session.get("viewing");
    	if (viewing){
			  Meteor.subscribe("profiles", viewing);
    		return UserProfiles.find({});
    	}
    	else{
            Meteor.subscribe("user", Meteor.userId());
            var user = Meteor.users.find({}).fetch();
            Session.set("user", user[0]);
            var username;
            if (user[0].username) username = user[0].username;
            else {
                if (user[0].services.twitter) {
                    username = "twitter_" + user[0].services.twitter.screenName;
                }
                else if (user[0].services.google) {
                    username = "google_" + user[0].services.google.email;
                }
                Meteor.call("addUsername", username, Meteor.userId());
            }
            Meteor.subscribe("profiles", username);
            var profile = UserProfiles.find({}).fetch();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position){
                    var locationStr = "lat: " + position.coords.latitude + ", lon: " + position.coords.longitude;
                    var location = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    }
                    var cleanedLocation = Meteor.call("getLocation", profile[0]._id, location);
                });
            }
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