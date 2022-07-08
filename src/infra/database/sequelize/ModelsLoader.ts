// const fs = require('fs');
import fs from 'fs';
const path = require('path');
const inflection = require('inflection');
const { DataTypes } = require('sequelize');

const singularizeToUpper = (str: string) => {
  return inflection.singularize(str.replace(/^./, f => f.toUpperCase()));
};

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
        const modelName = `${singularizeToUpper(file.split('.')[0])}Model`;
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
