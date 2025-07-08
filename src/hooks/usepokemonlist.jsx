import { useEffect, useState } from "react";
import axios from "axios";
function  usePokemonList (url , type) {

 const [pokemonListState ,setPokemonListState] = useState({
      pokemonList: [],
      isLoading: true,
      pokedexUrl:url,
      nextUrl: '',
      prevUrl:''
    });

       async function downloadPokemons(){
    setPokemonListState((state) => ({ ...state , isLoading: true}));
    //   const response = await axios.get(setPokemonListState.pokedexUrl);
    const response = await axios.get(pokemonListState.pokedexUrl);


      const pokemonResults = response.data.results;

      console.log( response.data , response.data.next)
      setPokemonListState((state) =>( {
        ...state ,
        nextUrl:response.data.next , 
        prevUrl:response.data.previous
      }));
     

      if(type){
        setPokemonListState((state)=>({
            ...state,
            pokemonList:response.data.pokemon.slice(0 , 5)
        }))
      }
      else{

          const pokemonResultPromise = pokemonResults.map((pokemon) =>axios.get(pokemon.url));


          const pokemonData = await axios.all(pokemonResultPromise);
           console.log(pokemonData)
           const pokeListResult=(pokemonData.map((pokeData) => {
          const pokemon =pokeData.data

          return{
            id:pokemon.id,
            name :pokemon.name , 
            image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, 
               types:pokemon.types}
            }));
            setPokemonListState((state) =>({
             ...state,
             pokemonList:pokeListResult ,
             isLoading:false
              }));

            }    

        }
         

  useEffect(()=>{
      downloadPokemons()
  } , [pokemonListState.pokedexUrl]);
   return {pokemonListState , setPokemonListState }
}

export default usePokemonList