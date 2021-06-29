import React from 'react';
import '../TumorDetection/tumordetection.css';
import axios from "../../services/api";
import Loader from "react-loader-spinner";

const TumorDetection = () => {
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
        axios.post('/save/detection', formData, config).then((response) => {
            setResult(response.data.output.trim(''));
            setControl(2);
        });
    }

    return (
        <>
            <h3>Beyin tümörü tespiti için modele MR görüntüsünü yükleyiniz.</h3>
            <div className="tumor-detection">
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
                            <p>{result !== "Yok" ? "Tümör tespit edildi." : "Tümör Tespit Edilemedi."}</p>
                        </div> : "")}
            </div>
        </>
    );

}
export default TumorDetection;
