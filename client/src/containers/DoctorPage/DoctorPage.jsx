import React from 'react';
import './doctorpage.css';
import image6 from '../../images/6.png';
import image7 from '../../images/7.png';
import image8 from '../../images/8.png';
import image9 from '../../images/9.png';

const DoctorPage = () => {
    return<>
        <div class="section">
            <h1 class="doctor-header">ONLINE NÖROLOJİ DESTEK SİSTEMİNE HOŞGELDİNİZ...</h1>
            <div class="card">
                <img src = {image6} class="patient-img"></img>
                <p>
                    Tümör Tespiti ve Tümör Sınıflandırması bölümlerinden ilgili modele ulaşabilirsiniz. <span>Yükle</span> butonu ile MR görüntüsünü yüklemeniz ardından <span>Modeli Çalıştır</span> butonuna tıklamalısınız. Model tahmin sonucu  <span>Model Sonucu</span> bölümüne yansıyacaktır.
                </p>
            </div>
            <div class="card">
                <p>
                    Hastalarım bölümüyle hasta listenize ulaşabilirsiniz. Tablonun <span>Hikaye Formu</span> sütununda ilgili hastanın ikonuna tıklayarak hastanın doldurduğu hikaye formuna ulaşabilirsiniz. <span>Mesaj</span> sütununda ise ilgili hastanın mektup ikonuna tıklayarak hastaya mesaj gönderebilirsiniz.
                </p>
                <img src = {image7} class="patient-img"></img>
            </div>
            <div class="card">
                <img src = {image8} class="patient-img"></img>
                <p>
                    Hastalarınızla iletişime Mesajlar bölümü ile geçebilirsiniz. Size gönderilen mesajlar bu ekrana yansıyacaktır.
                </p>
            </div>
            <div class="card">
                <p>
                    Hesap Ayarları bölümünü kullanarak sisteme kayıtlı e-mail, cep telefonu bilgilerinizi ve şifrenizi değiştirebilirsiniz. İşlemin onaylanması için aktif sistem şifresini kullanınız.
                </p>
                <img src = {image9} class="patient-img"></img>
            </div>
        </div>
    </>




}

export default DoctorPage;
