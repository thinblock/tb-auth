const micro = require('micro')
const handler = require('./');

const createServer = () => {
  const server = micro(handler)
  server.listen(process.env.PORT || 3000, () => {
    console.log('Running on http://localhost:3000')
  })
};

const start = async () => {
  createServer()
};

start();