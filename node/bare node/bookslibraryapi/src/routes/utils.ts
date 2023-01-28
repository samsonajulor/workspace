// import Book from './books'
import fs from 'fs'
import path from 'path'
import { BookInterface } from './bookInterface'
import express, { Response, Request, NextFunction, json, urlencoded } from 'express';

const readDir = path.resolve(__dirname, '../../database.json')
// const writeDir = path.resolve(__dirname, '../../dist/data/database.json')
// console.log(writeDir)

// console.log(readDir)

export function getAllBooks() {
 try {
  const data = fs.readFileSync(readDir, { encoding: 'utf8', flag: 'r' });
  return JSON.parse(data)
 } catch (err) {
  return []
 }
}


// export function addNewBook(newBook: BookInterface): BookInterface {
//  const data = getAllBooks();
//  const books = JSON.parse(JSON.stringify(data));
//  if (!newBook.Title) throw new Error("Book Title is required");
//  if (!newBook.Author) throw new Error("Book Author is required");
//  if (!newBook.datePublished) throw new Error("Book datePublished is required");
//  if (!newBook.Description) throw new Error("Book Description is required");
//  if (!newBook.Genre) throw new Error("Book Genre is required");
//  if (!newBook.Publisher) throw new Error("Book Publisher is required");
//  newBook.bookId = books[books.length - 1].bookId + 1 + "";
//  newBook.dateUploaded = Date.now().toString();
//  newBook.dateEdited = Date.now().toString();
//  books.push(newBook);
//  fs.writeFileSync(readDir, JSON.stringify(books));
//  return newBook;
// }



export function writeToDataBase(data: BookInterface[]) {
 fs.writeFileSync(readDir, JSON.stringify(data, null, 4))
}



// function getOneBook(bookId: string): Book {
//  const books = getAllBooks();
//  const book = books.find((book: Book) => book.bookId == bookId);
//  if (!book) {
//   throw new Error("Book Not Found");
//  }
//  return new Book(book);
// }




export function update(newBook: BookInterface): BookInterface {
 const data = getAllBooks();
 const books = JSON.parse(JSON.stringify(data));
 let updateBook: BookInterface = books.find((book: BookInterface) => book.bookId == newBook.bookId);
 if (!updateBook) {
  throw new Error("Book Not Found");
 }
 books.map((book: BookInterface) => {
  if (book.bookId == newBook.bookId) {
   if (newBook.Title) book.Title = newBook.Title;
   if (newBook.Author) book.Author = newBook.Author;
   if (newBook.datePublished) book.datePublished = newBook.datePublished;
   if (newBook.Description) book.Description = newBook.Description;
   if (newBook.pageCount) book.pageCount = newBook.pageCount;
   if (newBook.Genre) book.Genre = newBook.Genre;
   if (newBook.Publisher) book.Publisher = newBook.Publisher;
   book.dateEdited = Date.now().toString();
   updateBook = book;
  }
  return book;
 });
 fs.writeFileSync(readDir, JSON.stringify(books, null, 4));
 return updateBook;
}

export function deleteProduct(toDelete: BookInterface): BookInterface {
 const data = getAllBooks();
 const books = JSON.parse(JSON.stringify(data));
 const deleteProduct = books.find((book: BookInterface) => book.bookId == toDelete.bookId);
 if (!deleteProduct) {
  throw new Error("Book Not Found");
 }
 const newBooks = books.filter((book: BookInterface) => book.bookId != toDelete.bookId);
 fs.writeFileSync(readDir, JSON.stringify(newBooks, null, 4));
 return deleteProduct;
}