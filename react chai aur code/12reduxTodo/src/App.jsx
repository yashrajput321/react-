import AddTodo from "./components/AddTodo"
import Todos from "./components/Todos"


function App() {


  return (
    <div className="p-8 m-8 bg-gray-600 shadow-xl rounded-2xl">
        <h1 className="text-2xl text-center">Learn about Redux toolkit</h1>
        <AddTodo />
        <Todos />
    </div>
  )
}

export default App
