import express, { Router } from 'express';
import type { Request, Response } from 'express';
import { User } from '../models/index.js';
import { Post } from '../models/index.js';
import bcrypt from 'bcrypt';


const router = express.Router();

//Update
router.put('/:id', async (req: Request, res: Response) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
    const [numberOfAffectedRows, [updatedUser]] = await User.update(
        { ...req.body },
        { where: { id: req.params.id }, returning: true }
    );
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
    } else {
        res.status(401).json('You can update only your account!')
    }
});

//DELETE
router.delete('/:id', async (req: Request, res: Response) => {
    if(req.body.userId === req.params.id) {
        try {
            const user = await User.findByPk(req.params.id)
            try {
                    await Post.destroy({ where: { username: user.username } });
                await User.destroy({ where: { id: req.params.id } })
                res.status(200).json('User has been deleted...')
            } catch (err) {
                res.status(500).json(err)
            }
        } catch (err) {
                res.status(404).json("User not found!")
            }

            } else {
                res.status(401).json('You can delete only your account!')
            }
        
    });

//GET USER
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        const { password, ...others } = user.toJSON();
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
});



export default router;