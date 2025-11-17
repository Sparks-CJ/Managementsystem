import express from 'express';
import {
  createFood, listFood, getFood, updateFood, deleteFood
} from '../controllers/foodController.js';

const router = express.Router();

router.post('/', createFood);
router.get('/', listFood);
router.get('/:id', getFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

export default router;
