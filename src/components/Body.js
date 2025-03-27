import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
import './Body.css';

export default function Body() {
  const capitalize = (letter) => letter.charAt(0).toUpperCase() + letter.slice(1);

  const [info, setInfo] = useState({});
  const [search, setSearch] = useState("Warangal");
  const [query, setQuery] = useState("Warangal");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches = JSON.parse(sessionStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
    if (storedSearches.length > 0) {
      setSearch(storedSearches[storedSearches.length - 1].place);
      setInfo(storedSearches[storedSearches.length - 1].data);
    } else {
      updateTemp("Warangal");
    }
  }, []);

  const updateTemp = async (location = query) => {
    const url = `https://api.weatherstack.com/current?access_key=b4c3655f657b25ee5c23e2611409eebf&query=${location}`;
    
    try {
      const { data } = await axios.get(url);
      if (data.current) {
        setInfo(data.current);
        setSearch(capitalize(location));
        const formattedData = { data: data.current, place: capitalize(location) };
        
        let existingSearches = JSON.parse(sessionStorage.getItem("recentSearches")) || [];
        const existingIndex = existingSearches.findIndex(item => item.place === capitalize(location));
        if (existingIndex !== -1) {
          existingSearches[existingIndex] = formattedData;
        } else {
          existingSearches.push(formattedData);
        }
        if (existingSearches.length > 5) {
          existingSearches.shift();
        }

        sessionStorage.setItem("recentSearches", JSON.stringify(existingSearches));
        setRecentSearches(existingSearches);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark-subtle opacity-75">
        <div className="container-fluid">
          <div className="collapse navbar-collapse d-flex justify-content-between flex-wrap" id="navbarTogglerDemo03">
            <a className="navbar-brand" href="/">Weather-App</a>
            <form className="d-flex" role="search" onSubmit={(e) => { e.preventDefault(); updateTemp(); }}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div className='temp-body'>
        <h1 className='bingo text-center'>{capitalize(search)} Weather</h1>
        <div className="d-flex justify-content-center align-items-center my-3 opacity-75">
          <div className="card border-secondary mb-3 mx-3" style={{ width: "15rem", height: "15rem" }}>
            <div className="card-header text-center">Temperature</div>
            <div className="card-body text-secondary">
              <h1 className="card-title text-center">{info.temperature}&deg;C</h1>
              <p className="card-text text-center">Feels Like: {info.feelslike}&deg;C</p>
              <p className="card-text text-center">Humidity: {info.humidity}%</p>
            </div>
          </div>
          <div className="card border-secondary mb-3 mx-3" style={{ width: "15rem", height: "15rem" }}>
            <div className="card-header text-center">Wind Info</div>
            <div className="card-body text-secondary">
              <h1 className="card-title text-center">{info.wind_speed} Km/hr</h1>
              <p className="card-text text-center">Wind Direction: {info.wind_dir}</p>
              <p className="card-text text-center">Pressure: {info.pressure} hPa</p>
            </div>
          </div>
          <div className="card border-secondary mb-3 mx-3" style={{ width: "15rem", height: "15rem" }}>
            <div className="card-header text-center">Weather</div>
            <div className="card-body text-secondary text-center">
              <img src={info.weather_icons ? info.weather_icons[0] : ""} alt="weather icon" />
              <h4>{info.weather_descriptions ? info.weather_descriptions[0] : ""}</h4>
              <p>Visibility: {info.visibility} km</p>
            </div>
          </div>
        </div>
      </div>
      <Footer recentSearches={recentSearches} />
    </>
  );
}
