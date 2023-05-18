var cards = [];
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    var form = document.getElementById("myForm");
    let submittedNumber = parseInt(form.inputNumber.value);
    removeAllElement(form);
    document.appendChild
  });
  

function removeAllElement(form) {
    while (form.firstChild) {
        form.removeChild(form.firstChild);
    }
    form.remove();
}

