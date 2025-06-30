import {useEffect, useState } from "react"
import axios from "axios";
import './PokemonList.css';
function PokemonList()  {

    const [pokemonList,setPokemonList] =useState([]);
    const [isLoading , setIsLoading] = useState(true);
   
   async function downloadPokemons(){
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      const pokemonResults = response.data.results;
      const pokemonResultPromise = pokemonResults.map((pokemon) =>axios.get(pokemon.url));
      const pokemonData = await axios.all(pokemonResultPromise);
      console.log(pokemonData)
      setIsLoading(false);
    }
    

    useEffect( () => {
      downloadPokemons();
    },[]);


  return (
    <div className="pokemon-list-wrapper">
         <div>Pokedex List</div>
         {(isLoading) ? 'Loading....' : 'Data downloaded'}
    </div>
  )
  
}

export default PokemonList