import {useEffect, useRef, useState} from "react";
import socketIOClient from "socket.io-client";
import jwt_decode from "jwt-decode";

const NEW_MESSAGE_EVENT = "NEW_MESSAGE_EVENT";

const useChat = (props) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();
    const SOCKET_SERVER_URL = "http://localhost:3031";


    useEffect(() => {
        // create a new client with our server url
        // listen for incoming message
        socketRef.current = socketIOClient(SOCKET_SERVER_URL);
        socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
            console.log(message)
            const incomingMessage = {
                ...message,
                isOwner: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        },[]);

        return () => {
            socketRef.current.disconnect();
        };
    },[]);

    useEffect(() => {
        console.log("girdiiii")
        if (localStorage.getItem("authority") === 'doctor') {
            const doctorId = localStorage.getItem("id_token");
            const decoded = jwt_decode(doctorId);
            const patientId = localStorage.getItem("patientId");
            console.log(`room-${decoded.id}-${patientId}`);
            socketRef.current.emit('create', `room-${decoded.id}-${patientId}`);
        } else {
            const patientId = localStorage.getItem("id_token");
            const decoded = jwt_decode(patientId);

            const doctorId = localStorage.getItem("doctorId");
            socketRef.current.emit('create', `room-${doctorId}-${decoded.id}`);
        }
    });

    // send the messagee along with a sender id. The sender id would allow us to style the UI just like a message app like iOS.
    const sendMessage = (messageBody,roomId) => {
        //socketRef.current.emit('create', roomId);

        if (localStorage.getItem("authority") === "patient") {
            socketRef.current.emit(NEW_MESSAGE_EVENT, {
                body: messageBody,
                senderId: socketRef.current.id,
                doctorId: localStorage.getItem("doctorId"),
                patientId: localStorage.getItem("id_token"),
                sender: "patient"
            });
        } else {
            socketRef.current.emit(NEW_MESSAGE_EVENT, {
                body: messageBody,
                senderId: socketRef.current.id,
                doctorId: localStorage.getItem("id_token"),
                patientId: localStorage.getItem("patientId"),
                sender: "doctor"
            });
        }

    };

    return {messages, sendMessage};
};

export default useChat;
