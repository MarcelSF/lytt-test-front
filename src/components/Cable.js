import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ sessions, handleReceivedMessage }) => {
  return (
    <Fragment>
      {sessions.map(session => {
        return (
          <ActionCable
            key={session.id}
            channel={{ channel: 'MessagesChannel', session: session.id }}
            onReceived={handleReceivedMessage}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;
