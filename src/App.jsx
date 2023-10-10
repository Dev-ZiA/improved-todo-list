import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/header";
import TodoList from "./components/TodoList"

{/*______________________________________________________________*/ }

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => { });
  }, []);

  return (
    <>
      <Header setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
}

