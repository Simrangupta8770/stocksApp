import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/Graph.module.css';
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false, // This disables server-side rendering for this component
});

function GraphStock({name}) {
    const symbol = name;
 
  const [stockData, setStockData] = useState([]);
  const [graphData, setGraphData] = useState({});

    useEffect(() => {
        const cachedGraphData = JSON.parse(localStorage.getItem('graphData'));
        if (cachedGraphData && cachedGraphData[symbol]) {
          setGraphData(cachedGraphData);
        } else {
            const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.NEXT_PUBLIC_API_KEY}`;
            //console.log(apiUrl);
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    
                    const timeSeriesData = data[`Time Series (5min)`];
                    const stData = Object.entries(timeSeriesData).map(([timestamp, values]) => ({
                        timestamp,
                        price: parseFloat(values['4. close']),
                    }));
  
                    stData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                    setGraphData((prevData) => ({
                        ...prevData,
                        [symbol]: stData,
                       
                    }));
                    
                    localStorage.setItem('graphData', JSON.stringify(graphData));
                    setStockData(stData);
                })
                .catch((error) => {
                    console.error('Error fetching stock price data:', error);
                });
        }
        
    }, []);
  
  
    return (
      <div className={styles.graph}>
      
        <Plot
          data={[
            {
              x: stockData.map((dataPoint) => dataPoint.timestamp),
              y: '$' +stockData.map((dataPoint) => dataPoint.price),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'black' },
            },
          ]}
          layout={{
            title: `${symbol} Stock Price`,
            xaxis: {
              title: 'Time',
            },
            yaxis: {
              title: 'Price (USD)',
            },
          }}
        />
      </div>
  );
}

export default GraphStock;