import multer from 'multer';
import { spawnSync } from 'child_process';

export const tumorImage = async (req, res) => {
  try {
    const child = spawnSync('python', ['././inputcode.py', '././uploads/' + req.file.filename], { encoding: 'utf8' });
    let output = child.stdout.split('.jpg')[1];
    if (output) {
      res.status(200).json({ output: output })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

export const tumorDetection = async (req, res) => {
  try {
    const child = spawnSync('python', ['././detection.py', '././uploads/' + req.file.filename], { encoding: 'utf8' });
    let output = child.stdout.split('.jpg')[1];
    if (output) {
      res.status(200).json({ output: output })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}