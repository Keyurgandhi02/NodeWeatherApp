const request = require("request");

const geocode = (address, callback) => {
  const api_key =
    "pk.eyJ1Ijoia2V5dXIwMiIsImEiOiJja3RhemZxaDcwM20wMnFucjBiODVpMXdlIn0.Kntfh6J4oeRNwbSlSZyE5w";
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=" +
    api_key +
    "";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Something Went wrong with the server", undefined);
    } else if (body.features.length === 0) {
      callback("Location Not Found", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        place: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
