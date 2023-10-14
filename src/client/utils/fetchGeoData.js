import axios from "axios";

const fetchGeoJsonData = () => {
    return axios.get('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching GeoJSON data:', error);
            throw error;
        });
};

export default fetchGeoJsonData