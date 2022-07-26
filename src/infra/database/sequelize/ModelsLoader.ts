// const fs = require('fs');
import fs from 'fs';
const path = require('path');
const { DataTypes } = require('sequelize');

const capitalizeFirstLetter = (string: string) => {
  return string[0].toUpperCase() + string.slice(1)
}

module.exports = {
  load({ sequelize, baseFolder }: any) {
    const loaded: any = {
      models: {},
    };

    let fileExtension = '.ts'
    if (fs.existsSync(`${__dirname}/ModelsLoader.js`)) {
      fileExtension = '.js'
    }

    fs.readdirSync(baseFolder)
      .filter((file: any) => {
        return file.indexOf('.') !== 0 && file !== `index${fileExtension}` && file.slice(-3) === fileExtension;
      })
      .forEach((file: any) => {
        const model = require(path.join(baseFolder, file));
        const modelName = `${capitalizeFirstLetter(file.split('.')[0])}Model`;
        console.log(modelName)
        loaded.models[modelName] = model(sequelize, DataTypes);
      });

    Object.keys(loaded.models).forEach(modelName => {
      if (loaded.models[modelName].associate) {
        loaded.models[modelName].associate(loaded.models);
      }
    });
    loaded.database = sequelize;
    return loaded;
  },
};
