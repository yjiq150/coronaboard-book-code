const fs = require('fs');

function readFilesAndConcat(callback) {
  fs.readFile('file1.txt', (err1, data1) => {
    if (err1) {
      callback(err1);
      return;
    }
    console.log('file1.txt is ready!');

    fs.readFile('file2.txt', (err2, data2) => {
      if (err2) {
        callback(err2);
        return;
      }
      console.log('file2.txt is ready!');
      callback(null, data1 + data2);
    });
  });
}

readFilesAndConcat((err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(result);
});
