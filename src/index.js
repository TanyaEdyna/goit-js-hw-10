import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;//обмеження з яким функція спрацьовує 

const refs = {
    inputSearchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.inputSearchBox.addEventListener('input', debounce(handleSearchCountry, DEBOUNCE_DELAY))

function handleSearchCountry(event) {
    console.log(event);
    event.preventDefault();
    const seekedCountry = refs.inputSearchBox.value.trim();//отримую значення яке ввів користувач в поле інпут
    if (seekedCountry === null) {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        return
    }
    console.log(seekedCountry);

  fetchCountries(seekedCountry);
}
//якщо повертається більше 10 країн, то повідомлення "Too many matches found. Please enter a more specific name."
//якщо від 2-10, то видає  список країн ( складається з прапора та назви країни)
//якщо одна країна - масив (прапор, назва, столиця, населення і мови.)
function createListOfSearchedCountries(data) {
    if (data.lenght > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.lenght >= 2 && data.lenght <= 10) {
        //тут передати функцію яка видає  список країн
        createCountryListMarkup();
    } else if (data.lenght === 1) {
        createCountryInfoMarkup();
    }


}
const { name, capital, population, flags, languages } = data;
console.log(data);//????

function createCountryListMarkup({ flags, name }) {
    const countryMarkup = `<li class="country_list_item">
    <img class="country_img" src="${flags.svg}" alt="${name}" width="100">
    <p class="country_name">${name.official}</p>
    </li>`;
    refs.countryList.insertAdjacentHTML('afterbegin', countryMarkup);

}

function createCountryInfoMarkup({ flags, name, capital, population, languages }) {
    countryMarkup = ` <img class="country_img" src="${flags.svg}" alt="${name}" width="100">
<p class="country_name">${name.official}</p>
<ul class="country_info_list">
  <li class="country_info_item">Capital <span class="country_info_capital">${capital}</span></li>

  <li class="country_info_item">Population <span class="country_info_population">${population}</span></li>

  <li class="country_info_item">Languages <span class="country_info_languages">${languages}</span></li>
</ul>`
    refs.countryInfo.insertAdjacentHTML('afterbegin', countryMarkup);

}


