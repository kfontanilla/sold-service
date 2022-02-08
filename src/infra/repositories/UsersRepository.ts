import { BaseMongoRepository } from './base/BaseMongoRepository';
import { userModel } from '../database/mongo/models/userModel';

class UsersRepository extends BaseMongoRepository {
  constructor({ mongoClient }: { mongoClient: any }) {
    super(mongoClient, userModel);
  }
}

module.exports = UsersRepository;
