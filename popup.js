
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
        chrome.tabs.executeScript({file: "content.js"})
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


