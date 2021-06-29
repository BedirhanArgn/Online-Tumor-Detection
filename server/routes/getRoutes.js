import express from 'express';
import { patient } from '../controllers/patient.js';
import { storyInfo } from '../controllers/story.js';
import { getDoctors } from '../controllers/doctor.js';
import { getMessages } from '../controllers/message.js'
import { getMessageDoctor } from '../controllers/message.js';
const router = express.Router();

router.get('/storyform', storyInfo)
router.get('/patient', patient);
router.get('/doctor', getDoctors);
router.post('/messages', getMessages);
router.post('/messagesdoctor', getMessageDoctor);
export default router;