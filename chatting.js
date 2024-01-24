import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

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
            setMessages((prevMessages) => [...prevMessages, message.message]);
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
    
    return (
        <div>
            Chat
            <div>
                {messages}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>
                        보내기
                    </button>
        </div>
    );
}

export default Chat;