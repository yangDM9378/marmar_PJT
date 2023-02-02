/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { io } from 'socket.io-client';
import WordProgram from '../../pages/program/word/WordProgram';

const socket = io.connect('http://localhost:4000');
export default function Game(props) {
  const { sessionId } = props;

  const [state, setState] = useState({ message: '', name: '' });
  const [chat, setChat] = useState([]);
  const [text, setText] = useState('클릭');
  // let socket = '';
  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      const mes = {
        name,
        message,
      };
      if (mes.name === '이름') {
        click();
      }
      setChat(chat.concat(mes));
      // console.log(chat);
    });
  }, []);
  const click = () => {
    // socket = io.connect('http://localhost:4000');
    setText('상대방이 클릭함');
  };

  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = e => {
    e.preventDefault();
    const { name, message } = state;
    console.log(sessionId);
    socket.emit('joinRoom', { roomName: sessionId });
    socket.emit('message', { name, message });
    setState({ message: '', name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}:<span>{message}</span>
        </h3>
      </div>
    ));
  };
  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Message</h1>
        <div className="name-field">
          <input
            type="text"
            name="name"
            className="border-2 border-black"
            onChange={e => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <input
            type="text"
            name="message"
            className="border-2 border-black"
            onChange={e => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            label="Message"
          />
        </div>
        <button type="submit">Send Message</button>
        <button type="button" className="border-2 p-3">
          클릭
        </button>
        <div className="border-2 m-3 p-3">{text}</div>
      </form>
      <div className="render-chat">
        <h1>Chat log</h1>
        {renderChat()}
      </div>
      <WordProgram />
    </div>
  );
}
