import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 🔥 รายการบทความเด่น
const featuredArticles = [
  {
    title: "อิชิโกะ อิชิเอะ (一期一会 ) พบกันเพียงครั้งหนึ่ง",
    category: "LIFESTYLES · SELF DEVELOPMENT",
    image: "/Slider1.jpg"
  },
  {
    title: "พ่อรวยสอนลูก",
    category: "SELF DEVELOPMENT",
    image: "/Slider2.png"
  },
  {
    title: "Good Vibes Good Life ใช้คลื่นพลังบวกดึงดูดพลังสุข",
    category: "SELF DEVELOPMENT",
    image: "/Slider3.jpg"
  }
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000
  };

  return (
    <section style={{ marginBottom: "3rem" }}>
      <Slider key={featuredArticles.length} {...settings}>
        {featuredArticles.map((item, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                filter: "brightness(0.6)"
              }}
            />

            {/* ✅ Text Overlay Block เดียว ป้องกันซ้อน */}
            <div style={styles.textOverlay}>
              <div>
                <small style={styles.category}>{item.category}</small>
                <h2 style={styles.title}>{item.title}</h2>
                <button style={styles.button}>READ MORE</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

const styles = {
  textOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    textAlign: "center",
    width: "90%",
    maxWidth: "700px",
    padding: "1rem",
    zIndex: 10,
    lineHeight: 1.5
  },
  category: {
    fontSize: "0.75rem",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    opacity: 0.8,
    marginBottom: "0.75rem",
    display: "block"
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
    textShadow: "0 2px 4px rgba(0,0,0,0.4)",
    lineHeight: 1.4
  },
  button: {
    padding: "0.5rem 1.5rem",
    border: "1px solid #fff",
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "0.85rem",
    letterSpacing: "1px",
    cursor: "pointer",
    transition: "all 0.3s",
    textTransform: "uppercase"
  }
};

export default HeroSlider;
