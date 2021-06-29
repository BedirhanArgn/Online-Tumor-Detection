import React from 'react'
import axios from '../../services/api'
import './doctormessage.css'
import DoctorMessageChat from "../DoctorMessageChat/DoctorMessageChat";

const DoctorMessage = () => {
    const [patients, setPatients] = React.useState([]);
    const [openChat, setOpenChat] =React.useState();
    const [render,setRender] = React.useState(0);
    React.useEffect(() => {
        axios.get('/get/patient').then((response) => {
            setPatients(response.data.data);
        });
    }, []);

        const sendChat = (item) => {

            localStorage.setItem("patientId",item.id)
            setOpenChat(item);

        };

    if (patients.length > 0) {
        return (<div className="messagePage">
            <div className="patientName">
                <h3>Hastalar</h3>
                {patients.map((item, key) => {
                    return (<>
                        <div className="patient">
                            <p key={key} onClick={() => sendChat(item)}>{item.name_surname}</p>
                        </div>
                    </>)

                })}
            </div>
            {openChat ? <div className="chatPage">
                <DoctorMessageChat patient={openChat}/>
            </div> : '' }
        </div>)
    } else {
        return "";
    }


}
export default DoctorMessage;
