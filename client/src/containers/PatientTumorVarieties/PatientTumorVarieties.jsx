import React from 'react';
import './PatientTumorVarieties.css';
import Banner1 from '../../images/brain-surgery.jpg';
import Banner2 from '../../images/brain-tumor-illustration.jpg';

const PatientTumorVarieties = () => {

    return (<div className="tumor-varieties section">
        <div className="photos">
            <img src={Banner1}></img>
            <img src={Banner2}></img>
        </div>
        <div class="contex">
            <h3>
                Glioma Tümörü
            </h3>
            <p>
                Gliomlar beyinin destekleyici dokusu olan glial hücrelerde oluşan bir grup tümörü tanımlamak için kullanılan genel bir isimdir.
                Astrositomlar, oligodendrogliomlar ve epandimomalar dahil birçok gliom tipi vardır. En yaygın gliom tipi astrositomdur. Gliomlar tüm beyin tümörlerinin yaklaşık %30'unu oluşturur ve sıklıkla kötü huyludur yani habistir.
            </p>
            <br/>
            <h3>Meningioma  Tümörü</h3>
            <p>Meninjiyomlar, beyni saran zarlardan kaynaklanan, yavaş büyüyen ve çoğu iyi huylu olan tümörlerdir. Beynin içinden kaynaklanmadığı için teknik olarak beyin tümörü olmasalar da büyümeleriyle beraber beynin üzerinde baskı yaratarak bir takım belirtilere sebep olurlar.
                Genellikle iyi huylu olmaları nedeniyle kanserli tümörlerden farklı olarak vücudun diğer bölgelerine yayılma (metastaz) gösterme eğilimde değildirler.
                Ancak bu tümörler büyüdükçe nörolojik rahatsızlıklara ve beyin ve omuriliği sıkıştırdıkları için ciddi durumlara yol açabilirler.</p>
            <br/>
            <h3>Hipofiz Bezi  Tümörü</h3>
            <p>
                Yaklaşık 5 kişiden birinde görülen hipofiz bezi tümörleri (hipofiz adenomları), iyi huylu tümörler arasında yer alıyor. Yani yaşam boyu belirti ve zarar vermeden kalıyor. Ancak hipofiz bezinin işlevi çok önemli olduğundan, tümörün büyümesi ve vücudun ihtiyacı olmayan hormonları salgılaması sonucu ciddi sağlık sorunları oluşturabiliyor.
                Hipofiz bezi tümörleri kafaiçi tümörlerin yüzde 15’ini oluşturur ve çok nadir olarak habistir. Hipofiz bezi tümörleri arasında en sık görülenler; süt salgılatan prolaktin hormonunun hücrelerindeki tümörlerdir.
            </p>
        </div>
    </div>)


}

export default PatientTumorVarieties;
