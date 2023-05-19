var cards = [];
var openedCards = [];
var score = 0;
var scoreDiv = document.getElementById("score");

document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  var form = document.getElementById("myForm");
  var submittedNumber = parseInt(form.inputNumber.value);
  
  if (submittedNumber > 30) {
    alert("Input must be less than 30");
    return;
  }
  
  removeAllElement(form);
  scoreDiv.textContent = "score: "+score;

  var memoryCardsDiv = document.getElementById("memory-cards");
  
  for (var i = 0; i < submittedNumber; i++) {
    for (var j = 0; j < 2; j++) {
      var newCard = document.createElement("div");
      newCard.id = "image"+i+""+j;
      newCard.className = "image"+i;  
      var cardBackUrl = "cards/card-back.png";
      newCard.style.backgroundImage = "url('" + cardBackUrl + "')";      
      cards.push(newCard);
      
    }
    cards = shuffleCards(cards);
    cards.forEach(element => {
      memoryCardsDiv.appendChild(element);
      element.addEventListener("click",turnCard);
    });
    

  }
});
function turnCard(event){
  var targetElement = event.target;
  var className = targetElement.classList;
  var id = targetElement.id;
  var cardFrontUrl = "cards/"+className+".jpg";
  targetElement.style.backgroundImage = "url('" + cardFrontUrl + "')"; 
  console.log(className);
  console.log(id);
}

function removeAllElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element.remove();
}
function shuffleCards(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

