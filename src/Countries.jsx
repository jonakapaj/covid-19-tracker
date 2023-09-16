// // const axios = require('axios');
// import React, { useState } from "react";
// import fetchData from "./stats";


// const Countries = () => {


//     const API_URL = 'https://corona.lmao.ninja/v2/countries/china';

//     // const [country, setCountry]= useState([]) 
//     // const searchCounty = async (name) =>{
//     //     const response = await fetch(API_URL)
//     //     const data = await response.json
//     //     setCountry = (data.Search)
//     // }
//     // useEffect(() => {

//     //     searchMovies("China")
//     // }, [])

//     return (


//        <div>
//            {fetchData(data)}
//        </div>
//     )




// }

// export default Countries





import React, { useState, useEffect } from "react";
import fetchData from "./stats";

const Countries = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetchData()
            .then(data => setCountries(data))
            .catch(error => console.error("Error fetching countries:", error));
    }, []);

    return (
        <div>
            {countries.map(country => (
                <p key={country}>{country}</p>
            ))}
        </div>
    );
}

export default Countries;
