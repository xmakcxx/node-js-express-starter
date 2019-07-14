const taskService = require('./task.service');

/**
 * Rest controller for handling reporting requests
 */
class TaskRestController {
  constructor() {
    this.taskService = taskService;
  }

  /**
   * Handles request for getting all tasks
   *  GET /api/task
   *
   * @param req - the request
   * @param res - the response
   * @param next - the next function
   */
  getTasks(req, res) {
    const tasks = this.taskService.getTasks();
    return res.send(JSON.stringify(tasks));
  }
}

module.exports = new TaskRestController();
