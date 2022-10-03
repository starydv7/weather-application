import React from 'react';
import Chart from "react-apexcharts";

const HourlyChart = ({data}) => {    
    const today = new Date();
    const getTotalHour = today.getHours();
    const dailyTotalHourArray = [];
    const totalHourData = [];

    for (var i = getTotalHour; i <= getTotalHour + 12; i++) {
        dailyTotalHourArray.push(i)
    }
    for (var j = getTotalHour; j < getTotalHour + 12; j++) {
        totalHourData.push(Math.round(data[j].temp))
    }
    const tempGradient = [
        {
            name: "temp",
            data: totalHourData
        }
    ];
    const options = {
        xaxis: {
            categories: dailyTotalHourArray
        },
        dataLabels: { enabled: false }
    };
    return <Chart type="area" series={tempGradient} options={options} />;
}

export default HourlyChart