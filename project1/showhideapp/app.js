import {Component} from 'react'

class ShowHide extends Component {
  state = {firstName: null, lastName: null}

  firstNameShowHide = () => {
    const {firstName} = this.state
    if (firstName === null) {
      this.setState(prev => ({firstName: 'Joe'}))
    } else {
      this.setState(prev => ({firstName: null}))
    }
  }

  lasttNameShowHide = () => {
    const {lastName} = this.state
    if (lastName === null) {
      this.setState(prev => ({lastName: 'Jonas'}))
    } else {
      this.setState(prev => ({lastName: null}))
    }
  }

  render() {
    const {firstName, lastName} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Show/Hide</h1>
        <button
          type="button"
          className="button"
          onClick={this.firstNameShowHide}
        >
          Show/Hide Firstname
        </button>
        <button
          type="button"
          className="button"
          onClick={this.lasttNameShowHide}
        >
          Show/Hide Lastname
        </button>
        <p className="firstName">{firstName}</p>
        <p className="lastName">{lastName}</p>
      </div>
    )
  }
}

export default ShowHide
