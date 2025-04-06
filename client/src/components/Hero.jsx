import React, { useEffect } from "react";

const Hero = () => {
  useEffect(() => {
    let nextDom = document.getElementById("hero-next");
    let prevDom = document.getElementById("hero-prev");
  
    let carouselDom = document.querySelector(".hero-carousel");
    let SliderDom = carouselDom.querySelector(".hero-carousel .hero-list");
    let thumbnailBorderDom = document.querySelector(".hero-carousel .hero-thumbnail");
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".hero-item");
  
    if (thumbnailItemsDom.length > 0) {
      thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    }

    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    let timeRunning = 2000;  
    let timeAutoNext = 2000; 
  
    let runTimeOut;
    
    let runNextAuto = setTimeout(() => {
      nextDom && nextDom.click();
    }, timeAutoNext);
  
    if (nextDom) {
      nextDom.onclick = function () {
        showSlider("next");
      };
    }

    if (prevDom) {
      prevDom.onclick = function () {
        showSlider("prev");
      };
    }
  
    function showSlider(type) {
      let SliderItemsDom = SliderDom.querySelectorAll(".hero-carousel .hero-list .hero-item");
      let thumbnailItemsDom = document.querySelectorAll(".hero-carousel .hero-thumbnail .hero-item");
  
      if (SliderItemsDom.length > 0 && thumbnailItemsDom.length > 0) {
        if (type === "next") {
          SliderDom.appendChild(SliderItemsDom[0]);
          thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
          carouselDom.classList.add("hero-next");
        } else {
          SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
          thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
          carouselDom.classList.add("hero-prev");
        }
      }
  
      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        nextDom && nextDom.click();
      }, timeAutoNext);

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselDom.classList.remove("hero-next");
        carouselDom.classList.remove("hero-prev");
      }, timeRunning);
    }
  }, []); // Empty dependency array to run only once after mount

  

  return (
    <div>
      <header className="hero-header"></header>
      {/* carousel */}
      <div className="hero-carousel">
        {/* list item */}
        <div className="hero-list">
          <div className="hero-item">
            <img src="Slider1.jpg" alt="Slide 1" />
            <div className="hero-content">
              <div className="hero-author">SNACKSENSE</div>
              <div className="hero-title">Scan! Analyze!</div>
              <div className="hero-topic">Eat Smart!</div>
              <div className="hero-des">
                AI-powered food insights at your fingertips! Instantly analyze
                ingredients and nutritional values to make healthier choices.
                Our real-time AI scans barcodes and detects allergens, additives,
                and dietary compatibility. Get personalized recommendations based
                on your health goals and preferences. Stay informed about what you
                eat and take control of your nutrition effortlessly. Eat smarter,
                live healthier!
              </div>
              <div className="hero-buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
          <div className="hero-item">
            <img src="Slider2.jpg" alt="Slide 2" />
            <div className="hero-content">
              <div className="hero-author">SNACKSENSE</div>
              <div className="hero-title">Scan! Analyze!</div>
              <div className="hero-topic">Eat Smart!</div>
              <div className="hero-des">
                AI-powered food insights at your fingertips! Instantly analyze
                ingredients and nutritional values to make healthier choices.
                Our real-time AI scans barcodes and detects allergens, additives,
                and dietary compatibility. Get personalized recommendations based
                on your health goals and preferences. Stay informed about what you
                eat and take control of your nutrition effortlessly. Eat smarter,
                live healthier!
              </div>
              <div className="hero-buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
          <div className="hero-item">
            <img src="Slider3.jpg" alt="Slide 3" />
            <div className="hero-content">
              <div className="hero-author">SNACKSENSE</div>
              <div className="hero-title">Scan! Analyze!</div>
              <div className="hero-topic">Eat Smart!</div>
              <div className="hero-des">
                AI-powered food insights at your fingertips! Instantly analyze
                ingredients and nutritional values to make healthier choices.
                Our real-time AI scans barcodes and detects allergens, additives,
                and dietary compatibility. Get personalized recommendations based
                on your health goals and preferences. Stay informed about what you
                eat and take control of your nutrition effortlessly. Eat smarter,
                live healthier!
              </div>
              <div className="hero-buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </div>

        {/* thumbnail */}
        <div className="hero-thumbnail">
          <div className="hero-item">
            <img src="Slider2.jpg" alt="Thumbnail 2" />
            <div className="hero-content">
              <div className="hero-title">Scan!</div>
            </div>
          </div>
          <div className="hero-item">
            <img src="Slider3.jpg" alt="Thumbnail 3" />
            <div className="hero-content">
              <div className="hero-title">Analyse!</div>
            </div>
          </div>
          <div className="hero-item">
            <img src="Slider1.jpg" alt="Thumbnail 1" />
            <div className="hero-content">
              <div className="hero-title">Eat Smart!</div>
            </div>
          </div>
        </div>

        {/* next prev */}
        <div className="hero-arrows">
          <button id="hero-prev">{"<"}</button>
          <button id="hero-next">{">"}</button>
        </div>

        {/* time running */}
        <div className="hero-time"></div>
      </div>

      <style jsx="true">{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        body {
          margin: 0;
          background-color: #000;
          color: #eee;
          font-family: Poppins;
          font-size: 12px;
        }

        a {
          text-decoration: none;
        }

        .hero-header {
          width: 1140px;
          max-width: 80%;
          margin: auto;
          height: 50px;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 100;
        }

        

        header a {
          color: #eee;
          margin-right: 40px;
        }

        /* carousel */
        .hero-carousel {
          height: 100vh;
          margin-top: -50px;
          width: 100vw;
          overflow: hidden;
          position: relative;
        }

        .hero-carousel .hero-list .hero-item {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0 0 0 0;
        }

        .hero-carousel .hero-list .hero-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-carousel .hero-list .hero-item .hero-content {
          position: absolute;
          top: 20%;
          width: 1140px;
          max-width: 80%;
          left: 50%;
          transform: translateX(-50%);
          padding-right: 30%;
          box-sizing: border-box;
          color: #fff;
          text-shadow: 0 5px 10px #0004;
        }

        .hero-carousel .hero-list .hero-item .hero-author {
          font-weight: bold;
          letter-spacing: 10px;
        }

        .hero-carousel .hero-list .hero-item .hero-title,
        .hero-carousel .hero-list .hero-item .hero-topic {
          font-size: 6em;
          font-weight: bold;
          line-height: 1.5em;
        }

        .hero-carousel .hero-list .hero-item .hero-topic {
          color: #f1683a;
        }

        .hero-carousel .hero-list .hero-item .hero-buttons {
          display: grid;
          grid-template-columns: repeat(2, 130px);
          grid-template-rows: 40px;
          gap: 5px;
          margin-top: 20px;
        }

        .hero-carousel .hero-list .hero-item .hero-buttons button {
          border: none;
          background-color: #eee;
          letter-spacing: 3px;
          font-family: Poppins;
          font-weight: 500;
        }

        .hero-carousel .hero-list .hero-item .hero-buttons button:nth-child(2) {
          background-color: transparent;
          border: 1px solid #fff;
          color: #eee;
        }

        /* thumbail */
        .hero-carousel .hero-thumbnail {
          position: absolute;
          bottom: 50px;
          left: 50%;
          width: max-content;
          z-index: 100;
          display: flex;
          gap: 20px;
        }

        .hero-carousel .hero-thumbnail .hero-item {
          width: 150px;
          height: 220px;
          flex-shrink: 0;
          position: relative;
        }

        .hero-carousel .hero-thumbnail .hero-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
        }

        .hero-carousel .hero-thumbnail .hero-item .hero-content {
          color: #fff;
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
        }

        .hero-carousel .hero-thumbnail .hero-item .hero-content .hero-title {
          font-weight: 500;
        }

        /* arrows */
        .hero-carousel .hero-arrows {
          position: absolute;
          top: 80%;
          right: 52%;
          z-index: 100;
          width: 300px;
          max-width: 30%;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .hero-carousel .hero-arrows button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #eee4;
          border: none;
          color: #fff;
          font-family: monospace;
          font-weight: bold;
          transition: 0.5s;
        }

        .hero-carousel .hero-arrows button:hover {
          background-color: #fff;
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default Hero;

