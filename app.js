function calculateCommission() {
  // Get the sales amount
  const salesAmount = Number(document.getElementById("salesAmount").value);

  // Calculate the commission based on sales amount
  let commission;
  if (salesAmount < 16536) {
    commission = salesAmount * 0.078;
  } else if (salesAmount >= 16536 && salesAmount < 24804) {
    commission = salesAmount * 0.0646;
  } else if (salesAmount >= 24804 && salesAmount < 33027) {
    commission = salesAmount * 0.077;
  } else if (salesAmount >= 33027 && salesAmount < 41283) {
    commission = salesAmount * 0.0909;
  } else {
    commission = salesAmount * 0.1151;
  }

  // Check if this was a new logo
  const newLogoYes = document.getElementById("newLogoYes");
  const isNewLogo = newLogoYes.checked;
  let additionalAmount = 0;
  if (isNewLogo) {
    additionalAmount += 2750;
  }

  // Get the contract term
  const term = Number(document.getElementById("term").value);
  let multiplier = 1;

  if (term === 2 || term === 3) {
    multiplier = 2.27 / 100;
  } else if (term === 4 || term === 5) {
    multiplier = 3.405 / 100;
  }

  additionalAmount += (term - 1) * (salesAmount * multiplier);

  // Add the additional amount to the commission
  commission += additionalAmount;

  // Set the commission value
  document.getElementById("commission").value = commission;


  // Check if the user wants to see the tax amount
  const taxYes = document.getElementById("taxYes");
  const isTaxEnabled = taxYes.checked;
  if (isTaxEnabled) {
    // Calculate the tax amount
    const taxAmount = commission * 0.4;
    document.getElementById("taxAmount").value = taxAmount;
    document.getElementById("taxMessage").style.display = "block";
  } else {
    document.getElementById("taxAmount").value = taxAmount.toFixed(2);
    document.getElementById("taxMessage").style.display = "none";
  }
}

// Replace YOUR_API_KEY with your actual API key
const apiKey = 'FD34U1RW8PE8VA8N'; // Replace with your actual API key
const symbol = 'CRM'; // Salesforce's stock symbol

fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Extract the most recent closing price from the API response
    const latestPrice = parseFloat(data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]]['4. close']).toFixed(2);
    document.getElementById('stock-value').textContent = `$${latestPrice}`;

    // Extract the daily closing prices for the past 30 days
    const timeSeriesData = Object.keys(data['Time Series (Daily)'])
      .map(date => {
        return {
          date,
          price: parseFloat(data['Time Series (Daily)'][date]['4. close']).toFixed(2)
        };
      })
      .slice(0, 30);

    //   // Create a chart using Chart.js
    const ctx = document.getElementById('stock-chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: timeSeriesData.map(d => d.date),
        datasets: [{
          label: 'Closing Price',
          data: timeSeriesData.map(d => d.price),
          backgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value, index, values) {
                return '$' + value;
              }
            }
          }
        }
      }
    });
  })
  .catch(error => console.error(error));

// only allow numbers on iOS devices
function restrictInput() {
  var inputField = document.getElementById("salesAmount");
  inputField.addEventListener("keypress", function (e) {
    var keyCode = e.which ? e.which : e.keyCode;
    if (keyCode < 48 || keyCode > 57) {
      e.preventDefault();
    }
  });
}

// Clear all input fields
document.getElementById("salesAmount").value = "";
newLogoYes.checked = false;
document.getElementById("term").value = 1;
taxYes.checked = false;

// Add an event listener to the "Clear Calculation" button
const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", function () {
  document.getElementById("commission").value = "";
  document.getElementById("taxAmount").value = "";
  document.getElementById("taxMessage").style.display = "none";
  document.getElementById("salesAmount").value = "";
});

$(function () {
  var availableTags = [
    "Green Light Guru",
    "Competitor Name",
    "Price Value"
  ];
  $("#inputField").autocomplete({
    source: availableTags
  });
});

$(function () {
  var availableTags = [
    "Green Light Guru",
    "Dot Compliance",
    "Master Control"
  ];
  $("#inputField").autocomplete({
    source: availableTags,
    select: function (event, ui) {
      if (ui.item.value === "Green Light Guru") {
        // Display text on the screen
        $("#display").text("You selected Green Light Guru!");
      } if (ui.item.value === "Master Control") {
        // Display text on the screen
        $("#display").text("You selected Master Control!");
      } if (ui.item.value === "Dot Compliance") {
        // Display text on the screen
        $("#display").text("You selected Dot Compliance!");
      }
    }
  });
});