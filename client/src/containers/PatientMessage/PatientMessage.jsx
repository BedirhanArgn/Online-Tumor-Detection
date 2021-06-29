import React from 'react'
import axios from "../../services/api";
import './patientmessage.css';
import PatientMessageChat from "../PatientMessageChat/PatientMessageChat";

const PatientMessage = () => {
    const [doctors, setDoctors] = React.useState([]);
    const [openChat, setOpenChat] = React.useState([]);
    React.useEffect(() => {
        axios.get('/get/doctor').then((response) => {
            setDoctors(response.data.data);
        })
    }, [])

    const sendChat = (item) => {
        localStorage.setItem("doctorId",item.id)
        setOpenChat(item);
    };

    return (
        <>
            <div className="chat-app-wrapper">
                <div className="doctor-area">
                    <div className="doctor-item">
                        <p>Doktorlar</p>
                    </div>
                    {
                        doctors && doctors.map((item, index) => {
                            return <div key={index} className="doctor">
                                <img/>
                                <div><p onClick={() => sendChat(item)}>{item.name_surname}</p></div>
                            </div>
                        })
                    }
                </div>
                {openChat.id ? <PatientMessageChat doctor={openChat}/> : null}
            </div>
        </>
    )
}

export default PatientMessage;
