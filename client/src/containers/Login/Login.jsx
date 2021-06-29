import React from "react";
import brainImg from '../../images/brain-1.png';
import Auth from "../../authentication/Auth";
import {Redirect, useHistory} from "react-router";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import './login.css';

const Login = () => {
    const history = useHistory();
    const [formData, setFormData] = React.useState({email: '', password: ''});
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData) {
            let auth = new Auth();
            auth.login(formData.email, formData.password).then(() => {
                alertify.success("Giriş Başarılı");
                const role = localStorage.getItem('authority');
                if (role.indexOf('patient') > -1) {
                    history.push('/patient')
                }
                else if (role.indexOf('doctor') > -1) {
                    history.push('/doctor');
                }
            });
        }
    }

    return (
        <>
            <div className="login-container">
                <div className="login-header">
                    <div>GİRİŞ FORMU</div>
                </div>
                <div className="login-image"><img src={brainImg} alt="brain-img"/>
                </div>
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <div className="email-form">
                            <input type="text" placeholder="E-mail" name="email" id="email"
                                   onChange={handleChange}/>
                        </div>
                        <div className="password-form">
                            <input type="password" placeholder="Password" name="password" id="password"
                                   onChange={handleChange}/>
                        </div>
                        <button type="submit" className="submit-button">Giriş</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
