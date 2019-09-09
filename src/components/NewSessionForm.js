import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewSessionForm extends React.Component {
  state = {
    id: ''
  };

  handleChange = e => {
    this.setState({ id: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${API_ROOT}/api/v1/sessions`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ id: '' });
  };

  render = () => {
    return (
      <div className="newSessionForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Session:</label>
          <br />
          <input
            type="integer"
            value={this.state.id}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewSessionForm;
