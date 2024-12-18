import { createContext,useContext} from "react"


export const TodoContext =  createContext({
    todos:[ { id: 1,  todo: "Todo msg",  completed: false}],   //todo-an array which is containing 1 object
    theme: dark,
    addTodo: (todo) => {},
    updateTodo: (id,todo) => {},
    deleteTodo: (id) =>{},
    toggleComplete: (id) => {}
})


export const useTodo = () =>{
    return useContext(TodoContext)
} 

export const Todoprovider = TodoContext.Provider