import styled from "styled-components";
import Stack from "./stack";
import Heading from "./heading";
import SectionHeading from "./sectionHeading";
import Paragraph from "./paragraph";

import FormRow from "./formRow";
import Input from "./input";
import Textarea from "./textArea";
import Button from "./button";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";
import toast from "react-hot-toast";
import SpinnerMini from "./spinnerMini";
import { MdAlternateEmail, MdPhone } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { BiMessageDetail } from "react-icons/bi";
const TitleMain = styled.div`
  color: #e5e5e5;
  font-size: 70%;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
  @media screen and (min-width: 300px) {
    font-size: 90%;
  }

  @media screen and (min-width: 490px) {
    font-size: 100%;
  }
  & > section {
    height: 50px;
    overflow: hidden;
    margin-left: 2.3rem;
    & > div {
      height: 100%;
      color: var(--color-grey-100);
    }
    & > div > h2 {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 1rem;
      padding-right: 1rem;
      color: var(--color-grey-100);
    }
    & > div > div {
      padding: 0.5rem 1rem;
      height: 100%;
      margin-bottom: 2.81rem;
      display: inline-block;
    }
    & > div:first-child {
      @keyframes text-animation {
        0% {
          margin-top: 0;
        }
        10% {
          margin-top: 0;
        }
        20% {
          margin-top: -5rem;
        }
        30% {
          margin-top: -5rem;
        }
        40% {
          margin-top: -10rem;
        }
        60% {
          margin-top: -10rem;
        }
        70% {
          margin-top: -5rem;
        }
        80% {
          margin-top: -5rem;
        }
        90% {
          margin-top: 0;
        }
        100% {
          margin-top: 0;
        }
      }

      animation: text-animation 8s infinite;
    }
    & > div > h2 {
      font-size: inherit;
    }
    & > div:first-child > h2 {
      background-color: var(--color-brand-700);
    }
    & > div:nth-child(2) > h2 {
      background-color: var(--color-blue-700);
    }
    & > div:nth-child(3) > h2 {
      background-color: var(--color-beige-700);
    }
  }
  & > h1 {
    text-shadow: 0 0 7px rgba(255, 255, 255, 0.3),
      0 0 3px rgba(255, 255, 255, 0.3);
    color: var(--color-brand-500);
    font-size: inherit;
  }
`;
const StyledResponsiveSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;

  margin-bottom: 3.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  @media screen and (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media screen and (min-width: 992px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  @media screen and (min-width: 1124px) {
    margin-left: 2rem;
    margin-right: 2rem;
  }
  @media screen and (min-width: 1200px) {
    flex-direction: row;
    gap: 4rem;
    /* align-items: center; */
  }
  & > div:first-child {
    width: 100%;

    overflow: hidden;

    @media screen and (min-width: 470px) {
      height: 300px;
    }
    @media screen and (min-width: 510px) {
      height: 350px;
    }
    @media screen and (min-width: 610px) {
      height: 400px;
    }
    @media screen and (min-width: 850px) {
      height: 500px;
    }
    @media screen and (min-width: 1050px) {
      height: 600px;
    }
    @media screen and (min-width: 1280px) {
      height: 600px;
    }
    @media screen and (min-width: 769px) {
      min-width: 60%;
    }
    & > img {
      width: 100%;
    }
  }
`;
const SocialMediaLink = styled.a`
  background-color: #fff;
  display: flex;
  color: var(--color-brand-700);

  flex-direction: row;
  gap: 2.3rem;
  align-items: center;
  padding: 0.3rem 0.5rem;
  border-bottom: 1px solid var(--color-grey-300);
  box-shadow: var(--shadow-sm);
  font-weight: 600;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    right: 45px;
    top: 50%;
    transform: translateY(-50%);
    width: 0; /* Set width to 0 for border-based arrow */
    height: 0; /* Set height to 0 for border-based arrow */
    border-left: 8px solid var(--color-brand-300); /* Left border for right arrow */
    border-top: 8px solid transparent; /* Top border for arrowhead */
    border-bottom: 8px solid transparent;
    animation: blink 1s infinite alternate;
    z-index: 1;
  }
  @keyframes blink {
    from,
    to {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const StyledAboutForm = styled.form`
  width: 100%;
  /* height: 65%; */

  /* border: 1px solid var(--color-grey-500); */
  background-color: var(--color-brand-midTransparency);
  padding: 2rem 1rem;
  border-radius: 0;
  gap: 0.7rem;
  font-size: 80%;
  max-width: 600px;
  align-self: flex-end;
  ::placeholder {
    color: #fff;
  }
  @media screen and (min-width: 500px) {
    padding: 2rem 4rem;
  }
  @media screen and (min-width: 640px) {
    align-self: center;
    font-size: 100%;
  }
  & > div {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1.3rem;
    margin-bottom: 2rem;
  }
  & textarea {
    min-height: 8rem;
    background-color: var(--color-brand-smallTransparency);
    color: white;
    &:focus {
      border-color: white;
    }
  }
  & input {
    width: 150px;
    color: white;
    background-color: transparent;
    &:focus {
      border-color: white;
    }
  }
  & button {
    width: 100%;
    margin-top: 1rem;
  }

  display: flex;
  flex-direction: column;

  & label {
    color: #fff;
    min-width: 3rem !important;
    @media screen and (min-width: 640px) {
      min-width: 110px;
    }
  }
  & textarea {
    border: none;
    outline: none;
    box-shadow: var(--shadow-md);

    min-width: unset;
    /* max-width: 600px; */
  }
`;
const IconTooltip = styled.span`
  position: absolute;
  width: 10rem;
  /* padding: 0.3rem 0.3rem; */
  text-align: center;
  color: var(--color-grey-100);
  transition: all 0.3 ease;
  font-size: 1rem;
  top: -0.5rem;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  text-transform: capitalize;
  visibility: hidden;
`;
const IconContainer = styled.div`
  cursor: pointer;
  position: relative;
  width: 3rem;
  height: 3rem;
  padding: 0.3rem;
  display: flex;

  justify-content: center;
  align-items: center;
  &:hover > ${IconTooltip} {
    visibility: visible;
  }
`;
const IconImg = styled.img`
  max-width: 100%;
  width: 100%;
`;
function SocialMediaIcon({ text, src }) {
  return (
    <IconContainer>
      <IconImg src={src} />
      <IconTooltip>{text}</IconTooltip>
    </IconContainer>
  );
}
SocialMediaIcon.propTypes = {
  text: PropTypes.string,
  src: PropTypes.string,
};
export default function About({ drawMeRef, getInTouchRef }) {
  const { windowWidth } = useWindowWidth();
  const { register, handleSubmit, formState, reset } = useForm({});
  const [isSending, setIsSending] = useState(false);
  const errors = formState.errors;
  function onSubmit() {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast.success("Your Message is sent Successully");
      reset();
    }, 1500);
  }

  return (
    <section id="about">
      <SectionHeading>The Artist</SectionHeading>
      <Stack direction="vertical" spacing="wide" justify="center">
        <TitleMain>
          <Heading as="h1">Hello 👋 I am</Heading>
          <section>
            <div>
              <Heading as="h2">Nada Kharma</Heading>
            </div>
            <div>
              <Heading as="h2"> An Artist</Heading>
            </div>

            <div>
              <Heading as="h2">A Painter</Heading>
            </div>
          </section>
        </TitleMain>
        <StyledResponsiveSection>
          <div>
            <img src="/images/about-1.webp" alt="Picture of the artist" />
          </div>
          <Stack direction="vertical">
            <div id="get-in-touch" ref={getInTouchRef}>
              <Stack direction="vertical">
                <Heading as="h3">Who Am I ?</Heading>
                <Paragraph align="left">
                  Info About the artist Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quae est dicta non expedita! Necessitatibus
                  architecto delectus, incidunt possimus perferendis, error
                  obcaecati quod, fugiat sequi vero cumque cupiditate! Eveniet,
                  inventore pariatur!
                </Paragraph>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "var(--color-beige-500)",
                    marginBottom: "1.3rem",
                  }}
                ></div>
              </Stack>
            </div>
            <Stack direction="vertical">
              <Heading as="h3">Follow</Heading>
              <Stack direction="horizental" spacing="wider">
                <SocialMediaLink
                  href="https://www.instagram.com/nadakh.art/"
                  target="_blank"
                >
                  <span> Instagram</span>
                  <SocialMediaIcon src="logos/Instagram.svg" text="Instagram" />
                </SocialMediaLink>
                <SocialMediaLink
                  href="https://www.facebook.com/nada.kh3"
                  target="_blank"
                >
                  <span> Facebook</span>
                  <SocialMediaIcon src="logos/facebook.svg" text="Facebook" />
                </SocialMediaLink>
              </Stack>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "var(--color-beige-500)",
                  marginBottom: "1.3rem",
                  marginTop: "2rem",
                }}
              ></div>
            </Stack>

            <Stack>
              <Stack direction="vertical">
                <Heading as="h3">What&apos;s Up Next?</Heading>
                <Paragraph align="left">
                  Info About the artist Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quae est dicta non expedita! Necessitatibus
                  architecto delectus, incidunt possimus perferendis, error
                  obcaecati quod, fugiat sequi vero cumque cupiditate! Eveniet,
                  inventore pariatur!
                </Paragraph>
              </Stack>
            </Stack>
          </Stack>
        </StyledResponsiveSection>
        <Stack justify="center" align="center" minwidth="100%">
          <SectionHeading>Contact Me</SectionHeading>
        </Stack>
        <div
          ref={drawMeRef}
          style={{
            width: "100%",
            backgroundImage:
              windowWidth < 640
                ? "url(/images/about-3.webp)"
                : "url(/images/about-2.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "650px",
          }}
        >
          <StyledAboutForm onSubmit={handleSubmit(onSubmit)}>
            <FormRow
              label={
                <FaCircleUser
                  style={{
                    width: "2.3rem",
                    height: "2.3rem",
                    color: "var(--color-grey-50)",
                  }}
                />
              }
              error={errors?.fullName?.message}
              errorColor={windowWidth < 640 ? "#ffb6b6" : "#a10000"}
              labelWidth="50px"
            >
              <Input
                placeholder="YOUR NAME"
                disabled={isSending}
                type="text"
                id="fullName"
                {...register("fullName", {
                  required: "this feild is required",
                })}
              />
            </FormRow>
            <FormRow
              label={
                <MdPhone
                  style={{
                    width: "2.3rem",
                    height: "2.3rem",
                    color: "var(--color-grey-50)",
                  }}
                />
              }
              error={errors?.phone?.message}
              errorColor={windowWidth < 640 ? "#ffb6b6" : "#a10000"}
              labelWidth="50px"
            >
              <Input
                placeholder="PHONE NUMBER"
                disabled={isSending}
                type="number"
                id="phone"
                {...register("phone", {
                  required: "this feild is required",
                  pattern: {
                    value:
                      /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
            </FormRow>
            <FormRow
              label={
                <MdAlternateEmail
                  style={{
                    width: "2.3rem",
                    height: "2.3rem",
                    color: "var(--color-grey-50)",
                  }}
                />
              }
              error={errors?.email?.message}
              errorColor={windowWidth < 640 ? "#ffb6b6" : "#a10000"}
              labelWidth="50px"
            >
              <Input
                placeholder="YOUR EMAIL"
                disabled={isSending}
                type="email"
                id="email"
                {...register("email", {
                  required: "this feild is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format",
                  },
                })}
              />
            </FormRow>
            <FormRow
              label={
                <BiMessageDetail
                  style={{
                    width: "2.3rem",
                    height: "2.3rem",
                    color: "var(--color-grey-50)",
                  }}
                />
              }
              error={errors?.message?.message}
              errorColor={windowWidth < 640 ? "#400000" : "#a10000"}
              labelWidth="50px"
            >
              <Textarea
                placeholder="YOUR MESSAGE"
                disabled={isSending}
                type="text"
                id="message"
                {...register("message", {
                  required: "please insert your message ",
                })}
              />
            </FormRow>
            <FormRow className="lastRow">
              <Button
                filled="filled"
                style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
              >
                {isSending ? <SpinnerMini color="#fff" /> : "send"}
              </Button>
            </FormRow>
          </StyledAboutForm>
        </div>
      </Stack>
    </section>
  );
}

About.propTypes = {
  drawMeRef: PropTypes.object,
  getInTouchRef: PropTypes.object,
};
