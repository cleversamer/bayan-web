import styled from "styled-components";

const Splash = () => {
  return (
    <Container>
      <Logo src="/assets/logo-min.png" alt="bayan logo" />
      <Heading>أهلاً بك في منصة بيان التعليميّة</Heading>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;
  place-items: center;
  background-color: #f7f7f7;
  animation: pulse-dot 1.75s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s;
`;

const Heading = styled.h1`
  max-width: 80vw;
  text-align: center;
  color: #26abbb;
  font-weight: 700;
  font-size: 26px;
  animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1);
  line-height: 1.6;
`;

const Logo = styled.div`
  margin-bottom: 12vh;
  width: 170px;
  height: 170px;
  object-fit: contain;
  animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
  background-image: url("/assets/logo-min.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  &:before {
    content: "";
    position: relative;
    top: -50px;
    left: -50px;
    display: block;
    width: 170%;
    height: 170%;
    box-sizing: border-box;
    border-radius: 100%;
    background-color: #01a4e9;
    animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }
`;

export default Splash;
