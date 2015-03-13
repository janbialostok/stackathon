Template.userAbout.helpers({
  	compareProfile: function(){
  		return this.uid === Meteor.userId();
  	}
});

Template.userAbout.events({
  	"click #aboutEdit": function(){
  		Meteor.call("toggleAbout", this._id);
  	},
  	"submit .userAboutForm": function (event){
  		event.preventDefault();
  		var params = {};
  		params.about = event.target.about.value;
  		params.work = event.target.work.value;
  		params.education = event.target.education.value;
  		params.lastModified = new Date();
  		params.aboutEditing = false;
  		Meteor.call("editAbout", params, this._id, this.uid)
  		return false;
  	}
 });