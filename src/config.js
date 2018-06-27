const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
  initDB: () => {
    const options = {
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0
    };
  
    mongoose.connect(process.env.TB_AUTH_DB_STRING, options).then(() => {
      console.log('DB Connected!');
    })
    .catch((e) => {
      console.log('Error while connecting to DB.', e.message);
    });
  }
}