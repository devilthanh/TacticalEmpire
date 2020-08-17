

class Server {
    
}

class Client {

    ip = "";
    port = "";
    name = "Player";
    id = 0;
    gold = 0;
    wood = 0;
    food = 0;
    stone = 0;
    health = 0;
    army = [];

    constructor(){

    }

    connect(ip, port){
        console.log('connect: ' + ip + ':' + port);
    }
}