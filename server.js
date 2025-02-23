const http = require('http');
const fs = require('fs');
const path = require('path');
const socketIo = require('socket.io');

// Create a basic HTTP server that serves index.html.
const server = http.createServer((req, res) => {
  // Serve the whiteboard client on root request.
  let filePath = path.join(__dirname, 'index.html');
  if (req.url !== '/' && req.url !== '/index.html') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading index.html');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

// Attach socket.io to the HTTP server with CORS enabled.
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Maintain the full board state as an array of drawing actions.
let boardState = [];

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // Send full board state to the new client.
  socket.emit('boardState', boardState);

  // Listen for drawing actions.
  socket.on('drawing', (data) => {
    boardState.push(data);
    // Emit the drawing action to all clients including the sender.
    io.emit('drawing', data);
  });

  // Listen for clear events.
  socket.on('clear', () => {
    boardState = [];
    // Inform all clients to clear their boards.
    io.emit('clear');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server on port 3000.
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
