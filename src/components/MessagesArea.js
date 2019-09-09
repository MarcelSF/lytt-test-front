import React from 'react';
import NewMessageForm from './NewMessageForm';

const MessagesArea = ({
  session: { id, title, messages },
}) => {
  return (
    <div className="messagesArea">
      <h2>Messages and replies</h2>
      <ul>{orderedMessages(messages)}</ul>
      <NewMessageForm session_id={id} />
    </div>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map(message => {
    return <li key={message.text}>{message.detected_language} => ID: {message.identifier}</li>;
  });
};
