const endpoint =
  "https://gist.githubusercontent.com/kosang02/2c5a6e14277284566efc9ec07df13a09/raw/a4be74f82442041896070455d7c721121b33a831/suck.json";

const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

findMatches = (wordToMatch, cities) =>
  cities.filter(place => {
    
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });

numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

displayMatches = e => {
  const word = e.target.value;
  const matchArray = findMatches(word, cities);
  const html = matchArray
    .map(place => {
      const regex = new RegExp(word, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${word}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${word}</span>`
      );
      return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(
              place.population
            )}</span>
        </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
};

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
