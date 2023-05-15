const generateDeck=()=>{

    const cards = ["2","3","4","5","6","7","8","9","10","King","Queen","Jack","Ace"]
    const suits = ["Heart","Spade","Club","Diamond"]
    
    let deck = [];
    
    for(let card of cards){
        for(let suit of suits){
            deck.push({Card:card,Suit:suit})
        }
    }
    return deck;
};
const deck = generateDeck();


const drawCard = (deck)=>{

    let randomInd = Math.floor(Math.random() * deck.length)

    let cards = deck[randomInd];

    deck.splice(randomInd, 1);

    //start deleting from randomInd and deletes 1 item
    return cards;

}

// const myCards = drawCard(deck);


const playerHand = [];
const dealerHand = [];

playerHand.push(drawCard(deck));
playerHand.push(drawCard(deck));
dealerHand.push(drawCard(deck));
dealerHand.push(drawCard(deck));

const checkScore=(hand)=>{
    let total = 0;
    for(const cardObj of hand){
        if(cardObj.Card === "King"){
            total += 10;
        }
        else if(cardObj.Card === "Queen"){
            total += 10;
        }
        else if(cardObj.Card === "Jack"){
            total += 10;
        }
        else if(cardObj.Card === "Ace"){
            total += 1;
        }
        else{
            total += Number(cardObj.Card);
        }
    }
    return total;

}

console.log("Starting Player Hand: ",playerHand);
console.log("Starting Player Score: ",checkScore(playerHand));
console.log("Starting dealer Hand: ",dealerHand);
console.log("Starting dealer Score: ",checkScore(dealerHand));
while (true){
	playerHand.push(drawCard(deck));
	//deal player card
	const playerScore = checkScore(playerHand);
	let dealerScore = checkScore(dealerHand);

	if(playerScore>21){
		console.log(`You lose! Your final score was ${playerScore} while dealer had ${dealerScore}`);
		break;
	}

	if(playerScore === 21){
		console.log(`You Win! Your final score was ${playerScore} while dealer had ${dealerScore}`);
		break;
	}

	dealerHand.push(drawCard(deck));

	dealerScore = checkScore(dealerHand);

	if(dealerScore>21){
		console.log(`You Win! Your final score was ${playerScore} while dealer had ${dealerScore}`);
		break;
	}
	if(dealerScore === 21){
		console.log(`You lose! Your final score was ${playerScore} while dealer had ${dealerScore}`);
		break;
	}
	
}

console.log("Ending Player Hand: ",playerHand);
console.log("Ending Player Score: ",checkScore(playerHand));
console.log("Ending dealer Hand: ",dealerHand);
console.log("Ending dealer Score: ",checkScore(dealerHand));