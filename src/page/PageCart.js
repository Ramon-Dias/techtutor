import React from "react";
import styled from "styled-components";

const StyledCartCard = styled.div`
  border-radius: 5px;
  background-color: rgba(30, 154, 54, 0.6);
  margin: 12px;
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  button:hover {
    background-color: white;
    border: none;
    color: #209b38;
  }

  button {
    background-color: black;
    border: none;
    color: white;
    border-radius: 5px;
    width: 100px;
  }
`;

const FinalPage = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
`;

const ButtonFooter = styled.div`
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
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;
export class CartCard extends React.Component {
  render() {
    return (
      <StyledCartCard>
        <h3>{this.props.title}</h3>
        <p>R${this.props.price.toFixed(2)}</p>
        <button onClick={() => this.props.removeCart(this.props.id)}>
          Remover
        </button>
      </StyledCartCard>
    );
  }
}

export default class PageCart extends React.Component {
  render() {
    const cartItem = this.props.cart.map((element) => {
      return (
        <CartCard
          key={element.id}
          title={element.title}
          price={element.price}
          id={element.id}
          removeCart={this.props.removeCart}
        />
      );
    });

    let totalPrice = 0;

    this.props.cart.forEach((element) => {
      totalPrice += element.price;
    });

    return (
      <div>
        {cartItem.length > 0 ? (
          <div>
            {cartItem}
            <FinalPage>
              <span>Total: R${totalPrice.toFixed(2)}</span>
              <ButtonFooter>
                <button onClick={() => this.props.clearCart()}>
                  Comfirmar agendamento
                </button>
              </ButtonFooter>
              <ButtonFooter>
                <button onClick={() => this.props.onChangePage("pageJobList")}>
                  Voltar para a Lista
                </button>
              </ButtonFooter>
            </FinalPage>
          </div>
        ) : (
          <div>
            <Empty>
              <h1>Você não tem nada agendado.</h1>
            </Empty>
            <Empty>
              <ButtonFooter>
                <button onClick={() => this.props.onChangePage("pageJobList")}>
                  Voltar para a Lista
                </button>
              </ButtonFooter>
            </Empty>
          </div>
        )}
      </div>
    );
  }
}
