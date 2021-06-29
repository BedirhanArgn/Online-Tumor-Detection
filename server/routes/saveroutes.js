import express from 'express';
import { story } from '../controllers/story.js'
import { tumorImage, tumorDetection } from '../controllers/tumorImage.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
})


var upload = multer({ storage: storage });

const router = express.Router();

router.post('/story', story);
router.post('/image', upload.single('file'), tumorImage);
router.post('/detection', upload.single('file'), tumorDetection);


export default router;