Template.createProfile.events({
  	"submit form": function (event){
  		event.preventDefault();
      var params = {};
      params.city = "";
  		params.first = event.target.firstName.value;
  		params.last = event.target.lastName.value;
  		params.name = params.first + " " + params.last;
  		params.email = event.target.email.value;
  		params.username = Meteor.user().username;
  		params.about = "Bacon ipsum dolor amet short loin filet mignon ham bacon fatback. Sirloin strip steak shankle cupim ground round sausage meatball pig kevin porchetta andouille boudin spare ribs salami filet mignon. Pig ribeye pork, tail cupim pork belly meatloaf porchetta filet mignon beef spare ribs ham hock. Picanha flank tail, landjaeger filet mignon spare ribs pig venison meatloaf pork chop porchetta bresaola capicola chuck.";
  		params.education = "Bacon ipsum dolor amet short loin filet mignon ham bacon fatback. Sirloin strip steak shankle cupim ground round sausage meatball pig kevin porchetta andouille boudin spare ribs salami filet mignon. Pig ribeye pork, tail cupim pork belly meatloaf porchetta filet mignon beef spare ribs ham hock. Picanha flank tail, landjaeger filet mignon spare ribs pig venison meatloaf pork chop porchetta bresaola capicola chuck.";
  		params.work = "Bacon ipsum dolor amet short loin filet mignon ham bacon fatback. Sirloin strip steak shankle cupim ground round sausage meatball pig kevin porchetta andouille boudin spare ribs salami filet mignon. Pig ribeye pork, tail cupim pork belly meatloaf porchetta filet mignon beef spare ribs ham hock. Picanha flank tail, landjaeger filet mignon spare ribs pig venison meatloaf pork chop porchetta bresaola capicola chuck.";
  		params.infoEditing = false;
  		params.aboutEditing = false;
      params.status = "offline";
  		params.requests = [];
  		params.denied = [];
      params.friends = [];
      if (Session.get("user").services.twitter) params.image = Session.get("user").services.twitter["profile_image_url"];
      else if (Session.get("user").services.google) {
        params.image = Session.get("user").services.google.picture;
      }
      else params.image = "http://previews.123rf.com/images/kritchanut/kritchanut1401/kritchanut140100054/25251050-Businessman-avatar-profile-picture-Stock-Vector-icon.jpg";
      params.connected = undefined;
      params.completedRequests = [];
  		params.lastModified = new Date();
  		params.uid = Meteor.userId();
  		Meteor.call("newProfile", params);
  		event.target.firstName.value = "";
  		event.target.lastName.value = "";
  		event.target.email.value = "";
  		return false;
  	}
});