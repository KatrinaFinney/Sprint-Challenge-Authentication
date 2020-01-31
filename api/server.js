const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureMiddleware = require('./configure-middleware.js');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

configureMiddleware(server);


server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (req,res) => {
    res.json({
        api: "Congratulations"
    });
});
module.exports = server;
