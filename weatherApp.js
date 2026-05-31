async function search() {
  city.textContent = "Loading...";
  weather.textContent = "";
  feelsLike.textContent = "";
  humidity.textContent = "";
  weatherDesc.textContent = "";

  btnSearch.disabled = true;

  try {
    const response = await fetch(
      "https://wttr.in/" + input.value + "?format=j1",
    );

    const card = document.querySelector(".weather-card");
    const data = await response.json();
    const cityValid = data.nearest_area[0].region[0].value;

    if (!cityValid.includes(input.value)) {
      city.textContent = "City not found";
      return;
    }

    console.log(data.current_condition[0]);
    console.log(data.nearest_area[0].region[0]);

    city.textContent = input.value;

    weather.textContent = data.current_condition[0].temp_C + " °C";

    const description = data.current_condition[0].weatherDesc[0].value;
    let emoji = "";

    if (description.includes("Sunny")) {
      emoji = "☀️";
    }

    if (description.includes("Cloud")) {
      emoji = "☁️";
    }

    if (description.includes("Rain")) {
      emoji = "🌧";
    }

    if (description.includes("Snow")) {
      emoji = "❄️";
    }

    weatherDesc.textContent = description + " " + emoji;

    feelsLike.textContent =
      "Feels like " + data.current_condition[0].FeelsLikeC + " °C";

    humidity.textContent =
      "Humidity " + data.current_condition[0].humidity + "%";

    card.classList.remove("show");
    void card.offsetWidth;
    card.classList.add("show");
  } catch (error) {
    city.textContent = "Loading Error";
  } finally {
    btnSearch.disabled = false;
  }
}

const weather = document.querySelector(".weather");
const feelsLike = document.querySelector(".feelsLike");
const humidity = document.querySelector(".humidity");
const weatherDesc = document.querySelector(".weatherDesc");
const city = document.querySelector(".city");

const btnSearch = document.getElementById("search");
const input = document.getElementById("city");

btnSearch.addEventListener("click", () => {
  const city = input.value;
  search();
});

input.addEventListener ("keydown", (e) => {
  if (e.key === "Enter") {
    const city = input.value;
    search();
  }
})