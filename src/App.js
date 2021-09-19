const path = require("path");
const express = require("express"); //add express module
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weatherData = require("./utils/weather");
const app = express(); //call express function
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../views/partials");

app.set("view engine", "hbs");
app.use(express.static(publicDir));
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Keyur",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Keyur",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Keyur",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Something went wrong" });
  }
  geocode(req.query.address, (error, { lat, long, place } = {}) => {
    if (error) {
      return res.send(error);
    }

    weatherData(lat, long, (error, weatherdata) => {
      if (error) {
        return res.send(error);
      }
    });

    res.send({
      address: place,
      latitude: lat,
      longitude: long,
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("errorpage", {
    error: "Help Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("errorpage", {
    error: "404 Not Found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

//request to server
// app.get("", (req, res) => {
//   //send is used for response send to the broswer
//   res.send("helloe express js!!");
// });
