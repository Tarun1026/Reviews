export const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Dynamically update based on screen size
    slidesToScroll: 2,
    arrows:false,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 400, settings: { slidesToShow: 1,slidesToScroll:1 } }
    ]
    // return {settings}
    
  };
