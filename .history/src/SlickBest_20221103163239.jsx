import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as Next } from "./backarrow1_80790.png";
import { ReactComponent as Prev } from "./nextbutton_80863.png";
import "./Carousel.css"
import Slider from 'react-slick';
import BestItem from './BestItem';
import styled from "styled-components";



const SlickBest = ({ location, history }) => {

    const [bestList, setBestList] = useState([]);




    const callAPI = async () => {
        const result = await axios.get(`/api/pboard/best`);
        setBestList(result.data);
    }


    useEffect(() => {
        callAPI();
        console.log(bestList)
    }, [])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoPlaySpeed: 500,
        nextArrow: <Div><Next/></Div>,
        prevArrow:  <DivPre><Prev/></DivPre>
    };


    if (!bestList) return <h1>로딩중</h1>

    return (
        <StyledSlider {...settings}>
            {bestList.map(bestList =>
                <BestItem key={bestList.pcode} bestList={bestList} />
            )}
        </StyledSlider>


    )
}
const StyledSlider = styled(Slider)`
  height: 260px;
  width: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    //슬라이더  컨텐츠
    cursor: pointer;
  }
`;
const Div = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 16px;
  z-index: 99;
  text-align: right;
  line-height: 30px;
`;
const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 16px;
  z-index: 99;
  text-align: left;
  line-height: 30px;
`;

export default SlickBest