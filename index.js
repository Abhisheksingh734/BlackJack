document.addEventListener("DOMContentLoaded", () => {
  const playerTotal = document.querySelector("#playerTotal");
  const dealerTotal = document.querySelector("#dealerTotal");

  const cardsValues = {
    0: "A",
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: "K",
    11: "D",
    12: "J",
  };
  const cardKeys = Object.keys(cardsValues);

  const topSection = document.querySelector(".topSection");
  const botSection = document.querySelector(".botSection");

  const moreMoneyBtn = document.querySelector("#moreMoney");
  const moreMoneyBtn2 = document.querySelector("#moreMoney2");
  const playerMoney = document.querySelector("#playerMoney");

  const valueToPlay = document.querySelector("#valueToPlay");
  const playBtn = document.querySelector("#playBtn");

  const amountsMoney = document.querySelectorAll(".amounts button");

  const btnSpace = document.querySelector(".btnSpace");
  const continuePlay = document.querySelector("#continuePlaying");
  const stopPlay = document.querySelector("#stopPlaying");

  //AMOUNTS
  let moneyToAdd = 1;
  valueToPlay.innerHTML = `Value: ${moneyToAdd}₹`;

  amountsMoney.forEach((amount) => {
    amount.addEventListener("click", () => {
      moneyToAdd = parseInt(amount.dataset.value);
      if (moneyToAdd === 0o0000) {
        moneyToAdd = money;
        valueToPlay.innerHTML = `Value: ${money}₹`;
      } else {
        valueToPlay.innerHTML = `Value: ${moneyToAdd}₹`;
      }
    });
  });

  moreMoneyBtn2.addEventListener("click", () => {
    moneyToAdd += 1;
    valueToPlay.innerHTML = `Value: ${moneyToAdd}₹`;
  });

  //PLAY BTN
  playBtn.addEventListener("click", () => {
    if (moneyToAdd > money) {
      alert("No more money buddyyy");
      return;
    } else {
      money -= moneyToAdd;
      playerMoney.innerHTML = `Money: ${money}₹`;
    }
    playBtn.disabled = true;
    btnSpace.style.display = "flex";

    for (let i = 0; i <= 1; i++) {
      var newDiv2 = document.createElement("div");
      newDiv2.className = "playerHand";
      botSection.appendChild(newDiv2);
      newDiv2.innerHTML = randomCardValuePlayer();
      setTimeout(() => checkTotal(), 100);
    }
    for (let i = 0; i <= 0; i++) {
      var newDiv = document.createElement("div");
      newDiv.className = "dealerHand";
      topSection.appendChild(newDiv);
      newDiv.innerHTML = randomCardValueDealer();
      setTimeout(() => checkTotal(), 100);
    }
  });

  //CONTINUE PLAYING

  continuePlay.addEventListener("click", () => {
    for (let i = 0; i <= 0; i++) {
      var newDiv2 = document.createElement("div");
      newDiv2.className = "playerHand";
      botSection.appendChild(newDiv2);
      newDiv2.innerHTML = randomCardValuePlayer();
      if (totalplayer <= 21 && totalplayer !== 21) {
        if (hasA >= 1 && totalplayer > 21) {
          hasA -= 1;
          totalplayer -= 10;
        }
      }
      setTimeout(() => checkTotal(), 100);
    }
  });

  //PLAYER MONEY

  let money = 20;
  playerMoney.innerHTML = `Money: ${money}₹`;

  moreMoneyBtn.addEventListener("click", () => {
    money += 1;
    playerMoney.innerHTML = `Money: ${money}₹`;
  });

  stopPlay.addEventListener("click", () => {
    dealerTimeout = setTimeout(() => dealerGOO(), 500);
    continuePlay.disabled = true;
    stopPlay.disabled = true;
  });

  //CHECK TOTAL TO DEALER PLAY
  function checkTotal() {
    if (totalplayer > 21 || totalplayer === 21) {
      dealerTimeout = setTimeout(() => dealerGOO(), 500);
      continuePlay.disabled = true;
      stopPlay.disabled = true;
    }
  }

  function dealerGOO() {
    var newDiv = document.createElement("div");
    newDiv.className = "dealerHand";
    topSection.appendChild(newDiv);
    newDiv.innerHTML = randomCardValueDealer();

    if (totaldealer === 21) {
      clearTimeout(dealerTimeout);
      setTimeout(() => checkWin(), 1200);
    }

    if (totaldealer < 21) {
      if (hasA >= 1 && totaldealer > 21) {
        hasA -= 1;
        totaldealer -= 10;
      }

      // Clear the previous timeout
      clearTimeout(dealerTimeout);

      // Start a new timeout
      dealerTimeout = setTimeout(() => dealerGOO(), 1000);
    } else {
      setTimeout(() => checkWin(), 1200);
    }

    if (totaldealer >= 16 && totaldealer <= 21 && totaldealer > totalplayer) {
      // Stop the recursion when the condition is met
      clearTimeout(dealerTimeout);
      setTimeout(() => checkWin(), 1200);
    }
  }

  // Declare dealerTimeout variable outside the function
  let dealerTimeout;

  //VERIFY WINNER

  function checkWin() {
    if (totalplayer > 21) {
      alert("YOU LOSE");
      playerMoney.innerHTML = `Money: ${money}₹`;
      resetGame();
      return;
    } else if (
      (totaldealer > 21 && totalplayer <= 21) ||
      (totalplayer <= 21 && totalplayer > totaldealer)
    ) {
      alert("YOU WON");
      money += moneyToAdd * 2;
      playerMoney.innerHTML = `Money: ${money}₹`;
      resetGame();
      return;
    } else if (totalplayer === 21 && totaldealer === 21) {
      alert("DRAW");
      money += moneyToAdd;
      playerMoney.innerHTML = `Money: ${money}₹`;
      resetGame();
      return;
    } else if (
      totaldealer >= 16 &&
      totaldealer <= 21 &&
      totaldealer > totalplayer
    ) {
      alert("YOU LOSE");
      playerMoney.innerHTML = `Money: ${money}₹`;
      resetGame();
      return;
    }
  }

  //RESET GAME
  function resetGame() {
    const botChildren = Array.from(botSection.children);
    const topChildren = Array.from(topSection.children);

    botChildren.forEach((child) => {
      botSection.removeChild(child);
    });

    topChildren.forEach((child) => {
      topSection.removeChild(child);
    });

    playBtn.disabled = false;
    btnSpace.style.display = "none";
    continuePlay.disabled = false;
    stopPlay.disabled = false;

    totalplayer = 0;
    totaldealer = 0;
    hasA = 0;

    playerTotal.innerHTML = `Total: ${totaldealer}`;
    dealerTotal.innerHTML = `Total: ${totaldealer}`;
  }

  //SET VALUES AND SET TEXT CARD
  let totalplayer = 0;
  let totaldealer = 0;

  function randomCardValuePlayer() {
    let randomIndex = Math.floor(Math.random() * cardKeys.length);
    let randomKey = randomIndex;
    let randomCardText = cardsValues[randomKey];

    switch (randomKey) {
      case 0:
        let aux = totalplayer + 11;
        if (aux > 21) {
          hasA += 1;
          totalplayer += 1;
          break;
        } else {
          hasA += 1;
          totalplayer += 11;
          break;
        }
      case 1:
        totalplayer += 1;
        break;
      case 2:
        totalplayer += 2;
        break;
      case 3:
        totalplayer += 3;
        break;
      case 4:
        totalplayer += 4;
        break;
      case 5:
        totalplayer += 5;
        break;
      case 6:
        totalplayer += 6;
        break;
      case 7:
        totalplayer += 7;
        break;
      case 8:
        totalplayer += 8;
        break;
      case 9:
        totalplayer += 9;
        break;
      case 10:
        totalplayer += 10;
        break;
      case 11:
        totalplayer += 10;
        break;
      case 12:
        totalplayer += 10;
        break;
    }

    playerTotal.innerHTML = `Total: ${totalplayer}`;
    return randomCardText;
  }

  let hasA = 0;

  function randomCardValueDealer() {
    let randomIndex = Math.floor(Math.random() * cardKeys.length);
    let randomKey = randomIndex;
    let randomCardText = cardsValues[randomKey];
    switch (randomKey) {
      case 0:
        let aux = totaldealer + 11;
        if (aux > 21) {
          totaldealer += 1;
          break;
        } else {
          hasA += 1;
          totaldealer += 11;
          break;
        }
      case 1:
        totaldealer += 1;
        break;
      case 2:
        totaldealer += 2;
        break;
      case 3:
        totaldealer += 3;
        break;
      case 4:
        totaldealer += 4;
        break;
      case 5:
        totaldealer += 5;
        break;
      case 6:
        totaldealer += 6;
        break;
      case 7:
        totaldealer += 7;
        break;
      case 8:
        totaldealer += 8;
        break;
      case 9:
        totaldealer += 9;
        break;
      case 10:
        totaldealer += 10;
        break;
      case 11:
        totaldealer += 10;
        break;
      case 12:
        totaldealer += 10;
        break;
    }

    dealerTotal.innerHTML = `Total: ${totaldealer}`;
    return randomCardText;
  }
  //end
});
