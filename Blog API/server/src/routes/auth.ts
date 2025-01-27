import express, { Router } from 'express';
import type { Request, Response } from 'express';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
    });
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } })
        !user && res.status(400).json('Wrong credentials!')

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json('Wrong credentials!')

        const { password, ...others } = user.toJSON()
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
});

export default router;