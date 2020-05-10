var cardsSet = new Array("p1.png", "p2.png", "p3.png", "p4.png", "p5.png", "p6.png",
 "p7.png", "p8.png", "p9.png");
var cards = new Array();


function randomCards(){
	let fields  = cardsSet.length * 2;
	while (fields > 0) {
		console.log("round: " +  fields);
		let random = Math.floor(cardsSet.length * Math.random());
		let card = cardsSet[random];
		let idx = cards.indexOf(card);
		console.log(idx);
		if(idx >= 0) {
			let id = cardsSet.indexOf(card);
			cardsSet.splice(id, 1);
		}
		cards.push(card);
		fields--;
	}
	console.log(cards.toString());
}

