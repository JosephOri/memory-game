var cards = [];
var openedCards = [];
var player1Score = 0;
var player2Score = 0;
var turn = 1;
var score1Div = document.getElementById("score1");
var score2Div = document.getElementById("score2");

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  var form = document.getElementById("myForm");
  var submittedNumber = parseInt(form.inputNumber.value);
  if (submittedNumber > 30) {
    alert("Input must be less than 30");
    return;
  }
  removeElementAndHisChildren(form);
  updateScores();

  let memoryCardsDiv = document.getElementById("memory-cards");
  for (let i = 0; i < submittedNumber; i++) {
    for (let j = 0; j < 2; j++) {
      //making 2 cards of each image
      let newCard = document.createElement("div");
      newCard.className = "image" + i;
      setImageToCardBack(newCard);
      cards.push(newCard);
    }
    cards = shuffleCards(cards);
    cards.forEach((element) => {
      memoryCardsDiv.appendChild(element);
      element.addEventListener("click", flipCardLogic);
    });
  }
});

function setImageToCardBack(newCard) {
  var cardBackUrl = "cards/card-back.png";
  newCard.style.backgroundImage = "url('" + cardBackUrl + "')";
}

function flipCardLogic(event) {
  var targetElement = event.target;
  var className = targetElement.classList;
  var id = targetElement.id;
  var cardFrontUrl = "cards/" + className + ".jpg";

  targetElement.style.backgroundImage = "url('" + cardFrontUrl + "')";
  openedCards.push(targetElement);
  if (openedCards.length == 2) {
    if (openedCards[0].className == openedCards[1].className) {
      if (turn == 1) player1Score++;
      else player2Score++;
    } else {
      openedCards.forEach((card) => {
        setTimeout(() => {
          setImageToCardBack(card);
        }, 1250);
      });
      if (turn == 1) turn = 2;
      else turn = 1;
    }
    openedCards = [];
    updateScores();
  }
  document.getElementById("turn").textContent = "player " + turn + " turn";
}

function updateScores() {
  score1Div.textContent = "player1: " + player1Score;
  score2Div.textContent = "player2: " + player2Score;
}

function removeElementAndHisChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element.remove();
}
function shuffleCards(cards) {
  var currentIndex = cards.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }

  return cards;
}
