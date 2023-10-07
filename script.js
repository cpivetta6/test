document.addEventListener("DOMContentLoaded", function () {
  const cityInfo = document.querySelector(".city-info");

  const h2 = cityInfo.querySelector("h2");
  const categoriesDiv = cityInfo.querySelector(".categories");
  const description = cityInfo.querySelector(".description");
  const cityScore = cityInfo.querySelector(".city-score");
  categoriesDiv.innerHTML = "";

  const apiUrl = `https://api.teleport.org/api/urban_areas/`;

  async function search(cityInput) {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Errore nella richiesta..");
      }

      const data = await response.json();
      const cities = data._links["ua:item"];

      const foundCity = cities.find(
        (city) => city.name.toLowerCase() === cityInput
      );

      //console.log(foundCity);
      if (foundCity) {
        return foundCity;
      }

      return "City not found";
    } catch (error) {
      console.log(error);
    }
  }

  const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", async function () {
    const cityInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    let city = "";

    try {
      const result = await search(cityInput);
      city = result;
    } catch (error) {
      console.error(error);
    }

    fetch(`${city.href}scores/`)
      .then((responses) => {
        if (!responses.ok) {
          throw new Error("Errore nella richiesta");
        }
        return responses.json();
      })
      .then((dataCity) => {
        //const cityInfo = document.querySelector(".city-info");
        //console.log(dataCity);

        dataCity.categories.forEach((category) => {
          const categoryDiv = document.createElement("div");
          categoryDiv.classList.add("category");
          categoryDiv.style.backgroundColor = category.color;
          categoryDiv.textContent = `${category.name}: ${category.score_out_of_10}`;
          categoriesDiv.appendChild(categoryDiv);
        });
        h2.textContent = city.name;
        description.innerHTML = dataCity.summary;
        cityScore.textContent = `City score: ${dataCity.teleport_city_score.toFixed(
          2
        )}`;
      });
  });

  /*const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", async function () {
    const cityInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const apiUrl = `https://api.teleport.org/api/urban_areas/`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Errore nella richiesta..");
      }

      const data = await response.json();
      const cities = data._links["ua:item"];

      cities.forEach((city) => {
        if (city.name.toLowerCase() === cityInput) {
          fetch(`${city.href}scores/`)
            .then((responses) => {
              if (!responses.ok) {
                throw new Error("Errore nella richiesta");
              }
              return responses.json();
            })
            .then((dataCity) => {
              const cityInfo = document.querySelector(".city-info");
              console.log(dataCity);

              const h2 = cityInfo.querySelector("h2");
              const categoriesDiv = cityInfo.querySelector(".categories");
              const description = cityInfo.querySelector(".description");
              const cityScore = cityInfo.querySelector(".city-score");
              categoriesDiv.innerHTML = "";

              dataCity.categories.forEach((category) => {
                const categoryDiv = document.createElement("div");
                categoryDiv.classList.add("category");
                categoryDiv.style.backgroundColor = category.color;
                categoryDiv.textContent = `${category.name}: ${category.score_out_of_10}`;
                categoriesDiv.appendChild(categoryDiv);
              });

              console.log("trovato!");
              console.log(city.name);

              h2.textContent = city.name;
              description.innerHTML = dataCity.summary;
              cityScore.textContent = `City score: ${dataCity.teleport_city_score.toFixed(
                2
              )}`;
            });
        } else {
          document.querySelector(
            ".city-info"
          ).textContent = `Nessun dato trovato per ${cityInput}`;
          //console.log(`Nessun dato trovato per ${cityInput}`)
        }
      });
    } catch (error) {
      //document.querySelector(".cityInfo").textContent = `Errore: ${error.message}`
      console.log(error);
    }
  });*/
});
