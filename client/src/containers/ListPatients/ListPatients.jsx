import React from 'react'
import axios from '../../services/api';
import MaterialTable from 'material-table'
import storyFormIcon from '../../images/Rectangle 1.png';
import alertify from "alertifyjs";
import messageIcon from '../../images/Rectangle 2 (1).png';
import 'alertifyjs/build/css/alertify.css';
import Popup from "../../components/Popup/Popup";
import './listpatient.css';

const ListPatients = () => {
    const [data, setData] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [id, setId] = React.useState(0);
    const [storyInfo, setStoryInfo] = React.useState([]);

    const togglePopup = (id) => {
        setId(id);
        getStoryInfo(id);
        setIsOpen(!isOpen);
    }

    const getStoryInfo = (id) => {
        console.log(id);
        setStoryInfo("");
        axios.get("/get/storyform", {
            params: {
                id: id
            }
        }).then((response) => {
            if(response.data.data !==null) {
                setStoryInfo(response.data.data.question_answers);
            } else {
                alertify.warning("Hikaye Formu Bulunamadı");
            }
        })
    }

    React.useEffect(() => {
        axios.get("/get/patient").then((response) => {
            setData(response.data.data)
        })
    }, []);

    return (
        <>
            <div style={{maxWidth: '100%', margin: '0 auto'}}>
                {data.length > 0 ?
                    <MaterialTable
                        columns={[
                            {title: 'id', field: 'id', hidden: true},
                            {title: 'Adı Soyadı', field: 'name_surname'},
                            {title: 'Email', field: 'email'},
                            {title: 'Doğum Tarihi', field: 'birthday', type: 'numeric'},
                            {title: 'Tc Kimlik Numarası', field: 'tckn'},
                            {title: 'Telefon Numarası', field: 'phone'},
                            {
                                title: 'Hikaye Formu',
                                field: 'image',
                                render: (rowData) => <img src={storyFormIcon} onClick={() => {
                                    togglePopup(rowData.id)
                                }}
                                                          style={{cursor: "pointer"}}/>
                            }
                        ]}
                        data={data}
                        title="Hastalar"
                    /> : ""}
            </div>
            {
                isOpen && storyInfo.length > 0 &&  <Popup className="popup" content={<>
                    {
                        <>
                            <div> Daha önce hissetmediğiniz (özellikle geceleri şiddetlenen, ağrı ile uyandığınız) türde
                                bir
                                baş ağrınız var mı? {storyInfo.split(',')[0].includes('yes') ? <span>Evet</span> :
                                    <span>Hayır</span>} </div>
                            <div>Öksürme, egzersiz, bağırma, eğilme gibi kafa içi basıncını artıran durumlarda baş
                                ağırınız kötüleşiyor mu ? {storyInfo.split(',')[1].includes('yes') ? <span>Evet</span> :
                                    <span>Hayır</span>} </div>
                            <div>Bulantı, kusma şikayetiniz var mı ? {storyInfo.split(',')[2].includes('yes') ?
                                <span>Evet</span> :
                                <span>Hayır</span>}</div>
                            <div>Çift görme bulanık görme gibi şikayetleriniz var mı
                                ? {storyInfo.split(',')[3].includes('yes') ? <span>Evet</span> :
                                    <span>Hayır</span>}</div>
                            <div>'Bayılma şikayetiniz var mı ? {storyInfo.split(',')[4].includes('yes') ?
                                <span>Evet</span> :
                                <span>Hayır</span>}</div>
                            <div>Denge ve yürüme bozukluğu sorunu yaşıyor musunuz
                                ? {storyInfo.split(',')[5].includes('yes') ? <span>Evet</span> :
                                    <span>Hayır</span>} </div>
                            <div>Kollarda ve bacaklarda hissizlik, karıncalanma veya güç kaybı gibi problemlerle
                                karşılaşıyor musunuz ? {storyInfo.split(',')[6].includes('yes') ? <span>Evet</span> :
                                    <span>Hayır</span>} </div>
                            <div>Konuşmanızda bozukluk oluyor mu ? {storyInfo.split(',')[6].includes('yes') ?
                                <span>Evet</span> :
                                <span>Hayır</span>} </div>
                            <div>Kişilik bozukluğu yaşıyor musunuz ? {storyInfo.split(',')[7].includes('yes') ?
                                <span>Evet</span> :
                                <span>Hayır</span>} </div>
                            <div>Unutkanlık şikayetiniz var mı? {storyInfo.split(',')[8].includes('yes') ?
                                <span>Evet</span> :
                                <span>Hayır</span>} </div>
                            <div>Vücudunuzun sağ veya sol vücut yarısında kuvvetsizlik hissettiğiniz oluyor mu
                                ? {storyInfo.split(',')[9].includes('yes') ? <span>Evet</span> :
                                    <span>Hayır</span>} </div>
                            <div>İşitme kaybı yaşıyor musunuz ? {storyInfo.split(',')[10].includes('yes') ?
                                <span>Evet</span> :
                                <span>Hayır</span>} </div>
                            <div>Kısa süreli görme kaybı yaşadınız mı ? {storyInfo.split(',')[11].includes('yes') ?
                                <span>Evet</span> :
                                <span>Hayır</span>} </div>
                            <div>İştahsızlık yaşıyor musunuz ? {storyInfo.split(',')[12].includes('yes') ?
                                <span>Evet</span> :
                                <span>Hayır</span>} </div>
                            <div>Yazıları okuyamama gibi bir sorunla karşılaştınız mı
                                ? {storyInfo.split(',')[13].includes('yes') ? <span>Evet</span> :
                                    <span>Hayır</span>} </div>
                            <div>Konuşulan bir konuyu algılayamadığınız oldu mu
                                ? {storyInfo.split(',')[14].includes('yes') ? <span>Evet</span> :
                                    <span>Hayır</span>} </div>
                            <div>Yeni kelimeler ile konuştuğunuz oluyor mu ? {storyInfo.split(',')[15].includes('yes') ?
                                <span>Evet</span> :
                                <span>Hayır</span>} </div>
                            <div>El veya ayaklarınızda büyüme gözlemlediniz
                                mi? {storyInfo.split(',')[16].includes('yes') ? <span>Evet</span> :
                                    <span>Hayır</span>} </div>
                            <div>Regl düzensizliği yaşıyor musunuz ? {storyInfo.split(',')[17].includes('yes') ?
                                <span>Evet</span> :
                                <span>Hayır</span>} </div>
                            <div>Koku hissinde kayıp yaşadığınız oluyor mu ? {storyInfo.split(',')[18].includes('yes') ?
                                <span>Evet</span> :
                                <span>Hayır</span>} </div>
                            <div>Nedensiz kilo aldığınızı düşünüyor musunuz
                                ? {storyInfo.split(',')[19].includes('yes') ? <span>Evet</span> :
                                    <span>Hayır</span>} </div>
                            <div>Çok sık yorgunluk, halsizlik hissediyor musunuz
                                ? {storyInfo.split(',')[20].includes('yes') ? <span>Evet</span> :
                                    <span>Hayır</span>} </div>
                            <div>Kol ve bacaklarda seğirme ya da tüm vücudun titremesi gibi süregelen nöbet veya
                                nöbetler geçirdiniz mi ? {storyInfo.split(',')[21].includes('yes') ? <span>Evet</span> :
                                    <span>Hayır</span>} </div>
                            <div>Mimiklerinizde yavaşlama var mı ? {storyInfo.split(',')[22].includes('yes') ?
                                <span>Evet</span> :
                                <span>Hayır</span>} </div>
                        </>
                    }
                </>} handleClose={togglePopup}/>
            }
        </>
    )
}

export default ListPatients;
