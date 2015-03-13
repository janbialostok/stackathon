 Template.userInfo.helpers({
 	compareProfile: function(){
 		return this.uid === Meteor.userId();
 	}
 });

Template.userInfo.events({
  	"click #infoEdit": function(){
  		Meteor.call("toggleEdit", this._id);
  	},
  	"submit .userInfoForm": function (event){
  		event.preventDefault();
  		var params = {};
  		params.first = event.target.firstName.value;
  		params.last = event.target.lastName.value;
  		params.name = params.first + " " + params.last;
  		params.username = event.target.username.value;
  		params.email = event.target.email.value;
  		params.city = event.target.city.value;
  		params.lastModified = new Date();
  		params.infoEditing = false;
  		Meteor.call("editInfo", params, this._id, this.uid);
  		return false;
  	}
});