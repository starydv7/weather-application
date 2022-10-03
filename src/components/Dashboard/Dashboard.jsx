import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HourlyChart from '../Chart/HourlyChart';
import DailyForeCast from '../DailyForecast/DaillyForeCast';
import "./Dashboard.css";
import {arr} from "../constant"

const Dashboard = (props) => {
  const [initialSearch, setIntialSearch] = useState('Patna');
  const [data, setData] = useState([]);
  const [text, setText] = useState('Patna');
  const [cityList, setCityList] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    getWeatherDataAPI(initialSearch);
    setText(initialSearch);
  }, [initialSearch]);

  const handleChange = (e) => {
    setShowList(true);
    e.preventDefault();
    setText(e.target.value);
    locations();
  }
  const getWeatherDataAPI = async (text) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=dff7179d2dae53bb6f9d7a3a5284d115`)
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSearch = () => {
    getWeatherDataAPI(text);
    setIntialSearch('');
    setShowList(false);
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getWeatherDataAPI(text);
    }
  }
  const handleDivClick = (event) => {
    getWeatherDataAPI(text);
    setText(event);
    setShowList(false);
  }

  const locations = () => {
    if (text.trim() === '') {
      setCityList([])
    }
    else {
      let data = arr.filter(item => !item.name.toLowerCase().indexOf(text.toLowerCase()))
      let  city= data.map(item => item.name);
      setCityList(city)
    }
  }

  return (
    <div className='main-container'>
      <div >
        <span className='map-logo'> <i className="fa fa-map-marker" style={{ fontSize: "36px" }}></i></span>
        <input onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown} value={text} type="text" className='input-style'
          placeholder='Enter the City Name'
        />
        <span className='search-logo' onClick={handleSearch} ><i className="fa fa-search"></i></span>
        <div className='cities' style={{ display: showList ? "block" : "none" }}>{cityList?.map(i => <div key={i.id} onClick={() => handleDivClick(i)} className='input-style'>{i}</div>)}</div>
      </div>
      <DailyForeCast
        data={data}
      />
    </div>
  )
}

export default Dashboard