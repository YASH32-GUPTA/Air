import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../public/css/map.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const Map = ({ locationName }) => {
  const [coordinates, setCoordinates] = useState(null);
  const mapRef = useRef(null); // Ref to store the map instance
  const circleRef = useRef(null); // Ref to store the circle instance

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`);
        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setCoordinates({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
        } else {
          console.error(`Location '${locationName}' not found.`);
          // Set default coordinates and display a message
          setCoordinates({ latitude: 0, longitude: 0, notFound: true });
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        // Handle error
      }
    };

    fetchCoordinates();
  }, [locationName]);

  useEffect(() => {
    if (coordinates !== null) {
      // Initialize map if it hasn't been initialized yet
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([coordinates.latitude, coordinates.longitude], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapRef.current);

        if (!coordinates.notFound) {
          // Display marker with location details and bind popup
          const marker = L.marker([coordinates.latitude, coordinates.longitude]);
          marker.addTo(mapRef.current)
            .bindPopup(`<b>${locationName}</b><br>Exact Details Will Display After Booking`);
          
          // Display circle area around the location
          circleRef.current = L.circle([coordinates.latitude, coordinates.longitude], {
            color: 'gray',   
            fillColor: '#808080',
            fillOpacity: 0.5,
            radius: 1000 // Adjust radius as needed
          }).addTo(mapRef.current);
        }
      } else {
        // Update map view if coordinates change
        mapRef.current.setView([coordinates.latitude, coordinates.longitude], 13);

        if (!coordinates.notFound) {
          // Update marker with new location details and bind popup
          const marker = L.marker([coordinates.latitude, coordinates.longitude]);
          marker.addTo(mapRef.current)
            .bindPopup(`<b>${locationName}</b><br>Latitude: ${coordinates.latitude}<br>Longitude: ${coordinates.longitude}`);
          
          // Update circle area around the location
          if (circleRef.current) {
            circleRef.current.setLatLng([coordinates.latitude, coordinates.longitude]);
          } else {
            circleRef.current = L.circle([coordinates.latitude, coordinates.longitude], {
                color: 'gray',   
                fillColor: '#808080',
              fillOpacity: 0.5,
              radius: 1000 // Adjust radius as needed
            }).addTo(mapRef.current);
          }
        }
      }
    }
  }, [coordinates, locationName]);

  return <div id="map"></div>;
}

Map.propTypes = {
  locationName: PropTypes.string.isRequired
};

export { Map };
