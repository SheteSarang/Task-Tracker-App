import { useState,useEffect } from "react";
import {TodoProvider} from './contexts/TodoContext'
import "./App.css";
import {  TodoItem } from "./components";
import { TodoForm } from './components';



function App() {
  const [todos,setTodos] = useState([])  //todos which are coming from the context, we are storing it in variable todos and updating it on Ui. So setTodos
  const addTodo = (todo) => {    //Now this new todo should go inside the array.
     setTodos((prev)=>[{id: Date.now(), ...todo}, ...prev])  //But if you pass todo in setTodos,like setTodo(todo),पुरानी सारी वैल्यू डिलीट हो जाएगी,और सिर्फ एक नई वैल्यू सेट हो जाएगी. So you need पुरानी state का access.Use callback function.
  }                               //Since पुरानी state-you are getting पुराना array, because todos was a array, (prev)=>[{}, ...prev] So this will add the new +prev value in array.
                                  //Date.now()-->Just a random id generated. Concept of destructuring- ...todo spreads all the properties from the todo object (like todo: "New Task", completed: false) into a new object.It’s like saying, "Take all the properties of the new todo and put them into this new object."...prev spreads all the previous todos (the old list of tasks) into the new array.It’s like saying, "Take all the tasks I already have and add them after the new one."
                                  ////बाहेर boxes of todo, open it up and add a new todo(with new ID inside that new todo.)So again the inside object-open it up.

      
      
    //   const updateTodo = (id, todo) =>{
    //   //कोन्सा ID ,कोन्सा update हो? लूप लगाओ todos array पे, आईडी मैच करलो 
    //   setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id === id ? todo : prevTodo)))
    // }
    
    const updateTodo = (id, updatedFields) => {
      setTodos((prev) =>
        prev.map((prevTodo) =>
          prevTodo.id === id ? { ...prevTodo, ...updatedFields } : prevTodo
        )
      );
    };
    const deleteTodo = (id) => {
      setTodos((prev) => prev.filter((todo)=>todo.id !== id))
    }

    const toggleComplete = (id) => {  //change the ture /false value to toggle the colour
      setTodos((prev) => prev.map((prevTodo)=> prevTodo.id===id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo ))
    }
  
    //Getting todos from local storage. After loading the app,there might be some todos already present.Since no backend nd db, we can get those from local storage
    useEffect(()=>{
      const todos = JSON.parse(localStorage.getItem("todos"))
      if(todos && todos.length>0){
          setTodos(todos)
      }
    },[])
    useEffect(()=>{
      console.log("Updated todos:", todos);
      localStorage.setItem("todos", JSON.stringify(todos))
    },[todos])
    

  return (
     <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
    
    <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4"><TodoForm /></div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>(
              <div key={todo.id} className= 'w-full'>
                  <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
      </TodoProvider>   
     
  );
}

export default App;
