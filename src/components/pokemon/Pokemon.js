import React, { Component } from "react";
import Axios from "axios";
import { ButtonToolbar, Button } from "reactstrap";

const TYPE_COLORS = {
  bug: "A8A878",
  dark: "705848",
  dragon: "7038F8",
  electric: "F8D030",
  fairy: "EE99AC",
  fighting: "C03028",
  fire: "F08030",
  flying: "A890F0",
  ghost: "705898",
  grass: "78C850",
  ground: "E0C068",
  ice: "98D8D8",
  normal: "A8A878",
  poison: "A040A0",
  psychic: "F85888",
  rock: "B8A038",
  steel: "B8B8D0",
  water: "6890F0",
};

export default class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    statTitleWidth: 3,
    statBarWidth: 9,
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
    },
    height: "",
    weight: "",
    eggGroups: "",
    abilities: "",
    themeColor: "#EF5350",
    themeSecColor: "#EF5350",
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
    const pokemonRes = await Axios.get(pokemonUrl);
    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;

    let { hp, attack, defense, speed } = "";

    pokemonRes.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        default:
          break;
      }
    });

    const height = Math.round(pokemonRes.data.height * 10 * 100) / 100;

    const weight = Math.round((pokemonRes.data.weight / 10) * 100) / 100;

    const types = pokemonRes.data.types.map((type) => type.type.name);

    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

    const themeSecColor = `#${TYPE_COLORS[types[types.length - 1]]}`;

    const abilities = pokemonRes.data.abilities
      .map((ability) => {
        return ability.ability.name
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    await Axios.get(pokemonSpeciesUrl).then((res) => {
      let description = "";
      res.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      const eggGroups = res.data["egg_groups"]
        .map((group) => {
          return group.name
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      this.setState({
        description,
        eggGroups,
      });
    });

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
      },
      themeColor,
      themeSecColor,
      height,
      weight,
      abilities,
    });
  }

  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>{this.state.pokemonIndex}</h5>
              </div>
              <div className="col-7">
                <div className="float-right">
                  {this.state.types.map((type) => (
                    <span
                      key={type}
                      className="badge badge-pill mr-1"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: "white",
                      }}
                    >
                      {type
                        .toLowerCase()
                        .split(" ")
                        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className=" col-md-4 ">
                <img
                  src={this.state.imageUrl}
                  className="card-img-top rounded mx-auto mt-2"
                />
              </div>
              <div className="col-md-5">
                <h4 className="mx-auto">
                  {this.state.name
                    .toLowerCase()
                    .split(" ")
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ")}
                </h4>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Life
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="my-style">
                      <div
                        className="my-style"
                        role="box"
                        style={{
                          width: `${this.state.stats.hp}`,
                        }}
                      >
                        <small>{this.state.stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Attack
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="my-style">
                      <div
                        className="my-style"
                        role="box"
                        style={{
                          width: `${this.state.stats.attack}`,
                          backgroundColor: `#${this.state.themeColor}`,
                        }}
                      >
                        <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Defense
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="my-style">
                      <div
                        className="my-style"
                        role="box"
                        style={{
                          width: `${this.state.stats.defense}`,
                        }}
                      >
                        <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Speed
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="my-style">
                      <div
                        className="my-style"
                        role="box"
                        style={{
                          width: `${this.state.stats.speed}`,
                          backgroundColor: `#${this.state.themeColor}`,
                        }}
                      >
                        <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">
                <p className="">{this.state.description}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-body">
            <h5 class="card-title text-center">Details</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <h6 className="float-right">Height</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.height}cm</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Weight</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.weight}kgs</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <h6 className="float-right">Type</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.eggGroups}</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Abilities</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.abilities}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
