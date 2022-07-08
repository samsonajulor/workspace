### Setup
1. Use and setup the project with `yarn`.
2. Convert the project to Typescript.
3. Initialize tsconfig.
4. Create .gitignore file to ignore the node_modules

### Library Book (Rest Backend)

## Problem Description:

You will be tasked with creating a node.js based Rest application which will serve as a data source for a library web application. The application will expose one rest resources
* book Resource - This will handle CRUD endpoints for managing a book list. All endpoints will only be accessed by an authenticated user.
The Project will persist data to a JSON database.

What we are testing.
Express project structure
REST API Endpoint Nomenclature
Javascript ECMA standards
Data persistence (JSON database.)
Unit Testing

## Requirements:

- You can add a new book.
- You can browse through all books.
- You can edit a book.
- You can delete a profile.
- you can view details of each book


## How will I complete this project?
-- Your application should be able to perform.
-- GET Request which returns all the data in your database.json data
-- POST Request which adds data to your database.json file (Note: If there is no database.json on post, create one dynamically).
-- PUT Request which updates fields of a particular data using the id in database.json
-- DELETE Request which removes a particular data from your database.json using the id
Host your application on Heroku


```
[
     {
        “Title”: “A Promised Land”,
        “Author”: “Barack Obama”,
        “datePublished”: “2020-0-12T19:0455.455z”,
        “Description”:  “A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017. Published on November 17, 2020, it         is the first of a planned two-volume series”
        “pageCount”: 768,
        “Genre”: “autobiography”,
        “bookId”: 1,
        “Publisher”: “Crown”
    }
]


```
## Test coverage
- Make sure you write test to cover your application using supertest

### Test
Test coverage
Make sure you write test to cover your application using supertest
Test for a GET request
Test for a POST request
Test for a PUT request
Test for a DELETE request


## FRONTEND

- Page to display all books
- Page to display each book details
- Implement add, edit and delete functions ( User can add,edit and delete books from the platform)
