import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "./store/slices/pokemon";

export const PokemonApp = () => {
  //Se obtienen los datos del store
  //! Para acceder a esto se tiene que especificar el state.pokemons porque así se llama en el archivo de store.js
  const { page, pokemons, isLoading } = useSelector((state) => state.pokemons);
  // Se instancia un dispatch para poder llamar a las acciones
  const dispatch = useDispatch();
  useEffect(() => {
    // Aquí se podría mandar la página pero por defecto se pone 0
    dispatch(getPokemons());
  }, []);
  return (
    <>
      <h1>Pokemon app</h1>
      <hr />
      <div>
        <p>Cargando... </p>
        {isLoading ? "True" : "False"}
      </div>
      <ul>
        {pokemons?.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>

      <button onClick={() => dispatch(getPokemons(page))} disabled={isLoading}>
        Next
      </button>
    </>
  );
};
