
function sendInvitesToContentScript(invitees) {
   chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
   var activeTab = tabs[0];
   chrome.tabs.sendMessage(activeTab.id, {"contacts": invitees}, function(response) {
      console.log('response', response);
    });
  });
}

$(document).ready(function() {
    var form = document.getElementById("emailForm");
    
    console.log("In popup.js");
  
    function toggleForm() {
        if (form.style.display == "block" ) {
           form.style.display="none";
        } else {
          form.style.display="block";
        }
    } 
    
    $( "#sendInvite" ).click(function() {
        var invitees = [];
        $('#contacts input[type="checkbox"]:checked').each(function() {
          invitees.push($(this).val());
        });
        chrome.tabs.executeScript({file: "content.js"})
        sendInvitesToContentScript(invitees); 
    });
    
    $( "#inviteByEmail" ).click(function(){
      toggleForm();
    });
    
    $( "#emailForm" ).submit(function( event ) {
      console.log("Submitting email form");
      var email = $('#email').val();
      console.log("clicked submit, email is:", email);
      var emailUrl = "mailto:" + email;
      chrome.tabs.update({
          url: emailUrl
      });
      event.preventDefault();
    });

});


