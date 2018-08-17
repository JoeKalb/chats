let chatCount = {
  "count":0,
  "getCount": function() {
    return this.count;
  },
  "increaseCount": function() {
    ++this.count;
  },
  "decreaseCount": function() {
    --this.count;
  }
}

function getStreamer(){
  let searchName = document.getElementById("searchName").value.trim();
  if(checkAccount(searchName)){
    chatCount.increaseCount();
    renderChat(buildNewChat(searchName));
  } else{
    console.log("something went wrong");
  }
}

async function checkAccount(name){
  //let response = await fetch("https://api.twitch.tv/helix/users?login=" + name);
  //let json = await response.json();
  //console.log(json);
  return true;
}

function buildNewChat(name) {
  let streamerDiv = document.createElement("div");
  streamerDiv.className = "streamer";

  // header
  let streamerHeadingDiv = document.createElement("div");
  streamerHeadingDiv.className = "streamer-heading";
  let aTag = document.createElement("a")
  aTag.target = "_blank"
  aTag.href = "https://www.twitch.tv/" + name;
  aTag.innerHTML = name; // this will be display name later
  streamerHeadingDiv.appendChild(aTag);

  // chat
  let iframe = document.createElement("iframe");
  iframe.className = "chat-iframe"
  iframe.frameBorder = 0;
  iframe.scrolling = "no"
  iframe.src = "http://www.twitch.tv/embed/{name}/chat?darkpopout".replace("{name}", name)

  streamerDiv.appendChild(streamerHeadingDiv);
  streamerDiv.appendChild(iframe)

  return streamerDiv;
}

async function renderChat(newChatDiv){
  let newChatsWidthpx = 20 * chatCount.getCount();

  let newStreamerWidth = 100 / chatCount.getCount(); 
  await document.getElementById("chats").appendChild(newChatDiv);
  let allStreamers = document.getElementsByClassName("streamer")
  for(div in allStreamers){
    allStreamers[div].style.width = newStreamerWidth + "%";
  }
}