import styled from "styled-components";

import Heading from "../ui/heading";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
const HeroContainer = styled.div`
  max-width: 100vw;
`;
const HeroOriginalsIntro = styled.div`
  background-color: var(--color-brand-700);

  width: 100%;

  padding: 2rem 1rem;

  color: var(--color-grey-100);

  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  animation: fade-in 2s forwards;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media screen and (min-width: 350px) {
    height: 380px;
  }
  @media screen and (min-width: 600px) {
    height: 350px;
  }
`;

const IntroHeading = styled(Heading)`
  font-size: 1.7rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: bold;
  padding-left: 0.3rem;

  @media screen and(min-wdth:550px) {
    font-size: 2.3rem;
    padding-left: 0;
  }
  @media screen and(min-wdth:768px) {
    font-size: 3.5;
    padding-left: 0;
  }
  transform: translateX(-100%);

  animation: move-in 1.5s forwards;
  @keyframes move-in {
    to {
      transform: translateX(0);
    }
  }
`;
const IntroParagraph = styled(Heading)`
  letter-spacing: 2px;
  /* font-weight: bold; */
  font-size: 1.4rem;
  opacity: 0;
  padding-left: 0.3rem;
  animation: fade-in 4s forwards;
  @media screen and(min-wdth:550px) {
    font-size: 1.7rem;
  }
  @media screen and(min-wdth:768px) {
    padding-left: 0;
    font-size: 2rem;
  }
  @keyframes fade-in {
    to {
      opacity: 1;
    }
  }
`;
const IntroSpan = styled.span`
  display: inline-block;
  /* width: 10rem;
  height: 10rem; */
  padding: 0.5rem 0.8rem;
  background-color: var(--color-beige-300);
  /* border-right-radius: 3px; */
  color: var(--color-grey-700);
  transform: translateX(-${(props) => props.no * 110}%);
  animation: move-in 2s 2s forwards;
  @keyframes move-in {
    to {
      transform: translateX(0);
    }
  }
`;

export default function HeroArtworks({ categories, sizes, discounts }) {
  const introContent = [
    {
      title: "Differnt Categories",
      description: "You can explore you prefered Cateegory",
      subDescription: categories,
    },
    {
      title: "Devirse Price Range",
      description: `Prices go Between $599 to $ 3500\nwith a discount hits 20%`,
      subDescription: discounts,
    },
    {
      title: "Different Dimensions",
      description:
        "Choose Your perfect Match of a group of different dimensions ",
      subDescription: sizes,
    },
  ];
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentContentIndex(
        (prevIndex) => (prevIndex + 1) % introContent.length
      );
    }, 7000);

    return () => clearInterval(intervalId);
  }, [currentContentIndex, introContent.length]);
  return (
    <HeroContainer>
      <HeroOriginalsIntro>
        <IntroHeading as="h3" key={introContent.at(currentContentIndex).title}>
          {introContent.at(currentContentIndex).title}
        </IntroHeading>
        <IntroParagraph
          as="h4"
          key={introContent.at(currentContentIndex).description}
          color="var(--color-grey-100)"
        >
          {introContent.at(currentContentIndex).description}
        </IntroParagraph>
        <div
          color="var(--color-grey-100)"
          key={introContent.at(currentContentIndex).subDescription.at(0)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "50vw",
          }}
        >
          {introContent
            .at(currentContentIndex)
            .subDescription.map((item, i) => (
              <IntroSpan key={item} no={i + 1}>
                {item}
              </IntroSpan>
            ))}
        </div>
      </HeroOriginalsIntro>
    </HeroContainer>
  );
}

HeroArtworks.propTypes = {
  categories: PropTypes.array,
  sizes: PropTypes.array,
  discounts: PropTypes.array,
};
