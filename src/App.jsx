import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";

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


{/*______________________________________________________________*/ }


const ListItem = ({ todo, setTodos }) => {

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:8000/todos/${id}`)
      .then(response => { response.json() })
      .catch(error => { console.error(error) });
    setTodos(prev => {
      return prev.filter(todo => {
        return todo.id != id;
      });
    })
  }

  const updateTodo = (todo) => {

    const newData = { ...todo, completed: !todo.completed }
    axios
      .put(`http://localhost:8000/todos/${todo.id}`, newData)
      .then(response => { response.josn })
      .catch(error => { });


    setTodos(prev => {
      return prev.map(todoObj => {
        if (todoObj.id == todo.id) {
          return { ...todoObj, completed: !todo.completed };
        } else {
          return todoObj;
        }
      });
    })
  }


  return (
    <li className={clsx({ checked: todo.completed == true })} onClick={() => updateTodo(todo)}>
      {todo.title}
      <span className="close" onClick={() => deleteTodo(todo.id)}>
        x
      </span>
    </li>
  );
};


{/*______________________________________________________________*/ }


const TodoList = ({ todos, setTodos }) => {
  let listTodos = todos.map((todo) => {
    return <ListItem key={todo.id} todo={todo} setTodos={setTodos} />;
  });

  return <ul id="myUL">{listTodos}</ul>;
};


{/*______________________________________________________________*/ }


const AddItem = ({ setTodos }) => {
  const [title, setTitle] = useState("");
  const addTodo = () => {
    if (title.trim().length > 0) {
      const todo = { title, completed: false };
      axios.post("http://localhost:8000/todos", todo).then((response) => {
        setTodos((prev) => [...prev, response.data]);
      });

      setTitle('');
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <span className="addBtn" onClick={addTodo}>
        Add
      </span>
    </>
  );
};


{/*______________________________________________________________*/ }


const Header = ({ setTodos }) => {
  return (
    <div id="myDIV" className="header">
      <h2 style={{ margin: 5 }}>My To Do List</h2>
      <AddItem setTodos={setTodos} />
    </div>
  );
};
