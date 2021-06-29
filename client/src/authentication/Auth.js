import axios from '../services/api';
import decode from 'jwt-decode';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';


export default class Auth {
    login = (email, password) => {
        const payload = {email: email, password: password};
        return axios.post("/auth/login", payload).then((response) => {
            if (response.status === 200) {
                this.setToken(response.data.accessToken);
                this.setAuthority(response.data.roles);
                localStorage.setItem("user", response.data.user['name_surname']);
                return Promise.resolve(response);
            }
        });
    }
    setToken = (idToken) => {
        localStorage.setItem("id_token", idToken);
    }
    setAuthority = (authority) => {
        localStorage.setItem("authority", authority);
    }

    logout = () => {
        localStorage.removeItem("id_token");
        localStorage.removeItem("authority");
        localStorage.removeItem("user");
    }

    isTokenExpired = (token) => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return true;
        }
    }

    getAuthority = () => {
        let authValue = localStorage.getItem("authority");
        return authValue;
    }
    getToken = () => {
        return localStorage.getItem('id_token');
    }
}

