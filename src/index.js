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
const BASE_URL = 'https://restcountries.com/v3.1/name/';


refs.inputSearchBox.addEventListener('input', debounce(handleSearchCountry, DEBOUNCE_DELAY))

function handleSearchCountry(event) {
    event.preventDefault();
    const seekedCountry = event.target.value.trim();//отримую значення яке ввів користувач в поле інпут
    if (seekedCountry === '') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        
        return;
    }
     fetchCountries(seekedCountry).then(data => {
    
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
         if (data.length > 10) {
            Notiflix.Report.info('Too many matches found. Please enter a more specific name.');
        } else if (data.length >= 2 && data.length <= 10) {
        refs.countryList.insertAdjacentHTML('afterbegin', createCountryListMarkup(data));
        } else if (data.length === 1) {
        refs.countryInfo.insertAdjacentHTML('afterbegin', createCountryInfoMarkup(data[0]));
         } else {
             Notiflix.Report.warning('Oops, there is no country with that name');
        }
        
  })
}


function createCountryListMarkup(data) {
    const countryMarkup = data.map(({ name, flags }) => {

        return `<li class="country_list_item">
    <img class="country_img" src="${flags.svg}" alt="${name}" width="100">
    <p class="country_name">${name.official}</p>
    </li>`
    }).join('');
    return countryMarkup;
   
}

function createCountryInfoMarkup(data) {
    const { name, flags, capital, population, languages } = data;
        return ` 
        <img class="country_img" src="${flags.svg}" alt="${name}" width="100">
        <p class="country_name">${name.official}</p>
        <ul class="country_info_list">
            <li class="country_info_item">Capital <span class="country_info_capital">${capital}</span></li>
            <li class="country_info_item">Population <span class="country_info_population">${population}</span></li>
            <li class="country_info_item">Languages <span class="country_info_languages">${languages.join(', ')}</span></li>
        </ul>`
};

