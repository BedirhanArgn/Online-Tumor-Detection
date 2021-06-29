import React from 'react';
import image1 from '../../images/1.png';
import image2 from '../../images/2.png';
import image3 from '../../images/3.png';
import image4 from '../../images/4.png';
import './PatientPage.css';
const PatientPage = () => {

    return (<>
            <div className="section">
                <h1 className="patients-header">ONLINE NÖROLOJİ DESTEK SİSTEMİNE HOŞGELDİNİZ...</h1>
                <div className="card">
                    <img src = {image1} className="patient-img"></img>
                    <p>
                        Beyin Tümörü Nedir ? ve Beyin Tümörü Çeşitleri Sayfalarımıza menüden erişebilir, hastalık hakkında detaylı bilgiler alabilirsiniz.
                    </p>
                </div>
                <div className="card">
                    <p>
                        Doktorunuzun sağlıklı bir değerlendirme yapabilmesi için Hasta Hikaye Formunu doldurmalısınız. Forma menüden erişebilirsiniz. Soruları dikkatle okuyunuz ve doğru cevap verdiğinizden emin olunuz.
                    </p>
                    <img src = {image2} className="patient-img"></img>
                </div>
                <div class="card">
                    <img src = {image3} className="patient-img"></img>
                    <p>
                        Doktorunuzla iletişime Doktorlara Sor butonu yardımı ile geçebilirsiniz. Lütfen sorduğunuz soruların anlaşılır olmasına dikkat ediniz.
                    </p>
                </div>
                <div className="card">
                    <p>
                        Hesap Ayarları bölümünü kullanarak sisteme kayıtlı e-mail, cep telefonu bilgilerinizi ve şifrenizi değiştirebilirsiniz. İşlemin onaylanması için aktif sistem şifresini kullanınız.
                    </p>
                    <img src = {image4} className="patient-img"></img>
                </div>
            </div>
        </>
    );
}
export default PatientPage;
