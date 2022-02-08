const fs = require('fs');
const { Lifetime } = require('awilix');

const repositories: any = {};

fs.readdirSync('src/infra/repositories')
  .filter((file: any) => {
    return (
      file.indexOf('.') !== 0 && file !== 'index.ts' && file.slice(-3) === '.ts'
    );
  })
  .forEach((file: any) => {
    const repositoryName = file.split('.')[0];
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const repository = require(`./${file}`);
    repositories[repositoryName.replace(/^./, (f: any) => f.toLowerCase())] = [
      repository,
      { lifetime: Lifetime.SINGLETON },
    ];
  });

export default repositories;
