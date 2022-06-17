import { BaseRDSRepository } from './base/BaseRDSRepository';

class UsersRepository extends BaseRDSRepository {
  constructor({ UserModel }: any) {
    super(UserModel);
  }
}

module.exports = UsersRepository;
