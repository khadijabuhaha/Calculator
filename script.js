let current = "0";
let previous = "";
let operator = "";
let startNew = false;

const display = document.getElementById("display");

function showScreen() {
    if(operator === ""){
        display.textContent = current;
    }else if(startNew){
        display.textContent = previous + " " + operator;
    }else{
        display.textContent = previous + " " + operator + " " + current;
    }
}

function checkError() {
    if(current === "Error"){
        current = "0";
    }
}

function pressNumber(n){
    checkError();
    if(startNew){
        if(n === "."){
            current = "0.";
        }else{
            current = n;
        }
        startNew = false;
    }else if(n === "." && current.includes(".")){
        // dot pehle se hai, kuch mat karo
    }else if(current === "0" && n !== "."){
        current = n;
    }else{
        current = current + n;
    }

    showScreen();
}

function pressOperator(op) {
    checkError();
    if(operator !== "" && startNew === false){
        calculate();
    }
    previous = current;
    operator = op;
    startNew = true;

    showScreen();
}

function pressEquals(){
    checkError();
    calculate();
    showScreen();
}

function calculate(){
    if(operator === ""){
        return;
    }
    let a = parseFloat(previous);
    let b = parseFloat(current);
    let result = 0;

    if(operator === "+") result = a + b;
    if(operator === "−") result = a - b;
    if(operator === "×") result = a * b;
    if(operator === "÷"){
        if(b === 0){
            result = "Error";
        }else{
            result = a / b;
        }
    }

    if(result === "Error"){
        current = "Error";
    }else{
        current = String(parseFloat(result.toFixed(8)));
    }

    operator = "";
    startNew = true;
}

function pressPercent(){
    checkError();
    current = String(parseFloat(current) / 100);
    showScreen();
}

function pressDelete(){
    checkError();
    current = current.slice(0,-1);
    if(current === "" || current === "-"){
        current = "0";
    }
    showScreen();
}

function pressClear(){
    current = "0";
    previous = "";
    operator = "";
    startNew = false;
    showScreen();
}