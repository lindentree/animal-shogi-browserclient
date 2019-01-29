import React from 'react';
import axios from 'axios';

class UsersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                   firstName: '',
                   lastName: '',
                  
                           };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleInputChange(event) {
    const value = target.type === 'number' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  handleSubmit(event) {
    let formData = event.target.value;
    axios.post('/rsvps', )
      .done((data) => {

      })
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit} method="post">
        <div>
          <label for="name">Player One:</label>
          <input type="text" id="firstname" name="firstName" value={this.state.firstName} onChange={this.handleInputChange}/>
        </div>
        <div>
          <label for="name">Player Two:</label>
          <input type="text" id="secondname" name="lastName" value={this.state.lastName} onChange={this.handleInputChange}/>
      </form>
      </div>
    )
  }
}

export default UsersView;
