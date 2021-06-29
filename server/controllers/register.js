import models from '../models/index.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    await models.patient.create({
      name_surname: req.body.nameSurname,
      email: req.body.email,
      password: hashedPassword,
      tckn: req.body.tckn,
      phone: req.body.phone,
      birthday: req.body.birthday
    }).then(() => {
      res.status(200).json({
        data: "Kayıt Başarıyla tamamlandı."
      })
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};