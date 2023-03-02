// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=ec905271e4f336ebb595d2787b3f4b5a

import React,{useState,useEffect } from 'react'
import Weathercard from '../weathercard';
import './style.css';


const Temp = () => {
  const [searchValue, setSearchValue] = useState("Aligarh")
  const [tempInfo, setTempInfo] = useState({})
  const getWeatherInfo = async() => {
    try {
      let url = ` https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=ec905271e4f336ebb595d2787b3f4b5a`
      // The $ represents the jQuery Function, and is actually a shorthand alias for jQuery. (Unlike in most languages, the $ symbol is not reserved, and may be used as a variable name.) It is typically used as a selector (i.e. a function that returns a set of elements found in the DOM). 
      const res = await fetch(url);
      const data = await res.json();
      // The keyword await is used to wait for the activity which here is a promise of fetching data from remote server. So it seems as if the function execution stops here and waits for the promise fulfilled before continuing with the execution 
        // Object Restructing 
        const {temp,humidity,pressure} = data.main;
        const {main:weathermood} = data.weather[0];
        const {name} = data;
        const {speed} = data.wind;
        const {country,sunset} = data.sys;
        const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,
          sunset,
        };
        setTempInfo(myNewWeatherInfo)
          console.log(temp);
    } catch (error) {
        console.log(error);
    }
  };
  // React Async is a promise-based library that offers a declarative API to make API calls. It provides a React component and a Hook for declarative promise resolution and data fetchin
  useEffect(() => {
     getWeatherInfo()     
  }, []) // eslint-disable-line
  
  // If ()are not involved in getWeatherInfo then this error will occur Expected an assignment or function call and instead saw an expression  no-unused-expressions 
  return (
    <>
    <div className='wrap'>
        <div className='search'>
        <input type="search"
        placeholder='search...'
        autoFocus
        id='search'
        className='searchTerm'
        value={searchValue}
        onChange ={(e)=>setSearchValue(e.target.value)} />
        {/* This is to automatically store the data entered by the user */}
        <button className='searchButton' type='button' onClick={getWeatherInfo}>
            Go
        </button>
        </div>
        </div>  
        {/* our temp card    */}
       <Weathercard tempInfo = {tempInfo}/>
    </>
  )
}

export default Temp;
