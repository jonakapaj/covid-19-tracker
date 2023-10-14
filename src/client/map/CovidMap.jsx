import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import axios from 'axios';
import fetchGeoJsonData from "../utils/fetchGeoData";
import {fetchCovidData} from "../utils/fetchCovidData";

const getColor = (deaths) => {
    if (deaths > 30000) return "red";
    if (deaths > 20000) return "orange";
    if (deaths > 5000) return "yellow";
    return "green";
};


const CovidMap = ({onCountryClick}) => {
    const [deathData, setDeathData] = useState({});
    const svgRef = useRef(null);

    useEffect(() => {
        fetchCovidData().then(data => {
            const transformedDeathData = {};
            data.forEach(item => {
                transformedDeathData[item.country] = {
                    country: item.country,
                    deaths: item.deaths,
                    cases: item.cases,
                    recovered: item.recovered,
                    flagImgSrc: item.flagImgSrc
                };
            });
            setDeathData(transformedDeathData);
        });
    }, []);


    useEffect(() => {
        if (!Object.keys(deathData).length) return;

        // Width and height for our map
        const width = 960;
        const height = 500;

        // Create a unit projection.
        const projection = d3.geoMercator()
            .translate([width / 2, height / 2])
            .scale(150);

        // Create a path generator.
        const path = d3.geoPath().projection(projection);

        fetchGeoJsonData().then(data => {
            const countries = topojson.feature(data, data.objects.countries).features;

            d3.select(svgRef.current)
                .selectAll('path')
                .data(countries)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('fill', d => getColor(deathData[d.properties.name]?.deaths || 0))
                .attr('fill-opacity', 0.5)
                .attr('stroke', '#333')
                .attr('stroke-width', 1)
                .on('mouseover', function (d) { // Hover effect
                    d3.select(this)
                        .attr('fill-opacity', 0.8)
                        .attr('stroke-width', 2);
                })
                .on('mouseout', function (d) { // Reverting hover effect
                    d3.select(this)
                        .attr('fill-opacity', 0.5)
                        .attr('stroke-width', 1);
                })
                .on('click', function (event) {

                    const d = d3.select(this).datum();

                    if (!d || !d.properties) {
                        return;
                    }

                    const countryName = d.properties.name;
                    const countryData = deathData[countryName];
                    if (countryData) {
                        // Propagate the data to the parent
                        onCountryClick(countryData);
                    }
                });
        });
    }, [deathData, onCountryClick]);

    return (
        <div style={{margin: '5px'}}> {/* Added margin */}
            <svg ref={svgRef} style={{width: '100%', height: '80vh'}}/>
        </div>
    );
}

export default CovidMap;