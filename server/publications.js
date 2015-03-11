if (Meteor.isServer) {
  
	  Meteor.publish("profiles", function(user){
	  	if (!user) return UserProfiles.find({});
	  	else return UserProfiles.find({ username: user });
	  });
  
}