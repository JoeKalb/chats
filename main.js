const TWITCH_USERS_URL = 'https://api.twitch.tv/kraken/users?login=<USERNAMES>'
const TWITCH_HEADERS = new Headers({
  'Accept': 'application/vnd.twitchtv.v5+json',
  'Client-ID': 'pzr3fq1hhuh0dy009wxe26ekr26g98'
});

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
  console.log(name)
  let response = await fetch(TWITCH_USERS_URL.replace('<USERNAMES>', name), {headers: TWITCH_HEADERS});
  let json = await response.json();
  console.log(json)
  return true;
}

function buildNewChat(name) {
  let streamerDiv = document.createElement("div");
  streamerDiv.className = "streamer";

  // header
  let streamerHeadingDiv = document.createElement("div");
  streamerHeadingDiv.className = "streamer-heading";
  let aTag = document.createElement("a")
  aTag.target = "_blank";
  aTag.href = "https://www.twitch.tv/" + name;
  aTag.innerHTML = name; // this will be display name later
  streamerHeadingDiv.appendChild(aTag);

  // chat
  let iframe = document.createElement("iframe");
  iframe.className = "chat-iframe";
  iframe.frameBorder = 0;
  iframe.scrolling = "no";
  iframe.src = "https://www.twitch.tv/embed/{name}/chat?darkpopout".replace("{name}", name);

  streamerDiv.appendChild(streamerHeadingDiv);
  streamerDiv.appendChild(iframe);

  return streamerDiv;
}

function renderChat(newChatDiv){
  let newChatsWidthpx = 20 * chatCount.getCount();

  let newStreamerWidth = 100 / chatCount.getCount(); 
  document.getElementById("chats").appendChild(newChatDiv);
  let allStreamers = document.getElementsByClassName("streamer")
  for(let i = 0; i < allStreamers.length; ++i){
    allStreamers[i].style.width = newStreamerWidth + "%";
  }
}