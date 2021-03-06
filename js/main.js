//Mini calculator version 1.2 - 2018-02-03
//Declare global variables
var displayCurrent = document.getElementById("display");
var sumNr = 0;
var decimalFractionDigits = 0; //The number of digits after the decimal point
var flagOperatorState = 0; //1-Add, 2-Subtract, 3-Multiplication, 4-Division
var flagCalculation = 0; // Check status for beginning write new number into display - using after press operator key
var flagGetSummarize = 0;

//Declare functions
function convertStringToNumber(sNumber, fractionDigits) {
    return parseFloat(Number(sNumber).toFixed(fractionDigits));
}
function resetCalculator() {
    sumNr = 0;
    flagOperatorState = 0;
    flagCalculation = 0;
    displayCurrent.value = 0;
}
function addDigit(numberInput){
    if (flagCalculation === 1){ //begin write a new number for current calculation
        displayCurrent.value = ""; //clear the display
        flagCalculation = 0;
    }

    if (convertStringToNumber(displayCurrent.value) == 0 || flagGetSummarize === 1){
        displayCurrent.value = numberInput;
        flagGetSummarize = 0;
    }else{
        if (displayCurrent.value.length < 10){
            displayCurrent.value += numberInput;
        }else{
            alert("Hey guy! You can only enter max 10 digits!");
        }
    }
}
function completeLastOperator(flagLastOperatorState){
    let lastNr = convertStringToNumber(displayCurrent.value, decimalFractionDigits);

    switch (flagLastOperatorState){
        case 1: // + Add
            sumNr += lastNr;
            break;
        case 2:// - Subtraction
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
function makeCalculation(flagLastOperatorState){
    //Must change the string which get from input to number here
    let displayCurrentValue = convertStringToNumber(displayCurrent.value,decimalFractionDigits);

    if (flagLastOperatorState == 0){
        sumNr += displayCurrentValue;
    }else {
        completeLastOperator(flagLastOperatorState);
    }
}
function getSummarize(){
    let displaySumNr;
    flagGetSummarize = 1;

    completeLastOperator(flagOperatorState);
    displaySumNr = sumNr;

    resetCalculator();
    displayCurrent.value = displaySumNr;
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
    flagOperatorState = 1; //turn on new state: Add

    makeCalculation(flagLastOperatorState);
    flagCalculation = 1;
}
function operatorSubtraction() {
    let flagLastOperatorState = flagOperatorState; //saved the last operator state
    flagOperatorState = 2; //turn on new state: Subtract

    makeCalculation(flagLastOperatorState);
    flagCalculation = 1;
}
function operatorMultiplication(){
    let flagLastOperatorState = flagOperatorState; //saved the last operator state
    flagOperatorState = 3; //turn on new state: Multiplication

    makeCalculation(flagLastOperatorState);
    flagCalculation = 1;
}
function operatorDivision() {
    let flagLastOperatorState = flagOperatorState; //saved the last operator state
    flagOperatorState = 4; //turn on new state: Division

    makeCalculation(flagLastOperatorState);
    flagCalculation = 1;
}

//MAIN PROGRAM
//Get functions or operators from button
let btnClear = document.getElementById("btnClear");
btnClear.addEventListener("click",function(){displayCurrent.value = 0;resetCalculator();});

let btnBackspace = document.getElementById("btnBackspace");
btnBackspace.addEventListener("click",function(){clearForward();});

let btnSummarize = document.getElementById("btnSummarize");
btnSummarize.addEventListener("click", function(){getSummarize();});

let btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click",function(){operatorAdd();});

let btnMinus = document.getElementById("btnMinus");
btnMinus.addEventListener("click",function(){operatorSubtraction();});

let btnMultiplication = document.getElementById("btnMultiplication");
btnMultiplication.addEventListener("click",function(){operatorMultiplication();});

let btnDivision = document.getElementById("btnDivision");
btnDivision.addEventListener("click",function(){operatorDivision();});


//Get values from buttons
let btnOne = document.getElementById("btnOne");
btnOne.addEventListener("click",function(){addDigit(1);});

let btnTwo = document.getElementById("btnTwo");
btnTwo.addEventListener("click",function(){addDigit(2);});

let btnThree = document.getElementById("btnThree");
btnThree.addEventListener("click",function(){addDigit(3);});

let btnFour = document.getElementById("btnFour");
btnFour.addEventListener("click",function(){addDigit(4);});

let btnFive = document.getElementById("btnFive");
btnFive.addEventListener("click",function(){addDigit(5);});

let btnSix = document.getElementById("btnSix");
btnSix.addEventListener("click",function(){addDigit(6);});

let btnSeven = document.getElementById("btnSeven");
btnSeven.addEventListener("click",function(){addDigit(7);});

let btnEight = document.getElementById("btnEight");
btnEight.addEventListener("click",function(){addDigit(8);});

let btnNine = document.getElementById("btnNine");
btnNine.addEventListener("click",function(){addDigit(9);});

let btnZero = document.getElementById("btnZero");
btnZero.addEventListener("click",function(){addDigit(0);});

//Using keyboard
document.addEventListener("keydown", function(event){
    let userKeyPress = event.keyCode;
    switch (userKeyPress){
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
            if (event.shiftKey){operatorDivision();}
            else{addDigit(7);}
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
        case 187:
            operatorAdd();
            break;

        case 109:
        case 189:
            operatorSubtraction();
            break;

        case 111:
            operatorDivision();
            break;
        case 13: //Enter
            getSummarize();
            break;
        case 8:
            clearForward();
            break;
        case 27:
            resetCalculator();
            break;
        case 191:
            if (event.shiftKey){operatorMultiplication();}
            break;

        default:
            break;
    }
});