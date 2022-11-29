import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Chart from 'react-google-charts';
import qs from 'qs';



const MySellListChart = ({ location }) => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const seller = search.seller;
    const [data, setData] = useState('');
    const chartType = useRef('Bar');
    const title = useRef('직업별인원수');

    const options = {
        title: title.current,
        lineWidth: 4,
        curveType: "function",

    };



    const callChart = async () => {
        //fetch data from db + put it in state variable
        let result = await axios.get(`/api/tradeinfo/sell/chart?seller=${seller}`);
        let array = changeData(result.data);
        setData(array);
    }

    const changeData = (result) => {
        title.current = '2022 월별 판매 총액';
        chartType.current = 'Line';

        let array = [];
        array.push(['월', '총액']);
        result.forEach(item => {
            array.push([item.month, item.payprice]);
        });
        return array;
    }


    useEffect(() => {
        callChart();
    }, [])

    return (
        <div style={{ marginTop: 100 }}>
         
                <Chart
                    chartType={chartType.current}
                    width="100%"
                    height="400px"
                    data={data}
                    options={options} />
              
        </div>
    )
}

export default MySellListChart