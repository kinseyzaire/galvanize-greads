module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/greads'
  },

  production: {
    client: 'pg',
    connection: ''
  }

};
