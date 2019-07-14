const fileService = require('./../util/file.service');

class ReportingService {
  constructor() {
    this.fileService = fileService;
  }

  getTasks() {
    return this.fileService.getTasks();
  }
}

module.exports = new ReportingService();
