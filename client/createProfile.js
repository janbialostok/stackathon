Template.createProfile.events({
  	"submit form": function (event){
  		event.preventDefault();
  		var params = {};
  		params.first = event.target.firstName.value;
  		params.last = event.target.lastName.value;
  		params.name = params.first + " " + params.last;
  		params.email = event.target.email.value;
  		params.username = Meteor.user().username;
  		params.city = "";
  		params.about = "Bacon ipsum dolor amet short loin filet mignon ham bacon fatback. Sirloin strip steak shankle cupim ground round sausage meatball pig kevin porchetta andouille boudin spare ribs salami filet mignon. Pig ribeye pork, tail cupim pork belly meatloaf porchetta filet mignon beef spare ribs ham hock. Picanha flank tail, landjaeger filet mignon spare ribs pig venison meatloaf pork chop porchetta bresaola capicola chuck.";
  		params.education = "Bacon ipsum dolor amet short loin filet mignon ham bacon fatback. Sirloin strip steak shankle cupim ground round sausage meatball pig kevin porchetta andouille boudin spare ribs salami filet mignon. Pig ribeye pork, tail cupim pork belly meatloaf porchetta filet mignon beef spare ribs ham hock. Picanha flank tail, landjaeger filet mignon spare ribs pig venison meatloaf pork chop porchetta bresaola capicola chuck.";
  		params.work = "Bacon ipsum dolor amet short loin filet mignon ham bacon fatback. Sirloin strip steak shankle cupim ground round sausage meatball pig kevin porchetta andouille boudin spare ribs salami filet mignon. Pig ribeye pork, tail cupim pork belly meatloaf porchetta filet mignon beef spare ribs ham hock. Picanha flank tail, landjaeger filet mignon spare ribs pig venison meatloaf pork chop porchetta bresaola capicola chuck.";
  		params.infoEditing = false;
  		params.aboutEditing = false;
      params.status = "offline";
  		params.requests = [];
  		params.denied = [];
      params.friends = [];
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