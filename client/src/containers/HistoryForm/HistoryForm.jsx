import React from 'react';
import okButton from '../../images/tick-icon-png-14 9.png';
import noButton from '../../images/Rectangle 23.png';
import './historyForm.css';
import axios from "../../services/api";
import Auth from "../../authentication/Auth";
import alertify from "alertifyjs";

const HistoryForm = (props) => {
    const [pageState1, setPageState1] = React.useState('');
    const [checkboxKvkk,setCheckboxKvkk] = React.useState(false);
    const [checkboxKvkk2,setCheckboxKvkk2] = React.useState(false);

    const [formData, setFormData] = React.useState({
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
        11: '',
        12: '',
        13: '',
        14: '',
        15: '',
        16: '',
        17: '',
        18: '',
        19: '',
        20: '',
        21: '',
        22: '',
        23: '',
        24: ''
    });
    React.useEffect(() => {
        setPageState1(true);
    }, []);

    const stories = [
        {text: 'Daha önce hissetmediğiniz (özellikle geceleri şiddetlenen, ağrı ile uyandığınız) türde bir baş ağrınız var mı?'},
        {text: 'Öksürme, egzersiz, bağırma, eğilme gibi kafa içi basıncını artıran durumlarda baş ağırınız kötüleşiyor mu ?'},
        {text: 'Bulantı, kusma şikayetiniz var mı ?'},
        {text: 'Çift görme bulanık görme gibi şikayetleriniz var mı ?'},
        {text: 'Bayılma şikayetiniz var mı ?'},
        {text: 'Denge ve yürüme bozukluğu sorunu yaşıyor musunuz ?'},
        {text: 'Kollarda ve bacaklarda hissizlik, karıncalanma veya güç kaybı gibi problemlerle karşılaşıyor musunuz ?'},
        {text: 'Konuşmanızda bozukluk oluyor mu ?'},
        {text: 'Kişilik bozukluğu yaşıyor musunuz ?'},
        {text: 'Unutkanlık şikayetiniz var mı?'},
        {text: 'Vücudunuzun sağ veya sol vücut yarısında kuvvetsizlik hissettiğiniz oluyor mu ?'},
        {text: 'İşitme kaybı yaşıyor musunuz ?'}
    ];

    const storiesPage2 = [
        {text: 'Kısa süreli görme kaybı yaşadınız mı ?'},
        {text: 'İştahsızlık yaşıyor musunuz ?'},
        {text: 'Yazıları okuyamama gibi bir sorunla karşılaştınız mı ?'},
        {text: 'Konuşulan bir konuyu algılayamadığınız oldu mu ?'},
        {text: 'Yeni kelimeler ile konuştuğunuz oluyor mu ?'}, {text: 'El veya ayaklarınızda büyüme gözlemlediniz mi?'},
        {text: 'Regl düzensizliği yaşıyor musunuz ?'},
        {text: 'Koku hissinde kayıp yaşadığınız oluyor mu ?'},
        {text: 'Nedensiz kilo aldığınızı düşünüyor musunuz ?'},
        {text: 'Çok sık yorgunluk, halsizlik hissediyor musunuz ?'},
        {text: 'Kol ve bacaklarda seğirme ya da tüm vücudun titremesi gibi süregelen nöbet veya nöbetler geçirdiniz mi ?'},
        {text: 'Mimiklerinizde yavaşlama var mı ?'}
    ];

    const handleChangeCheckbox = e => {
        if(e.target.name === 'kvkk-check') {
            setCheckboxKvkk(e.target.checked);
        } else if(e.target.name === 'kvkk-permission') {
            setCheckboxKvkk2(e.target.checked);
        }
    }

    const handleOkChoise = (index) => {
        setFormData(prevState => ({
            ...prevState,
            [index]: 'yes'
        }));
    }

    const handleNoChoise = (index) => {
        setFormData(prevState => ({
            ...prevState,
            [index]: 'no'
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        const auth = new Auth();
        const payload = {data:formData,user:auth.getToken(),checkboxData:{checkboxKvkk:checkboxKvkk,checkboxKvkk2:checkboxKvkk2}};
        axios.post("/save/story", payload).then((response) => {
            if (response.status === 200) {
                alertify.success("Form Başarıyla Gönderildi");
            } else {
                alertify.error("Form Gönderilemedi");
            }
        });
    }

    return (
        <div className="story-form">
            <form className="personal-form" onSubmit={handleSubmit}>
                {pageState1 === true ?
                    stories.map((item, index) => {
                        return (<div className="form-item" key={item.text}>
                            <span><span>{index + 1} .</span> {item.text} </span>
                            <span><img  className="ok" src={okButton} onClick={() => handleOkChoise(index + 1)}/>
                            <img className="no" onClick={() => handleNoChoise(index + 1)} src={noButton}/> </span>
                        </div>);

                    }) :
                    storiesPage2.map((item, index) => {
                        return (<div className="form-item" key={item.text}>
                            <span><span>{index + 1 + 12} .</span> {item.text} </span> <span><img className="ok" src={okButton} onClick={() => handleOkChoise(index + 1 + 12)}/>
                            <img className="no" src={noButton} onClick={() => handleNoChoise(index + 1)}/> </span>
                        </div>);
                    })
                }
                <div className="page-number">
                    <span className={"page-number-1" && pageState1 ? ' active' : ''}
                          onClick={() => setPageState1(true)}>1</span>
                    <span className={"page-number-2" && !pageState1 ? 'active' : ''}
                          onClick={() => setPageState1(false)}>2</span>
                </div>
                {
                    pageState1 === false ? <div className="send">
                        <div className="kvkk">
                            <div>
                                <input type="checkbox" name="kvkk-check" onChange={handleChangeCheckbox}/>
                                <label htmlFor="kvkk-check">Vermiş olduğum tüm bilgilerin doğruluğunu onaylıyorum ve bu
                                    bilgilerin hatalı olması durumunda doğacak yükümlülüğü kabul ediyorum.</label>
                                <br/>
                                <input type="checkbox" name="kvkk-permission" onChange={handleChangeCheckbox}/>
                                <label htmlFor="kvkk-permission">KVKK kapsamında form bilgilerimin doktorum ile
                                    paylaşılmasına
                                    izin veriyorum.</label>
                            </div>
                            <button type="submit">Gönder</button>
                        </div>
                    </div> : ''
                }
            </form>
        </div>
    );

}
export default HistoryForm;
