
var countryInput = document.getElementById('countryInput');
var resultContainer = document.getElementById('resultContainer');
var modalBody = document.getElementById('modalBody');
function SearchBtn()
{
var countryName=countryInput.value.trim();
if(!countryName)
{alert('please enter a country name')
    return;
}
var url=`https://restcountries.com/v3.1/name/${countryName}`;

fetch(url)
.then (res => res.json() )
.then (data => process(data)); 
}
function process(data)
{
   resultContainer.textContent="";
   
   data.forEach(country => {
    var card=document.createElement('div');

    card.className = 'col country-card mt-3';
                card.innerHTML = `
                    <h5>${country.name.common}</h5>
            <img src="${country.flags.svg}" alt="${country.name.common} flag" style="width: 200px; height: 70px;">
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <button class="btn btn-info btn-sm mt-2" onclick="countryDetails('${country.name.common}')">More Details</button>
        `;
                resultContainer.appendChild(card);

    
   });
}
async function countryDetails(countryName)
{

    var countryResponse = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        var weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=1ee396445aed759d30e2fc1514604edc`);

        if (!countryResponse.ok || !weatherResponse.ok) {
            throw new Error('Failed to fetch data');
        }

       var  countryData = await countryResponse.json();
        var weatherData = await weatherResponse.json();

        var country = countryData[0];
        modalBody.innerHTML = `
            <h5>${country.name.common}</h5>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Weather:</strong> ${weatherData.weather[0].description}, ${weatherData.main.temp}°C</p>
            <img src="${country.flags.svg}" alt="flag" style="width:150px; margin-top:10px;">
        `;

        var modal = new bootstrap.Modal(document.getElementById('countryModal'));
        modal.show();




}

