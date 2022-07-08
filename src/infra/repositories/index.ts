const fs = require('fs')
const { Lifetime } = require('awilix')

const repositories: any = {}

let fileExtension = '.ts'
if (fs.existsSync(`${__dirname}/index.js`)) {
  fileExtension = '.js'
}

fs.readdirSync('src/infra/repositories')
  .filter((file: any) => {
    return (
      file.indexOf('.') !== 0 && file !== `index${fileExtension}` && file.slice(-3) === fileExtension
    )
  })
  .forEach((file: any) => {
    const repositoryName = file.split('.')[0]
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const repository = require(`./${file}`)
    repositories[repositoryName.replace(/^./, (f: any) => f.toLowerCase())] = [
      repository,
      { lifetime: Lifetime.SINGLETON },
    ]
  })

export default repositories
