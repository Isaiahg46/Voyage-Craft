import express, { Router } from 'express';
import type { Request, Response } from 'express';
import { Category } from '../models/index.js';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;