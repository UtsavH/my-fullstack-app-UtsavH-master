import express from 'express';
const router = express.Router();

import booksRouter from './books.js';
import userRouter from './users.js';

router.use('/books', booksRouter);
router.use('/users', userRouter);

router.get('/',(req, res)=> res.send('Welocme to the API'));



export default router;