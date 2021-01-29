const endpoint =
  "https://gist.githubusercontent.com/kosang02/2c5a6e14277284566efc9ec07df13a09/raw/1fcbe8a1f091f300c8d700e782c50b2772a49b54/suck.json";

const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

findMatches = (wordToMatch, cities) =>
  cities.filter(place => {
    // 이 곳에서 검색어와 매치 되는 지를 확인해야 합니다
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
