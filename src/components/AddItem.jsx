import { useState } from "react";
import axios from "axios";

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


export default AddItem;