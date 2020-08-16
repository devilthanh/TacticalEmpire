
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

var myPlayer = new Player();
var backStack = [];

onLoad = function(){

    var name = null;
    do{
        name = prompt("Please enter your name", "Harry Potter");
    }while (name == null);

    myPlayer.name = name;

}

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

hostButton = function(){
    changeScreen('hostScreen');
}

joinButton = function(){
    changeScreen('browseScreen');
}

backButton = function(){
    if(backStack.length > 0){
        backStack.pop();
        changeScreen(backStack.pop());
    }
}

onLoad();
changeScreen('mainScreen');