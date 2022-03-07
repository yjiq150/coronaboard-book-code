const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

async function readFilesAndConcat() {
  const data1 = await readFile('file1.txt');
  const data2 = await readFile('file2.txt');

  return data1 + data2;
}

async function main() {
  try {
    const result = await readFilesAndConcat();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

main();
