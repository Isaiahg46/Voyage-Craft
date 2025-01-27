import express, { Router } from 'express';
import type { Request, Response } from 'express';
import { User } from '../models/index.js';
import { Post } from '../models/index.js';


const router = express.Router();

//CREATE NEW POST
router.post('/', async (req: Request, res: Response) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
    
});

//UPDATE POST
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post && post.username === req.body.username) {
            try {
                const [numberOfAffectedRows, [updatedPost]] = await Post.update(
                    { ...req.body },
                    {
                        where: { id: req.params.id },
                        returning: true,
                        individualHooks: true
                    }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json('You can update only your post!');
        }
    } catch (err) {
        res.status(500).json(err);

    }
});

//DELETE POST
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post && post.username === req.body.username) {
            try {
                await post.destroy();
                res.status(200).json('Post has been deleted...');
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json('You can delete only your post!');
        }
    } catch (err) {
        res.status(500).json(err);

    }
});

//GET POST
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const post = await Post.findByPk(req.params.id);
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET ALL POSTS
router.get('/', async (req: Request, res: Response) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.findAll({ where: { username: username as string } });
        } else if (catName) {
            posts = await Post.findAll({
                where: {
                    category: {
                        $in: [catName],
                    },
                },
            });
        } else {
            posts = await Post.findAll();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err)
    }
});




export default router;