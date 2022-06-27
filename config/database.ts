const {
  NODE_ENV: environment = "local",
  RDS_DATABASE_USERNAME: username,
  RDS_DATABASE_PASSWORD: password,
  RDS_DATABASE_NAME: database,
  RDS_DATABASE_HOST: host,
} = process.env

const config = {
  [environment]: {
    username,
    password,
    database,
    replication: {
      read: {
        host,
      },
      write: {
        host,
      },
    },
    dialect: "mysql",
  },
}

module.exports = config
