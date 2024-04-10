import React, { useState } from 'react';
import './chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { SiProbot } from "react-icons/si";
import { IoCheckmarkDoneSharp } from "react-icons/io5";


function Chat() {
    const [history, setHistory] = useState([]);
    const [question, setQuestion] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [messageSent, setMessageSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch('https://backdesgruapchat.onrender.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ history: history, question: question })
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud fetch: ' + response.statusText);
            }

            const data = await response.json();
            
            setHistory([...history, { parts: question, role: 'user' }]);
            setHistory(data.history);
            setQuestion('');
            setMessageSent(true); // Indica que se ha enviado un mensaje
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setQuestion(e.target.value); 
    };

    const handleChatButtonClick = () => {
        setShowChat(!showChat);
    };

    return (
        <div className="App">
            {showChat && (
                <div className="chat-container">
                    {history.map((message, index) => (
                        <div key={index} className={`message ${message.role}`}>
                            <div className="message-bubble">{message.parts.replace(/\*\*/g, '')}</div>
                            {message.role === 'user' && messageSent && (
                                <div className="sent-icons">
                                    <IoCheckmarkDoneSharp className="sent-icon" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {showChat && (
                <form onSubmit={handleSubmit} className="input-form">
                    <input
                        type="text"
                        value={question}
                        onChange={handleInputChange}
                        placeholder="Escribe tu pregunta..."
                    />
                    <button id='envio' type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
                </form>
            )}
            <footer>
                <button onClick={handleChatButtonClick} className="chat-button">
                    <SiProbot className="robot-icon" />
                </button>
            </footer>
        </div>
    );
}

export default Chat;
