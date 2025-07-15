import { useState } from "react"
import { TodoProvider } from "./contexts"
import { useEffect } from "react"
import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"
import { useTheme } from "./hooks/useTheme"


function App() {

  
  const systemTheme =  (window.matchMedia('(prefers-color-scheme: dark)').matches)?"dark":"light"
  const [theme, setTheme] = useState(systemTheme);
  const [todos,setTodo] = useState([])

  const addTodo = (todo) => {
  setTodo((prev) => [
    { id: Date.now(), ...todo, complete: false }, // ✅ force complete flag
    ...prev,
  ]);
};


  const editTodo=(id,todo)=>{
    setTodo((prev)=>prev.map((prevTodo)=>prevTodo.id===id?todo:prevTodo))
  }

  const deleteTodo=(id)=>{
    setTodo((prev)=>prev.filter((prevTodo)=>prevTodo.id!=id))
  }

  const toggleComplete=(id)=>{
    setTodo((prev)=>prev.map((prevTodo)=>prevTodo.id===id?{...prevTodo,complete:!prevTodo.complete}:prevTodo))
  }

  // local Storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodo(todos)
    }
  }, [])



  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  
  useEffect(() => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
}, [theme]);


  return (
    <TodoProvider value={{todos,addTodo,editTodo,deleteTodo,toggleComplete}}>
      <div className="bg-white dark:bg-[#172842] min-h-screen py-8 transition-colors duration-300">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-black dark:text-white transition-colors duration-300">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <button className="border bg-gray-200 dark:bg-gray-700 dark:text-white text-black m-2 px-4 py-2 rounded-lg" onClick={() => setTheme('light')}>Light Mode</button>
                    <button className="border bg-gray-800 dark:bg-gray-100 dark:text-black text-white m-2 px-4 py-2 rounded-lg" onClick={() => setTheme('dark')}>Dark Mode</button>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className="w-full">
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
