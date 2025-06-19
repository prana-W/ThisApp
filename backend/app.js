const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const authRoutes = require('./routes/auth.route');
require('dotenv').config();
const cors = require('cors');
const mongodbConnect = require('./config/dbConnection');

app.use(express.json())

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true, // if you're using cookies/session
}));
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended: false}))

io.on('connection', (socket) => {

});

// Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  return res.end('Hey')
})

httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  mongodbConnect()
});
