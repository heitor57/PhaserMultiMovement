
Client = {};
Client.socket = io.connect();
Client.askNewPlayer = function(){
	Client.socket.emit('newplayer');
};



Client.socket.on('newplayer',function(data){

	MainScene.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('allplayers',function(data){
	for(var i = 0; i < data.length; i++){
		MainScene.addNewPlayer(data[i].id,data[i].x,data[i].y);
	}
});


Client.socket.on('remove',function(id){
	MainScene.removePlayer(id);
});

Client.SendMove = function(direction){
	Client.socket.emit('move',direction);
};

Client.socket.on('move',function(data){
	MainScene.movePlayer(data.id,data.x,data.y);
});

Client.socket.on('localid',function(id){
	Local.id = id
	MainScene.cameras.main.startFollow(MainScene.playerMap[Local.id])
});



