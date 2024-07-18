# Pasos para implementación de redux

1. Instalar redux y react-redux

### Obtenido de https://redux.js.org/tutorials/quick-start

```bash
npm install @reduxjs/toolkit react-redux
```

2. Crear el store

### En este ejemplo se importan 2 reducers, pero es a discreción de la aplicación

```javascript
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counter";
import { pokemonSlice } from "./slices/pokemon";
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    pokemons: pokemonSlice.reducer,
  },
});
```

3. Se envuelve la aplicación en el provider de redux

### El nombre de la app en este ejemplo es PokemonApp

#### Ojo: Se debe importar el store creado en el paso 2

```javascript
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PokemonApp />
    </Provider>
  </React.StrictMode>
);
```

4. Crear un slice

### En este ejemplo se crea un slice para el contador

#### Ojo: Se debe importar createSlice de @reduxjs/toolkit

#### Ojo: Con el sniped redux-slice se crea un template de slice

```javascript
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 10,
  },
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    incrementBy: (state, action) => {
      const { payload } = action;
      state.counter += payload;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, incrementBy, decrement } = counterSlice.actions;
```

5. Crear un archivo de barril

### En este ejemplo se crea un archivo index.js en la carpeta slices

#### Ojo: El objetivo de este archivo de barril es disponer de todas las actions (Reducers) en un solo archivo

```javascript
export * from "./counterSlice";
```

6. Consumir el store en un componente

### En este ejemplo se consume el store en el componente Counter

#### Ojo: Se debe importar useSelector y useDispatch de react-redux

```javascript
import { useDispatch, useSelector } from "react-redux";
```

```javascript
const { counter } = useSelector((state) => state.counter);
const dispatch = useDispatch();
```

7. Consumir las actions en un componente

### En este ejemplo se consume las actions en el componente Counter

#### Ojo: Las actions se tienen que mandar a ejecutar "NO" solo referenciarlas

```javascript
<div>
  <a href="https://react.dev" target="_blank">
    <img src={reactLogo} className="logo react" alt="React logo" />
  </a>
  <h1>Vite + React</h1>
  <div className="card">
    <h2>count is {counter}</h2>
    <div style={{ display: "flex", flexFlow: "column", gap: "4px" }}>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementBy(2))}>Increment By 2</button>
    </div>
  </div>
</div>
```

8. Thunks

### En este ejemplo se crea un thunk para obtener los pokemones

#### Ojo: Los thunks se utilizan para las acciones asincronas

```javascript
import { pokemonApi } from "../../../api/pokemonApi";
import { setPokemons, startLoadingPokemons } from "./pokemonSlice";

//! Los thunks son para partes asíncronas de la aplicación
// Este thunk es para obtener los pokemones de un api
export const getPokemons = (page = 0) => {
  return async (dispatch, getState) => {
    // Se dispara la acción de loading
    dispatch(startLoadingPokemons());
    // Se obtienen los pokemones
    const { data } = await pokemonApi.get(
      `pokemon?limit=10&offset=${page * 10}`
    );
    // Se dispara la acción de setPokemons
    dispatch(setPokemons({ pokemons: data.results, page: page + 1 }));
  };
};
```

9. Consumir el thunk en un componente

### En este ejemplo se consume el thunk en el componente PokemonList

#### Ojo: Se debe importar el thunk getPokemons

```javascript
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
```

10. RTK Query

### En este ejemplo se crea un archivo de configuración para el RTK Query

En sí, RTQ Query es una herramienta que permite hacer peticiones a un API de manera sencilla y rápida, sin embargo, requiere una buena configuración para que funcione correctamente.

Destaca principalmente en el manejo de peticiones en caché.

```javascript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    // Definiendo un custom hook para pedir todos los todos
    getTodos: builder.query({
      query: () => "/todos",
    }),
    // Definiendo un custom hook para pedir un solo todo (Por ID)
    getTodo: builder.query({
      query: (todoId) => `/todos/${todoId}`,
    }),
  }),
});

// Exportando hooks para usarlos en la aplicación
export const { useGetTodosQuery, useGetTodoQuery } = todosApi;
```

11. Consumir RTK Query en un componente

### En este ejemplo se consume RTK Query en el componente Todos

#### Ojo: Primeramente se debe incluir dentro de los store

```javascript
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counter";
import { pokemonSlice } from "./slices/pokemon";
import { todosApi } from "./apis";
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    pokemons: pokemonSlice.reducer,

    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
```

### Ojo: Luego se puede consumir en el componente

```javascript
// Importando los custom hooks
import { useGetTodoQuery, useGetTodosQuery } from "./store/apis";

// Consumiendo el custom hook para obtener todos los todos
const { data, isLoading } = useGetTodosQuery();
// Consumiento el custom hook para obtener un dato específico
const { data, isLoading } = useGetTodoQuery(todoId);
```
