[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/oCw4V1Ih)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=18349234&assignment_repo_type=AssignmentRepo)
Realtime Collaborative Whiteboard Assignment
---

**Objective**
In this assignment, you will build a realtime collaborative whiteboard application using **Socket.IO**. The application will consist of:

- A **backend Socket.IO server** to manage connections, maintain the board state, and broadcast updates.
- A **browser-based Socket.IO client** that connects to the server, listens for updates, and sends any changes made by the user.
- A **whiteboard implemented using an HTML `<canvas>` element**, where users can draw with a selected color and clear the board when needed.

The goal is for multiple users to connect and collaborate in real time. Any updates should be broadcast to all connected clients so they always see the same board state.

---

**Setup Instructions**

1. Clone the GitHub classroom assignment in a VS Code dev container.
2. **Install dependencies**:
   ```sh
   npm install socket.io socket.io-client vite
   ```
3. **Set up the development environment:**
   - Use `Vite` as your dev server instead of loading the HTML file directly.
   - Run the dev server:
     ```sh
     npm run dev
     ```
   - Open the browser at `http://localhost:5173/` (or the URL provided by Vite).
4. **Run the Socket.IO server**:
   ```sh
   node server.js
   ```

---

**Assignment Requirements**

**Backend (Socket.IO Server)**
You must implement a **Node.js server** using `socket.io` that:

1. Listens for incoming client connections.
2. Maintains the current board state.
3. Sends the full board state to any new client when they connect.
4. Listens for drawing actions from clients and broadcasts them to all other connected clients.
5. Handles a board clear event and informs all clients to reset their boards.
6. Ensures that each client only updates their own canvas when receiving a message from the server (i.e., the client does not draw immediately when the user interacts, but waits for the server’s echo).

---

**Frontend (Browser-Based Whiteboard)**
Your **browser-based client** should:

1. **Connect to the Socket.IO server** and listen for incoming events.
2. **Render a `<canvas>` whiteboard** that allows drawing with:
   - A specific color (user should be able to select it).
   - Variable brush size (optional, but encouraged).
3. **Handle incoming drawing events** and update the canvas accordingly.
4. **Emit drawing actions** to the server when the user draws.
5. **Implement a "Clear Board" button** that:
   - Sends a `clear` event to the server.
   - Listens for a `clear` event and resets the canvas when received.
6. **Ensure users only draw when the server confirms their action**, not immediately upon mouse movement.

---

Note:

- To allow your browser-based client to connect to the server running inside a docker container, you will likely need to enable CORS on the server, e.g.:

    ```javascript
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"]
        },
    });
    ```

---

**Submission Instructions**

1. Push your completed code to GitHub classroom.
2. Ensure that your implementation meets the assignment requirements.

---

**Assessment Criteria**
Your implementation will be assessed based on:
- Correctness: Does your whiteboard function as a real-time collaborative tool?
- Completeness: Have you implemented both the frontend and backend components?
- Code Quality: Is your code well-structured and readable?
- Functionality: Do all features work as intended, including drawing, color selection, and board clearing?
- Real-Time Behavior: Does the whiteboard update in sync for all connected clients?
