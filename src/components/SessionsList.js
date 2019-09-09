import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import MessagesArea from './MessagesArea';
import NewSessionForm from './NewSessionForm';
import Cable from './Cable';

class SessionsList extends React.Component {
  state = {
    sessions: [],
    replies: [],
    activeSession: null
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/api/v1/sessions`)
      .then(res => res.json())
      .then(sessions => this.setState({ sessions }));
  };

  handleClick = id => {
    this.setState({ activeSession: id });
  };

  handleReceivedSession = response => {
    const { session } = response;
    this.setState({
      sessions: [...this.state.sessions, session]
    });
  };

  handleReceivedMessage = response => {

    const { message } = response;
    console.log(response);
    console.log(message);
    const sessions = [...this.state.sessions];
    const session = sessions.find(
      session => session.id === message.session_id
    );
    session.messages = [...session.messages, message];
    this.setState({ sessions })

   };

  render = () => {
    const { sessions, activeSession } = this.state;
    return (
      <div className="sessionsList">
        <ActionCable
          channel={{ channel: 'SessionsChannel' }}
          onReceived={this.handleReceivedSession}
        />
        {this.state.sessions.length ? (
          <Cable
            sessions={sessions}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <h2>Sessions</h2>
        <ul>{mapSessions(sessions, this.handleClick)}</ul>
        <NewSessionForm />
        {activeSession ? (
          <MessagesArea
            session={findActiveSession(
              sessions,
              activeSession
            )}
          />
        ) : null}
      </div>
    );
  };
}

export default SessionsList;

// helpers

const findActiveSession = (sessions, activeSession) => {
  return sessions.find(
    session => session.id === activeSession
  );
};

// const expectedResponse =
//     {message:
//       {identifier: *,
//        session_id: *,
//        detected_language: *,
//        created_at: *
//       }
//     };



const mapSessions = (sessions, handleClick) => {
  return sessions.map(session => {
    return (
      <li key={session.id} onClick={() => handleClick(session.id)}>
        {session.id}
      </li>
    );
  });
};
