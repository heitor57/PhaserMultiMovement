var cursors
var Local = {}
Local.id = -1
var MainScene = new Phaser.Scene('MainScene');
MainScene.preload = function ()
{
	this.load.image('jungle.png', 'assets/tilemaps/jungle.png');
	this.load.tilemapTiledJSON('Jargal', 'assets/tilemaps/Jargal.json');
	this.load.image('FireBall', 'assets/imgs/fireball.png');

	/*
	var cursors = this.input.keyboard.createCursorKeys();

	var controlConfig = {
		camera: this.cameras.main,
		left: cursors.left,
		right: cursors.right,
		up: cursors.up,
		down: cursors.down,
		speed: 0.5
	};

	controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
	*/

};

MainScene.getCoordinates = function(layer,pointer){
	Client.sendClick(pointer.worldX,pointer.worldY);
};

MainScene.create= function ()
{
	this.playerMap = {}
	var map = this.make.tilemap({ key: 'Jargal' });
	var tiles = map.addTilesetImage('jungle','jungle.png');
	var layer = map.createStaticLayer(0, tiles, 0, 0);
	layer.inputEnabled = true;
	Client.askNewPlayer();
	cursors = this.input.keyboard.createCursorKeys();

};



MainScene.update = function (time,delta)
{
	if (cursors.left.isDown)
	{
		Client.SendMove("left")
	}
	else if (cursors.right.isDown)
	{
		Client.SendMove("right")
	}
	if (cursors.up.isDown)
	{
		Client.SendMove("up")
	}
	else if (cursors.down.isDown)
	{
		Client.SendMove("down")
	}
};

MainScene.removePlayer= function (id){
	this.playerMap[id].destroy();
	delete this.playerMap[id];
};
MainScene.addNewPlayer = function (id,x,y)
{
	this.playerMap[id] = this.physics.add.image(x,y,'FireBall');
};
MainScene.movePlayer = function(id,x,y){
	var player = MainScene.playerMap[id];

	var distance = Phaser.Math.Distance.Between(player.x,player.y,x,y);
	var duration = 10;
	var tween = MainScene.add.tween({
		targets: player,
		duration: duration,
		paused: true,
		x: x,
		y: y
	});
	tween.play()
};




var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	pixelArt: true,
	scene: MainScene,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	}
};



var game = new Phaser.Game(config);



