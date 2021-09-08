/** @format */

function editNav() {
	var x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = 'block';
}

//------------------close modal--------------------------------
const btnClose = document.getElementById('btnClose'); //gets the "close" button

//function that closes the modal form
function closeModal() {
	modalbg.style.display = 'none'; //hides the modal
}
//close modal event
btnClose.addEventListener('click', closeModal); //runs the closing function when button is clcked
//------------------END of close modal---------------------------------

//-----------------------INDIVIDUAL FIELDS VALIDATION-----------------------------------------------------------------------------------

//---------limit dates
//World's oldest personn birthdate: 1903, Jan 2nd;
let oldestDate = new Date(1903, 00, 02);
//Current date:
let today = new Date();
//---------END of limit dates

//--------REGEXP
//Regexp for letter validation (first and last names)
//originale '[a-zA-ZÀ-ÖØ-öø-ÿ -]', 'ig'

//[a-zA-ZÀ-ÖØ-öø-ÿ]

//let letter = new RegExp('(?<! )[a-zA-ZÀ-ÖØ-öø-ÿ -]', 'ig')
let letter = new RegExp(
	/^[A-ZÀ-ÖØ]+(([',. -][a-zA-ZÀ-ÖØ-öø-ÿ])?[a-zA-ZÀ-ÖØ-öø-ÿ]*)*$/
);

//`^[^\s]+[A-Z]{1}+[a-zA-ZÀ-ÖØ-öø-ÿ -]*$`ig
//^[A-ZÀ-Ö]{1}+[a-zA-ZÀ-ÖØ-öø-ÿ -]+(\s+[a-zA-ZÀ-ÖØ-öø-ÿ -]+)*$

//regexp for email validation
let emailRegExp = new RegExp(
	'^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$',
	'ig'
);

//regexp for quantity validation (quantity)
let quantityRegExp = new RegExp('[0-9]', 'g');
//-----------END OF REGEXP

//------------Declaration and initialisation of validity variables

let firstValidity = false;
let lastValidity = false;
let emailValidity = false;
let birthdateValidity = false;
let quantityValidity = false;
let locationValidity = false;
let conditionsValidity = true; //"conditions" checkbox is on by default
let nextEventsMailAgreementValidity = false;

let globalValidity = false; //defines the validity of the whole form

//-------------END of declaration and initialisation of validity variables

//-------------focus Variables
//will be used to determine wether the fields are focused on or not
let firstFocus = false;
let lastFocus = false;
let emailFocus = false;
let birthdateFocus = false;
let quantityFocus = false;
let locationFocus = false;
let conditionsFocus = false;
//-------------END focus Variables

//Creation of "Field" Class
class Field {
	constructor(title, validityValue, errorMessage, focusState) {
		this.title = title;
		this.validityValue = validityValue;
		this.errorMessage = errorMessage;
		this.focusState = focusState;
	}
}

//-------------VERIFICATION FUNCTIONS
//Function that runs the letter Regexp:
function stringCheck(stringToCheck) {
	if (
		stringToCheck.match(letter) !== null && //checks if the amount of characters matching the regexp is not null //AND
		stringToCheck.length > 1
	) {
		//input has at list three characters,

		return true;
	} else {
		return false;
	}
}

////Function that runs the email Regexp:
function mailCheck(mailToCheck) {
	if (mailToCheck.match(emailRegExp) !== null) {
		//if input matches the regexp
		return true;
	} else {
		return false;
	}
}

////Function that runs the quantity Regexp:
function quantityCheck(quantityToCheck) {
	if (
		quantityToCheck.match(quantityRegExp) !== null &&
		quantityToCheck.length <= 2
	) {
		//character is a number an is lesser than 100
		return true;
	} else {
		return false;
	}
}

//listenning for input in the firstname box
document.getElementById('first') //gets element
	.addEventListener('input', function (e) {
		//listens for input
		firstValidity = stringCheck(this.value); //Running validation function
		return firstValidity;
	});

//listenning for input in the lastname box
document.getElementById('last') //gets element
	.addEventListener('input', function (e) {
		//listens for input
		lastValidity = stringCheck(this.value); //Running validation function
		return lastValidity;
	});

//listenning for input in the email box
document.getElementById('email') //gets element
	.addEventListener('input', function (e) {
		//listens for input
		emailValidity = mailCheck(this.value); //Running validation function
		return emailValidity;
	});

//listenning for input in the birthdate box
document.getElementById('birthdate') //gets element
	.addEventListener('input', function (e) {
		//listens for input
		let userBirthdate = new Date(this.value); //declare input as a variable
		//condition: input is between oldestDate and today:
		if (
			//IF
			userBirthdate < today && //Input is not in the future //AND
			userBirthdate > oldestDate //Is after the birth of the oldest human
		) {
			birthdateValidity = true;
		} else {
			birthdateValidity = false;
		}
		return birthdateValidity;
	});

//listenning for input in the quantity box
document.getElementById('quantity') //gets element
	.addEventListener('input', function (e) {
		quantityValidity = quantityCheck(this.value); //running the validation function
		return quantityValidity;
	});

//location checkboxes
let allLocationsArray = document.getElementsByName('location'); // Create an array for all location checkboxes
allLocationsArray.forEach((elementOfArray) => {
	//For each location checkbox
	elementOfArray.addEventListener('input', function (e) {
		//listen for input
		locationValidity = true; //turns locationValidity to true if one is ticked)
		return locationValidity;
	});
});

//checkbox1 (condition agreement)
document.getElementById('checkbox1') //gets checkbox 1
	.addEventListener('input', function (e) {
		//listens for input in checkbox1
		if (this.checked) {
			conditionsValidity = true; //turn validity to true when checked
		} else {
			conditionsValidity = false; //turn validity to false when not checked
		}
		return conditionsValidity;
	});

//checkbox2 (agreement to be contacted by email, not mandatory)
document.getElementById('checkbox2') //gets checkbox 2

	.addEventListener('input', function (e) {
		//listenning for input in checkbox2
		//turn validity to true when checked
		if (this.checked) {
			nextEventsMailAgreementValidity = true;
		} else {
			nextEventsMailAgreementValidity = false;
		}
		return nextEventsMailAgreementValidity;
	});

//----------------------- END OF INDIVIDUAL FIELDS VALIDATION-----------------------------------------------------------------------------------

//Creation of fields object (contains all necessary informations for each field of the form):
let fields = [
	new Field(
		'first',
		firstValidity,
		'Veuillez entrer 2 caractères ou plus pour le champ du prénom (Première lettre en MAJUSCULE).',
		firstFocus
	),
	new Field(
		'last',
		lastValidity,
		'Veuillez entrer 2 caractères ou plus pour le champ du nom (Première lettre en MAJUSCULE).',
		lastFocus
	),
	new Field(
		'email',
		emailValidity,
		'Veuillez entrer une adresse email valide (format JJ/MM/AAAA).',
		emailFocus
	),
	new Field(
		'birthdate',
		birthdateValidity,
		'Veuillez entrer une date valide.',
		birthdateFocus
	),
	new Field(
		'quantity',
		quantityValidity,
		'Veuillez entrer un nombre entre 0 et 99',
		quantityFocus
	),
	new Field(
		'location',
		locationValidity,
		'Veuillez renseigner la ville qui vous intéresse',
		locationFocus
	),
	new Field(
		'conditions',
		conditionsValidity,
		'Vous devez vérifier que vous acceptez les termes et conditions.',
		conditionsFocus
	),
];

//-------------------------MANAGING FOCUS DETECTION ----------------------------------------------
//-------Reset focus----------------
function resetFocusStates() {
	//will be used to reset all focus states in the fields object
	for (let line of fields) {
		//loops through every line of fileds
		line.focusState = false; //sets focusState to false
	}
}

//-------END Reset focus----------------

//---------------------Managing Error messages------------------------

//function that returns "-validation" div of any field:
function getValidation(string) {
	return document.getElementById(string + '-validation');
}

function hideAllMessages() {
	for (let field of fields) {
		{
			getValidation(field.title).innerText = ''; //reaches the validation div with getValidation function //Displays empty message
			if (document.getElementById(field.title)) {
				//take away checkboxes (see above)
				document.getElementById(
					field.title
				).style.border = 'none'; //get the field itself //No border
			}
		}
	}
}

function errorMessageOnSubmit() {
	for (let field of fields) {
		//loops through every line of "fields" object
		if (field.validityValue == false) {
			//If field has focus AND is not valid
			getValidation(field.title).innerText =
				field.errorMessage; //reaches the validation div with getValidation function //Displays message stored in fields object
			if (document.getElementById(field.title))
				//this condition takes away the case of checkboxes.
				document.getElementById(
					field.title
				).style.border = '2px solid red'; //get the field itslef //makes the border red
		} //any other case (checkboxes)
		else {
			getValidation(field.title).innerText = ''; //reaches the validation div with getValidation function //Displays empty message
			if (document.getElementById(field.title)) {
				//take away checkboxes (see above)
				document.getElementById(
					field.title
				).style.border = 'none'; //get the field itself //No border
			}
		}
	}
}

function removeValidMessages() {
	//on input
	for (let field of fields) {
		//loops through every line of "fields" object
		if (field.validityValue == true) {
			//If field is valid
			getValidation(field.title).innerText = ''; //reaches the validation div with getValidation function //Displays empty message
			if (document.getElementById(field.title)) {
				//take away checkboxes (see above)
				document.getElementById(
					field.title
				).style.border = 'none'; //get the field itself //No border
			}
		}
	}
}

//-------------------------END Managing Error messages--------------------------------------------

//---------UPDATE FIELDS VALIDITY------------------
function updateFieldsValidity() {
	//will be used to refresh validities in the fields object, after form input
	let arrayOfImportantValidities =
		//packs all necessary validity values in an array, with their current states
		[
			firstValidity,
			lastValidity,
			emailValidity,
			birthdateValidity,
			quantityValidity,
			locationValidity,
			conditionsValidity,
		];
	for (let i = 0; i < fields.length; i++) {
		//loops through every line of "fields" object
		fields[i].validityValue = arrayOfImportantValidities[i]; //appplies corresponding current Validity value read in the array
	}
	console.log('update');
	console.log('calcul' + globalValidity);
	console.log(fields);

	return fields;
}

function resetValidities() {
	firstValidity = false;
	lastValidity = false;
	emailValidity = false;
	birthdateValidity = false;
	quantityValidity = false;
	locationValidity = false;
	conditionsValidity = true;
}
//---------END UPDATE VALIDITY------------------

//---------------------Managing global Validity------------------------
function calculateGlobalValidity() {
	//calculates globalValidity, will be called after fields object is updated
	globalValidity = true; //globalValidity is first set to true
	for (let field of fields) {
		//looping through every item of the fields object
		if (field.validityValue == false) {
			//if a "false" validity value is encountered,
			globalValidity = false; // globalValidity is set to false
			return globalValidity; //function stops
		} //otherwise
		else {
			globalValidity = true; // globalValidity remains true and the loop moves on to the next field
		}
	}
	return globalValidity;
}

//---------------------END Managing global Validity------------------------

//------------------------------------Input on modal form--------------------------------------
document.getElementById('modalForm') //gets the form
	.addEventListener('input', function (e) {
		//listens to input event
		//hideAllMessages();
		updateFieldsValidity(); //calls for the update of all validites in the fields objects
		removeValidMessages();
		calculateGlobalValidity(); //calcultes globalValidity
		console.log(fields);
		console.log('globalValidity ' + globalValidity);
		//disableSubmit(globalValidity) ; //  Manages the "enabled/disabled" state on submit button
		return globalValidity;
	});
//------------------------------------END Input on modal form--------------------------------------

//----------------CONFIRMATION MODAL------------------------------

//Const declarations
const ConfirmationModalBtns = document.querySelectorAll(
	'.closeConfirmationModal'
); //Declares a constant for both CLOSE buttons
const confirmationModalBody = document.getElementById('confirm-div'); //declares a constant for the whole modal
//END Const declarations

//Functions declarations
//function for closing confirmation modal (will be called when buttons are clicked)
function hideConfirmationModal() {
	confirmationModalBody.style.display = 'none'; //hides the whole parent of confirmation modal div
}
//function for opening confirmation modal (will be called on submit)
function displayConfirmationModal() {
	confirmationModalBody.style.display = 'flex'; //Display switches to flex
}
//END Functions declarations

//close modal event
ConfirmationModalBtns.forEach(
	(
		btn //instructions are applied to each button
	) => btn.addEventListener('click', hideConfirmationModal)
); //listens to click, calls closing function

//----------------END CONFIRMATION MODAL------------------------------

//-----------------------SUBMIT---------------------------------------
document.getElementById('modalForm') //gets the form
	.addEventListener('submit', function (e) {
		//listens to submit event on the form
		console.log('au clic  ' + globalValidity);
		e.preventDefault(); //prevents automatic closing/reload of page and loss of informations
		//updateFieldsValidity();
		// calculateGlobalValidity();
		if (globalValidity == false) {
			console.log("deso c'est false");
			errorMessageOnSubmit();
		} else {
			closeModal(); //closes the form modal
			this.reset(); //resets form modal
			displayConfirmationModal(); //displays the confirmation modal
			resetValidities();
			updateFieldsValidity();
			calculateGlobalValidity();
			console.log(fields);
			console.log(globalValidity);
		}
	});

//----------------------- END OF SUBMIT---------------------------------------
