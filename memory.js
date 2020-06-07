var cardsSet = new Array("p1.png", "p2.png", "p3.png", "p4.png", "p5.png", "p6.png",
 "p7.png", "p8.png", "p9.png");
var cards = new Array();
var firstCard = "";
var secondCard = "";
var clickCounter = 0;
var score = 0;

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
	console.log(cards)
}

function setCardsSize(){
	let screenHeight =  window.screen.availHeight;
	let screenWidth =  window.screen.availWidth;
	var _height = screenHeight * 0.15;
	var _width = screenWidth * 0.06;
	for (it = 0; it < cards.length; it++){
		$("#img" + it).css({height: _height});
		$("#img" + it).css({width: _width});
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
	$("#photoContainerId").html(photoDivs);
	setCardsSize();
}

function setClickEvents(){
	for (let it = 0; it < cards.length; it++){
		let id = "#photoDivId" + it;
		$(id).on("click", function (event) {
			checkAndCompareCards(id, it);
		});
	}
}

function checkAndCompareCards(id, number){
	if (firstCard != "" && secondCard != "") return;
	if ($(id + " img").attr("src") === "img/cardBack.png"){
		clickCounter++;
		console.log('CLICK: ' + clickCounter);
	}
	if (clickCounter === 1){
		showUpCard(id, number);
		firstCard = id;
	}
	else if (clickCounter === 2) {
		clickCounter = 0;
		showUpCard(id, number);
		secondCard = id;
		compareCardsAndMakeAction();
	} 
}

function showUpCard(id, number) {
	var img = "img/" + cards[number];
	$(id).addClass("photoDivKnown");
	$(id).removeClass("photoDivSecret");
	$(id + " img").attr("src", img);
}

function compareCardsAndMakeAction(){
	console.log(firstCard);
	console.log(secondCard);
	let first_img = $(firstCard + " img").attr("src");
	let second_img = $(secondCard + " img").attr("src");
	if (first_img === second_img){
		score++;
		$(scoreLabel).text("Total score: " + score);
		hiddenAfterTimeout(firstCard, secondCard);
		setTimeout("clearGlobals()", 1500);
		if (score * 2 === cards.length) finish();
	} else {
		var first = firstCard;
		var second = secondCard;
		setTimeout(showUpBackCard.bind(null, first, second), 2000);
		setTimeout("clearGlobals()", 2200);
	}
}

function finish(){
	$('#photoContainerId').css('display', 'none');
	$('#finishPop').css('display', 'block');
}

function hiddenAfterTimeout(first_id, second_id){
	$(first_id).fadeTo(1200, 0);
	$(second_id).fadeTo(1200, 0);
}

function showUpBackCard(first_id, second_id) {
	setBack(first_id);
	setBack(second_id);
}

function clearGlobals(){
	firstCard = "";
	secondCard = "";
}

function setBack(_id){
	var _img = "img/cardBack.png";
	$(_id).addClass("photoDivSecret");
	$(_id).removeClass("photoDivKnown");
	$(_id + " img").attr("src", _img);
}

function startGame(){
	randomCards();
	showCards();
	setClickEvents();
}