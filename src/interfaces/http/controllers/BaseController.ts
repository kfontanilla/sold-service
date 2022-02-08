import container from '../../../container';
const Status = require('http-status');

class BaseController {
  injector: Function
  res: any;
  constructor() {
    this.injector = (operation: string) => (req: any, res: any, next: any) => {
      req['operation'] = container.resolve(operation);
      next();
    };
  }

  async index(req: any, res: any, next: any) {
    const { operation } = req;

    try {
      const response = await operation.execute();
      this.res.send(response);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { BaseController };
