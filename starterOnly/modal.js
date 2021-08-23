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
/////////////////////////////////////////////////////////////////////////////////

//Validation formulaire
// variables de validité des champs
 var firstNameValidity=false;
 var lastNameValidity=false;
 var emailValidity=false;
 var birthdateValidity=false;
 var quantityValidity=false;
 var locationValidity=false;
 var conditionsValidity= true;
 var nextEventsMailAgreementValidity= false;
 var globalValidity=false;
// FIN variables de validité des champs

//dates frontieres
//Naissance de la doyenne de l'humanité 2 janvier 1903 
var oldestDate=new Date(1903,00,02);
//Date actuelle
var today = new Date;



 //REGEXP
//regexp validation des caratères
var lettre = new RegExp('[a-zA-ZÀ-ÖØ-öø-ÿ -]', 'ig');

//regexp validation email
let emailRegExp = new RegExp('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$', 'g');

//regexp validation quantités de tournois (quantity)
var quantityRegExp = new RegExp('[0-9]', 'g');


//FONCTIONS DE VERIFICATION DES CHAMPS
//fonction de verification de la regexp LETTRE
function stringCheck (stringToCheck){
  if ((((stringToCheck.match(lettre))!==null)&&((stringToCheck.length)>2)&&(((stringToCheck.length) - (stringToCheck.match(lettre).length))==0)))
    {    
    return true}
    else 
    {return false}    
    
  }  

//fonction de verification de la regexp MAIL
  function mailCheck (mailToCheck){
    if ((mailToCheck.match(emailRegExp)!==null))
      {    
      return true}
      else 
      {return false}    
    }  

//fonction de verification de la regexp QUANTITY
function quantityCheck (quantityToCheck){
  if ((quantityToCheck.match(quantityRegExp)!==null) && (quantityToCheck.length<=2)  )
    {    
    return true}
    else 
    {return false}    
  }      

  ////fonction de verification des checkboxes LOCATION
  function checkCheckboxes() {
    locationValidity=true
     
      return locationValidity
  }

//ecoute du  prenom (first)
document
.getElementById("first")
.addEventListener("input", function(e){
   firstNameValidity = (stringCheck(this.value))


  return firstNameValidity  
});

//ecoute du  nom (last)
document
.getElementById("last")
.addEventListener("input", function(e){
  lastNameValidity = (stringCheck(this.value))
  return lastNameValidity 
});

//ecoute de l'email ("email")
document
.getElementById("email")
.addEventListener("input", function(e){
  emailValidity = (mailCheck(this.value))
  return emailValidity 
});


//ecoute de la date ("birthdate")
document
.getElementById("birthdate")
.addEventListener("input", function(e){
   let userBirthdate=(new Date(this.value))
   console.log ("userBirthdate "+userBirthdate)
  if ((userBirthdate<today)&&userBirthdate>oldestDate){
    birthdateValidity=true
  }
  else{
    birthdateValidity=false
  }
console.log("birthdateValidity   " +birthdateValidity)
return birthdateValidity;

});

//ecoute de la quantity ("quantity")
document
.getElementById("quantity")
.addEventListener("input", function(e){
  quantityValidity = (quantityCheck(this.value))
  return quantityValidity 
});


// //un bouton radio est selectionné (location)
// //ARRAY de toutes les LOCATIONS
var allLocationsArray = document.getElementsByName("location");

//Ecoute des 6 checkboxes et passage à true si une case est cochée
  allLocationsArray.forEach((elementOfArray) => {
  elementOfArray.addEventListener("input", function(e){ 
      checkCheckboxes() 
    });
  });
//conditions generales (obligatoire) et accord mail (facultatif)

//checkbox1
 document
 .getElementById("checkbox1")
 .addEventListener("input", function(e){
 if (this.checked){
   conditionsValidity=true
 }
  else{
    conditionsValidity=false
  }
  return conditionsValidity
})
 ;
 
//checkbox2
 document
 .getElementById("checkbox2")
 .addEventListener("input", function(e){
 if (this.checked){
    nextEventsMailAgreementValidity=true
 }
  else{
     nextEventsMailAgreementValidity=false
  }  
  return nextEventsMailAgreementValidity
})
 ;
//calcul de la validité globale:
//fonction pour disable le bouton si on lui passe false
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

//attraper n'importe quelle HTML "-validation"
function getValidation(string){
  return document.getElementById(string+"-validation")  
};

//creer array des validités obilgatoires
// function createArrayOfMandatoryValidities(){
//   let arrayOfMandatoryValidities=[
//     firstNameValidity,
//     lastNameValidity,
//     emailValidity,
//     birthdateValidity,
//     quantityValidity,
//     locationValidity,
//     conditionsValidity,  
//   ]
//   globalValidity = !arrayOfMandatoryValidities.some(x => x === false) 
//   return arrayOfMandatoryValidities;
//  };

class Field {
  constructor(title, validityValue, errorMessage) {
    this.title = title;
    this.validityValue = validityValue;
    this.errorMessage = errorMessage;
  }
}

function updateFields(){
 let fields = [
new Field ('firstName', firstNameValidity, "Veuillez entrer 2 caractères ou plus pour le champ du prénom."),
new Field ('lastName', lastNameValidity, "Veuillez entrer 2 caractères ou plus pour le champ du nom."),
new Field ('email', emailValidity, "Veuillez entrer une adresse email valide (format JJ/MM/AAAA)."),
new Field ('birthdate', birthdateValidity, "Veuillez entrer une date valide."),
new Field ('quantity', quantityValidity, "Veuillez entrer un nombre entre 0 et 99"),
new Field ('location', locationValidity, "Veuillez renseigner la ville qui vous intéresse"),
new Field ('conditions', conditionsValidity, "Vous devez vérifier que vous acceptez les termes et conditions."),
 ]
 
//gestion des messages 
for (let field of fields) {  
  if((field.validityValue)==false){
    globalValidity=false;
    (getValidation(field.title)).innerText=field.errorMessage;
    console.log("field  "+field.validityValue)
    }
  else{
    
    (getValidation(field.title)).innerText=""
  }
};
// console.log(fields);
return fields;
};

//ecouter le changement de global validity + modifier le bouton
 document
.getElementById("modalForm")
.addEventListener("input", function(e){
 // createArrayOfMandatoryValidities()
   updateFields()  
   disableSubmit(globalValidity) 
   return globalValidity; 
});


document
.getElementById("modalForm")
.addEventListener("submit", function(e){
  
  window.alert("Merci ! Votre réservation a été reçue.")

});


 



































  

  

  





















