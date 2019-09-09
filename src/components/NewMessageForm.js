import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewMessageForm extends React.Component {
  state = {
    text: '',
    session_id: this.props.session_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ session_id: nextProps.session_id });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/api/v1/sessions/${this.state.session_id}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ text: '' });
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewMessageForm;
