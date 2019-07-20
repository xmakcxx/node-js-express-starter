const fs = require('fs');
const path = require('path');

class FileService {
  constructor() {
    this.filePath = path.join(__dirname, '../../', 'temp.txt');
    console.log('this.filePath', this.filePath);
  }

  getFileContent() {
    console.log('__dirname', __dirname);

    const fileData = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(fileData);
  }
}

module.exports = new FileService();
