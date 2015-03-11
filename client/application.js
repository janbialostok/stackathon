Template.body.helpers({
    userProfile: function() {
    	var viewing = Session.get("viewing");
    	if (viewing){
			  Meteor.subscribe("profiles", viewing);
    		return UserProfiles.find({});
    	}
    	else{
	    	Meteor.subscribe("profiles", Meteor.user().username);
	    	return UserProfiles.find({});
    	}
    },
    emptyViewHelper: function(){
    	if (Session.get("viewing")) return true;
    	else return false;
    },
    isUser: function(){
      return UserProfiles.find({}).fetch()[0].uid === Meteor.userId();
    }
});