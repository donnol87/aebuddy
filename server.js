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
      const result = input * 0.0727;
  
      // Calculate 41% of the initial percentage calculated
      const additionalResult = result * 0.41;
      
      feedback = `Guess what? The taxman has some deep pockets and will take roughly 41% of your sweet, sweet commish. The tax you'll pay on your $${result} deal is approx $${additionalResult.toFixed(0)}.`;
      
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
      var percent = inputField.value * 0.0727;
      result.innerText = "Your commission on a " + inputField.value + " deal is approx " + percent.toFixed(2);
  
      helpfulness.style.display = "block";
      loadingSpinner.style.display = "none";
    }, 2000);
  }
  "use strict";

 