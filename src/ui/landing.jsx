import styled from "styled-components";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Button from "./button";
import useWindowWidth from "../hooks/useWindowWidth";
import PropTypes from "prop-types";

const StyledHero = styled.div`
  max-height: calc(100vh - 60px);
  min-height: 60vh;
  @media screen and (min-width: 900px) {
    min-height: 70vh;
  }
  /* width: calc(100vw - 1.5rem); */
  max-width: 100vw;
  position: relative;
  background-color: var(--color-beige-300);

  transition: background-image 1s ease-in-out;

  display: flex;
  justify-content: space-around;
`;
const StyledHeroOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-brand-xsmallTransparency);
  @keyframes disappear {
    to {
      height: 0;
    }
  }
  animation: disappear 0.5s ease forwards;
`;
const StyledHeroIntro = styled.div`
  padding: 3rem 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* gap: 2rem; */
`;
const StyledHeadingIntroContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 80px;
  @media screen and (min-width: 500px) {
    height: 60px;
  }
  @media screen and (min-width: 640px) {
    height: 40px;
  }
`;
const HeadingIntro = styled.h3`
  /* opacity: 0; */
  position: absolute;
  /* height: 100%; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  font-size: 2rem;
  @media screen and (min-width: 900px) {
    font-size: 2.56rem;
  }
  font-weight: 600;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: var(--color-brand-700);
  text-align: center;
  @keyframes showUp {
    from {
      top: -100%;
    }
    to {
      top: 50%;
    }
  }
  animation: showUp 1s ease forwards;
`;
const StyledHeroButtonContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 60px;
  display: flex;
  justify-content: center;
`;
const StyledHeroButton = styled(Button)`
  width: 200px;
  position: absolute;
  background-color: var(--color-brand-700);
  color: white;
  border: none;
  display: inline-block;
  font-size: 1.7rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  height: 100%;
  top: 200%;
  left: 50%;
  transform: translate(-50%, -50%);
  @keyframes moveUp {
    from {
      top: 100%;
    }
    to {
      top: 50%;
    }
  }
  animation: moveUp 1s 1s ease forwards;
`;
const introTextContent = [
  { title: "Start Collecting Art", btn: "Buy Originals" },
  { title: "Explore Categories", btn: "Search Now" },
  { title: "Draw Your Thoughts", btn: "Draw Me" },
  { title: "Get In Touch", btn: "Follow Me" },
  { title: "Be Involved", btn: "Sign In" },
];
export default function Landing({ pictures, drawMeRef, getInTouchRef }) {
  const { windowWidth } = useWindowWidth();

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentDescription, setCurrentDescription] = useState(0);
  const navigate = useNavigate();
  function handleClick() {
    if (currentDescription === 0 || currentDescription === 1) {
      navigate("/artworks");
    }
    if (currentDescription === 2) {
      drawMeRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
    if (currentDescription === 3) {
      getInTouchRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (windowWidth <= 640) {
        if (currentImageIndex < pictures.length - 2) {
          setCurrentImageIndex((prevIndex) => prevIndex + 1);
        } else {
          setCurrentImageIndex(0);
        }
      }
      if (windowWidth > 640 && windowWidth <= 1124) {
        if (currentImageIndex + 4 < pictures.length - 1) {
          setCurrentImageIndex((prevIndex) => prevIndex + 2);
        } else {
          setCurrentImageIndex(0);
        }
      }
      if (windowWidth > 1124) {
        if (currentImageIndex + 6 < pictures.length - 1) {
          setCurrentImageIndex((prevIndex) => prevIndex + 3);
        } else {
          setCurrentImageIndex(0);
        }
      }

      if (currentDescription < introTextContent.length - 2) {
        setCurrentDescription((currentDescription) => currentDescription + 1);
      } else {
        setCurrentDescription(0);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, pictures.length, currentDescription, windowWidth]);

  useEffect(() => {
    const preloadImages = () => {
      const allImages = pictures.map(
        (imageUrl) => (new Image().src = imageUrl)
      );
      Promise.all(allImages).then(() => setIsLoaded(true));
    };

    preloadImages();

    // ... other useEffect logic
  }, [pictures]);

  if (!isLoaded) return <p>Loading Landing Animation</p>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {!isLoaded && <p>Loading...</p>}
      <StyledHero>
        <StyledHeroOverlay key={currentImageIndex} />
        {windowWidth > 1124 ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "33.33%",
                backgroundColor: "var(--color-beige-500)",
              }}
            >
              <div
                style={{
                  width: "90%",
                  height: "100%",
                  display: "flex",
                  overflow: "hidden",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "var(--color-grey-100)",
                  backgroundImage: `url(${pictures[currentImageIndex].src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "33.33%",
                backgroundColor: "var(--color-beige-500)",
              }}
            >
              <div
                style={{
                  width: "90%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  overflow: "hidden",
                  alignItems: "center",
                  backgroundColor: "var(--color-grey-100)",
                  backgroundImage: `url(${
                    pictures[currentImageIndex + 1].src
                  })`,
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "33.33%",
                backgroundColor: "var(--color-beige-500)",
              }}
            >
              <div
                style={{
                  width: "90%",
                  height: "100%",
                  display: "flex",
                  overflow: "hidden",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundSize: "cover",
                  backgroundColor: "var(--color-grey-100)",
                  backgroundImage: `url(${
                    pictures[currentImageIndex + 2].src
                  })`,
                }}
              ></div>
            </div>
          </>
        ) : windowWidth > 640 ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                backgroundColor: "var(--color-beige-500)",
              }}
            >
              <div
                style={{
                  width: "90%",
                  height: "100%",
                  display: "flex",
                  overflow: "hidden",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "var(--color-grey-100)",
                  backgroundImage: `url(${pictures[currentImageIndex].src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* <img
              src={pictures[currentImageIndex].src}
              style={{
                width: "90%",
                height: "90%",
              }}
            /> */}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                backgroundColor: "var(--color-beige-500)",
              }}
            >
              <div
                style={{
                  width: "90%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  overflow: "hidden",
                  alignItems: "center",
                  backgroundColor: "var(--color-grey-100)",
                  backgroundImage: `url(${
                    pictures[currentImageIndex + 1].src
                  })`,
                  backgroundSize: "cover",
                }}
              >
                {/* <img
              src={pictures[currentImageIndex + 1].src}
              style={{
                width: "90%",
               
              }}
            /> */}
              </div>
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              backgroundColor: "var(--color-beige-500)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "var(--color-grey-100)",
                backgroundImage: `url(${pictures[currentImageIndex].src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* <img
     src={pictures[currentImageIndex].src}
     style={{
       width: "90%",
       height: "90%",
     }}
   /> */}
            </div>
          </div>
        )}
      </StyledHero>
      <StyledHeroIntro key={introTextContent.at(currentDescription).title}>
        <StyledHeadingIntroContainer>
          <HeadingIntro>
            {introTextContent.at(currentDescription).title}
          </HeadingIntro>
        </StyledHeadingIntroContainer>
        <StyledHeroButtonContainer>
          <StyledHeroButton
            variation="secondary"
            size="large"
            onClick={handleClick}
          >
            {introTextContent.at(currentDescription).btn}
          </StyledHeroButton>
        </StyledHeroButtonContainer>
      </StyledHeroIntro>
    </div>
  );
}

Landing.propTypes = {
  pictures: PropTypes.array,
  drawMeRef: PropTypes.object,
  getInTouchRef: PropTypes.object,
};
