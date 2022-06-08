const User = require('src/domain/User');
import { BaseRDSRepository } from './base/BaseRDSRepository';

class UsersRepository extends BaseRDSRepository {
  constructor({ UserModel }: any) {
    super(UserModel, User);
  }
}

module.exports = UsersRepository;
