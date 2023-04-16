const PDFDocument = require('pdfkit');
const fs = require('fs');

const options = {
  userPassword: 'test123',
  in
}
// Create a document
const doc = new PDFDocument(options);


// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

// Finalize PDF file
doc.end();
