var cards = [];
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
      newCard.classList.add("memory-card");
      
      var cardBackUrl = "cards/card-back.png";
      newCard.style.backgroundImage = "url('" + cardBackUrl + "')";
     // newCard.addEventListener("click", );
      
      cards.push(newCard);
      
      memoryCardsDiv.appendChild(newCard);
    }
  }
});

function removeAllElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element.remove();
}
