import React, { useState, useEffect } from "react";
import "./index.css";
import { CgOverflow } from "react-icons/cg";
import ProductLayout from "../../Components/ProductLayout";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const products = Array.from({ length: 30 }, (_, i) => `Product ${i + 1}`);

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("data", leads);

  useEffect(() => {
    // Fetch data from the API
    fetch(
      "https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/leads/location/"
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

        if (data.Data.length > 0) {
          setSelectedLocation(data.Data[0].Location);
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


    const filteredLeads =
      selectedLocationData?.Leads?.filter((lead) => {
        if (filterStatus === "all") return true;
        if (filterStatus === "available") return lead.available;
        if (filterStatus === "soldout") return lead.sold_out;
        return true;
      }) || [];

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <h2>Leads in {selectedLocation}</h2>
            <div className="filter-buttons">
              <button
                className={filterStatus === "all" ? "active" : "inactive"}
                onClick={() => setFilterStatus("all")}
              >
                All
              </button>
              <button
                className={filterStatus === "available" ? "active" : "inactive"}
                onClick={() => setFilterStatus("available")}
              >
                Available
              </button>
              <button
                className={filterStatus === "soldout" ? "active" : "inactive"}
                onClick={() => setFilterStatus("soldout")}
              >
                Sold Out
              </button>
            </div>
          </div>
          {selectedLocationData && selectedLocationData.Leads && (
            <ProductLayout products={filteredLeads} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
