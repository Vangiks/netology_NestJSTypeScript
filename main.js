const express = require('express');
const passport = require('passport');
const YandexStrategy = require('passport-yandex').Strategy;

const config = require('./config');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new YandexStrategy(
    {
      clientID: config.yandexClientId,
      clientSecret: config.yandexClienSecret,
      callbackURL: config.yandexCallbackUrl,
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        return done(null, profile);
      });
    }
  )
);

const app = express();
app.use(require('cookie-parser')());
app.use(
  require('express-session')({
    secret: process.env.COOKIE_SECRET || 'COOKIE_SECRET',
  })
);

app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get('/profile', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

app.get('/login', passport.authenticate('yandex'));

app.get(
  '/login/callback',
  passport.authenticate('yandex', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/logout', (request, response, next) => {
  request.logout((err) => {
    if (err) {
      return next(err);
    }
    response.redirect('/profile');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server start http://localhost:${PORT}`);
});
