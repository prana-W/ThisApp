import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import { config } from 'dotenv';
import cors from 'cors';
import mongodbConnection from './config/dbConnection.js';
import cookieParser from 'cookie-parser';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
config();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

io.on('connection', (socket) => {});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.get('/', (req, res) => {
  return res.end('Hey');
});

httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  mongodbConnection();
});
