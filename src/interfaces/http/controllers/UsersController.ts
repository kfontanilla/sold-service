import * as express from "express";
const { BaseController } = require('./BaseController');

class UsersController extends BaseController {
  constructor() {
    super();
    const router = express.Router();
    router.get('/names', this.injector('getUsers'), this.index);
    // router.get('/:id', this.injector('getUser'), this.index);
    // router.delete('/:id', this.injector('deleteUser'), this.index);
    return router;
  }
}

module.exports = UsersController;
