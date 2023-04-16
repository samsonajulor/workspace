var qpdf = require('node-qpdf');

var options = {
  keyLength: 128,
  password: 'test123',
  outputFile: 'passworded.pdf',
  restrictions: {
    print: 'low',
    useAes: 'y',
  },
};

qpdf.encrypt(
  'samsonajulor_resume.pdf',
  options
);
