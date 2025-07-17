import {createSlice,nanoid} from '@reduxjs/toolkit'

const initialState = {
    todos:[{id:1,text:"Cheemu",completed:false}] //initial state with one todo
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const todo = {
                id:nanoid(),
                text:action.payload,
                completed: false  //text:action.payload ye bhi chlega because property ka name text h
            }
            state.todos.push(todo)
        },
        removeTodo:(state,action)=>{
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id) //action.payload.id se id mil rahi hai jo remove karni hai
        },
        UpdateTodo:(state,action)=>{
            const {id, text} = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = text; // Update the text of the found todo
            }
        },
        toggleTodo: (state, action) => {
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) {
            todo.completed = !todo.completed;
        }
        }
    }
})

export const {addTodo,removeTodo,UpdateTodo,toggleTodo} = todoSlice.actions

export default todoSlice.reducer