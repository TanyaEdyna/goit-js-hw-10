const BASE_URL = 'https://restcountries.com/v3.1/name/';
export function fetchCountries(name) { 
    fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => { 
            console.log(data);
            return data;
        })
        .catch(err => {
            console.warn(err);
        })

};
   
//робить HTTP-запит на ресурс name і повертає проміс з масивом країн - результатом запиту. 







