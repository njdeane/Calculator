const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// requiring body-parser allows us to parse data from the website. the below code is required in order to use body-parser (urlencoded allows us to get access to the form data from index.html).
app.use(bodyParser.urlencoded({ extended: true }));


// __dirname gives the server the full path to this file, the + /index.html adds index.html to the get request from the user. if i move calculator.js into a different location like a folder, the __dirname will simply tell the server the new location. This means i don't need to know exactly where calculator.js is located as it could be on the cloud somewhere etc, i just put __dirname + fileNameIwantToSend and it will send the one i want to send. so cool!
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var num1 = Number(req.body.num1); // inside the brackets is the path to what I am trying to select 'num1' from index.html is the target. The 'Number' part is javascript for turning a number as a string into an actual integer.
  var num2 = Number(req.body.num2);
  var result = num1 + num2;
  res.send("The result of the calculation is " + result);
});



app.get("/bmiCalculator", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", function (req, res) {
  var height = parseFloat(req.body.height);
  var weight = parseFloat(req.body.weight);
  var result = weight / (height * height);
  res.send("Your BMI is " + result);
});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});

// when a client uses chrome inspect on our calculator website all they will see is all the html from index.html they will not see the programming of how the numbers are added as that code is located on the server (in this case local port 3000). So in this case index.html is the front end and calculator.js is the back end.