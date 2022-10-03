import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import SingleDay from './SingleDay';
import "./DailyForeCast.css"
import HourlyChart from '../Chart/HourlyChart';

const DailyForeCast = (props) => {
    const { data } = props;
    const [weekData, setWeekData] = useState([]);
    const [hourlyData, setHourlyData] = useState();
    console.log("hourlyData", hourlyData);
    let arr = ['Mon', "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", 'Mon', "Tue", "Wed", "Thu", "Fri"]
    let date = new Date();
    let day = date.getDay();
    var currDay;
    currDay = arr.slice(day, day + 8);

    useEffect(() => {
        if (data && data.coord) {
            getWeekDataAPI(data.coord.lat, data.coord.lon)
        }
    }, [data]);

    const getWeekDataAPI = async (latitude, longitude) => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&units=metric&appid=dff7179d2dae53bb6f9d7a3a5284d115`);
        const { data } = response;
        setHourlyData(data);
        if (response && response.data && response.data.daily) {
            setWeekData(response.data.daily);
        }
    };
    return (
        <div>
            <div className='main-box' >
                {weekData && weekData.map((e, id) => {
                    return <SingleDay
                        key={id}
                        id={id}
                        day={currDay[id]}
                        temp={e.temp}
                        cloud={e.weather[0].main}
                    />
                })}
            </div>
            {hourlyData && <div className='chart-style'>
                <div className='currentTempDiv'>
                    <h1 className='chart-current-temp'>{hourlyData.current.temp}</h1>
                    <img className='cloud-img' src='https://weatherapp-swanand.netlify.app/img/cloudy.ac49ed24.svg' alt='cloud'></img>
                </div>
                <HourlyChart
                    data={hourlyData.hourly}
                />
                <div className='otherForecastData'>
                    <div className='other-data'>
                        <span className='bold'>Pressure</span>
                        <span >{hourlyData.current.pressure} hpa</span>
                    </div>
                    <div className='other-data'>
                        <span className='bold'>Humidity</span>
                        <span>{hourlyData.current.humidity} %</span>
                    </div>
                </div>
                <div className='bottom-detail'>
                    <div className='sunrise'>
                        <span className='bold'>Sunrise</span>
                        <span>{new Date(Number(hourlyData.current.sunrise) * 1000).toLocaleTimeString()}</span>
                    </div>
                    <div className='sunrise'>
                        <span className='bold'>Sunset</span>
                        <span>{new Date(Number(hourlyData.current.sunset) * 1000).toLocaleTimeString()}</span>
                    </div>
                </div>
                <div className='bottom-img'>
                    <img style={{ Width: "100%" }} src="https://i.ibb.co/KX3jkQp/sunriseandset.png" alt="sunriseandset" />
                </div>
            </div>}
        </div>
    )
}
export default DailyForeCast