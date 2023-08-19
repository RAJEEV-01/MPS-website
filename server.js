const express = require('express');
require('dotenv').config({ path: './.env' });
const app = express();
const port = 3000;  //port number 

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const { authRouter } = require('./routers/auth');
const { childRouter } = require('./routers/child');
const { verifyToken } = require('./helpers/jwt');
const { childStatsRouter } = require('./routers/childStats');

app.use('/auth', authRouter);
app.use('/child', verifyToken, childRouter);
app.use('/childStats', verifyToken, childStatsRouter);

app.listen(port);