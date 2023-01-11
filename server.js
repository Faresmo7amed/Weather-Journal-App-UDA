// These variables are using and storing the require functions to import Node.js modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// These variables are setting up middlewares for an Express application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("website"));

let allData = {};
/* function to defining an HTTP GET route for an application using the Express.js web application framework,
When a client makes a GET request to the /Get route on this server the function will be executed */
app.get("/Get", (req, res) => {
  res.send(allData);
});
/* function to defining an HTTP POST route for an application using the Express.js web application framework,
When a client makes a POST request to the /Post route on this server the function will be executed */
app.post("/Post", (req, res) => {
  const data = {
    temp: req.body.temp,
    date: req.body.date,
    feeling: req.body.feeling,
  };
  console.log(data);
  allData = data;
  res.end();
});
// function to start an HTTP server using the Express.js web application framework
const port = 3000;
app.listen(port, () => {
  console.log(`Server is ready at http://localhost:${port}/`);
});
