import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import emailjs from "@emailjs/browser";
import waves from "../assets/svg/Kontakt/kontakt_waves.png";

const Kontakt = () => {
  const form = useRef();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/.test(email);
  };

  useEffect(() => {
    const hasErrors =
      name.length <= 5 ||
      !validateEmail(email) ||
      subject.length <= 3 ||
      message.length <= 10;

    setError(hasErrors);
  }, [name, email, subject, message]);

  const sendEmail = (e) => {
    e.preventDefault();
    if (
      name.length === 5 ||
      subject.length === 3 ||
      message.length === 10 ||
      !validateEmail(email)
    ) {
      setError(true);
    }

    if (name && subject && message) {
      emailjs
        .sendForm(
          "service_9ie47qv",
          "template_n0uzten",
          form.current,
          "xGIeKddPHpBg0KSt6"
        )
        .then(
          (result) => {
            console.log(result.text);
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 2000);
          },
          (error) => {
            console.log(error.text);
          }
        );
      e.target.reset();
      setError(false);
    }
  };

  return (
    <>
      <Waves src={waves} alt="waves"></Waves>
      <StyledContainer id="kontakt">
        <Wrapper>
          <Heading>KONTAKT </Heading>
          <FormContainer ref={form} onSubmit={sendEmail}>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              name="name"
            />
            {error && name.length <= 5 ? (
              <ErrorMessage>Bitte Name eingeben</ErrorMessage>
            ) : (
              ""
            )}
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="E-Mail"
              name="email"
            />
            {error && !validateEmail(email) ? (
              <ErrorMessage>Bitte vollständige Email eingeben</ErrorMessage>
            ) : (
              ""
            )}
            <input
              onChange={(e) => setSubject(e.target.value)}
              type="text"
              placeholder="Betreff"
              name="subject"
            />
            {error && subject.length <= 3 ? (
              <ErrorMessage>Bitte Betreff eingeben</ErrorMessage>
            ) : (
              ""
            )}
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              cols="30"
              rows="10"
            />
            {error && message.length <= 10 ? (
              <ErrorMessage>Bitte Nachricht eingeben</ErrorMessage>
            ) : (
              ""
            )}
            <StyledButton
              type="submit"
              style={{ backgroundColor: error ? "" : "green" }}
            >
              Nachricht senden
            </StyledButton>
          </FormContainer>
        </Wrapper>
      </StyledContainer>
      {showSuccessMessage && (
        <SuccessMessageContainer>
          <SuccessMessage>Vielen Dank für Ihre Nachricht!</SuccessMessage>
        </SuccessMessageContainer>
      )}
    </>
  );
};

export default Kontakt;

const Waves = styled.img``;

const StyledContainer = styled.div`
  background-color: rgb(92, 92, 255);
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 900px;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  margin-left: 200px;

  @media (max-width: 1000px) {
    align-self: center;
    margin: 0;
  }
`;

const Heading = styled.h1`
  font-family: Comfortaa;
  font-size: 55px;
  z-index: 100;

  @media (max-width: 480px) {
    font-size: 39px;
  }
`;

const FormContainer = styled.form`
  position: absolute;
  top: 65px;
  left: -115px;
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: auto;
  padding: 80px 40px 30px 40px;
  background-color: rgb(255, 255, 255, 0.1);
  border-radius: 60px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);

  input,
  textarea {
    padding: 10px;
    margin-bottom: 15px;
    border: none;
    border-radius: 30px;
    font-size: 16px;
    width: 100%;
    align-self: center;
  }

  @media (max-width: 550px) {
    width: 400px;
    left: -65px;
  }
  @media (max-width: 480px) {
    width: 335px;
    left: -70px;
    top: 40px;
    padding: 50px 30px 20px 30px;

    input,
    textarea {
      padding: 8px;
    }
  }
`;

const StyledButton = styled.button`
  padding: 10px;
  align-self: center;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  width: 60%;
  background-color: rgb(0, 0, 255);
  color: white;

  &:hover {
    background-color: rgb(0, 0, 255, 0.3);
  }
`;

const SuccessMessageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
  }
`;

const ErrorMessage = styled.label`
  color: rgb(0, 0, 255);
  margin: 0 0 10px 10px;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
`;
