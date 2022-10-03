import React, { useEffect, useState } from "react";
import "./modal.css";
import { UilMinusSquare } from "@iconscout/react-unicons";
//install react-chartjs-2, npm install --save chart.js react-chartjs-2
//install moment for time data, npm install moment --save
//The parser converts an HTML string to one or more React elements.
import parse from "html-react-parser";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  SubTitle,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Modal = (props) => {
  //   const [historicalData, setHistoricalData] = useState([]);
  const [chartOptions, setChartOptions] = useState();
  const [chartData, setChartData] = useState(undefined);
  const [coinDetails, setCoinDetails] = useState();
  const [day, setDay] = useState("7");
  const [loading, setLoading] = useState(false);

  //=========================================================
  //==================== Chart Data API =====================
  //=== fetching chart data from useEffect(props.openModalDetails) ===
  const fetchChartData = async (item) => {
    console.log(item);

    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${item}/market_chart?vs_currency=usd&days=${day}`
    );
    const data = await res.json();
    console.log(data.prices);

    //================= Coin Description API ==================
    // === fetching coin description data from useEffect() =====
    const resCoinDescription = await fetch(
      `https://api.coingecko.com/api/v3/coins/${item}?community_data=true&developer_data=true`
    );
    const dataCoinDescription = await resCoinDescription.json();
    setCoinDetails(dataCoinDescription);
    console.log(dataCoinDescription.description.en);

    //=========================================================
    //=== convert array into x(time) and y(value) key-value pairs ===
    const coinChartData = data.prices.map((item) => {
      return {
        x: item[0],
        y: item[1],
      };
    });
    console.log(coinChartData);
    // setHistoricalData(coinChartData);

    //=========================================================
    //=============== Format the data (object) ================
    //==== into acceptable format of chart.js (Area chart) ====
    const formattedData = {
      labels: coinChartData.map((item) => {
        //format the x key (timestamp) into mmm dd
        if (day === "7") {
          return moment(item.x).format("MMM DD");
        } else {
          return moment(item.x).format("h:mm a");
        }
      }),
      datasets: [
        {
          fill: true,
          label: `Price over past ${day} day(s)`,
          data: coinChartData.map((item) => item.y),
          // borderColor: "rgb(78, 43, 255, 0.6)",
          borderColor: "rgb(255, 215, 0)",
          backgroundColor: "rgb(0, 0, 0, 0.2)",
        },
      ],
    };

    console.log(formattedData);
    setChartData(formattedData);
  };

  //=========================================================
  //========== Run fetchChartData with item.id ==============
  useEffect(() => {
    setLoading(true);
    if (!props.openModalDetails) return null;
    //==== watchlist data's item.id from WatchList ====
    fetchChartData(props.openModalDetails);
  }, [props.openModalDetails, day]);

  console.log(coinDetails);
  //===================== Chart Options ======================
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    elements: {
      point: {
        radius: 2,
      },
    },
  };

  //===================== Handle Day choices ======================
  function handleDays(x) {
    setDay(x);
  }
  console.log(day);
  //================================================================

  if (!props.openModal) return null;

  return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="modalTop">
          <div className="modalTop-left">
            <img
              className="coin-details-image"
              src={props.coinDetails.image.large}
            />
          </div>
          <div className="modalTop-right">
            {/* <p onClick={props.closeModal} className="closeBtn">
              X
            </p> */}
            <UilMinusSquare
              onClick={props.closeModal}
              className="closeBtn"
            ></UilMinusSquare>
            <div className="coin-details-header2">
              <h3 className="coin-details-header">{props.coinDetails.name}</h3>
            </div>
            {coinDetails && (
              <p className="coin-description">
                {parse(coinDetails.description.en.split(". ")[0])}
                <br />
                <br />
                {parse(coinDetails.description.en.split(". ")[1])}
              </p>
            )}
          </div>
        </div>
        <div className="modalBottom">
          <div className="day-button-box">
            <button className="day-button" onClick={() => handleDays("1")}>
              1 Day
            </button>
            <button className="day-button" onClick={() => handleDays("7")}>
              7 Days
            </button>
          </div>
          {/* to use chart.js <Line>, provide options and data */}
          {/* chartData must not be undefined */}
          {chartData && <Line options={options} data={chartData} />}
        </div>
      </div>
    </div>
  );
  //   <div>{fetchChartData(props.openModalDetails)}</div>
};

export default Modal;
