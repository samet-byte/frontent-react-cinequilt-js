// Author: sametbayat
// Dec 02, 2023 9:56 PM

import { useState } from 'react'
import '../App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import Constants from "../common/Constants";
import Cookies from "js-cookie";

const API_KEY = Cookies.get('gpt_api_key') || Constants.GPT_API || '';

const systemMessage = {
    "role": "system",
    "content": "Explain the question"
}

function App() {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm FilmBuff! " +
                "Ask me anything about cinema!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);

        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) { // messages is an array of messages

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message}
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,  // The system message DEFINES the logic of our chatGPT
                ...apiMessages // The messages from our chat with ChatGPT
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT"
            }]);
            setIsTyping(false);
        });
    }

    return (
        <div>
            <div
                // style={{ position: "relative", height: "80vh", width: "100vw", padding: 30 }}
            >
                <MainContainer style={{borderRadius: 40, backgroundColor: "transparent"}} >
                    <ChatContainer style={{borderRadius: 40, backgroundColor: "transparent"}} >
                        <MessageList
                            style={{ borderRadius: 40, backgroundColor: "transparent",  margin: '8px 0' }}
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="FilmBuff is typing" /> : null}
                        >
                            {messages.map((message, i) => {
                                // Adjust margin/padding within the Message component
                                return <Message key={i} model={message} />;
                            })}
                        </MessageList>

                        <MessageInput placeholder="Type message here" onSend={handleSend} style={{borderRadius: 40}} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

export default App
