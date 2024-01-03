// Author: sametbayat
// Dec 02, 2023 9:56 PM

import {useEffect, useState} from 'react'
import '../App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import Constants from "../common/Constants";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Lottie from "lottie-react";
import animationData from "../assets/anim/ask_anim.json";

const API_KEY = Cookies.get('gpt_api_key') || Constants.GPT_API || '';

const systemMessage = {
    "role": "system",
    "content": "Explain the question"
}

function App() {

    useDocumentTitle('FilmBuff')

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('bgImage') !== Constants.COMMON_BACKGROUND_URL) {
            localStorage.setItem('bgImage', Constants.COMMON_BACKGROUND_URL);
            navigate(0)
        }
    }, []);

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

    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData, // Replace with your actual animation data
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div>
            <div>
                <MainContainer style={{ borderRadius: 40, backgroundColor: "transparent", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Lottie Animation */}
                    <Lottie options={lottieOptions} height={200} width={200} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}   animationData={animationData} />

                    <ChatContainer style={{ borderRadius: 40, backgroundColor: "transparent" }}>
                        {/* Your existing chat container code */}
                        <MessageList
                            style={{ borderRadius: 40, backgroundColor: "transparent", margin: '8px 0' }}
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="FilmBuff is typing" /> : null}
                        >
                            {messages.map((message, i) => {
                                return <Message key={i} model={message} />;
                            })}
                        </MessageList>

                        <MessageInput placeholder="Type message here" onSend={handleSend} style={{ borderRadius: 40 }} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

export default App
