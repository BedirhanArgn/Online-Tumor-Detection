import express from 'express';
const router = express.Router();

export default router.get('/', (req, res) => {
  res.redirect('http://localhost:3031');
})

