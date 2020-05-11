var cardsSet = new Array("p1.png", "p2.png", "p3.png", "p4.png", "p5.png", "p6.png",
 "p7.png", "p8.png", "p9.png");
var cards = new Array();


function randomCards(){
	let fields  = cardsSet.length * 2;
	while (fields > 0) {
		let random = Math.floor(cardsSet.length * Math.random());
		let card = cardsSet[random];
		let idx = cards.indexOf(card);
		if(idx >= 0) {
			let id = cardsSet.indexOf(card);
			cardsSet.splice(id, 1);
		}
		cards.push(card);
		fields--;
	}
}

function showCards(){
	var photoDivs = "";
	for (it = 0; it < cards.length; it++){
		let photo = "<img class=\"photo\" id=\"img" + it + "\" src=\"img/cardBack.png\" >"; //
		let photoDiv = "<div class=\"photoDivSecret\" id=\"photoDivId" + it + "\" >" + photo +"</div>";
		photoDivs += photoDiv;
		if ((it + 1) %6 === 0 ) photoDivs += "<div style=\"clear: both;\"></div>";
	}

	// document.getElementById("photoContainerId").innerHTML = ;
	$("#photoContainerId").html(photoDivs);
}

function setClickEvents(){
	for (let it = 0; it < cards.length; it++){
		let id = "#photoDivId" + it;
		console.log("test setClickEvents id: " + id);
		console.log("test setClickEvents it: " + it);
		$(id).on("click", function (event) {
			showUpCard(id, it);
		});
	}
}

function showUpCard(id, number) {
	var img = "img/" + cards[number];
	$(id).addClass("photoDivKnown");
	$(id).removeClass("photoDivSecret");
	$(id + " img").attr("src", img);
}

function startGame(){
	randomCards();
	showCards();
	setClickEvents();
}