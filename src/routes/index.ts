import express, { Response, Request, NextFunction, json, urlencoded } from 'express';
var router = express.Router();
import fs from 'fs'
import path from 'path'
import { getAllBooks, writeToDataBase, update, deleteProduct } from './utils'
import { BookInterface } from './bookInterface'


// 

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' })
});
getAllBooks()

router.get('/api/books', (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: getAllBooks() })
})


router.post('/api/books', (req: Request, res: Response) => {
  const books = getAllBooks();
  // console.log(books)
  const newData = { bookId: books.length + 1, dateUploaded: new Date().getTime(), ...req.body };
  const allNewData = [...books, newData];
  writeToDataBase(allNewData)
  res.status(201).json({ message: "creates new org", data: newData })
});


//update product
router.put('/api/books/:id', (req, res) => {
  let inputWithId = req.body
  const newProduct = update(inputWithId)

  if (!newProduct) {
    return res.status(404).json({ success: false, msg: `no person with id ${req.params}` })
  }
  res.status(200).json({ success: true, data: newProduct })
})


//delete product
router.delete('/api/books/:id', (req, res) => {
  let idinput = req.body
  const newProduct = deleteProduct(idinput)

  if (!newProduct) {
    return res.status(404).json({ success: false, msg: `no person with id ${req.params}` })
  }
  res.status(200).json({ success: `you have deleted product`, data: newProduct })
})


export default router;
