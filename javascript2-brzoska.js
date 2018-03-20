function init() {  // This is the function that initializes what the user starts with and where in the game they start.
	playerItems = [];  // They start with no objects in their inventory.
	currentRoom = 0;
	// This is an array that describes what rooms they have access to depending on what room they are in.
	roomAccess = [[1,-1,-1,-1,-1],[4,3,0,2],[-1,1,-1,-1],[-1,-1,-1,1],[5,-1,1,-1],[-1,7,4,6],[-1,5,-1,-1],[-1,-1,-1,5]];
	// This is an array that describes what objects are in which room.
	roomItems = [[],[],["TV"],["Watch"],[],[],["Stereo"],["Painting"]];
	roomDescriptions = ["You are outside of your getaway van.  It's a dark night and you are in front of the target house.",
	"You are in the entrance hallway.  Nothing too special here, just a large entry way.", 
	"You are in the Kitchen.  You can still smell what they ate for dinner.  They only recently left.", 
	"You are in the bedroom.  It is a very wealthy family and you figure they must have some valuables in here.", 
	"You are in the hallway.  You can see more hallway both behind and ahead of you.", 
	"You are at the end of the hallway.  The carpet smells freshly cleaned.", 
	"You are in the game room.  You always heard loud music from this room when staking the house out.", 
	"You are in the living room.  You did your research and know this family has a large art collection."]; 
	//This is the description for each room.
	imageArray = ["images/van.jpg", "images/hallway1.jpeg", "images/kitchen.jpg", "images/bedroom.jpeg", "images/hallway2.jpg", "images/hallway3.jpg",
	"images/gameroom.jpg", "images/livingroom.jpg"]; // This array describes which image appears depending on which room the user is in.
	refreshRoom();
	
}

function refreshRoom() {  //This is a function that updates the room and info and items within the room.
	var theImage = document.getElementById("theImage");
	theImage.src = imageArray[currentRoom];
	var desc = document.getElementById("description");
	desc.innerHTML = roomDescriptions[currentRoom];
	var itemArray = roomItems[currentRoom];
	var itemString = "";
	for (var i = 0; i < itemArray.length; i++) {
		itemString += itemArray[i] + " ";
	}
	var roomContainer = document.getElementById("roomItems");
	roomContainer.innerHTML = itemString;
	var invString = "";
	for (var i = 0; i < playerItems.length; i++) {
		invString += playerItems[i] + " ";
	}
	var invContainer = document.getElementById("playerItems");
	invContainer.innerHTML = invString;
}

function parseCommand() {  // This is a function that reads what the user inputs as a command.
	var raw = document.getElementById("prompt");
	var parts = raw.value.split(" ");
	var keyword = parts[0];
	var item = parts[1];
	switch(keyword) {
		case "go": // Handles the case if the first word typed in the prompt is "go"
			var dir = ["north","east","south","west"];
			var dirI = dir.indexOf(item);
			if(dirI >=0) {
				dirA = roomAccess[currentRoom];
				if (dirA[dirI] > -1) { //Access is only allowed if it is greater than -1
					currentRoom = dirA[dirI];
					refreshRoom(); //Access allows refreshRoom function to be called
				}else{
					alert("Access Denied");
				}
			}
			break;
		case "take": // Handles the case if the first word typed in the prompt is "take"
			var items = roomItems[currentRoom];
			var itemI = items.indexOf(item);
			if (itemI > -1){ //Access is only allowed if it is greater than -1
				playerItems.push(items[itemI]);
				roomItems[currentRoom].splice(itemI,1);
				refreshRoom(); //Access allows refreshRoom function to be called
			}
			break;
		case "drop": // Handles the case if the first word typed in the prompt is "drop"
			var itemI = playerItems.indexOf(item);
			if (itemI > -1){ //Access is only allowed if it is greater than -1
				roomItems[currentRoom].push(playerItems[itemI]);
				playerItems.splice(itemI,1);
				refreshRoom(); //Access allows refreshRoom function to be called
			}
			if (roomItems[0].length == 4) { // This is what happens if the user wins the game.
				var theImage = document.getElementById("theImage");
				theImage.src = "images/winner.jpg"; // Image when game is completed.
				alert("You Won! Game Over."); // Alerts you that you have won the game.
			}
			if (roomItems[0].length == 1) {
				document.getElementById("score").innerHTML = roomItems[0].length;
			}
			if (roomItems[0].length == 2) {
				document.getElementById("score").innerHTML = roomItems[0].length;
			}
			if (roomItems[0].length == 3) {
				document.getElementById("score").innerHTML = roomItems[0].length;
			}
			if (roomItems[0].length == 4) {
				document.getElementById("score").innerHTML = roomItems[0].length;
			}
			break;
	}
}

function newCommand() {
	var x;
	if(window.event)
	{
		x=event.keyCode;
	}
	else if(event.which)
	{
		x=event.which;
	}
	if (x==13) {
		if(!e) var e = window.event;
		e.cancelBubble = true;
		e.returnValue = false;
		if (e.stopPropagation) {
			e.stopPropagation();
			e.preventDefault();
		}
		parseCommand();
		document.getElementById("prompt").value="";
	}
}