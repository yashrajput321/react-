import { createContext,useContext } from "react";

export const TodoContext = createContext({

    todos:[
        {
            id:1,
            todo:"sample todo",
            complete:false
        }
    ],
    addTodo:(todo)=>{},
    editTodo:(id,todo)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{}
})


export const useTodo = ()=>{
    return useContext(TodoContext)
}


export const TodoProvider = TodoContext.Provider