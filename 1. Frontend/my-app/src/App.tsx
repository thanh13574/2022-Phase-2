import './App.css';
import { useState } from "react";

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
    <div>
      <h1>Joke Databse</h1>

      <div>
        <label>Keyword/ID: </label>
        <input
          type="text"
          id="joke"
          name="entered_joke"
          onChange={(e) => setJoke(e.target.value)}
        />
        <br/>
        <label>Number of jokes: </label>
        <input
          type="int"
          id="joke_number"
          name="entered_number"
          onChange={(e) => setJokeNumber(e.target.value)}
        />
        <br/>
        <br/>
        <button onClick={search}>Search</button>
        <br/>
        <button onClick={random}>Get a Random Joke</button>
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