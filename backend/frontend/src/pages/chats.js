import { io } from 'socket.io-client';

export const Chats = () => {
  const socket = io();
  socket.on('message', (message) => {
    console.log(message);
  });
  return <div>Chat</div>;
};
