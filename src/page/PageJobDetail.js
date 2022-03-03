import React from "react";
import axios from "axios";
import styled from "styled-components";
import { baseURL, headers } from "../Url/Url";
import img3 from "./imgPage/img3.png";

const StyledPageJobDetail = styled.div`
  width: 100%;
`;

const BackImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  margin-top: 20px;
  background-image: url(${img3});
  background-repeat: no-repeat;
  background-size: cover;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  width: 500px;
  height: 400px;
  border-radius: 5px;
  position: relative;
  top: 50px;
  font-family: "Myriad Pro", sans-serif;
  box-shadow: 10px 10px 20px black;

  button:hover {
    background-color: white;
    border: none;
    color: #209b38;
  }

  button {
    margin-top: 10px;
    cursor: pointer;
    background-color: black;
    border: none;
    color: white;
    border-radius: 5px;
    width: 110px;
  }
`;

export default class PageJobDetail extends React.Component {
  state = {
    job: {}
  };

  componentDidMount() {
    this.getJobs();
  }

  getJobs = () => {
    axios
      .get(`${baseURL}/jobs/${this.props.jobId}`, headers)
      .then((res) => {
        this.setState({ job: res.data });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  render() {
    const dateConverter = (date) => {
      const day = date.substring(8, 10);
      const month = date.substring(5, 7);
      const year = date.substring(0, 4);
      return `${day}/${month}/${year}`;
    };
    const paymentList =
      this.state.job.paymentMethods &&
      this.state.job.paymentMethods.map((element) => {
        return <li key={element}>{element}</li>;
      });

    return (
      <StyledPageJobDetail>
        <BackImg>
          <Box>
            {this.state.job.title && <h1>{this.state.job.title}</h1>}
            {this.state.job.price && (
              <p>Preço: R${this.state.job.price.toFixed(2)}</p>
            )}
            {this.state.job.dueDate && (
              <p>Prazo: {dateConverter(this.state.job.dueDate)}</p>
            )}
            {this.state.job.description && <p>{this.state.job.description}</p>}
            <div>{paymentList}</div>
            <button onClick={() => this.props.onChangePage("pageJobList")}>
              Voltar para lista voluntarios
            </button>
          </Box>
        </BackImg>
      </StyledPageJobDetail>
    );
  }
}
