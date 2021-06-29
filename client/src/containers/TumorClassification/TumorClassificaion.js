import React from 'react';
import axios from '../../services/api';
import Loader from "react-loader-spinner";

import './tumorClassification.css';

const TumorClassfication = () => {
    const [image, setImage] = React.useState('');
    const [sendImage, setSendImage] = React.useState('');
    const [result, setResult] = React.useState('');
    const [control, setControl] = React.useState(0);
    const handleChange = (event) => {
        setResult("");
        setControl(0);
        if (event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]))
            setSendImage(event.target.files[0]);
        }
    }

    const handleSend = () => {
        setControl(1)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const formData = new FormData();
        formData.append("file", sendImage);
        axios.post('/save/image', formData, config).then((response) => {
            setResult(response.data.output.trim(''));
            setControl(2);
        });
    }

    return (
        <>
            <h3>Beyin tümörü sınıflandırması için modele MR görüntüsünü yükleyiniz.</h3>
            <div className="tumor-classification">
                <div className="control">
                    <div className="image-holder">
                        {image ? <img src={image} style={!image ? {visibility: 'none'} : {visibility: '1'}}/> : ''}

                    </div>
                    <div className="buttons">
                        <label htmlFor="files" className="btn">Yükle</label>
                        <input id="files" type="file" onChange={handleChange} accept="image/png, image/gif, image/jpeg"
                               style={{display: "none"}}/>
                        {image ? <button onClick={() => handleSend()}>Modeli Çalıştır</button> : ''}
                    </div>
                </div>
                {!result && image && control > 0 ?
                    <div className="spinner">
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            top={10}
                            height={100}
                            width={100}
                        /></div> : (control > 0 ?
                        <div className="result">
                            <p>{result !== "Yok" ? result + " tümörü tespit edildi." : "Yok"}</p>
                        </div> : "")}
            </div>
        </>
    );

}
export default TumorClassfication;
