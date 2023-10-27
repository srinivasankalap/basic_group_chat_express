const express=require('express');
const session = require('express-session');

const login=require('./routes/login')

const chat=require('./routes/chat')

const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  }));

app.use(login);

app.use(chat);

app.listen(3000);