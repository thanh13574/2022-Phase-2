import './App.css';
import axios from 'axios';

function App() 
{
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://webknox-jokes.p.rapidapi.com/jokes/search',
  params: {
    keywords: 'kick, hard',
    numJokes: '5',
    category: 'Chuck Norris',
    minRating: '5'
  },
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'webknox-jokes.p.rapidapi.com'
  }
};

function request()
{
  axios.request(options).then(function (response: { data: any; }) 
  {
    console.log(response.data);
  }).catch(function (error: any) 
  {
    console.error(error);
  });
}
  return (
    <div className="App">
      <header className="App-header">
        
      <button onClick={request}>Search</button>

      </header>
    </div>
  );
}

export default App;
