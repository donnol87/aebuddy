function calculate() {
    // Get the value of the input field
    const input = document.getElementById("inputField").value;
    
    // Calculate 10% of the input
    const result = input * 0.077;
    
    // Display the result
    document.getElementById("result").textContent = `Your commision is ${input} is ${result}.`;
    
    // Show the helpfulness options
    document.getElementById("helpfulness").style.display = "block";
    
    // Clear the input field
    document.getElementById("inputField").value = "";
  }
  
  // Function to handle radio button selection
  function handleHelpfulness() {
    const yesRadio = document.getElementById("yes");
    const noRadio = document.getElementById("no");
    let feedback = "";
    if (yesRadio.checked) {
      // Get the value of the input field
      const input = document.getElementById("inputField").value;
  
      // Calculate 10% of the input
      const result = input * 0.1;
  
      // Calculate 41% of the initial percentage calculated
      const additionalResult = result * 0.41;
      
      feedback = `Glad to hear it was helpful! 41% of the initial percentage calculated (${result}) is ${additionalResult}.`;
      
      // Show the refresh button
      document.getElementById("refreshButton").style.display = "block";
    } else if (noRadio.checked) {
      feedback = "Sorry to hear that. Please let us know how we can improve.";
    } else {
      return; // Do nothing if no radio button is selected
    }
    document.getElementById("feedback").textContent = feedback;
  }
  
  // Add event listeners for radio button selection
  const helpfulnessRadios = document.getElementsByName("helpful");
  for (let i = 0; i < helpfulnessRadios.length; i++) {
    helpfulnessRadios[i].addEventListener("change", handleHelpfulness);
  }
  
  // Function to refresh the page
  function refresh() {
    location.reload();
  }
  function calculate() {
    var inputField = document.getElementById("inputField");
    var result = document.getElementById("result");
    var helpfulness = document.getElementById("helpfulness");
    var loadingSpinner = document.getElementById("loadingSpinner");
  
    loadingSpinner.style.display = "block";
    setTimeout(function() {
      var percent = inputField.value * 0.1;
      result.innerText = "10% of " + inputField.value + " is " + percent.toFixed(2);
  
      helpfulness.style.display = "block";
      loadingSpinner.style.display = "none";
    }, 2000);
  }
  "use strict";

  var input = document.getElementById('input'), // input/output button
    number = document.querySelectorAll('.numbers div'), // number buttons
    operator = document.querySelectorAll('.operators div'), // operator buttons
    result = document.getElementById('result'), // equal button
    clear = document.getElementById('clear'), // clear button
    resultDisplayed = false; // flag to keep an eye on what output is displayed
  
  // adding click handlers to number buttons
  for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(e) {
  
      // storing current input string and its last character in variables - used later
      var currentString = input.innerHTML;
      var lastChar = currentString[currentString.length - 1];
  
      // if result is not diplayed, just keep adding
      if (resultDisplayed === false) {
        input.innerHTML += e.target.innerHTML;
      } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        // if result is currently displayed and user pressed an operator
        // we need to keep on adding to the string for next operation
        resultDisplayed = false;
        input.innerHTML += e.target.innerHTML;
      } else {
        // if result is currently displayed and user pressed a number
        // we need clear the input string and add the new input to start the new opration
        resultDisplayed = false;
        input.innerHTML = "";
        input.innerHTML += e.target.innerHTML;
      }
  
    });
  }
  
  // adding click handlers to number buttons
  for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function(e) {
  
      // storing current input string and its last character in variables - used later
      var currentString = input.innerHTML;
      var lastChar = currentString[currentString.length - 1];
  
      // if last character entered is an operator, replace it with the currently pressed one
      if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
        input.innerHTML = newString;
      } else if (currentString.length == 0) {
        // if first key pressed is an opearator, don't do anything
        console.log("enter a number first");
      } else {
        // else just add the operator pressed to the input
        input.innerHTML += e.target.innerHTML;
      }
  
    });
  }
  
  // on click of 'equal' button
  result.addEventListener("click", function() {
  
    // this is the string that we will be processing eg. -10+26+33-56*34/23
    var inputString = input.innerHTML;
  
    // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
    var numbers = inputString.split(/\+|\-|\×|\÷/g);
  
    // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
    // first we replace all the numbers and dot with empty string and then split
    var operators = inputString.replace(/[0-9]|\./g, "").split("");
  
    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");
  
    // now we are looping through the array and doing one operation at a time.
    // first divide, then multiply, then subtraction and then addition
    // as we move we are alterning the original numbers and operators array
    // the final element remaining in the array will be the output
  
    var divide = operators.indexOf("÷");
    while (divide != -1) {
      numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
      operators.splice(divide, 1);
      divide = operators.indexOf("÷");
    }
  
    var multiply = operators.indexOf("×");
    while (multiply != -1) {
      numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
      operators.splice(multiply, 1);
      multiply = operators.indexOf("×");
    }
  
    var subtract = operators.indexOf("-");
    while (subtract != -1) {
      numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
      operators.splice(subtract, 1);
      subtract = operators.indexOf("-");
    }
  
    var add = operators.indexOf("+");
    while (add != -1) {
      // using parseFloat is necessary, otherwise it will result in string concatenation :)
      numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
      operators.splice(add, 1);
      add = operators.indexOf("+");
    }
  
    input.innerHTML = numbers[0]; // displaying the output
  
    resultDisplayed = true; // turning flag if result is displayed
  });
  
  // clearing the input on press of clear
  clear.addEventListener("click", function() {
    input.innerHTML = "";
  })