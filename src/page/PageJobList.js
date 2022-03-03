import React from "react";
import axios from "axios";
import styled from "styled-components";
import { baseURL, headers } from "../Url/Url";
import img4 from "./imgPage/img4.png";

const BackImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  margin-top: 20px;
  background-image: url(${img4});
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledJobCard = styled.div`
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 0 16px 16px 16px;
  margin: 12px;
`;
const StyledPageJobList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 20px;

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

const SpaceButton = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
`;

const StyledPageJobListFilters = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 32px 32px 0;

  h2 {
    margin: 10px;
    padding-bottom: 15px;
  }
`;

export class JobCard extends React.Component {
  render() {
    const dateConverter = (date) => {
      const day = date.substring(8, 10);
      const month = date.substring(5, 7);
      const year = date.substring(0, 4);
      return `${day}/${month}/${year}`;
    };
    return (
      <StyledJobCard>
        <h3>{this.props.job.title}</h3>
        <p>
          <b>Preço:</b> R${this.props.job.price.toFixed(2)}
        </p>
        <p>
          <b>Prazo:</b> {dateConverter(this.props.job.dueDate)}
        </p>
        <SpaceButton>
          <button onClick={() => this.props.getDetailPage(this.props.job.id)}>
            Detalhes
          </button>
        </SpaceButton>
        <SpaceButton>
          <button onClick={() => this.props.addCart(this.props.job)}>
            Agendar
          </button>
        </SpaceButton>
      </StyledJobCard>
    );
  }
}

export default class PageJobList extends React.Component {
  state = {
    jobs: [],
    jobsFiltered: [],
    minVal: "",
    maxVal: "",
    search: "",
    order: ""
  };

  componentDidMount() {
    this.getJobs();
    this.jobsFilter();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.minVal !== prevState.minVal ||
      this.state.maxVal !== prevState.maxVal ||
      this.state.search !== prevState.search ||
      this.state.order !== prevState.order
    ) {
      this.jobsFilter();
    }
  }

  onChangeMinVal = (e) => {
    this.setState({ minVal: e.target.value });
  };

  onChangeMaxVal = (e) => {
    this.setState({ maxVal: e.target.value });
  };

  onChangeSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  onChangeOrder = (e) => {
    this.setState({ order: e.target.value });
  };

  getJobs = () => {
    axios
      .get(`${baseURL}/jobs`, headers)
      .then((res) => {
        this.setState({
          jobs: res.data.jobs,
          jobsFiltered: res.data.jobs
        });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  jobsFilter = () => {
    const newJobs = this.state.jobs
      .filter((element) =>
        this.state.minVal ? element.price >= this.state.minVal : true
      )
      .filter((element) =>
        this.state.maxVal ? element.price <= this.state.maxVal : true
      )
      .filter((element) => {
        return (
          element.title.toLowerCase().includes(this.state.search) ||
          element.description.toLowerCase().includes(this.state.search)
        );
      })
      //(a,b): Padrão para ordenação, encontrado no MDN como uma função específica para o método sort quando se deseja ordenar caracteres
      .sort((a, b) => {
        switch (this.state.order) {
          case "Menor Valor":
            return a.price - b.price;
          case "Maior Valor":
            return b.price - a.price;
          case "Título":
            return a.title.localeCompare(b.title);
          case "Prazo":
            return a.dueDate.localeCompare(b.dueDate);
          default:
            return "";
        }
      });

    this.setState({ jobsFiltered: newJobs });
  };

  render() {
    const jobCard = this.state.jobsFiltered.map((element) => {
      return (
        <JobCard
          key={element.id}
          job={element}
          getDetailPage={this.props.getDetailPage}
          addCart={this.props.addCart}
        />
      );
    });

    return (
      <BackImg>
        <StyledPageJobListFilters>
          <h2>Filtro:</h2>
          <input
            value={this.state.minVal}
            onChange={this.onChangeMinVal}
            placeholder="Valor Mínimo"
          />
          <input
            value={this.state.maxVal}
            onChange={this.onChangeMaxVal}
            placeholder="Valor Máximo"
          />
          <input
            value={this.state.search}
            onChange={this.onChangeSearch}
            placeholder="Busca por título ou descrição"
            type="search"
          />
          <select value={this.state.order} onChange={this.onChangeOrder}>
            <option>Sem Ordenação</option>
            <option>Menor Valor</option>
            <option>Maior Valor</option>
            <option>Título</option>
            <option>Prazo</option>
          </select>
        </StyledPageJobListFilters>
        <StyledPageJobList>{jobCard}</StyledPageJobList>
      </BackImg>
    );
  }
}
