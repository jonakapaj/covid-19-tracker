import axios from 'axios';

let cachedData = null;  // cache to store the fetched data

const fetchCovidData = () => {
    // if data is already fetched and cached, return it
    if (cachedData != null) {
        console.log(cachedData)
        return Promise.resolve(cachedData);
    }

    return axios.get('https://disease.sh/v3/covid-19/countries/')
        .then(response => {
            const countriesData = response.data;
            const transformedData = countriesData.map(country => {
                if (!country.countryInfo || !country.countryInfo.flag) {
                    console.error('Flag info is missing for:', country.country);
                    return null;  // or handle this in another suitable way for your use case
                }

                return {
                    country: country.country,
                    deaths: country.deaths,
                    cases: country.cases,
                    recovered: country.recovered,
                    flagImgSrc: country.countryInfo.flag
                };
            }).filter(Boolean);
            cachedData = transformedData;
            return transformedData;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
};

// UTIL function to find a specific country data
const getDataForCountry = (countryName) => {
    return new Promise((resolve, reject) => {
        if (!cachedData) {
            fetchCovidData()
                .then(data => {
                    const countryData = data.find(country => country.country === countryName);
                    const transformedData = {
                        country: countryData.country,
                        deaths: countryData.deaths,
                        cases: countryData.cases,
                        recovered: countryData.recovered,
                        flagImgSrc: countryData.flagImgSrc
                    };
                    console.log("Requested search for " + countryName + "found--" + countryData)
                    resolve(transformedData);

                })
                .catch(error => reject(error));
        } else {
            const countryData = cachedData.find(country => country.country === countryName);
            const transformedData = {
                country: countryData.country,
                deaths: countryData.deaths,
                cases: countryData.cases,
                recovered: countryData.recovered,
                flagImgSrc: countryData.flagImgSrc
            }
            resolve(transformedData);
        }
    });
}


export {fetchCovidData, getDataForCountry};