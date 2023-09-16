import axios from 'axios'


// const fetchData = async () => {
//   const data =""
//   const options = {
//     method: 'GET',
//     url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries',
//     headers: {
//       'X-RapidAPI-Key': 'cf45995c88msh6b42fe33576dfbcp14c6ffjsn58ca2fd7d702',
//       'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//     }
//   };


//   try {
//     const response = await axios.request(options);
//     const jona = response.data.data.map((item) => item.name);
//     console.log(jona);
//   } catch (error) {
//     console.error(error);
//   }
// }; //This to get them countries names






// const apiUrl = 'https://corona.lmao.ninja/v2/countries/china';

// axios.get(apiUrl)
//   .then((response) => {
//     const usaData = response.data;
//     console.log('COVID-19 Data for china:', usaData);
//   })
//   .catch((error) => {
//     console.error('Error fetching COVID-19 data:', error);
//   }); //this is to get the stats



//   export  default fetchData;


const fetchData = async () => {
  const options = {
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries',
    headers: {
      'X-RapidAPI-Key': 'cf45995c88msh6b42fe33576dfbcp14c6ffjsn58ca2fd7d702',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data.map((item) => item.name);
  } catch (error) {
    console.error(error);
    throw error; // It's good to throw the error so you can catch and handle it in the component
  }
};
  export  default fetchData;
