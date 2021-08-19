function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
//DOM const btn close
const btnClose = document.getElementById("btnClose");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal
//close modal form
function closeModal(){
  modalbg.style.display = "none";
}
//close modal event
btnClose.addEventListener("click", closeModal);
//FIN close modal




//liste des elements du formulaire:
let fields = ["firstName", 'lastName', 'email', 'quantity', 'location', 'conditions', 'nextEventsMailAgreement'];


// variables de validité des champs

 var firstNameValidity=false;
 var lastNameValidity=false;
 var emailValidity=false;
 var quantityValidity=false;
 var locationValidity=false;
 var conditionsValidity= true;
 var nextEventsMailAgreementValidity= false;
 var globalValidity=false;

 
 


 




//definition fonction "plus de deux caractères, lettres seulement" pour prénom (first) et nom (last)

//regexp validation 2 caratères
var lettre = new RegExp('[a-z]', 'ig');

//fonction de verification de la regexp
function stringCheck (stringToCheck){
  if ((((stringToCheck.match(lettre))!==null)&&((stringToCheck.length)>2)&&(((stringToCheck.length) - (stringToCheck.match(lettre).length))==0)))
    {    
    return true}
    else 
    {return false}    
  }  

//application au prenom (first)

document
.getElementById("first")
.addEventListener("input", function(e){
   firstNameValidity = (stringCheck(this.value))
  console.log("first " + stringCheck(this.value))
  return firstNameValidity  
});

//application au nom (last)
document
.getElementById("last")
.addEventListener("input", function(e){
  lastNameValidity = (stringCheck(this.value))
  console.log("last  " + stringCheck(this.value)) 
  return lastNameValidity 
});


//regexp validation email
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

//application au champ email
document
.getElementById("email")
.addEventListener("input", function(e){
  if (  (this.value.match(emailRegExp)!==null)) {
    emailValidity=true
  } 
  else{
    emailValidity=false
  }
    console.log ("emailValidity   " + emailValidity)
    return emailValidity
  }  
);

//regexp validation quantités de tournois (quantity)
var quantityRegExp = new RegExp('[0-9]', 'g');
//application au champ quantity
document
.getElementById("quantity")
.addEventListener("input", function(e){
  if (  (this.value.match(quantityRegExp)!==null) && (this.value.length<=2)      ) {
    quantityValidity=true
  } 
  else{
    quantityValidity=false
  }
    console.log ("quantityValidity   " + quantityValidity)
  }  
);



//un bouton radio est selectionné (location)
var allLocationsArray = document.getElementsByName("location");

function checkCheckboxes() {
  Array.from(allLocationsArray).some((checkbox) => checkbox.checked)
  locationValidity=true
  console.log("locationValidity  "+ locationValidity)
  return locationValidity
  ;
}
  allLocationsArray.forEach((checkbox) => {
    checkbox.addEventListener("input", checkCheckboxes);
  });

  //conditions generales


 document
 .getElementById("checkbox1")
 .addEventListener("input", function(e){
 if (this.checked){
   conditionsValidity=true
 }
  else{
    conditionsValidity=false
  }
  console.log("conditions accepted (mandatory) "  + conditionsValidity)
  return conditionsValidity
})
 ;
 

 document
 .getElementById("checkbox2")
 .addEventListener("input", function(e){
 if (this.checked){
    nextEventsMailAgreementValidity=true
 }
  else{
     nextEventsMailAgreementValidity=false
  }
  
  console.log("emails accepted (not mandatory)  " + nextEventsMailAgreementValidity)
  return nextEventsMailAgreementValidity
})
 ;


//calcul de la validité globale:

//fonction pour disable le bouton si on passe false
function disableSubmit(disabled) {
  if (disabled) {
    document
    .getElementById("submit")
      .removeAttribute("disabled");      
  } else {
    document
    .getElementById("submit")
      .setAttribute("disabled", true);
  }
};

//ecouter le changement de global validity + modifier le bouton
 document
.getElementById("modalForm")
.addEventListener("input", function(e){
  let arrayOfImportantValidities=[
    firstNameValidity,
    lastNameValidity,
    emailValidity,
    quantityValidity,
    locationValidity,
    conditionsValidity,  
  ]
  globalValidity = !arrayOfImportantValidities.some(x => x === false) 
  console.log("globalValidity  " +globalValidity)
  console.log(arrayOfImportantValidities)  
  
  console.log("results  " + disableSubmit(globalValidity.value))
  disableSubmit(globalValidity)
  return globalValidity;
  
});

function getValidation(string){
  return document.getElementById(string+"-validation")  
};

console.log(getValidation("location"));






















  

  

  























