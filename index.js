const cardTemplate = function (country) {
  return `<div class="card">
              <img id="flag-image" src="${country.flags.svg}" alt="flag of ${country.name.common}" />
              <h1 class="center">${country.name.common}</h1>
            </div>`;
};
const countriesNode = document.getElementById("countries");
const selectCountry = document.getElementById("continent-select");

// 1 - Implemente la función `fetch()`, deberá pasar la cadena URL como parámetro para recuperar todos los países. Puede encontrarlo en esta [URL](https://restcountries.com/#endpoints-all)

// 2 - Crea un bucle para iterar el Array que recibirás como respuesta de la API

// 3 - Agregue cada país al DOM usando `cardTemplate()`

// El resultado final debería ser algo como esto:

let allCountries = []; 

function renderCountries(countries) {
  countriesNode.innerHTML = ""; 
  countries.forEach(function (country) {
    const countryCard = cardTemplate(country);
    countriesNode.innerHTML += countryCard;
  });
}

fetch("https://restcountries.com/v3.1/all")
  .then(function (response){
   
      return response.json();
    })
    // fetch() returns a promise containing the response (a Response object).
    // This is just an HTTP response, not the actual JSON. 
    // To extract the JSON body content from the response, 
    // we use the json() method and pass it into the next .then()

    .then(function (countries) {
      allCountries = countries.slice(0, 150);
      renderCountries(allCountries);
    });
    // Here is where you'll need to add into the DOM all the countries received from API 

    // 1 - We will need to iterate the countries variable with a loop
    // 2 - You can use the cardTemplate() function to create a div with a class card already styled
    // 💡 you can use countriesNode variable to add elements


  selectCountry.addEventListener("change", function () {
    const selectedContinent = selectCountry.value;
  
    if (selectedContinent === "all") {
      renderCountries(allCountries);
    } else {
      const filtered = allCountries.filter(function (country) {
        return country.region === selectedContinent;
      });
      renderCountries(filtered);
    }
  });
