const weatherSearchHandler = document.querySelector("form");
const searchData = document.querySelector("input");
const locationData = document.querySelector("#location");
const tempData = document.querySelector("#temp");
const tempData1 = document.querySelector("#temp1");
const errorMessage = document.querySelector("#errorMessage");
weatherSearchHandler.addEventListener("submit", (e) => {
  e.preventDefault();

  locationData.textContent = "Loading...";

  fetch("/weather?address=" + searchData.value).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        errorMessage.textContent = "Sometihng went wrong";
      } else {
        locationData.textContent = data.address;
        tempData.textContent = data.latitude;
        tempData1.textContent = data.longitude;
      }
    });
  });

  searchData.textContent = "";
});
