import AddItem from "./AddItem";


const Header = ({ setTodos }) => {
    return (
        <div id="myDIV" className="header">
            <h2 style={{ margin: 5 }}>My To Do List</h2>
            <AddItem setTodos={setTodos} />
        </div>
    );
};

export default Header;