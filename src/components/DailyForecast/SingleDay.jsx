import React, { useState } from 'react';
import "./SingleDay.css";

const SingleDay = (props) => {
  const { day, temp, cloud, id } = props;

  return (
    <div className='DailyForecastDiv'>
      <input type="radio" name="active_day" value={id} class="DailyForecastInput"></input>
      <div className='ForeCast' id={id}>
        <div style={{ fontWeight: "bold" }}>{day}</div>
        <div><span style={{fontWeight:"bold"}}>{(`${temp.min}`).split(".")[0]}<sup>° &nbsp;</sup></span>
          <span style={{ fontWeight: "bold" }}>{(`${temp.max}`).split(".")[0]}<sup>° &nbsp;</sup></span></div>
        <img src='https://weatherapp-swanand.netlify.app/img/cloudy.ac49ed24.svg' alt='cloud'></img>
        <div style={{ fontWeight: "bold" }}>{cloud}</div>
      </div>
    </div>
  )
}

export default SingleDay;