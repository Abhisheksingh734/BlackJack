const cards = ["2","3","4","5","6","7","8","9","10","King","Queen","Jack","Ace"]
const suits = ["Heart","Spade","Club","Diamond"]

let createDeck = (cards, suits) => {
  let deck = [];
  for(let i=0;i<cards.length;i++){
    for(let j=0; j<suits.length;j++){
        deck.push(
            {
                Cards: cards[i],
                Suits : suits[j]
            }
        )
    }
  }
  return deck;
};

let deck = createDeck(cards,suits);
console.log(deck);


//---- generate a drawCard() function  

const drawCards = (deck,n)=>{
    let cardsDrawn = [];
    for(let i =0; i<n;i++){
        cardsDrawn.push(deck[Math.floor(Math.random()*deck.length)])
    }
    return cardsDrawn;
}

let userCards = drawCards(deck,2);
let dealerCards = drawCards(deck,2);

console.log(userCards);
console.log(dealerCards);

//------------check the scores
















// const allPossibleCollections = [];

// console.log(myCards)
// for(let i =0; i<suits.length;i++){
//     for(let j =0; j<cards.length;j++){
//         allPossibleCollections.push([suits[i],myCards.get(cards[j])])
//     }
// }

// let userPoints = 0;
// let dealerPoints = 0;

// console.log(allPossibleCollections);

// const userInitCards = allPossibleCollections[Math.ceil(Math.random()*50)]
// const DealerInitCards = allPossibleCollections[Math.ceil(Math.random()*50)]

// console.log(userInitCards);
// userPoints += userInitCards[1];
// console.log("User points: "+userPoints);

// console.log(DealerInitCards);
// dealerPoints += DealerInitCards[1];
// console.log("Dealer points: "+dealerPoints);




// // const allPossibleCollections = new Map();





