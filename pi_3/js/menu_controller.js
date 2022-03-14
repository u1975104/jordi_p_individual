function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	//sessionStorage.setItem("num_cards", document.getElementById('labelnumber').value);
	
	loadpage("./html/game.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
}

function options(){
	loadpage("./html/options.html");
}


