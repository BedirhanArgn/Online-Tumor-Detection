import model from '../models/index.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  dotenv.config();
  try {
    let email = req.body.email;
    let patient = await model.patient.findOne({
      where: { email: email }
    });
    if (patient) {
      const validPassword = await bcrypt.compare(req.body.password, patient.dataValues.password);
      if (validPassword) {
        var token = jwt.sign({ id: patient.dataValues.id }, process.env.SECRET, {
          noTimestamp: true,
          expiresIn: '10h'
        });
        res.status(200).json({ accessToken: token, user: patient.dataValues, roles: "patient" });
      }
    } else {
      let doctor = await model.doctor.findOne({
        where: { email: email }
      });

      if (doctor) {
        const validPassword = bcrypt.compare(req.body.password, doctor.dataValues.password);
        if (validPassword) {
          var token = jwt.sign({ id: doctor.dataValues.id }, process.env.SECRET, {
            noTimestamp: true,
            expiresIn: '10h'
          });
          res.status(200).json({ accessToken: token, user: doctor.dataValues, roles: "doctor" });
        }
      }
    }
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};