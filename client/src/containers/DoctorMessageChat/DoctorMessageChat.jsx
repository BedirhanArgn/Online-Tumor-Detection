import React, {useEffect, useRef} from 'react'
import useChat from "../../components/UseChat/useChat";
import './doctormessagechat.css';
import axios from "../../services/api";
import jwt_decode from "jwt-decode";
import socketIOClient from "socket.io-client";

const DoctorMessageChat = (props) => {
    console.log("render")
    const {messages, sendMessage} = useChat();
    const [newMessage, setNewMessage] = React.useState("");
    const [firstEntry, setFirstEntry] = React.useState(0);

    const [control, setControl] = React.useState(0);
    const [text, setText] = React.useState("");
    const [display, setDisplay] = React.useState([]);

    React.useEffect(() => {
        console.log("useEffect")
        let doctorId = localStorage.getItem("id_token");
        let patientId = localStorage.getItem("patientId");
        const payload = {patientId: patientId, doctorId: doctorId};
        axios.post("/get/messagesdoctor", payload).then((response) => {
            setDisplay(response.data.data);
        });
        sendMessage("");
        messages.length=0;
        //console.log("Mssages",messages);
        //setDisplay(messages);
    }, [props]);

    const handleNewMessageChange = event => {
        setText(event.target.value)
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        setControl(1);
        setFirstEntry(1);
        if (newMessage !== "") {
            sendMessage(newMessage);
            setDisplay("");
            localStorage.setItem("patientId", props.patient.id)
            setNewMessage("");
        }
        setText("");
    };

    return (
        <div className="chat-wrapper">
            <div className="text-area">
                {
                    display && display.map((item, index) => {
                        if (item.sender === "doctor") {
                            return <div className="doctor-right" key={index}><p>{item.message} </p></div>
                        } else {
                            return <div className="doctor-left" key={index}><p>{item.message}</p></div>
                        }
                    })
                }
                {
                    messages && messages.map((item, index) => {
                        console.log(item)
                        if (item.body) {
                            return <div className={item.isOwner ? "doctormessage-rigth" : "doctormessage-left"}
                                        key={index}><p>{item.body} </p></div>
                        }
                    })
                }
            </div>
            <div className="message-box">
                <div className="message-area">
                    <input type="text" name="text" onChange={handleNewMessageChange} value={text}/>
                </div>
                <div className="send-button">
                    <button onClick={handleSendMessage}>Gönder</button>
                </div>
            </div>
        </div>
    )

}

export default DoctorMessageChat;
