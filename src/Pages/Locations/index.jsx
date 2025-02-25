import React, { useState, useEffect } from "react";
import "./index.css";
import { CgOverflow } from "react-icons/cg";
import ProductLayout from "../../Components/ProductLayout";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const products = Array.from({ length: 30 }, (_, i) => `Product ${i + 1}`);

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("data", leads);

  useEffect(() => {
    // Fetch data from the API
    fetch(
      "https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/leads/location/"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLeads(data.Data);
        setLoading(false);

        // Set the default selected location to the first location
        if (data.Data.length > 0) {
          setSelectedLocation(data.Data[0].Location); // Set default location
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const locationsdata = leads.map((item) => item.Location);

  const selectedLocationData = leads.find(
    (location) => location.Location === selectedLocation
  );

  console.log("selected data", selectedLocationData);

  return (
    <div style={{ backgroundColor: "#F5F5F5" }} className="location">
      <div className="container-L">
        <div className="left-L">
          <input
            type="text"
            placeholder="Search locations..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="ul-L">
            {locationsdata.map((location, index) => (
              <li
                key={index}
                className={`li-L ${
                  selectedLocation === location ? "selected" : ""
                }`}
                onClick={() => setSelectedLocation(location)}
              >
                {location}
              </li>
            ))}
          </ul>
        </div>
        <div className="right-L">
          <div>
            <h2>Leads in {selectedLocation}</h2>
          </div>
          {selectedLocationData && selectedLocationData.Leads && (
            <ProductLayout products={selectedLocationData.Leads} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
