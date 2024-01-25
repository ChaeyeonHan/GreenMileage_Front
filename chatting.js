import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import './Chat.css';

const ENDPOINT = 'http://localhost:3000'
let socket;

function Chat() {
    const location = useLocation();
    const email = location.state?.email;
    const image = location.state?.image;
    const roomName = location.state?.roomName;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');


    useEffect(() => {
        // 소켓 생성
        socket = io(ENDPOINT);

        // 채팅방 입장
        socket.emit('joinRoom', { chatRoomName: roomName, userEmail: email }, (err) => {
            if (err) {
                alert(err);
            }
        });

        // newMessage 이벤트 수신
        socket.on('newMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // 컴포넌트 언마운트 시 소켓 이벤트 정리
        return () => {
            socket.emit('leaveRoom', {userEmail: email, chatRoomName: roomName});
            socket.off();
        };
    }, [roomName, email]);

    const sendMessage = () => {
        setNewMessage('');
        socket.emit('sendMessage', {chatRoomName: roomName, userEmail: email, message: newMessage, profile_image: image}, (err) => {
            if(err) {
                alert(err);
            }
        });
    }

    const getMessageClass = (senderId, email) => {
        if (senderId === email) {
          return 'sent';
        } else if (senderId === 'system') {
          return 'system';
        } else {
          return '';
        }
      };
    
    return (
      <div className='contain'>
        <div className="chat-container">
          <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${getMessageClass(message.senderId, email)}`}>
              {message.senderId !== email && message.senderId !== 'system' && (
              <div className="sender-info">
                <img
                  src={message.profile_image}
                  alt="Profile"
                  className="profile-image"
                />
                <span className="sender-name">{message.senderId}</span>
              </div>
              )}
              <p className="message-text">{message.message}</p>
            </div>
          ))}
          </div>

          <div className="input-container">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    );
}

export default Chat;