import React from 'react';
import banner from '../../images/images.jpg';
import button_img from '../../images/button.png';
import {useHistory} from 'react-router-dom'
import './homepage.css';

const HomePage = () => {
    const history = useHistory()
    const handleButtonClick = (event) => {
        history.push(event.target.value)
    }
    return <div className="main-page">
        <div className="left-side">
            <h1 className="main-header">ONLİNE NÖROLOJİ DESTEK SİSTEMİNE HOŞGELDİNİZ</h1>
            <p> Tanıya yardımcı yapay zeka teknolojileri, hasta formları, 7/24 doktor desteği ve çok daha fazlası ile
                online bir randevu deneyimi yaşamak ister misiniz?</p>
            <div className="main-buttons">
                <button className="main-button" value="/login" onClick={handleButtonClick}>Giriş Yap <img
                    src={button_img}></img></button>
                <button className="main-button" value="/register" onClick={handleButtonClick}>Kayıt Ol <img
                    src={button_img}></img></button>
            </div>
        </div>
        <div className="right-side">
            <img src={banner}></img>
        </div>
    </div>


}
export default HomePage;
