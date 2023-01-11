// Global Variables 
const ZipID = document.getElementById('zip');
const feel = document.getElementById('feelings');
const Api = 'd3983a7b0716dfbb4407de08e4a1b17c';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() +'.'+ d.getDate()+'.'+ d.getFullYear();


// Function to make a GET request to the server to retrieve the temperature and feelings data
// function that makes an HTTP GET request to the /Get route on the server
const getData = () => {
  fetch('/Get')
    .then(response => response.json())
    .then(data => update(data.temp, data.date, data.feeling))
};

// Function to make a POST request to the server to add the temperature and feelings data
/* function to send an HTTP POST request to a server at the endpoint /Post 
with a request body containing a JSON object with three properties */
const addData = (temp, date, feeling) => {
  fetch("/Post", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ temp, date, feeling }),
  });
};

// Function to get the temperature data from the OpenWeatherMap API
/* function to making an API request to the OpenWeatherMap API,
specifically requesting the current temperature for a given zip code */
const getTemp = (zip) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${Api}&units=metric`)
    .then(response => response.json())
    .then(data => data.main.temp)
};

// Click event listener for the "generate" button
/* This code sets up an event listener that listens for clicks on an element with an ID of generate,
When the element is clicked, the function will be executed */
document.getElementById('generate').addEventListener('click', () => {
  const zip = ZipID.value;
  const feeling = feel.value;
  getTemp(zip).then(temp => {
    if (temp) {
      addData(temp, newDate, feeling);
      getData();
    }
  });
});

// Function to update the page with the temperature and feelings data
/* function to updating the text content of certain elements on an HTML page for the inputs that will be entered*/
const update = (temp, date, feeling) => {
  document.getElementById('temp').textContent = `Temperature: ${temp}`;
  document.getElementById('date').textContent = `Date: ${date}`;
  document.getElementById('content').textContent = `Feelings: ${feeling}`;
};
