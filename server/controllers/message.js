import model from '../models/index.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import pkg from 'sequelize';
const { Op } = pkg;
dotenv.config();


export const getMessages = async (req, res) => {
  try {
    let token = jwt.verify(req.body.patientId, process.env.SECRET);
    let message = await model.message.findAll({
      where: {
        [Op.and]: [
          { patientId: token.id },
          { doctorId: req.body.doctorId }
        ]
      }
    });

    res.status(200).json({
      data: message
    })
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};

export const getMessageDoctor = async (req, res) => {
  try {
    let token = jwt.verify(req.body.doctorId, process.env.SECRET);
    let message = await model.message.findAll({
      where: {
        [Op.and]: [
          { doctorId: token.id },
          { patientId: req.body.patientId }
        ]
      }
    });
    res.status(200).json({
      data: message
    })
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};