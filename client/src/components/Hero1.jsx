import React, { useState, useEffect, useMemo, useRef } from "react";

const AnimatedCards = () => {
  const [activeCard, setActiveCard] = useState("Card1");
  const [scrollCount, setScrollCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const cardIds = useMemo(() => ["Card1", "Card2", "Card3"], []);

  const sectionRef = useRef(null);

  const handleCardClick = (id) => {
    setActiveCard(id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const sectionElement = sectionRef.current;

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || scrollCount >= cardIds.length) return;

    const interval = setInterval(() => {
      const currentIndex = cardIds.indexOf(activeCard);
      const nextIndex = (currentIndex + 1) % cardIds.length;
      setActiveCard(cardIds[nextIndex]);

      setScrollCount((prev) => prev + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, [isVisible, activeCard, cardIds, scrollCount]);

  return (
    <div style={styles.wrapper}>
      <div ref={sectionRef} style={styles.container}>
        {cardIds.map((cardId) => (
          <div
            key={cardId}
            onClick={() => handleCardClick(cardId)}
            style={{
              ...styles.card,
              backgroundImage: `url('${cardId}.jpg')`,
              width: activeCard === cardId ? "600px" : "80px",
              transition: "all 0.6s cubic-bezier(.28,-0.03,0,.99)",
            }}
          >
            <div style={styles.row}>
              <div style={styles.icon}>{cardId.charAt(4)}</div>
              <div
                style={{
                  ...styles.description,
                  opacity: activeCard === cardId ? 1 : 0,
                  transform: activeCard === cardId ? "translateY(0px)" : "translateY(30px)",
                }}
              >
                <h4 style={styles.heroH4}>
                  {cardId === "Card1"
                    ? "Sign in & Scan"
                    : cardId === "Card2"
                    ? "Get Instant Insights"
                    : "Smart Choices"}
                </h4>
                <p style={styles.heroP}>
                  {cardId === "Card1"
                    ? "Scan the products you wish to!"
                    : cardId === "Card2"
                    ? "The AI-powered back analysis"
                    : "Be Smarter and make Smart choices"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  heroH4: {
    textTransform: "uppercase",
    color: "white",
    marginBottom: "0px",
    fontSize: "17px",
    marginTop: "20px",
  },

  heroP: {
    color: "#b0b0ba",
    fontSize: "14px",
    marginTop: "0px", 
  },

  wrapper: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeea",
  },
  container: {
    height: "400px",
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "start",
  },
  card: {
    borderRadius: "2rem",
    backgroundSize: "cover",
    cursor: "pointer",
    overflow: "hidden",
    margin: "0 10px",
    display: "flex",
    alignItems: "flex-end",
    boxShadow: "0px 10px 30px -5px rgba(0,0,0,0.8)",


  },
  row: {
    color: "white",
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    padding: "15px",
  },
  icon: {
    background: "#223",
    color: "white",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "bold",
    marginRight: "15px",
  },
  description: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    overflow: "hidden",
    height: "80px",
    width: "520px",
    opacity: 0,
    transform: "translateY(30px)",
    transition: "all 0.3s ease-in-out",
  },
};

export default AnimatedCards;
