import React,{ useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId,setEditId]=useState(null)
  const [updatedtext, setUpdatedtext] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() != "") {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
      };
      console.log(newTodo.text);
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id != id);
    setTodos(updatedTodos);
  }
  const enterEditMode =(id,text)=>{
    setEditMode(true);
    setEditId(id);
    setUpdatedtext(text);
  }
  const updateTodo = (id, text) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return {
          ...todo, text: updatedtext
        };
      }
      return todo;
    });
  
    setTodos(updatedTodos);
    setEditMode(false);
    setEditId(null);
    setUpdatedtext('');
  };
  return (
    <div className="container">
      <h2>TODO List</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {editMode ? (
        <div>
          <input
            type="text"
            value={updatedtext}
            onChange={(e) => setUpdatedtext(e.target.value)}
          />
          <button onClick={updateTodo}>Update</button>
        </div>
      ) : (
        <button onClick={handleAdd}>Add</button>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button onClick={() => enterEditMode(todo.id, todo.text)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
