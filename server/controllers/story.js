import models from '../models/index.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export const story = async (req, res) => {
  dotenv.config();
  let token = jwt.verify(req.body.user, process.env.SECRET);
  try {
    let patient = await models.patient.findOne({
      where: { id: token.id }
    });

    if (patient) {
      models.storyform.create({
        name_surname: patient.dataValues.name_surname,
        email: patient.dataValues.email,
        share_confirm: req.body.checkboxData.checkboxKvkk2,
        question_answers: JSON.stringify(Object.values(req.body.data)),
        trueness_confirm: req.body.checkboxData.checkboxKvkk,
        sent_date: new Date(),
        patientId: patient.dataValues.id
      }).then(() => {
        res.status(200).json({
          data: "Kayıt Başarıyla tamamlandı."
        })
      });
    }
  }

  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const storyInfo = async (req, res) => {
  try {
    let patient = await models.storyform.findOne({
      where: { patientId: req.query.id }
    });
    res.status(200).json({ data: patient });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};