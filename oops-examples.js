/*
Copyright (c) 2013 Greg McLeod  (Email: cleod9{at}gmail.com)

The below program demonstrates basic use of OOPS.js. The theme is musical instruments.

Notes:
-We will have two types of performers, Players and Experts.
-The Expert Players will take a bow after performing, the normal Player will not.
-The example will demonstrate the use of constructors, inheritance, method overrides, and statics

*/


//Super basic print function purely for testing purpose
function print(str) {
	document.getElementById('output').innerHTML += str.replace('\n', '<br />') + "<br />";
}

/**** Define some simple classes for our program ****/

var Instrument = OOPS.extend({
	name: "Instrument",
	play: function() {
		print("The sound of the Instrument is heard!");
	}
});
//Declare Woodwind and Percussion as children of Instrument
var Woodwind = Instrument.extend({ name: "Woodwind" });
var Percussion = Instrument.extend({ name: "Percussion"  });

//Declare Flute as a child of the Woodwind group
var Flute = Woodwind.extend({
	name: "Flute",
	material: null,
	_constructor_: function(material) {
		this.material = material; //Remember to always use "this" in order to get the correct scope
	},
	play: function() {
		print("The sound of the " + this.material + " Flute is heard!");
	}
});

//Declare Marimba as a child of the Percussion group
var Marimba = Percussion.extend({
	name: "Marimba",
	malletType: null,
	_constructor_: function(malletType) {
		this.malletType = malletType;
	},
	play: function() {
		print("The sound of the " + this.malletType + " mallets hitting the Marimba is heard!");
	}
});

//Declare Player, who may possess an Instrument
var Player = OOPS.extend({
	_statics_: { playerCount: 0 }, //Will track the amount of players created so far
	name: null,
	instrument: null,
	_constructor_: function(name, instrument) {
		Player.playerCount++; //Increment the counter
		this.name = name;
		this.instrument = instrument;
	},
	perform: function() {
		print(this.name + " begins to play the " + this.instrument.name);
		this.instrument.play();
		print(this.name + " stops playing the " + this.instrument.name);
	}
});
//Declare Expert, who extends Player
var Expert = Player.extend({
	yearsExperience: null,
	_constructor_: function(name, instrument, yearsExperience) {
		//Emulate "super()" by running "call()" on the Player's _super_ property
		this._super_.call(this, name, instrument);
		this.yearsExperience = yearsExperience;
	},
	perform: function() {
		//Emulate "super.MethodName()" by digging into the prototype of _super_
		this._super_.prototype.perform.call(this);
		print("The expert " + this.instrument.name + " player, " + this.name + ", takes a bow.");
	}
});

//Now that we have our structures, let's take it for a spin
function main()
{
	var flutePlayer = new Player("George", new Flute("wooden"));
	var marimbaPlayer = new Expert("Alex", new Marimba("yarn"), 20);

	print("The amout of players that has been created is " + Player.playerCount + "\n\n");
	
	print("Performing some type checks...\n");
	
	//You will see below that you can compare types between both Class definitions and instances themselves
	print("typeMatch(Flute, Percussion) = " + OOPS.typeMatch(Flute, Percussion));
	print("typeMatch(flutePlayer, marimbaPlayer) = " + OOPS.typeMatch(flutePlayer, marimbaPlayer));
	print("typeMatch(Marimba, Marimba) = " + OOPS.typeMatch(Marimba, Marimba));
	print("typeMatch(marimbaPlayer.instrument, marimbaPlayer.instrument) = " + OOPS.typeMatch(marimbaPlayer.instrument, marimbaPlayer.instrument));
	print("descendantOf(Instrument, Flute) = " + OOPS.descendantOf(Instrument, Flute));
	print("descendantOf(Flute, Instrument) = " + OOPS.descendantOf(Flute, Instrument));
	print("descendantOf(Flute, Woodwind) = " + OOPS.descendantOf(Flute, Woodwind));
	print("descendantOf(flutePlayer.instrument, marimbaPlayer.instrument) = " + OOPS.descendantOf(flutePlayer.instrument,  marimbaPlayer.instrument));
	print("descendantOf(marimbaPlayer.instrument, Percussion) = " + OOPS.descendantOf(marimbaPlayer.instrument, Percussion));
	
	print("\n");
	
	print("Testing flutePlayer....\n\n");
	flutePlayer.perform();
	
	print("\n");
	
	print("Testing marimbaPlayer....\n\n");
	marimbaPlayer.perform();
	
	print("\n");
	
	print("Done!");
}