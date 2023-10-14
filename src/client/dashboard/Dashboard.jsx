import React, {useEffect, useRef, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CovidMap from "../map/CovidMap";
import * as d3 from 'd3';
import {useUser} from '../user/UserContext';
import {useSelectedCountry} from './SelectedCountryContext';

import axios from "axios";
import {getDataForCountry} from "../utils/fetchCovidData";

const Dashboard = () => {
    const {selectedCountryGlobal} = useSelectedCountry();
    const [selectedCountryData, setSelectedCountryData] = useState(null);
    const pieRef = useRef(null);
    const [favorites, setFavorites] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(null);
    const token = localStorage.getItem('token');

    const {favoriteCountries, setFavoriteCountries} = useUser();

    useEffect(() => {
        getDataForCountry(selectedCountryGlobal)
            .then(data => {
                console.log('Fetched Data:', data);  // Debugging line
                setSelectedCountryData(data);
            })
            .catch(err => {
                console.error(err); // Log the error for debugging
            })
    }, [selectedCountry, selectedCountryGlobal]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:4000/userDetails', {
                    headers: {'Authorization': token}
                });
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:4000/favorites', {
                    headers: {'Authorization': token}
                });
                setFavorites(response.data);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchUserDetails();
        fetchFavorites();
    }, [token]);

    useEffect(() => {
        if (!selectedCountryData) return;

        const data = [
            {name: "Deaths", value: selectedCountryData.deaths},
            {name: "Cases", value: selectedCountryData.cases},
            {name: "Recovered", value: selectedCountryData.recovered},
        ];

        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2;
        const svgHeight = 200;

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.name))
            .range(["#C70039", "#F99417", "#186F65"]);

        const pie = d3.pie().value(d => d.value)(data);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        d3.select(pieRef.current).selectAll("*").remove();

        const svg = d3.select(pieRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", svgHeight)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + width / 2 + ")");

        svg.selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.name));

        const legend = d3.select(pieRef.current)
            .append("table")
            .style("position", "absolute")
            .style("bottom", "10px")
            .style("right", "10px")
            .selectAll("tr")
            .data(data)
            .enter()
            .append("tr");

        legend.append("td")
            .style("background-color", d => color(d.name))
            .style("width", "20px")
            .style("height", "20px");

        legend.append("td")
            .text(d => `${d.name}`);

    }, [selectedCountryData, token]);

    const handleHeartClick = async (countryName) => {
        const action = selectedCountry === countryName ? 'remove' : 'add';
        try {
            const response = await axios.post(`http://localhost:4000/favorites/${action}`, {
                country: countryName,
            }, {
                headers: {'Authorization': token}
            });
            // Update the favorites state directly with the response
            setFavorites(response.data);
            setFavoriteCountries(response.data)
            // Update selectedCountry based on the action taken
            if (action === 'add') {
                setSelectedCountry(countryName);
            } else {
                setSelectedCountry(null);
            }
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    };

    return (
        <div className="container-fluid" style={{backgroundColor: "#f4f7fc"}}>
            <div className="row">
                <div className="col-md-8">
                    <div className="card h-100" style={{boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)'}}>
                        <div className="card-header"
                             style={{backgroundColor: "#e9f0fd", color: "#333", fontWeight: "bold"}}>Worldwide Covid-19
                            Map
                        </div>
                        <div className="card-body">
                            <CovidMap onCountryClick={data => setSelectedCountryData(data)}/>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="h-50">
                        {selectedCountryData && (
                            <div className="card h-100 mb-4" style={{boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)'}}>
                                <div className="card-header"
                                     style={{backgroundColor: "#e9f0fd", color: "#333", fontWeight: "bold"}}>Country
                                    Details
                                </div>
                                <div className="card-body">
                                    <div className="position-absolute end-0 mx-2">
                                        <i
                                            className={favorites.includes(selectedCountryData.country) ? "fa-solid fa-heart fa-xl text-danger" : "fa-regular fa-heart fa-xl text-muted"}
                                            onClick={() => handleHeartClick(selectedCountryData.country)}
                                            style={{cursor: "pointer"}}
                                        ></i>

                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-center mb-4">
                                            <img
                                                src={selectedCountryData.flagImgSrc}
                                                alt={`${selectedCountryData.country} Flag`}
                                                className="img-fluid"
                                                style={{width: "100px"}}
                                            />

                                        </div>
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <td><strong>Name</strong></td>
                                                <td className="text-end">{selectedCountryData.country}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Deaths</strong></td>
                                                <td className="text-end">{selectedCountryData.deaths}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Cases</strong></td>
                                                <td className="text-end">{selectedCountryData.cases}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Recovered</strong></td>
                                                <td className="text-end">{selectedCountryData.recovered}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="h-50 mt-2">
                        <div className="card h-100" style={{boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)'}}>
                            <div className="card-header"
                                 style={{backgroundColor: "#e9f0fd", color: "#333", fontWeight: "bold"}}>Statistics
                                Overview
                            </div>
                            <div className="card-body">
                                <div ref={pieRef}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Dashboard;
