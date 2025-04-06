import React from 'react';

const Banner = () => {
  return (
    <>
      <style>
        {`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: #D2D2D2;
            background-image:
            repeating-linear-gradient(
                to right, transparent 0 100px,
                #25283b22 100px 101px
            ),
            repeating-linear-gradient(
                to bottom, transparent 0 100px,
                #25283b22 100px 101px
            );
        }

        body::before {
            position: absolute;
            width: min(1400px, 90vw);
            top: 10%;
            left: 50%;
            height: 90%;
            transform: translateX(-50%);
            content: '';
            background-image: url(images/bg.png);
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: top center;
            pointer-events: none;
        }

        .banner {
            width: 100%;
            height: 100vh;
            text-align: center;
            overflow: hidden;
            position: relative;
        }

        .banner .slider {
            position: absolute;
            width: 200px;
            height: 250px;
            top: 10%;
            left: calc(50% - 100px);
            transform-style: preserve-3d;
            transform: perspective(1000px);
            animation: autoRun 40s linear infinite; /* Slower speed */
            z-index: 2;
        }

        @keyframes autoRun {
            from {
                transform: perspective(1000px) rotateX(360deg) rotateY(0deg);
            }

            to {
                transform: perspective(1000px) rotateX(360deg) rotateY(360deg);
            }
        }

        .banner .slider .item {
            position: absolute;
            inset: 0 0 0 0;
            transform:
                rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
                translateZ(250px); /* Reduced distance between cards */
        }

        .banner .slider .item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .banner .content {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: min(1400px, 100vw);
            height: max-content;
            padding-bottom: 100px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            z-index: 1;
        }

        .banner .content h1 {
            font-family: 'ICA Rubrik';
            font-size: 5em;
            line-height: 1em;
            color: #39FF14;
            position: relative;
            text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.6);
        }

        .banner .content h1::after {
            position: absolute;
            inset: 0 0 0 0;
            content: attr(data-content);
            z-index: 2;
            -webkit-text-stroke: 3px #d2d2d2;
            color: transparent;
        }

        .banner .content h2 {
            font-size: 2em;
            color: #39FF14;
        }

        .banner .content .author {
            font-family: Poppins;
            text-align: right;
            max-width: 300px;
        }

        .banner .content .author p {
            font-size: 1.2em;
            color: #39FF14;
            text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.6);
        }

        .banner .content .model {
            width: 100%;
            height: 75vh;
            position: absolute;
            bottom: 0;
            left: 0;
            background-size: auto 130%;
            background-repeat: no-repeat;
            background-position: top center;
            z-index: 1;
        }

        .banner .content .snacksense-logo {
            font-family: 'ICA Rubrik';
            font-size: 3em;
            color: #39FF14;
            margin-bottom: 15px;
        }

        @media screen and (max-width: 1023px) {
            .banner .slider {
                width: 160px;
                height: 200px;
                left: calc(50% - 80px);
            }

            .banner .slider .item {
                transform:
                    rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
                    translateZ(150px); /* Reduced distance between cards */
            }

            .banner .content h1 {
                text-align: center;
                width: 100%;
                text-shadow: 0 10px 20px #000;
                font-size: 7em;
            }

            .banner .content .author {
                color: #fff;
                padding: 20px;
                text-shadow: 0 10px 20px #000;
                z-index: 2;
                max-width: unset;
                width: 100%;
                text-align: center;
                padding: 0 30px;
            }
        }

        @media screen and (max-width: 767px) {
            .banner .slider {
                width: 100px;
                height: 150px;
                left: calc(50% - 50px);
            }

            .banner .slider .item {
                transform:
                    rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
                    translateZ(120px); /* Reduced distance between cards */
            }

            .banner .content h1 {
                font-size: 5em;
            }
        }
        `}
      </style>

      <div className="banner">
        <div className="slider" style={{ '--quantity': 5 }}>
          <div className="item" style={{ '--position': 1 }}>
            <img src="images/dragon_3.jpg" alt="dragon_3" />
          </div>
          <div className="item" style={{ '--position': 2 }}>
            <img src="images/dragon_4.jpg" alt="dragon_4" />
          </div>
          <div className="item" style={{ '--position': 3 }}>
            <img src="images/dragon_5.jpg" alt="dragon_5" />
          </div>
          <div className="item" style={{ '--position': 4 }}>
            <img src="images/dragon_1.jpg" alt="dragon_1" />
          </div>
          <div className="item" style={{ '--position': 5 }}>
            <img src="images/dragon_2.jpg" alt="dragon_2" />
          </div>
        </div>

        <div className="content">
          <div className="snacksense-logo">
            SNACKSENSE
          </div>
          <h1 data-content="AI-powered snack insights at your fingertips!">AI-powered snack insights at your fingertips!</h1>
          <div className="author">
            <h2>LUN DEV</h2>
            <p><b>Web Design</b></p>
            <p>Subscribe to the channel to watch many interesting videos</p>
          </div>
          <div className="model"></div>
        </div>
      </div>
    </>
  );
};

export default Banner;
