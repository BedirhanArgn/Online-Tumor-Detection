import models from '../models/index.js';

export const getDoctors = async (req, res) => {
  let data = await models.doctor.findAll();
  try {
    if (data) {
      res.status(200).json({
        data: data
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }

}