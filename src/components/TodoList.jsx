import ListItem from "./ListItem";

const TodoList = ({ todos, setTodos }) => {
    let listTodos = todos.map((todo) => {
        return <ListItem key={todo.id} todo={todo} setTodos={setTodos} />;
    });

    return <ul id="myUL">{listTodos}</ul>;
};

export default TodoList;