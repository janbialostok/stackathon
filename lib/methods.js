Meteor.methods({
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
		thisProfile[0].fRequests.push({ reqId: Meteor.userId(), reqUser: Meteor.user().username });
		UserProfiles.update(id, {$set: { fRequests: thisProfile[0].fRequests }});
	}
})