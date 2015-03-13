Meteor.methods({
	openChat: function (user, status){
		if(!user) throw new Meteor.Error("not-authorized");
		UserProfiles.update({ username: user }, {$set: { status: status }});
	},
	connect: function (connected, user){
		if(!user) throw new Meteor.Error("not-authorized");
		Messages.insert({ users: [connected, user], messages: [] });
	},
	disconnect: function (connected, user, streamId){
		if(!user) throw new Meteor.Error("not-authorized");
		Messages.remove({ users: {$elemMatch: {$in: [user] }} }, function(){
			Streams.remove({ streamId: streamId });
		});
	},
	addToChat: function (text, user){
		var message = Messages.find({ users: {$elemMatch: {$in: [user]}} }).fetch();
		Messages.update(message[0]._id, {$push: {messages: user + ": " + text}});
	},
	newProfile: function (params){
		if (!Meteor.userId()) throw new Meteor.Error("not-authorized");
		UserProfiles.insert(params);
	},
	editInfo: function (params, id, uid){
		if (Meteor.userId() != uid) throw new Meteor.Error("not-authorized");
		UserProfiles.update(id, {$set: params});
	},
	editAbout: function (params, id, uid){
		if (Meteor.userId() != uid) throw new Meteor.Error("not-authorized");
		UserProfiles.update(id, {$set: params});
	},
	toggleEdit: function(id){
		UserProfiles.update(id, {$set: { infoEditing: true }});
	},
	toggleAbout: function(id){
		UserProfiles.update(id, {$set: { aboutEditing: true }});
	},
	requestAdd: function(id){
		if (!Meteor.userId()) throw new Meteor.Error("not-authorized");
		var thisProfile = UserProfiles.find({ _id: id }).fetch();
		thisProfile[0].requests.push({ reqId: Meteor.userId(), reqUser: Meteor.user().username, type: "Friend Request" });
		UserProfiles.update(id, {$set: { requests: thisProfile[0].requests }});
	},
	requestAction: function(params, id){
		var thisProfile = UserProfiles.find({ _id: id }).fetch();
		var spliceIndex;
		thisProfile[0].requests.forEach(function (request, index){
			if (request.reqUser == params.username) spliceIndex = index;
		});
		thisProfile[0].requests.splice(spliceIndex, 1);
		if (params.action == "Accept") {
			thisProfile[0].friends.push(params.username);
			thisProfile[0].completedRequests.push({ username: params.username, status: "Accepted" });
			UserProfiles.update({ _id: id }, {$set: { requests: thisProfile[0].requests, friends: thisProfile[0].friends, completedRequests: thisProfile[0].completedRequests }}, function (err, user){
				UserProfiles.update({ username: params.username }, {$push: { friends: thisProfile[0].username }});
			});
		}
		else {
			thisProfile[0].denied.push(params.username);
			thisProfile[0].completedRequests.push({ username: params.username, status: "Denied" });
			UserProfiles.update(id, {$set: { requests: thisProfile[0].requests, denied: thisProfile[0].friends, completedRequests: thisProfile[0].completedRequests }});
		}
	},
	endFriend: function(profile, username){
		var thisProfile = UserProfiles.find({ _id: profile._id }).fetch();
		var spliceIndex;
		thisProfile[0].friends.forEach(function (friend, index){
			if (friend == username) spliceIndex = index;
		});
		thisProfile[0].friends.splice(spliceIndex, 1);
		UserProfiles.update(profile._id, {$set: { friends: thisProfile[0].friends }}, function (){
			var user = UserProfiles.find({ username: username }).fetch();
			var spliceIndex = undefined;
			user[0].friends.forEach(function (friend, index){
				if (friend == profile.username) spliceIndex = index;	
			});
			user[0].friends.splice(spliceIndex, 1);
			UserProfiles.update({username: username}, {$set: { friends: user[0].friends }});
		});
	},
	openStream: function (streamId, first, second){
		console.log("Open Stream", streamId)
		Streams.insert({ streamId: streamId, users: [first, second] });
	},
	closeStream: function (streamId){
		Streams.remove({ streamId: streamId });
	}
})