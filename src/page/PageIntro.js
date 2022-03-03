import React from "react";
import styled from "styled-components";
import img2 from "./imgPage/img2.png";

const StyledPageIntro = styled.div`
  width: 100%;
`;

const FirstPart = styled.div`
  width: 100%;
  height: 90vh;
  background-image: url(${img2});
  background-repeat: no-repeat;
  background-size: cover;
`;

const GreenPart = styled.div`
  background-color: rgb(30, 154, 54, 0.8);
  width: 100%;
  height: 200px;
  padding-top: 10px;
  color: white;
  font-family: "Myriad Pro", sans-serif;
  text-align: center;

  p {
  }
`;

const Box = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  width: 400px;
  height: 160px;
  border-radius: 5px;
  position: relative;
  top: 240px;
  left: 70px;
  font-family: "Myriad Pro", sans-serif;
  box-shadow: 10px 10px 20px black;

  h1 {
    padding: 10px;
  }

  p {
    padding: 10px;
    position: relative;
    top: -40px;
    left: 0px;
    font-size: 20px;
  }

  button:hover {
    background-color: white;
    border: none;
    color: #209b38;
  }

  button {
    background-color: black;
    cursor: pointer;
    border: none;
    color: white;
    border-radius: 5px;
    width: 100px;
  }

  .button1 {
    position: relative;
    top: -50px;
    left: 50px;
  }

  .button2 {
    position: relative;
    top: -50px;
    left: 90px;
  }
`;

export default class PageIntro extends React.Component {
  render() {
    return (
      <StyledPageIntro>
        <FirstPart>
          <Box>
            <div>
              <h1>Encontre um instrutor</h1>
              <p>Temos vários instrutores a sua disposição para te ajudar. </p>
              <button
                class="button1"
                onClick={() => this.props.onChangePage("pageJobCreate")}
              >
                Quero ser um instrutor
              </button>
              <button
                class="button2"
                onClick={() => this.props.onChangePage("pageJobList")}
              >
                Contratar um instrutor
              </button>
            </div>
          </Box>
        </FirstPart>
        <GreenPart>
          <h1>Voluntários TechTutor</h1>
          <p>
            Os voluntários do TECHTUTOR doam seu tempo para que outras pessoas
            possam se sentir acolhidas no mundo da tecnologia, essa sinergia é a
            que transforma nossa rede do bem. Possuímos diversos voluntários que
            podem lhe ajudar lhe ajudar ao alcance de um clique, por que a nossa
            missão é democratizar a tecnologia. Procure, encontre e sorria!
          </p>
        </GreenPart>
      </StyledPageIntro>
    );
  }
}
