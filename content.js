console.log("Executing content.js script");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("request received in content.js", request, sender);
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    
    var event = getFacebookEvent();
    event['invitees'] = request.contacts;
    chrome.runtime.sendMessage(event); 
    
    if (request.contacts){
      console.log("Inviting request.contacts", request.contacts);
      sendResponse({confirmation: "invited"});
    }
});


function getFacebookEvent(){
    var event = {};
    if (document.getElementById("event_header")){
      // event['header'] = document.getElementById("event_header");
      event['event_name'] = document.querySelector("[data-testid='event-permalink-event-name']").innerText;
      event['date'] = document.querySelector("#title_subtitle span").getAttribute("aria-label");
      event['event_privacy'] = document.querySelector("[data-testid='event_permalink_privacy']").innerHTML;
      event['hosted_by'] = document.querySelector("[data-testid='event_permalink_feature_line'] a").innerHTML;
      // var time_info = document.getElementById('event_time_info').querySelector("[content]").getAttribute("content");
      // var time_info = document.querySelector("#event_time_info [content]").getAttribute("content");
      // var location = document.querySelector("#event_summary").getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerText;
      // var location = document.querySelector("#event_summary li:nth-child(2) div tr td:nth-child(2)").innerText;
      // var location = document.querySelector("#event_summary");
      
      if(document.getElementById("event_description")){
        event['description'] = document.getElementById("event_description").innerText;
        console.log("Event description:", event['description']);
      }
      
      console.log("BRIDGE: Found facebook event name:", event);
      // console.log("Event date:", date);
      // console.log("Event privacy:", event_privacy);
      // console.log("Event hosted_by:", hosted_by);
      // console.log("Event time_info:", time_info);
      // console.log("Event location:", location);
    }
    return event
}  
