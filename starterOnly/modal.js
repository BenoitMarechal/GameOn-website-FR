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
console.log(modalBtn);
console.log(formData);

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
//END of close modal




/////////////////////////////////////////////////////////////////////////////////

//Form validation
// Declaration and initialisation of validity variables
 let firstValidity=false;
 let lastValidity=false;
 let emailValidity=false;
 let birthdateValidity=false;
 let quantityValidity=false;
 let locationValidity=false;
 let conditionsValidity= true;
 let nextEventsMailAgreementValidity= false;
 let globalValidity=false;
// END of declaration and initialisation of validity variables



//list of focus Variables
let firstFocus=false;
let lastFocus=false;
let emailFocus=false;
let birthdateFocus=false;
let quantityFocus=false;
let locationFocus=false;
let conditionsFocus= false;


let focusArray=[
  firstFocus,
  lastFocus,
  emailFocus,
  birthdateFocus,
  quantityFocus,
  locationFocus,
  conditionsFocus
  ];




//Creation of Field Class
class Field {
  constructor(title, validityValue, errorMessage, focusState) {
    this.title = title;
    this.validityValue = validityValue;
    this.errorMessage = errorMessage;
    this.focusState=focusState;
  }
}

//Creation of fields object:
let fields = [
  new Field ('first', firstValidity, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", firstFocus),
  new Field ('last', lastValidity, "Veuillez entrer 2 caractères ou plus pour le champ du nom.", lastFocus),
  new Field ('email', emailValidity, "Veuillez entrer une adresse email valide (format JJ/MM/AAAA).", emailFocus),
  new Field ('birthdate', birthdateValidity, "Veuillez entrer une date valide.", birthdateFocus),
  new Field ('quantity', quantityValidity, "Veuillez entrer un nombre entre 0 et 99", quantityFocus),
  new Field ('location', locationValidity, "Veuillez renseigner la ville qui vous intéresse", locationFocus),
  new Field ('conditions', conditionsValidity, "Vous devez vérifier que vous acceptez les termes et conditions.", conditionsFocus),
   ];

   function resetFocusStates(){
    for (let line of fields){
  line.focusState=false;
    }
  
  };
  resetFocusStates();

//UPDATE VALIDITY
function updateFieldsValidity(){
let arrayOfImportantValidities=[
  firstValidity,
  lastValidity,
  emailValidity,
  birthdateValidity,
  quantityValidity,
  locationValidity,
  conditionsValidity,  
];
  for (let i=0; i<fields.length;i++) { 
    fields[i].validityValue=arrayOfImportantValidities[i];   
  
  };    

  console.log(fields);
  return fields;  };




// Function for error Messages (called on both focus/click and input)
function errorMessage()
{
  for (let field of fields)   
    {  
      // console.log((document.getElementById(field.title)));
      if(((field.validityValue)==false)&&(field.focusState==true))
        {
        (getValidation(field.title)).innerText=field.errorMessage;
          if((document.getElementById(field.title))) //this condition takes away the case of checkboxes, as these fields don't need a red border
          {
          document.getElementById(field.title).style.border = "2px solid red"
          };  
        
        // if((document.getElementById(field.title).classList.contains("text-control"))){;
        // document.getElementById(field.title).style.border = "2px solid red"}      
        }
      else{  
        (getValidation(field.title)).innerText="";
        if(
          (document.getElementById(field.title))           
        ){;
      document.getElementById(field.title).style.border = "none"}         
      }
    }
  };




//function for detecting focus (and click in the case of checkboxes)
  function focusByName(string){
    //get all Elements (by name, because of checkboxes like location1 to location6)
    //All elements are stored in array "ResultArray"
    let resultArray = document.getElementsByName(string);
    //listenning for focus 
    resultArray.forEach((elementOfArray) => {
      elementOfArray.addEventListener("focus", function(e){
        //All previous focuses are reset
        resetFocusStates();
        //identifying the field with focus
        console.log("focus by name  "+ string)       
        console.log("name  "+ elementOfArray.name)
        //looking for names from "resultArray" that match titles in the "fields" array.
        for (let field of fields){
          if((field.title)==elementOfArray.name){
            console.log("found "+ elementOfArray.name)
            //when the correct line is found, the focusState value is modified
            field.focusState=true;
            //function errorMessage is called after focusState is set to true
            errorMessage();
            console.log(fields)           
                 
          }
        }        
      }        
        );
        //listenning for click (for the case of checkboxes)
        elementOfArray.addEventListener("click", function(e){ 
          resetFocusStates();
          console.log("focus by name  "+ string)       
        console.log("name  "+ elementOfArray.name)
        for (let field of fields){
          if((field.title)==elementOfArray.name){
            console.log("found "+ elementOfArray.name)
            field.focusState=true;
            errorMessage();
            console.log(fields)   
          }
        } 

          });



      });
        
    }  

  //launching detection  
   for (let field of fields) {
    focusByName(field.title);
   }

//limit dates
//World's oldest personn birthdate: 1903, Jan 2nd; 
let oldestDate=new Date(1903,00,02);
//Current date:
let today = new Date;
//END of limit dates


 //REGEXP
//Regexp for letter validation (first and last names)
let letter = new RegExp('[a-zA-ZÀ-ÖØ-öø-ÿ -]', 'ig');

//regexp for email validation
let emailRegExp = new RegExp('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$', 'g');

//regexp for quantity validation (quantity)
let quantityRegExp = new RegExp('[0-9]', 'g');
//END OF REGEXP

//VERIFICATION FUNCTIONS
//Function that runs the letter Regexp:
function stringCheck (stringToCheck){
  if ((((stringToCheck.match(letter))!==null)&&((stringToCheck.length)>2)&&(((stringToCheck.length) - (stringToCheck.match(letter).length))==0)))
    {    
    return true}
    else 
    {return false}    
    
  }  

////Function that runs the email Regexp:
  function mailCheck (mailToCheck){
    if ((mailToCheck.match(emailRegExp)!==null))
      {    
      return true}
      else 
      {return false}    
    }  

////Function that runs the quantity Regexp:
function quantityCheck (quantityToCheck){
  if ((quantityToCheck.match(quantityRegExp)!==null) && (quantityToCheck.length<=2)  )
    {    
    return true}
    else 
    {return false}    
  }      

  //////Function that runs the location checkboxes validation:
  function checkCheckboxes() {
    locationValidity=true     
      
  }

function calculateGlobalValidity(){
  globalValidity=true;
for (let field of fields){
  if ((field.validityValue==false)){
    globalValidity=false;    
    console.log("globalValidity  "+globalValidity);
    return globalValidity;
  }
  else{
    if ((field.validityValue) && (globalValidity)){
      globalValidity=true;
    }
    else{
      globalValidity=false;
      console.log("globalValidity  "+globalValidity);
      return globalValidity;
    }
  }
 
  console.log(field.title+"  "+field.validityValue)
  console.log("globalValidity  "+globalValidity);
  
}
return globalValidity;
};

//listenning for input in the firstname box
document
.getElementById("first")
.addEventListener("input", function(e){
  //Running validation function
   firstValidity = (stringCheck(this.value))   
  return firstValidity ;
});



//listenning for input in the lastname box
document
.getElementById("last")
.addEventListener("input", function(e){
  //Running validation function
  lastValidity = (stringCheck(this.value))
  return lastValidity 
});

//listenning for input in the firstname box
document
.getElementById("email")
.addEventListener("input", function(e){
  //Running validation function
  emailValidity = (mailCheck(this.value))
  return emailValidity 
});


//listenning for input in the birthdate box
document
.getElementById("birthdate")
.addEventListener("input", function(e){
  //declare input as a "let" variable
   let userBirthdate=(new Date(this.value))

   console.log ("userBirthdate "+userBirthdate)
  //condition: input ois between oldestDate and today:
  if ((userBirthdate<today)&&userBirthdate>oldestDate){
    birthdateValidity=true
  }
  else{
    birthdateValidity=false
  }
console.log("birthdateValidity   " +birthdateValidity)
return birthdateValidity;

});

//listenning for input in the quantity box
document
.getElementById("quantity")
.addEventListener("input", function(e){
  //running the validation function
  quantityValidity = (quantityCheck(this.value))
  return quantityValidity 
});


//location checkboxes
// //ARRAY for all location checkboxes

let allLocationsArray = document.getElementsByName("location");

//listenning for input in any location checkbox 
  allLocationsArray.forEach((elementOfArray) => {
  elementOfArray.addEventListener("input", function(e){ 
    //running the validation function (simply turns locationValidity to true if one is ticked)
      checkCheckboxes() 
      return locationValidity
    });
  });
//conditions generales (obligatoire) et accord mail (facultatif)

//checkbox1 (condition agreement)
 document
 .getElementById("checkbox1")
 //listenning for input in checkbox1
 .addEventListener("input", function(e){
   //turn validity to true when checked
 if (this.checked){
   conditionsValidity=true
 }
  else{
    conditionsValidity=false
  }
  return conditionsValidity
})
 ;
 
//checkbox2 (agreement to be contacted by email)
 document
 .getElementById("checkbox2")
 //listenning for input in checkbox2
 .addEventListener("input", function(e){
   //turn validity to true when checked
 if (this.checked){
    nextEventsMailAgreementValidity=true
 }
  else{
     nextEventsMailAgreementValidity=false
  }  
  return nextEventsMailAgreementValidity
})
 ;
//calculating global Validity:

//function that disables the submit button when given false;
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

// //function that returns div with matching ID:
// function getId(string){
//   return document.getElementById(string)  
// };

//function that returns "-validation" div of any field:
function getValidation(string){
  return document.getElementById(string+"-validation")  
};


//updateFields();

//ecouter le changement de global validity + modifier le bouton
 document
.getElementById("modalForm")
.addEventListener("input", function(e){
updateFieldsValidity();
errorMessage()
calculateGlobalValidity();
disableSubmit(globalValidity) ;
   return globalValidity; 
});

//----------------CONFIRMATION MODAL------------------------------


// get both CLOSE buttons
const ConfirmationModalBtns = document.querySelectorAll(".closeConfirmationModal");
console.log(ConfirmationModalBtns);

//close modal event
ConfirmationModalBtns.forEach((btn) => btn.addEventListener("click", hideConfirmationModal));

// //function for closing confirmation modal
function hideConfirmationModal(){
  document.querySelector(".confirm").style.display="none"; 
  // window.alert("Merci ! Votre réservation a été reçue.") 
}

const confirmationModalBody= document.getElementById("confirm-div")
console.log(confirmationModalBody)


//function for opening confirmation modal (OK but won't run)
function displayConfirmationModal(){
  confirmationModalBody.style.display="flex";  
}




//option2: on submit of the whole form
document
.getElementById("modalForm")
.addEventListener("submit", function(e){
  e.preventDefault()
  closeModal();
  displayConfirmationModal();
  // 
});

function validate(){
   
  console.log("validate");
  // preventDefault();
  window.alert("Merci ! Votre réservation a été reçue.")  
}



 



































  

  

  




















 
