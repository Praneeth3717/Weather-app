import React from 'react';
import './Footer.css';

export default function Footer({ recentSearches }) {
  return (
    <div className='footer'>
      {recentSearches.length === 0 ? (
        <div></div>
      ) : (
        <div className='onn'>
          <h3>Recent Searches:</h3>
          <div className='alpha'>
            <table className='beta table opacity-75'>
              <thead>
                <tr>
                  <th scope='col'>Place</th>
                  <th scope='col'>Temperature</th>
                  <th scope='col'>Feels Like</th>
                  <th scope='col'>Humidity</th>
                  <th scope='col'>Pressure</th>
                  <th scope='col'>Wind Speed</th>
                  <th scope='col'>Wind Direction</th>
                  <th scope='col'>Weather</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {recentSearches.map((item, index) => (
                  <tr key={index}>
                    <td>{item.place}</td>
                    <td>{item.data.temperature}&deg;C</td>
                    <td>{item.data.feelslike}&deg;C</td>
                    <td>{item.data.humidity}%</td>
                    <td>{item.data.pressure} hPa</td>
                    <td>{item.data.wind_speed} km/hr</td>
                    <td>{item.data.wind_dir}</td>
                    <td>{item.data.weather_descriptions[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

