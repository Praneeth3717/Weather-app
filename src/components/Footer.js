import React, {useEffect, useState } from 'react'
import './Footer.css'
export default function Footer(props) {
  const[display,setdisplay]=useState([])
  useEffect(()=>{
    const tempdata=[]
    for(let i=1;i<=sessionStorage.length;i++){
      const val=JSON.parse(sessionStorage.getItem(JSON.stringify(i)))
      if(tempdata.length===0){
        tempdata.push(val)
      }
      else{
        const isDuplicate = tempdata.find((item) => item.place === val.place);
    if (!isDuplicate) {
      tempdata.push(val);
        }
      }
    }
    setdisplay(tempdata)
  },[props.alpha])
  return (
    <>
    {display.length===0?<div></div>:
    <div className='onn'>
      <h3>Recent Views:</h3>
    <div className=' alpha'>
      <table className="beta table opacity-75" >
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Cloud_pct</th>
      <th scope="col">Temp</th>
      <th scope="col">Feels_like</th>
      <th scope="col">Humidity</th>
      <th scope="col">Min_temp</th>
      <th scope="col">Max_temp</th>
      <th scope="col">Wind_speed</th>
      <th scope="col">Wind_degrees</th>
      <th scope="col">Sunrise</th>
      <th scope="col">Sunset</th>
    </tr>
  </thead>
  <tbody className="table-group-divider">
    {
      display.map((item,index)=>{
        return (
          <tr key={index}>
      <th scope="row">{item.place}</th>
      <td>{item.data.cloud_pct} %</td>
      <td>{item.data.temp}&deg;C</td>
      <td>{item.data.feels_like}&deg;C</td>
      <td>{item.data.humidity} %</td>
      <td>{item.data.min_temp}&deg;C</td>
      <td>{item.data.max_temp}&deg;C</td>
      <td>{item.data.wind_speed} km/hr</td>
      <td>{item.data.wind_degrees}&deg; </td>
      <td>{item.data.sunrise}</td>
      <td>{item.data.sunset}</td>
    </tr>
        )
      })
    }
  </tbody>
</table>
</div>
</div>
}
</>
  )
}
