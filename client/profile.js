Template.profile.helpers({
	compareProfile: function(){
		return this.uid !== Meteor.userId();
	},
	isFriend: function(){
    var friends = this.friends;
    if (friends.length) {
      var holder = [];
      friends.forEach(function (friend){
        if (friend == Meteor.user().username) holder.push(friend);
      });
      return holder.length;
    }
    else {
      return false;
    }
	}
});

Template.profile.events({
	"click #requestAdd": function(){
		Meteor.call("requestAdd", this._id);
	},
  "click #endFriend": function(){
    Meteor.call("endFriend", this, Meteor.user().username);
  }
});