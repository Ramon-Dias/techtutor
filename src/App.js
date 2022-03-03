import React from "react";
import styled from "styled-components";
import PageIntro from "./page/PageIntro";
import PageCart from "./page/PageCart";
import PageJobCreate from "./page/PageJobCreate";
import PageJobDetail from "./page/PageJobDetail";
import PageJobList from "./page/PageJobList";
import Techtutor02 from "./img/Techtutor02.png";
import insta from "./img/insta.png";
import facebook from "./img/facebook.png";
import wpp from "./img/wpp.png";
import { createGlobalStyle } from "styled-components";

//Estilização Inicial que será aplicado para todo o App, ajuste realizado somente para ajustar os itens inicialmente.
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
  }
  input {
    width: 300px;
    margin-bottom: 12px;
  }
  select {
    width: 308px;
    margin-bottom: 12px;
  }
`;

//Estilização que será aplicado somente na classe Header.
const StyledHeader = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  height: 50px;
  padding: 10px;

  button:hover {
    color: #209b38;
  }

  button {
    height: 60px;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    background-color: transparent;
    border: none;
    padding: 40px;
  }
  img {
    height: 80px;
    padding: 10px;
  }
`;

const StyledFooter = styled.div`
  background-color: #2e2e2e;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  clear: both;
  position: relative;

  p {
    color: white;
  }

  img {
    width: 40px;
  }
`;

//Criação da classe Header para facilitar no import direto a sua classe Pai, no caso "App".
export class Header extends React.Component {
  render() {
    return (
      <StyledHeader>
        <div>
          <img src={Techtutor02} />
        </div>
        <button onClick={() => this.props.onChangePage("pageIntro")}>
          Página Inicial
        </button>
        <button onClick={() => this.props.onChangePage("pageCart")}>
          Agendamentos
        </button>
      </StyledHeader>
    );
  }
}

export class Footer extends React.Component {
  render() {
    return (
      <StyledFooter>
        <div>
          <p>Fale Conosco</p>
          <p>Email:techtutor@gmail.com</p>
        </div>
        <div>
          <img src={insta} />
          <img src={facebook} />
          <img src={wpp} />
        </div>
      </StyledFooter>
    );
  }
}

export default class App extends React.Component {
  state = {
    page: "pageIntro",
    jobDetail: "",
    cart: []
  };

  onChangePage = (page) => {
    this.setState({ page: page });
  };

  getDetailPage = (jobId) => {
    this.setState({ page: "pageJobDetail", jobDetail: jobId });
  };

  addCart = (job) => {
    const newCart = [...this.state.cart, job];
    this.setState({ cart: newCart });
    alert(`O ${job.title} foi agendado`);
  };

  removeCart = (id) => {
    if (window.confirm("Deseja excluir o elemento selecionado?")) {
      const newCart = this.state.cart.filter((element) => {
        return element.id !== id;
      });
      this.setState({ cart: newCart });
    }
  };

  clearCart = () => {
    this.setState({ cart: [] });
    alert("Obrigado por agendar nossos voluntarios!");
  };

  choosePage = () => {
    switch (this.state.page) {
      case "pageIntro":
        return <PageIntro onChangePage={this.onChangePage} />;
      case "pageJobCreate":
        return <PageJobCreate />;
      case "pageJobList":
        return (
          <PageJobList
            addCart={this.addCart}
            getDetailPage={this.getDetailPage}
          />
        );
      case "pageJobDetail":
        return (
          <PageJobDetail
            jobId={this.state.jobDetail}
            onChangePage={this.onChangePage}
          />
        );
      case "pageCart":
        return (
          <PageCart
            onChangePage={this.onChangePage}
            cart={this.state.cart}
            removeCart={this.removeCart}
            clearCart={this.clearCart}
          />
        );
      default:
        return <PageIntro onChangePage={this.onChangePage} />;
    }
  };

  render() {
    return (
      <div>
        <GlobalStyle />
        <Header onChangePage={this.onChangePage} />
        {this.choosePage()}
        <Footer onChangePage={this.onChangePage} />
      </div>
    );
  }
}
