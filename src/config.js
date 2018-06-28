const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
  initDB: async (next) => {
    const options = {
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0
    };
    try {
      await mongoose.connect(process.env.TB_AUTH_DB_STRING, options);
      next && next();
      console.log('DB Connected!');
    } catch(e) {
      console.log('Error while connecting to DB.', e.message);
    }
    console.log('after');
  },
  secret: process.env.TB_JWT_SECRET
}