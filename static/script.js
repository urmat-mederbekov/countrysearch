const baseUrl = 'https://restcountries.eu/rest/v2/name/';
async function getCountry(countryDomen) {
    const response = await fetch(baseUrl + countryDomen);
    
    if(response.ok) {
        return response.json();
    }
    else {
        alert('Country with such domain not found');
    }
}

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', search);
async function search(e) {
    e.preventDefault();
    let countryDomain = document.querySelector('[name=search]').value;
    const countries = await getCountry(countryDomain);
    try {
        await countries.forEach(country => {
            const infoBlock = document.createElement('div');
            infoBlock.innerHTML = `
            <div class="name" id='${country.numericCode}'>
            <h1>${country.name}</h1>
            </div>
            <div class="capital" style="display: flex;">
            <p>Столица: </p>  
            <p>${country.capital}</p>
            </div>
            <div class="flag">
            <img src="${country.flag}" alt="flag image" height="90" width="180">
            </div>
            <div class="currencies" style="display: flex;">
            <p>Валюты: </p>  
            <p>${country.currencies[0].name}</p>
            </div>
            <div class="region" style="display: flex;">
            <p>Регион: </p>  
            <p>${country.region}</p>
            </div>
            <div class="links">
            <p>Сылки: </p>
            <a href="https://www.google.com/search?q=${country.name}"  target="_blank">google</a>
            <br/>
            <a href="https://ru.m.wikipedia.org/wiki/${country.name}" target="_blank">wiki</a>
            </div>
            `;
            const countriesSection = document.getElementById('countries');
            !document.getElementById(country.numericCode) &&
            countriesSection.insertBefore(infoBlock, countriesSection.childNodes[0]);
        });
    } catch (error) {
        console.log(error);       
    }
    searchForm.reset();
    searchForm.firstElementChild.focus();
}