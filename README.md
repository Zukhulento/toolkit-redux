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
