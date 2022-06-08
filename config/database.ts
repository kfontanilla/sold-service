const config = {
  local: {
    username: 'root',
    password: 'admin',
    database: 'placester',
    replication: {
      read: {
        host: '127.0.0.1',
      },
      write: {
        host: '127.0.0.1',
      },
    },
    dialect: 'mysql',
  },
}

module.exports = config