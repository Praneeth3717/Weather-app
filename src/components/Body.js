import { useEffect, useState } from 'react';
import Footer from './Footer';
import './Body.css'
export default function Body() {
  const captalise=(letter)=>{
    let cap=letter.charAt(0).toUpperCase()+letter.slice(1)
    return cap
  }  
  const [info,setinfo]=useState([])
  const [search,setsearch]=useState("delhi")
  const [key,setkey]=useState(0)
  const [value,setvalue]=useState({
    data:"",
    place:""
  })
  const fetched=()=>{
    return true
  }
   const updatetemp=async()=>{
     const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${search}`;
     const options = {
 	  method: 'GET',
 	  headers: {
 		  'X-RapidAPI-Key': '0f0d3b2739mshcdcc3d85102cec8p13406fjsn699fd17f21a7',
 		  'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
 	  }
 };
     let data= await fetch(url,options);
     let fdata=await data.json();
     if (!fdata.error) {
      setinfo(fdata)
      fetched()
     setvalue({data:fdata,place:captalise(search)})
     setkey(key+1)
     if(key>0){
      sessionStorage.setItem(JSON.stringify(key),JSON.stringify(value))
     }
     }
}
   useEffect(()=>{
     updatetemp();
    },[])
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark-subtle opacity-75">
  <div className="container-fluid">
    <div className="collapse navbar-collapse d-flex justify-content-between flex-wrap" id="navbarTogglerDemo03">
    <a className="navbar-brand" href="/">Weather-App</a>
      <form className="d-flex" role="search" onSubmit={(e)=>{e.preventDefault();updatetemp()}}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{setsearch(e.target.value)}}/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
<div className='temp-body'>
    <h1 className=' bingo text-center'>{captalise(search)} Weather</h1>
    <div className="fuck d-flex justify-content-center align-items-center my-3 opacity-75">
     <div className="off card border-secondary mb-3 mx-3 " style={{width:"15rem",height:"15rem"}}>
  <div className=" card-header text-center">Temperature</div>
  <div className="card-body text-secondary">
    <h1 className="card-title text-center">{info.temp}&deg;C</h1>
    <p className="card-text text-center">Min Temperature : {info.min_temp}&deg;C</p>
    <p className="card-text text-center">Max Temperature : {info.max_temp}&deg;C</p>
    <p className="card-text text-center">feels_like : {info.feels_like}&deg;C</p>
  </div>
  </div>
  <div className="off card border-secondary mb-3 mx-3" style={{width:"15rem",height:"15rem"}}>
  <div className="card-header text-center">Humidity</div>
  <div className="card-body text-secondary">
    <h1 className="card-title text-center">{info.humidity}%</h1>
    <p className="card-text text-center">cloud_pct : {info.cloud_pct}%</p>
    <p className="card-text text-center">Sunrise : {info.sunrise}</p>
    <p className="card-text text-center">Sunset : {info.sunset}</p>
  </div>
  </div>
  <div className="off card border-secondary mb-3 mx-3 " style={{width:"15rem",height:"15rem"}}>
  <div className="card-header text-center">Wind-Info</div>
  <div className="card-body text-secondary">
    <h1 className="card-title text-center">{info.wind_speed}Km/hr</h1>
    <p className="card-text text-center">Wind_degrees : {info.wind_degrees}&deg;</p>
  </div>
  </div>
  </div>
    </div>
    <Footer alpha={key} beta={value}/>
    </>
  )
}
