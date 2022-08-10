import './App.css';
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

function App() {
  // Declare a new state variable, which we'll call "pokemonName"
  const [joke, setJoke] = useState("");
  const [jokeNumber, setJokeNumber] = useState("");

  const axios = require("axios");

  const randoms = 
  {
    method: 'GET',
    url: 'https://webknox-jokes.p.rapidapi.com/jokes/search',
    params: {
      keywords: joke,
      numJokes: jokeNumber,
      category: '',
      minRating: '0'
    },
    headers: {
      'X-RapidAPI-Key': '77f96a77ffmshbf3de61e1538fddp15ae28jsn9b5ca1a6295e',
      'X-RapidAPI-Host': 'webknox-jokes.p.rapidapi.com'
    }
  };

  const param = {
    method: 'GET',
    url: 'https://webknox-jokes.p.rapidapi.com/jokes/random',
    params: {minRating: '8', maxLength: '100'},
    headers: {
      'X-RapidAPI-Key': '77f96a77ffmshbf3de61e1538fddp15ae28jsn9b5ca1a6295e',
      'X-RapidAPI-Host': 'webknox-jokes.p.rapidapi.com'
    }
  };
  
  return (
    
    <div id = "page">
      <h1>Joke Databse</h1>
      document.getElementById("page").style.textAlign = "center";
      <div>
        <TextField
          id="search-bar"
          className="text"
          value={joke}
          onChange={(prop: any) => {
            setJoke(prop.target.value);
          }}
          label="Enter the joke keyword..."
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton
          aria-label="search"
          onClick={() => {search();}}
        >
        <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
        <br/>
        <TextField
          id="search-bar"
          className="text"
          value={jokeNumber}
          onChange={(prop: any) => {
            setJokeNumber(prop.target.value);
          }}
          label="Enter the amout of jokes..."
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        
        <IconButton
          aria-label="random"
          onClick={() => {
            random();
          }}
        >
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </div>
    </div>
    
  );

  function search() {
    //@ts-ignore
    axios.request(param).then(function (response) {
      console.log(response.data);
      document.write("Found it!");
      document.write("<br>");
      document.write("<br>");

      for(var num = 0; num < response.data.length; num++)
      {
        var number = num + 1;
        document.write(number.toString() + ". ");
        document.write("Joke ID: " + response.data[num].id + "<br>");
        document.write(" " + response.data[num].joke + "<br> <br>");
      }
      //@ts-ignore
    }).catch(function (error) {
      console.error(error);
      document.write("Joke not found");
    });
  }
  function random() {
    //@ts-ignore
    axios.request(randoms).then(function (response) {
      console.log(response.data);
      document.write("Found it!");
      document.write("<br>");
      document.write("<br>");

      for(var num = 0; num < response.data.length; num++)
      {
        var number = num + 1;
        document.write(number.toString() + ". ");
        document.write("Joke ID: " + response.data[num].id + "<br>");
        document.write(" " + response.data[num].joke + "<br> <br>");
      }
      //@ts-ignore
    }).catch(function (error) {
      console.error(error);
      document.write("Joke not found");
    });
  }
}

export default App;