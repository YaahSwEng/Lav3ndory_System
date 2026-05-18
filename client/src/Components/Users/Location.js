import React, { useState, useEffect } from "react";

import axios from "axios";

const Location = () => {

  const [ip, setIp] = useState(null);

  const [geoData, setGeoData] = useState(null);

  const API_KEY = process.env.REACT_APP_IPIFY_API_KEY;

  // fetch IP

  const fetchIpAddress = async () => {

    try {

      const response = await axios.get(

        "https://api.ipify.org?format=json"

      );

      setIp(response.data.ip);

    } catch (error) {

      console.error("Error fetching IP:", error.message);

    }

  };

  // fetch location

  const getGeoLocationData = async () => {

    if (!ip) return;

    try {

      const response = await axios.get(

        `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}&ipAddress=${ip}`

      );

      setGeoData(response.data);

    } catch (error) {

      console.error("Error fetching location:", error.message);

    }

  };

  useEffect(() => {

    fetchIpAddress();

  }, []);

  useEffect(() => {

    if (ip) {

      getGeoLocationData();

    }

  }, [ip]);

  return (
    <div className="location">

      {ip ? <p>IP: {ip}</p> : <p>Loading IP...</p>}

      {geoData ? (
        <div>
          <p>Country: {geoData.location.country}</p>
          <p>Region: {geoData.location.region}</p>
        </div>

      ) : (
        <p>Loading location...</p>

      )}
    </div>

  );

};

export default Location;
