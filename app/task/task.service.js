const fileService = require('./../util/file.service');

class ReportingService {
  constructor() {
    this.fileService = fileService;
  }

  getTasks() {
    return this.fileService.getFileContent();
  }
}

module.exports = new ReportingService();
