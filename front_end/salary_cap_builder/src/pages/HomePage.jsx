import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SportsCarousel from "../components/SportCarousel";
import NewsCarousel from "../components/NewsCarousel";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      let response = await axios.get(
        "https://api.sportsdata.io/v3/nfl/scores/json/News?key=356c2cecc3f843afb9af23bfebd58732"
      );
      setNews(response.data.slice(0, 4));
    };
    fetchNews();
  }, []);
  return (
    <>
      <Header />
      <h1 style={{fontStyle:'bold'}}>LATEST NEWS</h1>
      <NewsCarousel news = {news}/>
    </>
  );
};

export default HomePage;
