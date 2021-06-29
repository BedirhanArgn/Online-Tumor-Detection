import { v4 as uuidv4 } from 'uuid';

const messages = [];

export const addMessage = (room, message) => {
  const msg = { id: uuidv4(), room, ...message };
  messages.push(msg);
  return msg;
};

export const removeMessage = (id) => {
  const index = messages.findIndex((message) => message.id === id);

  if (index !== -1) return messages.splice(index, 1)[0];
};

export const getMessage = (id) => messages.find((message) => message.id === id);

export const getMessagesInRoom = (room) =>
  messages.filter((message) => message.room === room);