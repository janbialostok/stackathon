if (Meteor.isServer) {
  
	Meteor.publish("profiles", function(user){
		return UserProfiles.find({ username: user });
	});

	Meteor.publish("friends", function(user){
		if (user) {
			return UserProfiles.find({ username: {$ne: user}, friends: {$elemMatch: {$in: [user]}} });
		}
	});

	Meteor.publish("activeChat", function (user){
		if (user){
			return Messages.find({ users: {$elemMatch: {$in: [user]}} });
		}
	});

	Meteor.publish("stream", function (streamId){
		if (streamId){
			return Streams.find({ streamId: streamId })
		}
	});

	Meteor.publish("user", function (userId){
		if (userId){
			console.log(userId);
			return Meteor.users.find({ _id: userId });
		}
	});
 	  
}