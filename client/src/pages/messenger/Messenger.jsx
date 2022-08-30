import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import io from "socket.io-client";

const Messenger = () => {
    const [conversations, setConversations] = useState([]); //To get all conversations
    const [currentChat, setCurrentChat] = useState(null); //To open different conversations
    const [messages, setMessages] = useState([]); //To get all messages
    const [newMessage, setNewMessage] = useState(""); //For writing new message
    const [arrivalMessage, setArrivalMessage] = useState(null); //To get message from socket

    const scrollRef = useRef(); //So it automatically scrolls to the latest message
    const socket = useRef();

    const { user } = useContext(AuthContext);

    //To prevent user from connecting couple of times each time I refresh the page
    //Also to get message from socket
    useEffect(() => {
        if (user) {
            socket.current = io(process.env.REACT_APP_SOCKET_URL);
            socket.current.emit("addUser", user._id);
        }
        // socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, [user]);

    //To updated messages with messages from socket
    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    //Getting conversations from mongodb
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}conversations/` + user._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchConversations();
    }, [user]);

    //Getting messages from mongodb
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}messages/` + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMessages();
    }, [currentChat]);

    //For sending new message
    const handleSubmit = async (e) => {
        e.preventDefault();
        //Find friend id for sending to socket
        const receieverId = currentChat.members.find((member) => member !== user._id);

        const message = {
            sender: user._id,
            receiver: receieverId,
            text: newMessage,
            conversationId: currentChat._id,
        };

        //Send message to socket index.js
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receieverId,
            text: newMessage
        });

        try {
            const res = await axios.post("https://mern-socialmedia-backend.herokuapp.com/api/messages", message);
            setMessages([...messages, res.data]); //So we can see new message in the chat box
            setNewMessage(""); //To reset textbox
        } catch (err) {
            console.log(err);
        }
    };

    //To scroll when new message arrives
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <div className="chatMenuTitle">Your Conversaions</div>
                        {conversations.map((con) => (
                            <div onClick={() => setCurrentChat(con)} key={con._id}>
                                <Conversations
                                    key={con._id}
                                    conversation={con}
                                    currentUser={user}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m, index) => (
                                        <div ref={scrollRef} key={index}>
                                            <Message
                                                message={m}
                                                own={m.sender === user._id}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="Type your message..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    />
                                    <button
                                        className="chatSubmitButton"
                                        onClick={handleSubmit}
                                    >
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">Open a conversation to start a chat.</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger