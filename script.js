let cards = [];
let openedCards = [];
let player1Score = 0;
let player2Score = 0;
let turn = 1;
const score1Div = document.getElementById("score1");
const score2Div = document.getElementById("score2");
let timerID;
const startingGameForm = document.getElementById("myForm");

const onStartingGameFormSubmit = (event) => {
  event.preventDefault();
  const form = document.getElementById("myForm");
  const submittedNumber = parseInt(form.inputNumber.value);
  if (submittedNumber > 30) {
    alert("Input must be less than 30");
    return;
  }
  removeElementAndHisChildren(form);
  updateScores();

  const memoryCardsDiv = document.getElementById("memory-cards");

  for (let i = 0; i < submittedNumber; i++) {
    for (let j = 0; j < 2; j++) {
      let newCard = document.createElement("div");
      newCard.className = "image"+i;
      setImageToCardBack(newCard);
      cards.push(newCard);
    }
    cards = shuffleCards(cards);
    cards.forEach(element => {
      memoryCardsDiv.appendChild(element);
      element.addEventListener("click", flipCardLogic);
    });
  }

};

startingGameForm.addEventListener("submit", onStartingGameFormSubmit);

const setImageToCardBack = (newCard)=> {
  const cardBackUrl = "cards/card-back.png";
  newCard.style.backgroundImage = "url('" + cardBackUrl + "')";
}
 const flipCardLogic= (event)=> {
  const targetElement = event.target;
  const className = targetElement.classList;
  const cardFrontUrl = "cards/"+className+".jpg";
  let remainingTime = 30;
  targetElement.style.backgroundImage = "url('" + cardFrontUrl + "')";
  openedCards.push(targetElement);
  if(openedCards.length===1 || timerID === null){
    clearInterval(timerID);
    timerID = setInterval(function(){
      remainingTime--;
      if(remainingTime === 0){
        clearInterval(timerID);
        turn = turn === 1? 2 : 1;
        remainingTime=30;
        document.getElementById("turn").textContent = "Player "+turn+" turn";
        timerID = null;
      }
      document.getElementById("timer").textContent = "Remaining Time: " +remainingTime+" seconds";
    }, 1000);
  }
  if(openedCards.length === 2){
    if(openedCards[0].className === openedCards[1].className){
      if(turn === 1) player1Score++;
      else player2Score++;
      updateScores(); 
    }else{
      openedCards.forEach(card => {
        setTimeout(() => {
          setImageToCardBack(card);
        }, 1250);
      });
    }
    turn = turn === 1 ? 2 : 1;
    openedCards = [];
    checkGameEnd();
  }
  document.getElementById("turn").textContent = "player "+turn+" turn";
 }
const updateScores= ()=>{
  score1Div.textContent = "Player 1: "+player1Score + " points";
  score2Div.textContent = "Player 2: "+player2Score  + " points";
}
function removeElementAndHisChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element.remove();
}


const shuffleCards = (cards)=> {
  let currentIndex = cards.length;
  let temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
  return cards;
}
const checkGameEnd = ()=>{
  const totalPairs = cards.length / 2;
  if(player1Score + player2Score === totalPairs){
    let result;
    if (player1Score > player2Score) {
      result = "Player 1 wins!";
    } else if (player2Score > player1Score) {
      result = "Player 2 wins!";
    }else{
      result = "It's a tie!";
    }
    document.getElementById("result").textContent = result;
    clearInterval(timerID);
  }
}
 
