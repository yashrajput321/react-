// simpleTodos.js

import {Component} from 'react'
import TodoItem from '../TodoItem/index.js'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList, // Use state to manage the list
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const filterTodoItem = todosList.filter(each => each.id !== id)
    this.setState({todosList: filterTodoItem})
  }

  render() {
    const {todosList} = this.state
    return (
      <div>
        <h1>Simple Todos</h1>
        <ul>
          {todosList.map(eachItem => (
            <TodoItem
              itemsDetails={eachItem}
              key={eachItem.id}
              deleteTodo={this.deleteTodo}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default SimpleTodos
