//Declare global variables
var displayCurrent = document.getElementById("display");
var sumNr = 0;
var flagOperatorState = 0; //1-Add, 2-Minus, 3-Multiplication, 4-Division
var flagCalculation = 0; // check status for begin write new number into display - using after press operator key
var flagGetSummarize = 0;

//Declare functions
function resetCalculator() {sumNr = 0; flagOperatorState = 0; flagCalculation = 0;}

function addDigit(numberInput){
    if (flagCalculation === 1){ //begin write a new number for current calculation
        displayCurrent.value = ""; //clear the display
        flagCalculation = 0;
    }

    if (parseInt(displayCurrent.value) === 0 || flagGetSummarize === 1){
        displayCurrent.value = numberInput;
        flagGetSummarize = 0;
    }else{
        if (displayCurrent.value.length < 10){
            displayCurrent.value += numberInput;
        }else{
            alert("Enter max 10 digits!");
        }
    }
}
function completeLastOperator(flagLastOperatorState){
    let lastNr = parseInt(displayCurrent.value); //get the last number on display

    switch (flagLastOperatorState){
        case 1: // + Add
            sumNr += lastNr;
            break;
        case 2:// - Minus
            sumNr -= lastNr;
            break;
        case 3:// * Multiplication
            sumNr *= lastNr;
            break;
        case 4:// / Division
            sumNr /= lastNr;
            break;
        default:
            break;
    }
}
function doCalculation(flagLastOperatorState){
    let displayCurrentValue = parseInt(displayCurrent.value);
    if (flagLastOperatorState === 0){
        sumNr += displayCurrentValue;
    }else {
        completeLastOperator(flagLastOperatorState);
    }
}

function getSummarize(){
    completeLastOperator(flagOperatorState);
    displayCurrent.value = sumNr;
    flagGetSummarize = 1;
    resetCalculator();
}
function clearForward() {
    if (displayCurrent.value.length > 1){
        let newNr = "";
        let displayCurrentArray = Array.from(displayCurrent.value);

        for (let i=0; i < displayCurrentArray.length-1; i++){
            newNr += displayCurrentArray[i];
        }
        displayCurrent.value = newNr;
    }else{
        displayCurrent.value = 0;
    }
}

//Operators
function operatorAdd(){
    let flagLastOperatorState = flagOperatorState; //saved the last operator state
    flagOperatorState = 1; //turn on new state

    doCalculation(flagLastOperatorState);
    flagCalculation = 1;
}
function operatorMinus() {
    let flagLastOperatorState = flagOperatorState; //saved the last operator state
    flagOperatorState = 2; //turn on new state

    doCalculation(flagLastOperatorState);
    flagCalculation = 1;
}
function operatorMultiplication(){
    let flagLastOperatorState = flagOperatorState; //saved the last operator state
    flagOperatorState = 3; //turn on new state

    doCalculation(flagLastOperatorState);
    flagCalculation = 1;
}
function operatorDivision() {
    let flagLastOperatorState = flagOperatorState; //saved the last operator state
    flagOperatorState = 4; //turn on new state

    doCalculation(flagLastOperatorState);
    flagCalculation = 1;
}

//MAIN PROGRAM
//Get functions or operators from button
let btnClear = document.getElementById("btnClear");
btnClear.addEventListener("click",function () { displayCurrent.value = 0; resetCalculator();});

let btnForward = document.getElementById("btnForward");
btnForward.addEventListener("click",function () { clearForward();});

let btnSummarize = document.getElementById("btnSummarize");
btnSummarize.addEventListener("click", function () { getSummarize();});

let btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click",function () { operatorAdd();});

let btnMinus = document.getElementById("btnMinus");
btnMinus.addEventListener("click",function () { operatorMinus();});

let btnMultiplication = document.getElementById("btnMultiplication");
btnMultiplication.addEventListener("click",function () { operatorMultiplication();});

let btnDivision = document.getElementById("btnDivision");
btnDivision.addEventListener("click",function () { operatorDivision();});


//Get values from buttons
let btnOne = document.getElementById("btnOne");
btnOne.addEventListener("click",function () { addDigit(1); });

let btnTwo = document.getElementById("btnTwo");
btnTwo.addEventListener("click",function () { addDigit(2); });

let btnThree = document.getElementById("btnThree");
btnThree.addEventListener("click",function () { addDigit(3); });

let btnFour = document.getElementById("btnFour");
btnFour.addEventListener("click",function () { addDigit(4); });

let btnFive = document.getElementById("btnFive");
btnFive.addEventListener("click",function () { addDigit(5); });

let btnSix = document.getElementById("btnSix");
btnSix.addEventListener("click",function () { addDigit(6); });

let btnSeven = document.getElementById("btnSeven");
btnSeven.addEventListener("click",function () { addDigit(7); });

let btnEight = document.getElementById("btnEight");
btnEight.addEventListener("click",function () { addDigit(8); });

let btnNine = document.getElementById("btnNine");
btnNine.addEventListener("click",function () { addDigit(9); });

let btnZero = document.getElementById("btnZero");
btnZero.addEventListener("click",function () { addDigit(0); });

//Using keyboard
document.addEventListener("keydown", function(event) {
    let keycode = event.keyCode;
    switch (keycode){
        case 48:
            addDigit(0);
            break;
        case 49:
            addDigit(1);
            break;
        case 50:
            addDigit(2);
            break;
        case 51:
            addDigit(3);
            break;
        case 52:
            addDigit(4);
            break;
        case 53:
            addDigit(5);
            break;
        case 54:
            addDigit(6);
            break;
        case 55:
            addDigit(7);
            break;
        case 56:
            addDigit(8);
            break;
        case 57:
            addDigit(9);
            break;
        case 106:
            operatorMultiplication();
            break;
        case 107:
            operatorAdd();
            break;
        case 109:
            operatorMinus();
            break;
        case 111:
            operatorDivision();
            break;
        case 13:
            getSummarize();
            break;
        case 8:
            clearForward();
            break;
        case 27:
            displayCurrent.value = 0;
            resetCalculator();
            break;
        default:
            break;
    }
});