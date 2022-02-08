import container from './container';
import { userModel } from './infra/database/mongo/models/userModel';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/emapta');

const jsonPlaceHolderClient = container.resolve('jsonPlaceHolderClient');

class Migration {
  users: object[] = [];
  async execute() {
    try {
      this.users = await jsonPlaceHolderClient.getUsers();
    } catch (error) {
      console.error('GET_USERS_ERROR', error);
    }

    try {
      await Promise.all(
        this.users.map(async (user: any) => {
          user.addressCords = user.address.geo;
          user.photos = await jsonPlaceHolderClient.getPhotos(user.id);
          return user;
        })
      );
    } catch (error) {
      console.error(error);
    }

    try {
      const Model = userModel;
      await Model.insertMany(this.users);
      console.log('Migration Success');
    } catch (error) {
      console.error('INSERT_USER_ERROR', error);
    }
  }
}

const migration = new Migration();
migration.execute();
