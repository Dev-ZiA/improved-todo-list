import { useState } from "react";
import axios from "axios";
import clsx from "clsx";

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


export default ListItem;