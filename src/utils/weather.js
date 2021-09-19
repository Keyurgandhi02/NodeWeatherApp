const request = require("request");

const weatherData = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=bfaaa55db3d3aa187a0784f3cc3aedf0&query=" +
    lat +
    "," +
    long +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Something went wrong with the server", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, body.current.temperature);
    }
  });
};

module.exports = weatherData;
