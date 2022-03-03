import React from "react";
import axios from "axios";
import styled from "styled-components";
import { baseURL, headers } from "../Url/Url";

import Pessoas02 from "./imgPage/pessoas.png";

const StyledPageJobCreate = styled.div`
  height: 100vh;
  font-family: "Myriad Pro", sans-serif;
  text-align: center;
  padding-top: 10px;
  position: relative;
  top: 20px;
  color: white;
  background-color: rgb(30, 154, 54, 0.8);

  div {
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  .WhitePart {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    font-family: "Myriad Pro", sans-serif;
    color: black;
    padding-bottom: 10px;
    border-radius: 5px;
    box-shadow: 10px 10px 20px black;
  }
  img {
    border-radius: 5px;
    box-shadow: 10px 10px 20px black;
  }

  button {
    background-color: black;
    cursor: pointer;
    border: none;
    color: white;
    border-radius: 5px;
    width: 100px;
  }

  button:hover {
    background-color: white;
    border: none;
    color: #209b38;
  }
`;

export default class PageJobCreate extends React.Component {
  state = {
    title: "",
    description: "",
    price: "",
    dueDate: "",
    paymentMethods: []
  };

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  onChangePrice = (e) => {
    this.setState({ price: e.target.value });
  };

  onChangeDueDate = (e) => {
    this.setState({ dueDate: e.target.value });
  };

  onChangePaymentMethods = (e) => {
    let payment = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    this.setState({ paymentMethods: payment });
  };

  createJob = () => {
    const body = {
      title: this.state.title,
      description: this.state.description,
      price: Number(this.state.price),
      dueDate: this.state.dueDate,
      paymentMethods: this.state.paymentMethods
    };

    axios
      .post(`${baseURL}/jobs`, body, headers)
      .then(() => {
        alert(
          `A função ${this.state.title} foi criada com sucesso, aguarde um contato!`
        );
        this.setState({
          title: "",
          description: "",
          price: "",
          dueDate: "",
          paymentMethods: []
        });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  render() {
    return (
      <StyledPageJobCreate>
        <h1>Procure, encontre e sorria</h1>
        <div>
          <div Class="WhitePart">
            <h1>Cadastre-se como Tutor</h1>
            <input
              value={this.state.title}
              onChange={this.onChangeTitle}
              placeholder="Título"
            />
            <input
              value={this.state.description}
              onChange={this.onChangeDescription}
              placeholder="Descrição"
            />
            <input
              value={this.state.price}
              onChange={this.onChangePrice}
              placeholder="Preço"
              type="number"
            />
            <select
              multiple
              value={this.state.paymentMethods}
              onChange={this.onChangePaymentMethods}
            >
              <option>Cartão de Crédito</option>
              <option>Cartão de Débito</option>
              <option>Boleto Bancário</option>
              <option>PayPal</option>
              <option>Pix</option>
              <option>BTC</option>
              <option>ETH</option>
            </select>
            <input
              value={this.state.dueDate}
              onChange={this.onChangeDueDate}
              placeholder="Prazo do Serviço"
              type="date"
            />
            <button onClick={this.createJob}>Cadastrar</button>
          </div>
          <img src={Pessoas02} />
        </div>
      </StyledPageJobCreate>
    );
  }
}
