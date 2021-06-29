import React from 'react';
import brainImage from '../../images/brainImage.png';
import alertify from 'alertifyjs';
import DatePicker from 'react-date-picker';
import axios from '../../services/api';
import './register.css';
import 'alertifyjs/build/css/alertify.css';
import {useHistory} from "react-router";

const Register = () => {
    const history = useHistory();
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        nameSurname: '',
        tckn: '',
        repassword: '',
        phone: '',
        birthday: new Date()
    });
    const [dateValue, onChange] = React.useState(new Date());

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.birthday = dateValue.toISOString().slice(0, 10);
        axios.post("/auth/register", formData).then((response) => {
            if (response.status === 200) {
                alertify.success(response.data.data);
                alertify.success("Giriş Sayfasına Yönlendiriliyorsunuz...");
                setTimeout(() => {
                    history.push("/login");
                }, 500);
            } else {
                alertify.error("Giriş Başarısız");
            }
        }).catch((error) => {
            alertify.error("Kayıt Tamamlanamadı");
        });
    }

    return (
        <>
            <div className="register-container">
                <div className="register-header">
                    <span>Kayıt Formu</span>
                </div>
                <div className="register-content">
                    <div className="personal-info">
                        <form className="personal-form" onSubmit={handleSubmit}>
                            <div className="name-form">
                                <input type="text" placeholder="Ad Soyad" name="nameSurname" id="nameSurname"
                                       onChange={handleChange}/>
                            </div>
                            <div className="tc-form">
                                <input type="text" placeholder="TC Kimlik Numarası" name="tckn" id="tckn"
                                       onChange={handleChange}/>
                            </div>
                            <div className="email-form">
                                <input type="text" placeholder="E-mail" name="email" id="email"
                                       onChange={handleChange}/>
                            </div>
                            <div className="password-form">
                                <input type="password" placeholder="Şifre" name="password" id="password"
                                       onChange={handleChange}/>
                            </div>
                            <div className="password-form">
                                <input type="password" placeholder="Şifrenizi Tekrar Giriniz" name="repassword"
                                       id="repassword" onChange={handleChange}/>
                            </div>
                            <div className="phone-form">
                                <input type="text" placeholder="Cep Telefonu" name="phone" id="phone"
                                       onChange={handleChange}/>
                            </div>
                            <div className="date-picker">
                                <DatePicker
                                    onChange={onChange}
                                    name="birthday"
                                    id="birthday"
                                    format={"dd-MM-y"}
                                    value={dateValue}
                                /></div>
                            <button className="register-button" type="submit">Kayıt Ol</button>
                        </form>
                    </div>
                    <div className="brain-image">
                        <img src={brainImage} alt=""/>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Register;
