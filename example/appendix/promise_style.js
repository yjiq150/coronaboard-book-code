const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function readFilesAndConcat() {
  return readFile('file1.txt').then((data1) => {
    console.log('file1.txt is ready!');
    return new Promise((resolve, reject) => {
      readFile('file2.txt')
        .then((data2) => {
          console.log('file2.txt is ready!');
          resolve(data1 + data2);
        })
        .catch((err) => reject(err));
    });
  });
}

readFilesAndConcat()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
