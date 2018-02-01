//Declare global variables
var displayCurrent = document.getElementById("display");
var sumNr = 0;
var flagOperatorState = 0; //1-Add, 2-Minus, 3-Multiplication, 4-Division
var flagCalculation = 0; // check status for begin write new number into display - using after press operator key
var flagGetSummarize = 0;

//Declare functions
function checkDisplayIsEmpty() {if (displayCurrent.value.length === 0 || parseInt(displayCurrent.value) === 0){return true;}else{return false;}}
function resetCalculator() {sumNr = 0; flagOperatorState = 0; flagCalculation = 0;}
function clearDisplay() {displayCurrent.value = "";}

function addDigit(number){
    if (flagCalculation === 1){ //begin a new number for current calculation
        clearDisplay();
        flagCalculation = 0;
    }

    if (checkDisplayIsEmpty() || flagGetSummarize === 1){
        displayCurrent.value = number;
        flagGetSummarize = 0;
    }else{
        if (displayCurrent.value.length < 10){
            displayCurrent.value += number;
        }else{
            alert("Max 10 digits!");
        }
    }
}
function getSummarize(){
    completeLastOperator(flagOperatorState);
    displayCurrent.value = sumNr;
    flagGetSummarize = 1;
    resetCalculator();
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