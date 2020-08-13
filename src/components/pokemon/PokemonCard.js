import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Sprite = styled.img`
  width: 6em;
  height: 6em;
  align-self: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
    manyRequests: false,
  };

  componentDidMount() {
    const name = this.props.name;
    const url = this.props.url;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    this.setState({
      name: name,
      imageUrl: imageUrl,
      pokemonIndex: pokemonIndex,
    });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`Pokemon/${this.state.pokemonIndex}`}>
          <div className="card">
            <h5 className="card-header"> {this.state.pokemonIndex}</h5>
            <Sprite
              class="card-img-top rounded mx-auto mt-2"
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ manyRequests: true })}
              img
              src={this.state.imageUrl}
            ></Sprite>
            <div className="card-body mx-auto">
              <h6 className="card-title">
                {this.state.name
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (letter) =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join("")}
              </h6>
            </div>
          </div>
        </StyledLink>
      </div>
    );
  }
}
