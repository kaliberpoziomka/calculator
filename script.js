// variable to store displaying content
let currentValue = '';
let currentSymbol = '';
let savedValue1 = '';
let savedValue2 = '';
let savedValue3 = '';
let savedSymbol1 = '';
let savedSymbol2 = '';
let savedSymbol3 = '';
let result1 = '';
let result2 = '';
let output = '';

// mapping buttons

let screen = document.getElementById('display');
let one = document.getElementById('1');
let two = document.getElementById('2');
let three = document.getElementById('3');
let four = document.getElementById('4');
let five = document.getElementById('5');
let six = document.getElementById('6');
let seven = document.getElementById('7');
let eight= document.getElementById('8');
let nine = document.getElementById('9');
let zero = document.getElementById('0');
let dot = document.getElementById('dot');
let minus = document.getElementById('substract');
let plus = document.getElementById('add');
let multiplyBtn = document.getElementById('multiply');
let divideBtn = document.getElementById('divide');
let even = document.getElementById('even');
let del = document.getElementById('delete');
let AC = document.getElementById('reset');
let switchMode = document.getElementById('switchMode');
let numberBtn = document.querySelector('.numberBtn');

// adding event to buttons
let ar = [one, two, three, four, five, six, seven, eight, nine, zero, dot];

for(let i = 0; i < ar.length; i++){
    ar[i].addEventListener("click", () => {
        display(ar[i].textContent);
    });
}

let keyCodes = [49,50,51,52,53,54,55,56,57,48,190];
let keyPadCodes = [97,98,99,100,101,102,103,104,105,96,110];
let operatorKeyCodes = [107,109,106,111];

document.addEventListener("keydown", (event) => {
    for(let i = 0; i < keyCodes.length; i++) {
        if(event.keyCode === keyCodes[i] || event.keyCode === keyPadCodes[i]) {
            display(ar[i].textContent);
        } else if(event.keyCode === operatorKeyCodes[i]) {
                    currentSymbol = `${ar2[i].textContent}`
                   operatorFunctions();
                }
            }          
         if(event.keyCode === 13) {
            evenFunction();
        } else if(event.keyCode === 8) {
            if(output != '') {
                reset();
            } else {
                deleteOne();
            }
        }
    
})

AC.addEventListener("click", () => reset());

del.addEventListener("click", () => deleteOne());

let ar2 = [plus, minus, multiplyBtn, divideBtn];

for(let j = 0; j < ar2.length; j++) {
ar2[j].addEventListener("click", () => {
    currentSymbol = `${ar2[j].textContent}`;
    operatorFunctions();
});
}

function operatorFunctions () {
    storeValue3();
    storeValue2();
    if(output == ''){
    storeValue1();
    }
    storeSymbol3();
    storeSymbol2();
    storeSymbol1();
    currentValue = '';
    if(savedSymbol3 != ''){
        currentValue = '';
        calculateEven();
        savedValue1 = output.toString();
        savedSymbol1 = currentSymbol;
        currentValue = '';
        currentSymbol = '';
        savedValue2 = '';
        savedValue3 = '';
        savedSymbol2 = '';
        savedSymbol3 = '';
        result1 = '';
        result2 = '';
        output = '';
    }
    currentSymbol = '';
}


even.addEventListener("click", () => {
    evenFunction();
});

function evenFunction () {
    storeValue3();
    storeValue2();
    currentValue = '';
    calculateEven();
    currentValue = '';
    currentSymbol = '';
    savedValue1 = output.toString();
    savedValue2 = '';
    savedValue3 = '';
    savedSymbol1 = '';
    savedSymbol2 = '';
}


// calculation
function add (a, b) {
    return Number(a) + Number(b);
};

function substract (a, b) {
    return Number(a) - Number(b);
};

function multiply (a, b) {
    return Number(a) * Number(b);
};

function divide (a, b) {
    return Number(a) / Number(b);
};

function operate (operator, a, b) {
    switch (operator) {
        case "+": 
            return add(a, b);

        case "-":
            return substract(a, b);
        
        case "x":
            return multiply(a, b);

        case "/":
            return divide(a, b);

    }
};



// display functions
function display (inputNumber) {
    if(currentValue.length > 13) {
        currentValue = currentValue.slice(1);
        currentValue += inputNumber;
        screen.textContent = currentValue;
    } else {
        currentValue += inputNumber;
        screen.textContent = currentValue;
    }
};

function reset () {
     currentValue = '';
     currentSymbol = '';
     savedValue1 = '';
     savedValue2 = '';
     savedValue3 = '';
     savedSymbol1 = '';
     savedSymbol2 = '';
     savedSymbol3 = '';
     result1 = '';
     result2 = '';
     output = '';
    screen.textContent = '0';
};

function deleteOne () {
    currentValue = currentValue.slice(0, -1);
    screen.textContent = currentValue;
    if(currentValue == ''){
        screen.textContent = '0';
    }
}

function storeValue1 () {
    if(savedValue2 == '') {
    savedValue1 = currentValue;
    }
}

function storeValue2 () {
    if(savedValue1 != '' && savedValue3 == '') {
    savedValue2 = currentValue;
    }
}

function storeValue3 () {
    if (savedValue2 != ''){
    savedValue3 = currentValue;
    }
}

function storeSymbol1 () {
    if (savedSymbol2 == '') {
        savedSymbol1 = currentSymbol;
    }
}

function storeSymbol2 () {
    if (savedSymbol1 != '' && savedSymbol3 == '') {
        savedSymbol2 = currentSymbol;
    }
}

function storeSymbol3 () {
    if (savedSymbol2 != ''){
    savedSymbol3 = currentValue;
    }
}


function calculateEven () {
    if(savedSymbol2 == "x" || savedSymbol2 == "/") {
        result1 = operate(savedSymbol2, savedValue2, savedValue3);
        result2 = operate(savedSymbol1, savedValue1, result1.toString());
        output = result2;
        output = Math.round(output*100)/100;
        display(output.toString());
    } else if(savedSymbol2 == "-" || savedSymbol2 == "+") {
        result1 = operate(savedSymbol1, savedValue1, savedValue2);
        result2 = operate(savedSymbol2, result1.toString(), savedValue3);
        output = result2;
        output = Math.round(output*100)/100;
        display(output.toString());
    } else if(savedSymbol1 == "-" || savedSymbol1 == "+"){
        result1 = operate(savedSymbol1, savedValue1, savedValue2);
        output = result1;
        output = Math.round(output*100)/100;
        display(output.toString());
    } else if(savedSymbol1 == "x" || savedSymbol1 == "/"){
        result1 = operate(savedSymbol1, savedValue1, savedValue2);
        output = result1;
        output = Math.round(output*100)/100;
        display(output.toString());
        
    }
}