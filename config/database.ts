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
  internal: {
    username: 'sold_service',
    password: 'kLMk3za2Y8c4',
    database: 'property_resources',
    replication: {
      read: {
        host: 'etlresources.pl-internal.net',
      },
      write: {
        host: 'etlresources.pl-internal.net',
      },
    },
    dialect: 'mysql',
  },
}

module.exports = config