import book from '../../models/book.js'
import checkToken from '../../middleware/checkToken.js';
import express from 'express';
const router = express.Router();

//get all books
router.get('/',async(req, res)=>{
    // res.send('get all books')
    // book.find()
    //     .exec()
    //     .then(data => res.send(data))
    //     .catch(err => res.statusCode(500).send())//server problem
    try{
        const data = await book.find().exec();
        res.json(data)
    }
    catch(err){
        res.status(500).send()
    }
})

//get book by id
router.get('/:id', (req, res)=>{
    // res.send(`get book by id ${req.params.id}`)
    book.findById(req.params.id).exec()
        .then(data =>{ if (!data) { return res.status(404).send({ message: "Book not found with id " + req.params.id });} 
        res.send(data)})
        .catch( err => res.status(500).send())
})

//create book
router.post('/', checkToken,(req, res) => {
    const newBook = new book(req.body);

    newBook.save()
        .then(savedBook => res.status(201).send(savedBook))
        .catch(err => {
            if (err.name === 'ValidationError') {
                return res.status(422).send({ error: 'Validation Error', details: err });
            }
            res.status(500).send({ error: 'Failed to create book', details: err });
        });
});

//update book
router.put('/:id', checkToken,(req, res) => {
    // Find the book by ID and update it with the data from req.body
    book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).exec()
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: "Book not found with id " + req.params.id });
            }
            res.send({ message: "Book updated successfully", data });
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                return res.status(422).send({ error: 'Validation Error', details: err });
            }
            res.status(500).send({ error: 'Failed to update book', details: err });
        });
});


//delete book by id 
router.delete('/:id',checkToken,(req,res)=>{
    // res.send(`delete book by id ${req.params.id}`)
    
    book.findByIdAndDelete(req.params.id).exec()
    .then(data =>{ if (!data) { return res.status(404).send({ message: "Book not found with id " + req.params.id });} 
    res.send({ message: "Book deleted successfully", data });
})
    .catch(err => res.status(500).send({ error: 'Failed to delete book', details: err }));
})

export default router;