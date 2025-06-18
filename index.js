const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const { sequelize } = require('./models');
require('./config/passport');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));
}).catch(err => console.error('Error al iniciar base de datos:', err));
