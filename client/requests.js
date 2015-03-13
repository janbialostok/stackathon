Template.requests.helpers({
	request_items: function(){
		return Session.get("fRequestObjs");
	},
	completed_items: function(){
		return Session.get("completedRequests");
	}
});

Template.requests.events({
	"click #pending_requests button": function (event){
		var params = {
			username: event.target.value.split(" ")[0],
			action: event.target.value.split(" ")[1]
		};
		console.log(Session.get("userProfileId"));
		Meteor.call("requestAction", params, Session.get("userProfileId"));
	}
});