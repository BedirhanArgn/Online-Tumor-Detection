import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import authRoutes from './routes/authentication.js';
import saveRoutes from './routes/saveroutes.js';
import getRoutes from './routes/getRoutes.js';
import chatRouter from './routes/chatRouter.js';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { addMessage } from './chat/messages.js'
import { addUser } from './chat/users.js'
import models, { sequelize } from './models/index.js';

const app = express();
const server = createServer(app);
const io = new Server(server);
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use('/auth', authRoutes);
app.use('/save', saveRoutes);
app.use('/get', getRoutes);

const NEW_MESSAGE_EVENT = "NEW_MESSAGE_EVENT";

io.on("connection", (socket) => {
  var roomId = "";

  socket.on('create', function (room) {
    roomId = room;
    socket.join(room);
  });

  socket.on(NEW_MESSAGE_EVENT, (data) => {
    if (data.body.length !== 0) {
      if (data.doctorId.toString().length > 15) {
        let token = jwt.verify(data.doctorId, process.env.SECRET);
        models.message.create({
          message: data.body,
          patientId: data.patientId,
          doctorId: token.id,
          sender: data.sender
        })
      } else {
        let token = jwt.verify(data.patientId, process.env.SECRET);
        models.message.create({
          message: data.body,
          patientId: token.id,
          doctorId: data.doctorId,
          sender: data.sender
        })
      }
      io.in(roomId).emit(NEW_MESSAGE_EVENT, data);
    }
  });

  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

io.listen('3031', {
  cors: {
    origin: '*',
  }
});
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => { console.log("server is running") });
});
