import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
function NewsCarousel({ news }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel 
    indicators={false}
    activeIndex={index} onSelect={handleSelect}
    className="carousel-container">
      {news.map((item, idx) => (
        <Carousel.Item key={idx}>
          <Card className="text-center" bg="secondary">
            <Card.Body>
              <Card.Title>{item.Title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.TimeAgo}
              </Card.Subtitle>
              <Card.Text>{item.Content}</Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default NewsCarousel;
