import React from 'react';
import './patientbraintumor.css';
import BrainBanner from '../../images/Brain-Tumor.jpg';

const PatientBrainTumor = () => {

    return(<div className="section">
        <h1 className="green-header">BEYİN TÜMÖRÜ NEDİR?</h1>
        <p className="explain-tumor">Beyin tümörü, beynin kendi dokusunda yer alan hücrelerin farklılaşarak kontrolsüz bir şekilde çoğalmasıyla ya da vücudun farklı bir yerinde var olan kanser hücrelerinin kan dolaşımı yoluyla beyine ulaşarak bu bölgeye yayılmasıyla oluşan bir hastalıktır. Yeni doğanlardan ileri yaştaki kişilere kadar her yaşta görülebilen beyin tümörü kafatası içinde basınca neden olmaktadır.</p>
        <p className="explain-tumor">Genetik geçiş, radyasyona maruz kalmak, beyaz ırk gibi bazı etkenlerin yanı sıra farklı risk faktörleri de beyin tümörü oluşumunu tetikleyebilmektedir. Bazı sınırlı çalışmalarda cep telefonu kullanımının bile  beyin tümörüne neden olabileceği görülmüştür. Toplumda her 100 bin kişi arasında 3 ila 5 kişide bir görülen bu hastalığa, kadınlara oranla erkeklerde daha sık rastlanmaktadır. Hemen her yaş aralığında görülebilen beyin tümörü vakaları, 10 yaş altı çocuklarda ve 70 yaş üzerindeki kişilerde daha yaygındır.</p>

        <img src={BrainBanner} className="brain-image"></img>
    </div>);

}

export default PatientBrainTumor;
