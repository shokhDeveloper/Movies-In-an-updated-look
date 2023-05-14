import "../../Settings/Slick/slick.css";
import "../../Settings/Slick/slick-theme.css";
import "../Home.css";
import React, { useCallback, useContext, useEffect } from "react";
import { Header } from "../Header";
import money from "../../Settings/assets/images/money heist1.jpg";
import jhon from "../../Settings/assets/images/jhon wick1.webp";
import ant from "../../Settings/assets/images/ant man1.jpg";
import moneys from "../../Settings/assets/images/uncharted1.jpg";
import boy from "../../Settings/assets/images/Messi.webp";
import b from "../../Settings/assets/images/B.jpg";
import Aven from "../../Settings/assets/images/Avens.jpg";
import Carusel from "react-slick";
import { Context } from "../../Settings/Context/Context";
import { Hero } from "../Hero";
import { useRef } from "react";
import { useState } from "react";
import { Audio } from "react-loader-spinner";
import { About } from "../About";
import { Avtor } from "../Avtor";
import { Donat } from "../Donat";
import { Footer } from "../Footer";
export const Home = () => {
  let array = [money, Aven, b, jhon, ant, moneys, boy];
  const { auto, crick, setCrick } = useContext(Context); 
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: auto === true ? true : false,
    speed: 2000,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    setTimeout(() => {
      setCrick(true)
    },2000)
  },[])
  return (
    <>
    <div style={{display: crick === true ? "none": "flex"}} className="loader">
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
      <main id="home" style={{display: crick ? "block": "none"}}>
      <div  className="crick">
        <div className="public_back">
          <>
            <Carusel {...settings}>
              {array?.map((item) => {
                return <img src={item} alt="" />;
              })}
            </Carusel>
          </>
        </div>
        <Header />
        <main>
          <Hero />
        </main>
      </div>
      <About/>
      <Avtor/>
      <Donat/>
      <Footer/>
      </main>
    </>
  );
};
