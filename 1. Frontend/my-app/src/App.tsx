import axios from "axios";
import { Pokemon } from "pokenode-ts";
import { SetStateAction, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";
import FBGraphAPI from "fb-graph-api";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState<null | undefined | Pokemon>(
    undefined
  );
  const FB = new FBGraphAPI({
    clientID: '794846895035501',
    clientSecret: '6f6f4edfd5093637817be22d9a71cf8d',
    appAccessToken: 'EAALS6LbUVG0BANRhnzCdSmnYHNoAihRj1MMZAsxUQ26W0XvAVsjXWNOnSw1lF9GegL4XoTsqCsmglKmjqU8Q3DtpOLLIZB0uanipZCAyzZCZBZBVKavyZCRZB4n8UZACAib7W3iFZC4mtNs8vV6eDyZCsyus7265gk4SMkB5D7IUTL1ZAoU7IMldscBa' // Optional
});


  const POKEMON_BASE_API_URL = "https://pokeapi.co/api/v2";
  return (
    <div>
      <div className="search-field">
        <h1>Pokédex Search</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="search-bar"
            className="text"
            value={pokemonName}
            onChange={(prop: { target: { value: SetStateAction<string>; }; }) => {
              setPokemonName(prop.target.value);
            }}
            label="Enter a Pokémon Name..."
            variant="outlined"
            placeholder="Search..."
            size="medium"
          />
          <Button
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
            Search
          </Button>
          
          <Button
            onClick={() => {
              FB.api(
                '/106382945508638/feed',
                'POST',
                {"message":"Testing post status#1"},
                function(response) {
                    // Insert your code here
                }
              );
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
            Search
          </Button>
          
        </div>
      </div>

      {pokemonInfo === undefined ? (
        <div></div>
      ) : (
        <div
          id="pokemon-result"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "100px 10px 0px 10px",
          }}
        >
          <Paper sx={{ backgroundColor: getBackColor(pokemonInfo) }}>
            <Grid
              container
              direction="row"
              spacing={5}
              sx={{
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box>
                  {pokemonInfo === undefined || pokemonInfo === null ? (
                    <h1> Pokemon not found</h1>
                  ) : (
                    <div>
                      <h1>
                        {pokemonInfo.name.charAt(0).toUpperCase() +
                          pokemonInfo.name.slice(1)}
                      </h1>
                      <p>
                        ID: {pokemonInfo.id}
                        <br />
                        Height: {pokemonInfo.height * 10} cm
                        <br />
                        Weight: {pokemonInfo.weight / 10} kg
                        <br />
                        Types: {getTypes()?.toString()}
                        <br />
                        Abilities: {getAbilities()?.toString()}
                      </p>
                    </div>
                  )}
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  {pokemonInfo?.sprites.other.dream_world.front_default ? (
                    <img
                      height="300px"
                      width="300px"
                      alt={pokemonInfo.name}
                      src={pokemonInfo.sprites.other.dream_world.front_default}
                    ></img>
                  ) : (
                    <Skeleton width={300} height={300} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  );

  // Credit to codingsparkles for providing the color mapping
  function getBackColor(poke: Pokemon | undefined | null) {
    let backColor = "#EEE8AA";
    if (poke === undefined || poke === null) {
      return backColor;
    }
    const pokeTypes = poke.types.map((i) => i.type.name);
    if (pokeTypes.includes("fire")) {
      backColor = "#FEC5BB";
    } else if (pokeTypes.includes("grass")) {
      backColor = "#80FFDB";
    } else if (pokeTypes.includes("water")) {
      backColor = "#DFE7FD";
    } else if (pokeTypes.includes("bug")) {
      backColor = "#B0DEA3";
    } else if (pokeTypes.includes("normal")) {
      backColor = "#E0FFFF";
    } else if (pokeTypes.includes("electric")) {
      backColor = "#D8E2DC";
    } else if (pokeTypes.includes("ground")) {
      backColor = "#FAD2E1";
    } else if (pokeTypes.includes("fairy")) {
      backColor = "#FFF1E6";
    } else if (pokeTypes.includes("ghost")) {
      backColor = "#F8EDEB";
    } else if (pokeTypes.includes("fighting")) {
      backColor = "#F1FAEE";
    } else if (pokeTypes.includes("rock")) {
      backColor = "#A8DADC";
    }
    return backColor;
  }

  function search() {
    console.log(pokemonName);
    if (pokemonName === undefined || pokemonName === "") {
      return;
    }

    axios
      .get(POKEMON_BASE_API_URL + "/pokemon/" + pokemonName?.toLowerCase())
      .then((res) => {
        setPokemonInfo(res.data);
      })
      .catch(() => {
        setPokemonInfo(null);
      });
  }

  function getTypes() {
    if (pokemonInfo !== undefined && pokemonInfo !== null) {
      return pokemonInfo.types.map((item) => item.type.name);
    }
  }

  function getAbilities() {
    if (pokemonInfo !== undefined && pokemonInfo !== null) {
      return pokemonInfo.abilities.map((ability) => ability.ability.name);
    }
  }
}

export default App;
