import express from 'express';
import { query } from 'express-validator';
import { getCoordinates, getDistanceTime1, getAutoCompleteSuggestions1 } from '../controllers/map.controller.js';
import { verifyUnified } from '../middlewares/authUnified.middlewares.js';

const router = express.Router();


router.get('/get-coordinates', 
  query('address').isString().isLength({ min:3 }), 
  verifyUnified, 
  getCoordinates
);

router.get('/get-distance-time', 
  query('origin').isString().isLength({ min:3 }),
  query('destination').isString().isLength({ min:3 }),
  verifyUnified, 
  getDistanceTime1
);

router.get('/get-suggestions',
  query('input').isString().isLength({ min:3 }),
  verifyUnified, 
  getAutoCompleteSuggestions1
);

export default router;
