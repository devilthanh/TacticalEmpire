
class Player {

    name = "Player";
    id = 0;
    gold = 0;
    wood = 0;
    food = 0;
    stone = 0;
    health = 0;
    army = [];

    constructor() {
   
    }
}

var myClient = new Client();
var myServer = null;
var backStack = [];

changeScreen = function(screen){
    var list = document.getElementsByClassName('screen');
    for(var i=0; i < list.length; i++){
        if(list[i].id == screen){
            backStack.push(screen)
            list[i].style.display = 'block';
        }else{
            list[i].style.display = 'none';
        }
    }

}

loginButton = function(){
    if(document.getElementById('input_name').value.length > 0){
        myClient.name = document.getElementById('input_name').value;
        changeScreen('mainScreen');
    }
}

hostButton = function(){
    changeScreen('hostScreen');
}

joinButton = function(){
    changeScreen('browseScreen');
}

connectButton = function(){
    myClient.connect(document.getElementById('input_ip').value, document.getElementById('input_port').value)
}

backButton = function(){
    if(backStack.length > 0){
        backStack.pop();
        changeScreen(backStack.pop());
    }
}

addLobby = function(info){
    var lobby = document.createElement('div');
    var serverName = document.createElement('div');
    var serverPlayers = document.createElement('div');
    lobby.classList.add('lobby')
    serverName.style.textAlign = 'left';
    serverName.innerHTML = info.servername;
    serverPlayers.style.textAlign = 'right';
    serverPlayers.innerHTML = info.currentplayers + '/' + info.maxplayers;

    lobby.appendChild(serverName);
    lobby.appendChild(serverPlayers);
    document.getElementById('lobbies').appendChild(lobby);
}

refreshButton = function(){
    document.getElementById('lobbies').innerHTML = '';
}

changeScreen('loginScreen');