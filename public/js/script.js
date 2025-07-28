let addIngredientBtn = document.getElementById("addIngredientsBtn");
let ingredientList = document.querySelector(".ingredientList");
let ingredientDiv = document.querySelector(".ingredientDiv");

addIngredientBtn.addEventListener("click", () => {
    let newIngredient = ingredientDiv.cloneNode(true);
    let input = newIngredient.getElementsByTagName("input")[0];
    input.value = "";
    ingredientList.appendChild(newIngredient);
});


(function () {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()
