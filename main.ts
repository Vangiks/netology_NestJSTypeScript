import { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';

import http from 'http';
import { Server } from 'socket.io';

import config from './config';
import modulesView from './src/app.view.module';
import modulesApi from './src/app.api.module';
import error from './middleware/error';

import UsersService from './src/users/users.service';
import { TDocumentUser } from './src/users/model';

import { mainContainer } from './src/container';

const usersService = mainContainer.get(UsersService);

const LocalStrategy = passportLocal.Strategy;

passport.use('local', new LocalStrategy(usersService.options, usersService.verify));

passport.serializeUser((user, cb) => {
  if (UsersService.isUser(user)) {
    cb(null, user.id);
  }
});

passport.deserializeUser(async (id: string, cb) => {
  const user: TDocumentUser | null = await usersService.getUser(id);
  if (!user) {
    return cb(null);
  }
  cb(null, user);
});

const express = require('express'),
  app = express();

const server = new http.Server(app);
const io = new Server(server);

const host = config.APP_BASE_PATH;
const port = config.PORT;
const databasePath = config.DATABASE_PATH;

console.log(config);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

app.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.redirect('/books');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'SECRET' }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', modulesApi);
app.use('/', modulesView);

app.use(error);

async function main() {
  await mongoose.connect(databasePath);
}

io.on('connection', (socket) => {
  const { id } = socket;
  console.log(`Socket connected: ${id}`);

  const { roomName } = socket.handshake.query;

  if (roomName) {
    socket.join(roomName);
  }
  socket.on('message-to-room', (msg) => {
    msg.type = `room: ${roomName}`;
    if (roomName) {
      socket.to(roomName).emit('message-to-room', msg);
    }
    socket.emit('message-to-room', msg);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
});

main()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server listens http://${host}:${port}`);
    });
  })
  .catch((error) => console.log(error));
