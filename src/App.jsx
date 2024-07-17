import { useDispatch, useSelector } from "react-redux";

import reactLogo from "./assets/react.svg";
import "./App.css";
import { decrement, increment, incrementBy } from "./store/slices/counter";
import { useEffect, useRef } from "react";

function App() {
  const { counter } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const increseByNum = useRef(0)
  useEffect(() => {
    console.log(increseByNum.current)
  }, [increseByNum]);
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <h2>count is {counter}</h2>
        <div style={{ display: "flex", flexFlow: "column", gap: "4px" }}>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <button onClick={() => dispatch(incrementBy(2))}>Increment By 2</button>
        </div>
      </div>
    </>
  );
}

export default App;
