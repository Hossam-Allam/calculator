const numbers = document.querySelectorAll(".number");

const given = document.querySelector(".given");

const equal = document.querySelector(".equal");

const operations = document.querySelectorAll(".plus, .minus, .divide, .multiply, .modulos");

const backspace = document.querySelector(".c");

const AC = document.querySelector(".AC");

const result = document.querySelector(".result");

const prvAnswer = document.querySelector(".ans");

const negative = document.querySelector(".negative");

negative.addEventListener("click", () => {
    if (given.innerHTML == "0")
        given.innerHTML = "-";
    else
        given.innerHTML += "-";
});

function calculate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return (parseFloat(num1) + parseFloat(num2)).toFixed(4);
        case "-":
            return (parseFloat(num1) - parseFloat(num2)).toFixed(4);
        case "X":
            if (num2 == "0")
                return "I can't do that :(";
            else
                return (parseFloat(num1) * parseFloat(num2)).toFixed(4);
        case "÷":
            return (parseFloat(num1) / parseFloat(num2)).toFixed(4);
        case "%":
            return (parseFloat(num1) % parseFloat(num2)).toFixed(4);
        default:
            throw new Error("Invalid operator");
    }

}



function engine() {

    let symbol = "";
    let num1 = 0;
    let num2 = 0;
    let operatorIndex = 1;
    let answer = "0";
    let previousAnswer = "0";

    AC.addEventListener("click", () => {
        given.innerHTML = "0";
        symbol = "";
        num1 = 0;
        num2 = 0;
        answer = "0";
        previousAnswer = "0";
        result.innerHTML = "0";
    });

    backspace.addEventListener("click", () => {
        let currentText = given.innerHTML;
        let potentialSymbol = currentText.slice(currentText.length - 1, currentText.length);
        let sliced = currentText.slice(0, currentText.length - 1);
        if (potentialSymbol === "+" || potentialSymbol === "-" || potentialSymbol === "X" || potentialSymbol === "÷" || potentialSymbol === "%") {
            symbol = "";
            console.log(potentialSymbol);
        }
        given.innerHTML = sliced;
    });

    numbers.forEach(number => {
        number.addEventListener("click", () => {
            if (given.innerHTML == 0)
                given.innerHTML = number.innerHTML;
            else if (given.innerHTML.length < 14)
                given.innerHTML += number.innerHTML;
            else
                alert("Character limit reached");
        });
    });

    operations.forEach(operator => {
        operator.addEventListener("click", () => {
            if (given.innerHTML < 14) {
                if (symbol === "" && previousAnswer == "0") {
                    num1 = given.innerHTML;
                    operatorIndex = given.innerHTML.length;
                    symbol = operator.innerHTML;
                    console.log(symbol);
                    given.innerHTML += operator.innerHTML;
                } else if (symbol === "" && previousAnswer != "0" && given.innerHTML == "0") {
                    num1 = previousAnswer;
                    given.innerHTML = num1;
                    operatorIndex = given.innerHTML.length;
                    symbol = operator.innerHTML;
                    console.log(symbol);
                    given.innerHTML += operator.innerHTML;
                } else
                    alert("bruh");
            } else
                alert("Character limit reached");

        }
        );
    });

    prvAnswer.addEventListener("click", () => given.innerHTML += previousAnswer);

    equal.addEventListener("click", () => {
        num2 = given.innerHTML.substring(operatorIndex + 1);
        answer = calculate(num1, symbol, num2);
        previousAnswer = answer;
        result.innerHTML = answer;
        symbol = "";
        num1 = 0;
        num2 = 0;
        given.innerHTML = "0";
    })



}

engine();
