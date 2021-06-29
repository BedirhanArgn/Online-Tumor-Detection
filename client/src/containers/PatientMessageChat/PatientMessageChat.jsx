import React from 'react';
import useChat from '../../components/UseChat/useChat';
import axios from '../../services/api';

import './patientmessagechat.css';

const PatientMessageChat = (props) => {
    const {messages, sendMessage} = useChat();
    const [newMessage, setNewMessage] = React.useState("");
    const [control, setControl] = React.useState(0);
    const [text, setText] = React.useState("");
    const [display, setDisplay] = React.useState([]);

    React.useEffect(() => {
        const patientId = localStorage.getItem("id_token");
        const doctorId = localStorage.getItem("doctorId");
        const payload = {patientId: patientId, doctorId: doctorId};
        axios.post("/get/messages", payload).then((response) => {
            setDisplay(response.data.data);
        });
        sendMessage("");
        messages.length=0;
    }, [props]);

    const handleNewMessageChange = event => {
        setText(event.target.value)
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        setControl(1);
        if (newMessage !== "") {
            sendMessage(newMessage);
            setDisplay("");
            localStorage.setItem("doctorId", props.doctor.id)
            setNewMessage("");
        }
        setText("");
        let patientId = localStorage.getItem("id_token");
        let doctorId = localStorage.getItem("doctorId");
        let payload = {patientId: patientId, doctorId: doctorId};
        /*
        setTimeout(() => {
            axios.post("/get/messages", payload).then((response) => {
                console.log(response.data)
                setDisplay(response.data.data);
            });
        }, 500)
        */
    };
    return (
        <div className="chat-wrapper">
            <div className="text-area">
                {
                    display && display.map((item, index) => {
                        if (item.sender === "patient") {
                            return <div className="patient-right" key={index}><p key={index}>{item.message} </p>
                            </div>
                        } else {
                            return <div className="patient-left" key={index}><p key={index}>{item.message}</p></div>
                        }
                    })
                }
                {
                    messages && messages.map((item, index) => {
                        if (item.body) {
                            return <div className={item.isOwner ? "patientmessage-rigth" : "patientmessage-left"}
                                        key={index}><p>{item.body} </p></div>
                        }
                    })
                }
            </div>
            <div className="message-box">
                <div className="message-area">
                    <input type="text" name="text" onChange={handleNewMessageChange} value={text}/>
                </div>
                <div className="send-button-patient">
                    <button onClick={handleSendMessage}>Gönder</button>
                </div>
            </div>
        </div>
    );


}
export default PatientMessageChat;
